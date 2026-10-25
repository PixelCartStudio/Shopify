/*
  EASY CUSTOMIZATION:
  1. Place screenshot files next to index.html (or in an images/ folder and update the paths).
  2. image: full-page screenshot of the store (e.g. "GoFullPage" Chrome extension).
     Hover the front card in the 3D showcase and the screenshot scrolls through the whole page.
  3. mobileImage: (optional) a phone screenshot for the floating phone mockup.
     Leave '' to reuse the main screenshot.
  4. url: 'https://example.com/' shows the Visit Live button. Leave '' for not-yet-live projects.
*/
const SETTINGS = {
  email: 'hello@yourstudio.com',
  instagram: 'https://instagram.com/'
};

const PROJECTS = [
  {
    name: 'MOTOBLOX', category: 'LEGO / SHOPIFY',
    description: 'A Shopify storefront for LEGO-style buildable cars, featuring detailed car models, interactive product discovery, and a seamless shopping experience for car enthusiasts and collectors.',
    services: 'Store Design · Theme Customization',
    image: 'desktopimg/Screenshot 2026-10-25 200623.png', mobileImage: 'mobilelog/motoblox.jpeg', url: 'https://motoblox.com/',
    fallback: 'linear-gradient(135deg,#391615,#ab705d)'
  },
  {
    name: 'SHUKRA', category: 'DINNERWARE / SHOPIFY',
    description: 'A dinnerware and crockery storefront with product storytelling and simplified collection navigation.',
    services: 'UI/UX · Shopify Development',
    image: 'desktopimg/shukra1.png', mobileImage: 'mobilelog/shukra.jpeg', url: 'https://shukrahome.in/',
    fallback: 'linear-gradient(135deg,#12312a,#557954)'
  },
  {
    name: 'LADY TISARA', category: 'JEWELLERY & ACCESSORIES / SHOPIFY',
    description: 'A refined jewellery storefront designed around visual storytelling and an elegant product catalogue.',
    services: 'Store Design · Product Pages',
    image: 'desktopimg/lt.png', mobileImage: 'mobilelog/ladytisara.jpeg', url: 'https://ladytisara.com/',
    fallback: 'linear-gradient(135deg,#473126,#94705d)'
  },
  {
    name: 'THE BLOCK & BLOOM', category: 'PRINTED TOTE BAGS / SHOPIFY',
    description: 'A Shopify store for printed tote bags with a clear product hierarchy and a smooth mobile shopping flow.',
    services: 'Shopify Theme · Mobile UX',
    image: 'desktopimg/bb.png', mobileImage: 'mobilelog/blockbloom.jpeg', url: 'https://www.theblockandbloom.com/',
    fallback: 'linear-gradient(135deg,#4b535e,#1e242b)'
  },
  {
    name: 'TOY COLLECTORS INDIA', category: 'TOYS & COLLECTIBLES / SHOPIFY',
    description: 'A toys and collectibles store built around rich product photography and easy browsing.',
    services: 'Art Direction · Store Development',
    image: 'desktopimg/tci1.png', mobileImage: 'mobilelog/tci.jpeg', url: 'https://www.toycollectorsindia.com/',
    fallback: 'linear-gradient(135deg,#341c19,#955d46)'
  },
  {
    name: 'BALAJI HOME ESSENTIALS', category: 'KITCHEN ESSENTIALS/ SHOPIFY',
    description: 'An approachable lifestyle ecommerce site with an easy-to-browse catalog.',
    services: 'UI/UX · Custom Sections',
    image: 'desktopimg/bj.png', mobileImage: 'mobilelog/balaji.jpeg', url: 'https://jivithacreations.com/',
    fallback: 'linear-gradient(135deg,#7c4663,#cc9caf)'
  }
];

const dialog = document.getElementById('projectDialog');
const dialogClose = document.getElementById('dialogClose');

const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = n => String(n).padStart(2, '0');

function projectImage(project) {
  const image = document.createElement('img');
  image.className = 'project-shot';
  image.src = project.image;
  image.alt = `${project.name} store screenshot`;
  image.loading = 'lazy';
  image.decoding = 'async';
  image.addEventListener('error', () => {
    const message = document.createElement('span');
    message.className = 'image-missing';
    message.textContent = `Add screenshot: ${project.image}`;
    image.replaceWith(message);
  });
  return image;
}

function validWebsite(url) {
  try { const parsed = new URL(url); return parsed.protocol === 'https:' || parsed.protocol === 'http:'; }
  catch { return false; }
}

function domainOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); }
  catch { return 'coming soon'; }
}

function browserBar(project, markerText) {
  const bar = document.createElement('div');
  bar.className = 'browser-bar';
  const dots = document.createElement('span');
  dots.className = 'browser-dots';
  dots.setAttribute('aria-hidden', 'true');
  dots.innerHTML = '<i></i><i></i><i></i>';
  const url = document.createElement('span');
  url.className = 'browser-url';
  url.textContent = validWebsite(project.url) ? domainOf(project.url) : 'coming soon';
  const marker = document.createElement('span');
  marker.className = 'project-marker';
  marker.textContent = markerText || '';
  bar.append(dots, url, marker);
  return bar;
}

