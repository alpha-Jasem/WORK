// بيانات تجريبية — استبدلها ببيانات الشركة الفعلية
const WA = "966500000000";
const PROPS = [
  {t:"فيلا فاخرة بتصميم عصري",c:"الرياض",d:"حي الملقا",deal:"بيع",type:"فيلا",beds:5,baths:6,area:420,price:3200000,g:["#1b4a84","#0b1f3a"]},
  {t:"شقة بإطلالة بحرية",c:"جدة",d:"أبحر الشمالية",deal:"بيع",type:"شقة",beds:3,baths:3,area:165,price:1150000,g:["#2c6e7a","#0d2c3a"]},
  {t:"أرض تجارية على شارع رئيسي",c:"الدمام",d:"حي الشاطئ",deal:"بيع",type:"أرض",beds:0,baths:0,area:1200,price:5400000,g:["#b88a2a","#5b4311"]},
  {t:"شقة عائلية مفروشة",c:"الرياض",d:"حي النرجس",deal:"إيجار",type:"شقة",beds:2,baths:2,area:120,price:52000,per:"سنويًا",g:["#3a4f8a","#14234a"]},
  {t:"معرض تجاري في موقع حيوي",c:"مكة المكرمة",d:"العزيزية",deal:"إيجار",type:"تجاري",beds:0,baths:1,area:240,price:180000,per:"سنويًا",g:["#7a4a2c","#2d1a0d"]},
  {t:"فيلا دوبلكس مع مسبح",c:"جدة",d:"حي الشاطئ",deal:"بيع",type:"فيلا",beds:6,baths:7,area:550,price:4750000,g:["#1f6b5a","#0a2b24"]},
];
const ICON = {"فيلا":"⌂","شقة":"▦","أرض":"◪","تجاري":"▣"};
const $ = (s, r=document) => r.querySelector(s);
const fmt = n => n.toLocaleString("ar-SA");
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

const state = {deal:"", type:"", city:""};

function render(){
  const list = PROPS.filter(p => (!state.deal||p.deal===state.deal) && (!state.type||p.type===state.type) && (!state.city||p.c===state.city));
  $("#cards").innerHTML = list.map(p => {
    const msg = encodeURIComponent(`السلام عليكم، أرغب بالاستفسار عن: ${p.t} - ${p.c}`);
    return `<article class="card">
      <div class="thumb" style="background:linear-gradient(135deg,${p.g[0]},${p.g[1]})"><span aria-hidden="true">${ICON[p.type]}</span>
        <span class="badge ${p.deal==="إيجار"?"rent":""}">${p.deal==="بيع"?"للبيع":"للإيجار"}</span></div>
      <div class="body"><h3>${esc(p.t)}</h3><p class="loc">${esc(p.c)} — ${esc(p.d)}</p>
        <div class="meta"><span>${fmt(p.area)} م²</span>${p.beds?`<span>${p.beds} غرف</span>`:""}${p.baths?`<span>${p.baths} حمامات</span>`:""}</div>
        <div class="price"><b>${fmt(p.price)} ر.س${p.per?` <small>${p.per}</small>`:""}</b>
        <a href="https://wa.me/${WA}?text=${msg}" target="_blank" rel="noopener">استفسر ←</a></div></div></article>`;
  }).join("");
  $("#empty").hidden = list.length > 0;
}

// فلاتر
$("#chips").addEventListener("click", e => {
  const b = e.target.closest(".chip"); if(!b) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c===b));
  state.type = b.dataset.f; render();
});
$("#searchForm").addEventListener("submit", e => {
  e.preventDefault();
  Object.assign(state, Object.fromEntries(new FormData(e.target)));
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.f===state.type));
  render(); $("#properties").scrollIntoView({behavior:"smooth"});
});

// قائمة الجوال
const burger = $("#burger"), menu = $("#menu");
burger.addEventListener("click", () => burger.setAttribute("aria-expanded", menu.classList.toggle("open")));
menu.addEventListener("click", e => { if(e.target.tagName==="A"){ menu.classList.remove("open"); burger.setAttribute("aria-expanded","false"); }});

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
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  note.className="note"; note.textContent="شكرًا لك! تم تجهيز رسالتك في واتساب.";
});

$("#yr").textContent = new Date().getFullYear();
render();
