import express from "express";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // put index.html, script.js, etc. inside /public

// Example backend route (Contact form)
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact form submitted:", name, email, message);
  res.json({ success: true, message: "Thanks for reaching out!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
