/*
  EASY CUSTOMIZATION:
  1. Place screenshot files next to index.html (or in an images/ folder and update the paths).
  2. Update image: 'your-file.png' for each project.
     TIP: Use FULL-PAGE screenshots (e.g. "GoFullPage" Chrome extension) —
     while the visitor scrolls, the screenshot scrolls through the whole store inside its frame.
  3. Update url: 'https://example.com/' to show the Visit Live Website link.
  4. Leave url: '' to hide website links for not-yet-live projects.
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
    image: 'motoblox.png', url: 'https://motoblox.com/',
    fallback: 'linear-gradient(135deg,#391615,#ab705d)'
  },
  {
    name: 'SHUKRA', category: 'DINNERWARE / SHOPIFY',
    description: 'A wellness storefront with product storytelling and simplified collection navigation.',
    services: 'UI/UX · Shopify Development',
    image: 'shukra.png', url: 'https://shukrahome.in/',
    fallback: 'linear-gradient(135deg,#12312a,#557954)'
  },
  {
    name: 'JEWELLERY', category: ' JEWELLERY & ACCESSORIES / SHOPIFYSHOPIFY',
    description: 'A refined homeware storefront designed around visual storytelling and an elegant product catalog.',
    services: 'Store Design · Product Pages',
    image: 'Screenshot 2026-10-12 092753.png', url: 'https://ladytisara.com/',
    fallback: 'linear-gradient(135deg,#473126,#94705d)'
  },
  {
    name: 'PRINTED TOTE BAGS ', category: 'PRINTED TOTE BAGS / SHOPIFY',
    description: 'A minimal technology storefront with clear product hierarchy and a modern shopping flow.',
    services: 'Shopify Theme · Mobile UX',
    image: 'blockbloom.png', url: 'https://www.theblockandbloom.com/',
    fallback: 'linear-gradient(135deg,#4b535e,#1e242b)'
  },
  {
    name: 'TOY COLLECTION INDIA', category: 'TOYS / SHOPIFY',
    description: 'A beauty and fragrance ecommerce experience focused on premium photography.',
    services: 'Art Direction · Store Development',
    image: 'tcii.png', url: 'https://www.toycollectorsindia.com/',
    fallback: 'linear-gradient(135deg,#341c19,#955d46)'
  },
  {
    name: 'JIVITHA', category: 'LIFESTYLE / SHOPIFY',
    description: 'An approachable lifestyle ecommerce site with an easy-to-browse catalog.',
    services: 'UI/UX · Custom Sections',
    image: 'jivitha.png', url: 'https://jivithacreations.com/',
    fallback: 'linear-gradient(135deg,#7c4663,#cc9caf)'
  }
];

const grid = document.getElementById('projectGrid');
const dialog = document.getElementById('projectDialog');
const dialogClose = document.getElementById('dialogClose');

const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = n => String(n).padStart(2, '0');
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const easeOut = t => 1 - Math.pow(1 - t, 3);

/* Entrance style for every card after the featured one (cycles): */
const ENTRANCES = ['left', 'right', 'tilt', 'swing'];

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
  const progress = document.createElement('span');
  progress.className = 'browser-progress';
  progress.setAttribute('aria-hidden', 'true');
  bar.append(dots, url, marker, progress);
  return bar;
}

document.getElementById('projectCount').textContent = `[ SELECTED WORK / ${pad(PROJECTS.length)} ]`;

/* ---------- Build project cards ---------- */
const items = [];

