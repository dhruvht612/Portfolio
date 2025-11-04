# API Documentation

## Table of Contents
- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)
- [Error Handling](#error-handling)
- [Endpoints](#endpoints)
  - [Contact Form API](#contact-form-api)
  - [Chatbot API](#chatbot-api)
- [Request/Response Examples](#requestresponse-examples)
- [Status Codes](#status-codes)
- [Testing](#testing)

---

## Overview

This API powers the backend functionality of Dhruv Thakar's portfolio website, providing endpoints for contact form submissions and AI-powered chatbot interactions.

**API Version**: 1.0  
**Protocol**: HTTPS  
**Data Format**: JSON

---

## Base URL

### Development
```
http://localhost:3000
```

### Production
```
https://dhruvthakar.dev
```

---

## Authentication

Currently, the API does not require authentication for public endpoints. All requests are rate-limited to prevent abuse.

Future versions may include:
- API key authentication
- JWT tokens for admin panel
- OAuth for social integrations

---

## Rate Limiting

Rate limits are enforced to protect the API from abuse.

### Global Rate Limit
- **Limit**: 100 requests per 15 minutes per IP
- **Headers**:
  ```
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 99
  X-RateLimit-Reset: 1635724800
  ```

### Contact Form Rate Limit
- **Limit**: 5 submissions per hour per IP
- **Purpose**: Prevent spam and abuse

### Rate Limit Exceeded Response
```json
{
  "error": "Too many requests from this IP, please try again later."
}
```
**Status Code**: `429 Too Many Requests`

---

## Error Handling

### Error Response Format

All error responses follow this structure:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (only in development)"
}
```

### Common Error Scenarios

1. **Validation Error** (400)
   ```json
   {
     "success": false,
     "message": "All fields are required"
   }
   ```

2. **Rate Limit Exceeded** (429)
   ```json
   {
     "error": "Too many contact form submissions, please try again later."
   }
   ```

3. **Server Error** (500)
   ```json
   {
     "success": false,
     "message": "Server error. Please try again later."
   }
   ```

---

## Endpoints

### Contact Form API

Submit a message through the portfolio contact form.

#### Endpoint
```
POST /api/contact
```

#### Request Headers
```
Content-Type: application/json
```

#### Request Body

| Field | Type | Required | Description | Constraints |
|-------|------|----------|-------------|-------------|
| `name` | string | Yes | Sender's full name | 2-100 characters |
| `email` | string | Yes | Valid email address | Valid email format |
| `message` | string | Yes | Message content | 10-1000 characters |

**Example Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "message": "Hello Dhruv! I would like to discuss a potential collaboration on a web development project."
}
```

#### Response

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Message sent and saved successfully!"
}
```

**Error Responses:**

**400 Bad Request** - Missing fields:
```json
{
  "success": false,
  "message": "All fields are required"
}
```

**400 Bad Request** - Invalid email:
```json
{
  "success": false,
  "message": "Please provide a valid email address"
}
```

**400 Bad Request** - Name too short:
```json
{
  "success": false,
  "message": "Name must be between 2 and 100 characters"
}
```

**400 Bad Request** - Message too short:
```json
{
  "success": false,
  "message": "Message must be between 10 and 1000 characters"
}
```

**429 Too Many Requests** - Rate limit exceeded:
```json
{
  "error": "Too many contact form submissions, please try again later."
}
```

**500 Internal Server Error**:
```json
{
  "success": false,
  "message": "Server error. Please try again later."
}
```

#### What Happens Behind the Scenes

1. **Validation**: Request body is validated for required fields and constraints
2. **Sanitization**: Inputs are trimmed and sanitized
3. **Database**: Message is saved to MongoDB (if connected)
4. **Email**: Notification email is sent to portfolio owner (if configured)
5. **Logging**: Message details are logged to console
6. **Response**: Success or error response is returned

#### Additional Information Stored

The API automatically captures:
- **IP Address**: Sender's IP for spam prevention
- **User Agent**: Browser and device information
- **Timestamp**: Exact time of submission
- **Read Status**: Initially set to `false`

---

### Chatbot API

Interact with the AI-powered portfolio assistant using OpenAI's GPT-4.

#### Endpoint
```
POST /api/chat
```

#### Request Headers
```
Content-Type: application/json
```

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `message` | string | Yes | User's question or message |

**Example Request Body:**
```json
{
  "message": "What programming languages does Dhruv know?"
}
```

#### Response

**Success Response (200 OK):**
```json
{
  "reply": "Dhruv is proficient in several programming languages including Java, Python, C++, C, JavaScript, and Assembly. He has practical experience using these languages in various projects ranging from web development to embedded systems."
}
```

**Fallback Response (when OpenAI not configured):**
```json
{
  "reply": "Hi! I'm Dhruv's portfolio assistant. The chatbot feature is currently in development mode. Feel free to explore the portfolio or use the contact form to reach out directly!"
}
```

**Error Response (500):**
```json
{
  "reply": "⚠️ Sorry, something went wrong."
}
```

#### System Prompt

The chatbot uses this system prompt:
```
You are Dhruv Thakar's portfolio assistant. Answer questions about 
Dhruv's skills, projects, education, and background in a professional 
but friendly tone. If asked about contact, direct users to the Contact 
section.
```

#### Example Conversations

**Q**: "What is Dhruv's educational background?"  
**A**: "Dhruv is currently pursuing a Bachelor of Science in Computer Science at Ontario Tech University in Oshawa, Ontario, with an expected graduation in April 2028. He's building a strong foundation in software development, data structures, and computational problem-solving through coursework and hands-on projects."

**Q**: "Can you tell me about his projects?"  
**A**: "Dhruv has worked on diverse projects including: a Common Algorithms Library in Java, a Personal Portfolio Website with HTML/CSS/JavaScript, an Airline Reservation System in Python, a File Compression Tool using Huffman Coding, and hardware projects like a Sumo Bot with Arduino. His projects span web development, algorithms, embedded systems, and robotics."

**Q**: "How can I contact Dhruv?"  
**A**: "You can reach out to Dhruv through the Contact section on this portfolio website. Simply fill out the contact form with your name, email, and message. You can also connect with him via email at thakardhruvh@gmail.com or through his LinkedIn profile."

#### Rate Limiting

The chatbot endpoint is subject to the global rate limit (100 requests per 15 minutes).

#### Cost Considerations

Each chatbot interaction consumes OpenAI API credits. The cost depends on:
- **Model**: `gpt-4o-mini` (cost-effective)
- **Tokens**: Input tokens (user message + system prompt) + output tokens (response)
- **Pricing**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens

**Estimated cost per interaction**: $0.0001 - $0.001 USD

---

## Request/Response Examples

### cURL Examples

#### Contact Form
```bash
curl -X POST https://dhruvthakar.dev/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "message": "Hi Dhruv, I came across your portfolio and was impressed by your work. I would love to connect and discuss potential collaboration opportunities."
  }'
```

#### Chatbot
```bash
curl -X POST https://dhruvthakar.dev/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What technologies does Dhruv use for web development?"
  }'
```

### JavaScript (Fetch API)

#### Contact Form
```javascript
async function submitContactForm(name, email, message) {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Message sent successfully!');
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}

// Usage
submitContactForm(
  'John Doe',
  'john@example.com',
  'Hello Dhruv!'
);
```

#### Chatbot
```javascript
async function sendChatMessage(message) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });
    
    const data = await response.json();
    console.log('Bot reply:', data.reply);
    return data.reply;
  } catch (error) {
    console.error('Chat error:', error);
    return 'Sorry, something went wrong.';
  }
}

