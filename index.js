import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Message from "./models/Message.js";
import OpenAI from "openai";

dotenv.config(); // load .env file
console.log("DEBUG: MONGO_URI =", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 3000;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

// ✅ Serve static files (your portfolio front-end)
app.use(express.static(__dirname));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ================= CONTACT FORM API =================
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to database
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `📩 New Contact Form Submission from ${name}`,
      text: `You received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.json({
      success: true,
      message: "Message sent and saved successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ================= CHATBOT API =================
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

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
