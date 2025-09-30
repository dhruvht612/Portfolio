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



document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('menu-btn');
  const nav = document.getElementById('nav-links');

  if (btn && nav) {
    btn.addEventListener('click', () => {
      nav.classList.toggle('hidden');
    });
  }

    // Project Filtering Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length && projectCards.length) {
      filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
          const filter = this.getAttribute('data-filter');
          projectCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            if (filter === 'all' || categories.includes(filter)) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });
          filterButtons.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
        });
      });
    }

  const highlightActiveLink = () => {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        links.forEach(link => {
          link.classList.remove('text-red-400');
          if (link.getAttribute('href') === '#' + section.id) {
            link.classList.add('text-red-400');
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

// COURSES FILTERING FUNCTIONALITY
document.addEventListener("DOMContentLoaded", () => {
  const courseButtons = document.querySelectorAll('.course-filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  courseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button styling
      courseButtons.forEach(b => {
        b.classList.remove('active', 'bg-red-500');
        b.classList.add('bg-gray-700');
      });
      btn.classList.add('active', 'bg-red-500');
      btn.classList.remove('bg-gray-700');

      // Filter cards
      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});

const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

 menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('hidden');
});

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("main-content");

  preloader.classList.add("opacity-0", "transition-opacity", "duration-500");

  setTimeout(() => {
    preloader.style.display = "none";
    content.classList.remove("hidden");
  }, 500);
});

document
  .getElementById("contact-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();
    alert(result.message);
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
