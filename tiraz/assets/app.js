// بيانات المشروع — من بروشور طراز إيليت
const WA = "966531113173";

const UNITS = [
  {code:"A", cat:"front", title:"شقة 4 غرف أمامية", area:130, price:460,
   tags:["3 غرف نوم","مجلس","3 دورات مياه","بلكونة"],
   specs:["3 غرف نوم","مجلس","صالة معيشة","مطبخ","3 دورات مياه","مدخلين","بلكونة"]},
  {code:"B", cat:"front", title:"شقة 3 غرف أمامية", area:109, price:380,
   tags:["2 غرف نوم","مجلس","3 دورات مياه","بلكونة"],
   specs:["2 غرف نوم","مجلس","صالة معيشة","مطبخ","3 دورات مياه","مدخلين","بلكونة"]},
  {code:"C", cat:"inner", title:"شقة 3 غرف داخلية", area:100, price:360,
   tags:["2 غرف نوم","مجلس","3 دورات مياه"],
   specs:["2 غرف نوم","مجلس","صالة معيشة","مطبخ","3 دورات مياه","مدخلين"]},
  {code:"D", cat:"inner", title:"شقة 3 غرف داخلية", area:98, price:360,
   tags:["2 غرف نوم","مجلس","3 دورات مياه"],
   specs:["2 غرف نوم","مجلس","صالة معيشة","مطبخ","3 دورات مياه","مدخلين"]},
  {code:"E", cat:"inner", title:"شقة غرفتين داخلية", area:73, price:285,
   tags:["2 غرف نوم","2 دورات مياه"],
   specs:["2 غرف نوم","صالة معيشة","مطبخ","2 دورات مياه"]},
  {code:"F1", cat:"annex", title:"ملحق 6 غرف أمامي", area:261, built:218, roof:43, price:770,
   tags:["3 غرف نوم","مجلسين","سطح خاص","5 دورات مياه"],
   specs:["3 غرف نوم","مجلسين","غرفة طعام","صالة معيشة","مطبخ","5 دورات مياه","غرفة خادمة","غرفة ملابس","منطقة غسيل","سطح خاص","مدخلين"]},
  {code:"F2", cat:"annex", title:"ملحق 6 غرف أمامي", area:261, built:218, roof:43, price:770,
   tags:["3 غرف نوم","مجلسين","سطح خاص","5 دورات مياه"],
   specs:["3 غرف نوم","مجلسين","غرفة طعام","صالة معيشة","مطبخ","5 دورات مياه","غرفة خادمة","غرفة ملابس","منطقة غسيل","سطح خاص","مدخلين"]},
];
const CAT = {front:"شقة أمامية", inner:"شقة داخلية", annex:"ملحق علوي"};

// إحداثيات الأدوار على صورة الواجهة (1600×2262)
const TYPICAL = ["A","B","C","D","E"];
const FLOORS = [
  {id:"roof", name:"الملحق العلوي", x:283, y:1068, w:1028, h:119, units:["F1","F2"]},
  {id:"f4", name:"الدور الرابع", x:226, y:1187, w:1142, h:186, units:TYPICAL},
  {id:"f3", name:"الدور الثالث", x:226, y:1373, w:1142, h:198, units:TYPICAL},
  {id:"f2", name:"الدور الثاني", x:226, y:1571, w:1142, h:192, units:TYPICAL},
  {id:"f1", name:"الدور الأول", x:226, y:1763, w:1142, h:203, units:TYPICAL},
  {id:"g", name:"الدور الأرضي", x:226, y:1966, w:1142, h:170, units:[], note:"المدخل الرئيسي ومواقف السيارات."},
];

