document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const progress = document.getElementById('progress');
  const reveals = [...document.querySelectorAll('.reveal')];

  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    // Header shrink
    if (y > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');

    // Progress bar
    if (progress) {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || y;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      progress.style.width = pct + '%';
    }
  };

  // Reveal on view
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    // Fallback: show immediately
    reveals.forEach(el => el.classList.add('in'));
  }

  // Init
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});

