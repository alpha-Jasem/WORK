/* طيران عبر السحب: سحب مولّدة إجرائيًا على canvas، والكاميرا تتقدم حسب التمرير */
const Clouds = (() => {
  const cv = document.getElementById('clouds');
  const ctx = cv.getContext('2d');
  const mobile = matchMedia('(max-width: 760px)').matches;
  const COUNT = mobile ? 46 : 80;
  const FAR = 18;
  let W = 0, H = 0, dpr = 1;
  let cam = 0, camTarget = 0, fade = 1, mx = 0, my = 0, tmx = 0, tmy = 0, running = false;

  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  function sprite() {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 256;
    const g = c.getContext('2d');
    const puff = (x, y, r, a) => {
      const gr = g.createRadialGradient(x, y - r * 0.3, 0, x, y, r);
      gr.addColorStop(0, `rgba(255,255,255,${a})`);
      gr.addColorStop(0.5, `rgba(248,251,255,${a * 0.45})`);
      gr.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = gr;
      g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
    };
    // الكتلة الأساسية
    for (let i = 0; i < 34; i++) {
      const x = 80 + rnd() * 352;
      const spread = 1 - Math.abs(x - 256) / 256;
      puff(x, 165 - rnd() * 55 * spread, 22 + rnd() * 48 * (0.4 + spread), 0.5);
    }
    // تفاصيل منتفخة على الحافة العلوية
    for (let i = 0; i < 40; i++) {
      const x = 90 + rnd() * 332;
      const spread = 1 - Math.abs(x - 256) / 256;
      puff(x, 140 - spread * 70 + rnd() * 30, 10 + rnd() * 22, 0.7);
    }
    // ظل سفلي يعطي الحجم
    g.globalCompositeOperation = 'source-atop';
    const sh = g.createLinearGradient(0, 70, 0, 220);
    sh.addColorStop(0, 'rgba(255,240,225,.12)');
    sh.addColorStop(0.45, 'rgba(255,255,255,0)');
    sh.addColorStop(1, 'rgba(60,92,122,.6)');
    g.fillStyle = sh; g.fillRect(0, 0, 512, 256);
    return c;
  }

  const sprites = Array.from({ length: 5 }, sprite);
  // بحر من السحب تحت الأفق، والكاميرا تبدأ فوقه ثم تغوص فيه
  const parts = Array.from({ length: COUNT }, (_, i) => ({
    x: (rnd() - 0.5) * (mobile ? 3.6 : 7),
    y: 0.1 + rnd() * 0.7,
    z: 2.6 + (i / COUNT) * FAR,
    s: 1.6 + rnd() * 2.6,
    sp: sprites[i % sprites.length],
    flip: rnd() > 0.5,
    drift: (rnd() - 0.5) * 0.02,
  }));

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw(t) {
    cam += (camTarget - cam) * 0.08;
    const camY = Math.min(1, cam / (FAR * 0.5)) * 0.55;
    mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05;
    ctx.clearRect(0, 0, W, H);
    if (fade <= 0.01) return;
    const f = Math.max(W, H * 1.15) * 0.55;
    const horizon = H * 0.66;
    const sorted = parts.slice().sort((a, b) => b.z - a.z);
    for (const p of sorted) {
      const dz = p.z - cam;
      if (dz < 0.12 || dz > FAR) continue;
      const k = f / dz;
      const w = p.s * k, h = w * 0.5;
      const x = W / 2 + (p.x + p.drift * t * 0.001 - mx * 0.25) * k - w / 2;
      const y = horizon + (p.y - camY - my * 0.04) * k - h / 2;
      if (x > W || x + w < 0 || y > H || y + h < 0) continue;
      let a = Math.min(1, (FAR - dz) / 5) * Math.min(1, (dz - 0.12) / 0.9) * fade;
      if (a <= 0.01) continue;
      ctx.globalAlpha = a;
      if (p.flip) {
        ctx.save(); ctx.translate(x + w, y); ctx.scale(-1, 1);
        ctx.drawImage(p.sp, 0, 0, w, h); ctx.restore();
      } else ctx.drawImage(p.sp, x, y, w, h);
    }
    ctx.globalAlpha = 1;
  }

  function loop(t) {
    if (!running) return;
    draw(t);
    requestAnimationFrame(loop);
  }

  size();
  addEventListener('resize', size);
  addEventListener('pointermove', e => { tmx = (e.clientX / innerWidth - 0.5) * 2; tmy = (e.clientY / innerHeight - 0.5) * 2; }, { passive: true });

  return {
    /* progress 0..1 للمسافة المقطوعة عبر السحب، opacity لإخفائها تدريجيًا */
    set(progress, opacity) { camTarget = progress * (FAR - 2); fade = opacity; },
    start() { if (!running) { running = true; requestAnimationFrame(loop); } },
    stop() { running = false; },
    still() { cam = camTarget; draw(0); },
  };
})();