PROJECTS.forEach((project, index) => {
  const featured = index === 0;
  const type = featured ? 'zoom' : ENTRANCES[(index - 1) % ENTRANCES.length];
  const side = featured ? 0 : (index % 2 ? -1 : 1); // -1 = left column, 1 = right column

  const article = document.createElement('article');
  article.className = `project-card${featured ? ' project-featured' : side < 0 ? ' col-left' : ' col-right'}`;
  article.dataset.enter = type;

  const button = document.createElement('button');
  button.className = 'project-button';
  button.type = 'button';
  button.setAttribute('aria-label', `View ${project.name} screenshot and project details`);
  button.style.transformOrigin = {
    zoom: '50% 50%', left: '0% 100%', right: '100% 100%', tilt: '50% 100%',
    swing: side > 0 ? '100% 50%' : '0% 50%'
  }[type];

  const bar = browserBar(project, `${pad(index + 1)} / ${pad(PROJECTS.length)}`);

  const viewport = document.createElement('div');
  viewport.className = 'project-viewport';
  viewport.style.background = project.fallback || '#191919';
  const img = projectImage(project);
  viewport.append(img);

  const openIcon = document.createElement('span');
  openIcon.className = 'project-open';
  openIcon.setAttribute('aria-hidden', 'true');
  openIcon.textContent = '↗';
  viewport.append(openIcon);

  button.append(bar, viewport);
  button.addEventListener('click', () => openProject(index));

  const info = document.createElement('div');
  info.className = 'project-info';
  const meta = document.createElement('div');
  meta.className = 'project-meta';
  meta.textContent = `${pad(index + 1)} — ${project.category}`;
  const titleRow = document.createElement('div');
  titleRow.className = 'project-title-row';
  const title = document.createElement('h3');
  title.textContent = project.name;
  const indicator = document.createElement('span');
  indicator.textContent = '↗';
  indicator.setAttribute('aria-hidden', 'true');
  titleRow.append(title, indicator);
  info.append(meta, titleRow);
  if (featured) {
    const desc = document.createElement('p');
    desc.className = 'project-feature-text';
    desc.textContent = project.description;
    info.append(desc);
  }
  if (validWebsite(project.url)) {
    const external = document.createElement('a');
    external.className = 'project-external';
    external.href = project.url;
    external.target = '_blank';
    external.rel = 'noopener noreferrer';
    external.textContent = 'VISIT LIVE WEBSITE ↗';
    external.setAttribute('aria-label', `Visit ${project.name} live website`);
    info.append(external);
  }

  article.append(button, info);
  grid.append(article);

  const item = {
    card: article, button, viewport, img,
    progress: bar.querySelector('.browser-progress'),
    type, side, dist: 0, e: 0, q: 0, shown: false
  };
  img.addEventListener('load', () => measure(item));
  items.push(item);
});

/* How far the screenshot can scroll inside its frame */
function measure(item) {
  item.dist = item.img.isConnected
    ? Math.max(0, item.img.offsetHeight - item.viewport.clientHeight)
    : 0;
}

/* Card entrance transform for progress e (0 = off, 1 = in place) */
function enterTransform(item, e, D) {
  const k = 1 - e;
  switch (item.type) {
    case 'zoom': return `translate3d(0,${k * 70}px,0) scale(${1 - k * 0.14})`;
    case 'left': return `translate3d(${-k * D}px,${k * 50}px,0) rotate(${-k * 7}deg)`;
    case 'right': return `translate3d(${k * D}px,${k * 50}px,0) rotate(${k * 7}deg)`;
    case 'tilt': return `perspective(1200px) translate3d(0,${k * 140}px,0) rotateX(${k * 32}deg) scale(${1 - k * 0.06})`;
    case 'swing': return `perspective(1200px) translate3d(${item.side * k * D * 0.5}px,${k * 40}px,0) rotateY(${item.side * k * 32}deg)`;
    default: return 'none';
  }
}

/* ---------- Scroll-linked animation loop ---------- */
let sectionActive = false;
let rafId = 0;

function tick() {
  const vh = window.innerHeight;
  const D = Math.min(window.innerWidth * 0.22, 240);
  const rects = items.map(it => it.card.getBoundingClientRect()); // read first
  let settling = false;

  items.forEach((it, i) => {
    const r = rects[i];
    // entrance: starts when the card's top enters the screen, done at ~30% from the top
    const targetE = easeOut(clamp((vh - r.top) / (vh * 0.7)));
    // inner website scroll: runs while the card travels through the screen
    const targetQ = clamp((vh * 0.85 - r.top) / (vh * 0.85 + r.height * 0.6));

    it.e += (targetE - it.e) * 0.12; // smoothing = buttery inertia
    it.q += (targetQ - it.q) * 0.12;
    if (Math.abs(targetE - it.e) > 0.0005 || Math.abs(targetQ - it.q) > 0.0005) settling = true;

    it.button.style.transform = enterTransform(it, it.e, D);
    it.button.style.opacity = Math.min(1, 0.08 + it.e * 1.15).toFixed(3);
    if (it.type === 'zoom') {
      const k = 1 - it.e;
      it.button.style.clipPath = `inset(${k * 10}% ${k * 7}% ${k * 10}% ${k * 7}% round 14px)`;
    }

    if (it.img.isConnected && it.dist) {
      it.img.style.transform = `translate3d(0,${(-it.q * it.dist).toFixed(1)}px,0)`;
      it.progress.style.transform = `scaleX(${it.q.toFixed(3)})`;
    }

    if (!it.shown && it.e > 0.72) { it.shown = true; it.card.classList.add('in'); }
    else if (it.shown && it.e < 0.25) { it.shown = false; it.card.classList.remove('in'); }
  });

  rafId = (sectionActive || settling) ? requestAnimationFrame(tick) : 0;
}

function startLoop() { if (!rafId) rafId = requestAnimationFrame(tick); }

