/* ============================================
   HVAC Company - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // -------- Sticky Header --------
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // -------- Mobile Menu --------
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const menuOverlay = document.querySelector('.menu-overlay');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      if (menuOverlay) menuOverlay.classList.toggle('active');
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
    if (menuOverlay) {
      menuOverlay.addEventListener('click', function () {
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-times'); }
      });
    }
  }

  // -------- Hero Slider --------
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() { showSlide(currentSlide + 1); }

  function startSlider() {
    if (slides.length > 1) {
      slideInterval = setInterval(nextSlide, 5000);
    }
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      showSlide(i);
      startSlider();
    });
  });

  if (slides.length > 0) {
    showSlide(0);
    startSlider();
  }

  // -------- Counter Animation --------
  const counters = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  function animateCounters() {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target')) || 0;
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      function update() {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current) + suffix;
          requestAnimationFrame(update);
        } else {
          counter.textContent = target + suffix;
        }
      }
      update();
    });
  }

  if (counters.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(counters[0].closest('.stats-bar') || counters[0]);
  }

  // -------- Testimonial Slider --------
  const testimonials = document.querySelectorAll('.testimonial-card-v2');
  const tDots = document.querySelectorAll('.testimonial-dot-v2');
  let currentTestimonial = 0;
  let testimonialInterval;

  function showTestimonial(n) {
    testimonials.forEach(t => t.classList.remove('active'));
    tDots.forEach(d => d.classList.remove('active'));
    currentTestimonial = (n + testimonials.length) % testimonials.length;
    if (testimonials[currentTestimonial]) testimonials[currentTestimonial].classList.add('active');
    if (tDots[currentTestimonial]) tDots[currentTestimonial].classList.add('active');
  }

  if (testimonials.length > 0) {
    showTestimonial(0);
    testimonialInterval = setInterval(() => showTestimonial(currentTestimonial + 1), 6000);
    tDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(testimonialInterval);
        showTestimonial(i);
        testimonialInterval = setInterval(() => showTestimonial(currentTestimonial + 1), 6000);
      });
    });
  }

  // -------- FAQ Accordion --------
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', function () {
      const item = this.parentElement;
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  // -------- Form Validation --------
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;
      this.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#e74c3c';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });
      if (valid) {
        const btn = this.querySelector('button[type="submit"]');
        if (btn) {
          const orig = btn.textContent;
          btn.textContent = 'Message Sent!';
          btn.style.background = '#27ae60';
          setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3000);
        }
        this.reset();
      }
    });
  });

  // -------- Smooth Scroll --------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // -------- Scroll Reveal Animation --------
  const revealElements = document.querySelectorAll('.service-card, .why-item, .contact-card, .team-card, .welcome-content, .welcome-img');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });

});
