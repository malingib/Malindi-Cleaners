function getHeader(activePage = '') {
  const isActive = (href) => href === activePage ? ' class="active"' : '';

  const logoSvg = `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 32h24v2H8z" fill="currentColor"/>
    <path d="M12 14l8-6 8 6v10H12V14z" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M20 8v4M16 20h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="28" cy="12" r="6" fill="currentColor" opacity="0.15"/>
    <path d="M26 12h4M28 10v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`;

  return `
  <div class="header-wrap">
    <header class="header">
      <div class="container">
        <a href="index.html" class="logo">
          <div class="logo-icon">${logoSvg}</div>
          Malindi <span>Cleaners</span>
        </a>
        <nav class="nav">
          <div class="nav-overlay"></div>
          <ul class="nav-links">
            <li><a href="index.html"${isActive('index.html')}>Home</a></li>
            <li><a href="about.html"${isActive('about.html')}>About Us</a></li>
            <li><a href="testimonials.html"${isActive('testimonials.html')}>Testimonials</a></li>
            <li><a href="contact.html"${isActive('contact.html')}>Contact</a></li>
          </ul>
          <a href="tel:+254141580500" class="nav-call">
            <div class="nav-call-icon">📞</div>
            <div class="nav-call-text">
              <span>Call / WhatsApp</span>
              <strong>0141 580 500</strong>
            </div>
          </a>
          <button class="nav-toggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
        </nav>
      </div>
    </header>
  </div>`;
}

function getFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a href="index.html" class="logo">
            <div class="logo-icon">✦</div>
            Malindi <span>Cleaners</span>
          </a>
          <p class="footer-desc">Fresh Spaces, Happy Living. Professional cleaning and house help placement across the Kenyan coast.</p>
          <div class="footer-social">
            <a href="https://facebook.com/malindicleaningandhousehelpplacement" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
            <a href="https://instagram.com/malindicleaningandhousehelpplacement" target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>
            <a href="https://tiktok.com/@malindicleaningandhousehelpplacement" target="_blank" rel="noopener noreferrer" aria-label="TikTok">♪</a>
            <a href="https://wa.me/254141580500" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">💬</a>
          </div>
        </div>
        <div>
          <h4>Services</h4>
          <ul class="footer-links">
            <li><a href="services.html">Basic Cleaning</a></li>
            <li><a href="services.html">Deep Cleaning</a></li>
            <li><a href="services.html">Laundry Services</a></li>
            <li><a href="services.html">House Help Placement</a></li>
          </ul>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul class="footer-links">
            <li><a href="about.html">About Us</a></li>
            <li><a href="pricing.html">Pricing</a></li>
            <li><a href="testimonials.html">Testimonials</a></li>
            <li><a href="faq.html">FAQ</a></li>
            <li><a href="blog.html">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4>Newsletter</h4>
          <p style="font-size:0.875rem;margin-bottom:16px;">Subscribe for cleaning tips and exclusive offers.</p>
          <form class="footer-newsletter" onsubmit="event.preventDefault();alert('Thank you for subscribing!');">
            <input type="email" placeholder="Your email address" required>
            <button type="submit" class="btn-cta btn-cta-full">
              <span>Subscribe</span>
              <span class="btn-cta-icon" aria-hidden="true">↗</span>
            </button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Malindi Cleaners. All rights reserved.</span>
        <div class="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
  <button class="scroll-top" aria-label="Scroll to top">↑</button>`;
}

function injectLayout() {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  const page = document.body.dataset.page || '';

  if (headerEl) headerEl.innerHTML = getHeader(page);
  if (footerEl) footerEl.innerHTML = getFooter();
}

document.addEventListener('DOMContentLoaded', () => {
  injectLayout();
  document.dispatchEvent(new Event('layoutReady'));
});