// Usage
sendChatMessage('What projects has Dhruv worked on?');
```

### Python (Requests)

#### Contact Form
```python
import requests

url = 'https://dhruvthakar.dev/api/contact'
payload = {
    'name': 'Alice Johnson',
    'email': 'alice@example.com',
    'message': 'Great portfolio! Would love to connect.'
}

response = requests.post(url, json=payload)
print(response.json())
```

#### Chatbot
```python
import requests

url = 'https://dhruvthakar.dev/api/chat'
payload = {
    'message': 'Tell me about Dhruv\'s skills'
}

response = requests.post(url, json=payload)
print(response.json()['reply'])
```

### Node.js (Axios)

```javascript
const axios = require('axios');

// Contact Form
async function submitContact() {
  try {
    const response = await axios.post('https://dhruvthakar.dev/api/contact', {
      name: 'Bob Williams',
      email: 'bob@example.com',
      message: 'Impressive work on your projects!'
    });
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
}

// Chatbot
async function askChatbot() {
  try {
    const response = await axios.post('https://dhruvthakar.dev/api/chat', {
      message: 'What is Dhruv studying?'
    });
    console.log(response.data.reply);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

---

## Status Codes

| Code | Message | Description |
|------|---------|-------------|
| **200** | OK | Request successful |
| **400** | Bad Request | Invalid input or missing required fields |
| **429** | Too Many Requests | Rate limit exceeded |
| **500** | Internal Server Error | Server-side error occurred |

---

## Testing

### Using the Test Script

The repository includes `testContact.js` for testing the contact form API:

```bash
# Make sure server is running
npm start

# In another terminal, run test
node testContact.js
```

**Test Script Content:**
```javascript
import fetch from "node-fetch";

const test = async () => {
  const res = await fetch("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test User",
      email: "test@example.com",
      message: "Hello, this is a test message!",
    }),
  });

  const data = await res.json();
  console.log("Response:", data);
};

test();
```

### Using Postman

1. **Import Collection**
   - Create a new collection: "Portfolio API"
   
2. **Add Requests**
   - Contact Form: `POST http://localhost:3000/api/contact`
   - Chatbot: `POST http://localhost:3000/api/chat`

3. **Set Headers**
   ```
   Content-Type: application/json
   ```

4. **Add Test Body** (JSON format)

5. **Send Request** and verify response

### Testing Rate Limits

```javascript
// Test rate limiting by sending multiple requests
async function testRateLimit() {
  for (let i = 0; i < 6; i++) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Test ${i}`,
        email: `test${i}@example.com`,
        message: `Test message ${i}`
      })
    });
    
    const data = await response.json();
    console.log(`Request ${i + 1}:`, response.status, data);
  }
}

