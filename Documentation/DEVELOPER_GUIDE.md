# Developer Guide

## Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [Frontend Development](#frontend-development)
- [Backend Development](#backend-development)
- [Database Schema](#database-schema)
- [Adding New Features](#adding-new-features)
- [Customization Guide](#customization-guide)
- [Testing](#testing)
- [Debugging](#debugging)
- [Best Practices](#best-practices)
- [Contributing](#contributing)

---

## Introduction

This guide is intended for developers who want to:
- Understand the codebase structure
- Modify or extend the portfolio
- Add new features
- Customize the design
- Contribute to the project

**Prerequisites:**
- JavaScript (ES6+)
- Node.js and Express.js
- HTML/CSS (Tailwind CSS)
- MongoDB basics
- Git version control

---

## Getting Started

### Development Environment Setup

1. **Install Required Tools**
   ```bash
   # Node.js (v18+)
   node --version
   
   # npm (v9+)
   npm --version
   
   # Git
   git --version
   ```

2. **Clone and Install**
   ```bash
   git clone https://github.com/dhruvht612/Portfolio.git
   cd Portfolio
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "mongodb.mongodb-vscode",
    "ms-vscode.vscode-node-debug2"
  ]
}
```

---

## Project Architecture

### File Structure Explained

```
Portfolio/
│
├── index.html              # Main HTML file (Frontend)
│   └── Sections: Home, About, Projects, Skills, Education, Blog, Contact
│
├── script.js               # Client-side JavaScript
│   ├── ThemeManager       # Dark/Light mode toggle
│   ├── LazyLoader         # Image lazy loading
│   ├── FormValidator      # Contact form validation
│   ├── SmoothScroller     # Smooth scroll behavior
│   └── ScrollAnimations   # Intersection Observer animations
│
├── style.css              # Custom CSS styles
│   ├── Base styles        # Typography, colors, layouts
│   ├── Component styles   # Cards, buttons, forms
│   ├── Animations         # Keyframe animations
│   └── Responsive design  # Media queries
│
├── index.js               # Express server (Backend)
│   ├── Middleware         # Security, CORS, rate limiting
│   ├── API Routes         # /api/contact, /api/chat
│   ├── Static file server # Serves frontend files
│   └── Error handling     # Global error handler
│
├── models/
│   └── Message.js         # MongoDB schema for contact messages
│
├── sw.js                  # Service Worker (PWA)
│   ├── Cache management   # Assets caching
│   ├── Offline support    # Network fallback
│   └── Version control    # Cache versioning
│
├── manifest.json          # PWA manifest
├── testContact.js         # API testing utility
└── package.json           # Dependencies and scripts
```

### Architecture Diagram

```
┌─────────────────────────────────────────────┐
│             Browser (Client)                 │
│  ┌────────────┐  ┌────────────┐             │
│  │ index.html │  │ script.js  │             │
│  │  style.css │  │ (ES6 OOP)  │             │
│  └────────────┘  └────────────┘             │
└─────────────────────────────────────────────┘
                    ▲ ▼
          ┌─────────────────────┐
          │   Service Worker     │
          │   (sw.js - PWA)      │
          └─────────────────────┘
                    ▲ ▼
┌─────────────────────────────────────────────┐
│           Express.js Server                  │
│  ┌────────────┐  ┌────────────┐             │
│  │  Security  │  │    API     │             │
│  │ Middleware │  │  Endpoints │             │
│  └────────────┘  └────────────┘             │
└─────────────────────────────────────────────┘
                    ▲ ▼
    ┌───────────────┼───────────────┐
    ▼               ▼               ▼
┌─────────┐  ┌─────────┐  ┌─────────┐
│ MongoDB │  │ OpenAI  │  │  Email  │
│(Message)│  │   API   │  │ Service │
└─────────┘  └─────────┘  └─────────┘
```

---

## Frontend Development

### HTML Structure (index.html)

#### Key Sections

1. **`<head>` Section**
   - SEO meta tags (Open Graph, Twitter Cards)
   - Structured data (JSON-LD)
   - Preload critical resources
   - PWA meta tags

2. **Preloader**
   ```html
   <div id="preloader">
     <div class="animate-spin ..."></div>
   </div>
   ```

3. **Header & Navigation**
   - Sticky header
   - Mobile responsive menu
   - Active link highlighting

4. **Main Content Sections**
   - Home (Hero section)
   - About Me
   - Testimonials
   - Projects (with filtering)
   - Skills
   - Education
   - Beyond the Classroom
   - Blog
   - Contact Form

5. **Footer**
   - Social links
   - Quick navigation
   - Tech stack badges

6. **Chatbot Widget**
   - Floating button
   - Collapsible chat box

### JavaScript (script.js)

#### Class-Based Architecture

**1. ThemeManager Class**
```javascript
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    this.applyTheme();
    this.bindEvents();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    // Update UI icons
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }
}
```

**2. FormValidator Class**
```javascript
class FormValidator {
  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Validation logic
    switch (fieldName) {
      case 'name':
        return value.length >= 2;
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'message':
        return value.length >= 10;
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    // Validate, submit to API, handle response
  }
}
```

**3. LazyLoader Class**
```javascript
class LazyLoader {
  init() {
    if ('IntersectionObserver' in window) {
      this.imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy-load');
            this.imageObserver.unobserve(img);
          }
        });
      });
      
      document.querySelectorAll('.lazy-load').forEach(img => {
        this.imageObserver.observe(img);
      });
    }
  }
}
```

#### Event Handlers

**Mobile Menu Toggle**
```javascript
const btn = document.getElementById('menu-btn');
const nav = document.getElementById('nav-links');

btn.addEventListener('click', () => {
  const isHidden = nav.classList.contains('hidden');
  nav.classList.toggle('hidden');
  btn.setAttribute('aria-expanded', !isHidden);
});
```

**Project Filtering**
```javascript
filterButtons.forEach(btn => {
  btn.addEventListener('click', function () {
    const filter = this.getAttribute('data-filter');
    
    // Update active state
    filterButtons.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    // Filter project cards
    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category').split(' ');
      if (filter === 'all' || categories.includes(filter)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
```

### CSS (style.css)

#### Custom Properties (Theme Variables)
```css
[data-theme="dark"] {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --border-color: #374151;
}

[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
}
```

#### Animations
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-fade-in {
  animation: fadeInUp 0.6s ease-out forwards;
}
```

---

## Backend Development

### Express Server (index.js)

#### Middleware Stack
```javascript
// 1. Security
app.use(helmet({ /* CSP config */ }));

// 2. CORS
app.use(cors({ origin: allowedOrigins }));

// 3. Rate Limiting
app.use(limiter);

// 4. Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 5. Static Files
app.use(express.static(__dirname));
```

#### API Route: Contact Form
```javascript
app.post("/api/contact", 
  contactLimiter,           // Rate limit: 5/hour
  validateContactInput,     // Validation middleware
  async (req, res) => {
    try {
      const { name, email, message } = req.body;

      // Save to database
      const newMessage = new Message({ 
        name, 
        email, 
        message,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
      await newMessage.save();

      // Send email notification
      await sendEmailNotification(name, email, message);

      res.json({
        success: true,
        message: "Message sent successfully!"
      });
    } catch (err) {
      console.error('Contact form error:', err);
      res.status(500).json({ 
        success: false, 
        message: "Server error. Please try again later." 
      });
    }
  }
);
```

#### API Route: Chatbot
```javascript
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are Dhruv Thakar's portfolio assistant..."
        },
        { role: "user", content: message }
      ]
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ reply: "⚠️ Sorry, something went wrong." });
  }
});
```

### Validation Middleware
```javascript
const validateContactInput = (req, res, next) => {
  const { name, email, message } = req.body;
  
  // Check required fields
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
```

---

## Database Schema

### Message Model (models/Message.js)

```javascript
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true, 
    maxlength: 100 
  },
  email: { 
    type: String, 
    required: true, 
    trim: true, 
    lowercase: true 
  },
  message: { 
    type: String, 
    required: true, 
    trim: true, 
    maxlength: 1000 
  },
  ip: { type: String },
  userAgent: { type: String },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  }
});

