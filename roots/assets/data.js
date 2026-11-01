/* ================================================================
   بيانات الموقع. كل ما هو (تجريبي) يجب استبداله ببيانات الشركة.
   المصدر: الموقع الحالي arabian-roots.com (نصوص، صور، أرقام).
   ================================================================ */

const CONFIG = {
  // (تجريبي) رقم واتساب غير معروف — استبدله برقم الشركة الفعلي (بدون + أو أصفار بادئة)
  whatsapp: '966500000000',
  // (تجريبي) إيميلات الأقسام غير معروفة — الافتراضي يذهب إلى info@ الحقيقي
  routes: {
    rfq:      { email: 'sales.demo@arabian-roots.com',       wa: '966500000000' },
    client:   { email: 'info@arabian-roots.com',             wa: '966500000000' },
    supplier: { email: 'procurement.demo@arabian-roots.com', wa: '966500000000' },
    investor: { email: 'ir.demo@arabian-roots.com',          wa: '966500000000' },
  },
};

/* ---------- الترجمة الإنجليزية (العربية مكتوبة داخل index.html) ---------- */
const EN = {
  'brand.name': 'Roots Group Arabia',
  'nav.divisions': 'Divisions', 'nav.projects': 'Projects', 'nav.catalog': 'Catalog', 'nav.history': 'History', 'nav.contact': 'Contact',
  'cta.rfq': 'Request a quote', 'cta.projects': 'Explore our projects',
  'hero.eyebrow': 'Since 1981 · Jeddah, Saudi Arabia',
  'hero.l1': 'We supply, manufacture,', 'hero.l2': 'and build the Kingdom',
  'hero.lead': 'One integrated platform for construction: distribution of materials and equipment, Group-owned factories, and design & build for major projects.',
  'hero.scroll': 'Scroll down',
  'reveal.alt': 'Railway station project render',
  'reveal.eyebrow': 'More than', 'reveal.unit': 'billion SAR',
  'reveal.lead': 'of executed projects, from airports and universities to hospitals and hotels.',
  'num.kicker': 'The Group in numbers', 'num.title': 'Four decades of building trust',
  'num.years': 'years in the Saudi market', 'num.m': 'M', 'num.sales': 'SAR sales revenue', 'num.staff': 'employees',
  'num.projects': 'projects successfully delivered', 'num.plants': 'production facilities', 'num.wh': 'warehouses',
  'div.kicker': 'Three divisions, one platform', 'div.title': 'From source to installation',
  'div.sub': 'We source the widest range of products for construction, make our own in Group factories, and deliver turn-key projects from concept to installation.',
  'proj.kicker': 'A journey through our projects', 'proj.title': 'Work you see in landmarks across the Kingdom and the world',
  'his.kicker': 'Our history', 'his.title': 'From Jeddah in 1981 to projects on three continents',
  'cat.kicker': 'Products & services catalog', 'cat.title': 'Everything your project needs, from one source',
  'cat.sub': 'Pick products, add them to your quotation request, and our sales team will get back to you.',
  'cat.search': 'Search a product or company',
  'br.kicker': 'Global brands we supply', 'br.title': 'Partnerships with the world’s leading manufacturers', 'br.cos': 'Group companies',
  'ct.kicker': 'Contact us', 'ct.title': 'Let’s start your next project',
  'ct.sub': 'Tell us who you are and we route your message straight to the right department, by WhatsApp or email.',
  'ct.hq': 'Headquarters', 'ct.addr': 'Roots Group Building, Prince Sultan Street, Al Nahda District, P.O. Box 52269, Jeddah 21563',
  'ct.phone': 'Phone', 'ct.email': 'Email',
  'ct.t.rfq': 'Quotation', 'ct.t.client': 'Client', 'ct.t.supplier': 'Supplier', 'ct.t.investor': 'Investor',
  'ct.cart': 'Selected products',
  'f.name': 'Name', 'f.company': 'Company', 'f.phone': 'Mobile', 'f.email': 'Email', 'f.project': 'Project name', 'f.city': 'City',
  'f.division': 'Division', 'f.date': 'Required delivery date', 'f.msg': 'Details', 'f.msg.ph': 'Quantities, specifications, any notes',
  'f.wa': 'Send via WhatsApp', 'f.mail': 'Send by email',
  'ft.about': 'A group of companies operating as one integrated platform serving the construction sector in Saudi Arabia since 1981.',
  'ft.links': 'Links', 'ft.contact': 'Contact', 'ft.city': 'Jeddah, Saudi Arabia', 'ft.rights': 'Roots Group Arabia. All rights reserved.',
};

