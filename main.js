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

// ─── Contact details ────────────────────────────────────────
const EMAIL_ADDRESS = 'mututwas@gmail.com';
const WA_NUMBER = '260971627899'; // +260 971 627 899 (Zambia)

// ─── Contact Form → Email or WhatsApp ──────────────────────
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

// Update button appearance based on contact method selection
const contactMethodRadios = form.querySelectorAll('input[name="contactMethod"]');
contactMethodRadios.forEach(radio => {
  radio.addEventListener('change', (e) => {
    const method = e.target.value;
    const icon = submitBtn.querySelector('svg');
    const text = submitBtn.querySelector('span');

    if (method === 'email') {
      submitBtn.className = 'btn btn-email btn-submit';
      icon.outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>`;
      text.textContent = 'Send via Email';
    } else if (method === 'whatsapp') {
      submitBtn.className = 'btn btn-whatsapp btn-submit';
      icon.outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552" width="22" height="22">
        <defs><linearGradient id="wa-grad-btn" x1="85.915" x2="86.535" y1="32.567" y2="137.092" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e8e8e8"/></linearGradient></defs>
        <path fill="url(#wa-grad-btn)" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535L26 150.55l32.181-8.851a61.015 61.015 0 0 0 29.003 7.348h.026c33.755 0 61.189-27.426 61.205-61.153a60.747 60.747 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.336-17.416z"/>
        <path fill="#25D366" fill-rule="evenodd" d="M100.938 107.34c-.677 1.088-2.059 1.744-3.494 1.744-1.044 0-2.15-.312-3.443-1.006-5.29-2.842-9.504-6.304-12.876-10.58-1.664-2.097-2.788-4.128-3.34-6.036-.455-1.564-.373-3.086.223-4.308.508-1.058 1.386-1.852 2.267-2.62.29-.253.571-.499.832-.748.612-.584.927-1.286.927-2.087 0-.489-.14-.981-.421-1.504-.508-.944-3.107-7.49-3.683-8.77-.5-1.126-1.145-1.693-1.971-1.73h-.187c-.641 0-1.3.248-1.944.737-.938.706-3.652 3.5-3.652 8.526 0 4.74 3.042 9.167 4.47 11.06.058.077.15.21.278.394C80.606 101.85 89.1 111.74 98.78 115.6c1.48.574 2.727.918 3.832 1.17 1.655.376 3.16.323 4.47-.158 2.114-.776 3.528-2.52 4.08-5.077.19-.879.118-1.793-.204-2.543-.537-1.25-1.83-1.931-3.044-2.508a53.916 53.916 0 0 1-.734-.363c-.886-.45-1.687-.713-2.449-.713-.932 0-1.708.392-2.793 1.932z"/>
      </svg>`;
      text.textContent = 'Send via WhatsApp';
    }
  });
});

// Handle form submission with fallback to mailto if PHP fails
form.addEventListener('submit', async (e) => {
  // Basic client-side validation
  const name = form.querySelector('#name').value.trim();
  if (!name) {
    e.preventDefault();
    shakeField(form.querySelector('#name'));
    return;
  }

  const contactMethod = form.querySelector('input[name="contactMethod"]:checked').value;
  const phone = form.querySelector('#phone').value.trim();
  const email = form.querySelector('#email').value.trim();
  const service = form.querySelector('#service');
  const serviceLabel = service.options[service.selectedIndex].text;
  const message = form.querySelector('#message').value.trim();

  // Handle WhatsApp entirely on the client so it works even on static hosts
  if (contactMethod === 'whatsapp') {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Opening WhatsApp…';
    submitBtn.style.opacity = '0.75';

    let text = `Hello Anaiah Enterprise! 👋\n\n`;
    text += `*Name:* ${name}\n`;
    if (phone) text += `*Phone:* ${phone}\n`;
    if (email) text += `*Email:* ${email}\n`;
    if (service.value) text += `*Service:* ${serviceLabel}\n`;
    if (message) text += `\n*Message:*\n${message}`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Send via WhatsApp';
      submitBtn.style.opacity = '1';
    }, 600);
    return;
  }

  // Show loading state for email submissions
  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'Sending...';
  submitBtn.style.opacity = '0.75';

  // Check if we're on a PHP server by trying to fetch contact.php
  try {
    const response = await fetch('contact.php', {
      method: 'HEAD',
      cache: 'no-cache'
    });

    if (response.ok) {
      // PHP is available, let the form submit normally
      return;
    }
  } catch (error) {
    // PHP not available, fall back to mailto
    console.log('PHP not available, using mailto fallback');
  }

  // Fallback to mailto if PHP is not available
  e.preventDefault();

  let subject = `Project Inquiry from ${name} - Anaiah Enterprise`;
  let body = `Hello Anaiah Enterprise!\n\n`;
  body += `Name: ${name}\n`;
  if (phone) body += `Phone: ${phone}\n`;
  if (email) body += `Email: ${email}\n`;
  if (service.value) body += `Service: ${serviceLabel}\n`;
  if (message) body += `\nMessage:\n${message}`;

  submitBtn.querySelector('span').textContent = 'Opening Email…';

  const url = `mailto:marcusmutonyi44@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  setTimeout(() => {
    window.location.href = url;
    form.reset();
    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'Send via Email';
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
