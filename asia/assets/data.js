/* كل البيانات هنا منقولة من موقع النادي القديم (sites.google.com/view/asiadefencesa)
   ومن صور الأسعار والجداول المنشورة فيه. لا توجد أرقام مخترعة. */

const OLD = 'https://sites.google.com/view/asiadefencesa';

const CONFIG = {
  wa: '966505529029',
  phone: '0505529029',
  stopForm: 'https://fnoonasia-001-site4.anytempurl.com/StopSubscription/',
};

const SOCIAL = [
  { ic: 'instagram', url: 'https://www.instagram.com/asiaclub1', t: 'Instagram' },
  { ic: 'facebook', url: 'https://www.facebook.com/asiadefencesa/', t: 'Facebook' },
  { ic: 'x', url: 'https://twitter.com/Asia_Defence', t: 'X' },
  { ic: 'youtube', url: 'https://www.youtube.com/channel/UCJFLJj4CPZDese9_bTiDSTA', t: 'YouTube' },
  { ic: 'linkedin', url: 'https://www.linkedin.com/company/asia-martial-arts-defense', t: 'LinkedIn' },
  { ic: 'whatsapp', url: 'https://wa.me/966505529029', t: 'WhatsApp' },
];

/* درجات الأحزمة في المشهد الافتتاحي */
const BELTS = [
  { c: '#f3efe6', ar: 'الحزام الأبيض', en: 'White belt' },
  { c: '#f2c230', ar: 'الحزام الأصفر', en: 'Yellow belt', v: { ar: 'الانضباط', en: 'Discipline' }, d: { ar: 'يتعلّم الطفل الالتزام بالموعد والزي وقواعد الصالة.', en: 'Showing up on time, in uniform, by the rules of the mat.' } },
  { c: '#ee7a1d', ar: 'الحزام البرتقالي', en: 'Orange belt', v: { ar: 'التركيز', en: 'Focus' }, d: { ar: 'التحكم في العواطف والتركيز والتحليل الذاتي.', en: 'Control of emotions, focus and self-reflection.' } },
  { c: '#2f9e4f', ar: 'الحزام الأخضر', en: 'Green belt', v: { ar: 'الثقة', en: 'Confidence' }, d: { ar: 'ثقة بالنفس تكفي ليدافع عن نفسه بطريقة صحيحة وآمنة.', en: 'The confidence to defend yourself the right, safe way.' } },
  { c: '#2563c9', ar: 'الحزام الأزرق', en: 'Blue belt', v: { ar: 'الاحترام', en: 'Respect' }, d: { ar: 'احترام المدرب وأصحاب الأحزمة الأعلى ورعاية الأقل.', en: 'Respect for coaches and higher belts, care for the newer ones.' } },
  { c: '#7a4a26', ar: 'الحزام البني', en: 'Brown belt', v: { ar: 'القوة', en: 'Strength' }, d: { ar: 'لياقة بدنية ومهارات قتال تتطور مع كل تمرين.', en: 'Fitness and fighting skill that grow with every session.' } },
  { c: '#141416', ar: 'الحزام الأسود', en: 'Black belt' },
];

/* من سيتدرب؟ */
const WHO = [
  { id: 'tiny', ar: 'طفل من 3 إلى 5 سنوات', en: 'Child, 3–5 years' },
  { id: 'kids', ar: 'طفل من 6 إلى 12 سنة', en: 'Child, 6–12 years' },
  { id: 'women', ar: 'فتاة أو سيدة', en: 'Girl or woman' },
  { id: 'men', ar: 'شاب أو رجل', en: 'Young man or man' },
];