testRateLimit();
```

Expected: First 5 requests succeed, 6th request returns 429.

### Testing Validation

```javascript
// Test with invalid email
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test',
    email: 'invalid-email',
    message: 'This should fail'
  })
})
.then(res => res.json())
.then(data => console.log(data));
// Expected: "Please provide a valid email address"

// Test with short message
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test',
    email: 'test@example.com',
    message: 'Short'
  })
})
.then(res => res.json())
.then(data => console.log(data));
// Expected: "Message must be between 10 and 1000 characters"
```

---

## Security Considerations

### Input Sanitization
All inputs are:
- Trimmed of whitespace
- Validated against regex patterns
- Limited in length
- Sanitized to prevent XSS attacks

### CORS Policy
- Development: All origins allowed
- Production: Whitelist specific domains

### Rate Limiting
- Prevents DDoS attacks
- Prevents spam submissions
- IP-based tracking

### Data Storage
- Sensitive data stored in MongoDB with encryption
- IP addresses logged for security auditing
- Passwords never stored in plain text (for future features)

### API Key Protection
- OpenAI API key stored in environment variables
- Never exposed to client-side code
- Rotated regularly

---

## Best Practices

### When Using the API

1. **Always validate inputs** on the client side before sending requests
2. **Handle rate limits** gracefully with user feedback
3. **Implement retry logic** with exponential backoff for failed requests
4. **Show loading states** during API calls
5. **Provide meaningful error messages** to users
6. **Don't expose sensitive data** in error messages
7. **Use HTTPS** in production
8. **Cache responses** when appropriate
9. **Monitor API usage** to detect anomalies
10. **Keep dependencies updated** for security patches

### Error Handling Example

```javascript
async function robustContactSubmit(name, email, message) {
  const maxRetries = 3;
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      
      if (response.status === 429) {
        // Rate limited - don't retry
        return { success: false, message: 'Too many submissions. Please try again later.' };
      }
      
      const data = await response.json();
      
      if (data.success) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      attempt++;
      
      if (attempt >= maxRetries) {
        return { 
          success: false, 
          message: 'Failed to send message after multiple attempts. Please try again later.' 
        };
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
    }
  }
}
```

---

## Webhooks (Future Feature)

Future versions may include webhook support for:
- Form submission notifications
- Real-time updates
- Third-party integrations

---

## Changelog

### Version 1.0 (Current)
- Initial API release
- Contact form endpoint
- Chatbot endpoint
- Rate limiting
- Input validation
- MongoDB integration
- Email notifications

### Planned Features
- API key authentication
- Admin panel API
- Blog post API (CRUD operations)
- Analytics API
- File upload endpoint
- Newsletter subscription API

---

## Support

For API-related issues or questions:
- **Email**: thakardhruvh@gmail.com
- **GitHub Issues**: [github.com/dhruvht612/Portfolio/issues](https://github.com/dhruvht612/Portfolio/issues)

---

**API Documentation Version**: 1.0  
**Last Updated**: November 2025  
**Author**: Dhruv Thakar

