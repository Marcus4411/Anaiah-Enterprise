/* ============================================================
   ANAIAH ENTERPRISE — JavaScript
   ============================================================ */

'use strict';

// ─── Navbar: scroll effect + active link ───────────────────
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

// ─── Mobile hamburger menu ──────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinksEl.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── Scroll Reveal ─────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for siblings
      const siblings = [...entry.target.parentElement.children].filter(
        el => el.classList.contains('reveal')
      );
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 80}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── WhatsApp number ────────────────────────────────────────
const WA_NUMBER = '260971627899'; // +260 971 627 899 (Zambia)

// ─── Contact Form → WhatsApp ────────────────────────────────
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate name
  const name = form.querySelector('#name').value.trim();
  if (!name) {
    shakeField(form.querySelector('#name'));
    return;
  }

  // Gather fields
  const phone   = form.querySelector('#phone').value.trim();
  const email   = form.querySelector('#email').value.trim();
  const service = form.querySelector('#service');
  const serviceLabel = service.options[service.selectedIndex].text;
  const message = form.querySelector('#message').value.trim();

  // Build the WhatsApp message
  let text = `Hello Anaiah Enterprise! 👋\n\n`;
  text += `*Name:* ${name}\n`;
  if (phone)   text += `*Phone:* ${phone}\n`;
  if (email)   text += `*Email:* ${email}\n`;
  if (service.value) text += `*Service:* ${serviceLabel}\n`;
  if (message) text += `\n*Message:*\n${message}`;

  // Animate the button
  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'Opening WhatsApp…';
  submitBtn.style.opacity = '0.75';

  // Open WhatsApp
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  setTimeout(() => {
    window.open(url, '_blank', 'noopener,noreferrer');
    form.reset();
    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'Send via WhatsApp';
    submitBtn.style.opacity = '1';
  }, 600);
});

function shakeField(field) {
  field.style.borderColor = '#e05252';
  field.style.animation = 'shake 0.4s ease';
  field.focus();
  setTimeout(() => {
    field.style.borderColor = '';
    field.style.animation = '';
  }, 800);
}

// ─── Inject shake keyframes ─────────────────────────────────
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-6px); }
    40%      { transform: translateX(6px); }
    60%      { transform: translateX(-4px); }
    80%      { transform: translateX(4px); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ─── Smooth nav link clicks ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
