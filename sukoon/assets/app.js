(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const IMG = n => `assets/img/${n}.webp`;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
  };

  let lang = store.get('sk-lang') === 'en' ? 'en' : 'ar';
  let filter = 'all', formType = 'buy';
  const t = () => UI[lang];
  const L = o => o[lang];
  const fmt = n => Math.round(n).toLocaleString('en-US');
  const wa = text => `https://wa.me/${CONFIG.sales}?text=${encodeURIComponent(text)}`;

  /* ---------------- i18n ---------------- */
  $$('[data-i18n]').forEach(el => { el.dataset.ar = el.innerHTML; });
  $$('[data-i18n-ph]').forEach(el => { el.dataset.arPh = el.placeholder; });
  $$('[data-i18n-alt]').forEach(el => { el.dataset.arAlt = el.alt; });

  function applyLang() {
    const html = document.documentElement;
    html.lang = lang; html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach(el => { el.innerHTML = lang === 'ar' ? el.dataset.ar : (EN[el.dataset.i18n] ?? el.dataset.ar); });
    $$('[data-i18n-ph]').forEach(el => { el.placeholder = lang === 'ar' ? el.dataset.arPh : EN[el.dataset.i18nPh]; });
    $$('[data-i18n-alt]').forEach(el => { el.alt = lang === 'ar' ? el.dataset.arAlt : EN[el.dataset.i18nAlt]; });
    $('#langBtn').textContent = lang === 'ar' ? 'EN' : 'ع';
    document.title = lang === 'ar' ? 'سكون المباني للتطوير العقاري | Sukoon Al Mabani' : 'Sukoon Al Mabani | Real Estate Development, Jeddah';
    renderAll();
  }

  /* ---------------- render ---------------- */
  function renderServices() {
    $('#svc').innerHTML = SERVICES.map(s => `
      <article class="sv">
        <div class="sv-img"><img src="${IMG(s.img)}" alt="" loading="lazy"></div>
        <div class="sv-b"><span class="sv-n">${s.n}</span><small>${L(s.s)}</small><h3>${L(s.t)}</h3><p>${L(s.d)}</p></div>
      </article>`).join('');
  }

  function renderChips() {
    $('#chips').innerHTML = FILTERS.map(f => `<button type="button" role="tab" class="chip${filter === f.id ? ' on' : ''}" data-f="${f.id}">${f.id === 'all' ? t().all : f[lang]}</button>`).join('');
  }

  function renderProjects() {
    const f = FILTERS.find(x => x.id === filter);
    const list = PROJECTS.filter(p => !f.match || f.match.includes(p.status));
    $('#projTrack').innerHTML = list.map((p, i) => {
      const media = p.img
        ? `<img src="${IMG(p.img)}" alt="${L(p.name)}" loading="lazy">`
        : `<div class="pc-blank"><span>${t().soon}</span></div>`;
      return `<article class="pc">
        <div class="pc-media">${media}<span class="badge s-${p.status}">${t().status[p.status]}</span><b class="pc-code">${p.code === 'shops' ? '' : p.code}</b></div>
        <div class="pc-body">
          <span class="pc-n">${String(i + 1).padStart(2, '0')}</span>
          <div><h3>${L(p.name)}</h3><p>${L(p.district)}</p></div>
          <div class="pc-act">
            <a class="btn btn-sm" href="${wa(t().projMsg(L(p.name)))}" target="_blank" rel="noopener">${t().interest}</a>
            ${p.link ? `<a class="btn btn-sm btn-ghost" href="${p.link}" target="_blank" rel="noopener">${t().photos}</a>` : ''}
          </div>
        </div>
      </article>`;
    }).join('');
    $('#projTotal').textContent = String(list.length).padStart(2, '0');
    $('#fProject').innerHTML = `<option value="">${t().anyProject}</option>` + PROJECTS.filter(p => p.status !== 'done').map(p => `<option>${L(p.name)}</option>`).join('');
    refreshSoon();
  }

  function renderInvest() {
    $('#rets').innerHTML = RETURNS.map(r => `
      <div class="ret"><b>${r.min}–${r.max}<em>%</em></b><i class="ret-bar" aria-hidden="true"><s style="--h:${r.max / 30}"></s></i><h3>${L(r.t)}</h3><p>${L(r.d)}</p></div>`).join('');
    calc();
  }

  function calc() {
    const v = +$('#amt').value;
    $('#amtV').textContent = fmt(v);
    $('#calcOut').innerHTML = RETURNS.map(r => `
      <div><span>${L(r.t)}</span><b>${fmt(v * r.min / 100)} – ${fmt(v * r.max / 100)}</b><small>${r === RETURNS[2] ? '' : t().perYear}</small></div>`).join('');
  }

  function renderGuarantees() {
    $('#guar').innerHTML = GUARANTEES.map(g => `
      <div class="gu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${g.icon}"/></svg>
      <b>${g.n}<small>${L(g.u)}</small></b><p>${L(g.t)}</p></div>`).join('');
  }

  function renderSteps() {
    $('#steps').innerHTML = STEPS.map((s, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><p>${L(s)}</p></li>`).join('');
  }

  function renderLeaders() {
    $('#quotes').innerHTML = QUOTES.map(q => `
      <figure class="qt"><blockquote>${L(q.q)}</blockquote><figcaption><b>${L(q.who)}</b><span>${L(q.role)}</span></figcaption></figure>`).join('');
    $('#values').innerHTML = VALUES.map(v => `<div class="val"><b>${L(v.t)}</b><span>${L(v.s)}</span></div>`).join('');
  }

  function renderForm() {
    $('#fBudget').innerHTML = t().budgets.map(b => `<option>${b}</option>`).join('');
    $$('#tabs [data-type]').forEach(b => b.classList.toggle('on', b.dataset.type === formType));
  }

  function renderAll() {
    renderServices(); renderChips(); renderProjects(); renderInvest(); renderGuarantees(); renderSteps(); renderLeaders(); renderForm();
    $('#yr').textContent = new Date().getFullYear();
  }

  let rt;
  function refreshSoon() { clearTimeout(rt); rt = setTimeout(() => window.ScrollTrigger && ScrollTrigger.refresh(), 120); }

  /* ---------------- interactions ---------------- */
  $('#langBtn').addEventListener('click', () => {
    lang = lang === 'ar' ? 'en' : 'ar';
    store.set('sk-lang', lang);
    // إعادة التحميل أنظف من إعادة بناء مشاهد التمرير (الاتجاه والتثبيت يتغيران)
    try { sessionStorage.setItem('sk-resume', JSON.stringify({ y: scrollY })); } catch { /* ignore */ }
    location.reload();
  });

  $('#chips').addEventListener('click', e => {
    const b = e.target.closest('[data-f]'); if (!b) return;
    filter = b.dataset.f; renderChips(); renderProjects();
  });
  $('#amt').addEventListener('input', calc);

  $('#tabs').addEventListener('click', e => {
    const b = e.target.closest('[data-type]'); if (!b) return;
    formType = b.dataset.type; renderForm();
  });
  $$('[data-shop]').forEach(a => a.addEventListener('click', () => { formType = 'shop'; renderForm(); }));

  $('#form').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const v = k => (f.get(k) || '').toString().trim();
    if (!v('name') || !v('phone')) { $('#formErr').textContent = t().err; return; }
    $('#formErr').textContent = '';
    const F = t().f;
    const body = [`*${t().head[formType]}*`, ...['name', 'phone', 'project', 'budget', 'msg'].filter(k => v(k)).map(k => `${F[k]}: ${v(k)}`)].join('\n');
    window.open(wa(body), '_blank');
    toast(t().sent);
  });

  const burger = $('#burger');
  burger.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', open);
  });
  $$('#nav a').forEach(a => a.addEventListener('click', () => { document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', false); }));

  let toastT;
  function toast(msg) {
    const el = $('#toast'); el.textContent = msg; el.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2400);
  }

  /* ---------------- smooth scroll ---------------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); const el = id.length > 1 && $(id);
    if (!el && id !== '#top') return;
    e.preventDefault();
    const target = id === '#top' ? 0 : el;
    lenis ? lenis.scrollTo(target, { offset: id === '#top' ? 0 : -70 }) : (id === '#top' ? scrollTo({ top: 0, behavior: 'smooth' }) : el.scrollIntoView({ behavior: 'smooth' }));
  }));

  /* ---------------- scroll animations ---------------- */
  gsap.registerPlugin(ScrollTrigger);

  function countUp(el) {
    const o = { v: 0 };
    gsap.to(o, { v: +el.dataset.to, duration: 1.6, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(o.v); } });
  }

  function buildScroll() {
    const rtl = lang === 'ar';

    /* 1) المخطط ← المبنى ← الليل */
    const rail = $$('#rail li');
    const stats = $$('#c4 .count').map(el => ({ el, to: +el.dataset.to, o: { v: 0 } }));
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '#scene', start: 'top top', end: 'bottom bottom', scrub: reduce ? true : 0.6,
        onUpdate(st) {
          const p = st.progress;
          const step = p < 0.36 ? 0 : p < 0.66 ? 1 : 2;
          rail.forEach((li, i) => { li.classList.toggle('on', i === step); li.classList.toggle('past', i < step); });
          $('#hdr').classList.toggle('solid', p > 0.03 || scrollY > innerHeight);
        },
      },
    });
    tl.to('#c1', { y: -80, opacity: 0, duration: 0.1 }, 0)
      .to('#scrollHint', { opacity: 0, duration: 0.04 }, 0)
      .fromTo('#lines', { clipPath: 'inset(62% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.26 }, 0.04)
      .fromTo('#c2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.06 }, 0.14)
      .to('#c2', { opacity: 0, y: -40, duration: 0.05 }, 0.33)
      .set('#scan', { opacity: 1 }, 0.38)
      .fromTo('#photo', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.22 }, 0.38)
      .fromTo('#scan', { top: '100%' }, { top: '0%', duration: 0.22 }, 0.38)
      .set('#scan', { opacity: 0 }, 0.6)
      .to('#lines', { opacity: 0, duration: 0.06 }, 0.58)
      .fromTo('#c3', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.06 }, 0.44)
      .to('#c3', { opacity: 0, y: -40, duration: 0.05 }, 0.6)
      .fromTo('#photo img', { scale: 1 }, { scale: 1.08, duration: 0.3 }, 0.6)
      .fromTo('#night', { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.68)
      .fromTo('#night img', { scale: 1.15 }, { scale: 1, duration: 0.32 }, 0.68)
      .fromTo('#shade', { opacity: 0.7 }, { opacity: 1, duration: 0.1 }, 0.76)
      .fromTo('#c4', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.08 }, 0.8);
    stats.forEach(s => tl.fromTo(s.o, { v: 0 }, { v: s.to, duration: 0.12, onUpdate: () => { s.el.textContent = fmt(s.o.v); } }, 0.8));
    tl.to({}, { duration: 0.08 });

    /* 2) العدادات */
    $$('#about .count').forEach(el => ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => countUp(el) }));

    /* 3) المشاريع أفقيًا */
    const track = $('#projTrack');
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    gsap.to(track, {
      x: () => (rtl ? 1 : -1) * dist(), ease: 'none',
      scrollTrigger: {
        trigger: '#projPin', pin: true, start: 'top top', end: () => '+=' + Math.max(dist(), 1), scrub: reduce ? true : 0.8,
        invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate(st) {
          const n = track.children.length;
          $('#projIdx').textContent = String(Math.min(n, Math.floor(st.progress * n) + 1)).padStart(2, '0');
          $('#projBar').style.transform = `scaleX(${st.progress})`;
        },
      },
    });

    /* 4) الرحلة: كل خطوة يمتلئ خطها بالتتابع */
    $$('#steps li').forEach((li, i) => ScrollTrigger.create({
      trigger: li, start: 'top 85%', once: true,
      onEnter: () => setTimeout(() => li.classList.add('on'), (i % 4) * 160),
    }));

    /* زر واتساب العائم يظهر بعد المشهد الافتتاحي */
    ScrollTrigger.create({ trigger: '#scene', start: 'top top', end: 'bottom 70%', onToggle: st => $('#waFloat').classList.toggle('off', st.isActive) });

    gsap.from('.ret-bar s', { scaleY: 0, duration: 1.4, ease: 'power3.out', stagger: 0.15, scrollTrigger: { trigger: '#rets', start: 'top 75%' } });

    /* حركة عمق خفيفة للصور */
    gsap.fromTo('.about-img img', { yPercent: -6, scale: 1.14 }, { yPercent: 6, scale: 1.14, ease: 'none', scrollTrigger: { trigger: '.about-img', start: 'top bottom', end: 'bottom top', scrub: true } });

    /* 5) ظهور تدريجي */
    $$('.sec-head, .about-grid > *, .sv, .ret, .calc, .gu, .steps li, .qt, .val, .pt-wall, .contact-grid > *, .shops-in').forEach(el =>
      gsap.from(el, { opacity: 0, y: 36, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }));
    gsap.fromTo('.shops > img', { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.shops', start: 'top bottom', end: 'bottom top', scrub: true } });

    ScrollTrigger.refresh();
  }

  /* ---------------- boot ---------------- */
  let resume = null;
  try { resume = JSON.parse(sessionStorage.getItem('sk-resume')); sessionStorage.removeItem('sk-resume'); } catch { /* ignore */ }
  if (resume) history.scrollRestoration = 'manual';
  applyLang();
  let booted = false;
  const boot = () => {
    if (booted) return;
    booted = true;
    buildScroll();
    if (resume) lenis ? lenis.scrollTo(resume.y, { immediate: true }) : scrollTo(0, resume.y);
    $('#loader').classList.add('done');
  };
  if (document.readyState === 'complete') boot();
  else { addEventListener('load', boot, { once: true }); setTimeout(boot, 3500); }
})();
