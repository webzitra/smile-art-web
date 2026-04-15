/* Smile Art — shared JS
   - sticky nav + mobile toggle
   - scroll reveal animations
   - animated counters
   - cookie banner (GDPR)
   - FAQ single-open behavior
*/
(function () {
  'use strict';

  /* ─── Navbar scroll state ─── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 30) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ─── Mobile menu toggle ─── */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  const backdrop = document.querySelector('.nav-backdrop');
  if (toggle && links) {
    const close = () => {
      toggle.classList.remove('open');
      links.classList.remove('mobile-open');
      backdrop && backdrop.classList.remove('show');
      document.body.style.overflow = '';
    };
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      links.classList.toggle('mobile-open', isOpen);
      backdrop && backdrop.classList.toggle('show', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    backdrop && backdrop.addEventListener('click', close);
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) close();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* ─── Scroll reveal (IntersectionObserver) ─── */
  const animated = document.querySelectorAll('[data-animate]');
  if (animated.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '-40px' });
    animated.forEach(el => io.observe(el));
  } else {
    animated.forEach(el => el.classList.add('in'));
  }

  /* ─── Animated counters ─── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 1800;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const val = Math.floor(easeOut(p) * target);
        el.textContent = val.toLocaleString('cs-CZ') + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString('cs-CZ') + suffix;
      };
      requestAnimationFrame(tick);
    };
    const co = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          animate(en.target);
          co.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => co.observe(el));
  }

  /* ─── FAQ single-open ─── */
  const faqs = document.querySelectorAll('.faq-item');
  faqs.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqs.forEach(o => { if (o !== item) o.open = false; });
      }
    });
  });

  /* ─── Cookie banner ─── */
  const KEY = 'smile-art-cookies-v1';
  const banner = document.querySelector('.cookie-banner');
  if (banner) {
    if (!localStorage.getItem(KEY)) {
      setTimeout(() => banner.classList.add('show'), 1200);
    }
    banner.querySelectorAll('[data-cookie]').forEach(btn => {
      btn.addEventListener('click', () => {
        localStorage.setItem(KEY, btn.dataset.cookie);
        banner.classList.remove('show');
      });
    });
  }

  /* ─── Smooth anchor offset ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();