const SPORTS = [
  { id: 'karate', c: '#f3efe6', origin: { ar: 'اليابان', en: 'Japan' }, name: { ar: 'الكاراتيه', en: 'Karate' }, big: 'KARATE',
    d: { ar: 'رياضة قتالية تعتمد على الأيدي والأرجل والمفاصل للهجوم والدفاع، بتدريب معتمد من الاتحاد السعودي للكاراتيه.', en: 'A striking art using hands, feet and joints for attack and defence, trained under the Saudi Karate Federation.' }, br: ['faisaliah', 'salamah', 'women'] },
  { id: 'taekwondo', c: '#2563c9', origin: { ar: 'كوريا', en: 'Korea' }, name: { ar: 'التايكوندو', en: 'Taekwondo' }, big: 'TAEKWONDO',
    d: { ar: 'رياضة قتالية تعتمد على الأرجل بشكل أساسي، بتدريب معتمد من الاتحاد السعودي للتايكوندو.', en: 'A kicking art built mainly on the legs, trained under the Saudi Taekwondo Federation.' }, br: ['faisaliah', 'salamah', 'women'] },
  { id: 'judo', c: '#f2c230', origin: { ar: 'اليابان', en: 'Japan' }, name: { ar: 'الجودو', en: 'Judo' }, big: 'JUDO',
    d: { ar: 'مسكات ورميات وقفلات للهجوم والدفاع، بتدريب معتمد من الاتحاد السعودي للجودو.', en: 'Grips, throws and locks for attack and defence, trained under the Saudi Judo Federation.' }, br: ['faisaliah'] },
  { id: 'kungfu', c: '#ee7a1d', origin: { ar: 'الصين', en: 'China' }, name: { ar: 'الكونغ فو', en: 'Kung Fu' }, big: 'KUNG FU',
    d: { ar: 'تقنيات متنوعة للهجوم والدفاع، بتدريب معتمد من اللجنة السعودية للووشو كونغ فو.', en: 'A wide range of attack and defence techniques, under the Saudi Wushu Kung Fu Committee.' }, br: ['faisaliah'] },
  { id: 'aikido', c: '#7a4a26', origin: { ar: 'اليابان', en: 'Japan' }, name: { ar: 'الآيكيدو', en: 'Aikido' }, big: 'AIKIDO',
    d: { ar: 'فن دفاعي يعتمد على توجيه قوة الخصم والرميات، للكبار في فرع السلامة.', en: 'A defensive art of redirecting force and throws, for adults at Al-Salamah.' }, br: ['salamah'] },
  { id: 'kickboxing', c: '#d4161c', origin: { ar: 'قتال', en: 'Combat' }, name: { ar: 'الكيك بوكسينج', en: 'Kickboxing' }, big: 'KICKBOXING',
    d: { ar: 'لكمات وركلات تبني اللياقة وسرعة رد الفعل، للصغار والكبار.', en: 'Punches and kicks that build fitness and reflexes, for kids and adults.' }, br: ['faisaliah', 'women'] },
  { id: 'swimming', c: '#3fb7e6', origin: { ar: 'مسابح', en: 'Pools' }, name: { ar: 'السباحة', en: 'Swimming' }, big: 'SWIMMING',
    d: { ar: 'الحرة والصدر والظهر والفراشة، بتدريب معتمد من الاتحاد السعودي للسباحة.', en: 'Freestyle, breaststroke, backstroke and butterfly, under the Saudi Swimming Federation.' }, br: ['faisaliah', 'salamah', 'women'] },
  { id: 'gymnastics', c: '#9b5de5', origin: { ar: 'جمباز', en: 'Gym' }, name: { ar: 'الجمباز', en: 'Gymnastics' }, big: 'GYMNASTICS',
    d: { ar: 'يعلّم الأطفال الاعتماد على أنفسهم ويحسّن التوازن والمرونة والتنقل بسلاسة، من عمر 3 سنوات.', en: 'Teaches children self-reliance, balance, flexibility and smooth movement, from age 3.' }, br: ['women'] },
  { id: 'fitness', c: '#2f9e4f', origin: { ar: 'لياقة', en: 'Fitness' }, name: { ar: 'اللياقة العامة', en: 'General fitness' }, big: 'FITNESS',
    d: { ar: 'برامج لياقة عامة للفتيات والسيدات في النادي النسائي.', en: 'General fitness programs for girls and women at the ladies club.' }, br: ['women'] },
];

