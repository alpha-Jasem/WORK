// بيانات تجريبية — استبدلها ببيانات الشركة الفعلية
const WA = "966500000000";
const UPDATED = "٢٠٢٦";
const STATUS = {selling:"بدأ البيع", new:"إطلاق جديد", soldout:"تم البيع بالكامل"};

// avail: الوحدات المتاحة حسب عدد الغرف {غرف: {n: العدد, from: أقل سعر}}
const PROJECTS = [
  {id:"ark-55",name:"آرك 55",district:"السلامة",status:"selling",floors:7,apts:44,annex:2,area:"85 – 106",
   avail:{2:{n:10,from:445000},3:{n:7,from:583000}},g:["#1b4a84","#0b1f3a"]},
  {id:"ark-35",name:"آرك 35",district:"الروضة",status:"new",floors:5,apts:8,annex:2,area:"110 – 150",
   avail:{3:{n:6,from:1350000},4:{n:4,from:1620000}},g:["#2c6e7a","#0d2c3a"]},
  {id:"haven",name:"هيفن 1",district:"النهضة",status:"selling",floors:6,apts:55,annex:6,area:"130 – 190",
   avail:{4:{n:1,from:1030000}},g:["#b88a2a","#5b4311"]},
  {id:"elevate",name:"آرك إليفيت",district:"درب الحرمين",status:"new",floors:9,apts:0,annex:0,area:"—",avail:{},g:["#3a4f8a","#14234a"]},
  {id:"ark-12",name:"آرك 12",district:"النسيم",status:"soldout",floors:5,apts:20,annex:0,area:"95 – 120",avail:{},g:["#7a4a2c","#2d1a0d"]},
  {id:"ark-08",name:"آرك 8",district:"المنار",status:"soldout",floors:4,apts:16,annex:0,area:"90 – 115",avail:{},g:["#1f6b5a","#0a2b24"]},
];

const NEWS = [
  {d:"سبتمبر 2026",t:"آرك الماسية تحصل على رخصة مساهمة عقارية",p:"خبر تجريبي — استبدله بخبر الشركة الفعلي."},
  {d:"سبتمبر 2026",t:"تدشين مجمّعات هيفن السكنية في حي النهضة",p:"خبر تجريبي — استبدله بخبر الشركة الفعلي."},
  {d:"سبتمبر 2026",t:"الاستحواذ على بلك عقاري جديد في قلب جدة",p:"خبر تجريبي — استبدله بخبر الشركة الفعلي."},
];
const PARTNERS = ["شريك التمويل","المكتب القانوني","شركة المقاولات","مورّد الطوب","مورّد المصاعد","مورّد الكهرباء"];

const $ = (s, r=document) => r.querySelector(s);
const fmt = n => n.toLocaleString("ar-SA");
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const wa = text => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
const units = p => Object.values(p.avail).reduce((s,r) => s + r.n, 0);
const minPrice = p => { const v = Object.values(p.avail).map(r => r.from); return v.length ? Math.min(...v) : 0; };
const short = n => n >= 1e6 ? `${fmt(+(n/1e6).toFixed(2))} مليون` : `${fmt(Math.round(n/1000))} ألف`;

const state = {district:"", status:"", rooms:"", budget:""};
const DISTRICTS = [...new Set(PROJECTS.map(p => p.district))];

// هل يطابق المشروع الفلاتر؟ (الغرف والميزانية تُقارن بالوحدات المتاحة)
function match(p){
  if(state.district && p.district !== state.district) return false;
  if(state.status && p.status !== state.status) return false;
  if(state.rooms || state.budget){
    const ok = Object.entries(p.avail).some(([r, a]) =>
      (!state.rooms || (state.rooms === "4" ? +r >= 4 : r === state.rooms)) &&
      (!state.budget || a.from <= +state.budget));
    if(!ok) return false;
  }
  return true;
}

function card(p){
  const n = units(p), from = minPrice(p);
  const rooms = Object.entries(p.avail).map(([r,a]) => `<li>${r} غرف: <b>${fmt(a.n)}</b> متاحة · من ${short(a.from)}</li>`).join("");
  const facts = [p.floors && `${p.floors} أدوار`, p.apts && `${p.apts} شقة`, p.annex && `${p.annex} ملحق`].filter(Boolean).join(" · ");
  return `<article class="card">
    <div class="thumb" style="background:linear-gradient(135deg,${p.g[0]},${p.g[1]})"><span aria-hidden="true">▦</span>
      <span class="badge st-${p.status}">${STATUS[p.status]}</span></div>
    <div class="body"><h3>${esc(p.name)}</h3><p class="loc">حي ${esc(p.district)}، جدة</p>
      ${facts ? `<p class="facts">${facts}</p>` : ""}
      ${rooms ? `<ul class="rooms">${rooms}</ul>` : ""}
      <div class="price">${n ? `<span><small>تبدأ من</small> <b>${fmt(from)} ر.س</b></span>` : `<span class="mut">${p.status==="soldout"?"اكتمل البيع":"التفاصيل عند التواصل"}</span>`}
        <a href="${wa(`السلام عليكم، أرغب بالاستفسار عن مشروع ${p.name} في حي ${p.district}`)}" target="_blank" rel="noopener">استفسر ←</a></div></div></article>`;
}

