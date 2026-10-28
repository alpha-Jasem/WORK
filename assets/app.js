// بيانات تجريبية — استبدلها ببيانات الشركة الفعلية
const WA = "966500000000";
const UPDATED = "21 أكتوبر 2026";
const STATUS = { selling: "بدأ البيع", new: "إطلاق جديد", soldout: "مكتمل البيع" };

// blds: عدد المباني · avail: الوحدات المتاحة حسب عدد الغرف {غرف: {n: العدد, from: أقل سعر}}
const PROJECTS = [
  { id: "ark-residence", name: "آرك ريزيدنس", district: "السلامة", status: "selling", blds: 1, floors: 7, apts: 44, annex: 2,
    avail: { 2: { n: 10, from: 445000 }, 3: { n: 7, from: 583000 } } },
  { id: "ark-view", name: "آرك فيو", district: "الروضة", status: "new", blds: 1, floors: 5, apts: 8, annex: 2,
    avail: { 3: { n: 6, from: 1350000 }, 4: { n: 4, from: 1620000 } } },
  { id: "almasa", name: "مجمّع الماسة", district: "النهضة", status: "selling", blds: 4, floors: 6, apts: 55, annex: 6,
    avail: { 4: { n: 1, from: 1030000 } } },
  { id: "ark-towers", name: "آرك تاورز", district: "درب الحرمين", status: "new", blds: 4, floors: 9, apts: 0, annex: 0, avail: {} },
  { id: "ark-12", name: "آرك 12", district: "النسيم", status: "soldout", blds: 1, floors: 5, apts: 20, annex: 0, avail: {} },
  { id: "ark-8", name: "آرك 8", district: "المنار", status: "soldout", blds: 1, floors: 4, apts: 16, annex: 0, avail: {} },
];
const NEWS = [
  { d: "سبتمبر 2026", t: "إطلاق مشروع آرك فيو في حي الروضة", p: "نص تجريبي يُستبدل بخبر الشركة الفعلي." },
  { d: "أغسطس 2026", t: "تسليم وحدات آرك 12 لملّاكها في حي النسيم", p: "نص تجريبي يُستبدل بخبر الشركة الفعلي." },
  { d: "يوليو 2026", t: "بدء أعمال الإنشاء في مجمّع الماسة بحي النهضة", p: "نص تجريبي يُستبدل بخبر الشركة الفعلي." },
];
const PARTNERS = ["شريك التمويل", "المكتب القانوني", "المقاول الرئيسي", "مكتب التصميم المعماري", "مورّد المصاعد", "مورّد الأنظمة الكهربائية", "إدارة المرافق"];

