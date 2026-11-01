/* ================================================================
   بيانات الموقع. المصدر: الملف التعريفي 2026-2027 وصفحة Linktree
   الرسمية (linktr.ee/sukoonc.2030). ما هو (تجريبي) يُستبدل.
   ================================================================ */

const CONFIG = {
  sales: '966544383891',   // المبيعات 2 من Linktree (المبيعات 3: 966533017253)
};

const EN = {
  'nav.about': 'About', 'nav.projects': 'Projects', 'nav.invest': 'Invest', 'nav.guarantees': 'Guarantees', 'nav.contact': 'Contact',
  'cta.book': 'Book your unit', 'cta.projects': 'Explore projects', 'cta.invest': 'Investment returns',
  'scene.alt': 'Sukoon residential building',
  'hero.eyebrow': 'Development · Contracting · Marketing — Jeddah',
  'hero.l1': 'From the blueprint…', 'hero.l2': 'to a home you live in',
  'hero.lead': 'We don’t just build units. We create complete environments that embrace everyday life and give you comfort and belonging.',
  'hero.scroll': 'Scroll to watch it being built',
  'sc.s1': 'We plan with precision', 'sc.s1p': 'A careful read of the market, and layouts that give residents comfort and privacy.',
  'sc.s2': 'We build with quality', 'sc.s2p': 'Execution expertise that holds to the plans and to every detail.',
  'sc.s3': 'And hand you a calm that lasts', 'sc.done': 'projects successfully completed', 'sc.units': 'units in our portfolio',
  'rail.1': 'Plan', 'rail.2': 'Build', 'rail.3': 'Deliver',
  'ab.kicker': 'Sukoon… where the story begins', 'ab.title': 'In a world of look-alike projects, we chose a different path',
  'ab.p1': 'Sukoon Al Mabani specialises in residential real estate development, starting from real market needs and delivering solutions that combine careful planning, efficient execution and lasting value, backed by in-house contracting and marketing.',
  'ab.q': '“Sukoon” is not only calm. It is a balance of quality, beauty and function.',
  'ab.n1': 'years of experience', 'ab.n2': 'residential units', 'ab.n3': 'completed projects', 'ab.n4': 'projects in development',
  'sv.kicker': 'What we craft', 'sv.title': 'One integrated system: development, contracting and marketing',
  'pj.kicker': 'Projects on the ground', 'pj.title': 'Sukoon by numbers: from 101 to 122',
  'iv.kicker': 'Investment returns', 'iv.title': 'From home to investment… value that lasts',
  'iv.sub': 'Units can be used for annual rent, daily (short-stay) rental, or resale.',
  'iv.amt': 'Investment amount', 'iv.sar': 'SAR', 'iv.fine': 'Indicative figures from the company profile, not a guaranteed return.',
  'gu.kicker': 'Guarantees', 'gu.title': 'Clear technical guarantees, and service after handover',
  'jr.kicker': 'Our development journey', 'jr.title': 'Eight steps, from your idea to your keys',
  'sh.kicker': 'Retail shops', 'sh.title': 'A retail frontage on Al-Sitteen Street',
  'sh.p': 'Shops that combine build quality, a strong location and investment value, on one of Jeddah’s busiest streets.',
  'sh.cta': 'Ask about the shops',
  'ld.kicker': 'Leadership', 'ld.title': 'Our success is in how we deliver, and the impact we leave',
  'pt.kicker': 'Partners in success', 'pt.title': 'Partnerships that build the future', 'pt.alt': 'Sukoon partners',
  'ct.kicker': 'Contact us', 'ct.title': 'Start your journey with Sukoon', 'ct.sub': 'Send your interest and our sales team will contact you directly.',
  'ct.unified': 'Unified number', 'ct.sales': 'Sales (WhatsApp)', 'ct.office': 'Head office', 'ct.map': 'Open on the map →',
  'f.t.buy': 'Buy a unit', 'f.t.invest': 'Invest', 'f.t.shop': 'Retail shop', 'f.t.other': 'Other',
  'f.name': 'Name', 'f.phone': 'Mobile', 'f.project': 'Project', 'f.budget': 'Approximate budget', 'f.msg': 'Notes',
  'f.msg.ph': 'Bedrooms, preferred district, best time to call', 'f.send': 'Send to sales on WhatsApp',
  'ft.about': 'Building the future… real estate development, contracting and marketing in Jeddah.',
  'ft.links': 'Links', 'ft.contact': 'Contact', 'ft.city': 'Jeddah, Saudi Arabia', 'ft.rights': 'Sukoon Al Mabani Real Estate Development. All rights reserved.',
};