/* ---------- Heading word reveal (works for every .work-heading) ---------- */
const workHeading = document.querySelector('.work-heading');
const headingText = workHeading && workHeading.querySelector('p');
if (headingText) {
  const period = headingText.querySelector('.period');
  const words = [...headingText.childNodes]
    .filter(n => n.nodeType === Node.TEXT_NODE)
    .map(n => n.textContent).join(' ').trim().split(/\s+/);
  const srText = document.createElement('span');
  srText.className = 'sr-only';
  srText.textContent = words.join(' ') + (period ? period.textContent : '');
  headingText.replaceChildren(srText);
  words.forEach((word, i) => {
    const outer = document.createElement('span');
    outer.className = 'w';
    outer.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.textContent = word;
    inner.style.setProperty('--wd', `${i * 0.09}s`);
    if (i === words.length - 1) {
      inner.classList.add('serif'); // last word in the italic serif
      if (period) inner.append(period);
    }
    outer.append(inner);
    headingText.append(outer, ' ');
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    workHeading.classList.add('in');
  } else {
    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) { workHeading.classList.add('in'); obs.disconnect(); }
    }, { threshold: 0.35 }).observe(workHeading);
  }
}

/* ---------- Custom "VIEW PROJECT" cursor (desktop only) ---------- */
let viewCursor = null;
if (canHover && !reduceMotion) {
  viewCursor = document.createElement('div');
  viewCursor.className = 'view-cursor';
  viewCursor.setAttribute('aria-hidden', 'true');
  viewCursor.innerHTML = '<span>VIEW<br>PROJECT</span>';
  document.body.append(viewCursor);
  document.body.classList.add('has-view-cursor');

  let tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty, cursorRaf = 0;
  const follow = () => {
    cx += (tx - cx) * 0.2;
    cy += (ty - cy) * 0.2;
    viewCursor.style.transform = `translate3d(${cx}px,${cy}px,0)`;
    cursorRaf = (Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3) ? requestAnimationFrame(follow) : 0;
  };
  document.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    if (!cursorRaf) cursorRaf = requestAnimationFrame(follow);
  }, { passive: true });
}
function setViewCursor(on) {
  if (viewCursor) viewCursor.classList.toggle('active', on);
}

/* ---------- Project dialog ---------- */
function openProject(index) {
  const p = PROJECTS[index];
  const art = document.getElementById('dialogArt');
  art.replaceChildren(browserBar(p, ''), projectImage(p));
  art.style.background = p.fallback || '#191919';
  art.scrollTop = 0;
  document.getElementById('dialogCategory').textContent = p.category;
  document.getElementById('dialogTitle').textContent = p.name;
  document.getElementById('dialogDescription').textContent = p.description;
  document.getElementById('dialogServices').textContent = p.services;
  const visit = document.getElementById('dialogVisit');
  visit.hidden = !validWebsite(p.url);
  if (!visit.hidden) visit.href = p.url;
  setViewCursor(false);
  dialog.showModal();
  document.body.classList.add('modal-open');
}
function closeProject() { if (dialog.open) dialog.close(); document.body.classList.remove('modal-open'); }
dialogClose.addEventListener('click', closeProject);
dialog.addEventListener('click', e => { if (e.target === dialog) closeProject(); });
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));

/* =========================================================
   3D PROJECT SHOWCASE
   - Desktop: 3D coverflow, mouse tilts the whole stage,
     floating phone mockup + service chips, autoplay.
   - Phone (≤700px): stacked 3D deck, swipe or tap arrows.
   - Click a side card → it comes forward.
     Click the front card → project dialog opens.
   ========================================================= */