/* نصوص تُبنى بالجافاسكربت */
const UI = {
  ar: {
    all: 'الكل', add: 'أضف للطلب', added: 'أُضيف ✓', results: n => `${n} منتج وخدمة`, none: 'لا توجد نتائج مطابقة.',
    companies: 'الشركات', remove: 'إزالة', anyDiv: 'غير محدد',
    note: { rfq: 'أرسل طلبك لفريق المبيعات مع قائمة المنتجات.', client: 'استفسار عام أو متابعة مشروع قائم.', supplier: 'هل تريد أن تكون مورّدًا للمجموعة؟ عرّفنا بشركتك ومنتجاتك.', investor: 'للمستثمرين والشراكات الاستراتيجية.' },
    routeTo: (e) => `يصل إلى: ${e}`,
    err: 'فضلاً أدخل الاسم ورقم الجوال.', sent: 'فتحنا لك الرسالة جاهزة، أرسلها من التطبيق.',
    msgHead: { rfq: 'طلب عرض سعر', client: 'استفسار عميل', supplier: 'طلب تسجيل مورّد', investor: 'استفسار مستثمر' },
    f: { name: 'الاسم', company: 'الشركة', phone: 'الجوال', email: 'البريد', project: 'المشروع', city: 'المدينة', division: 'القسم', date: 'موعد التوريد', msg: 'التفاصيل', items: 'المنتجات' },
    proj: { location: 'الموقع', role: 'دورنا', soon: 'صور المشروع تضاف لاحقاً' },
    divMore: 'شركات القسم',
  },
  en: {
    all: 'All', add: 'Add to quote', added: 'Added ✓', results: n => `${n} products & services`, none: 'No matching results.',
    companies: 'Companies', remove: 'Remove', anyDiv: 'Not specified',
    note: { rfq: 'Send your request to our sales team along with your product list.', client: 'General enquiry or follow-up on an existing project.', supplier: 'Want to supply the Group? Tell us about your company and products.', investor: 'For investors and strategic partnerships.' },
    routeTo: (e) => `Goes to: ${e}`,
    err: 'Please enter your name and mobile number.', sent: 'Your message is ready, send it from the app.',
    msgHead: { rfq: 'Quotation request', client: 'Client enquiry', supplier: 'Supplier registration', investor: 'Investor enquiry' },
    f: { name: 'Name', company: 'Company', phone: 'Mobile', email: 'Email', project: 'Project', city: 'City', division: 'Division', date: 'Delivery date', msg: 'Details', items: 'Products' },
    proj: { location: 'Location', role: 'Our role', soon: 'Project photos coming soon' },
    divMore: 'Division companies',
  },
};

/* ---------- الأقسام الثلاثة ---------- */
const DIVISIONS = [
  { id: 'dist', img: 'hawk-yard', num: '01',
    name: { ar: 'التوزيع والمعدات', en: 'Distribution & Machinery' },
    desc: { ar: 'توزيع بالجملة للمشاريع الكبرى والمعقدة، وتجزئة للحرفيين المحترفين، وحلول توليد الطاقة ومعدات الرفع.', en: 'Wholesale distribution for large customers and complex projects, retail for professional craftsmen, plus power generation and lifting equipment.' },
    cos: ['Building Materials', 'Hawk PG', 'Smart Steel Solutions', 'SPD'] },
  { id: 'mfg', img: 'ametal-plant', num: '02',
    name: { ar: 'التصنيع', en: 'Manufacturing' },
    desc: { ar: 'مصانع مملوكة للمجموعة بشهادات ISO تمنحنا التحكم في سلسلة التوريد والجودة والتسليم في الموعد.', en: 'ISO-certified Group-owned plants that give us control over supply chain, quality and on-time delivery.' },
    cos: ['A-Metal', 'MASCO (Metal Artwork)', 'Top Factory'] },
  { id: 'dnb', img: 'kaia-hall', num: '03',
    name: { ar: 'التصميم والبناء', en: 'Design & Build' },
    desc: { ar: 'مشاريع تسليم المفتاح من الفكرة إلى التركيب: تصميم وتخطيط وتوريد ونقل وتخليص وتشطيب كامل.', en: 'Turn-key projects from concept to installation: design, planning, procurement, transport, clearance and full finishing.' },
    cos: ['Mimar International', 'SUW Waterproofing', 'SPD'] },
];

