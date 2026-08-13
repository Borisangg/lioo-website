/* ═══════════════════════════════════════════════════════════════
   LIOO LANDING PAGE v2 — Cinematic Interactions
   Features: scroll-linked word reveals, parallax, nav auto-hide,
   hero word animations, staggered reveals, chat demo sequence,
   mouse-tracking card glow, smooth scroll.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── HERO WORD REVEAL ─────────────────────────────── */
  const heroWords = document.querySelectorAll('.word-reveal');
  heroWords.forEach((word) => {
    const delay = parseInt(word.getAttribute('data-delay') || '0', 10);
    setTimeout(() => {
      word.classList.add('revealed');
    }, 300 + delay);
  });

  /* ─── HERO BADGE + SUBTITLE FADE-IN ON LOAD ─────── */
  const heroFadeEls = document.querySelectorAll('#hero .scroll-fade-in');
  heroFadeEls.forEach((el) => {
    const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
    setTimeout(() => {
      el.classList.add('visible');
    }, 300 + delay);
  });

  /* ─── SCROLL-TRIGGERED ANIMATIONS ──────────────────── */
  const animatedEls = document.querySelectorAll(
    '#features .scroll-fade-in, #features .scroll-scale-in, ' +
    '#how-it-works .scroll-fade-in, #how-it-works .scroll-slide-left, #how-it-works .scroll-slide-right, ' +
    '#demo .scroll-fade-in, #demo .scroll-scale-in, ' +
    '#cta .scroll-fade-in, ' +
    '#showcase .scroll-fade-in, #showcase .scroll-scale-in, ' +
    '#statement .scroll-fade-in'
  );

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  animatedEls.forEach((el) => scrollObserver.observe(el));

  /* ─── FEATURE CARDS STAGGER ────────────────────────── */
  const featureCards = document.querySelectorAll('.feature-card.scroll-scale-in');
  const featureObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Get index among siblings for stagger
          const cards = Array.from(featureCards);
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.classList.add('visible');
            }, i * 150);
          });
          featureObserver.disconnect();
        }
      });
    },
    { threshold: 0.15 }
  );
  if (featureCards.length) featureObserver.observe(featureCards[0]);

  /* ─── STATEMENT SCROLL-LINKED WORD REVEAL ──────────── */
  const statementSection = document.getElementById('statement');
  const sWords = document.querySelectorAll('.s-word');

  function updateStatementWords() {
    if (!statementSection || !sWords.length) return;

    const rect = statementSection.getBoundingClientRect();
    const vh = window.innerHeight;

    // Section progress: 0 (just entering) → 1 (fully passed)
    const sectionTop = rect.top;
    const sectionHeight = rect.height;

    // Start revealing when section top is at 80% of viewport
    // Finish when section top is at 20% of viewport
    const startThreshold = vh * 0.8;
    const endThreshold = vh * 0.15;

    const progress = 1 - (sectionTop - endThreshold) / (startThreshold - endThreshold);
    const clampedProgress = Math.max(0, Math.min(1, progress));

    const totalWords = sWords.length;

    sWords.forEach((word, i) => {
      const wordProgress = (i + 1) / totalWords;
      if (clampedProgress >= wordProgress * 0.8) {
        word.classList.add('active');
      } else {
        word.classList.remove('active');
      }
    });
  }

  /* ─── NAVIGATION — AUTO-HIDE ON SCROLL DOWN ────────── */
  const nav = document.getElementById('main-nav');
  let lastScrollY = window.scrollY;
  let scrollTicking = false;

  function updateNav() {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Auto-hide: hide when scrolling down, show when scrolling up
    if (scrollY > 300) {
      if (scrollY > lastScrollY + 5) {
        nav.classList.add('nav-hidden');
      } else if (scrollY < lastScrollY - 5) {
        nav.classList.remove('nav-hidden');
      }
    } else {
      nav.classList.remove('nav-hidden');
    }

    lastScrollY = scrollY;
    scrollTicking = false;
  }

  /* ─── HERO PARALLAX ────────────────────────────────── */
  const heroPhoneContainer = document.getElementById('hero-phone-parallax');
  const scrollIndicator = document.getElementById('scroll-indicator');

  function updateParallax() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    // Phone parallax — move slower than scroll
    if (heroPhoneContainer && scrollY < vh) {
      const yOffset = scrollY * 0.25;
      const scale = 1 - scrollY * 0.0003;
      const opacity = 1 - scrollY / (vh * 0.8);
      heroPhoneContainer.style.transform = `translateY(${yOffset}px) scale(${Math.max(0.85, scale)})`;
      heroPhoneContainer.style.opacity = Math.max(0, opacity);
    }

    // Fade scroll indicator
    if (scrollIndicator) {
      scrollIndicator.style.opacity = Math.max(0, 1 - scrollY / 200);
    }
  }

  /* ─── COMBINED SCROLL HANDLER ──────────────────────── */
  function onScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateNav();
        updateParallax();
        updateStatementWords();
      });
      scrollTicking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial call
  updateNav();
  updateParallax();
  updateStatementWords();

  /* ─── MOBILE MENU ──────────────────────────────────── */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ─── SMOOTH SCROLL FOR ANCHORS ────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  /* ─── FEATURE CARD MOUSE-TRACKING GLOW ─────────────── */
  document.querySelectorAll('.feature-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

  /* ─── DEMO CHAT ANIMATION ─────────────────────────── */
  const demoMessages = document.querySelectorAll('#demo-messages .demo-msg');
  let chatTriggered = false;

  function animateChat() {
    if (chatTriggered) return;
    chatTriggered = true;

    demoMessages.forEach((msg) => {
      const delay = parseInt(msg.getAttribute('data-delay') || '0', 10);
      setTimeout(() => {
        msg.classList.add('demo-msg-visible');
      }, delay);
    });
  }

  const demoSection = document.getElementById('demo');
  if (demoSection) {
    const demoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(animateChat, 500);
            demoObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    demoObserver.observe(demoSection);
  }
})();

/* ═══════ NOTIFY MODAL ═══════ */
(() => {
  const trigger = document.getElementById('coming-soon-trigger');
  const overlay = document.getElementById('notify-overlay');
  const modal = document.getElementById('notify-modal');
  const closeBtn = document.getElementById('notify-close');
  const form = document.getElementById('notify-form');
  const emailInput = document.getElementById('notify-email');
  const successEl = document.getElementById('notify-success');

  if (!trigger || !overlay) return;

  function openModal() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => emailInput.focus(), 400);
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  trigger.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (!email) return;

    // Store locally (replace with real API endpoint later)
    const emails = JSON.parse(localStorage.getItem('lioo_notify_emails') || '[]');
    if (!emails.includes(email)) {
      emails.push(email);
      localStorage.setItem('lioo_notify_emails', JSON.stringify(emails));
    }

    // Show success
    form.hidden = true;
    successEl.hidden = false;
    document.querySelector('.notify-privacy').style.display = 'none';

    // Close after 2.5s
    setTimeout(closeModal, 2500);
    setTimeout(() => {
      form.hidden = false;
      successEl.hidden = true;
      document.querySelector('.notify-privacy').style.display = '';
      emailInput.value = '';
    }, 3000);
  });
})();