// Indexes for better query performance
messageSchema.index({ createdAt: -1 });
messageSchema.index({ email: 1 });

export default mongoose.model("Message", messageSchema);
```

### Querying the Database

```javascript
// Get all messages (sorted by newest first)
const messages = await Message.find().sort({ createdAt: -1 });

// Get unread messages
const unreadMessages = await Message.find({ isRead: false });

// Mark message as read
await Message.findByIdAndUpdate(messageId, { isRead: true });

// Get messages from specific email
const userMessages = await Message.find({ email: 'user@example.com' });

// Count total messages
const totalMessages = await Message.countDocuments();

// Delete old messages (older than 30 days)
const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
await Message.deleteMany({ createdAt: { $lt: thirtyDaysAgo } });
```

---

## Adding New Features

### Example: Adding a Newsletter Subscription

#### 1. Create Database Model
```javascript
// models/Subscriber.js
import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    lowercase: true 
  },
  subscribedAt: { 
    type: Date, 
    default: Date.now 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
});

subscriberSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("Subscriber", subscriberSchema);
```

#### 2. Add API Endpoint
```javascript
// In index.js
import Subscriber from "./models/Subscriber.js";

app.post("/api/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }
    
    // Check if already subscribed
    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Email already subscribed'
      });
    }
    
    // Create new subscriber
    const subscriber = new Subscriber({ email: email.toLowerCase() });
    await subscriber.save();
    
    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });
  } catch (err) {
    console.error('Subscribe error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
});
```

#### 3. Add Frontend Form
```html
<!-- In index.html -->
<section id="newsletter" class="py-16 px-6 bg-gray-900">
  <div class="max-w-2xl mx-auto text-center">
    <h2 class="text-3xl font-bold mb-4 text-[#22d3ee]">
      Subscribe to Newsletter
    </h2>
    <p class="text-gray-300 mb-6">
      Get updates on new projects and blog posts
    </p>
    
    <form id="newsletter-form" class="flex gap-2">
      <input 
        type="email" 
        id="newsletter-email" 
        placeholder="your@email.com" 
        required
        class="flex-1 px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:border-blue-400"
      />
      <button 
        type="submit"
        class="px-6 py-3 bg-gradient-to-r from-blue-400 to-teal-400 text-white font-semibold rounded-lg hover:opacity-90"
      >
        Subscribe
      </button>
    </form>
    <div id="newsletter-status" class="mt-4"></div>
  </div>