const FEATURES = [
  ["مصعدين فل أوتوماتيك",'<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M12 2v20M7 10l1.5-2L10 10M14 14l1.5 2 1.5-2"/>'],
  ["نوافذ واسعة",'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M4 12h16"/>'],
  ["واجهات مودرن",'<rect x="5" y="3" width="14" height="18"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M11 21v-3h2v3"/>'],
  ["دخول ذكي",'<rect x="7" y="2" width="10" height="20" rx="2"/><circle cx="12" cy="8" r="2"/><path d="M10 14h4M10 17h4"/>'],
  ["أسقف مرتفعة",'<path d="M4 3h16M4 21h16M12 6v12M9 9l3-3 3 3M9 15l3 3 3-3"/>'],
  ["إنارات ضد التوهج",'<circle cx="12" cy="10" r="4"/><path d="M10 14v3h4v-3M12 2v2M4 10H2M22 10h-2M5.6 4.6 7 6M18.4 4.6 17 6M10 20h4"/>'],
  ["مدخلين",'<rect x="3" y="4" width="7" height="17"/><rect x="14" y="4" width="7" height="17"/><path d="M8 13h.01M16 13h.01"/>'],
  ["تشطيبات عصرية",'<path d="M12 21v-7M12 14c-4 0-6-3-6-7 4 0 6 3 6 7zM12 14c4 0 6-3 6-7-4 0-6 3-6 7zM8 21h8"/>'],
  ["انتركوم سمارت",'<rect x="6" y="2" width="12" height="20" rx="2"/><rect x="9" y="5" width="6" height="5"/><circle cx="12" cy="15" r="1.5"/><path d="M10 19h4"/>'],
  ["بلكونات",'<path d="M3 21h18M5 21v-8h14v8M9 13v8M12 13v8M15 13v8M7 13V7a5 5 0 0 1 10 0v6"/>'],
  ["أبواب مرتفعة",'<path d="M6 21V3h12v18M3 21h18M14 12h.01"/>'],
];

const DIST = [
  ["أمام","مسجد",true],["2","مركز صحي","دقيقتين"],["4","شارع حراء"],["4","مدرسة"],
  ["7","حديقة الأمير ماجد"],["8","طريق الأمير ماجد"],["9","مطار الملك عبدالعزيز الدولي"],
];

const $ = (s, r=document) => r.querySelector(s);
const byCode = Object.fromEntries(UNITS.map(u => [u.code, u]));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const waLink = text => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
const SVGNS = "http://www.w3.org/2000/svg";

/* ---------- header & menu ---------- */
const header = $("#header"), burger = $("#burger"), menu = $("#menu");
const onScroll = () => header.classList.toggle("solid", scrollY > 40 || menu.classList.contains("open"));
addEventListener("scroll", onScroll, {passive:true}); onScroll();
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open); onScroll();
});
menu.addEventListener("click", e => {
  if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded","false"); onScroll(); }
});

/* ---------- hero parallax ---------- */
const heroMedia = $("#heroMedia");
if (!reduce) {
  let ticking = false;
  addEventListener("scroll", () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      if (scrollY < innerHeight * 1.2) heroMedia.style.transform = `translateY(${scrollY * 0.25}px)`;
      ticking = false;
    });
  }, {passive:true});
}

/* ---------- interactive building ---------- */
const svg = $("#floors"), tip = $("#bldTip"), panel = $("#floorPanel");
FLOORS.forEach(f => {
  const g = document.createElementNS(SVGNS, "g");
  g.setAttribute("class", "fl"); g.setAttribute("tabindex", "0"); g.setAttribute("role", "button");
  g.setAttribute("aria-label", f.name); g.dataset.id = f.id;
  const r = document.createElementNS(SVGNS, "rect");
  Object.entries({x:f.x, y:f.y, width:f.w, height:f.h, rx:6}).forEach(([k,v]) => r.setAttribute(k, v));
  const t = document.createElementNS(SVGNS, "text");
  t.setAttribute("x", f.x + f.w / 2); t.setAttribute("y", f.y + f.h / 2 + 16); t.setAttribute("text-anchor", "middle");
  t.textContent = f.name;
  g.append(r, t); svg.append(g);
  const hoverText = f.units.length ? `${f.name} · ${f.units.length} نماذج · تبدأ من ${Math.min(...f.units.map(c => byCode[c].price))} ألف` : f.name;
  g.addEventListener("mouseenter", () => tip.textContent = hoverText);
  g.addEventListener("mouseleave", () => tip.textContent = "");
  g.addEventListener("click", () => selectFloor(f.id));
  g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectFloor(f.id); } });
});