(function initShowcase() {
  const root = document.getElementById('showcase');
  if (!root || !PROJECTS.length) return;

  const stage = document.getElementById('scStage');
  const scene = document.getElementById('scScene');
  const cardsWrap = document.getElementById('scCards');
  const dotsWrap = document.getElementById('scDots');
  const textBox = document.getElementById('scText');
  const metaEl = document.getElementById('scMeta');
  const titleEl = document.getElementById('scTitle');
  const servicesEl = document.getElementById('scServices');
  const visitEl = document.getElementById('scVisit');
  const countEl = document.getElementById('projectCount');
  const progressEl = document.getElementById('scProgress');
  const phoneBody = document.getElementById('scPhone');
  const phoneImg = document.getElementById('scPhoneImg');
  const chips = [1, 2, 3].map(k => document.getElementById(`scChip${k}`));
  const mqMobile = window.matchMedia('(max-width: 700px)');

  const n = PROJECTS.length;
  const DELAY = 4200; // autoplay speed (ms)
  let active = 0, timer = 0, inView = false, hovering = false, focused = false;

  root.classList.add('js-showcase');

  /* Phone (≤700px): use mobileImage in a phone frame.
     No mobileImage → wide browser card with the desktop screenshot. */
  const shots = [];
  const srcFor = p => (mqMobile.matches && p.mobileImage) ? p.mobileImage : p.image;
  root.classList.toggle('has-phone-cards', PROJECTS.some(p => !!p.mobileImage));

  /* Build cards */
  const cards = PROJECTS.map((p, i) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'sc-card';
    card.style.setProperty('--fallback', p.fallback || '#191919');

    const bar = document.createElement('span');
    bar.className = 'sc-bar';
    const lights = document.createElement('span');
    lights.className = 'sc-lights';
    lights.setAttribute('aria-hidden', 'true');
    lights.innerHTML = '<i></i><i></i><i></i>';
    const url = document.createElement('span');
    url.className = 'sc-url';
    url.textContent = validWebsite(p.url) ? domainOf(p.url) : 'coming soon';
    const num = document.createElement('span');
    num.className = 'sc-num';
    num.textContent = pad(i + 1);
    bar.append(lights, url, num);

    const view = document.createElement('span');
    view.className = 'sc-view';
    const img = new Image();
    img.className = 'sc-shot';
    img.alt = '';
    img.decoding = 'async';
    img.draggable = false;
    const msg = document.createElement('span');
    msg.className = 'sc-missing';
    msg.hidden = true;
    img.addEventListener('error', () => {
      img.hidden = true;
      msg.textContent = `ADD SCREENSHOT: ${img.getAttribute('src')}`;
      msg.hidden = false;
    });
    img.addEventListener('load', () => { img.hidden = false; msg.hidden = true; });
    shots.push(img);
    const open = document.createElement('span');
    open.className = 'sc-open';
    open.setAttribute('aria-hidden', 'true');
    open.textContent = '↗';
    view.append(img, msg, open);

    card.append(bar, view);
    card.addEventListener('click', () => {
      if (i === active) openProject(i);
      else go(i, true);
    });
    cardsWrap.append(card);
    return card;
  });

  /* Build dots */
  const dots = PROJECTS.map((p, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'sc-dot';
    dot.setAttribute('aria-label', `Show ${p.name}`);
    dot.innerHTML = '<span></span>';
    dot.addEventListener('click', () => go(i, true));
    dotsWrap.append(dot);
    return dot;
  });

  phoneImg.addEventListener('load', () => { phoneImg.style.opacity = '1'; });
  phoneImg.addEventListener('error', () => { phoneImg.style.opacity = '0'; });

  /* Where each card sits for the current active project */
  const DECK = [
    { t: 'translate3d(0,0,0) rotateY(0deg) rotateZ(0deg)', op: 1, b: 1 },
    { t: 'translate3d(13%,-12px,-110px) rotateY(-16deg) rotateZ(0deg)', op: 0.8, b: 0.6 },
    { t: 'translate3d(23%,-24px,-220px) rotateY(-24deg) rotateZ(0deg)', op: 0.5, b: 0.45 },
    { t: 'translate3d(32%,-36px,-320px) rotateY(-28deg) rotateZ(0deg)', op: 0, b: 0.4 }
  ];
  const GONE = { t: 'translate3d(-130%,30px,40px) rotateY(0deg) rotateZ(-14deg)', op: 0, b: 1 };

  function pose(i) {
    let o = ((i - active) % n + n) % n;
    if (mqMobile.matches) {
      if (o === 0) return DECK[0];
      if (o === n - 1 && n > 2) return GONE;
      return DECK[Math.min(o, 3)];
    }
    if (o > n / 2) o -= n;
    const abs = Math.abs(o);
    const w = cards[0].offsetWidth || 600;
    return {
      t: `translate3d(${(o * w * 0.48).toFixed(1)}px,0,${(-abs * w * 0.42).toFixed(1)}px) rotateY(${-o * 38}deg)`,
      op: abs > 2 ? 0 : abs === 2 ? 0.5 : 1,
      b: abs === 0 ? 1 : 0.5
    };
  }

  function render(animateText) {
    const mobile = mqMobile.matches;
    cards.forEach((card, i) => {
      const proj = PROJECTS[i];
      const hasMobile = !!proj.mobileImage;
      card.classList.toggle('is-phone', mobile && hasMobile);
      card.classList.toggle('is-wide', mobile && !hasMobile);
      const src = srcFor(proj);
      if (shots[i].getAttribute('src') !== src) {
        shots[i].hidden = false;
        shots[i].src = src;
      }

      const p = pose(i);
      const front = i === active;
      card.style.transform = p.t;
      card.style.opacity = p.op;
      card.style.filter = `brightness(${p.b})`;
      card.classList.toggle('is-front', front);
      card.classList.toggle('is-hidden', p.op === 0);
      card.tabIndex = front ? 0 : -1;
      card.setAttribute('aria-hidden', p.op === 0 ? 'true' : 'false');
      card.setAttribute('aria-label', front
        ? `Open ${PROJECTS[i].name} project details`
        : `Bring ${PROJECTS[i].name} forward`);
    });

    const p = PROJECTS[active];
    metaEl.textContent = `${pad(active + 1)} — ${p.category}`;
    titleEl.textContent = p.name;
    servicesEl.textContent = p.services;
    if (countEl) countEl.textContent = `[ ${pad(active + 1)} / ${pad(n)} ]`;

    const svc = String(p.services || '').split('·').map(s => s.trim()).filter(Boolean);
    [svc[0], svc[1]].forEach((label, k) => {
      chips[k].textContent = label ? label.toUpperCase() : '';
      chips[k].closest('.sc-chip').hidden = !label;
    });
    chips[2].textContent = `↗ ${(validWebsite(p.url) ? domainOf(p.url) : 'coming soon').toUpperCase()}`;

    phoneBody.style.setProperty('--fallback', p.fallback || '#191919');
    const phoneSrc = p.mobileImage || p.image;
    if (phoneImg.getAttribute('src') !== phoneSrc) {
      phoneImg.style.opacity = '0';
      phoneImg.src = phoneSrc;
    }

    visitEl.hidden = !validWebsite(p.url);
    if (!visitEl.hidden) {
      visitEl.href = p.url;
      visitEl.setAttribute('aria-label', `Visit ${p.name} live website`);
    }

    dots.forEach((d, i) => {
      d.classList.toggle('is-active', i === active);
      if (i === active) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
    progressEl.style.transform = `scaleX(${(active + 1) / n})`;

    if (animateText && !reduceMotion) {
      textBox.classList.remove('swap');
      void textBox.offsetWidth; // restart the text animation
      textBox.classList.add('swap');
    }
  }

  function go(i, user = false) {
    active = ((i % n) + n) % n;
    textBox.setAttribute('aria-live', user ? 'polite' : 'off');
    render(true);
    schedule();
  }

  function schedule() {
    clearTimeout(timer);
    if (reduceMotion || !inView || hovering || focused || document.hidden || dialog.open) return;
    timer = setTimeout(() => { if (!dialog.open) go(active + 1); }, DELAY);
  }

  /* Controls */
  document.getElementById('scPrev').addEventListener('click', () => go(active - 1, true));
  document.getElementById('scNext').addEventListener('click', () => go(active + 1, true));
  root.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1, true); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1, true); }
  });
  root.addEventListener('focusin', e => {
    focused = e.target.matches(':focus-visible');
    schedule();
  });
  root.addEventListener('focusout', e => {
    if (!root.contains(e.relatedTarget)) { focused = false; schedule(); }
  });

  /* Mouse: tilt the whole 3D stage + "VIEW PROJECT" cursor on the front card */
  if (canHover && !reduceMotion) {
    stage.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      scene.style.setProperty('--ry', `${(x * 16).toFixed(2)}deg`);
      scene.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`);
      setViewCursor(!!e.target.closest('.sc-card.is-front'));
      if (!hovering) { hovering = true; schedule(); }
    });
    stage.addEventListener('pointerleave', () => {
      scene.style.setProperty('--rx', '0deg');
      scene.style.setProperty('--ry', '0deg');
      setViewCursor(false);
      hovering = false;
      schedule();
    });
  }

  /* Touch: swipe left / right */
  let touchX = null, touchY = null;
  stage.addEventListener('touchstart', e => {
    const t = e.touches[0];
    touchX = t.clientX; touchY = t.clientY;
  }, { passive: true });
  stage.addEventListener('touchend', e => {
    if (touchX === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchX, dy = t.clientY - touchY;
    touchX = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(active + (dx < 0 ? 1 : -1), true);
  }, { passive: true });

  /* Start / pause autoplay with visibility */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) root.classList.add('is-in');
      schedule();
    }, { threshold: 0.25 }).observe(root);
  } else {
    inView = true;
    root.classList.add('is-in');
  }
  document.addEventListener('visibilitychange', schedule);
  dialog.addEventListener('close', schedule);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => render(false), 150);
  }, { passive: true });
  if (mqMobile.addEventListener) mqMobile.addEventListener('change', () => render(false));

  render(false);
  schedule();
})();

/* ---------- Menu ---------- */
const menuButton = document.getElementById('menuToggle');
const siteMenu = document.getElementById('siteMenu');
function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  siteMenu.classList.toggle('visible', open);
  siteMenu.inert = !open;
  document.body.classList.toggle('menu-open', open);
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
siteMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
document.addEventListener('click', e => { if (!siteMenu.contains(e.target) && !menuButton.contains(e.target)) setMenu(false); });

document.getElementById('emailLink').href = `mailto:${SETTINGS.email}?subject=${encodeURIComponent('Shopify Project Enquiry')}`;
document.getElementById('footerEmail').href = `mailto:${SETTINGS.email}`;
document.getElementById('instagramLink').href = SETTINGS.instagram;
document.getElementById('year').textContent = new Date().getFullYear();

/* =========================================================
   BRANDS MARQUEE
   logo : logo ka link (https://cdn.shopify.com/...) YA local path (logos/shukra.png)
          khaali chhodoge toh initials dikhenge
   bg   : (optional) tile ka background — white logo ho toh '#111' do
          khaali chhodoge toh light tile (#f5f5f2) aayegi
   tag  : naam ke neeche chhoti line
   url  : (optional) brand ki website — chip clickable ban jayega
   ========================================================= */
const BRANDS = [
  { name: 'Shukra',                 tag: 'HOME & CROCKERY',   logo: '', bg: '', url: 'https://shukrahome.in/' },
  { name: 'Lady Tisara',            tag: 'JEWELLERY',         logo: '', bg: '', url: 'https://ladytisara.com/' },
  { name: 'Genzbee',                tag: 'SKINCARE',          logo: '', bg: '', url: 'https://genzbee.in/' },
  { name: 'Lune Styles',            tag: 'FASHION',           logo: '', bg: '', url: 'https://lunestyles.com/' },
  { name: 'Varneeka',               tag: 'SILVER JEWELLERY',  logo: '', bg: '', url: '' },
  { name: 'Burly',                  tag: 'HOME APPLIANCES',   logo: '', bg: '', url: 'https://burly.in/' },
  { name: 'The Block & Bloom',      tag: 'PRINTED TOTE BAGS', logo: '', bg: '', url: 'https://www.theblockandbloom.com/' },
  { name: 'Toy Collectors India',   tag: 'COLLECTIBLES',      logo: '', bg: '', url: 'https://www.toycollectorsindia.com/' },
  { name: 'Jivitha Creations',      tag: 'LIFESTYLE',         logo: '', bg: '', url: 'https://jivithacreations.com/' },
  { name: 'KALT',                   tag: 'SKINCARE',          logo: '', bg: '', url: '' },
  { name: 'Motoblox',               tag: 'BUILDABLE CARS',    logo: '', bg: '', url: 'https://motoblox.com/' },
  { name: 'Balaji Home Essentials', tag: 'HOME ESSENTIALS',   logo: '', bg: '', url: '' }
];

(function initBrands() {
  const section = document.getElementById('brands');
  if (!section) return;
  section.classList.add('js-brands');

  const rows = [...section.querySelectorAll('.marquee')];
  const countEl = document.getElementById('brandCount');
  if (countEl) countEl.textContent = `[ BRANDS / ${pad(BRANDS.length)} ]`;

  // 8+ brands: rows me baant do. Kam ho toh har row me sab (ulta order).
  const split = BRANDS.length >= 8 && rows.length > 1;
  const rowBrands = rows.map((_, r) => split
    ? BRANDS.filter((_, i) => i % rows.length === r)
    : (r % 2 ? [...BRANDS].reverse() : BRANDS));

  function brandChip(brand, hidden) {
    const linked = validWebsite(brand.url);
    const chip = document.createElement(linked ? 'a' : 'div');
    chip.className = 'brand-chip';
    if (linked) {
      chip.href = brand.url;
      chip.target = '_blank';
      chip.rel = 'noopener noreferrer';
      if (hidden) chip.tabIndex = -1;
    }
    if (hidden) chip.setAttribute('aria-hidden', 'true');

    const logo = document.createElement('span');
    logo.className = 'brand-logo';
    if (brand.bg) logo.style.setProperty('--logo-bg', brand.bg);

    const initials = brand.name.replace(/[^A-Za-z0-9 ]/g, '').split(/\s+/).filter(Boolean)
      .map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const showInitials = () => {
      logo.replaceChildren();
      logo.classList.add('is-initials');
      logo.textContent = initials;
    };

    if (brand.logo) {
      const img = new Image();
      img.src = brand.logo;
      img.alt = hidden ? '' : `${brand.name} logo`;
      img.decoding = 'async';
      img.draggable = false;
      img.addEventListener('error', () => {
        if (!hidden) console.warn('Logo load nahi hua:', brand.name, brand.logo);
        showInitials();
      }, { once: true });
      logo.append(img);
    } else {
      showInitials();
    }

    const text = document.createElement('span');
    const name = document.createElement('span');
    name.className = 'brand-name';
    name.textContent = brand.name;
    text.append(name);
    if (brand.tag) {
      const tag = document.createElement('span');
      tag.className = 'brand-tag';
      tag.textContent = brand.tag;
      text.append(tag);
    }
    chip.append(logo, text);
    return chip;
  }

  function build() {
    rows.forEach((row, r) => {
      const track = row.querySelector('.marquee-track');
      const list = rowBrands[r];
      if (!track || !list.length) return;
      track.replaceChildren();

      const set = document.createElement('div');
      set.className = 'marquee-set';
      list.forEach(b => set.append(brandChip(b, false)));
      track.append(set);
      if (reduceMotion) return;

      // screen se chhota ho toh repeat karo (loop me gap na aaye)
      const sequence = [...list];
      let guard = 0;
      while (set.scrollWidth < row.clientWidth && guard++ < 12) {
        list.forEach(b => { set.append(brandChip(b, true)); sequence.push(b); });
      }
      // same copy → seamless infinite loop
      const copy = document.createElement('div');
      copy.className = 'marquee-set';
      copy.setAttribute('aria-hidden', 'true');
      sequence.forEach(b => copy.append(brandChip(b, true)));
      track.append(copy);

      const speed = Number(row.dataset.speed) || 50; // px per second
      track.style.setProperty('--duration', `${(set.getBoundingClientRect().width / speed).toFixed(2)}s`);
    });
  }

  let lastWidth = 0;
  const rebuild = (force) => {
    const w = section.clientWidth;
    if (!force && w === lastWidth) return;
    lastWidth = w;
    build();
  };
  rebuild(true);
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => rebuild(false), 200); }, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => rebuild(true));

  // heading reveal
  const intro = section.querySelector('.brands-intro');
  if (intro) {
    if (reduceMotion || !('IntersectionObserver' in window)) intro.classList.add('in');
    else new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) { intro.classList.add('in'); obs.disconnect(); }
    }, { threshold: 0.3 }).observe(intro);
  }

  // fast scroll → marquee speed up, phir dheere normal
  if (!reduceMotion) {
    const animations = () => rows.flatMap(row => {
      const track = row.querySelector('.marquee-track');
      return track && track.getAnimations ? track.getAnimations() : [];
    });
    let lastY = window.scrollY, boost = 0, boostRaf = 0;
    const decay = () => {
      boost *= 0.93;
      const rate = 1 + boost;
      animations().forEach(a => { a.playbackRate = rate; });
      if (boost > 0.01) boostRaf = requestAnimationFrame(decay);
      else { animations().forEach(a => { a.playbackRate = 1; }); boostRaf = 0; }
    };
    window.addEventListener('scroll', () => {
      const v = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      boost = Math.min(4, boost + v * 0.015);
      if (!boostRaf) boostRaf = requestAnimationFrame(decay);
    }, { passive: true });
  }
})();

/* =========================================================
   LOGO DESIGN — "Marks we've crafted."
   LOGOS 1–5  → grid (the 1st one = big FEATURED card)
   LOGOS 6–10 → slider below the grid (add more any time)
   name        : brand name
   category    : small line (SKINCARE, FASHION...)
   year        : (optional) shown on the featured card
   logo        : logo link or path, e.g. 'logo/kalt.png' (transparent PNG/SVG best)
                 leave '' to show a dashed placeholder
   bg          : tile background (the brand's colour)
   deliverables: (featured only) what you made
   colors      : (featured only) brand palette swatches
   url         : (optional) case study / Behance / Instagram link
   ========================================================= */
const LOGOS = [
  // ---- GRID (1–5) — 1st one = big featured card ----
  {
    name: 'Brand Name', category: 'CATEGORY', year: '2026',
    logo: 'logo/shutter 6-01.jpg',
    deliverables: 'Logo · Colour palette · Typography · Brand guidelines',
    colors: ['white', '#2b2a26', '#c56b4a', '#8fa48a'],
    url: ''
  },
  { name: 'Brand Name', category: 'CATEGORY', logo: 'logo/LOGOS (3).png',         url: '' },
  { name: 'Brand Name', category: 'CATEGORY', logo: 'logo/3.png',         url: '' },
  { name: 'Brand Name', category: 'CATEGORY', logo: 'logo/LOGOS.png',     url: '' },
  { name: 'Brand Name', category: 'CATEGORY', logo: 'logo/5.png',         url: '' },
  // ---- SLIDER (6 onwards) ----
  { name: 'Brand Name', category: 'CATEGORY', logo: 'logo/6.png',         url: '' },
  { name: 'Brand Name', category: 'CATEGORY', logo: 'logo/7.png',         url: '' },
  { name: 'Brand Name', category: 'CATEGORY', logo: 'logo/8.png',         url: '' },
  { name: 'Brand Name', category: 'CATEGORY', logo: 'logo/9.png',         url: '' },
  { name: 'Brand Name', category: 'CATEGORY', logo: 'logo/LOGOS (2).png', url: '' },
  { name: 'Brand Name', category: 'CATEGORY', logo: 'logo/1.png', url: '' }
];
const LOGO_GRID_COUNT = 5; // how many logos go in the grid; the rest go in the slider

(function initLogos() {
  const section = document.getElementById('logos');
  const logoGrid = document.getElementById('logoGrid');
  if (!section || !logoGrid || !LOGOS.length) return;
  section.classList.add('js-logos');

  const countEl = document.getElementById('logoCount');
  if (countEl) countEl.textContent = `[ IDENTITIES / ${pad(LOGOS.length)} ]`;

  // light tile → dark text, dark tile → light text
  function inkFor(color) {
    const hex = String(color || '').replace('#', '');
    const full = hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex;
    if (!/^[0-9a-f]{6}$/i.test(full)) return '#3d3a33';
    const [r, g, b] = [0, 2, 4].map(k => parseInt(full.slice(k, k + 2), 16) / 255);
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return lum > 0.5 ? '#2f2c26' : '#e6e6e2';
  }

  function placeholder() {
    const ph = document.createElement('span');
    ph.className = 'logo-ph';
    ph.setAttribute('aria-hidden', 'true');
    ph.append('[ LOGO ]');
    const small = document.createElement('small');
    small.textContent = 'PNG / SVG';
    ph.append(small);
    return ph;
  }

  function makeCard(b, i, featured) {
    const linked = validWebsite(b.url);
    const card = document.createElement(linked ? 'a' : 'div');
    card.className = `logo-card${featured ? ' logo-card--featured' : ''}`;
    if (linked) {
      card.href = b.url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.setAttribute('draggable', 'false');
      card.setAttribute('aria-label', `${b.name} — view logo project`);
    }
    card.style.setProperty('--tile', b.bg || '#f3efe6');
    card.style.setProperty('--tile-ink', inkFor(b.bg || '#f3efe6'));

    // logo tile
    const tile = document.createElement('div');
    tile.className = 'logo-tile';
    if (featured) {
      const numEl = document.createElement('span');
      numEl.className = 'logo-num';
      numEl.textContent = `${pad(i + 1)} / FEATURED`;
      tile.append(numEl);
      if (b.year) {
        const yearEl = document.createElement('span');
        yearEl.className = 'logo-year';
        yearEl.textContent = b.year;
        tile.append(yearEl);
      }
    }
    if (b.logo) {
      // no colour tile: the logo fills the card, and a soft blurred copy of
      // the same image fills any empty space around it
      tile.classList.add('has-img');
      const blur = new Image();
      blur.className = 'logo-blur';
      blur.src = b.logo;
      blur.alt = '';
      blur.setAttribute('aria-hidden', 'true');
      blur.loading = 'lazy';
      blur.draggable = false;
      const img = new Image();
      img.className = 'logo-main';
      img.src = b.logo;
      img.alt = `${b.name} logo`;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.draggable = false;
      img.addEventListener('error', () => {
        console.warn('Logo did not load:', b.name, b.logo);
        tile.classList.remove('has-img');
        blur.remove();
        img.replaceWith(placeholder());
      }, { once: true });
      tile.append(blur, img);
    } else {
      tile.append(placeholder());
    }

    // info strip
    const info = document.createElement('div');
    info.className = 'logo-info';
    const text = document.createElement('div');
    text.className = 'logo-text';
    const title = document.createElement('h3');
    title.textContent = b.name;
    const cat = document.createElement('span');
    cat.className = 'logo-cat';

    if (featured) {
      cat.textContent = `${b.category || ''} — BRAND IDENTITY`;
      text.append(cat, title);
      if (b.deliverables) {
        const desc = document.createElement('p');
        desc.className = 'logo-desc';
        desc.textContent = b.deliverables;
        text.append(desc);
      }
      info.append(text);

      const side = document.createElement('div');
      side.className = 'logo-side';
      if (Array.isArray(b.colors) && b.colors.length) {
        const sw = document.createElement('div');
        sw.className = 'logo-swatches';
        sw.setAttribute('aria-hidden', 'true');
        b.colors.slice(0, 5).forEach(c => {
          const dot = document.createElement('span');
          dot.style.background = c;
          sw.append(dot);
        });
        side.append(sw);
      }
      if (linked) {
        const cta = document.createElement('span');
        cta.className = 'logo-cta';
        cta.textContent = 'VIEW CASE ↗';
        side.append(cta);
      }
      if (side.children.length) info.append(side);
    } else {
      cat.textContent = b.category || '';
      text.append(title, cat);
      info.append(text);
      if (linked) {
        const arrow = document.createElement('span');
        arrow.className = 'logo-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '↗';
        info.append(arrow);
      }
    }

    card.append(tile, info);
    return card;
  }

  /* Grid: logos 1–5 */
  const gridCards = LOGOS.slice(0, LOGO_GRID_COUNT).map((b, i) => {
    const card = makeCard(b, i, i === 0);
    card.style.setProperty('--d', `${i === 0 ? 0 : 0.08 + (i % 4) * 0.08}s`);
    logoGrid.append(card);
    return card;
  });

  /* Slider: logos 6+ */
  const slider = document.getElementById('logoSlider');
  const track = document.getElementById('lsTrack');
  const sliderCards = [];
  if (slider && track && LOGOS.length > LOGO_GRID_COUNT) {
    slider.hidden = false;
    LOGOS.slice(LOGO_GRID_COUNT).forEach((b, k) => {
      const card = makeCard(b, LOGO_GRID_COUNT + k, false);
      card.classList.add('logo-card--slide');
      card.style.setProperty('--d', `${k * 0.08}s`);
      track.append(card);
      sliderCards.push(card);
    });
    initLogoSlider(track);
  }

  function initLogoSlider(track) {
    const prevBtn = document.getElementById('lsPrev');
    const nextBtn = document.getElementById('lsNext');
    const progress = document.getElementById('lsProgress');
    const count = document.getElementById('lsCount');

    const step = () => {
      const c = track.querySelector('.logo-card');
      return c ? c.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0) : track.clientWidth;
    };
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = Math.max(0, track.scrollWidth - track.clientWidth);
      if (prevBtn) prevBtn.disabled = track.scrollLeft <= 2;
      if (nextBtn) nextBtn.disabled = track.scrollLeft >= max - 2;
      if (progress) progress.style.transform = `scaleX(${track.scrollWidth ? Math.min(1, (track.scrollLeft + track.clientWidth) / track.scrollWidth) : 1})`;
      if (count) {
        const first = Math.min(sliderCards.length - 1, Math.round(track.scrollLeft / step()));
        count.textContent = `${pad(LOGO_GRID_COUNT + first + 1)} / ${pad(LOGOS.length)}`;
      }
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
    const slide = dir => track.scrollBy({ left: dir * step(), behavior: reduceMotion ? 'auto' : 'smooth' });

    prevBtn?.addEventListener('click', () => slide(-1));
    nextBtn?.addEventListener('click', () => slide(1));
    track.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue, { passive: true });
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); slide(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); slide(-1); }
    });

    // mouse drag (touch swipes natively)
    let dragging = false, moved = false, startX = 0, startScroll = 0;
    track.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragging = true; moved = false; startX = e.clientX; startScroll = track.scrollLeft;
    });
    window.addEventListener('pointermove', e => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 6) { moved = true; track.classList.add('dragging'); }
      if (moved) track.scrollLeft = startScroll - dx;
    }, { passive: true });
    window.addEventListener('pointerup', () => {
      if (!dragging) return;
      dragging = false;
      track.classList.remove('dragging');
      if (moved) track.scrollTo({ left: Math.round(track.scrollLeft / step()) * step(), behavior: 'smooth' });
    });
    track.addEventListener('click', e => {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);

    update();
  }

  /* Staggered entrance */
  const cards = [...gridCards, ...sliderCards];
  const reveal = card => {
    card.classList.add('in');
    card.addEventListener('transitionend', e => {
      if (e.propertyName === 'opacity') card.classList.add('done');
    }, { once: true });
  };
  const intro = section.querySelector('.logos-intro');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    cards.forEach(c => c.classList.add('in', 'done'));
    if (intro) intro.classList.add('in');
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (entry.target === intro) intro.classList.add('in');
        else reveal(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.18 });
    if (intro) io.observe(intro);
    cards.forEach(c => io.observe(c));
  }

  /* 3D tilt on hover (desktop) */
  if (canHover && !reduceMotion) {
    cards.forEach(card => {
      card.addEventListener('pointermove', e => {
        if (e.pointerType !== 'mouse') return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`);
        card.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }
})();