const BRANCHES = [
  { id: 'faisaliah', who: ['kids', 'men'], coach: { ar: 'المدربون رجال', en: 'Male coaches' },
    name: { ar: 'فرع الفيصلية', en: 'Al-Faisaliah' },
    aud: { ar: 'أولاد وبنات من 6 إلى 12 سنة، والشباب والرجال', en: 'Boys & girls 6–12, young men and men' },
    addr: { ar: 'حي الفيصلية، بجوار دوار الهندسة', en: 'Al-Faisaliah, next to Al-Handasah roundabout' },
    hours: { ar: 'يومياً 4:00 عصراً – 10:00 مساءً', en: 'Daily 4:00 pm – 10:00 pm' },
    sports: ['karate', 'taekwondo', 'judo', 'kungfu', 'kickboxing', 'swimming'],
    map: 'https://g.page/asiaclub1?share' },
  { id: 'salamah', who: ['kids', 'men'], coach: { ar: 'المدربون رجال', en: 'Male coaches' },
    name: { ar: 'فرع السلامة', en: 'Al-Salamah' },
    aud: { ar: 'أولاد وبنات من 6 إلى 12 سنة، والشباب والرجال', en: 'Boys & girls 6–12, young men and men' },
    addr: { ar: 'شارع حراء، خلف سوق دانة', en: 'Hira Street, behind Danah Market' },
    hours: { ar: 'يومياً 4:00 عصراً – 10:00 مساءً', en: 'Daily 4:00 pm – 10:00 pm' },
    sports: ['karate', 'taekwondo', 'aikido', 'swimming'],
    map: null },
  { id: 'women', who: ['tiny', 'kids', 'women'], coach: { ar: 'مدرّبات — نسائي 100٪', en: 'Female coaches — 100% ladies' },
    name: { ar: 'النادي النسائي الجديد', en: 'New Ladies Club' },
    aud: { ar: 'أطفال بنين وبنات من 3 سنوات، وفتيات وسيدات. يُمنع دخول الرجال.', en: 'Boys & girls from age 3, girls and women. No men allowed.' },
    addr: { ar: 'حي الفيصلية، شارع المكرونة، بجوار دوار الهندسة', en: 'Al-Faisaliah, Al-Makarona St., next to Al-Handasah roundabout' },
    hours: { ar: 'كل الأيام عدا الجمعة، 4:00 عصراً – 10:00 مساءً', en: 'Every day except Friday, 4:00 pm – 10:00 pm' },
    sports: ['karate', 'taekwondo', 'kickboxing', 'swimming', 'gymnastics', 'fitness'],
    extra: { ar: '3 مسابح: للأطفال (5×3م، عمق 60سم)، للفتيات (12×6م، عمق 1م)، للسيدات (14×7م، عمق 2.2م)', en: '3 pools: kids (5×3 m, 60 cm deep), girls (12×6 m, 1 m), women (14×7 m, 2.2 m)' },
    map: 'https://maps.app.goo.gl/Dxuhf8UwQfQpXRXe6' },
];

/* الباقات: نفس الأسعار في الفروع الثلاثة، لرياضة واحدة، 3 أيام بالأسبوع */
const PLANS = [
  { id: 'm1', n: 460, t: { ar: 'شهر واحد', en: '1 month' }, s: 12, stop: 0 },
  { id: 'm3', n: 1150, t: { ar: 'ثلاثة أشهر', en: '3 months' }, s: 36, stop: 2 },
  { id: 'm6', n: 1960, t: { ar: 'ستة أشهر', en: '6 months' }, s: 72, stop: 4, hot: true },
  { id: 'm12', n: 3220, t: { ar: 'سنة كاملة', en: 'Full year' }, s: 144, stop: 6 },
];

const EXTRAS = [
  { n: 420, t: { ar: 'خصم الإخوة', en: 'Sibling discount' }, d: { ar: 'لكل أخ في الاشتراك الشهري (بدل 460)، اثنين أو أكثر، لرياضة واحدة.', en: 'Per sibling on the monthly plan (instead of 460), two or more, one sport.' }, u: { ar: 'ريال / شهر', en: 'SAR / month' } },
  { n: 840, t: { ar: 'رياضتين للاعب واحد', en: 'Two sports, one player' }, d: { ar: 'الأساسي 460 والثانية 420 في الاشتراك الشهري.', en: 'First sport 460 + second sport 420 on the monthly plan.' }, u: { ar: 'ريال / شهر', en: 'SAR / month' } },
  { n: 80, t: { ar: 'زيارة المسبح', en: 'Pool visit' }, d: { ar: 'زيارة بدون مدرب في فرعي الفيصلية والسلامة.', en: 'Without a coach, at Al-Faisaliah and Al-Salamah.' }, u: { ar: 'ريال', en: 'SAR' } },
  { n: 350, t: { ar: 'المواصلات', en: 'Transport' }, d: { ar: 'باصات لكل الفروع من الأحياء القريبة.', en: 'Club buses to every branch from nearby districts.' }, u: { ar: 'ريال / شهر', en: 'SAR / month' } },
];