const UI = {
  ar: {
    all: 'الكل', interest: 'أبدِ اهتمامك', photos: 'صور المشروع', soon: 'الصور تُضاف قريباً',
    status: { ready: 'جاهز للإفراغ', building: 'تحت الإنشاء', done: 'مكتمل ومسلّم', dev: 'قيد التطوير', retail: 'تجاري' },
    perYear: 'سنوياً', anyProject: 'غير محدد',
    budgets: ['غير محدد', 'أقل من 800 ألف', '800 ألف – 1.2 مليون', '1.2 – 2 مليون', 'أكثر من 2 مليون'],
    err: 'فضلاً أدخل الاسم ورقم الجوال.', sent: 'جهّزنا رسالتك، أرسلها من واتساب.',
    head: { buy: 'اهتمام بشراء وحدة', invest: 'اهتمام بالاستثمار', shop: 'استفسار عن المحلات التجارية', other: 'استفسار' },
    f: { name: 'الاسم', phone: 'الجوال', project: 'المشروع', budget: 'الميزانية', msg: 'ملاحظات' },
    projMsg: n => `مرحباً، أرغب بمعلومات عن مشروع ${n}`,
  },
  en: {
    all: 'All', interest: 'Register interest', photos: 'Project photos', soon: 'Photos coming soon',
    status: { ready: 'Ready to transfer', building: 'Under construction', done: 'Completed', dev: 'In development', retail: 'Retail' },
    perYear: 'per year', anyProject: 'Not specified',
    budgets: ['Not specified', 'Under 800K', '800K – 1.2M', '1.2M – 2M', 'Over 2M'],
    err: 'Please enter your name and mobile number.', sent: 'Your message is ready, send it from WhatsApp.',
    head: { buy: 'Interest in buying a unit', invest: 'Investment interest', shop: 'Retail shops enquiry', other: 'Enquiry' },
    f: { name: 'Name', phone: 'Mobile', project: 'Project', budget: 'Budget', msg: 'Notes' },
    projMsg: n => `Hello, I would like information about ${n}`,
  },
};

const SERVICES = [
  { n: '01', img: 'svc-dev', t: { ar: 'نطوّر برؤية', en: 'We develop with vision' }, s: { ar: 'التطوير العقاري', en: 'Real estate development' },
    d: { ar: 'مشاريع سكنية تنطلق من فهم احتياجات السوق، وتجمع بين جودة التخطيط ووضوح الرؤية والقيمة طويلة الأمد.', en: 'Residential projects built on real market needs, combining careful planning, clear vision and long-term value.' } },
  { n: '02', img: 'svc-build', t: { ar: 'نشيّد بثقة', en: 'We build with confidence' }, s: { ar: 'المقاولات', en: 'Contracting' },
    d: { ar: 'خبرات تنفيذية تضمن الالتزام بالمخططات وجودة الأعمال وكفاءة المتابعة في كل مراحل التنفيذ.', en: 'Execution expertise that ensures adherence to plans, quality workmanship and close follow-up at every stage.' } },
  { n: '03', img: 'svc-market', t: { ar: 'نصل بفاعلية', en: 'We reach effectively' }, s: { ar: 'التسويق العقاري', en: 'Real estate marketing' },
    d: { ar: 'حلول تسويقية مدروسة تبرز قيمة المشاريع وتوصلها للشرائح المستهدفة باحترافية.', en: 'Considered marketing that highlights each project’s value and reaches the right buyers professionally.' } },
];

/* status: ready | building | done | dev | retail — links: مجلدات الصور من Linktree */
const PROJECTS = [
  { code: '119', name: { ar: 'سكون 119 «أزورا»', en: 'Sukoon 119 "Azura"' }, district: { ar: 'حي الحمراء', en: 'Al-Hamra' }, status: 'building', img: 's119',
    link: 'https://drive.google.com/drive/folders/1tcK0LSGp39x_wneukL7y-y5IMef3Fb6y?usp=sharing' },
  { code: '120-121', name: { ar: 'سكون 120 – 121', en: 'Sukoon 120 – 121' }, district: { ar: 'حي الورود', en: 'Al-Wurood' }, status: 'building',
    link: 'https://drive.google.com/drive/folders/1cxnF_uQanoMiJENZ-MI3UfAusGaCQNnr?usp=drive_link' },
  { code: '117', name: { ar: 'سكون 117', en: 'Sukoon 117' }, district: { ar: 'حي النعيم', en: 'Al-Naeem' }, status: 'ready',
    link: 'https://drive.google.com/drive/folders/1ma_5ERh3GDaSCWiU_L_H0Cd3xeX2KZse?usp=drive_link' },
  { code: '122', name: { ar: 'سكون 122', en: 'Sukoon 122' }, district: { ar: 'جدة', en: 'Jeddah' }, status: 'dev' },
  { code: 'shops', name: { ar: 'المحلات التجارية', en: 'Retail shops' }, district: { ar: 'شارع الستين', en: 'Al-Sitteen St.' }, status: 'retail', img: 'shops' },
  { code: '112-115', name: { ar: 'سكون 112 – 115', en: 'Sukoon 112 – 115' }, district: { ar: 'جدة', en: 'Jeddah' }, status: 'done', img: 'p112' },
  { code: '108-109', name: { ar: 'سكون 108 – 109', en: 'Sukoon 108 – 109' }, district: { ar: 'جدة', en: 'Jeddah' }, status: 'done', img: 'p108' },
  { code: '105-106', name: { ar: 'سكون 105 – 106', en: 'Sukoon 105 – 106' }, district: { ar: 'جدة', en: 'Jeddah' }, status: 'done', img: 'p105' },
];
const FILTERS = [
  { id: 'all' }, { id: 'available', ar: 'متاح الآن', en: 'Available now', match: ['ready', 'building', 'retail'] },
  { id: 'building', ar: 'تحت الإنشاء', en: 'Under construction', match: ['building', 'dev'] },
  { id: 'done', ar: 'مكتمل', en: 'Completed', match: ['done'] },
];