</section>
```

#### 4. Add JavaScript Handler
```javascript
// In script.js
document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('newsletter-email').value;
  const statusDiv = document.getElementById('newsletter-status');
  
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    const data = await response.json();
    
    if (data.success) {
      statusDiv.textContent = data.message;
      statusDiv.className = 'text-green-400 mt-4';
      e.target.reset();
    } else {
      statusDiv.textContent = data.message;
      statusDiv.className = 'text-red-400 mt-4';
    }
  } catch (error) {
    statusDiv.textContent = 'Error subscribing. Please try again.';
    statusDiv.className = 'text-red-400 mt-4';
  }
});
```

---

## Customization Guide

### Changing Colors

**Tailwind CSS Classes:**
```html
<!-- Primary color: #22d3ee (cyan) -->
<div class="bg-[#22d3ee]"></div>
<div class="text-[#22d3ee]"></div>

<!-- Secondary color: #14b8a6 (teal) -->
<div class="bg-[#14b8a6]"></div>

<!-- To change globally, update all instances -->
```

**CSS Custom Properties:**
```css
/* In style.css */
:root {
  --color-primary: #22d3ee;
  --color-secondary: #14b8a6;
  --color-accent: #06b6d4;
}

/* Usage */
.button {
  background-color: var(--color-primary);
}
```

### Changing Fonts

```html
<!-- In index.html <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
```

```css
/* In style.css */
body {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### Adding a New Project

```html
<!-- In index.html, inside .grid -->
<div class="project-card" data-category="javascript react">
  <div class="mb-2 text-3xl text-[#22d3ee]">
    <i class="fas fa-code"></i>
  </div>
  <h3 class="text-xl font-semibold mb-2 bg-gradient-to-r from-[#14b8a6] to-[#22d3ee] bg-clip-text text-transparent">
    My New Project
  </h3>
  <p class="text-gray-300 mb-2">
    Description of the project
  </p>
  <ul class="list-disc ml-5 text-sm text-gray-400 mb-4">
    <li>Feature 1</li>
    <li>Feature 2</li>
    <li>Feature 3</li>
  </ul>
  <div class="flex flex-wrap gap-2 mb-4">
    <span class="bg-[#14b8a6]/20 text-[#14b8a6] px-2 py-1 rounded text-xs font-semibold">React</span>
    <span class="bg-[#22d3ee]/20 text-[#22d3ee] px-2 py-1 rounded text-xs font-semibold">JavaScript</span>
  </div>
  <div class="flex gap-2">
    <a href="#" class="bg-[#22d3ee] hover:bg-[#06b6d4] text-[#0f172a] px-3 py-1 rounded text-xs font-semibold transition-colors">
      <i class="fas fa-external-link-alt mr-1"></i> Live Demo
    </a>
    <a href="https://github.com/..." class="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs font-semibold transition-colors">
      <i class="fab fa-github mr-1"></i> Code
    </a>
  </div>
</div>
```

### Adding a New Section

```html
<!-- In index.html -->
<section id="achievements" class="py-20 px-6 bg-gray-900 text-white">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text">
      Achievements
    </h2>
    
    <!-- Content here -->
    
  </div>
</section>
```

**Update Navigation:**
```html
<li><a href="#achievements">Achievements</a></li>
```

---

## Testing

### Unit Testing with Jest

```bash
npm install --save-dev jest supertest
```

```javascript
// __tests__/api.test.js
import request from 'supertest';
import app from '../index.js';

describe('Contact API', () => {
  test('POST /api/contact - success', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
  
  test('POST /api/contact - invalid email', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'Test User',
        email: 'invalid-email',
        message: 'This is a test message'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
```

### Frontend Testing

```javascript
// tests/form.test.js
describe('FormValidator', () => {
  let validator;
  
  beforeEach(() => {
    validator = new FormValidator();
  });
  
  test('validates email correctly', () => {
    const input = document.createElement('input');
    input.name = 'email';
    input.value = 'test@example.com';
    
    expect(validator.validateField(input)).toBe(true);
  });
  
  test('rejects invalid email', () => {
    const input = document.createElement('input');
    input.name = 'email';
    input.value = 'invalid-email';
    
    expect(validator.validateField(input)).toBe(false);
  });
});
```

---

## Debugging

### Server-Side Debugging

```javascript
// Add detailed logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Use debugger
debugger; // Add breakpoint
```

### Client-Side Debugging

```javascript
// Console logging
console.log('Debug info:', variable);
console.table(arrayOfObjects);
console.error('Error:', error);

// Network monitoring
// Open DevTools > Network tab
// Monitor API requests and responses

// Use debugger
debugger; // Browser will pause here
```

### MongoDB Queries

```javascript
// Enable query logging
mongoose.set('debug', true);

// Check connection status
console.log('MongoDB status:', mongoose.connection.readyState);
// 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
```

---

## Best Practices

### Code Organization

1. **Modular Code**: Break down large functions into smaller, reusable functions
2. **Naming Conventions**: Use descriptive variable and function names
3. **Comments**: Add comments for complex logic
4. **Error Handling**: Always handle errors gracefully
5. **Async/Await**: Prefer async/await over callbacks

### Security

1. **Never commit .env** to version control
2. **Validate all inputs** on both client and server
3. **Use HTTPS** in production
4. **Keep dependencies updated**: `npm audit fix`
5. **Use rate limiting** on all public APIs

### Performance

1. **Minimize HTTP requests**: Bundle assets when possible
2. **Lazy load images**: Use IntersectionObserver
3. **Debounce scroll events**: Improve performance
4. **Cache API responses**: Reduce server load
5. **Optimize images**: Use WebP format, compress images

### Accessibility

1. **Use semantic HTML**: `<header>`, `<nav>`, `<main>`, `<section>`
2. **Add ARIA labels**: For screen readers
3. **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
4. **Color contrast**: Maintain WCAG 2.1 AA standards
5. **Focus indicators**: Visible focus states for all interactive elements

---

## Contributing

### Git Workflow

```bash
# 1. Create feature branch
git checkout -b feature/your-feature-name

# 2. Make changes
# Edit files...

# 3. Stage and commit
git add .
git commit -m "feat: add new feature"

# 4. Push to GitHub
git push origin feature/your-feature-name

# 5. Create Pull Request on GitHub
```

### Commit Message Convention

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: code style changes (formatting)
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Added unit tests
- [ ] Manual testing performed

## Screenshots (if applicable)
Add screenshots here
```

---

## Resources

### Official Documentation
- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)

### Tutorials
- [MDN Web Docs](https://developer.mozilla.org/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [JavaScript.info](https://javascript.info/)

### Tools
- [Postman](https://www.postman.com/) - API testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI
- [VS Code](https://code.visualstudio.com/) - Code editor
- [Git](https://git-scm.com/) - Version control

---

## Support

For development-related questions:
- **Email**: thakardhruvh@gmail.com
- **GitHub Issues**: [github.com/dhruvht612/Portfolio/issues](https://github.com/dhruvht612/Portfolio/issues)
- **Discussions**: [github.com/dhruvht612/Portfolio/discussions](https://github.com/dhruvht612/Portfolio/discussions)

---

**Developer Guide Version**: 1.0  
**Last Updated**: November 2025  
**Maintainer**: Dhruv Thakar