/* الجداول — d: 'a' = السبت/الاثنين/الأربعاء، 'b' = الأحد/الثلاثاء/الخميس */
const L = (ar, en) => ({ ar, en });
const LV = {
  beg: L('صغار — مبتدئين', 'Juniors — beginners'),
  midA: L('صغار — مبتدئين ومتوسطين A', 'Juniors — beginner & intermediate A'),
  midB: L('صغار — مبتدئين ومتوسطين B', 'Juniors — beginner & intermediate B'),
  adv: L('صغار — متقدمين', 'Juniors — advanced'),
  adults: L('كبار — مبتدئين ومتقدمين', 'Adults — beginner & advanced'),
  kidsAll: L('صغار — مبتدئين ومتقدمين', 'Juniors — beginner & advanced'),
};
const SCHEDULE = {
  faisaliah: [
    ['a', '4:30 – 5:30', 'taekwondo', LV.beg],
    ['a', '5:30 – 6:30', 'taekwondo', LV.midA],
    ['a', '5:30 – 6:30', 'swimming', L('متوسطين', 'Intermediate')],
    ['a', '6:30 – 7:30', 'taekwondo', LV.midB],
    ['a', '6:30 – 7:30', 'kungfu', LV.kidsAll],
    ['a', '7:30 – 8:30', 'taekwondo', LV.adv],
    ['a', '7:30 – 8:30', 'kungfu', LV.adults],
    ['b', '4:30 – 5:30', 'karate', LV.beg],
    ['b', '5:30 – 6:30', 'karate', LV.midA],
    ['b', '5:30 – 6:30', 'swimming', L('مبتدئين', 'Beginners')],
    ['b', '6:30 – 7:30', 'karate', LV.midB],
    ['b', '6:30 – 7:30', 'kickboxing', LV.kidsAll],
    ['b', '7:30 – 8:30', 'karate', LV.adv],
    ['b', '7:30 – 8:30', 'kickboxing', LV.adults],
    ['b', '8:30 – 9:30', 'karate', LV.adults],
  ],
  salamah: [
    ['a', '4:30 – 5:30', 'swimming', L('مبتدئين', 'Beginners')],
    ['a', '7:30 – 9:00', 'karate', LV.adv],
    ['a', '9:30 – 10:30', 'aikido', L('كبار', 'Adults')],
    ['b', '7:30 – 9:00', 'taekwondo', LV.adv],
    ['b', '9:00 – 10:30', 'taekwondo', LV.adults],
  ],
  women: (() => {
    const rows = [];
    const slots = ['4:30 – 5:30', '5:30 – 6:30', '6:30 – 7:30', '7:30 – 8:30', '8:30 – 9:30'];
    const def = [LV.beg, LV.midB, L('فتيات — مبتدئين ومتوسطين A', 'Girls — beginner & intermediate A'), L('شابات — متقدمين', 'Young women — advanced'), LV.adults];
    const gym = [L('المرحلة 1 — من 3 سنوات (بنين وبنات)', 'Stage 1 — from 3 yrs (boys & girls)'), L('المرحلة 2 — من 6 سنوات (بنين وبنات)', 'Stage 2 — from 6 yrs (boys & girls)'), L('المرحلة 3 — من 9 سنوات (بنات)', 'Stage 3 — from 9 yrs (girls)'), L('المرحلة 4 — من 12 سنة (فتيات)', 'Stage 4 — 12+ (girls)')];
    const lvl = [L('مبتدئين', 'Beginners'), L('مبتدئين', 'Beginners'), L('متوسطين', 'Intermediate'), L('متوسطين', 'Intermediate'), L('متقدمين', 'Advanced')];
    for (const d of ['a', 'b']) {
      slots.forEach((t, i) => {
        rows.push([d, t, d === 'a' ? 'taekwondo' : 'karate', def[i]]);
        if (gym[i]) rows.push([d, t, 'gymnastics', gym[i]]);
        rows.push([d, t, 'swimming', L('مسبح 1 — أطفال 3 إلى 5 سنوات (بنين وبنات)', 'Pool 1 — kids 3–5 (boys & girls)')]);
        rows.push([d, t, 'swimming', L(`مسبح 2 — فتيات 6 إلى 12 سنة — ${lvl[i].ar}`, `Pool 2 — girls 6–12 — ${lvl[i].en}`)]);
        rows.push([d, t, 'swimming', L(`مسبح 3 — سيدات من 13 سنة — ${lvl[i].ar}`, `Pool 3 — women 13+ — ${lvl[i].en}`)]);
      });
    }
    return rows;
  })(),
};