(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = n => n.toLocaleString("en-US");
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const wa = text => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
const units = p => Object.values(p.avail).reduce((s, r) => s + r.n, 0);
const minPrice = p => { const v = Object.values(p.avail).map(r => r.from); return v.length ? Math.min(...v) : 0; };
const short = n => n >= 1e6 ? `${fmt(+(n / 1e6).toFixed(2))} مليون` : `${fmt(Math.round(n / 1000))} ألف`;
const roomsLabel = r => r === "2" ? "غرفتان" : r === "4" ? "4 غرف فأكثر" : `${r} غرف`;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(pointer: fine)").matches;
const hasGsap = !!(window.gsap && window.ScrollTrigger) && !reduce;
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"/></svg>';

const state = { district: "", status: "", rooms: "", budget: "" };
const DISTRICTS = [...new Set(PROJECTS.map(p => p.district))];

// واجهة المبنى تُرسم من عدد المباني والأدوار والملاحق الفعلية
function facade(p) {
  let s = [...p.id].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rnd = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
  const W = 400, H = 320, G = 304, n = p.blds, gap = 16;
  const bw = n === 1 ? 156 : (W - 70 - gap * (n - 1)) / n;
  const x0 = (W - (n * bw + gap * (n - 1))) / 2;
  const flH = Math.min(30, 250 / (p.floors + (p.annex ? 1 : 0) + 0.6));
  const litP = p.status === "soldout" ? 0.72 : 0.45;
  let out = "";
  for (let b = 0; b < n; b++) {
    const x = x0 + b * (bw + gap), fl = p.floors - (n > 1 && b % 2 ? 1 : 0);
    const h = fl * flH + 10, y = G - h, cols = Math.max(2, Math.round(bw / 24)), cw = (bw - 12) / cols;
    out += `<rect x="${x}" y="${y}" width="${bw}" height="${h}" fill="url(#fb)" stroke="rgba(201,138,111,.35)"/>`;
    for (let f = 0; f < fl; f++) for (let c = 0; c < cols; c++) {
      const lit = rnd() < litP;
      out += `<rect x="${(x + 6 + c * cw + 2).toFixed(1)}" y="${(y + 6 + f * flH + 3).toFixed(1)}" width="${(cw - 4).toFixed(1)}" height="${(flH - 8).toFixed(1)}" rx="1" fill="${lit ? "#f2cdb9" : "#2e3754"}"${lit ? ` opacity="${(0.5 + rnd() * 0.5).toFixed(2)}"` : ""}/>`;
    }
    if (p.annex) {
      const aw = bw * 0.55, ax = x + (bw - aw) / 2, ay = y - flH;
      out += `<rect x="${ax.toFixed(1)}" y="${ay.toFixed(1)}" width="${aw.toFixed(1)}" height="${flH}" fill="url(#fb)" stroke="rgba(201,138,111,.35)"/>`;
      out += `<rect x="${(ax + 6).toFixed(1)}" y="${(ay + 5).toFixed(1)}" width="${(aw - 12).toFixed(1)}" height="${(flH - 10).toFixed(1)}" fill="#f2cdb9" opacity=".35"/>`;
    }
    out += `<line x1="${x - 3}" y1="${y}" x2="${x + bw + 3}" y2="${y}" stroke="#c98a6f" stroke-width="2"/>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><defs><linearGradient id="fb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#46527a"/><stop offset="1" stop-color="#2c3550"/></linearGradient></defs>${out}<line x1="0" y1="${G}" x2="${W}" y2="${G}" stroke="rgba(201,138,111,.45)"/></svg>`;
}

function match(p) {
  if (state.district && p.district !== state.district) return false;
  if (state.status && p.status !== state.status) return false;
  if (state.rooms || state.budget) {
    return Object.entries(p.avail).some(([r, a]) =>
      (!state.rooms || (state.rooms === "4" ? +r >= 4 : r === state.rooms)) && (!state.budget || a.from <= +state.budget));
  }
  return true;
}

function card(p) {
  const n = units(p), from = minPrice(p);
  const facts = [[p.blds > 1 && p.blds, "مبانٍ"], [p.floors, "أدوار"], [p.apts, "شقة"], [p.annex, "ملاحق"]]
    .filter(f => f[0]).map(([v, l]) => `<div><b class="tnum">${v}</b><small>${l}</small></div>`).join("");
  const rooms = Object.entries(p.avail).map(([r, a]) =>
    `<li><span>${roomsLabel(r)}</span><span><b class="tnum">${a.n}</b> متاحة · من ${short(a.from)}</span></li>`).join("");
  const price = n
    ? `<div class="from"><small>تبدأ الأسعار من</small><b class="tnum">${fmt(from)}</b> <span>ر.س</span></div>`
    : `<div class="from muted">${p.status === "soldout" ? "اكتمل بيع المشروع" : "الوحدات والأسعار عند التواصل"}</div>`;
  return `<article class="pcard">
    <div class="art">${facade(p)}<span class="pill st-${p.status}">${STATUS[p.status]}</span>${n ? `<span class="avail"><b class="tnum">${n}</b> وحدة متاحة</span>` : ""}</div>
    <div class="pbody">
      <div class="ptop"><h3 class="pname">${esc(p.name)}</h3><span class="ploc">حي ${esc(p.district)}، جدة</span></div>
      <div class="facts">${facts}</div>
      ${rooms ? `<ul class="rooms">${rooms}</ul>` : ""}
      <div class="pfoot">${price}
        <a class="ask" href="${wa(`السلام عليكم، أرغب بالاستفسار عن مشروع ${p.name} في حي ${p.district}.`)}" target="_blank" rel="noopener" aria-label="استفسر عن ${esc(p.name)} عبر واتساب">${ARROW}</a></div>
    </div></article>`;
}

function render() {
  const list = PROJECTS.filter(match);
  $("#track").innerHTML = list.map(card).join("");
  $("#empty").hidden = list.length > 0;
  $("#availCount").textContent = fmt(list.reduce((s, p) => s + units(p), 0));
  bindTilt();
  if (stReady) ScrollTrigger.refresh();
}

function renderStatic() {
  $("#dlist").innerHTML = DISTRICTS.map(d => {
    const ps = PROJECTS.filter(p => p.district === d), n = ps.reduce((s, p) => s + units(p), 0);
    const prices = ps.map(minPrice).filter(Boolean), from = prices.length ? Math.min(...prices) : 0;
    const count = ps.length === 1 ? "مشروع واحد" : ps.length === 2 ? "مشروعان" : `${ps.length} مشاريع`;
    const sold = ps.every(p => p.status === "soldout");
    const head = n ? `${fmt(n)} وحدة متاحة` : sold ? "اكتمل البيع" : "إطلاق جديد · التفاصيل عند التواصل";
    return `<button class="drow${sold ? " sold" : ""}" type="button" data-d="${esc(d)}">
      <span class="dname"><small>حي</small>${esc(d)}</span>
      <span class="dmeta"><b>${head}</b>${count}${from ? ` · تبدأ من ${short(from)} ريال` : ""}</span>
      <span class="darr">${ARROW}</span></button>`;
  }).join("");
  $("#fDistrict").insertAdjacentHTML("beforeend", DISTRICTS.map(d => `<option>${esc(d)}</option>`).join(""));
  $("#footDistricts").innerHTML = DISTRICTS.map(d => `<a href="#districts">حي ${esc(d)}</a>`).join("");
  $("#ngrid").innerHTML = NEWS.map(n => `<article class="news" data-reveal><time>${esc(n.d)}</time><h3>${esc(n.t)}</h3><p>${esc(n.p)}</p></article>`).join("");
  const row = PARTNERS.map(p => `<span>${esc(p)}</span>`).join("");
  $("#mtrack").innerHTML = row + row;

  const totals = {
    projects: PROJECTS.length,
    buildings: PROJECTS.reduce((s, p) => s + p.blds, 0),
    apts: PROJECTS.reduce((s, p) => s + p.apts, 0),
    avail: PROJECTS.reduce((s, p) => s + units(p), 0),
  };
  $$("[data-stat]").forEach(el => { el.dataset.to = totals[el.dataset.stat]; el.textContent = fmt(totals[el.dataset.stat]); });
  $("#yr").textContent = new Date().getFullYear();
  $("#upd").textContent = UPDATED;
}

// ---------- التفاعل ----------
function scrollToEl(t) {
  if (lenis) lenis.scrollTo(t, { offset: -70, duration: 1.4 });
  else t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}
function setStatusChip() { $$(".chip").forEach(c => c.classList.toggle("active", c.dataset.f === state.status)); }

$("#chips").addEventListener("click", e => {
  const b = e.target.closest(".chip"); if (!b) return;
  state.status = b.dataset.f; $("#fStatus").value = state.status; setStatusChip(); render();
});
$("#searchForm").addEventListener("submit", e => {
  e.preventDefault();
  Object.assign(state, Object.fromEntries(new FormData(e.target)));
  setStatusChip(); render(); scrollToEl($("#projects"));
});
$("#searchForm").addEventListener("change", e => {
  Object.assign(state, Object.fromEntries(new FormData(e.currentTarget)));
  setStatusChip(); render();
});
document.addEventListener("click", e => {
  const row = e.target.closest(".drow");
  if (row) { state.district = row.dataset.d; $("#fDistrict").value = state.district; render(); scrollToEl($("#projects")); return; }
  const a = e.target.closest('a[href^="#"]'); if (!a) return;
  const id = a.getAttribute("href"); if (id.length < 2) return;
  const t = document.querySelector(id); if (!t) return;
  e.preventDefault(); closeMenu(); scrollToEl(t);
});

// قائمة الجوال
const burger = $("#burger");
function closeMenu() { document.documentElement.classList.remove("menu-open"); burger.setAttribute("aria-expanded", "false"); lenis && lenis.start(); }
burger.addEventListener("click", () => {
  const open = document.documentElement.classList.toggle("menu-open");
  burger.setAttribute("aria-expanded", String(open));
  if (lenis) open ? lenis.stop() : lenis.start();
});
addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

// روابط واتساب للحجز
const visit = wa("السلام عليكم، أرغب بحجز زيارة والاستشارة في مشاريع آرك الماسية العقارية.");
$$(".js-visit").forEach(a => { a.href = visit; a.target = "_blank"; a.rel = "noopener"; });
$("#waBtn").href = wa("السلام عليكم، أرغب بالاستفسار عن مشاريع آرك الماسية العقارية.");

// نموذج التواصل → واتساب
$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target, note = $("#formNote"), name = $("#cName").value.trim(), phone = $("#cPhone").value.trim();
  const okPhone = /^(05\d{8}|\+?9665\d{8})$/.test(phone.replace(/\s/g, ""));
  $("#cName").classList.toggle("bad", !name); $("#cPhone").classList.toggle("bad", !okPhone);
  if (!name || !okPhone) { note.className = "note full err"; note.textContent = "أدخل الاسم ورقم جوال سعودي يبدأ بـ 05 ويتكوّن من 10 أرقام."; return; }
  const url = wa(`الاسم: ${name}\nالجوال: ${phone}\nالطلب: ${$("#cTopic").value}\n${$("#cMsg").value.trim()}`);
  window.open(url, "_blank", "noopener");
  note.className = "note full";
  note.innerHTML = `جهّزنا رسالتك في واتساب. إن لم تُفتح المحادثة، <a href="${url}" target="_blank" rel="noopener">افتحها من هنا</a>.`;
  f.reset();
});