if (!reduceMotion && 'IntersectionObserver' in window) {
  grid.classList.add('is-animated');
  new IntersectionObserver(([entry]) => {
    sectionActive = entry.isIntersecting;
    if (sectionActive) startLoop();
  }, { rootMargin: '25% 0px 25% 0px' }).observe(grid);

  window.addEventListener('resize', () => { items.forEach(measure); startLoop(); }, { passive: true });
  window.addEventListener('load', () => { items.forEach(measure); startLoop(); });
  startLoop();
} else {
  items.forEach(it => it.card.classList.add('in'));
}

/* ---------- "Commerce, with character." word-by-word reveal ---------- */
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

  items.forEach(({ button }) => {
    button.addEventListener('mouseenter', () => viewCursor.classList.add('active'));
    button.addEventListener('mouseleave', () => viewCursor.classList.remove('active'));
  });
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
  if (viewCursor) viewCursor.classList.remove('active');
  dialog.showModal();
  document.body.classList.add('modal-open');
}
function closeProject() { if (dialog.open) dialog.close(); document.body.classList.remove('modal-open'); }
dialogClose.addEventListener('click', closeProject);
dialog.addEventListener('click', e => { if (e.target === dialog) closeProject(); });
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));

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
   Add your client logos in a logos/ folder and list them here.
   - logo: path to the logo file (PNG/SVG, transparent works best).
           If the file is missing, the brand's initials are shown instead.
   - tag:  small line under the name (category / work done).
   - url:  optional — makes the chip a link to their website.
   ========================================================= */
const BRANDS = [
  { name: 'Shukra', tag: 'HOME & CROCKERY', logo: 'LOGOS/1.png', url: 'https://shukrahome.in/' },
  { name: 'Lady Tisara', tag: 'JEWELLERY', logo: 'LOGOS/3.png', url: 'https://ladytisara.com/' },
  { name: 'Genzbee', tag: 'SKINCARE', logo: 'logos/genzbee.png', url: 'https://genzbee.in/' },
  { name: 'Lune Styles', tag: 'FASHION', logo: 'logos/lune-styles.png', url: 'https://lunestyles.com/' },
  { name: 'Varneeka', tag: 'SILVER JEWELLERY', logo: 'logos/varneeka.png', url: '' },
  { name: 'Burly', tag: 'HOME APPLIANCES', logo: 'logos/burly.png', url: 'https://burly.in/' },
  { name: 'The Block & Bloom', tag: 'SHOPIFY STORE', logo: 'logos/block-bloom.png', url: 'https://www.theblockandbloom.com/' },
  { name: 'Toy Collectors India', tag: 'COLLECTIBLES', logo: 'logos/tci.png', url: 'https://www.toycollectorsindia.com/' },
  { name: 'Jivitha Creations', tag: 'SHOPIFY STORE', logo: 'logos/jivitha.png', url: 'https://jivithacreations.com/' },
  { name: 'KALT', tag: 'SKINCARE', logo: 'logos/kalt.png', url: '' },
  { name: 'Motoblox', tag: 'SHOPIFY STORE', logo: 'logos/motoblox.png', url: 'https://motoblox.com/' },
  { name: 'Balaji Home Essentials', tag: 'HOME ESSENTIALS', logo: 'logos/balaji.png', url: '' }
];

(function initBrands() {
  const section = document.getElementById('brands');
  if (!section) return;
  section.classList.add('js-brands');

  const rows = [...section.querySelectorAll('.marquee')];
  const countEl = document.getElementById('brandCount');
  if (countEl) countEl.textContent = `[ BRANDS / ${pad(BRANDS.length)} ]`;

  // 8+ brands: split them across the rows. Fewer: every row shows all (alternate order).
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
    const initials = brand.name.replace(/[^A-Za-z0-9 ]/g, '').split(/\s+/).filter(Boolean)
      .map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const showInitials = () => { logo.replaceChildren(); logo.classList.add('is-initials'); logo.textContent = initials; };
    if (brand.logo) {
      const img = new Image();
      img.src = brand.logo;
      img.alt = hidden ? '' : `${brand.name} logo`;
      img.decoding = 'async';
      img.addEventListener('error', showInitials, { once: true });
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

      // repeat brands until one set is wider than the screen (no gaps in the loop)
      const sequence = [...list];
      let guard = 0;
      while (set.scrollWidth < row.clientWidth && guard++ < 12) {
        list.forEach(b => { set.append(brandChip(b, true)); sequence.push(b); });
      }
      // identical copy right after it → seamless infinite loop
      const copy = document.createElement('div');
      copy.className = 'marquee-set';
      copy.setAttribute('aria-hidden', 'true');
      sequence.forEach(b => copy.append(brandChip(b, true)));
      track.append(copy);

      const speed = Number(row.dataset.speed) || 50; // pixels per second
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

  // scroll faster → marquee speeds up, then eases back
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