const RULES = [
  L('احترام المدربين والإداريين.', 'Respect coaches and staff.'),
  L('ارتداء الزي الخاص بكل لعبة.', 'Wear the uniform of each sport.'),
  L('عدم دخول الملاعب بالأحذية.', 'No shoes on the mats.'),
  L('حضور التمارين في الوقت المحدد.', 'Arrive on time for training.'),
  L('احترام درجات الأحزمة الأعلى ورعاية الأقل.', 'Respect higher belts and look after lower ones.'),
  L('عدم التدخين داخل المركز.', 'No smoking inside the centre.'),
  L('عدم الضحك والسخرية داخل المركز.', 'No mocking or ridicule inside the centre.'),
  L('الالتزام بمواعيد الصلاة في صالة التدريب.', 'Observe prayer times in the training hall.'),
  L('المحافظة على أدوات ومحتويات صالة التدريب.', 'Take care of the hall and its equipment.'),
  L('عدم تناول المأكولات والمشروبات داخل الملاعب.', 'No food or drinks on the mats.'),
];

const SERVICES = [
  { url: '#register', t: L('التسجيل أو التجديد', 'Register or renew'), d: L('اختر الفرع والرياضة والباقة وأرسل الطلب.', 'Pick a branch, sport and plan and send it.') },
  { url: CONFIG.stopForm, t: L('إيقاف الاشتراك', 'Pause subscription'), d: L('استمارة الإيقاف الرسمية حسب عدد الإيقافات في باقتك.', 'The official pause form, within your plan’s limit.') },
  { url: OLD + '/Player-Certificate-Inquiry', t: L('شهادات الاتحاد السعودي', 'Federation certificates'), d: L('الاستعلام عن شهادة اللاعب.', 'Look up a player’s certificate.') },
  { url: OLD + '/Belt-Upgrade-Tests', t: L('اختبارات ترفيع الأحزمة', 'Belt grading tests'), d: L('مواعيد ونتائج اختبارات الترفيع.', 'Grading dates and results.') },
  { url: OLD + '/asia-defence/Tournaments-and-competitions', t: L('البطولات والمسابقات', 'Tournaments'), d: L('مشاركات لاعبي النادي.', 'Where our players compete.') },
  { url: OLD + '/store', t: L('متجر النادي', 'Club store'), d: L('الزي والأدوات.', 'Uniforms and gear.') },
  { url: OLD + '/Opinion-poll', t: L('استطلاع الرأي', 'Feedback survey'), d: L('رأيك يطوّر النادي.', 'Help us improve.') },
  { url: 'wa:transport', t: L('المواصلات', 'Transport'), d: L('باصات لكل الفروع بـ 350 ريال شهرياً.', 'Buses to every branch, 350 SAR / month.') },
];