function selectFloor(id){
  const f = FLOORS.find(x => x.id === id);
  svg.querySelectorAll(".fl").forEach(g => g.classList.toggle("on", g.dataset.id === id));
  if (!f.units.length) {
    panel.innerHTML = `<div class="fp-head"><h3>${f.name}</h3></div><p>${f.note}</p>`;
    return;
  }
  const items = f.units.map(c => {
    const u = byCode[c];
    return `<li><button type="button" data-code="${c}"><span class="fp-badge">${c}</span>
      <span>${u.title}<small>${u.area} م² · ${u.tags.slice(0,2).join(" · ")}</small></span>
      <b>${u.price} ألف</b></button></li>`;
  }).join("");
  panel.innerHTML = `<div class="fp-head"><h3>${f.name}</h3><span>${f.units.length} نماذج</span></div>
    <ul class="fp-list">${items}</ul>
    <p class="fp-note">اضغط على النموذج لعرض المخطط والتفاصيل. التوفر الفعلي يؤكده فريق المبيعات.</p>`;
  if (innerWidth <= 980) panel.scrollIntoView({behavior: reduce ? "auto" : "smooth", block:"nearest"});
}
panel.addEventListener("click", e => { const b = e.target.closest("[data-code]"); if (b) openUnit(b.dataset.code); });

// hint the floors once the building scrolls into view
new IntersectionObserver((es, o) => es.forEach(en => {
  if (en.isIntersecting) { svg.classList.add("hint"); o.disconnect(); }
}), {threshold:.5}).observe($("#bldFrame"));

