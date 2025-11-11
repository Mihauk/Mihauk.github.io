// Theme toggle with persistence; default to dark.
const toggle = document.getElementById('theme-toggle');
const prefersDark = true; // default dark
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') document.body.classList.remove('dark');
else document.body.classList.add('dark');

toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  toggle.textContent = isDark ? '☀️' : '🌙';
});

// Fade-in animation for timeline items
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