const FAQ = [
  [L('من أي عمر يبدأ التدريب؟', 'From what age can my child start?'), L('السباحة والجمباز من 3 سنوات في النادي النسائي، وألعاب الدفاع عن النفس من 6 سنوات.', 'Swimming and gymnastics from age 3 at the ladies club; martial arts from age 6.')],
  [L('هل النادي النسائي نسائي بالكامل؟', 'Is the ladies club women-only?'), L('نعم، نسائي 100٪ ومدرّبات لكل الفئات العمرية، ويُمنع دخول الرجال نهائياً.', 'Yes, 100% ladies with female coaches for every age, and no men allowed.')],
  [L('كم تمرين في الأسبوع؟', 'How many sessions per week?'), L('3 أيام في الأسبوع، يعني 12 تمرين في الشهر لرياضة واحدة.', '3 days a week — 12 sessions a month for one sport.')],
  [L('هل يوجد خصم للإخوة؟', 'Is there a sibling discount?'), L('نعم، 420 ريال لكل أخ بدل 460 في الاشتراك الشهري، ورياضتين للاعب واحد بـ 840 ريال شهرياً.', 'Yes — 420 SAR per sibling instead of 460 monthly, and two sports for one player at 840 SAR a month.')],
  [L('هل أقدر أوقف الاشتراك؟', 'Can I pause my subscription?'), L('الشهر الواحد لا يمكن إيقافه، و3 أشهر مرتين، و6 أشهر 4 مرات، والسنة 6 مرات. في السباحة بالنادي النسائي الإيقاف للعذر الشرعي فقط لمدة أسبوع (3 تمارين).', 'Monthly: no pause. 3 months: twice. 6 months: 4 times. Yearly: 6 times. Ladies-club swimming: pause for a valid excuse only, one week (3 sessions).')],
  [L('هل يوجد مواصلات؟', 'Is there transport?'), L('نعم، باصات لكل الفروع من الأحياء القريبة بـ 350 ريال شهرياً.', 'Yes — buses to every branch from nearby districts for 350 SAR a month.')],
  [L('هل التدريب معتمد؟', 'Is the training accredited?'), L('نعم، التدريب تحت إشراف الاتحادات السعودية للكاراتيه والتايكوندو والجودو والسباحة واللجنة السعودية للووشو كونغ فو.', 'Yes — under the Saudi Karate, Taekwondo, Judo and Swimming federations and the Saudi Wushu Kung Fu Committee.')],
  [L('وش أحتاج أجيب أول يوم؟', 'What do I need on day one?'), L('الزي الخاص بالرياضة، والالتزام بموعد التدريب. النادي لا يتحمل مسؤولية فقدان الأغراض الشخصية.', 'The sport’s uniform and being on time. The club is not responsible for lost personal items.')],
];

/* النصوص الإنجليزية للعناصر الثابتة في الصفحة */
const EN = {
  'brand.name': 'Asia Martial Arts', 'brand.sub': 'Self-defence club · Jeddah',
  'nav.branches': 'Branches', 'nav.sports': 'Sports', 'nav.prices': 'Prices & schedules', 'nav.belts': 'Belts', 'nav.faq': 'FAQ',
  'cta.join': 'Register now',
  'scene.h': 'Every champion started<br>with a <span class="red">white belt</span>',
  'scene.p': 'Asia Martial Arts Defence — Jeddah. Kids, girls, women, young men and men.',
  'scene.belt': 'Your rank',
  'final.h': 'Your road to<br>the black belt starts here',
  'final.p': 'Strength · Discipline · Respect. Three branches in Jeddah and nine sports under the Saudi federations.',
  'final.prices': 'See prices',
  'facts.branches': 'branches in Jeddah', 'facts.sports': 'sports', 'facts.age': 'starting age (years)', 'facts.pools': 'pools at the ladies club',
  'about.k': 'Who we are', 'about.h': 'More than a sport.<br>A school for character.',
  'about.p1': 'Asia Martial Arts runs specialised self-defence classes in Jeddah that teach children how to protect themselves, build their confidence, and grow leadership, teamwork, emotional control, focus and self-reflection.',
  'about.p2': 'Through karate, taekwondo, kung fu, kickboxing and judo, our players improve their skills and fitness while building the discipline, respect and manners that carry into the rest of their lives.',
  'p1.t': 'Strength', 'p1.s': 'Fitness and real fighting skills.', 'p2.t': 'Discipline', 'p2.s': 'Uniform, punctuality and the rules of the mat.',
  'p3.t': 'Respect', 'p3.s': 'For coaches, higher belts and each other.', 'p4.t': 'Accredited', 'p4.s': 'Under the Saudi federations.',
  'finder.k': 'Branches', 'finder.h': 'Who is training?', 'finder.p': 'Pick one and we’ll highlight the branch that fits.',
  'finder.all': 'All', 'finder.fit': 'Fits',
  'sports.k': 'Sports', 'sports.h': 'Nine sports. One path.',
  'prices.k': 'Prices & schedules', 'prices.h': 'Clear plans. No surprises.',
  'prices.p': 'Same prices at all three branches — one sport, 3 days a week.',
  'extras.h': 'Discounts & extras', 'sched.h': 'Training schedule', 'sched.all': 'All sports',
  'sched.src': 'Copied from the club’s published schedules. Times are pm.',
  'th.time': 'Time', 'th.sport': 'Sport', 'th.group': 'Group',
  'belts.k': 'The belt path', 'belts.h': 'From white to black, step by step.',
  'belts.p': 'Every belt is earned in a grading test, and every test is a moment your child will remember.',
  'c1.t': 'Belt grading tests', 'c1.p': 'Players move up after passing a grading test in front of the coaches.', 'c1.a': 'Grading tests ←',
  'c2.t': 'Tournaments', 'c2.p': 'Our players compete in local tournaments and competitions.', 'c2.a': 'Tournaments ←',
  'c3.t': 'Federation certificates', 'c3.p': 'Look up your player’s Saudi federation certificate.', 'c3.a': 'Look up ←',
  'members.k': 'Members', 'members.h': 'Everything a member needs',
  'rules.h': 'Club rules',
  'faq.k': 'FAQ', 'faq.h': 'Questions parents ask',
  'reg.k': 'Register', 'reg.h': 'Book your first session',
  'reg.p': 'Fill in the form and your request goes straight to the club on WhatsApp.',
  'reg.wa': 'WhatsApp 0505529029', 'reg.hours': 'Daily 4:00 pm – 10:00 pm',
  'f.name': 'Name', 'f.phone': 'Mobile', 'f.who': 'Who is training?', 'f.age': 'Age', 'f.branch': 'Branch', 'f.sport': 'Sport', 'f.plan': 'Plan', 'f.msg': 'Notes',
  'f.send': 'Send on WhatsApp',
  'ph.name': 'Player or guardian name', 'ph.phone': '05xxxxxxxx', 'ph.age': 'e.g. 8', 'ph.msg': 'Anything we should know?',
  'ftr.p': 'Self-defence, swimming and gymnastics for kids, girls, women, young men and men in Jeddah.',
  'ftr.links': 'Quick links', 'ftr.follow': 'Follow us', 'ftr.rights': 'All rights reserved.',
  'ftr.old': 'Old website',
  'logo.alt': 'Asia Martial Arts Defence logo',
};