// subtle 3D tilt of the facade with the pointer
const frame = $("#bldFrame"), bld = $("#bld");
if (!reduce && finePointer) {
  frame.addEventListener("pointermove", e => {
    const r = frame.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    bld.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 4}deg) scale(1.02)`;
  });
  frame.addEventListener("pointerleave", () => bld.style.transform = "");
}

/* ---------- units grid ---------- */
const grid = $("#unitGrid"), state = {f:"all", sort:"price-asc"};
function renderUnits(){
  const list = UNITS.filter(u => state.f === "all" || u.cat === state.f);
  const [key, dir] = state.sort.split("-");
  list.sort((a, b) => (a[key] - b[key]) * (dir === "asc" ? 1 : -1));
  grid.innerHTML = list.map(u => `
    <button class="unit reveal in" type="button" data-code="${u.code}" aria-label="نموذج ${u.code} — ${u.title}">
      <div class="u-plan"><img src="assets/img/plan-${u.code}.png" alt="" loading="lazy"><span class="u-code">${u.code}</span></div>
      <div class="u-body">
        <h3>${u.title}</h3>
        <div class="u-meta">${u.tags.map(t => `<span>${t}</span>`).join("")}</div>
        <div class="u-foot">
          <div><small>المساحة</small><b>${u.area}<i>م²</i></b></div>
          <div><small>السعر</small><b>${u.price}<i>ألف ريال</i></b></div>
        </div>
      </div>
    </button>`).join("");
}
$("#chips").addEventListener("click", e => {
  const b = e.target.closest(".chip"); if (!b) return;
  document.querySelectorAll(".chip").forEach(c => { const on = c === b; c.classList.toggle("active", on); c.setAttribute("aria-pressed", on); });
  state.f = b.dataset.f; renderUnits();
});
$("#sort").addEventListener("change", e => { state.sort = e.target.value; renderUnits(); });
grid.addEventListener("click", e => { const b = e.target.closest(".unit"); if (b) openUnit(b.dataset.code); });
if (!reduce && finePointer) {
  grid.addEventListener("pointermove", e => {
    const c = e.target.closest(".unit"); if (!c) return;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    c.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  });
  grid.addEventListener("pointerout", e => {
    const c = e.target.closest(".unit");
    if (c && !c.contains(e.relatedTarget)) c.style.transform = "";
  });
}
renderUnits();

/* ---------- unit modal ---------- */
const modal = $("#modal"), mPlan = $(".m-plan");
function openUnit(code){
  const u = byCode[code];
  $("#mImg").src = `assets/img/plan-${code}.png`;
  $("#mImg").alt = `مخطط نموذج ${code} — ${u.title}`;
  $("#mTag").textContent = `نموذج ${code} · ${CAT[u.cat]}`;
  $("#mTitle").textContent = u.title;
  $("#mArea").textContent = u.area;
  $("#mAreaNote").textContent = u.built ? `متر مربع (مباني ${u.built} + سطح ${u.roof})` : "متر مربع";
  $("#mPrice").textContent = u.price;
  $("#mSpecs").innerHTML = u.specs.map(s => `<li>${s}</li>`).join("");
  $("#mWa").href = waLink(`السلام عليكم، أرغب بالاستفسار عن نموذج ${code} (${u.title} - ${u.area} م²) في مشروع طراز إيليت.`);
  mPlan.classList.remove("zoom");
  modal.showModal();
}
$("#mClose").addEventListener("click", () => modal.close());
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });
mPlan.addEventListener("click", e => {
  const r = mPlan.getBoundingClientRect();
  mPlan.style.setProperty("--ox", `${(e.clientX - r.left) / r.width * 100}%`);
  mPlan.style.setProperty("--oy", `${(e.clientY - r.top) / r.height * 100}%`);
  mPlan.classList.toggle("zoom");
});

/* ---------- features & location ---------- */
$("#featGrid").innerHTML = FEATURES.map(([t, p]) =>
  `<li class="reveal"><svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg>${t}</li>`).join("");
$("#dist").innerHTML = DIST.map(([n, t, unit]) => unit === true
  ? `<li><b class="word">${n}</b><span>${t}</span></li>`
  : `<li><b>${n}</b><span>${t}<small>${unit || "دقائق"}</small></span></li>`).join("");

/* ---------- counters & reveal ---------- */
const fmt = n => n.toLocaleString("en-US");
const countIO = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return; countIO.unobserve(en.target);
  const el = en.target, to = +el.dataset.count;
  if (reduce) { el.textContent = fmt(to); return; }
  const t0 = performance.now();
  (function tick(t){ const k = Math.min((t - t0) / 1400, 1), e = 1 - Math.pow(1 - k, 3);
    el.textContent = fmt(Math.round(to * e)); if (k < 1) requestAnimationFrame(tick); })(t0);
}), {threshold:.6});
document.querySelectorAll("[data-count]").forEach(el => countIO.observe(el));

const revIO = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add("in"); revIO.unobserve(en.target); }
}), {threshold:.12, rootMargin:"0px 0px -40px 0px"});
document.querySelectorAll(".reveal:not(.in)").forEach(el => revIO.observe(el));

/* ---------- lead form → WhatsApp ---------- */
const sel = $("#modelSelect");
UNITS.forEach(u => sel.add(new Option(`نموذج ${u.code} — ${u.title} (${u.price} ألف)`, u.code)));
$("#leadForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target, note = $("#formNote");
  const name = f.name.value.trim(), phone = f.phone.value.replace(/\s/g, "");
  const okPhone = /^(05\d{8}|(\+|00)?9665\d{8})$/.test(phone);
  f.name.classList.toggle("bad", !name); f.phone.classList.toggle("bad", !okPhone);
  if (!name || !okPhone) { note.className = "note err"; note.textContent = "فضلًا أدخل الاسم ورقم جوال سعودي صحيح."; return; }
  const model = f.model.value ? `نموذج ${f.model.value}` : "لم أحدد";
  const text = `السلام عليكم، أرغب بحجز زيارة لمشروع طراز إيليت.\nالاسم: ${name}\nالجوال: ${phone}\nالنموذج: ${model}\nطريقة الشراء: ${f.pay.value}`;
  window.open(waLink(text), "_blank", "noopener");
  note.className = "note"; note.textContent = "شكرًا لك! تم تجهيز رسالتك في واتساب.";
});

$("#yr").textContent = new Date().getFullYear();
