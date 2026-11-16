/* Site behaviour, shared by every page (index.html + the work pages).
   Each block only runs when its elements exist on the current page.
   Content lives in js/content.js. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const page = document.body.dataset.page || 'home';   // home | dev | graphic | photography | barista
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
                  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const kindOf = (p) => [p.category, p.year].filter(Boolean).join(' · ').toUpperCase();

  // ---------- Year ----------
  const y = new Date().getFullYear();
  $$('#year, .yr').forEach(e => { e.textContent = y; });

  // ---------- Email + copy ----------
  $$('.mail').forEach(a => { a.href = 'mailto:' + EMAIL; });
  if (EMAIL !== 'you@example.com') $$('.mail-text').forEach(e => { e.textContent = EMAIL.toUpperCase(); });
  const toast = (msg) => { const t = $('#toast'); if (!t) return; t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 1800); };
  $$('.copy').forEach(b => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(EMAIL); toast('EMAIL COPIED'); }
    catch (e) { toast(EMAIL); }
  }));

  // ---------- Accent colour switcher (remembered per visitor, on every page) ----------
  let paintDots = () => {};
  const setAccent = (c) => {
    root.style.setProperty('--accent', c);
    $$('#swatches button').forEach(b => b.setAttribute('aria-pressed', b.dataset.c === c));
    store.set('accent', c);
    paintDots();
  };
  const swatches = $('#swatches');
  if (swatches) ACCENTS.forEach(c => {
    const b = el('button'); b.type = 'button'; b.dataset.c = c; b.style.background = c; b.setAttribute('aria-label', 'Accent ' + c);
    b.addEventListener('click', () => setAccent(c));
    swatches.appendChild(b);
  });

  // ---------- Mobile menu ----------
  const menuBtn = $('.menu-btn'), links = $('#navlinks');
  if (menuBtn && links) {
    const close = () => { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); menuBtn.textContent = 'MENU ☰'; };
    menuBtn.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
      menuBtn.textContent = open ? 'CLOSE ✕' : 'MENU ☰';
    });
    $$('a', links).forEach(a => a.addEventListener('click', close));
  }

  // ---------- Modal (project details / gallery image) ----------
  const modal = $('#modal');
  function openModal(p) {
    if (!modal) return;
    $('#m-title').textContent = p.title;
    $('#m-kind').textContent = kindOf(p);
    $('#m-desc').textContent = p.desc || '';
    const th = $('#m-thumb');
    th.innerHTML = ''; th.style.backgroundImage = '';
    th.classList.toggle('full', !!(p.image && p.full));
    if (p.image && p.full) { const im = el('img'); im.src = p.image; im.alt = p.title; th.appendChild(im); }   // gallery: whole image
    else if (p.image) th.style.backgroundImage = `url('${p.image}')`;
    else th.textContent = (p.stack || []).join(' · ') || (p.category || '').toUpperCase();
    const st = $('#m-stack'); st.innerHTML = '';
    (p.stack || []).forEach(t => st.appendChild(el('span', '', t)));
    const l = $('#m-link'), href = p.demo || p.link; l.hidden = !href;
    if (href) { l.href = href; l.textContent = p.demo ? 'LIVE DEMO ↗' : href.includes('github.com') ? 'VIEW ON GITHUB ↗' : 'VIEW PROJECT ↗'; }
    if (modal.showModal) modal.showModal(); else modal.setAttribute('open', '');
  }
  if (modal) {
    $('#m-close').addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
  }

  // ---------- Home: featured project cards + filters ----------
  const grid = $('div.projects#projects');
  if (grid) {
    PROJECTS.forEach((p, i) => {
      const b = el('button', 'bi card'); b.type = 'button'; b.dataset.cat = p.category;
      // card picture: a logo (shown whole, on its own background) > a screenshot > the tech stack as text
      const thumb = p.logo ? `<div class="thumb thumb-logo" style="background-image:url('${p.logo}');background-color:${p.logoBg || '#f1f0ec'}"></div>`
        : p.image ? `<div class="thumb" style="background-image:url('${p.image}')"></div>` : '<div class="thumb thumb-stack"></div>';
      b.innerHTML = `${thumb}<div class="card-row"><b></b><span>(${String(i + 1).padStart(2, '0')})</span></div><span class="kind"></span><p class="card-desc"></p>`;
      if (!p.image && !p.logo) $('.thumb', b).textContent = (p.stack || []).slice(0, 4).join(' · ') || p.category.toUpperCase();
      $('.card-row b', b).textContent = p.title;
      $('.kind', b).textContent = kindOf(p);
      $('.card-desc', b).textContent = p.summary || '';
      b.addEventListener('click', () => openModal(p));
      grid.appendChild(b);
    });
    const filters = $('#filters');
    ['All', ...new Set(PROJECTS.map(p => p.category))].forEach(c => {
      const b = el('button', '', c.toUpperCase()); b.type = 'button'; b.setAttribute('aria-pressed', c === 'All');
      b.addEventListener('click', () => {
        $$('#filters button').forEach(x => x.setAttribute('aria-pressed', x === b));
        $$('.card', grid).forEach(card => { card.hidden = !(c === 'All' || card.dataset.cat === c); });
      });
      filters.appendChild(b);
    });
  }

  // ---------- Work pages: lists rendered from content.js ----------
  // Dev page: one case-study row per project with area 'dev'
  const caseList = $('#case-list');
  if (caseList) {
    PROJECTS.filter(p => p.area === caseList.dataset.area).forEach((p, i) => {
      const a = el('article', 'bi case');
      a.innerHTML = `<p class="case-num">(${String(i + 1).padStart(2, '0')})</p>
        <div class="case-main"><p class="kind"></p><h3></h3><p class="case-desc"></p><div class="chips"></div></div>
        <div class="case-side"></div>`;
      $('.kind', a).textContent = kindOf(p);
      $('h3', a).textContent = p.title;
      $('.case-desc', a).textContent = p.desc;
      (p.stack || []).forEach(t => $('.chips', a).appendChild(el('span', '', t)));
      if (p.image) {                    // screenshot under the text
        const shot = el('img', 'case-shot'); shot.src = p.image; shot.alt = p.title + ' screenshot'; shot.loading = 'lazy';
        $('.case-main', a).appendChild(shot);
      }
      const side = $('.case-side', a);
      const btn = (cls, text, href) => { const l = el('a', cls, text); l.href = href; l.target = '_blank'; l.rel = 'noopener'; side.appendChild(l); };
      if (p.demo) btn('btn btn-solid', 'LIVE DEMO ↗', p.demo);
      if (p.link) btn('btn btn-line', p.link.includes('github.com') ? 'VIEW ON GITHUB ↗' : 'VIEW PROJECT ↗', p.link);
      if (!p.demo && !p.link) side.appendChild(el('span', 'case-private', 'CODE PRIVATE'));
      caseList.appendChild(a);
    });
  }
  // Gallery pages (graphic / photography / barista): tiles from GALLERY[area]
  $$('.gallery[data-area]').forEach(g => {
    (GALLERY[g.dataset.area] || []).forEach(item => {
      const b = el('button', 'bi tile'); b.type = 'button';
      b.innerHTML = '<div class="tile-img"></div><p class="tile-kind"></p><p class="tile-title"></p><p class="tile-note"></p>';
      const box = $('.tile-img', b);
      if (item.image) {               // real image: keep its own shape (masonry), load lazily
        const im = el('img'); im.src = item.image; im.alt = item.title; im.loading = 'lazy';
        if (item.w) { im.width = item.w; im.height = item.h; }
        box.appendChild(im); box.classList.add('has-img');
      } else box.textContent = '[ADD IMAGE]';
      $('.tile-kind', b).textContent = (item.category || '').toUpperCase();
      $('.tile-title', b).textContent = item.title;
      $('.tile-note', b).textContent = item.note || '';
      b.addEventListener('click', () => openModal({ title: item.title, desc: item.note, image: item.image, category: item.category || '', full: true }));
      g.appendChild(b);
    });
  });

  // Photo: hide placeholder if an <img> is added
  // Portrait: turn the 5 strips into slices of the photo, so the intro assembles the picture
  const frame = $('.photo-frame'), photo = frame && $('img', frame);
  if (photo) {
    const slice = () => {
      const a = (photo.naturalWidth || 1) / (photo.naturalHeight || 1);   // image aspect ratio
      const FA = (frame.clientWidth / frame.clientHeight) || 1;            // frame shape (width / height), read from CSS
      const SH = 0.205, PX = 0.62, PY = 0.08;                               // strip height, focus point (face sits right of centre)
      // "cover" size of the image, in frame units (frame width = 1, frame height = 1 / FA)
      const H = 1 / FA, imgW = a > FA ? H * a : 1, imgH = a > FA ? H : 1 / a;
      const y0 = (H - imgH) * PY;                                           // image top offset inside the frame
      $$('.strip', frame).forEach((st, i) => {
        const top = H * (i * 0.2), sh = H * SH;
        st.style.backgroundImage = `url('${photo.currentSrc || photo.src}')`;
        st.style.backgroundSize = `${(imgW * 100).toFixed(2)}% ${(imgH / sh * 100).toFixed(2)}%`;
        const py = Math.abs(sh - imgH) < 1e-6 ? 0 : (y0 - top) / (sh - imgH) * 100;
        st.style.backgroundPosition = `${PX * 100}% ${py.toFixed(2)}%`;
      });
      frame.classList.add('has-img');
    };
    if (photo.complete && photo.naturalWidth) slice(); else photo.addEventListener('load', slice, { once: true });
  }

  let swarm = null;
  const hero = $('#top');
  const isHomeHero = !!$('#ring');
  let countUp = () => {};

  // ---------- Home hero intro animation ----------
  if (isHomeHero) {
    const ring = $('#ring');
    const dots = Array.from({ length: 12 }, () => ring.appendChild(document.createElement('span')));
    paintDots = () => {
      const accent = getComputedStyle(root).getPropertyValue('--accent').trim();
      dots.forEach((d, i) => { d.style.background = i === 0 ? accent : 'rgba(236,235,232,' + (1 - i * 0.06).toFixed(2) + ')'; });
    };
    const CURSORS = [
      { label: 'layout', c: '#4ea1ff', spots: [['18%', '34%'], ['26%', '56%'], ['48%', '44%']] },
      { label: 'type',   c: '#f5c542', spots: [['52%', '60%'], ['14%', '72%'], ['56%', '70%']] },
      { label: 'image',  c: '#ff7a6b', spots: [['80%', '38%'], ['74%', '58%'], ['52%', '52%']] }
    ];
    const curEls = CURSORS.map(c => {
      const e = el('div', 'cursor');
      e.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="${c.c}" stroke="#0d0d0f" stroke-width="1.5" stroke-linejoin="round"><path d="M4 3l15 7-6.5 2L10 19z"/></svg><span style="background:${c.c}">${c.label}</span>`;
      $('#cursors').appendChild(e); return e;
    });

    const stage = (s) => {
      hero.dataset.intro = s;
      dots.forEach((d, i) => {
        d.style.transform = s >= 1 ? `rotate(${i * 30}deg) translateY(-26px)`
          : `translate(${(Math.cos(i * 2.3) * 320).toFixed(0)}px, ${(Math.sin(i * 1.7) * 220).toFixed(0)}px)`;
      });
      const k = Math.min(Math.max(s - 2, 0), 2);
      curEls.forEach((e, i) => { e.style.left = CURSORS[i].spots[k][0]; e.style.top = CURSORS[i].spots[k][1]; });
      if (s === 5) { countUp(); if (swarm) swarm.start(); }
    };
    let introTimers = [];
    const playIntro = () => {
      introTimers.forEach(clearTimeout);
      if (reduced) { stage(5); return; }
      stage(0);
      introTimers = [60, 1250, 2000, 2800, 3500].map((ms, i) => setTimeout(() => stage(i + 1), ms));
    };
    $('#replay').addEventListener('click', playIntro);

    // Scroll-back replay for the hero: once it is fully off-screen it resets to the
    // wireframe stage, and replays sketch → type → photo → services when it returns
    // (the black "INITIALISING" loader only plays on first load / REPLAY INTRO).
    if (!reduced && 'IntersectionObserver' in window) {
      let away = false;
      new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) {
          if (hero.dataset.intro !== '5') return; // still playing its first intro
          introTimers.forEach(clearTimeout);
          away = true; stage(2);                   // reset while nobody can see it
        } else if (away) {
          away = false;
          introTimers = [300, 1000, 1700].map((ms, i) => setTimeout(() => stage(i + 3), ms));
        }
      }, { rootMargin: '60px 0px 60px 0px' }).observe(hero);
    }

    // Stat counters (set the real number in data-count); re-run on every replay
    countUp = () => {
      $$('.stats b[data-count]').forEach(b => {
        const end = +b.dataset.count, suf = b.dataset.suffix || '';
        if (reduced) { b.textContent = end + suf; return; }
        const t0 = performance.now();
        const tick = (t) => { const p = Math.min((t - t0) / 1200, 1); b.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      });
    };
    window.__playIntro = playIntro;
  }

  // ---------- Active nav ----------
  const sections = $$('main section, main header.page-hero');   // work pages: the hero is built too
  const navA = $$('#navlinks a[href^="#"]');   // in-page links only (home)
  let raf = null;
  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      const vh = innerHeight || 800;
      let cur = '';
      sections.forEach(el => { if (el.getBoundingClientRect().top < vh * 0.4) cur = el.id; });
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4 && $('#contact')) cur = 'contact';
      navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  // ---------- Agent swarm: builds each section by "typing" it in ----------
  swarm = (function () {
    if (reduced) return { start() {} };
    const COLORS = ['#4ea1ff', '#f5c542', '#ff7a6b', '#3ecf6e', '#c58bff', '#ff9fd2', '#5ee0d6', '#ffffff',
                    '#4ea1ff', '#f5c542', '#ff7a6b', '#3ecf6e', '#c58bff', '#5ee0d6'];
    const MAX_BUILDERS = 4;
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const docW = () => document.documentElement.clientWidth;

    // Layer + agents
    const layer = document.createElement('div'); layer.id = 'swarm'; layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);
    const agents = COLORS.map((c, i) => {
      const el = document.createElement('div'); el.className = 'agent';
      el.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="${c}" stroke="#0d0d0f" stroke-width="1.5" stroke-linejoin="round"><path d="M4 3l15 7-6.5 2L10 19z"/></svg><span style="background:${c}">agent-${String(i + 1).padStart(2, '0')}</span>`;
      layer.appendChild(el);
      return { el, c, x: 0, y: 0, busy: false };
    });
    function place(a, x, y, ms) {
      a.x = Math.max(0, Math.min(x, docW() - 90)); a.y = y;
      a.el.style.transition = `transform ${ms}ms cubic-bezier(.2,.8,.2,1), opacity .4s ease`;
      a.el.style.transform = `translate(${a.x}px, ${a.y}px)`;
    }
    const show = (on) => agents.forEach(a => { a.el.style.opacity = on ? 1 : 0; });

    // HUD (bottom status pill)
    const hud = document.createElement('div'); hud.className = 'hud'; hud.setAttribute('aria-hidden', 'true');
    hud.innerHTML = `<span class="dots">${COLORS.slice(0, 6).map(c => `<i style="background:${c}"></i>`).join('')}</span>` +
      `<span class="agents"><b>${agents.length}</b> agents</span><span><b class="n">0</b> / <span class="t">0</span> nodes</span>` +
      `<span class="st">Idle</span><button type="button" class="skip">SKIP</button>`;
    document.body.appendChild(hud);
    const $n = $('.n', hud), $t = $('.t', hud), $st = $('.st', hud), $btn = $('.skip', hud);

    // Nodes = every heading + .bi block inside a section
    const LABELS = { H2: 'heading', H3: 'title', P: 'text', ARTICLE: 'entry', UL: 'list', A: 'link', BUTTON: 'card', SPAN: 'chip', DIV: 'block' };
    const all = [];
    sections.forEach(sec => {
      sec._nodes = $$('h2, .bi', sec);
      sec._nodes.forEach(n => { n._sec = sec; all.push(n); });
    });
    let gen = 0, queue = [], active = 0, done = 0, started = false, finished = false, skipped = false;

    function restore(n) {
      (n._parts || []).forEach(p => { if (p.v.isConnected) p.v.replaceWith(p.t); p.h.remove(); });
      (n._extra || []).forEach(e => e.remove());
      n._parts = null; n._extra = null;
    }
    function resetNodes() {
      all.forEach(n => { restore(n); n.classList.add('node', 'wait'); n.classList.remove('typing'); n._done = false; });
      sections.forEach(s => { s.classList.remove('building'); s._queued = false; });
      done = 0; finished = false; skipped = false; $n.textContent = 0; $t.textContent = all.length;
    }
    // Scroll-back replay: a finished section that has left the screen goes back to wireframe,
    // so it gets built again the next time it scrolls into view.
    function resetSection(sec) {
      sec._nodes.forEach(n => {
        if (n._done) { n._done = false; done--; }
        n.classList.add('wait'); n.classList.remove('typing');
      });
      sec._queued = false;
      $n.textContent = done;
      if (finished) { // wake the swarm back up
        finished = false; $btn.textContent = 'SKIP'; $btn.classList.remove('alt');
        show(true); hud.classList.add('show'); status();
      }
    }
    function complete(n) {
      if (n._done) return;
      restore(n); n.classList.remove('wait', 'typing'); n._done = true; done++;
      $n.textContent = done;
      const sec = n._sec;
      if (sec._nodes.every(x => x._done)) {
        sec.classList.remove('building');
        // finished while already off-screen? reset it now so it still replays on the way back
        const r = sec.getBoundingClientRect();
        if (!skipped && sec._queued && (r.bottom < -120 || r.top > innerHeight + 120)) { resetSection(sec); return; }
      }
      if (done === all.length) allDone();
    }
    function status() {
      if (finished) return;
      $st.textContent = active ? 'Typing…' : queue.length ? 'Routing…' : 'Idle · scroll to build';
    }

    async function build(n, a, g) {
      const fast = queue.length > 6;
      // 1. fly to the top-left corner of the block
      const r = n.getBoundingClientRect();
      const fly = fast ? 260 : 520;
      place(a, r.left + scrollX - 6, r.top + scrollY - 4, fly);
      await sleep(fly);
      if (g !== gen) return;
      // 2. split text: typed part visible, untyped rest invisible, so layout never moves
      const tw = document.createTreeWalker(n, NodeFilter.SHOW_TEXT, {
        acceptNode: t => (t.nodeValue.trim() && !t.parentElement.closest('svg')) ? 1 : 3 });
      const texts = []; while (tw.nextNode()) texts.push(tw.currentNode);
      const parts = texts.map(t => {
        const v = document.createElement('span'), h = document.createElement('span');
        v.className = 'tw-v'; h.className = 'tw-h'; h.textContent = t.nodeValue;
        t.replaceWith(v, h);
        return { t, v, h, full: t.nodeValue };
      });
      const tag = document.createElement('span'); tag.className = 'tag'; tag.style.background = a.c;
      tag.textContent = (n.dataset.label || LABELS[n.tagName] || 'block') + ' · ' + n._sec.id;
      const caret = document.createElement('span'); caret.className = 'caret';
      const handles = [['left', 'top'], ['right', 'top'], ['left', 'bottom'], ['right', 'bottom']].map(([h, v]) => {
        const e = document.createElement('span'); e.className = 'handle'; e.style[h] = '-9px'; e.style[v] = '-9px'; return e; });
      n._parts = parts; n._extra = [tag, caret, ...handles];
      n.append(tag, ...handles);
      n.classList.remove('wait'); n.classList.add('typing');
      a.el.classList.add('busy');
      // 3. type a few characters per frame; the agent rides the caret
      const total = parts.reduce((s, p) => s + p.full.length, 0) || 1;
      const frames = fast ? 10 : Math.max(18, Math.min(75, total / 2.5));
      const per = Math.max(1, Math.ceil(total / frames));
      let f = 0;
      for (const p of parts) {
        let pos = 0;
        p.v.after(caret);
        while (pos < p.full.length) {
          if (g !== gen) return;
          const gone = n.getBoundingClientRect().bottom < 0; // scrolled past: finish now
          pos = gone ? p.full.length : Math.min(p.full.length, pos + per);
          p.v.textContent = p.full.slice(0, pos); p.h.textContent = p.full.slice(pos);
          if (f++ % 3 === 0) {
            const cr = caret.getBoundingClientRect();
            place(a, cr.right + scrollX + 3, cr.top + scrollY + cr.height * 0.45, 140);
          }
          await new Promise(requestAnimationFrame);
        }
      }
      await sleep(fast ? 60 : 220);
      if (g !== gen) return;
      a.el.classList.remove('busy');
      complete(n);
    }

    function pump() {
      if (!started) return;
      while (active < MAX_BUILDERS && queue.length) {
        // blocks already scrolled past (or hidden by a filter) finish instantly; on-screen blocks go first
        const vh = innerHeight;
        queue = queue.filter(q => {
          if (q._done) return false;
          if (q.offsetParent === null || q.getBoundingClientRect().bottom < 0) { complete(q); return false; }
          return true;
        });
        if (!queue.length) break;
        let i = queue.findIndex(q => { const r = q.getBoundingClientRect(); return r.top < vh && r.bottom > 0; });
        const n = queue.splice(i < 0 ? 0 : i, 1)[0];
        const free = agents.filter(a => !a.busy);
        if (!free.length) { queue.unshift(n); break; }
        const r = n.getBoundingClientRect(), tx = r.left + scrollX, ty = r.top + scrollY;
        const a = free.sort((p, q) => Math.hypot(p.x - tx, p.y - ty) - Math.hypot(q.x - tx, q.y - ty))[0];
        a.busy = true; active++;
        const g = gen;
        build(n, a, g).finally(() => {
          if (g !== gen) return;
          a.busy = false; a.el.classList.remove('busy'); active--; pump();
        });
      }
      status();
    }
    let pumpT = null;
    addEventListener('scroll', () => { if (!pumpT) pumpT = setTimeout(() => { pumpT = null; pump(); }, 150); }, { passive: true });
    function enqueue(sec) {
      if (sec._nodes.some(n => !n._done)) sec.classList.add('building');
      sec._nodes.forEach(n => { if (!n._done && !queue.includes(n)) queue.push(n); });
      pump();
    }

    // Idle agents drift around the visible part of the page
    setInterval(() => {
      if (!started || finished) return;
      const vw = docW(), vh = innerHeight;
      agents.forEach(a => {
        if (a.busy) return;
        place(a, scrollX + vw * (0.08 + Math.random() * 0.84), scrollY + vh * (0.18 + Math.random() * 0.7), 1400 + Math.random() * 900);
      });
    }, 1300);

    function allDone() {
      finished = true; $st.textContent = 'Complete ✓'; $btn.textContent = 'REBUILD'; $btn.classList.add('alt');
      // gather at the right edge, then fade out
      const vw = docW();
      agents.forEach((a, i) => place(a, scrollX + vw - 70 - (i % 3) * 14, scrollY + innerHeight * 0.3 + i * 16, 900));
      setTimeout(() => { if (finished) { show(false); hud.classList.remove('show'); } }, 2200);
    }

    let io, exitIO;
    function observe() {
      if (!('IntersectionObserver' in window)) { sections.forEach(enqueue); return; }
      if (io) io.disconnect();
      if (exitIO) exitIO.disconnect();
      // Enter: start building once the section is a little way into the screen
      io = new IntersectionObserver(es => es.forEach(e => {
        const sec = e.target;
        if (e.isIntersecting && !sec._queued) { sec._queued = true; enqueue(sec); }
      }), { rootMargin: '0px 0px -15% 0px', threshold: 0.05 });
      // Exit: only once it is completely off-screen (with margin), reset it for the replay
      exitIO = new IntersectionObserver(es => es.forEach(e => {
        const sec = e.target;
        if (!e.isIntersecting && !skipped && sec._queued && sec._nodes.every(n => n._done)) resetSection(sec);
      }), { rootMargin: '120px 0px 120px 0px', threshold: 0 });
      sections.forEach(s => { io.observe(s); exitIO.observe(s); });
    }

    $btn.addEventListener('click', () => {
      gen++; queue = []; active = 0;
      agents.forEach(a => { a.busy = false; a.el.classList.remove('busy'); });
      if (finished) { // REBUILD
        resetNodes(); $btn.textContent = 'SKIP'; $btn.classList.remove('alt');
        show(true); hud.classList.add('show');
        scrollTo({ top: 0 }); observe(); status();
        return;
      }
      skipped = true;         // SKIP: finish everything and stop replaying until REBUILD
      all.forEach(complete);
    });

    resetNodes();
    return {
      start() {
        if (started) return; started = true;
        const r = hero.getBoundingClientRect();
        const cx = r.left + scrollX + r.width / 2, cy = r.top + scrollY + r.height / 2;
        agents.forEach((a, i) => place(a, cx + Math.cos(i) * 30, cy + Math.sin(i) * 30, 0));
        requestAnimationFrame(() => { show(true); hud.classList.add('show'); observe(); status(); });
      }
    };
  })();

  // Init
  setAccent(store.get('accent') && ACCENTS.includes(store.get('accent')) ? store.get('accent') : ACCENTS[0]);
  if (isHomeHero) window.__playIntro();
  else {                       // work pages: page hero types itself in, then the swarm starts
    if (hero) requestAnimationFrame(() => hero.classList.add('in'));
    setTimeout(() => swarm && swarm.start(), reduced ? 0 : 900);
  }
  onScroll();
})();
