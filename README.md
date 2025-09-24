# 🧑‍💻 Dhruv Thakar -- Personal Portfolio Website

[![Made with
HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)\
[![Tailwind
CSS](https://img.shields.io/badge/TailwindCSS-%2338B2AC.svg?&style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)\
[![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)\
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)\
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)\
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)  
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge)](https://mongoosejs.com/)  
[![dotenv](https://img.shields.io/badge/dotenv-000000?style=for-the-badge)](https://github.com/motdotla/dotenv)  
[![Nodemailer](https://img.shields.io/badge/Nodemailer-009B77?style=for-the-badge)](https://nodemailer.com/)  
[![node-fetch](https://img.shields.io/badge/node--fetch-333333?style=for-the-badge)](https://github.com/node-fetch/node-fetch)  
[![body-parser](https://img.shields.io/badge/body--parser-6DB33F?style=for-the-badge)](https://github.com/expressjs/body-parser)  


> A modern, responsive portfolio website to showcase my work, skills,
> and academic background as a Computer Science student at Ontario Tech
> University.

------------------------------------------------------------------------

## 📑 Table of Contents

-   [About](#-about)\
-   [Features](#-features)\
-   [Technologies Used](#-technologies-used)\
-   [Sections](#-sections)\
-   [Getting Started](#-getting-started)\
-   [Backend Setup](#-backend-setup)\
-   [API](#-api)\
-   [Contact](#-contact)

------------------------------------------------------------------------

## 📌 About

This portfolio serves as a comprehensive online resume and project
showcase for **Dhruv Thakar**. It highlights my passion for
technology---ranging from software development to electronics---through
a clean, professional design.

------------------------------------------------------------------------

## ✨ Features

-   ✅ **Responsive Design** -- Works smoothly across all screen sizes\
-   🎯 **Interactive UI** -- Smooth scrolling, filterable project and
    course cards\
-   🧠 **Dynamic Content** -- Active navbar highlighting, preloader
    animation\
-   🧾 **Backend Integration** -- Contact form powered by Express API

------------------------------------------------------------------------

## 🛠️ Technologies Used

  Tech               Purpose
  ------------------ -------------------------------
  **HTML5**          Structure and semantic layout
  **Tailwind CSS**   Styling and responsive design
  **JavaScript**     Interactivity and logic
  **Node.js**        Backend runtime environment
  **Express.js**     Server framework
  **Font Awesome**   Icons and visual elements

------------------------------------------------------------------------

## 📂 Sections

-   **🏠 Home** -- Introduction with name and social links\
-   **👨‍💻 About Me** -- Background summary\
-   **🎓 Education** -- Academic history\
-   **🤝 Volunteering** -- Community contributions\
-   **📣 Clubs** -- University organizations involvement\
-   **💼 Projects** -- Featured projects with filters\
-   **🧠 Skills** -- Technical and soft skills\
-   **📘 Courses** -- Completed and relevant coursework\
-   **📆 Timeline** -- Academic and personal milestones\
-   **🌱 Learning & Growth** -- Ongoing learning goals\
-   **📝 Blog** -- Portfolio development write-up\
-   **📬 Contact** -- Contact form + links

------------------------------------------------------------------------

## 🚀 Getting Started (Frontend Only)

To view the static portfolio locally without backend:

``` bash
git clone https://github.com/dhruvthakar/portfolio.git
cd portfolio
open public/index.html
```

------------------------------------------------------------------------

## ⚡ Backend Setup

To enable backend functionality (contact form, serving static files):

``` bash
git clone https://github.com/dhruvthakar/portfolio.git
cd portfolio
npm install
node index.js
```

Visit 👉 <http://localhost:3000>

------------------------------------------------------------------------

## 📬 API

### `POST /api/contact`

Handles contact form submissions.

**Request Body:**

``` json
{
  "name": "Your Name",
  "email": "your@email.com",
  "message": "Hello Dhruv!"
}
```

**Response:**

``` json
{
  "success": true,
  "message": "Thanks for reaching out!"
}
```

------------------------------------------------------------------------

## 👤 Contact

**Dhruv Thakar**\
- 📧 <thakardhruvh@gmail.com>\
- 🔗 [LinkedIn](https://linkedin.com/in/dhruv-thakar-ba46aa296)\
- 💻 [GitHub](https://github.com/dhruvthakar)
