/* ==========================================================================
   Chalmers Media: shared behavior for every page.
   Every block checks that its elements exist first, so it is safe to load on
   any page. Content (videos, photos, form endpoint) comes from content.js.
   ========================================================================== */

const CONTENT = window.SITE_CONTENT || { videos: [], photos: [], formEndpoint: '' };

const CATEGORY_LABELS = {
  sports: 'Sports',
  portraits: 'Portraits',
  music: 'Music',
};

// ---------- Footer year ----------
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// ---------- Mobile nav ----------
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    });
  });
}

// ---------- Video embeds (Home "Latest Work" + Portfolio "Videos") ----------
const PLAY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
let instagramScriptLoaded = false;

function loadInstagramScript() {
  if (instagramScriptLoaded) {
    window.instgrm?.Embeds.process();
    return;
  }
  instagramScriptLoaded = true;
  const script = document.createElement('script');
  script.src = 'https://www.instagram.com/embed.js';
  script.async = true;
  document.body.appendChild(script);
}

function buildVideoCard(video) {
  const card = document.createElement('article');
  card.className = 'media-card';

  if (video.platform === 'youtube' && video.id) {
    // Show the thumbnail only. The real YouTube player (which is heavy and
    // sets cookies) loads when someone actually clicks play.
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'yt-lite';
    button.style.backgroundImage = `url("https://i.ytimg.com/vi/${encodeURIComponent(video.id)}/hqdefault.jpg")`;
    button.setAttribute('aria-label', `Play video: ${video.title || 'Chalmers Media video'}`);
    button.innerHTML = `<span class="play">${PLAY_ICON}</span>`;
    button.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.className = 'yt-frame';
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.id)}?autoplay=1&rel=0`;
      iframe.title = video.title || 'YouTube video';
      iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      button.replaceWith(iframe);
    });
    card.appendChild(button);
  } else if (video.platform === 'instagram' && video.url) {
    const quote = document.createElement('blockquote');
    quote.className = 'instagram-media';
    quote.setAttribute('data-instgrm-permalink', video.url);
    quote.setAttribute('data-instgrm-version', '14');
    const link = document.createElement('a');
    link.href = video.url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'View this post on Instagram';
    quote.appendChild(link);
    card.appendChild(quote);
  } else {
    return null;
  }

  if (video.title) {
    const caption = document.createElement('p');
    caption.className = 'media-caption';
    caption.textContent = video.title;
    card.appendChild(caption);
  }
  return card;
}

document.querySelectorAll('[data-video-feed]').forEach((grid) => {
  const limit = Number(grid.dataset.limit) || Infinity;
  const cards = (CONTENT.videos || [])
    .slice(0, limit)
    .map(buildVideoCard)
    .filter(Boolean);

  // The wrapping section stays hidden until there is real work to show.
  const section = grid.closest('[data-hide-if-empty]');
  if (!cards.length) return;

  cards.forEach((card) => grid.appendChild(card));
  if (section) section.hidden = false;
  if (cards.some((card) => card.querySelector('.instagram-media'))) loadInstagramScript();
});

// ---------- Photo gallery + filters + lightbox (Portfolio page) ----------
const photoGrid = document.querySelector('[data-photo-grid]');

if (photoGrid) {
  const photos = CONTENT.photos || [];
  const section = photoGrid.closest('[data-hide-if-empty]');
  const filterWrap = document.querySelector('[data-photo-filters]');
  const lightbox = document.querySelector('.lightbox');

  if (photos.length) {
    if (section) section.hidden = false;

    photos.forEach((photo) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'photo-item';
      item.dataset.category = photo.category || '';
      const img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.alt || '';
      img.loading = 'lazy';
      item.appendChild(img);
      item.addEventListener('click', () => openLightbox(photo));
      photoGrid.appendChild(item);
    });

    // Only build filter buttons for categories that actually have photos.
    const categories = [...new Set(photos.map((p) => p.category).filter(Boolean))];
    if (filterWrap && categories.length > 1) {
      ['all', ...categories].forEach((cat, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `filter-button${index === 0 ? ' active' : ''}`;
        btn.dataset.filter = cat;
        btn.setAttribute('aria-pressed', String(index === 0));
        btn.textContent = cat === 'all' ? 'All' : CATEGORY_LABELS[cat] || cat;
        btn.addEventListener('click', () => {
          filterWrap.querySelectorAll('.filter-button').forEach((b) => {
            b.classList.toggle('active', b === btn);
            b.setAttribute('aria-pressed', String(b === btn));
          });
          photoGrid.querySelectorAll('.photo-item').forEach((item) => {
            item.hidden = !(cat === 'all' || item.dataset.category === cat);
          });
        });
        filterWrap.appendChild(btn);
      });
    }
  }

  function openLightbox(photo) {
    if (!lightbox || typeof lightbox.showModal !== 'function') {
      window.open(photo.src, '_blank', 'noopener');
      return;
    }
    const img = lightbox.querySelector('img');
    const caption = lightbox.querySelector('figcaption');
    img.src = photo.src;
    img.alt = photo.alt || '';
    caption.textContent = photo.caption || '';
    caption.hidden = !photo.caption;
    lightbox.showModal();
  }

  if (lightbox) {
    lightbox.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close());
    // Clicking the dark backdrop (outside the image) closes it too.
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) lightbox.close();
    });
  }
}

// Show the portfolio empty state only when there are no videos AND no photos.
const emptyState = document.querySelector('[data-portfolio-empty]');
if (emptyState && !(CONTENT.videos || []).length && !(CONTENT.photos || []).length) {
  emptyState.hidden = false;
}

// ---------- Scroll reveal animations ----------
// Runs after the video feed above, so injected video cards animate too.
// Grids marked data-reveal-stagger hand the effect to each child, offset by
// column so a row of three cards pops in left to right.
document.querySelectorAll('[data-reveal-stagger]').forEach((group) => {
  const effect = group.dataset.revealStagger || 'zoom';
  [...group.children].forEach((child, index) => {
    if (!child.dataset.reveal) child.dataset.reveal = effect;
    child.style.setProperty('--reveal-delay', `${(index % 3) * 120}ms`);
  });
});

const revealEls = document.querySelectorAll('[data-reveal]');

const finishReveal = (el) => {
  el.classList.add('is-visible');
  // Once it has animated in, drop the reveal styles so the element's own
  // transitions (like card hover effects) work without the stagger delay.
  const cleanup = (event) => {
    // Ignore transitions bubbling up from children (e.g. a button hover).
    if (event.target !== el || event.propertyName !== 'opacity') return;
    el.removeEventListener('transitionend', cleanup);
    el.removeAttribute('data-reveal');
    el.classList.remove('is-visible');
    el.style.removeProperty('--reveal-delay');
  };
  el.addEventListener('transitionend', cleanup);
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        finishReveal(entry.target);
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// ---------- Booking form ----------
const bookingForm = document.getElementById('booking-form');

if (bookingForm) {
  const messageEl = bookingForm.querySelector('.form-message');
  const submitBtn = bookingForm.querySelector('button[type="submit"]');
  const serviceSelect = bookingForm.querySelector('#service');

  // Pre-select a service when arriving from a "Book this" link (book.html?service=recruiting)
  const requested = new URLSearchParams(window.location.search).get('service');
  if (requested && serviceSelect?.querySelector(`option[value="${CSS.escape(requested)}"]`)) {
    serviceSelect.value = requested;
  }

  const validators = {
    name: (v) => v.trim() !== '' || 'Please enter your name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email.',
    role: (v) => v !== '' || 'Please choose one.',
    service: (v) => v !== '' || 'Please choose a service.',
  };

  const setError = (input, message) => {
    const errorEl = input.closest('.form-group')?.querySelector('.error');
    if (errorEl) errorEl.textContent = message || '';
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  };

  const validateField = (input) => {
    const check = validators[input.name];
    if (!check) return true;
    const result = check(input.value);
    setError(input, result === true ? '' : result);
    return result === true;
  };

  bookingForm.querySelectorAll('input, select, textarea').forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
  });

  const showMessage = (text, type) => {
    messageEl.textContent = text;
    messageEl.className = `form-message is-${type}`;
  };

  bookingForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    let firstInvalid = null;
    bookingForm.querySelectorAll('input, select, textarea').forEach((input) => {
      if (!validateField(input) && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // No inbox connected yet: say so honestly instead of pretending it sent.
    if (!CONTENT.formEndpoint) {
      showMessage(
        "Online booking isn't connected yet, so this request was not sent. Please reach out on Instagram @ChalmersMediaCartel in the meantime.",
        'error'
      );
      return;
    }

    submitBtn.disabled = true;
    showMessage('Sending...', 'success');

    try {
      const response = await fetch(CONTENT.formEndpoint, {
        method: 'POST',
        body: new FormData(bookingForm),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      showMessage("Thanks! Your request is in. We'll be in touch soon to talk through the details.", 'success');
      bookingForm.reset();
    } catch (error) {
      showMessage('Something went wrong sending your request. Please try again, or message us on Instagram.', 'error');
    } finally {
      submitBtn.disabled = false;
    }
  });
}