function render(){
  const list = PROJECTS.filter(match);
  $("#cards").innerHTML = list.map(card).join("");
  $("#empty").hidden = list.length > 0;
  $("#availCount").textContent = fmt(list.reduce((s,p) => s + units(p), 0));
}

// الأحياء
function renderDistricts(){
  $("#districtGrid").innerHTML = DISTRICTS.map(d => {
    const ps = PROJECTS.filter(p => p.district === d), n = ps.reduce((s,p) => s + units(p), 0);
    const from = Math.min(...ps.map(minPrice).filter(Boolean), Infinity);
    return `<a class="dist" href="#projects" data-d="${esc(d)}"><span class="dn">حي</span><h3>${esc(d)}</h3>
      <p>${fmt(ps.length)} ${ps.length > 2 ? "مشاريع" : ps.length === 2 ? "مشروعان" : "مشروع"}</p>
      <strong>${n ? `${fmt(n)} وحدة متاحة` : "اكتمل البيع"}</strong>${isFinite(from) ? `<small>تبدأ من ${short(from)} ريال</small>` : ""}</a>`;
  }).join("");
  $("#fDistrict").insertAdjacentHTML("beforeend", DISTRICTS.map(d => `<option>${esc(d)}</option>`).join(""));
  $("#footDistricts").innerHTML = DISTRICTS.map(d => `<a href="#districts">حي ${esc(d)}</a>`).join("");
}

$("#districtGrid").addEventListener("click", e => {
  const a = e.target.closest(".dist"); if(!a) return;
  state.district = a.dataset.d; $("#fDistrict").value = state.district; render();
});

// فلتر الحالة (شرائح)
$("#chips").addEventListener("click", e => {
  const b = e.target.closest(".chip"); if(!b) return;
  state.status = b.dataset.f; $("#searchForm").status.value = state.status;
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === b));
  render();
});
$("#searchForm").addEventListener("submit", e => {
  e.preventDefault();
  Object.assign(state, Object.fromEntries(new FormData(e.target)));
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.f === state.status));
  render(); $("#projects").scrollIntoView({behavior:"smooth"});
});

// أخبار وشركاء
$("#newsGrid").innerHTML = NEWS.map(n => `<article class="news"><time>${esc(n.d)}</time><h3>${esc(n.t)}</h3><p>${esc(n.p)}</p></article>`).join("");
$("#partnerList").innerHTML = PARTNERS.map(p => `<li>${esc(p)}</li>`).join("");

// روابط واتساب
const visit = wa("السلام عليكم، أرغب بحجز زيارة والاستشارة في مشاريع آرك الماسية العقارية.");
$("#waBtn").href = visit; $("#ctaWa").href = visit; $("#heroVisit").href = visit;
["#ctaWa","#heroVisit"].forEach(s => { $(s).target = "_blank"; $(s).rel = "noopener"; });

// قائمة الجوال
const burger = $("#burger"), menu = $("#menu");
burger.addEventListener("click", () => burger.setAttribute("aria-expanded", menu.classList.toggle("open")));
menu.addEventListener("click", e => { if(e.target.tagName === "A"){ menu.classList.remove("open"); burger.setAttribute("aria-expanded","false"); }});

// عدّاد الأرقام
const io = new IntersectionObserver(es => es.forEach(en => {
  if(!en.isIntersecting) return; io.unobserve(en.target);
  const el = en.target, to = +el.dataset.count, t0 = performance.now();
  (function tick(t){ const k = Math.min((t-t0)/1200,1); el.textContent = fmt(Math.round(to*k)); if(k<1) requestAnimationFrame(tick); })(t0);
}), {threshold:.6});
document.querySelectorAll("[data-count]").forEach(el => io.observe(el));

// نموذج التواصل → واتساب
$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target, note = $("#formNote"), name = f.name.value.trim(), phone = f.phone.value.trim();
  const okPhone = /^(05\d{8}|\+?9665\d{8})$/.test(phone.replace(/\s/g,""));
  f.name.classList.toggle("bad", !name); f.phone.classList.toggle("bad", !okPhone);
  if(!name || !okPhone){ note.className="note err"; note.textContent="فضلًا أدخل الاسم ورقم جوال سعودي صحيح."; return; }
  const text = `الاسم: ${name}\nالجوال: ${phone}\nالطلب: ${f.topic.value}\n${f.msg.value.trim()}`;
  window.open(wa(text), "_blank", "noopener");
  note.className="note"; note.textContent="شكرًا لك! تم تجهيز رسالتك في واتساب.";
});

$("#yr").textContent = new Date().getFullYear();
$("#upd").textContent = UPDATED;
$("#statAvail").textContent = fmt(PROJECTS.reduce((s,p) => s + units(p), 0));
renderDistricts();
render();
