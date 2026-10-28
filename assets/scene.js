// المشهد ثلاثي الأبعاد: ماسة ذهبية فوق مدينة ليلية تنهض مع التمرير
(() => {
  const root = document.documentElement;
  const canvas = document.getElementById("scene");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!window.THREE || !canvas) { root.classList.add("no-webgl"); return; }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  } catch (e) { root.classList.add("no-webgl"); return; }

  const small = innerWidth < 760;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, small ? 1.5 : 1.75));
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const BG = new THREE.Color("#070c18");
  const scene = new THREE.Scene();
  scene.background = BG;
  scene.fog = new THREE.FogExp2(BG, small ? 0.03 : 0.026);
  const camera = new THREE.PerspectiveCamera(small ? 50 : 40, innerWidth / innerHeight, 0.1, 220);

  // بيئة انعكاس بسيطة: قبة متدرجة + ألواح ضوء، تمنح الذهب لمعانه
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = new THREE.Scene();
  const dome = new THREE.SphereGeometry(20, 32, 16);
  const dc = [], dp = dome.attributes.position;
  const cTop = new THREE.Color("#fff1cf"), cMid = new THREE.Color("#a07a3a"), cLow = new THREE.Color("#3a2a12");
  for (let i = 0; i < dp.count; i++) {
    const y = dp.getY(i) / 20, c = new THREE.Color();
    if (y > 0) c.copy(cMid).lerp(cTop, Math.pow(y, 1.6)); else c.copy(cMid).lerp(cLow, Math.min(1, -y * 1.6));
    dc.push(c.r, c.g, c.b);
  }
  dome.setAttribute("color", new THREE.Float32BufferAttribute(dc, 3));
  env.add(new THREE.Mesh(dome, new THREE.MeshBasicMaterial({ side: THREE.BackSide, vertexColors: true })));
  [[8, 6, 6, "#fff4dc"], [-9, 3, -4, "#ffd690"], [0, 12, -8, "#ffffff"], [-4, -6, 9, "#ffc870"], [7, -7, -6, "#ffdca0"], [0, -12, 0, "#c99a4a"]].forEach(([x, y, z, c]) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(5, 3), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m);
  });
  scene.environment = pmrem.fromScene(env, 0.035).texture;

  // إضاءة
  scene.add(new THREE.HemisphereLight(0x8fa6e8, 0x0a0f1d, 0.45));
  const key = new THREE.DirectionalLight(0xffe0a3, 1.4); key.position.set(-10, 18, 12); scene.add(key);
  const rim = new THREE.PointLight(0x6f95ff, 2.4, 50); rim.position.set(8, 9, -8); scene.add(rim);
  const glint = new THREE.PointLight(0xfff3d6, 4, 12); scene.add(glint);

  // ---------- الماسة ----------
  const gem = new THREE.Group();
  const profile = [[0.001, -2.25], [1.62, 0], [1.62, 0.13], [1.32, 0.5], [0.96, 0.78], [0.001, 0.78]]
    .map(([x, y]) => new THREE.Vector2(x, y));
  const gemGeo = new THREE.LatheGeometry(profile, 8);
  const gemMat = new THREE.MeshPhysicalMaterial({
    color: 0xe9c57a, metalness: 1, roughness: 0.18, flatShading: true,
    clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 1.7,
  });
  gem.add(new THREE.Mesh(gemGeo, gemMat));
  gem.add(new THREE.LineSegments(new THREE.EdgesGeometry(gemGeo, 1),
    new THREE.LineBasicMaterial({ color: 0xfff0c8, transparent: true, opacity: 0.5 })));

  // هالة ضوئية خلف الماسة
  const glowTex = (() => {
    const c = document.createElement("canvas"); c.width = c.height = 128;
    const g = c.getContext("2d"), r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    r.addColorStop(0, "rgba(255,226,160,.55)"); r.addColorStop(0.35, "rgba(214,184,120,.18)"); r.addColorStop(1, "rgba(214,184,120,0)");
    g.fillStyle = r; g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  })();
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
  glow.scale.set(10, 10, 1); gem.add(glow);

  const ringMat = new THREE.MeshBasicMaterial({ color: 0xd6b878, transparent: true, opacity: 0.45, side: THREE.DoubleSide });
  const ring1 = new THREE.Mesh(new THREE.RingGeometry(2.55, 2.57, 160), ringMat);
  const ring2 = new THREE.Mesh(new THREE.RingGeometry(3.1, 3.115, 160), ringMat.clone());
  ring2.material.opacity = 0.22;
  ring1.rotation.x = Math.PI / 2.3; ring2.rotation.x = Math.PI / 1.8; ring2.rotation.y = 0.4;
  gem.add(ring1, ring2);
  scene.add(gem);

  // ---------- المدينة ----------
  const windowTex = (() => {
    const c = document.createElement("canvas"); c.width = 64; c.height = 256;
    const g = c.getContext("2d"); g.fillStyle = "#000"; g.fillRect(0, 0, 64, 256);
    for (let y = 6; y < 250; y += 10) for (let x = 5; x < 60; x += 9) {
      if (Math.random() < 0.42) {
        g.fillStyle = `rgba(255,${200 + Math.random() * 40 | 0},${120 + Math.random() * 70 | 0},${0.45 + Math.random() * 0.55})`;
        g.fillRect(x, y, 5, 5);
      }
    }
    const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; return t;
  })();

  let seed = 7;
  const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
  const N = small ? 15 : 23, SP = 1.65, half = (N - 1) / 2;
  const B = [];
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    if (i % 4 === 0 || j % 4 === 0) continue; // الشوارع
    const x = (i - half) * SP, z = (j - half) * SP, d = Math.hypot(x, z);
    if (d < 3.2 || rnd() < 0.08) continue; // الساحة المركزية تحت الماسة
    let h = (0.7 + rnd() * 2.1) * (1 + 1.7 * Math.exp(-Math.pow(d - 5.5, 2) / 26));
    if (rnd() < 0.045) h *= 1.75;
    B.push({ x, z, d, h, w: 1.05 + rnd() * 0.3 });
  }
  const maxD = Math.max(...B.map(b => b.d));
  B.forEach(b => b.delay = (b.d / maxD) * 0.8);

  const boxGeo = new THREE.BoxGeometry(1, 1, 1); boxGeo.translate(0, 0.5, 0);
  const bMat = new THREE.MeshStandardMaterial({
    color: 0x101b31, roughness: 0.5, metalness: 0.55, envMapIntensity: 0.6,
    emissive: 0xffcf86, emissiveMap: windowTex, emissiveIntensity: 0,
  });
  const city = new THREE.InstancedMesh(boxGeo, bMat, B.length);
  const tint = new THREE.Color();
  B.forEach((b, i) => city.setColorAt(i, tint.setHSL(0.6 + rnd() * 0.04, 0.35, 0.12 + rnd() * 0.08)));
  scene.add(city);

  const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3(), P = new THREE.Vector3();
  let lastRise = -1;
  function setRise(r) {
    if (Math.abs(r - lastRise) < 0.002) return;
    lastRise = r;
    for (let i = 0; i < B.length; i++) {
      const b = B[i], e = Math.min(1, Math.max(0, (r - b.delay) / 0.45)), k = 1 - Math.pow(1 - e, 3);
      P.set(b.x, 0, b.z); S.set(b.w, Math.max(b.h * k, 0.001), b.w);
      city.setMatrixAt(i, M.compose(P, Q, S));
    }
    city.instanceMatrix.needsUpdate = true;
  }

  // الأرضية والشبكة والساحة
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(240, 240),
    new THREE.MeshStandardMaterial({ color: 0x060a14, roughness: 0.85, metalness: 0.3 }));
  ground.rotation.x = -Math.PI / 2; scene.add(ground);
  const grid = new THREE.GridHelper(N * SP + 20, Math.round((N * SP + 20) / (SP * 4 / 2)), 0xd6b878, 0x1c2840);
  grid.material.transparent = true; grid.material.opacity = 0.16; grid.position.y = 0.01; scene.add(grid);
  const plaza = new THREE.Mesh(new THREE.RingGeometry(2.3, 2.36, 128),
    new THREE.MeshBasicMaterial({ color: 0xd6b878, transparent: true, opacity: 0.7, side: THREE.DoubleSide }));
  plaza.rotation.x = -Math.PI / 2; plaza.position.y = 0.02; scene.add(plaza);

  // أضواء السيارات في الشوارع
  const roads = [];
  for (let i = 0; i < N; i += 4) roads.push((i - half) * SP);
  const TN = small ? 50 : 120, span = N * SP;
  const tPos = new Float32Array(TN * 3), tCol = new Float32Array(TN * 3), T = [];
  for (let i = 0; i < TN; i++) {
    const warm = rnd() < 0.6;
    T.push({ axis: rnd() < 0.5 ? 0 : 1, lane: roads[(rnd() * roads.length) | 0] + (rnd() < 0.5 ? -0.25 : 0.25), o: rnd() * span, v: (0.6 + rnd() * 1.6) * (rnd() < 0.5 ? -1 : 1) });
    tCol.set(warm ? [1, 0.78, 0.45] : [0.85, 0.9, 1], i * 3);
  }
  const tGeo = new THREE.BufferGeometry();
  tGeo.setAttribute("position", new THREE.BufferAttribute(tPos, 3));
  tGeo.setAttribute("color", new THREE.BufferAttribute(tCol, 3));
  const trails = new THREE.Points(tGeo, new THREE.PointsMaterial({ size: 0.14, vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
  scene.add(trails);

  // غبار ذهبي
  const DN = small ? 260 : 600, dPos = new Float32Array(DN * 3);
  for (let i = 0; i < DN; i++) dPos.set([(rnd() - 0.5) * 50, rnd() * 22, (rnd() - 0.5) * 50], i * 3);
  const dGeo = new THREE.BufferGeometry(); dGeo.setAttribute("position", new THREE.BufferAttribute(dPos, 3));
  const dust = new THREE.Points(dGeo, new THREE.PointsMaterial({ color: 0xe8cf95, size: 0.06, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }));
  scene.add(dust);

  // ---------- مسار الكاميرا حسب التمرير ----------
  const LX = small ? 0 : 2.7;
  const K = [
    { p: 0,    pos: small ? [0, 6.4, 15] : [0, 7.4, 9.8], look: small ? [0, 2.4, 0] : [LX, 6.6, 0], d: small ? 0.8 : 1,    dy: 6.6, rise: 0.12, win: 0.12, car: 0 },
    { p: 0.1,  pos: [5, 10, 16],   look: [0, 5.2, 0], d: 0.8,  dy: 7.6, rise: 0.55, win: 0.35, car: 0.3 },
    { p: 0.28, pos: [19, 15, 21],  look: [0, 2.6, 0], d: 0.52, dy: 10,  rise: 1.25, win: 0.85, car: 0.9 },
    { p: 0.52, pos: [-21, 11, 16], look: [0, 2, 0],   d: 0.5,  dy: 10,  rise: 1.25, win: 1.25, car: 1 },
    { p: 0.78, pos: [-7, 31, -13], look: [0, 0, 0],   d: 0.45, dy: 10,  rise: 1.25, win: 1.45, car: 1 },
    { p: 1,    pos: small ? [0, 9.4, 14] : [0, 9, 12.5], look: [0, 6.4, 0], d: 0.95, dy: 7, rise: 1.25, win: 1.45, car: 1 },
  ];
  const lerp = (a, b, t) => a + (b - a) * t;
  const k = { pos: [0, 0, 0], look: [0, 0, 0] };
  function sample(p) {
    let i = 0; while (i < K.length - 2 && p > K[i + 1].p) i++;
    const A = K[i], Bk = K[i + 1];
    let t = Math.min(1, Math.max(0, (p - A.p) / (Bk.p - A.p))); t = t * t * (3 - 2 * t);
    for (let n = 0; n < 3; n++) { k.pos[n] = lerp(A.pos[n], Bk.pos[n], t); k.look[n] = lerp(A.look[n], Bk.look[n], t); }
    for (const key of ["d", "dy", "rise", "win", "car"]) k[key] = lerp(A[key], Bk[key], t);
    return k;
  }

  const progress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    return max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
  };

  let px = 0, py = 0, tx = 0, ty = 0;
  addEventListener("pointermove", e => { tx = e.clientX / innerWidth * 2 - 1; ty = e.clientY / innerHeight * 2 - 1; }, { passive: true });

  let p = reduce ? 0.3 : progress(), spin = 0, lastT = performance.now(), lastTarget = p, vel = 0, running = true;
  const look = new THREE.Vector3();

  function frame(now) {
    const dt = Math.min((now - lastT) / 1000, 0.05); lastT = now;
    const target = reduce ? 0.3 : progress();
    vel = lerp(vel, Math.abs(target - lastTarget) / Math.max(dt, 0.001), 0.1); lastTarget = target;
    p += (target - p) * Math.min(1, dt * 3.2);
    const s = sample(p);

    px += (tx - px) * 0.04; py += (ty - py) * 0.04;
    camera.position.set(s.pos[0] + px * 0.9, s.pos[1] - py * 0.5, s.pos[2]);
    look.set(s.look[0], s.look[1], s.look[2]);
    camera.lookAt(look);

    const t = now / 1000;
    gem.position.y = s.dy + (reduce ? 0 : Math.sin(t * 0.9) * 0.16);
    gem.scale.setScalar(s.d);
    if (!reduce) spin += dt * (0.32 + Math.min(vel * 2.2, 3));
    gem.children[0].rotation.y = gem.children[1].rotation.y = spin;
    gem.rotation.z = Math.sin(t * 0.5) * 0.06;
    ring1.rotation.z = spin * 0.3; ring2.rotation.z = -spin * 0.22;
    glint.position.set(gem.position.x + Math.cos(t * 1.3) * 3, gem.position.y + 1.6, Math.sin(t * 1.3) * 3);

    setRise(s.rise);
    bMat.emissiveIntensity = s.win;
    trails.material.opacity = s.car * 0.9;

    if (s.car > 0.01) {
      for (let i = 0; i < TN; i++) {
        const c = T[i]; c.o = ((c.o + c.v * dt * (reduce ? 0 : 1)) % span + span) % span;
        const along = c.o - span / 2;
        if (c.axis) tPos.set([c.lane, 0.08, along], i * 3); else tPos.set([along, 0.08, c.lane], i * 3);
      }
      tGeo.attributes.position.needsUpdate = true;
    }
    if (!reduce) dust.rotation.y += dt * 0.012;

    renderer.render(scene, camera);
    if (running) requestAnimationFrame(frame);
  }

  addEventListener("resize", () => {
    camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight, false);
  });
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) { lastT = performance.now(); requestAnimationFrame(frame); }
  });

  requestAnimationFrame(frame);
  window.ARK_SCENE = { ready: true };
})();
