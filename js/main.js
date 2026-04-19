/* Smile Art — shared JS (v2 premium)
   - sticky nav + mobile toggle
   - scroll progress bar
   - scroll reveal animations (staggered)
   - animated counters (blur-in)
   - card 3D tilt
   - magnetic buttons
   - floating CTA pill
   - FAQ single-open
   - cookie banner (GDPR)
   - smooth anchors
*/
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Navbar scroll state ─── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ─── Scroll progress bar ─── */
  (function () {
    if (prefersReduced) return;
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    let ticking = false;
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.width = Math.min(scrolled * 100, 100) + '%';
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  })();

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

  /* ─── Auto-stagger for grid/list children marked with data-animate-group ─── */
  document.querySelectorAll('[data-animate-group]').forEach(group => {
    Array.from(group.children).forEach((child, i) => {
      if (!child.hasAttribute('data-animate')) child.setAttribute('data-animate', '');
      child.style.setProperty('--i', i);
      child.classList.add('stagger-children');
    });
  });

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

  /* ─── Animated counters (with blur-in) ─── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const animate = (el) => {
      const wrap = el.closest('.stat-item');
      wrap && wrap.classList.add('counting');
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 2000;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const val = Math.floor(easeOut(p) * target);
        el.textContent = val.toLocaleString('cs-CZ') + suffix;
        // progressively remove blur
        if (wrap) {
          const blur = (1 - p) * 6;
          el.style.filter = `blur(${blur}px)`;
        }
        if (p < 1) requestAnimationFrame(tick);
        else {
          el.textContent = target.toLocaleString('cs-CZ') + suffix;
          el.style.filter = 'none';
          wrap && wrap.classList.remove('counting');
        }
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

  /* ─── Card 3D tilt on hover ─── */
  if (!prefersReduced) {
    const tiltSelectors = '.service-card, .pricing-card, .process-step, .team-card';
    document.querySelectorAll(tiltSelectors).forEach(card => {
      let rect = null;
      const onEnter = () => { rect = card.getBoundingClientRect(); };
      const onMove = (e) => {
        if (!rect) rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - y) * 6;   // -3 to +3 deg
        const ry = (x - 0.5) * 6;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      };
      const onLeave = () => {
        card.style.transform = '';
        rect = null;
      };
      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }

  /* ─── Magnetic buttons (subtle pull toward cursor) ─── */
  if (!prefersReduced && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.btn-primary, .btn-gold').forEach(btn => {
      const onMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
      };
      const onLeave = () => { btn.style.transform = ''; };
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
    });
  }

  /* ─── Floating CTA pill (appears after hero) ─── */
  (function () {
    const cta = document.querySelector('.float-cta');
    if (!cta) return;
    const hero = document.querySelector('.hero, .page-header');
    const onScroll = () => {
      const trigger = hero ? hero.offsetHeight * 0.8 : 400;
      cta.classList.toggle('show', window.scrollY > trigger);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

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
      setTimeout(() => banner.classList.add('show'), 1500);
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

  /* ─── Parallax subtle on feature-split wrappers (not on img — avoids hover-scale conflict) ─── */
  if (!prefersReduced && window.matchMedia('(min-width: 900px)').matches) {
    const splits = document.querySelectorAll('.feature-split-img');
    let ticking = false;
    const onScroll = () => {
      splits.forEach(wrap => {
        const rect = wrap.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;
        const visible = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const shift = (visible - 0.5) * 18;
        wrap.style.setProperty('--parallax-y', shift + 'px');
        wrap.style.transform = `translate3d(0, ${shift}px, 0)`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();
  }

})();
