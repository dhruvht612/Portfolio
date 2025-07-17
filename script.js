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