const RETURNS = [
  { min: 9, max: 10, t: { ar: 'الإيجار السنوي', en: 'Annual rent' }, d: { ar: 'دخل ثابت ومستقر', en: 'Steady, predictable income' } },
  { min: 11, max: 13, t: { ar: 'الاستثمار اليومي', en: 'Daily rental' }, d: { ar: 'تأجير قصير المدى', en: 'Short-stay rental' } },
  { min: 20, max: 27, t: { ar: 'إعادة البيع', en: 'Resale' }, d: { ar: 'نمو قيمة الوحدة', en: 'Capital appreciation' } },
];

const GUARANTEES = [
  { n: '15', u: { ar: 'سنة', en: 'years' }, t: { ar: 'ضمان الهيكل الإنشائي', en: 'Structural frame warranty' }, icon: 'M4 20V9l8-5 8 5v11M8 20v-7h8v7M4 13h16' },
  { n: '25', u: { ar: 'سنة', en: 'years' }, t: { ar: 'ضمان الأفياش والقواطع والأسلاك الكهربائية', en: 'Sockets, breakers & electrical wiring' }, icon: 'M9 3v5M15 3v5M6 8h12v4a6 6 0 0 1-12 0V8ZM12 18v3' },
  { n: '2', u: { ar: 'سنتان', en: 'years' }, t: { ar: 'ضمان أعمال السباكة الداخلية والكهرباء', en: 'Internal plumbing & electrical works' }, icon: 'M5 4h6v5h6a3 3 0 0 1 3 3v2h-4v-1a1 1 0 0 0-1-1H5V4ZM18 17v3' },
  { n: '1', u: { ar: 'عام كامل', en: 'full year' }, t: { ar: 'إدارة اتحاد الملاك بعد التسليم', en: 'Owners’ association management after handover' }, icon: 'M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6M9 10h.01M15 10h.01' },
];

const STEPS = [
  { ar: 'نفهم احتياجك', en: 'We understand your needs' }, { ar: 'نختار الموقع المناسب', en: 'We choose the right site' },
  { ar: 'نحدد أفضل فكرة للمشروع', en: 'We define the best concept' }, { ar: 'نطوّر التصميم والواجهات', en: 'We design layouts & facades' },
  { ar: 'ننفذ المشروع', en: 'We build the project' }, { ar: 'نسوّق المشروع', en: 'We market the project' },
  { ar: 'ندير المبيعات حتى اكتمالها', en: 'We manage sales to completion' }, { ar: 'نسلّمك النتيجة', en: 'We hand you the result' },
];

const QUOTES = [
  { who: { ar: 'أ. عدنان متولّي', en: 'Mr. Adnan Metwally' }, role: { ar: 'رئيس مجلس الإدارة', en: 'Chairman' },
    q: { ar: 'نجاحنا بالنسبة لنا لا يقتصر على إنجاز العمل، بل في الطريقة التي ننجزه بها، والأثر الذي نتركه وراءنا.', en: 'For us, success is not only getting the work done, but how we do it and the impact we leave behind.' } },
  { who: { ar: 'أ. حسين حجر', en: 'Mr. Hussein Hajar' }, role: { ar: 'المدير العام', en: 'General Manager' },
    q: { ar: 'نواصل مسيرتنا بثقة وطموح، لنكون شريكاً يُعتمد عليه واسماً يرتبط بالتميز.', en: 'We move forward with confidence and ambition, to be a partner you can rely on and a name linked with excellence.' } },
  { who: { ar: 'أ. وحيد الشرفي', en: 'Mr. Waheed Al-Sharafi' }, role: { ar: 'المدير التنفيذي', en: 'CEO' },
    q: { ar: 'نسعى إلى بناء منظومة قادرة على الاستجابة للمتغيرات، وتحقيق نمو مستدام، وتعزيز القيمة التي نقدمها لعملائنا.', en: 'We are building a system that adapts to change, grows sustainably and adds value for our clients and partners.' } },
];

const VALUES = [
  { t: { ar: 'الالتزام', en: 'Commitment' }, s: { ar: 'في كل وعد', en: 'in every promise' } },
  { t: { ar: 'الجودة', en: 'Quality' }, s: { ar: 'في كل تفصيلة', en: 'in every detail' } },
  { t: { ar: 'الابتكار', en: 'Innovation' }, s: { ar: 'في كل مشروع', en: 'in every project' } },
  { t: { ar: 'الاحترافية', en: 'Professionalism' }, s: { ar: 'في كل مرحلة', en: 'at every stage' } },
  { t: { ar: 'الشفافية', en: 'Transparency' }, s: { ar: 'في كل تعامل', en: 'in every dealing' } },
];
