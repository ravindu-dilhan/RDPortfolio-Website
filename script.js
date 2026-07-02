// ── LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 700);
  }, 2200);
});

// ── CURSOR ──
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,.btn,.skill-cube,.project-card,.social-btn').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width = '20px'; cursor.style.height = '20px'; cursorRing.style.width = '60px'; cursorRing.style.height = '60px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width = '12px'; cursor.style.height = '12px'; cursorRing.style.width = '38px'; cursorRing.style.height = '38px'; });
});

// ── SCROLL PROGRESS ──
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scroll-bar').style.width = scrolled + '%';
});

// ── MOBILE MENU ──
function toggleMenu() { document.getElementById('mobile-menu').classList.toggle('open'); }
function closeMobileMenu() { document.getElementById('mobile-menu').classList.remove('open'); }
document.getElementById('menu-close').onclick = closeMobileMenu;

// ── TYPING EFFECT ──
const phrases = ['Software Engineering Student', 'Future Full Stack Developer', 'Web Designer', 'Problem Solver', 'Tech Enthusiast'];
let phraseIdx = 0, charIdx = 0, deleting = false;
function typeWriter() {
  const target = document.getElementById('typed-text');
  const current = phrases[phraseIdx];
  if (!deleting) {
    target.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) { setTimeout(() => { deleting = true; typeWriter(); }, 1800); return; }
  } else {
    target.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
  }
  setTimeout(typeWriter, deleting ? 45 : 90);
}
setTimeout(typeWriter, 2400);

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 80); } });
}, { threshold: 0.08 });
revealEls.forEach(el => revObs.observe(el));

// ── COUNTER ANIMATION ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, 25);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); } });
}, { threshold: .5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObs.observe(el));

// ── 3D TILT ON PROJECT CARDS ──
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(10px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0)'; });
});

// ── HERO PARALLAX ──
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  const profileWrap = document.querySelector('.hero-visual');
  if (profileWrap) profileWrap.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
});

// ── CANVAS STARFIELD ──
(function() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, stars = [], particles = [], mx = 0, my = 0;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.5 + 0.2,
        speed: Math.random() * 0.3 + 0.05,
        alpha: Math.random() * 0.6 + 0.2,
        twinkle: Math.random() * Math.PI * 2
      });
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        color: ['#00D4FF','#8B5CF6','#00FFB2'][Math.floor(Math.random()*3)],
        alpha: Math.random() * 0.4 + 0.1
      });
    }
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Nebula glows
    const nebulas = [
      { x: W*0.15, y: H*0.2, r: 300, c: '0,212,255' },
      { x: W*0.85, y: H*0.7, r: 280, c: '139,92,246' },
      { x: W*0.5, y: H*0.85, r: 220, c: '0,255,178' },
    ];
    nebulas.forEach(n => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      g.addColorStop(0, `rgba(${n.c},0.04)`);
      g.addColorStop(1, `rgba(${n.c},0)`);
      ctx.fillStyle = g; ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI*2); ctx.fill();
    });

    // Stars
    frame++;
    stars.forEach(s => {
      s.twinkle += 0.02;
      const alpha = s.alpha * (0.7 + 0.3 * Math.sin(s.twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
      s.y += s.speed;
      if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
    });

    // Floating particles
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2,'0');
      ctx.fill();
    });

    // Connect nearby particles
    particles.forEach((a, i) => {
      particles.slice(i+1).forEach(b => {
        const d = Math.hypot(a.x-b.x, a.y-b.y);
        if (d < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1-d/120)})`;
          ctx.lineWidth = .5;
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      });
    });

    // Mouse glow
    const mg = ctx.createRadialGradient(mx, my, 0, mx, my, 160);
    mg.addColorStop(0, 'rgba(0,212,255,0.04)');
    mg.addColorStop(1, 'rgba(0,212,255,0)');
    ctx.fillStyle = mg; ctx.fillRect(0, 0, W, H);

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initStars(); initParticles(); });
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  resize(); initStars(); initParticles(); draw();
})();

// ── PARTICLE EXPLOSION ON BUTTON CLICK ──
document.querySelectorAll('.btn, .btn-sm').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    for (let i = 0; i < 12; i++) {
      const el = document.createElement('div');
      el.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:6px;height:6px;border-radius:50%;pointer-events:none;z-index:99999;background:${['#00D4FF','#8B5CF6','#00FFB2'][i%3]};`;
      document.body.appendChild(el);
      const angle = (i / 12) * Math.PI * 2;
      const dist = 60 + Math.random() * 40;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      el.animate([
        { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
      ], { duration: 600, easing: 'cubic-bezier(0,1,.5,1)' }).onfinish = () => el.remove();
    }
  });
});

// ── FORM SUBMIT ──
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target;
  btn.textContent = '⏳ Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✅ Sent!';
    document.getElementById('formSuccess').style.display = 'block';
    document.getElementById('fname').value = '';
    document.getElementById('femail').value = '';
    document.getElementById('fsubject').value = '';
    document.getElementById('fmessage').value = '';
    setTimeout(() => {
      btn.textContent = '🚀 Send Message';
      btn.disabled = false;
      document.getElementById('formSuccess').style.display = 'none';
    }, 3000);
  }, 1500);
}

// ── CV DOWNLOAD ──
function downloadCV(e) {
  e.preventDefault();
  const btn = e.currentTarget;
  btn.textContent = '⏳ Preparing...';
  setTimeout(() => {
    btn.innerHTML = '📄 Download CV';
    alert('📄 CV download will be available once you link your actual CV file to this button!');
  }, 1000);
}

// ── NAV SCROLL EFFECT ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.background = window.scrollY > 50 ? 'rgba(5,8,22,0.95)' : 'rgba(5,8,22,0.7)';
});