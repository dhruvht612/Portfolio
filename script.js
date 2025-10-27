// Debounce function to limit how often a function runs
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    const context = this, args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Theme Management
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
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (this.theme === 'dark') {
        icon.className = 'fas fa-moon';
      } else {
        icon.className = 'fas fa-sun';
      }
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  bindEvents() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }
}

// Lazy Loading
class LazyLoader {
  constructor() {
    this.imageObserver = null;
    this.init();
  }

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

// Form Validation
class FormValidator {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.init();
  }

  init() {
    if (this.form) {
      this.bindEvents();
    }
  }

  bindEvents() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time validation
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
      case 'name':
        if (value.length < 2) {
          isValid = false;
          errorMessage = 'Name must be at least 2 characters long';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
        break;
      case 'message':
        if (value.length < 10) {
          isValid = false;
          errorMessage = 'Message must be at least 10 characters long';
        }
        break;
    }

    if (!isValid) {
      this.showError(field, errorElement, errorMessage);
    } else {
      this.clearError(field);
    }

    return isValid;
  }

  showError(field, errorElement, message) {
    field.classList.add('border-red-400');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
  }

  clearError(field) {
    field.classList.remove('border-red-400');
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
      errorElement.classList.add('hidden');
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitSpinner = document.getElementById('submit-spinner');
    const submitStatus = document.getElementById('submit-status');

    // Validate all fields
    const inputs = this.form.querySelectorAll('input[required], textarea[required]');
    let isFormValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      submitStatus.textContent = 'Please fix the errors above';
      submitStatus.className = 'text-red-400 text-center mt-2';
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    submitSpinner.classList.remove('hidden');

    try {
      const formData = new FormData(this.form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        submitStatus.textContent = 'Message sent successfully!';
        submitStatus.className = 'text-green-400 text-center mt-2';
        this.form.reset();
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      submitStatus.textContent = 'Failed to send message. Please try again.';
      submitStatus.className = 'text-red-400 text-center mt-2';
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitText.textContent = 'Send Message';
      submitSpinner.classList.add('hidden');
    }
  }
}

// Smooth Scrolling
class SmoothScroller {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// Animation on Scroll
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      document.querySelectorAll('.project-card, .skill-card, article').forEach(el => {
        observer.observe(el);
      });
    }
  }
}



// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all classes
  new ThemeManager();
  new LazyLoader();
  new FormValidator();
  new SmoothScroller();
  new ScrollAnimations();

  // Mobile menu functionality
  const btn = document.getElementById('menu-btn');
  const nav = document.getElementById('nav-links');

  if (btn && nav) {
    btn.addEventListener('click', () => {
      const isHidden = nav.classList.contains('hidden');
      nav.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', !isHidden);
    });
  }

  // Project Filtering Logic with accessibility
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length && projectCards.length) {
      filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
          const filter = this.getAttribute('data-filter');
        
        // Update ARIA states
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');
        
        // Filter cards with animation
          projectCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            if (filter === 'all' || categories.includes(filter)) {
              card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease-in';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

  // Active navigation highlighting
  const highlightActiveLink = () => {
    const links = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        links.forEach(link => {
          link.removeAttribute('aria-current');
          if (link.getAttribute('href') === '#' + section.id) {
            link.setAttribute('aria-current', 'page');
          }
        });
      }
    });
  };

  // Run once on load in case user is not at the top
  highlightActiveLink();

  // Attach scroll event with debounce
  document.addEventListener('scroll', debounce(highlightActiveLink, 50));
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
    });
  });
}

// Preloader functionality
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("main-content");

  if (preloader && content) {
  preloader.classList.add("opacity-0", "transition-opacity", "duration-500");

  setTimeout(() => {
    preloader.style.display = "none";
    content.classList.remove("hidden");
  }, 500);
  }
  });

// ================= CHATBOT WIDGET =================
const toggleBtn = document.getElementById("chat-toggle");
const chatBox = document.getElementById("chat-box");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

// Toggle chat box open/close
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    chatBox.classList.toggle("hidden");
  });
}

// Send message to backend
async function sendMessage() {
  const msg = chatInput.value.trim();
  if (!msg) return;

  // Show user message
  chatMessages.innerHTML += `<div><b>You:</b> ${msg}</div>`;
  chatInput.value = "";

  try {
    // Call backend API
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });

    const data = await res.json();

    // Show bot reply
    chatMessages.innerHTML += `<div class="text-green-400"><b>Bot:</b> ${data.reply}</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } catch (err) {
    console.error("Chat error:", err);
    chatMessages.innerHTML += `<div class="text-red-400"><b>Bot:</b> ⚠️ Error connecting to server</div>`;
  }
}

// Event listeners
if (chatSend) chatSend.addEventListener("click", sendMessage);
if (chatInput) {
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
}

// ================= WEATHER WIDGET =================
const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

async function loadWeather(lat, lon) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    document.getElementById("weather-city").textContent = data.name;
    document.getElementById("weather-temp").textContent = `${data.main.temp}°C`;
    document.getElementById("weather-desc").textContent =
      data.weather[0].description;

    const icon = document.getElementById("weather-icon");
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.classList.remove("hidden");
  } catch (err) {
    console.error("Weather error:", err);
    document.getElementById("weather-city").textContent =
      "Unable to load weather";
  }
}

// ================= GET USER LOCATION =================
function getLocationAndWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        loadWeather(lat, lon);
      },
      (error) => {
        console.warn("Geolocation blocked or failed, fallback to Toronto");
        // fallback to Toronto
        loadWeather(43.65107, -79.347015);
      }
    );
  } else {
    console.warn("Geolocation not supported, fallback to Toronto");
    loadWeather(43.65107, -79.347015);
  }
}

document.addEventListener("DOMContentLoaded", getLocationAndWeather);