// إخفاء الهيدر عند النزول وإظهاره عند الصعود
const hdr = $("#hdr"); let lastY = 0;
addEventListener("scroll", () => {
  const y = scrollY;
  hdr.classList.toggle("scrolled", y > 40);
  hdr.classList.toggle("hide", y > lastY && y > 500 && !document.documentElement.classList.contains("menu-open"));
  lastY = y;
}, { passive: true });

// ميلان ثلاثي الأبعاد للبطاقات
function bindTilt() {
  if (!fine || reduce) return;
  $$(".pcard").forEach(c => {
    c.addEventListener("pointermove", e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`;
    });
    c.addEventListener("pointerleave", () => { c.style.transform = ""; });
  });
}

// أزرار مغناطيسية ومؤشر ذهبي
if (fine && !reduce) {
  $$(".magnetic").forEach(b => {
    b.addEventListener("pointermove", e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
    });
    b.addEventListener("pointerleave", () => { b.style.transform = ""; });
  });
  const cur = $("#cursor"); let cx = innerWidth / 2, cy = innerHeight / 2, mx = cx, my = cy;
  addEventListener("pointermove", e => { mx = e.clientX; my = e.clientY; cur.classList.add("on"); }, { passive: true });
  document.addEventListener("pointerleave", () => cur.classList.remove("on"));
  document.addEventListener("pointerover", e => cur.classList.toggle("hover", !!e.target.closest("a,button,select,.pcard,input,textarea")));
  (function loop() { cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18; cur.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
}

// تقسيم النص إلى كلمات للحركة (الكلمة العربية تبقى متصلة)
function split(el, cls) {
  (function walk(node) {
    [...node.childNodes].forEach(ch => {
      if (ch.nodeType === 3) {
        const frag = document.createDocumentFragment();
        ch.textContent.split(/(\s+)/).forEach(t => {
          if (!t) return;
          if (/^\s+$/.test(t)) { frag.append(" "); return; }
          const w = document.createElement("span"); w.className = cls;
          if (cls === "w") { const i = document.createElement("span"); i.textContent = t; w.append(i); } else w.textContent = t;
          frag.append(w);
        });
        ch.replaceWith(frag);
      } else if (ch.nodeType === 1) walk(ch);
    });
  })(el);
  return $$(cls === "w" ? ".w>span" : "." + cls, el);
}

// ---------- التمرير الناعم والحركات ----------
let lenis = null, stReady = false;
renderStatic();
render();

const loader = $("#loader");
function hideLoader() { loader.classList.add("done"); }

if (hasGsap) {
  gsap.registerPlugin(ScrollTrigger);
  stReady = true;
  if (window.Lenis) {
    lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // افتتاحية الهيرو
  const words = split($("#heroTitle"), "w");
  gsap.set(words, { yPercent: 115 });
  gsap.set("[data-intro]", { y: 30, opacity: 0 });
  const intro = () => {
    hideLoader();
    gsap.timeline({ delay: 0.25 })
      .to(words, { yPercent: 0, duration: 1.3, ease: "expo.out", stagger: 0.07 })
      .to("[data-intro]", { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: 0.1 }, "-=0.9");
  };
  let started = false;
  const go = () => { if (!started) { started = true; intro(); } };
  if (document.readyState === "complete") setTimeout(go, 500); else addEventListener("load", () => setTimeout(go, 500));
  setTimeout(go, 3000);

  // الهيرو يتلاشى صعودًا
  gsap.to(".hero-copy", { yPercent: -18, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

  // البيان: الكلمات تضيء مع التمرير
  const mw = split($("#manifesto"), "mw");
  gsap.fromTo(mw, { opacity: 0.16 }, { opacity: 1, stagger: 0.05, ease: "none",
    scrollTrigger: { trigger: "#manifesto", start: "top 78%", end: "bottom 42%", scrub: true } });

  // العدّادات
  $$("[data-stat]").forEach(el => {
    const o = { v: 0 }, to = +el.dataset.to; el.textContent = "0";
    gsap.to(o, { v: to, duration: 2, ease: "power3.out", onUpdate: () => { el.textContent = fmt(Math.round(o.v)); },
      scrollTrigger: { trigger: el, start: "top 88%", once: true } });
  });

  // المشاريع: معرض أفقي مثبّت (يتحرك يمينًا لأن الصفحة RTL)
  const mm = gsap.matchMedia();
  mm.add("(min-width: 900px)", () => {
    const track = $("#track"), vp = $("#viewport");
    const dist = () => Math.max(1, track.offsetWidth - vp.clientWidth);
    gsap.to(track, { x: () => dist(), ease: "none",
      scrollTrigger: { trigger: "#projects", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true,
        onUpdate: s => gsap.set("#pbar", { scaleX: s.progress }) } });
  });

  // الرحلة: خط يمتد والخطوات تضيء بالترتيب
  const steps = $$(".step");
  steps.forEach(s => s.classList.remove("on"));
  gsap.fromTo("#jfill", { scaleX: 0 }, { scaleX: 1, ease: "none",
    scrollTrigger: { trigger: "#steps", start: "top 80%", end: "bottom 55%", scrub: true,
      onUpdate: s => steps.forEach((st, i) => st.classList.toggle("on", s.progress >= i / steps.length - 0.01)) } });

  // ظهور تدريجي للعناصر
  $$("[data-reveal], .drow, .h2, .stat").forEach(el => {
    gsap.from(el, { y: 50, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
  });
  gsap.from("#ctaTitle", { scale: 0.86, opacity: 0, ease: "none", scrollTrigger: { trigger: "#ctaTitle", start: "top 95%", end: "top 45%", scrub: true } });

  document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
} else {
  addEventListener("load", hideLoader);
  setTimeout(hideLoader, 1200);
}
})();
