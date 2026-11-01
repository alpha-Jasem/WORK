(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const IMG = n => `assets/img/${n}.webp`;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
  };

  let lang = store.get('rga-lang') === 'en' ? 'en' : 'ar';
  let filter = 'all', query = '', formType = 'rfq';
  const cart = new Set();
  const t = () => UI[lang];
  const L = o => o[lang];
  // يحمي الأسماء اللاتينية بين قوسين من انقلاب الاتجاه داخل النص العربي
  const bd = s => s.replace(/\(([^)]*[A-Za-z][^)]*)\)/g, '<bdi>($1)</bdi>');

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
    document.title = lang === 'ar' ? 'مجموعة جذور العربية | Roots Group Arabia' : 'Roots Group Arabia | Since 1981';
    renderAll();
  }

  /* ---------------- render ---------------- */
  function renderDivisions() {
    $('#divPanels').innerHTML = DIVISIONS.map((d, i) => `
      <article class="dp${i === 0 ? ' open' : ''}" tabindex="0">
        <img src="${IMG(d.img)}" alt="" loading="lazy">
        <div class="dp-in">
          <span class="dp-num">${d.num}</span>
          <h3>${L(d.name)}</h3>
          <div class="dp-more">
            <p>${L(d.desc)}</p>
            <p class="dp-cos-h">${t().divMore}</p>
            <ul>${d.cos.map(c => `<li>${c}</li>`).join('')}</ul>
          </div>
        </div>
      </article>`).join('');
    $$('.dp').forEach(p => {
      const open = () => { $$('.dp').forEach(x => x.classList.toggle('open', x === p)); };
      p.addEventListener('mouseenter', open); p.addEventListener('focus', open); p.addEventListener('click', open);
    });
  }

  function renderProjects() {
    $('#projTrack').innerHTML = PROJECTS.map((p, i) => {
      const n = String(i + 1).padStart(2, '0');
      const media = p.img
        ? `<div class="pc-media"><img src="${IMG(p.img[0])}" alt="${L(p.name)}" loading="lazy">${p.img.length > 1 ? `<div class="pc-thumbs">${p.img.slice(1).map(s => `<img src="${IMG(s)}" alt="" loading="lazy">`).join('')}</div>` : ''}</div>`
        : `<div class="pc-media pc-blank"><svg viewBox="0 0 400 260" aria-hidden="true"><defs><pattern id="g${i}" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="currentColor" stroke-width=".5"/></pattern></defs><rect width="400" height="260" fill="url(#g${i})"/><path d="M40 210h320M70 210V120l60-40 60 40v90M210 210V90l50-30 50 30v120M100 150h60M240 120h40M240 150h40" fill="none" stroke="currentColor" stroke-width="1.4"/></svg><b>${L(p.loc)}</b><span>${t().proj.soon}</span></div>`;
      return `<article class="pc">
        ${media}
        <div class="pc-body">
          <span class="pc-n">${n}</span>
          <h3>${L(p.name)}</h3>
          <dl><dt>${t().proj.location}</dt><dd>${L(p.loc)}</dd><dt>${t().proj.role}</dt><dd>${L(p.role)}</dd></dl>
        </div>
      </article>`;
    }).join('');
    $('#projTotal').textContent = String(PROJECTS.length).padStart(2, '0');
  }

  function renderTimeline() {
    $$('.tl-item', $('#timeline')).forEach(e => e.remove());
    $('#timeline').insertAdjacentHTML('beforeend', TIMELINE.map((e, i) => `
      <div class="tl-item ${i % 2 ? 'r' : 'l'}">
        <span class="tl-dot"></span>
        <div class="tl-card"><b class="tl-y">${e.y}</b><h3>${L(e.t)}</h3><p>${L(e.d)}</p></div>
      </div>`).join(''));
  }

  function renderChips() {
    const items = [{ id: 'all', ar: t().all, en: t().all }, ...CATS];
    $('#chips').innerHTML = items.map(c => `<button type="button" role="tab" class="chip${filter === c.id ? ' on' : ''}" data-f="${c.id}">${c[lang]}</button>`).join('');
  }

  function renderGrid() {
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.map((p, i) => ({ ...p, i })).filter(p =>
      (filter === 'all' || p.cat === filter) &&
      (!q || [p.name.ar, p.name.en, p.co, CATS.find(c => c.id === p.cat)[lang]].join(' ').toLowerCase().includes(q)));
    $('#catCount').textContent = list.length ? t().results(list.length) : t().none;
    $('#grid').innerHTML = list.map(p => {
      const cat = CATS.find(c => c.id === p.cat);
      const on = cart.has(p.i);
      return `<article class="pr">
        <div class="pr-img"><img src="${IMG(p.img)}" alt="" loading="lazy"><span class="pr-cat">${cat[lang]}</span></div>
        <div class="pr-b"><small>${p.co}</small><h3>${bd(L(p.name))}</h3>
        <button type="button" class="pr-add${on ? ' on' : ''}" data-i="${p.i}">${on ? t().added : t().add}</button></div>
      </article>`;
    }).join('');
    refreshSoon();
  }

  // تغيير طول الصفحة (فلترة، سلة) يحرّك مواضع ScrollTrigger، فنعيد حسابها
  let rt;
  function refreshSoon() { clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 120); }

  function renderBrands() {
    const row = BRANDS.map(b => `<span class="mq-i"><img src="assets/img/brands/${b}.png" alt="" loading="lazy"></span>`).join('');
    $('#mq').innerHTML = row + row;
    $('#cos').innerHTML = COMPANIES.map(c => `<span class="co"><img src="assets/img/brands/${c.logo}.png" alt="${c.name}" loading="lazy"></span>`).join('');
  }

  function renderForm() {
    $('#fDivision').innerHTML = `<option value="">${t().anyDiv}</option>` + DIVISIONS.map(d => `<option>${L(d.name)}</option>`).join('');
    $$('#tabs [data-type]').forEach(b => b.classList.toggle('on', b.dataset.type === formType));
    $$('.only-rfq').forEach(r => { r.hidden = formType !== 'rfq'; });
    $('#formNote').textContent = t().note[formType];
    $('#route').textContent = t().routeTo(CONFIG.routes[formType].email);
    renderCart();
  }

  function renderCart() {
    const box = $('#cart');
    box.hidden = formType !== 'rfq' || !cart.size;
    $('#cartN').textContent = cart.size;
    $('#cartList').innerHTML = [...cart].map(i => `<li><span>${bd(L(PRODUCTS[i].name))}</span> <small>${PRODUCTS[i].co}</small><button type="button" data-rm="${i}" aria-label="${t().remove}">×</button></li>`).join('');
    refreshSoon();
  }

  function renderAll() {
    renderDivisions(); renderProjects(); renderTimeline(); renderChips(); renderGrid(); renderBrands(); renderForm();
    $('#waFloat').href = `https://wa.me/${CONFIG.whatsapp}`;
    $('#yr').textContent = new Date().getFullYear();
  }

  /* ---------------- interactions ---------------- */
  $('#langBtn').addEventListener('click', () => {
    lang = lang === 'ar' ? 'en' : 'ar';
    store.set('rga-lang', lang);
    // إعادة التحميل أنظف من إعادة بناء مشاهد التمرير (الاتجاه والتثبيت يتغيران)
    try { sessionStorage.setItem('rga-resume', JSON.stringify({ y: scrollY, cart: [...cart] })); } catch { /* ignore */ }
    location.reload();
  });

  $('#chips').addEventListener('click', e => {
    const b = e.target.closest('[data-f]'); if (!b) return;
    filter = b.dataset.f; renderChips(); renderGrid();
  });
  $('#search').addEventListener('input', e => { query = e.target.value; renderGrid(); });

  $('#grid').addEventListener('click', e => {
    const b = e.target.closest('.pr-add'); if (!b) return;
    const i = +b.dataset.i;
    cart.has(i) ? cart.delete(i) : cart.add(i);
    b.classList.toggle('on', cart.has(i));
    b.textContent = cart.has(i) ? t().added : t().add;
    if (formType !== 'rfq') { formType = 'rfq'; renderForm(); } else renderCart();
    if (cart.has(i)) toast(`${L(PRODUCTS[i].name)} ✓`);
  });
  $('#cartList').addEventListener('click', e => {
    const b = e.target.closest('[data-rm]'); if (!b) return;
    cart.delete(+b.dataset.rm); renderCart(); renderGrid();
  });

  $('#tabs').addEventListener('click', e => {
    const b = e.target.closest('[data-type]'); if (!b) return;
    formType = b.dataset.type; renderForm();
  });

  $('#rfq').addEventListener('submit', e => {
    e.preventDefault();
    const via = e.submitter?.dataset.via || 'wa';
    const f = new FormData(e.target);
    const v = k => (f.get(k) || '').toString().trim();
    if (!v('name') || !v('phone')) { $('#formErr').textContent = t().err; return; }
    $('#formErr').textContent = '';
    const F = t().f;
    const keys = formType === 'rfq' ? ['name', 'company', 'phone', 'email', 'project', 'city', 'division', 'date'] : ['name', 'company', 'phone', 'email'];
    const lines = [`*${t().msgHead[formType]}*`, ...keys.filter(k => v(k)).map(k => `${F[k]}: ${v(k)}`)];
    if (formType === 'rfq' && cart.size) lines.push(`${F.items}:`, ...[...cart].map(i => `- ${L(PRODUCTS[i].name)} (${PRODUCTS[i].co})`));
    if (v('msg')) lines.push(`${F.msg}: ${v('msg')}`);
    const body = lines.join('\n');
    const r = CONFIG.routes[formType];
    const url = via === 'wa'
      ? `https://wa.me/${r.wa}?text=${encodeURIComponent(body)}`
      : `mailto:${r.email}?subject=${encodeURIComponent(t().msgHead[formType])}&body=${encodeURIComponent(body.replace(/\*/g, ''))}`;
    window.open(url, via === 'wa' ? '_blank' : '_self');
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
    clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2200);
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
  const fmt = n => Math.round(n).toLocaleString('en-US');

  function countUp(el, dur = 1.6) {
    const to = +el.dataset.to, o = { v: 0 };
    return gsap.to(o, { v: to, duration: dur, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(o.v); } });
  }

  function buildScroll() {
    const rtl = lang === 'ar';

    /* 1) الطيران عبر السحب */
    const megaEl = $('#revealCopy .count'), mega = { v: 0 };
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '#flight', start: 'top top', end: 'bottom bottom', scrub: reduce ? true : 0.6,
        onUpdate(st) {
          const p = st.progress;
          Clouds.set(Math.min(1, p / 0.62), p < 0.58 ? 1 : Math.max(0, 1 - (p - 0.58) / 0.12));
          $('#hdr').classList.toggle('solid', p > 0.05 || scrollY > innerHeight);
        },
        onToggle(st) { st.isActive ? Clouds.start() : Clouds.stop(); },
      },
    });
    tl.to('#heroCopy', { y: -90, opacity: 0, duration: 0.16 }, 0)
      .to('#scrollHint', { opacity: 0, duration: 0.05 }, 0)
      .to('#sun', { yPercent: 60, scale: 1.4, opacity: 0.25, duration: 0.45 }, 0)
      .to('#sky', { '--glow': 1, duration: 0.45 }, 0)
      .to('#fog', { opacity: 1, duration: 0.17, ease: 'power1.in' }, 0.4)
      .set('#reveal', { opacity: 1 }, 0.57)
      .fromTo('#reveal img', { scale: 1.4 }, { scale: 1.04, duration: 0.43 }, 0.57)
      .to('#fog', { opacity: 0, duration: 0.14, ease: 'power1.out' }, 0.59)
      .fromTo('#revealCopy', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.74)
      .fromTo(mega, { v: 0 }, { v: 18, duration: 0.14, onUpdate: () => { megaEl.textContent = fmt(mega.v); } }, 0.74)
      .to({}, { duration: 0.12 });
    Clouds.start();

    /* 2) العدادات */
    $$('#numbers .count').forEach(el => {
      el.textContent = '0';
      ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => countUp(el) });
    });

    /* 3) المشاريع أفقيًا */
    const track = $('#projTrack');
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    const h = gsap.to(track, {
      x: () => (rtl ? 1 : -1) * dist(), ease: 'none',
      scrollTrigger: {
        trigger: '#projPin', pin: true, start: 'top top', end: () => '+=' + dist(), scrub: reduce ? true : 0.8,
        invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate(st) {
          const i = Math.min(PROJECTS.length, Math.floor(st.progress * PROJECTS.length) + 1);
          $('#projIdx').textContent = String(i).padStart(2, '0');
          $('#projBar').style.transform = `scaleX(${st.progress})`;
        },
      },
    });
    $$('.pc-media > img', track).forEach(img => {
      gsap.fromTo(img, { xPercent: rtl ? 8 : -8 }, {
        xPercent: rtl ? -8 : 8, ease: 'none',
        scrollTrigger: { trigger: img.closest('.pc'), containerAnimation: h, start: 'left right', end: 'right left', scrub: true },
      });
    });

    /* 4) الخط الزمني */
    gsap.fromTo('#tlFill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '#timeline', start: 'top 70%', end: 'bottom 70%', scrub: true } });
    $$('.tl-item').forEach(el => gsap.from(el, { opacity: 0, y: 40, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } }));

    /* 5) ظهور العناوين والبطاقات */
    $$('.sec-head, .stat, .dp, .contact-info, .form').forEach(el =>
      gsap.from(el, { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));

    ScrollTrigger.refresh();
  }

  /* ---------------- boot ---------------- */
  let resume = null;
  try { resume = JSON.parse(sessionStorage.getItem('rga-resume')); sessionStorage.removeItem('rga-resume'); } catch { /* ignore */ }
  if (resume) { history.scrollRestoration = 'manual'; (resume.cart || []).forEach(i => cart.add(i)); }
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
