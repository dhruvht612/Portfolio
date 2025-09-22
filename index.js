import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Example API route (contact form)
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact form submitted:", name, email, message);
  res.json({ success: true, message: "Thanks for reaching out!" });
});

// Catch-all fallback (Express 5 safe)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
