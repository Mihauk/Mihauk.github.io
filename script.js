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


// ---- Particle Network Animation ----
const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');
let width, height, particles;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: 1.6 + Math.random() * 1.4
  }));
}
window.addEventListener('resize', resize);
resize();

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'rgba(105,167,255,0.8)';
  ctx.strokeStyle = 'rgba(167,139,250,0.4)';
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();


// ---- Fade-In on Scroll ----
const fadeSections = document.querySelectorAll('.section');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeSections.forEach(sec => {
  sec.classList.add('fade-section');
  fadeObserver.observe(sec);
});
