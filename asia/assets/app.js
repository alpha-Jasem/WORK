(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
  };

  let lang = store.get('fa-lang') === 'en' ? 'en' : 'ar';
  let who = null, schedBranch = 'faisaliah', schedSport = 'all';
  const t = () => UI[lang];
  const tx = o => o[lang];
  const fmt = n => Math.round(n).toLocaleString('en-US');
  const wa = text => `https://wa.me/${CONFIG.wa}?text=${encodeURIComponent(text)}`;
  const sport = id => SPORTS.find(s => s.id === id);
  const branch = id => BRANCHES.find(b => b.id === id);

  /* ---------------- i18n ---------------- */
  $$('[data-i18n]').forEach(el => { el.dataset.ar = el.innerHTML; });
  $$('[data-i18n-ph]').forEach(el => { el.dataset.arPh = el.placeholder; });
  $$('[data-i18n-alt]').forEach(el => { el.dataset.arAlt = el.alt; });
  $$('[data-old]').forEach(a => { a.href = OLD + a.dataset.old; });

  function applyLang() {
    const html = document.documentElement;
    html.lang = lang; html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach(el => { el.innerHTML = lang === 'ar' ? el.dataset.ar : (EN[el.dataset.i18n] ?? el.dataset.ar); });
    $$('[data-i18n-ph]').forEach(el => { el.placeholder = lang === 'ar' ? el.dataset.arPh : EN[el.dataset.i18nPh]; });
    $$('[data-i18n-alt]').forEach(el => { el.alt = lang === 'ar' ? el.dataset.arAlt : EN[el.dataset.i18nAlt]; });
    $('#langBtn').textContent = lang === 'ar' ? 'EN' : 'ع';
    document.title = lang === 'ar' ? 'نادي فنون آسيا للدفاع عن النفس | جدة' : 'Asia Martial Arts Defence | Jeddah';
    renderAll();
  }

  /* ---------------- render ---------------- */
  function renderWho() {
    $('#who').innerHTML = [{ id: null }, ...WHO]
      .map(w => `<button type="button" role="tab" class="${who === w.id ? 'on' : ''}" data-who="${w.id ?? ''}">${w.id ? tx(w) : t().all}</button>`).join('');
  }

  function renderBranches() {
    $('#branchList').innerHTML = BRANCHES.map(b => {
      const fit = who && b.who.includes(who);
      return `<article class="br${who ? (fit ? ' fit' : ' dim') : ''}">
        <span class="br-tag">${lang === 'ar' ? 'يناسبك' : EN['finder.fit']}</span>
        <h3>${tx(b.name)}</h3>
        <p class="who-line">${tx(b.aud)}</p>
        <span class="coach">${tx(b.coach)}</span>
        <ul>${b.sports.map(s => `<li>${tx(sport(s).name)}</li>`).join('')}</ul>
        ${b.extra ? `<p class="extra">${tx(b.extra)}</p>` : ''}
        <address>${tx(b.addr)}</address>
        <span class="br-hours">${tx(b.hours)}</span>
        <div class="br-act">
          ${b.map ? `<a class="btn btn-sm btn-ghost" href="${b.map}" target="_blank" rel="noopener">${t().map}</a>` : ''}
          <a class="btn btn-sm" href="${wa(t().branchMsg(tx(b.name)))}" target="_blank" rel="noopener">${t().ask}</a>
        </div>
      </article>`;
    }).join('');
  }

  function renderSports() {
    $('#spTrack').innerHTML = SPORTS.map((s, i) => `
      <article class="sp" style="--c:${s.c}">
        <i class="stripe"></i>
        <span class="sp-big" aria-hidden="true">${s.big}</span>
        <div class="sp-top"><span class="sp-n">${String(i + 1).padStart(2, '0')}</span><span class="seal">${tx(s.origin)}</span></div>
        <h3>${tx(s.name)}</h3>
        <p>${tx(s.d)}</p>
        <div class="sp-br">${s.br.map(b => `<span>${tx(branch(b).name)}</span>`).join('')}</div>
      </article>`).join('');
    $('#spTotal').textContent = String(SPORTS.length).padStart(2, '0');
  }

  function renderPrices() {
    $('#plans').innerHTML = PLANS.map(p => `
      <div class="pc${p.hot ? ' hot' : ''}">
        ${p.hot ? `<span class="best">${t().best}</span>` : ''}
        <h3>${tx(p.t)}</h3>
        <small>${t().oneSport}</small>
        <div class="amt">${fmt(p.n)}<em>${t().sar}</em></div>
        <ul><li>${t().sessions(p.s)}</li><li>${t().stop(p.stop)}</li></ul>
        <a class="btn btn-sm${p.hot ? '' : ' btn-ghost'}" href="#register" data-plan="${p.id}">${t().pick}</a>
      </div>`).join('');
    $('#extras').innerHTML = EXTRAS.map(e => `
      <div class="pc"><h3>${tx(e.t)}</h3><div class="amt">${fmt(e.n)}<em>${tx(e.u)}</em></div><p>${tx(e.d)}</p></div>`).join('');
  }

  function renderSchedule() {
    $('#schedTabs').innerHTML = BRANCHES.map(b => `<button type="button" role="tab" class="${schedBranch === b.id ? 'on' : ''}" data-sb="${b.id}">${tx(b.name)}</button>`).join('');
    const rows = SCHEDULE[schedBranch];
    const ids = [...new Set(rows.map(r => r[2]))];
    if (schedBranch === 'faisaliah' && !ids.includes('judo')) ids.push('judo');
    $('#schedChips').innerHTML = ['all', ...ids].map(id => `<button type="button" class="${schedSport === id ? 'on' : ''}" data-ss="${id}">${id === 'all' ? (lang === 'ar' ? 'كل الرياضات' : EN['sched.all']) : tx(sport(id).name)}</button>`).join('');
    const list = rows.filter(r => schedSport === 'all' || r[2] === schedSport);
    const table = d => {
      const rs = list.filter(r => r[0] === d);
      if (!rs.length) return '';
      return `<div><h4>${t().days[d]}</h4><div class="tbl-wrap"><table>
        <thead><tr><th>${lang === 'ar' ? 'الوقت' : EN['th.time']}</th><th>${lang === 'ar' ? 'الرياضة' : EN['th.sport']}</th><th>${lang === 'ar' ? 'المجموعة' : EN['th.group']}</th></tr></thead>
        <tbody>${rs.map(r => `<tr><td class="t">${r[1]}</td><td><span class="sp-dot" style="--c:${sport(r[2]).c}"></span><b>${tx(sport(r[2]).name)}</b></td><td>${tx(r[3])}</td></tr>`).join('')}</tbody>
      </table></div></div>`;
    };
    const judo = schedBranch === 'faisaliah' && (schedSport === 'all' || schedSport === 'judo') ? `<p class="empty" style="margin-top:16px">${t().judoNote}</p>` : '';
    const body = table('a') + table('b');
    $('#schedOut').innerHTML = (body ? `<div class="days">${body}</div>` : '') + judo;
  }

  function renderBelts() {
    $('#rail').innerHTML = BELTS.map(b => `<li style="--c:${b.c}"></li>`).join('');
    $('#path').innerHTML = BELTS.map((b, i) => `<div class="step" style="--c:${b.c}"><em>${String(i + 1).padStart(2, '0')}</em><i></i><b>${tx(b)}</b>${b.v ? `<span>${tx(b.v)}</span>` : ''}</div>`).join('');
  }

  function renderMembers() {
    $('#svc').innerHTML = SERVICES.map(s => {
      const href = s.url === 'wa:transport' ? wa(t().transport) : s.url;
      const ext = href.startsWith('#') ? '' : ' target="_blank" rel="noopener"';
      return `<a href="${href}"${ext}><b>${tx(s.t)}</b><span>${tx(s.d)}</span></a>`;
    }).join('');
    $('#rules').innerHTML = RULES.map(r => `<li>${tx(r)}</li>`).join('');
    $('#faqList').innerHTML = FAQ.map(([q, a]) => `<details><summary>${tx(q)}</summary><p>${tx(a)}</p></details>`).join('');
    $('#socials').innerHTML = SOCIAL.map(s => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.t}"><i class="ico" style="--i:url(img/ic/${s.ic}.svg)"></i></a>`).join('');
  }

  function renderForm() {
    const opt = (v, l) => `<option value="${v}">${l}</option>`;
    const keep = id => $(id).value;
    const w = keep('#fWho'), b = keep('#fBranch'), s = keep('#fSport'), p = keep('#fPlan');
    $('#fWho').innerHTML = opt('', t().choose) + WHO.map(x => opt(x.id, tx(x))).join('');
    $('#fBranch').innerHTML = opt('', t().choose) + BRANCHES.map(x => opt(x.id, tx(x.name))).join('');
    const bs = b ? branch(b).sports : SPORTS.map(x => x.id);
    $('#fSport').innerHTML = opt('', t().choose) + bs.map(id => opt(id, tx(sport(id).name))).join('');
    $('#fPlan').innerHTML = opt('', t().choose) + PLANS.map(x => opt(x.id, `${tx(x.t)} — ${fmt(x.n)} ${t().sar}`)).join('');
    $('#fWho').value = w; $('#fBranch').value = b; $('#fSport').value = bs.includes(s) ? s : ''; $('#fPlan').value = p;
  }

  function renderAll() {
    renderWho(); renderBranches(); renderSports(); renderPrices(); renderSchedule(); renderBelts(); renderMembers(); renderForm();
    $('#yr').textContent = new Date().getFullYear();
  }

  let rt;
  function refreshSoon() { clearTimeout(rt); rt = setTimeout(() => window.ScrollTrigger && ScrollTrigger.refresh(), 120); }

  /* ---------------- interactions ---------------- */
  $('#langBtn').addEventListener('click', () => {
    lang = lang === 'ar' ? 'en' : 'ar';
    store.set('fa-lang', lang);
    // إعادة التحميل أنظف من إعادة بناء مشاهد التمرير (الاتجاه والتثبيت يتغيران)
    try { sessionStorage.setItem('fa-resume', JSON.stringify({ y: scrollY })); } catch { /* ignore */ }
    location.reload();
  });

  $('#who').addEventListener('click', e => {
    const b = e.target.closest('[data-who]'); if (!b) return;
    who = b.dataset.who || null;
    renderWho(); renderBranches();
    if (who) {
      const f = BRANCHES.find(x => x.who.includes(who));
      $('#fWho').value = who;
      if (f && !$('#fBranch').value) { $('#fBranch').value = f.id; renderForm(); }
    }
  });

  $('#schedTabs').addEventListener('click', e => {
    const b = e.target.closest('[data-sb]'); if (!b) return;
    schedBranch = b.dataset.sb;
    schedSport = SCHEDULE[schedBranch].length > 20 ? branch(schedBranch).sports[0] : 'all';
    renderSchedule(); refreshSoon();
  });
  $('#schedChips').addEventListener('click', e => {
    const b = e.target.closest('[data-ss]'); if (!b) return;
    schedSport = b.dataset.ss; renderSchedule(); refreshSoon();
  });

  $('#plans').addEventListener('click', e => {
    const a = e.target.closest('[data-plan]'); if (a) $('#fPlan').value = a.dataset.plan;
  });
  $('#fBranch').addEventListener('change', renderForm);

  $('#form').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const v = k => (f.get(k) || '').toString().trim();
    if (!v('name') || !v('phone')) { $('#formErr').textContent = t().err; return; }
    $('#formErr').textContent = '';
    const label = { who: id => tx(WHO.find(x => x.id === id)), branch: id => tx(branch(id).name), sport: id => tx(sport(id).name), plan: id => { const p = PLANS.find(x => x.id === id); return `${tx(p.t)} — ${fmt(p.n)} ${t().sar}`; } };
    const F = t().f;
    const body = [`*${t().head}*`, ...['name', 'phone', 'who', 'age', 'branch', 'sport', 'plan', 'msg'].filter(k => v(k)).map(k => `${F[k]}: ${label[k] ? label[k](v(k)) : v(k)}`)].join('\n');
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
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const id = a.getAttribute('href'); const el = id.length > 1 && $(id);
    if (!el && id !== '#top') return;
    e.preventDefault();
    const target = id === '#top' ? 0 : el;
    lenis ? lenis.scrollTo(target, { offset: id === '#top' ? 0 : -70 }) : (id === '#top' ? scrollTo({ top: 0, behavior: 'smooth' }) : el.scrollIntoView({ behavior: 'smooth' }));
  });

  /* ---------------- scroll animations ---------------- */
  gsap.registerPlugin(ScrollTrigger);

  function countUp(el) {
    const o = { v: 0 };
    gsap.to(o, { v: +el.dataset.to, duration: 1.4, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(o.v); } });
  }

  function buildScroll() {
    const rtl = lang === 'ar';

    /* 1) الحزام: أبيض ← أصفر ← ... ← أسود */
    const belt = $('#belt'), rail = $$('#rail li');
    const span = { from: 0.16, to: 0.8 };
    const n = BELTS.length;
    let shown = -1;
    const showBelt = i => {
      if (i === shown) return;
      shown = i;
      const b = BELTS[i];
      $('#beltTxt').textContent = tx(b);
      rail.forEach((li, k) => { li.classList.toggle('on', k === i); li.classList.toggle('past', k < i); });
      gsap.to(belt, { color: b.c, duration: 0.5, overwrite: 'auto' });
      gsap.to('#knot', { color: b.c, duration: 0.5, overwrite: 'auto' });
      const v = b.v ? b : null;
      if (v) {
        $('#vWord').textContent = tx(v.v); $('#vDesc').textContent = tx(v.d);
        gsap.fromTo('#virtue', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, overwrite: 'auto' });
      } else gsap.to('#virtue', { opacity: 0, duration: 0.3, overwrite: 'auto' });
      // the black belt glows against the dark stage
      belt.querySelector('.band').style.outline = i === n - 1 ? '1px solid rgba(255,255,255,.18)' : '';
    };
    showBelt(0);

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '#scene', start: 'top top', end: 'bottom bottom', scrub: reduce ? true : 0.6,
        onUpdate(st) {
          const p = st.progress;
          const i = Math.max(0, Math.min(n - 1, Math.floor((p - span.from) / ((span.to - span.from) / n))));
          showBelt(p < span.from ? 0 : i);
          if (p > 0.84) gsap.to('#virtue', { opacity: 0, duration: 0.2, overwrite: 'auto' });
          $('#hdr').classList.toggle('solid', p > 0.03 || scrollY > innerHeight);
        },
      },
    });
    tl.to('#hint', { opacity: 0, duration: 0.03 }, 0)
      .to('#c1', { y: -60, opacity: 0, duration: 0.08 }, 0.02)
      .to('#heroLogo', { scale: 0.35, opacity: 0, duration: 0.1 }, 0.04)
      .to('#enso', { scale: 1.6, opacity: 0, rotate: 40, duration: 0.12 }, 0.04)
      .fromTo('#belt', { scaleX: 0 }, { scaleX: 1, duration: 0.08, ease: 'power2.out' }, 0.1)
      .fromTo('#knot', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.05, ease: 'back.out(2)' }, 0.15)
      .fromTo('#beltName', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.04 }, 0.16)
      .fromTo('#rail', { opacity: 0 }, { opacity: 1, duration: 0.04 }, 0.16)
      .to('#beltName', { opacity: 0, duration: 0.04 }, 0.84)
      .to('#rail', { opacity: 0, duration: 0.04 }, 0.84)
      .to('#belt', { y: () => innerHeight * 0.3, scaleX: 0.55, duration: 0.1, ease: 'power2.inOut' }, 0.83)
      .fromTo('#sun', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1.6, duration: 0.12, ease: 'power2.out' }, 0.82)
      .fromTo('#cFinal', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.06 }, 0.9)
      .to({}, { duration: 0.04 });

    /* 2) العدادات */
    $$('.facts .count').forEach(el => ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => countUp(el) }));

    /* 3) الرياضات أفقياً */
    const track = $('#spTrack');
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    gsap.to(track, {
      x: () => (rtl ? 1 : -1) * dist(), ease: 'none',
      scrollTrigger: {
        trigger: '#spPin', pin: true, start: 'top top', end: () => '+=' + Math.max(dist(), 1), scrub: reduce ? true : 0.8,
        invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate(st) {
          const k = track.children.length;
          $('#spIdx').textContent = String(Math.min(k, Math.floor(st.progress * k) + 1)).padStart(2, '0');
          $('#spBar').style.transform = `scaleX(${st.progress})`;
        },
      },
    });

    /* 4) مسار الأحزمة يمتلئ بالتتابع */
    gsap.from('.step i', { scaleX: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: '#path', start: 'top 85%' } });

    /* زر واتساب يظهر بعد المشهد */
    ScrollTrigger.create({ trigger: '#scene', start: 'top top', end: 'bottom 70%', onToggle: st => $('#waFloat').classList.toggle('off', st.isActive) });

    /* 5) ظهور تدريجي */
    $$('.sec-head, .about-grid > div > *, .pillar, .br, .pc, .card, .svc a, .faq details, .reg-grid > *').forEach(el =>
      gsap.from(el, { opacity: 0, y: 32, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' } }));

    ScrollTrigger.refresh();
  }

  /* رسم دائرة الإنسو عند التحميل */
  function drawEnso() {
    $$('#enso path').forEach((p, i) => {
      const L = p.getTotalLength();
      p.style.strokeDasharray = L; p.style.strokeDashoffset = L;
      gsap.to(p, { strokeDashoffset: 0, duration: reduce ? 0 : 1.6, delay: 0.2 + i * 0.25, ease: 'power2.inOut' });
    });
    gsap.from('#heroLogo', { scale: 0.85, opacity: 0, duration: reduce ? 0 : 1.2, delay: 0.3, ease: 'power3.out' });
    gsap.from('#c1 > *', { y: 30, opacity: 0, duration: reduce ? 0 : 1, delay: 0.6, stagger: 0.15, ease: 'power3.out' });
  }

  /* ---------------- boot ---------------- */
  let resume = null;
  try { resume = JSON.parse(sessionStorage.getItem('fa-resume')); sessionStorage.removeItem('fa-resume'); } catch { /* ignore */ }
  if (resume) history.scrollRestoration = 'manual';
  applyLang();
  let booted = false;
  const boot = () => {
    if (booted) return;
    booted = true;
    buildScroll();
    if (resume) lenis ? lenis.scrollTo(resume.y, { immediate: true }) : scrollTo(0, resume.y);
    else drawEnso();
    $('#loader').classList.add('done');
  };
  if (document.readyState === 'complete') boot();
  else { addEventListener('load', boot, { once: true }); setTimeout(boot, 3500); }
})();
