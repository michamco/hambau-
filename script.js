// Basic interactivity: smooth scroll, mobile menu, tilt effect, scroll reveal, lightbox, form handling
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  menuToggle && menuToggle.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? '' : 'flex';
  });

  // Simple tilt effect for cards (pointer-based)
  const tiltElements = document.querySelectorAll('[data-tilt]');
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (ev) => {
      const rect = el.getBoundingClientRect();
      const x = (ev.clientX - rect.left) / rect.width - 0.5;
      const y = (ev.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateX(${(-y*6)}deg) rotateY(${(x*6)}deg) translateY(-6px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // Scroll reveal (fade-up)
  const revealEls = document.querySelectorAll('.card, .about-text, .gallery-item, .contact-form');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.15});
  revealEls.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.2,.9,.2,1)';
    revealObserver.observe(el);
  });

  // Lightbox for gallery
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      lightboxContent.innerHTML = `<img src="${src}" alt="Großes Bild">`;
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  function closeLightbox(){
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxContent.innerHTML = '';
    document.body.style.overflow = '';
  }

  // Contact form (demo local handling)
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
      message: data.get('message')
    };
    // Simulate sending
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sende...';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Anfrage senden';
      alert('Danke! Ihre Anfrage wurde lokal erfasst. (Demo)');
      form.reset();
    }, 900);
    console.log('Demo Anfrage:', payload);
  });

  // Parallax subtle effect on hero background based on mouse
  const hero = document.querySelector('.hero');
  hero && hero.addEventListener('mousemove', (e) => {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    const x = (e.clientX / w - 0.5) * 20;
    const y = (e.clientY / h - 0.5) * 10;
    hero.querySelector('.hero-bg').style.transform = `translate(${x}px, ${y}px)`;
  });

  // Accessibility: close lightbox with ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox.getAttribute('aria-hidden') === 'false') closeLightbox();
    }
  });
});