/* ---------- المشاريع (من صفحة Design & Build وMimar في الموقع الحالي) ---------- */
const PROJECTS = [
  { img: ['kaia-aerial2', 'kaia-hall', 'dome'], name: { ar: 'مطار الملك عبدالعزيز الدولي', en: 'King Abdulaziz International Airport' },
    loc: { ar: 'جدة', en: 'Jeddah' }, role: { ar: 'مقاولات التشطيبات الداخلية، واستشاري التصميم الداخلي الرئيسي، وتوريد الأثاث والتجهيزات (Mimar International)', en: 'Fit-out contracting, lead interior design consultant and FF&E procurement (Mimar International)' } },
  { img: ['station'], name: { ar: 'محطة سكة حديد L515', en: 'L515 Railway Station' },
    loc: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' }, role: { ar: 'تصور المشروع من الموقع الحالي (التفاصيل تُضاف)', en: 'Project render from the current site (details to be added)' } },
  { name: { ar: 'جامعة الأميرة نورة بنت عبدالرحمن', en: 'Princess Nourah University' }, loc: { ar: 'الرياض', en: 'Riyadh' }, role: { ar: 'التصميم والبناء', en: 'Design & Build' } },
  { name: { ar: 'جامعة الملك عبدالله للعلوم والتقنية', en: 'King Abdullah University of Science & Technology' }, loc: { ar: 'ثول', en: 'Thuwal' }, role: { ar: 'التصميم والبناء', en: 'Design & Build' } },
  { name: { ar: 'جامعة الملك سعود', en: 'King Saud University' }, loc: { ar: 'الرياض', en: 'Riyadh' }, role: { ar: 'التصميم والبناء', en: 'Design & Build' } },
  { name: { ar: 'صندوق الملك عبدالله للأوقاف', en: 'King Abdullah Endowment Fund' }, loc: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' }, role: { ar: 'التصميم والبناء', en: 'Design & Build' } },
  { name: { ar: 'مطار هيثرو - المبنى 2A', en: 'Heathrow Airport Terminal 2A' }, loc: { ar: 'لندن', en: 'London' }, role: { ar: 'مشروع عالمي', en: 'Global commission' } },
  { name: { ar: 'محطة بلاكفرايرز', en: 'Blackfriars Station' }, loc: { ar: 'لندن', en: 'London' }, role: { ar: 'مشروع عالمي', en: 'Global commission' } },
  { name: { ar: 'سفينة بريتانيا السياحية', en: 'Britannia Cruise Ship' }, loc: { ar: 'المملكة المتحدة', en: 'United Kingdom' }, role: { ar: 'مشروع عالمي', en: 'Global commission' } },
  { name: { ar: 'فندق فور سيزونز موسكو', en: 'Four Seasons Moscow' }, loc: { ar: 'موسكو', en: 'Moscow' }, role: { ar: 'مشروع عالمي', en: 'Global commission' } },
  { name: { ar: 'جامعة زايد', en: 'Zayed University' }, loc: { ar: 'أبوظبي', en: 'Abu Dhabi' }, role: { ar: 'مشروع عالمي', en: 'Global commission' } },
];

/* ---------- الخط الزمني (سنوات من الموقع الحالي) ---------- */
const TIMELINE = [
  { y: '1981', t: { ar: 'تأسيس المجموعة في جدة', en: 'Group founded in Jeddah' }, d: { ar: 'البداية كمورّد متخصص لقطاع البناء في المملكة.', en: 'Started as a specialist supplier to the Saudi construction sector.' } },
  { y: '1990', t: { ar: 'تأسيس MASCO', en: 'MASCO established' }, d: { ar: 'مصنع الأعمال المعدنية: أبواب، بوابات زخرفية، هياكل فولاذية.', en: 'Metalworks plant: doors, decorative gates, steel structures.' } },
  { y: '1995', t: { ar: 'انطلاق تجارة الجملة', en: 'Wholesale trading begins' }, d: { ar: 'ذراع مواد البناء يبدأ نشاط التوزيع بالجملة.', en: 'The building materials arm starts wholesale distribution.' } },
  { y: '1996', t: { ar: 'تأسيس Top Factory', en: 'Top Factory founded' }, d: { ar: 'أعمال خشبية وأثاث مخصص لأفخم الفنادق والمستشفيات والجامعات.', en: 'Custom woodwork and furniture for top hotels, hospitals and campuses.' } },
  { y: '2001', t: { ar: 'أول مصنع لـ A-Metal', en: 'First A-Metal plant' }, d: { ar: 'افتتاح المصنع في المدينة الصناعية الأولى بجدة (تأسست الشركة عام 2000).', en: 'Plant opened in Jeddah 1st Industrial City (company founded in 2000).' } },
  { y: '2015', t: { ar: 'مصنع A-Metal الثاني', en: 'Second A-Metal plant' }, d: { ar: 'مصنع حديث بشهادة ISO يدخل التشغيل الكامل.', en: 'A state-of-the-art ISO-certified plant becomes fully operational.' } },
  { y: '2024', t: { ar: 'تركيز متجدد', en: 'Renewed focus' }, d: { ar: 'تركيز على المقاولات التخصصية الأعلى ربحية، والاستفادة من نمو الاقتصاد السعودي.', en: 'Focus on specialised, higher-margin contracting and Saudi economic growth.' } },
];

/* ---------- الكتالوج (المنتجات من صفحات الشركات في الموقع الحالي) ---------- */
const CATS = [
  { id: 'ceil', ar: 'أسقف وقواطع', en: 'Ceilings & partitions' },
  { id: 'metal', ar: 'أعمال معدنية', en: 'Metalworks' },
  { id: 'wood', ar: 'أعمال خشبية', en: 'Woodwork' },
  { id: 'power', ar: 'طاقة ومعدات', en: 'Power & equipment' },
  { id: 'acoustic', ar: 'عزل صوتي', en: 'Acoustics' },
  { id: 'water', ar: 'عزل مائي وحراري', en: 'Waterproofing & insulation' },
  { id: 'materials', ar: 'مواد بناء وتشطيب', en: 'Building & finishing materials' },
];
const P = (cat, co, img, ar, en) => ({ cat, co, img, name: { ar, en } });
const PRODUCTS = [
  P('ceil', 'A-Metal', 'ametal-line', 'أنظمة الأسقف المعلّقة وبلاطاتها', 'Suspended ceiling grid & tiles'),
  P('ceil', 'A-Metal', 'ametal-plant', 'أنظمة الجبس والقواطع الجافة', 'Drywall partition & ceiling systems'),
  P('metal', 'A-Metal', 'ametal-line', 'حوامل الكابلات والقنوات المعدنية', 'Cable trays & channels'),
  P('metal', 'A-Metal', 'factory-roof', 'أنظمة التثبيت الميكانيكي والبراغي', 'Mechanical fixing systems, bolts & nuts'),
  P('metal', 'A-Metal', 'masco-steel', 'الدرابزين والحواجز', 'Balustrades & handrails'),
  P('metal', 'MASCO', 'masco-steel', 'أبواب معدنية من العادية حتى المقاومة للرصاص', 'Hollow metal doors, non-fire rated to bullet-proof'),
  P('metal', 'MASCO', 'masco-screen', 'بوابات وتشطيبات زخرفية', 'Decorative gates & finishes'),
  P('metal', 'MASCO', 'masco-brass', 'تشطيبات نحاسية ومسبوكات معدنية', 'Brass finishes & metal castings'),
  P('metal', 'MASCO', 'factory-roof', 'هياكل فولاذية وإطارات فراغية', 'Steel structures & space frames'),
  P('wood', 'Top Factory', 'top-interior', 'أعمال خشبية مخصصة', 'Custom woodwork & joinery'),
  P('wood', 'Top Factory', 'top-outdoor', 'أثاث مخصص وأسطح صلبة', 'Custom furniture & solid surfaces'),
  P('power', 'Hawk PG', 'hawk-gensets', 'مولدات ديزل من 10 إلى 5300 kVA', 'Diesel generator sets, 10 to 5300 kVA'),
  P('power', 'Hawk PG', 'hawk-yard', 'تأجير المولدات ومشاريع الطاقة المتكاملة', 'Generator rental & turn-key power projects'),
  P('power', 'Hawk PG', 'hawk-yard', 'أبراج إنارة بالديزل والطاقة الشمسية', 'Diesel & solar tower lights'),
  P('power', 'Hawk PG', 'factory', 'معدات رفع الأفراد (Haulotte)', 'People-lifting equipment (Haulotte)'),
  P('acoustic', 'Smart Steel Solutions', 'sss-tanks', 'حاويات عازلة للصوت للمولدات', 'Soundproof generator enclosures'),
  P('acoustic', 'Smart Steel Solutions', 'sss-gensets', 'معالجة صوتية لغرف المولدات', 'Generator room sound treatment'),
  P('acoustic', 'Smart Steel Solutions', 'sss-gensets', 'فتحات تهوية صوتية ومخمدات', 'Acoustic louvers & sound attenuators'),
  P('power', 'Smart Steel Solutions', 'sss-tanks2', 'خزانات ديزل أسطوانية ومستطيلة', 'Cylindrical & rectangular diesel tanks'),
  P('power', 'Smart Steel Solutions', 'sss-tanks', 'مقطورات المولدات ولوحات كهربائية', 'Generator trailers & electric panels'),
  P('water', 'SUW', 'suw-3', 'العزل المائي EPDM وPVC', 'EPDM & PVC waterproofing'),
  P('water', 'SUW', 'suw-1', 'حقن الإيبوكسي والخرسانة', 'Epoxy & concrete injection'),
  P('water', 'SUW', 'suw-2', 'عزل الأقبية والأسقف والمناطق الرطبة', 'Basement, roof & wet-area waterproofing'),
  P('water', 'SUW', 'suw-1', 'العزل الحراري بالبولي يوريثان', 'Polyurethane thermal insulation'),
  P('materials', 'Building Materials', 'mimar-interior', 'أسقف معدنية ومعمارية (Hunter Douglas, Knauf)', 'Architectural ceilings (Hunter Douglas, Knauf)'),
  P('materials', 'Building Materials', 'top-interior', 'إكسسوارات الأثاث والأبواب (Häfele)', 'Furniture & door hardware (Häfele)'),
  P('materials', 'Building Materials', 'dome', 'أدوات صحية وأنابيب (Ideal Standard, Wavin)', 'Sanitary ware & piping (Ideal Standard, Wavin)'),
  P('materials', 'Building Materials', 'kaia-hall', 'ألواح لامينيت وأسطح (Abet Laminati)', 'Laminates & surfaces (Abet Laminati)'),
];

/* ---------- العلامات (شعارات من صفحة Building Material) ---------- */
const BRANDS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];
const COMPANIES = [
  { logo: 'co-hawk', name: 'Hawk PG' }, { logo: 'co-a-metal', name: 'A-Metal' }, { logo: 'co-metal-artwork', name: 'MASCO' },
  { logo: 'co-top-factory', name: 'Top Factory' }, { logo: 'co-mimar', name: 'Mimar International' }, { logo: 'co-suw', name: 'SUW' }, { logo: 'co-sss', name: 'Smart Steel Solutions' },
];