const UI = {
  ar: {
    days: { a: 'السبت · الاثنين · الأربعاء', b: 'الأحد · الثلاثاء · الخميس' },
    sar: 'ريال', sessions: n => `${n} تمرين`, stop: n => n ? (n === 2 ? 'إيقاف مرتين' : `إيقاف ${n} مرات`) : 'لا يمكن إيقافه',
    oneSport: 'رياضة واحدة · 3 أيام بالأسبوع', best: 'الأوفر',
    map: 'الموقع', ask: 'اسأل واتساب', branchMsg: b => `السلام عليكم، أبغى أستفسر عن ${b}`,
    planMsg: p => `السلام عليكم، أبغى أسجّل في باقة ${p}`, choose: 'اختر',
    pick: 'اشترك', judoNote: 'الجودو: الأحد والثلاثاء والخميس، الموعد عبر الواتساب.',
    head: 'طلب تسجيل جديد — من الموقع', err: 'اكتب الاسم ورقم الجوال.', sent: 'فتحنا لك الواتساب برسالة جاهزة',
    transport: 'السلام عليكم، أبغى أستفسر عن المواصلات (الباصات)',
    f: { name: 'الاسم', phone: 'الجوال', who: 'المتدرب', age: 'العمر', branch: 'الفرع', sport: 'الرياضة', plan: 'الباقة', msg: 'ملاحظات' },
    sportsOf: 'متوفرة في', all: 'الكل',
  },
  en: {
    days: { a: 'Sat · Mon · Wed', b: 'Sun · Tue · Thu' },
    sar: 'SAR', sessions: n => `${n} sessions`, stop: n => n ? (n === 2 ? 'Pause twice' : `Pause ${n} times`) : 'No pause',
    oneSport: 'One sport · 3 days a week', best: 'Best value',
    map: 'Location', ask: 'Ask on WhatsApp', branchMsg: b => `Hello, I'd like to ask about ${b}`,
    planMsg: p => `Hello, I'd like to subscribe to the ${p} plan`, choose: 'Choose',
    pick: 'Subscribe', judoNote: 'Judo: Sun, Tue & Thu — ask on WhatsApp for the time.',
    head: 'New registration — from the website', err: 'Please enter a name and mobile number.', sent: 'WhatsApp opened with your message',
    transport: 'Hello, I would like to ask about the club buses',
    f: { name: 'Name', phone: 'Mobile', who: 'Trainee', age: 'Age', branch: 'Branch', sport: 'Sport', plan: 'Plan', msg: 'Notes' },
    sportsOf: 'Available at', all: 'All',
  },
};
