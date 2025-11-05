# Portfolio Website - Technical Documentation

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Performance Optimization](#performance-optimization)
- [Security](#security)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

A modern, responsive personal portfolio website for Dhruv Thakar, featuring:
- **Frontend**: HTML5, Tailwind CSS, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **AI Integration**: OpenAI GPT-4 for chatbot functionality
- **PWA Support**: Service Worker for offline functionality
- **Security**: Helmet.js, CORS, Rate Limiting

**Live Demo**: [https://dhruvthakar.dev](https://dhruvthakar.dev)  
**GitHub**: [https://github.com/dhruvht612/Portfolio](https://github.com/dhruvht612/Portfolio)

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client (Browser)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   HTML/CSS   │  │  JavaScript  │  │Service Worker│      │
│  │  (Frontend)  │  │  (Client-side│  │    (PWA)     │      │
│  │              │  │   Logic)     │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/API Calls
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Express.js Server                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Security   │  │     API      │  │    Static    │      │
│  │  Middleware  │  │   Endpoints  │  │  File Server │      │
│  │ (Helmet/CORS)│  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │   MongoDB   │ │  OpenAI API │ │  Nodemailer │
    │  (Messages) │ │  (Chatbot)  │ │   (Email)   │
    └─────────────┘ └─────────────┘ └─────────────┘
```

### Request Flow

1. **Static Content**: Browser → Express → Static Files
2. **Contact Form**: Form Submit → API → Validation → MongoDB + Email
3. **Chatbot**: User Message → API → OpenAI → Response
4. **PWA**: Service Worker → Cache → Offline Support

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **HTML5** | Latest | Semantic structure, SEO optimization |
| **Tailwind CSS** | 3.x | Utility-first styling, responsive design |
| **JavaScript** | ES6+ | Client-side interactivity |
| **Font Awesome** | 6.4.0 | Icons and visual elements |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 18+ | Runtime environment |
| **Express.js** | 5.1.0 | Web server framework |
| **Mongoose** | 8.18.2 | MongoDB ODM |
| **Dotenv** | 17.2.2 | Environment variable management |

### Security & Performance
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Helmet.js** | 7.2.0 | HTTP headers security |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **Express Rate Limit** | 7.5.1 | Rate limiting/DDoS protection |

### Additional Services
| Service | Purpose |
|---------|---------|
| **OpenAI API** | AI-powered chatbot |
| **Nodemailer** | Email notifications |
| **MongoDB Atlas** | Cloud database |

---

## Project Structure

```
Portfolio/
├── index.html                 # Main HTML file
├── script.js                  # Client-side JavaScript
├── style.css                  # Custom CSS styles
├── index.js                   # Express server (entry point)
│
├── models/
│   └── Message.js             # Mongoose schema for contact messages
│
├── sw.js                      # Service Worker (PWA)
├── manifest.json              # PWA manifest
│
├── package.json               # Dependencies and scripts
├── package-lock.json          # Locked dependency versions
├── .env                       # Environment variables (not in repo)
├── .gitignore                 # Git ignore rules
│
├── README.md                  # Project overview
├── DOCUMENTATION.md           # Technical documentation (this file)
├── SECURITY.md                # Security policy
├── sitemap.xml                # SEO sitemap
├── robots.txt                 # SEO robots file
│
├── testContact.js             # API testing script
│
└── assets/                    # Images and logos
    ├── profile.png
    ├── logo.png
    ├── ontariotechu_logo.png
    ├── fletcher's_meadow.png
    ├── google_logo.jpg
    ├── HackerRank_logo.png
    ├── Forage_logo.jpeg
    └── oneroadmap_logo.jpeg
```

---

## Features

### 1. **Responsive Design**
- Mobile-first approach using Tailwind CSS
- Breakpoints: `sm`, `md`, `lg`, `xl`
- Collapsible mobile navigation menu

### 2. **Progressive Web App (PWA)**
- Service Worker for offline functionality
- Installable on mobile devices
- App-like experience with manifest

### 3. **Dark/Light Theme**
- Theme toggle with localStorage persistence
- CSS custom properties for theme variables
- Smooth transition between themes

### 4. **Contact Form**
- Real-time client-side validation
- Server-side validation and sanitization
- MongoDB storage
- Email notifications via Nodemailer
- Rate limiting (5 submissions/hour)

### 5. **AI Chatbot**
- OpenAI GPT-4 integration
- Portfolio-specific system prompt
- Fallback messages when API unavailable

### 6. **Project Filtering**
- Dynamic filtering by technology
- Smooth animations
- Accessible with ARIA attributes

### 7. **Performance Optimizations**
- Lazy loading for images
- IntersectionObserver for scroll animations
- Debounced scroll events
- Minified assets

### 8. **Accessibility**
- WCAG 2.1 compliant
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- Skip to content link
- ARIA labels and roles

### 9. **SEO Optimization**
- Meta tags (Open Graph, Twitter Cards)
- Structured data (JSON-LD)
- Semantic HTML5
- Sitemap and robots.txt

### 10. **Security Features**
- Helmet.js for secure HTTP headers
- CORS configuration
- Rate limiting on all endpoints
- Input validation and sanitization
- Environment variable protection

---

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (local or Atlas account)
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/dhruvht612/Portfolio.git
cd Portfolio
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Variables
Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# Email Configuration (Gmail)
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_app_specific_password

# OpenAI API (for chatbot)
OPENAI_API_KEY=sk-your-openai-api-key

# Domain (for production CORS)
DOMAIN=https://dhruvthakar.dev
```

### Step 4: Run in Development Mode
```bash
npm run dev
```
Visits: http://localhost:3000

### Step 5: Run in Production Mode
```bash
npm start
```

---

## Configuration

### MongoDB Setup

#### Option 1: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create database user
4. Whitelist IP addresses (or use `0.0.0.0/0` for all)
5. Get connection string and add to `.env`

#### Option 2: Local MongoDB
```bash
# Install MongoDB locally
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Start MongoDB service
mongod --dbpath /path/to/data/directory

# Update .env
MONGO_URI=mongodb://localhost:27017/portfolio
```

### Email Configuration (Nodemailer)

For Gmail:
1. Enable 2-Factor Authentication
2. Generate App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Use app password in `.env` (not your regular password)

For other providers, check [Nodemailer documentation](https://nodemailer.com/).

### OpenAI API Setup
1. Create account at [OpenAI](https://platform.openai.com/)
2. Navigate to API Keys section
3. Create new secret key
4. Add to `.env` file
5. Monitor usage at [OpenAI Usage](https://platform.openai.com/usage)

---

## Deployment

### Deploy to Render

1. **Create Render Account**: [render.com](https://render.com)

2. **Connect GitHub Repository**

3. **Configure Build Settings**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Add Environment Variables** in Render dashboard:
   ```
   MONGO_URI=your_mongodb_uri
   EMAIL_USER=your_email
   EMAIL_PASS=your_password
   OPENAI_API_KEY=your_key
   NODE_ENV=production
   ```

5. **Deploy**: Render will auto-deploy on git push

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard.

### Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set MONGO_URI=your_uri
heroku config:set EMAIL_USER=your_email
# ... add all variables

# Deploy
git push heroku main

# Open app
heroku open
```

### Deploy to Netlify (Frontend Only)

For static hosting:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

Note: You'll need separate backend hosting for API endpoints.

---

## Performance Optimization

### Current Optimizations

1. **Image Optimization**
   - Lazy loading with IntersectionObserver
   - WebP format support
   - Preload critical images

2. **Code Splitting**
   - Modular JavaScript classes
   - Deferred script loading

3. **Caching**
   - Service Worker caching
   - Browser caching headers
   - Static asset versioning

4. **Minification**
   - CSS minification in production
   - JavaScript minification
   - HTML compression

5. **Database**
   - MongoDB indexes on frequently queried fields
   - Connection pooling
   - Query optimization

### Performance Metrics

Target scores (Lighthouse):
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

### Further Optimizations

```javascript
// Add to package.json
"scripts": {
  "build": "vite build",
  "preview": "vite preview"
}
```

Consider adding:
- Image CDN (Cloudinary, imgix)
- Code minification with Terser
- Brotli compression
- HTTP/2 server push

---

## Security

### Implemented Security Measures

1. **Helmet.js**
   - Content Security Policy (CSP)
   - X-Frame-Options (clickjacking protection)
   - X-Content-Type-Options
   - Strict-Transport-Security (HSTS)

2. **Rate Limiting**
   - Global: 100 requests/15 minutes
   - Contact form: 5 submissions/hour
   - Prevents DDoS attacks

3. **Input Validation**
   - Server-side validation
   - Email regex validation
   - String length limits
   - Sanitization of user inputs

4. **CORS Configuration**
   - Whitelist specific origins in production
   - Credentials support

5. **Environment Variables**
   - Sensitive data not in codebase
   - `.env` in `.gitignore`

6. **MongoDB Security**
   - Mongoose schema validation
   - Indexed fields
   - IP whitelist on Atlas

7. **HTTPS Only**
   - Force HTTPS in production
   - Secure cookies

### Security Headers Example

```javascript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
      scriptSrc: ["'self'", "https://cdn.tailwindcss.com"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

### Regular Maintenance
- Update dependencies: `npm audit fix`
- Check vulnerabilities: `npm audit`
- Review security advisories
- Update Node.js version

---

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```
Error: MongoServerError: bad auth : authentication failed
```
**Solution**:
- Verify `MONGO_URI` in `.env`
- Check database user credentials
- Whitelist IP address in MongoDB Atlas
- Test connection string format

#### 2. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution**:
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

#### 3. Email Not Sending
```
Error: Invalid login: 535-5.7.8 Username and Password not accepted
```
**Solution**:
- Use Gmail App Password (not regular password)
- Enable 2FA on Google account
- Check `EMAIL_USER` and `EMAIL_PASS` in `.env`

#### 4. Service Worker Not Updating
**Solution**:
```javascript
// Update CACHE_NAME in sw.js
const CACHE_NAME = 'dhruv-portfolio-v2'; // increment version

// Force refresh
// In browser DevTools: Application > Service Workers > Unregister
```

#### 5. CORS Errors
```
Access to fetch at 'http://localhost:3000/api/contact' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy
```
**Solution**:
```javascript
// In index.js, update CORS config
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],
  credentials: true
}));
```

#### 6. Module Not Found Error
```
Error: Cannot find module 'express'
```
**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Debugging Tips

1. **Enable Detailed Logging**
```javascript
// In index.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});
```

2. **Test API Endpoints**
```bash
# Test contact form
node testContact.js

# Or use curl
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Hello"}'
```

3. **Check Environment Variables**
```javascript
// Add to index.js
console.log('Environment:', process.env.NODE_ENV);
console.log('MongoDB URI:', process.env.MONGO_URI ? 'Set' : 'Not Set');
```

4. **Browser Console**
   - Check for JavaScript errors
   - Monitor network requests (DevTools > Network)
   - Verify API responses

---

## API Testing

### Using Postman

1. **Import Collection**: Create new collection "Portfolio API"

2. **Test Contact Endpoint**:
   - **URL**: `POST http://localhost:3000/api/contact`
   - **Headers**: `Content-Type: application/json`
   - **Body**:
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "message": "This is a test message"
   }
   ```

3. **Test Chat Endpoint**:
   - **URL**: `POST http://localhost:3000/api/chat`
   - **Headers**: `Content-Type: application/json`
   - **Body**:
   ```json
   {
     "message": "What projects has Dhruv worked on?"
   }
   ```

### Using cURL

```bash
# Contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Test message"
  }'

# Chatbot
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tell me about Dhruv"
  }'
```

---

## Browser Support

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support |
| Edge | 90+ | Full support |
| Opera | 76+ | Full support |
| Mobile Safari | iOS 14+ | PWA support |
| Chrome Mobile | 90+ | PWA support |

### Polyfills
- IntersectionObserver (for older browsers)
- Fetch API (IE11)

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Style
- Use ES6+ features
- Follow Airbnb JavaScript Style Guide
- Add JSDoc comments for functions
- Test before committing

---

## License

This project is licensed under the ISC License. See `LICENSE` file for details.

---

## Credits

**Developer**: Dhruv Thakar  
**Email**: thakardhruvh@gmail.com  
**GitHub**: [@dhruvht612](https://github.com/dhruvht612)  
**LinkedIn**: [dhruv-thakar](https://linkedin.com/in/dhruv-thakar-ba46aa296)

### Technologies Used
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI](https://openai.com/)
- [Font Awesome](https://fontawesome.com/)

---

## Changelog

### Version 1.0.0 (Current)
- Initial release
- Portfolio sections (About, Projects, Skills, Education, Blog, Contact)
- Contact form with MongoDB integration
- AI chatbot with OpenAI
- PWA support
- Dark/Light theme toggle
- Responsive design
- Security features (Helmet, CORS, Rate Limiting)
- SEO optimization

### Upcoming Features
- Blog CMS integration
- Project search functionality
- Performance dashboard
- Analytics integration
- Newsletter subscription
- Multi-language support

---

## Support

For issues, questions, or suggestions:
- **Email**: thakardhruvh@gmail.com
- **GitHub Issues**: [github.com/dhruvht612/Portfolio/issues](https://github.com/dhruvht612/Portfolio/issues)

---

**Last Updated**: November 2025  
**Version**: 1.0.0

