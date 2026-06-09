// Malindi Cleaners — Main JS

let appInitialized = false;

function initApp() {
  if (appInitialized) return;
  appInitialized = true;
  initHeader();
  initMobileNav();
  initScrollReveal();
  initHeroParallax();
  initPageHeaderMotion();
  initCounters();
  initProgressBars();
  initFAQ();
  initScrollTop();
  initPricingToggle();
}

document.addEventListener('layoutReady', initApp);
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('site-header')) return;
  initApp();
});

function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');
  if (!toggle || !navLinks) return;

  const close = () => {
    navLinks.classList.remove('open');
    toggle.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    const opening = !navLinks.classList.contains('open');
    navLinks.classList.toggle('open');
    toggle.classList.toggle('active');
    overlay?.classList.toggle('active', opening);
    document.body.style.overflow = opening ? 'hidden' : '';
  });

  overlay?.addEventListener('click', close);
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', close));

  navLinks.querySelectorAll('.nav-dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        btn.closest('.nav-dropdown')?.classList.toggle('open');
      }
    });
  });
}

function initScrollReveal() {
  const staggerMs = 80;

  document.querySelectorAll('.reveal').forEach(el => {
    const parent = el.parentElement;
    if (!parent) return;

    const group = parent.closest('[data-motion-group]') || parent;
    const siblings = [...group.querySelectorAll('.reveal')];
    const index = siblings.indexOf(el);

    if (index > 0) {
      el.style.setProperty('--motion-delay', `${index * staggerMs}ms`);
    }
  });

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  reveals.forEach(el => observer.observe(el));
}

function initHeroParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hero = document.querySelector('.hero-cleanna.hero-load');
  if (!hero) return;

  const center = hero.querySelector('.hero-center');
  const badges = hero.querySelectorAll('.hero-float-badge');
  if (!center) return;

  const move = (x, y) => {
    center.style.transform = `translate(${x * 10}px, ${y * 6}px)`;
    badges.forEach((badge, i) => {
      const depth = i === 0 ? 16 : 22;
      badge.style.transform = `translate(${x * depth}px, ${y * depth * 0.5}px)`;
    });
  };

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    move(x, y);
  });

  hero.addEventListener('mouseleave', () => {
    center.style.transform = '';
    badges.forEach(badge => { badge.style.transform = ''; });
  });
}

function initPageHeaderMotion() {
  if (document.querySelector('.page-header')) {
    document.body.classList.add('page-header-motion');
  }
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 25);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width || '0%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });
}

function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initPricingToggle() {
  document.querySelectorAll('.pricing-toggle').forEach(toggle => {
    const section = toggle.closest('section') || toggle.parentElement;
    const cards = section?.querySelector('[data-pricing-cards]');
    if (!cards) return;

    const setPlan = (plan) => {
      toggle.querySelectorAll('.pricing-toggle-btn').forEach(btn => {
        const active = btn.dataset.plan === plan;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      cards.querySelectorAll('.pricing-card').forEach(card => {
        const price = plan === 'monthly' ? card.dataset.monthly : card.dataset.onetime;
        const amount = card.querySelector('.amount');
        const period = card.querySelector('.period');
        if (amount) amount.textContent = `$${Number(price).toLocaleString()}`;
        if (period) period.textContent = plan === 'monthly' ? 'per month' : 'per visit';
      });
    };

    toggle.querySelectorAll('.pricing-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => setPlan(btn.dataset.plan));
    });
  });
}