/* =========================================================
   LOCAL MP4 REELS — add/edit your video paths here.
   Keep the videos/ folder beside index.html.
   ========================================================= */
const REELS = [
  { url: 'videos/NBC Now Open Reel.mp4' },
  { url: 'videos/junoir you (7).mp4' },
  { url: 'videos/Karma production ads.mp4' },
  { url: 'videos/KARMA REELS 2025 (1).mp4' },
  { url: 'videos/KARMA REELS 2025 (2).mp4' },
  // { url: 'videos/NBC Now Open Reel.mp4' }
];

(function initReels() {
  const section = document.getElementById('reels');
  const track = document.getElementById('reelsTrack');
  if (!section || !track) return;

  const prevBtn = document.getElementById('reelsPrev');
  const nextBtn = document.getElementById('reelsNext');
  const videos = [];
  track.replaceChildren();

  REELS.forEach((reel, index) => {
    const card = document.createElement('article');
    card.className = 'reel-card';
    const frame = document.createElement('div');
    frame.className = 'reel-frame';
    const video = document.createElement('video');
    video.className = 'reel-video';
    video.src = reel.url;
    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.controls = false;
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('loop', '');
    video.setAttribute('aria-label', `Portfolio video ${index + 1}`);
    video.addEventListener('error', () => {
      console.error('Reel video failed to load:', reel.url, video.error);
    });
    frame.append(video);
    card.append(frame);
    track.append(card);
    videos.push(video);
  });

  // Visible reels play muted; off-screen reels pause.
  let scheduled = false;
  function syncPlayback() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      const viewport = track.getBoundingClientRect();
      videos.forEach(video => {
        const box = video.getBoundingClientRect();
        const width = Math.max(0, Math.min(box.right, viewport.right, innerWidth) - Math.max(box.left, viewport.left, 0));
        const height = Math.max(0, Math.min(box.bottom, innerHeight) - Math.max(box.top, 0));
        const visible = !document.hidden && box.width > 0 && box.height > 0 && width > box.width * .25 && height > box.height * .25;
        if (visible) {
          if (video.paused && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            const attempt = video.play();
            if (attempt) attempt.catch(err => console.debug('Autoplay prevented:', err));
          }
        } else if (!video.paused) video.pause();
      });
    });
  }
  videos.forEach(video => {
    video.addEventListener('loadeddata', syncPlayback);
    video.addEventListener('canplay', syncPlayback);
  });
  window.addEventListener('scroll', syncPlayback, { passive: true });
  window.addEventListener('resize', () => { updateArrows(); syncPlayback(); }, { passive: true });
  track.addEventListener('scroll', () => { updateArrows(); syncPlayback(); }, { passive: true });
  document.addEventListener('visibilitychange', syncPlayback);
  window.addEventListener('pageshow', syncPlayback);

  function step() {
    const card = track.querySelector('.reel-card');
    return card ? card.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0) : track.clientWidth;
  }
  function updateArrows() {
    const max = Math.max(0, track.scrollWidth - track.clientWidth);
    if (prevBtn) prevBtn.disabled = track.scrollLeft <= 2;
    if (nextBtn) nextBtn.disabled = track.scrollLeft >= max - 2;
  }
  const slide = direction => track.scrollBy({ left: direction * step(), behavior: 'smooth' });
  prevBtn?.addEventListener('click', () => slide(-1));
  nextBtn?.addEventListener('click', () => slide(1));
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); slide(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); slide(-1); }
  });

  let dragging = false, moved = false, startX = 0, startScroll = 0;
  track.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    dragging = true; moved = false; startX = e.clientX; startScroll = track.scrollLeft;
  });
  window.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 6) { moved = true; track.classList.add('dragging'); }
    if (moved) track.scrollLeft = startScroll - dx;
  }, { passive: true });
  window.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove('dragging');
    if (moved) track.scrollTo({ left: Math.round(track.scrollLeft / step()) * step(), behavior: 'smooth' });
  });
  track.addEventListener('click', e => {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
  }, true);

  updateArrows();
  syncPlayback();
})();