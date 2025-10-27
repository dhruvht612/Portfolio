import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Message from "./models/Message.js";
import OpenAI from "openai";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";

dotenv.config(); // load .env file
console.log("DEBUG: MONGO_URI =", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 3000;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://cdn.tailwindcss.com"],
      scriptSrc: ["'self'", "https://cdn.tailwindcss.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
    },
  },
}));

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? ['https://dhruvthakar.dev'] : true,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact form submissions per hour
  message: {
    error: 'Too many contact form submissions, please try again later.'
  }
});

app.use(limiter);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Serve static files (your portfolio front-end)
app.use(express.static(__dirname));

// Connect to MongoDB (only if MONGO_URI is set)
if (process.env.MONGO_URI && process.env.MONGO_URI !== 'mongodb://localhost:27017/portfolio') {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => {
      console.error("❌ MongoDB error:", err.message);
      console.log("ℹ️  Running in development mode - contact form will log to console");
    });
} else {
  console.log("ℹ️  MongoDB not configured - running in development mode");
}

// Input validation middleware
const validateContactInput = (req, res, next) => {
  const { name, email, message } = req.body;
  
  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
  }
  
  // Length validation
  if (name.length < 2 || name.length > 100) {
    return res.status(400).json({
      success: false,
      message: 'Name must be between 2 and 100 characters'
    });
  }
  
  if (message.length < 10 || message.length > 1000) {
    return res.status(400).json({
      success: false,
      message: 'Message must be between 10 and 1000 characters'
    });
  }
  
  // Sanitize inputs
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.message = message.trim();
  
  next();
};

// ================= CONTACT FORM API =================
app.post("/api/contact", contactLimiter, validateContactInput, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Try to save to database if MongoDB is connected
    let savedToDatabase = false;
    try {
      if (mongoose.connection.readyState === 1) {
        const newMessage = new Message({ 
          name, 
          email, 
          message,
          ip: req.ip,
          userAgent: req.get('User-Agent')
        });
        await newMessage.save();
        savedToDatabase = true;
        console.log('✅ Message saved to database');
      }
    } catch (dbError) {
      console.log('⚠️  Database save failed, logging to console instead');
    }

    // Always log the message for backup
    console.log('📩 New Contact Form Submission:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log(`IP: ${req.ip}`);
    console.log(`Time: ${new Date().toLocaleString()}`);
    console.log(`Saved to DB: ${savedToDatabase ? 'Yes' : 'No'}`);
    console.log('---');

    // Send email notification if email is configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `📩 New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #22d3ee;">New Contact Form Submission</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #22d3ee;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <p style="color: #666; font-size: 12px;">
              IP: ${req.ip} | Time: ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    res.json({
      success: true,
      message: savedToDatabase 
        ? "Message sent and saved successfully!" 
        : "Message received! (Check server logs - database connection issue)",
    });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error. Please try again later." 
    });
  }
});


// ================= CHATBOT API =================
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // If OpenAI is not configured, return a helpful message
    if (!openai) {
      return res.json({ 
        reply: "Hi! I'm Dhruv's portfolio assistant. The chatbot feature is currently in development mode. Feel free to explore the portfolio or use the contact form to reach out directly!" 
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Dhruv Thakar's portfolio assistant. Answer questions about Dhruv's skills, projects, education, and background in a professional but friendly tone. If asked about contact, direct users to the Contact section.",
        },
        { role: "user", content: message },
      ],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error("❌ Chatbot error:", err);
    res.status(500).json({ reply: "⚠️ Sorry, something went wrong." });
  }
});

// ✅ Fallback: serves "index.html" for any unknown route
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
