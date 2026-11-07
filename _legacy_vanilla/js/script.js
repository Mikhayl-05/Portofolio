/* ============================================================
   SCRIPT.JS — LOGIKA UTAMA PORTFOLIO MIKHAYL
   Untuk mengubah KONTEN, edit CONFIG.JS saja!
   ============================================================ */


/* ────────────────────────────────────────
   PRELOADER
──────────────────────────────────────── */
const _preloaderStart = Date.now();
let _preloaderDone = false;

// Cycle status text
(function() {
  const msgs = ['Initializing','Loading assets','Rendering','Almost ready'];
  let mi = 0;
  const el = document.getElementById('pre-status');
  if (!el) return;
  const t = setInterval(() => {
    mi = (mi + 1) % msgs.length;
    el.childNodes[0].textContent = msgs[mi];
  }, 700);
  // Stop cycling when done
  window._preStatusTimer = t;
})();

function hidePreloader() {
  if (_preloaderDone) return;
  _preloaderDone = true;
  if (window._preStatusTimer) clearInterval(window._preStatusTimer);
  const pre = document.getElementById('preloader');
  if (!pre) return;
  pre.style.opacity = '0';
  setTimeout(() => { pre.style.display = 'none'; showMusicPopup(); }, 600);
}

window.addEventListener('load', () => {
  const elapsed = Date.now() - _preloaderStart;
  setTimeout(hidePreloader, Math.max(0, 2400 - elapsed));
});

setTimeout(hidePreloader, 4000);


/* ────────────────────────────────────────
   SIDE DRAWER
──────────────────────────────────────── */
const hamBtn        = document.getElementById('ham-btn');
const drawer        = document.getElementById('mobile-menu');
const drawerOverlay = document.getElementById('drawer-overlay');

function openDrawer() {
  drawer.classList.add('open');
  drawerOverlay.classList.add('open');
  hamBtn.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  drawer.classList.remove('open');
  drawerOverlay.classList.remove('open');
  hamBtn.classList.remove('open');
  document.body.style.overflow = '';
}
hamBtn?.addEventListener('click', () =>
  drawer?.classList.contains('open') ? closeDrawer() : openDrawer()
);
drawerOverlay?.addEventListener('click', closeDrawer);
document.querySelectorAll('#mobile-menu .nav-link')
  .forEach(l => l.addEventListener('click', closeDrawer));


/* ────────────────────────────────────────
   DARK / LIGHT MODE
──────────────────────────────────────── */
let _isDark = true;
function applyTheme(dark) {
  _isDark = dark;
  document.documentElement?.classList.toggle('dark', dark);
  document.body?.classList.toggle('light-mode', !dark);
  const icon  = document.getElementById('drawer-theme-icon');
  const label = document.getElementById('drawer-theme-label');
  if (icon)  icon.textContent  = dark ? '🌙' : '☀️';
  if (label) label.textContent = dark ? 'Dark Mode' : 'Light Mode';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}
applyTheme(localStorage.getItem('theme') !== 'light');
document.getElementById('theme-toggle-desk')?.addEventListener('click', () => applyTheme(!_isDark));
document.getElementById('theme-toggle-mob')?.addEventListener('click',  () => applyTheme(!_isDark));


/* ────────────────────────────────────────
   MUSIK
──────────────────────────────────────── */
const bgAudio  = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');
let _playing   = false;

function stopAllAudio() {
  document.querySelectorAll('audio').forEach(a => {
    if (a !== bgAudio && !a.paused) { a.pause(); a.currentTime = 0; }
  });
  if (window._eeAudio && !window._eeAudio.paused) {
    window._eeAudio.pause(); window._eeAudio.currentTime = 0;
  }
}
musicBtn?.addEventListener('click', () => {
  if (!_playing) {
    stopAllAudio(); bgAudio.play().catch(() => {});
    if(musicBtn) musicBtn.textContent = '⏸'; musicBtn?.classList.add('playing'); _playing = true;
  } else {
    bgAudio.pause();
    if(musicBtn) musicBtn.textContent = '▶'; musicBtn?.classList.remove('playing'); _playing = false;
  }
});
function showMusicPopup() { document.getElementById('music-popup')?.classList.add('visible'); }
document.getElementById('music-ok')?.addEventListener('click', () => {
  stopAllAudio(); bgAudio.play().catch(() => {});
  if(musicBtn) musicBtn.textContent = '⏸'; musicBtn?.classList.add('playing'); _playing = true;
  document.getElementById('music-popup')?.classList.remove('visible');
});
document.getElementById('music-close')?.addEventListener('click', () => {
  document.getElementById('music-popup')?.classList.remove('visible');
});


/* ────────────────────────────────────────
   SCROLL REVEAL
──────────────────────────────────────── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); revObs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revObs.observe(el));


/* ────────────────────────────────────────
   SMOOTH SCROLL
──────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 72, behavior: 'smooth' }); }
  });
});


/* ────────────────────────────────────────
   ACTIVE NAV
──────────────────────────────────────── */
const _secMap = {
  hero: '#about', about: '#about', person: '#person', daily: '#daily',
  projects: '#projects', 'pameran-page': '#projects',
  github: '#github', otherskills: '#otherskills', contact: '#contact',
};
function updateActiveNav() {
  const secs    = Array.from(document.querySelectorAll('#hero,#about,#person,#daily,#projects,#github,#otherskills,#contact'));
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollY  = window.pageYOffset;
  const navH     = document.getElementById('navbar')?.offsetHeight || 72;
  const atBottom = (window.innerHeight + scrollY) >= document.body.scrollHeight - 10;
  let cur = secs[0]?.id || 'hero';
  if (atBottom) {
    cur = 'contact';
  } else {
    secs.forEach(s => { if (scrollY >= s.getBoundingClientRect().top + scrollY - navH - 40) cur = s.id; });
  }
  const target = _secMap[cur] || ('#' + cur);
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === target));
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('resize', updateActiveNav, { passive: true });
setTimeout(updateActiveNav, 400);


/* ────────────────────────────────────────
   NAVBAR — hide on scroll down (mobile)
──────────────────────────────────────── */
let _lastScrollY = 0;
const _navbar    = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const pct = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
  const _sb=document.getElementById('secret-bar'); if(_sb)_sb.style.width=pct+'%';
  if (window.innerWidth <= 768) {
    const cur = window.pageYOffset;
    _navbar.classList.toggle('nav-hidden', cur > _lastScrollY && cur > 80);
    _lastScrollY = cur;
  } else {
    _navbar.classList.remove('nav-hidden');
    _lastScrollY = window.pageYOffset;
  }
}, { passive: true });


/* ────────────────────────────────────────
   TYPEWRITER
──────────────────────────────────────── */
function typewriter(elId, text, stopAt, speed = 95) {
  let i = 0, del = false;
  const el = document.getElementById(elId);
  if (!el) return;
  function tick() {
    if (!del && i <= text.length)  { el.textContent = text.substring(0, i++); setTimeout(tick, speed); }
    else if (del && i > stopAt)    { el.textContent = text.substring(0, i--); setTimeout(tick, speed / 2); }
    else                           { del = !del; setTimeout(tick, 700); }
  }
  tick();
}
typewriter('about-typewriter',       "Hi, I'm Mikhayl 👋", 2);
setTimeout(() => typewriter('personality-typewriter', "Kebiasannya apanih!? 🎭", 6), 700);
setTimeout(() => typewriter('daily-typewriter',       "Sangat membosankan 🎈",   6), 1400);


/* ────────────────────────────────────────
   SKILL MODAL
──────────────────────────────────────── */
const _skillModal = document.getElementById('skill-modal');
document.querySelectorAll('.skill-item').forEach(s => {
  s.addEventListener('click', () => {
    const _mt=document.getElementById('modal-title'); if(_mt)_mt.textContent=s.dataset.title;
    const _md=document.getElementById('modal-desc'); if(_md)_md.textContent=s.dataset.desc;
    _skillModal.classList.remove('hidden');
  });
});
document.getElementById('close-modal')?.addEventListener('click', () => _skillModal.classList.add('hidden'));
_skillModal.addEventListener('click', e => { if (e.target === _skillModal) _skillModal.classList.add('hidden'); });


/* ────────────────────────────────────────
   FIREWORKS / PARTICLES
──────────────────────────────────────── */
const fxCanvas = document.getElementById('fx-canvas');
const fxCtx    = fxCanvas?.getContext('2d');
let fxW, fxH, fxParts = [], fxFW = [], fxAnimate = false;

function fxResize() { if(!fxCanvas)return; fxW = fxCanvas.width = window.innerWidth; fxH = fxCanvas.height = window.innerHeight; }
fxResize(); window.addEventListener('resize', fxResize, { passive: true });

function spawnStar() {
  if (fxParts.length < 3)
    fxParts.push({ x: Math.random()*fxW, y:-8, r:Math.random()*1.5+.5, s:Math.random()*1.5+.4, a:Math.random()*.5+.3 });
}
function spawnFW(x, y) {
  const h = Math.random()*360;
  for (let i=0;i<65;i++) fxFW.push({ x,y, r:Math.random()*2.5+1, c:`hsl(${h},100%,60%)`, vx:(Math.random()-.5)*13, vy:(Math.random()-.5)*13, a:1, d:Math.random()*.025+.01 });
}
function fxLoop() { if(!fxCtx)return;
  fxCtx.clearRect(0,0,fxW,fxH);
  if (!fxAnimate) spawnStar();
  fxParts = fxParts.filter(p => { p.y+=p.s; p.a-=.0015; if(p.a<=0||p.y>fxH)return false; fxCtx.globalAlpha=p.a; fxCtx.beginPath(); fxCtx.arc(p.x,p.y,p.r,0,Math.PI*2); fxCtx.fillStyle='#fff'; fxCtx.fill(); return true; });
  fxFW   = fxFW.filter(f => { f.x+=f.vx; f.y+=f.vy; f.a-=f.d; if(f.a<=0)return false; fxCtx.globalAlpha=f.a; fxCtx.beginPath(); fxCtx.arc(f.x,f.y,f.r,0,Math.PI*2); fxCtx.fillStyle=f.c; fxCtx.fill(); return true; });
  if (!fxFW.length) fxAnimate = false;
  fxCtx.globalAlpha = 1;
  requestAnimationFrame(fxLoop);
}
fxLoop();


/* ────────────────────────────────────────
   SECTION IN-VIEW OBSERVER
──────────────────────────────────────── */
const _sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting));
}, { threshold: 0.18 });
document.querySelectorAll('.section-wrap, #contact').forEach(s => _sectionObs.observe(s));


/* ────────────────────────────────────────
   IMAGE MODAL
──────────────────────────────────────── */
document.getElementById('image-modal')?.addEventListener('click', function() { this.style.display = 'none'; });


/* ────────────────────────────────────────
   SNAKE GAME — hero background
──────────────────────────────────────── */
(function() {
  const sc = document.getElementById('snake-canvas');
  if (!sc) return;
  const ctx = sc.getContext('2d'), SZ = 18;
  let W, H, cols, rows;
  function resize() { W=sc.width=sc.parentElement.offsetWidth||window.innerWidth; H=sc.height=sc.parentElement.offsetHeight||window.innerHeight; cols=Math.floor(W/SZ); rows=Math.floor(H/SZ); }
  resize(); window.addEventListener('resize', resize, { passive:true });
  function mkSnake() { const cx=Math.floor(cols/2),cy=Math.floor(rows/2); return [{x:cx,y:cy},{x:cx-1,y:cy},{x:cx-2,y:cy}]; }
  function rf() { return {x:Math.floor(Math.random()*cols),y:Math.floor(Math.random()*rows)}; }
  let snake=mkSnake(), dx=1, dy=0, food=rf(), growPending=0;
  function step() {
    if (Math.random()<0.06) { const dirs=[[1,0],[-1,0],[0,1],[0,-1]].filter(([nx,ny])=>!(nx===-dx&&ny===-dy)); [dx,dy]=dirs[Math.floor(Math.random()*dirs.length)]; }
    const nx=((snake[0].x+dx)+cols)%cols, ny=((snake[0].y+dy)+rows)%rows;
    if (snake.some(s=>s.x===nx&&s.y===ny)) { snake=mkSnake(); dx=1; dy=0; growPending=0; food=rf(); return; }
    snake.unshift({x:nx,y:ny});
    if (nx===food.x&&ny===food.y) { growPending+=4; food=rf(); }
    if (growPending>0) growPending--; else snake.pop();
  }
  function draw() {
    ctx.clearRect(0,0,W,H);
    ctx.shadowColor='#39FF14'; ctx.shadowBlur=10; ctx.fillStyle='#39FF14';
    ctx.fillRect(food.x*SZ+SZ*.25, food.y*SZ+SZ*.25, SZ*.5, SZ*.5);
    ctx.shadowBlur=0;
    snake.forEach((seg,i) => { const r=1-i/snake.length; ctx.globalAlpha=r*.8; ctx.fillStyle=i===0?'#39FF14':`rgba(57,255,20,${.3+r*.5})`; ctx.beginPath(); const pad=i===0?1:2,s=SZ-pad*2; ctx.roundRect(seg.x*SZ+pad,seg.y*SZ+pad,s,s,3); ctx.fill(); });
    ctx.globalAlpha=1;
  }
  let lastT=0;
  function loop(ts) { if(ts-lastT>=150){step();draw();lastT=ts;} requestAnimationFrame(loop); }
  requestAnimationFrame(loop);
})();


/* ────────────────────────────────────────
   MATRIX EASTER EGG
──────────────────────────────────────── */
let _matrixRunning=false, _matrixRAF=null;
function startMatrix() {
  const overlay=document.getElementById('matrix-overlay'), canvas=document.getElementById('matrix-canvas'), ctx=canvas.getContext('2d');
  const CHARS='アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEF'.split('');
  const FS=14;
  _matrixRunning=true; overlay.classList.add('active');
  canvas.width=window.innerWidth; canvas.height=window.innerHeight;
  const drops=Array(Math.floor(canvas.width/FS)).fill(0).map(()=>Math.random()*canvas.height/FS|0);
  function frame() {
    if (!_matrixRunning) return;
    ctx.fillStyle='rgba(0,0,0,0.05)'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font=`${FS}px monospace`;
    for (let i=0;i<drops.length;i++) {
      ctx.fillStyle=drops[i]*FS<canvas.height*.1?'#fff':`rgba(57,255,20,${Math.random()*.4+.6})`;
      ctx.fillText(CHARS[Math.floor(Math.random()*CHARS.length)],i*FS,drops[i]*FS);
      if (drops[i]*FS>canvas.height&&Math.random()>.975) drops[i]=0;
      drops[i]++;
    }
    _matrixRAF=requestAnimationFrame(frame);
  }
  _matrixRAF=requestAnimationFrame(frame);
}
function stopMatrix() { _matrixRunning=false; if(_matrixRAF)cancelAnimationFrame(_matrixRAF); document.getElementById('matrix-overlay')?.classList.remove('active'); }
document.getElementById('close-matrix')?.addEventListener('click', stopMatrix);
document.getElementById('matrix-overlay')?.addEventListener('click', e => { if(e.target===document.getElementById('matrix-overlay')||e.target===document.getElementById('matrix-canvas'))stopMatrix(); });
document.addEventListener('keydown', e => { if(e.key==='Escape'&&_matrixRunning)stopMatrix(); });


/* ────────────────────────────────────────
   LINUX TERMINAL EASTER EGG
──────────────────────────────────────── */
const TERM_SCRIPT = [
  {type:'prompt',cmd:'whoami'}, {type:'out',text:'mikhayl'},
  {type:'prompt',cmd:'uname -a'}, {type:'out',text:'Linux mikhayl-laptop 6.1.0 #1 SMP x86_64 GNU/Linux'},
  {type:'prompt',cmd:'ls skills/'}, {type:'out',text:'linux/  coding/  hacking/  design/  videografi/  fotografi/'},
  {type:'prompt',cmd:'cat about.txt'},
  {type:'out',text:'> Pelajar iseng yang suka ngulik hal random.'},
  {type:'out',text:'> Hobi: komputer, linux, desain, kamera.'},
  {type:'out',text:'> Status: di pesantren, bosen, tapi produktif.'},
  {type:'prompt',cmd:'sudo apt install creativity'},
  {type:'out',text:'[sudo] password for mikhayl: ••••••••'},
  {type:'out',text:'Reading package lists... Done'},
  {type:'ok',text:'Setting up creativity (∞.0) ... OK ✓'},
  {type:'prompt',cmd:'ping happiness -c 3'},
  {type:'ok',text:'64 bytes: icmp_seq=0 ttl=64 time=0.042 ms'},
  {type:'ok',text:'64 bytes: icmp_seq=1 ttl=64 time=0.038 ms'},
  {type:'ok',text:'3 packets, 0% packet loss 🚀'},
  {type:'prompt',cmd:'echo "easter egg ketemu!"'}, {type:'ok',text:'easter egg ketemu!'},
  {type:'prompt',cmd:''},
];
function startLinuxTerminal() {
  const overlay=document.getElementById('linux-overlay'), body=document.getElementById('term-body');
  body.innerHTML=''; overlay.classList.add('active');
  let idx=0;
  function printNext() {
    if (idx>=TERM_SCRIPT.length) { body.innerHTML+=`<span class="term-out"><span class="term-prompt">mikhayl@portfolio:~$ </span><span class="term-cursor"></span></span>\n`; return; }
    const line=TERM_SCRIPT[idx++], el=document.createElement('span');
    if (line.type==='prompt') { el.className='term-line'; el.innerHTML=`<span class="term-prompt">mikhayl@portfolio:~$ </span><span class="term-cmd">${line.cmd}</span>`; }
    else { el.className=`term-line term-${line.type}`; el.textContent=line.text; }
    body.appendChild(el); body.appendChild(document.createTextNode('\n'));
    body.scrollTop=body.scrollHeight;
    setTimeout(printNext, line.type==='prompt'?260:90);
  }
  printNext();
}
function stopLinuxTerminal() { document.getElementById('linux-overlay')?.classList.remove('active'); }
document.getElementById('term-close-dot')?.addEventListener('click', stopLinuxTerminal);
document.getElementById('linux-overlay')?.addEventListener('click', e => { if(e.target===document.getElementById('linux-overlay'))stopLinuxTerminal(); });
document.addEventListener('keydown', e => { if(e.key==='Escape'&&document.getElementById('linux-overlay')?.classList.contains('active'))stopLinuxTerminal(); });


/* ────────────────────────────────────────
   EASTER EGGS — dibaca dari EE_LIST (config.js)
──────────────────────────────────────── */
const eeEgg   = document.getElementById('easter-egg');
const eeText  = document.getElementById('ee-text');
const eeImg   = document.getElementById('ee-img');
const closeEE = document.getElementById('close-ee');
let _kBuf     = '';

// Build EE_COMMANDS otomatis dari EE_LIST
const EE_COMMANDS = {};
EE_LIST.forEach(ee => {
  if (ee.noPopup) {
    // Fullscreen easter eggs — action ditentukan berdasarkan keyword
    const actions = {
      matrix : () => startMatrix(),
      linux  : () => startLinuxTerminal(),
    };
    EE_COMMANDS[ee.keyword] = { noPopup: true, action: actions[ee.keyword] || null };
  } else {
    EE_COMMANDS[ee.keyword] = {
      text : ee.text || '',
      img  : ee.img  || null,
      action: ee.audio
        ? () => { stopAllAudio(); const a=new Audio(ee.audio); a.play().catch(()=>{}); window._eeAudio=a; }
        : ee.video
          ? () => {
              stopAllAudio();
              const v=document.createElement('video'); v.src=ee.video; v.controls=true; v.autoplay=true;
              v.style.cssText='max-width:100%;border-radius:10px;margin-bottom:12px;display:block';
              const box=document.getElementById('ee-box'); box.querySelector('video')?.remove(); eeImg.style.display='none';
              box.insertBefore(v,closeEE); window._eeVideo=v;
            }
          : null,
    };
  }
});

// Keyboard listener
document.addEventListener('keydown', e => {
  _kBuf += e.key.toLowerCase(); if (_kBuf.length>14) _kBuf=_kBuf.slice(-14);
  for (const key in EE_COMMANDS) { if (_kBuf.includes(key)) { const cmd=EE_COMMANDS[key]; cmd.noPopup?cmd.action?.():showEasterEgg(cmd); _kBuf=''; break; } }
});

// Konami Code
let _konami=[];
const KONAMI_SEQ=['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'];
document.addEventListener('keydown', e => {
  _konami.push(e.key.toLowerCase()); if(_konami.length>10)_konami.shift();
  if (_konami.join(',')===KONAMI_SEQ.join(',')) {
    _konami=[];
    const fl=document.getElementById('konami-flash'); fl.style.opacity='1'; setTimeout(()=>fl.style.opacity='0',200);
    showEasterEgg({text:'🕹️ KONAMI CODE ACTIVATED!\n+30 lives granted!\nGw tau lo penasaran banget 👀\n\nMasih ada easter egg lain nih...'});
    confetti({particleCount:180,spread:140,origin:{y:0.5}});
  }
});

function showEasterEgg(cmd) {
  eeText.textContent=cmd.text||''; eeImg.style.display='none';
  document.getElementById('ee-box').querySelector('video')?.remove();
  if (cmd.img){eeImg.src=cmd.img;eeImg.style.display='block';}
  if (cmd.action)cmd.action();
  eeEgg.classList.remove('hidden');
}
closeEE?.addEventListener('click', () => {
  eeEgg.classList.add('hidden'); stopAllAudio();
  if (window._eeVideo){window._eeVideo.pause();window._eeVideo.remove();delete window._eeVideo;}
});
document.getElementById('ee-backdrop')?.addEventListener('click', ()=>closeEE.click());


/* ────────────────────────────────────────
   GITHUB PROJECTS
──────────────────────────────────────── */
async function loadGitHub() {
  const UNAME=CONFIG_PROFIL.username_gh, container=document.getElementById('github-repos');
  const LANG_COLORS={JavaScript:'#f1e05a',Python:'#3572A5',HTML:'#e34c26',CSS:'#563d7c',TypeScript:'#2b7489',Shell:'#89e051',PHP:'#4F5D95',Java:'#b07219','C++':'#f34b7d',Go:'#00ADD8',Rust:'#dea584',Vue:'#41b883',default:'#7a8599'};
  const _hgl=document.getElementById('hero-github-link'); if(_hgl)_hgl.href='https://github.com/'+UNAME;
  try {
    const res=await fetch(`https://api.github.com/users/${UNAME}/repos?sort=updated&per_page=9`);
    if (!res.ok)throw new Error('fail');
    const repos=await res.json(), list=repos.filter(r=>!r.fork).slice(0,9);
    if (!list.length)throw new Error('empty');
    const MAX=2;
    const lessBtn=document.createElement('div'); lessBtn.id='gh-toggle-btn';
    lessBtn.style.cssText='display:none;text-align:center;margin-top:28px;opacity:0;transition:opacity 0.4s ease;';
    lessBtn.innerHTML='<button class="toggle-btn">↑ Tampilkan lebih sedikit</button>';
    container.insertAdjacentElement('afterend',lessBtn);
    lessBtn.querySelector('button').addEventListener('click',()=>{ renderCards(false); window.scrollTo({top:document.getElementById('github')?.getBoundingClientRect().top+window.pageYOffset-90,behavior:'smooth'}); });
    function renderCards(showAll) {
      const toShow=showAll?list:list.slice(0,MAX);
      let html=toShow.map(r=>`<a href="${r.html_url}" target="_blank" class="github-card glass card-hover-green" style="text-decoration:none;color:inherit"><div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:12px"><div style="min-width:0"><div style="font-family:var(--font-d);font-weight:700;font-size:0.9rem;margin-bottom:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.name}</div><p style="color:var(--text-muted);font-size:0.74rem;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${r.description||'No description'}</p></div><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2" style="flex-shrink:0;margin-top:2px"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></div><div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">${r.language?`<div style="display:flex;align-items:center;gap:5px"><span class="lang-dot" style="background:${LANG_COLORS[r.language]||LANG_COLORS.default}"></span><span class="gh-stat">${r.language}</span></div>`:''}<div class="gh-stat">⭐ ${r.stargazers_count}</div><div class="gh-stat">🍴 ${r.forks_count}</div>${r.topics?.length?`<span class="chip" style="font-size:0.5rem;padding:2px 7px">${r.topics[0]}</span>`:''}</div></a>`).join('');
      if (!showAll&&list.length>MAX) html+=`<div id="gh-more-card" class="github-card glass card-hover-green" style="cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:140px;text-align:center"><div style="font-size:1.8rem;margin-bottom:10px">📂</div><div style="font-family:var(--font-d);font-weight:700;font-size:0.95rem;color:var(--green);margin-bottom:4px">Tampilkan lebih banyak</div><div style="color:var(--text-muted);font-size:0.74rem">${list.length-MAX} repo lainnya</div></div>`;
      container.innerHTML=html;
      const moreBtn=document.getElementById('gh-more-card');
      if (moreBtn) { moreBtn.addEventListener('click',()=>{ renderCards(true); lessBtn.style.display='block'; setTimeout(()=>lessBtn.style.opacity='1',30); }); lessBtn.style.opacity='0'; setTimeout(()=>lessBtn.style.display='none',400); }
      else { lessBtn.style.display='block'; setTimeout(()=>lessBtn.style.opacity='1',30); }
      container.querySelectorAll('.github-card').forEach(el=>{el.classList.add('reveal');revObs.observe(el);});
    }
    renderCards(false);
  } catch(_) {
    container.innerHTML=`<div class="glass" style="grid-column:1/-1;text-align:center;padding:36px 20px;border-radius:16px"><div style="font-family:var(--font-m);font-size:0.68rem;color:var(--text-muted);letter-spacing:2px;line-height:2">📡 Lihat project GitHub gw di sini:<br><a href="https://github.com/${UNAME}" target="_blank" style="color:var(--green);text-decoration:underline">github.com/${UNAME}</a></div></div>`;
  }
}
function buildContribGraph() {
  const el=document.getElementById('contrib-graph'); let html='<div style="display:flex;gap:3px;min-width:max-content">';
  for (let w=0;w<52;w++) { html+='<div style="display:flex;flex-direction:column;gap:3px">'; for(let d=0;d<7;d++){const r=Math.random();html+=`<div class="contrib-cell ${r>.88?'l4':r>.68?'l3':r>.48?'l2':r>.28?'l1':''}"></div>`;} html+='</div>'; }
  html+='</div>'; el.innerHTML=html;
}
loadGitHub(); buildContribGraph();


/* ────────────────────────────────────────
   CLICK RIPPLE
──────────────────────────────────────── */
document.addEventListener('click', e => {
  const d=document.createElement('div'); d.className='ripple-dot'; d.style.left=e.clientX+'px'; d.style.top=e.clientY+'px';
  document.body.appendChild(d); setTimeout(()=>d.remove(),650);
});


/* ────────────────────────────────────────
   SUPPORT BUTTON — 10x klik unlock 🥚
──────────────────────────────────────── */
let _supTapCount=0, _supTimer=null;
const _supBtn=document.getElementById('message-btn');
if (_supBtn) {
  _supBtn.addEventListener('click', e => {
    e.preventDefault(); _supTapCount++;
    if (_supTapCount===10) {
      const mBtn=document.getElementById('mobile-ee-btn');
      if (mBtn) { mBtn.classList.add('unlocked'); mBtn.style.animation='eggPop 0.5s cubic-bezier(.175,.885,.32,1.275)'; }
      showEasterEgg({text:'🥚 SECRET UNLOCKED!\nLo nemu hidden easter egg button!\nTombol 🥚 sekarang aktif di pojok kanan bawah.\n\nGw tau lo penasaran banget.. 👀'});
      confetti({particleCount:80,spread:90,origin:{y:0.6}}); _supTapCount=0; return;
    }
    fxAnimate=true;
    const rc=e.currentTarget.getBoundingClientRect(), cx=rc.left+rc.width/2, cy=rc.top+rc.height/2;
    for(let i=0;i<5;i++) setTimeout(()=>spawnFW(cx+(Math.random()-.5)*120,cy+(Math.random()-.5)*80),i*200);
    confetti({particleCount:60,spread:80,origin:{x:cx/window.innerWidth,y:cy/window.innerHeight}});
    setTimeout(()=>window.open(CONFIG_PROFIL.sosial.trakteer,'_blank','noopener,noreferrer'),1200);
  });
  const sp=()=>{_supTimer=setTimeout(()=>showEasterEgg({text:'☕ LONG PRESS DETECTED!\nWahh makasih udah niat banget mau support!\nBeneran deh, itu berarti banget buat gw 🙏'}),1500);};
  const ep=()=>clearTimeout(_supTimer);
  _supBtn.addEventListener('mousedown',sp); _supBtn.addEventListener('mouseup',ep); _supBtn.addEventListener('mouseleave',ep);
  _supBtn.addEventListener('touchstart',sp,{passive:true}); _supBtn.addEventListener('touchend',ep);
}


/* ────────────────────────────────────────
   MOBILE EGG MENU 🥚 — dari EE_MOBILE_MENU (config.js)
──────────────────────────────────────── */
(function() {
  const mBtn=document.getElementById('mobile-ee-btn'), mMenu=document.getElementById('mobile-ee-menu');
  if (!mBtn||!mMenu) return;
  // Build menu dari config
  mMenu.innerHTML=EE_MOBILE_MENU.map(item=>`<button class="mob-ee-item" data-ee="${item.keyword}">${item.label}</button>`).join('');
  let menuOpen=false;
  function openMenu()  { mMenu.classList.add('open'); requestAnimationFrame(()=>mMenu.classList.add('visible')); menuOpen=true; mBtn.textContent='✕'; }
  function closeMenu() { mMenu.classList.remove('visible'); setTimeout(()=>mMenu.classList.remove('open'),250); menuOpen=false; mBtn.textContent='🥚'; }
  mBtn.addEventListener('click',e=>{e.stopPropagation();menuOpen?closeMenu():openMenu();});
  document.addEventListener('click',e=>{if(menuOpen&&!mMenu.contains(e.target)&&e.target!==mBtn)closeMenu();});
  mMenu.querySelectorAll('.mob-ee-item').forEach(item=>{
    item.addEventListener('click',()=>{
      closeMenu(); const key=item.dataset.ee;
      if (key==='konami') { const fl=document.getElementById('konami-flash');fl.style.opacity='1';setTimeout(()=>fl.style.opacity='0',200);showEasterEgg({text:'🕹️ KONAMI CODE ACTIVATED!\n+30 lives granted!'});confetti({particleCount:180,spread:140,origin:{y:0.5}});return; }
      const cmd=EE_COMMANDS[key]; if(!cmd)return; cmd.noPopup?cmd.action?.():showEasterEgg(cmd);
    });
  });
})();


/* ────────────────────────────────────────
   DOUBLE CLICK NAMA → easter egg
──────────────────────────────────────── */
document.querySelector('.hero-name')?.addEventListener('dblclick', () => {
  showEasterEgg(EE_COMMANDS.mikhayl); confetti({particleCount:80,spread:90,origin:{y:0.3}});
});


/* ────────────────────────────────────────
   SHAKE HP → easter egg
──────────────────────────────────────── */
let _lastShake=0;
if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', e => {
    const a=e.accelerationIncludingGravity; if(!a)return;
    const force=Math.abs(a.x||0)+Math.abs(a.y||0)+Math.abs(a.z||0), now=Date.now();
    if (force>40&&now-_lastShake>3000) { _lastShake=now; showEasterEgg({text:'📱 SHAKE DETECTED!\nWahhh HP-nya dikocok? 😂\n\nCoba juga: Konami Code ↑↑↓↓←→←→BA'}); confetti({particleCount:60,spread:100,origin:{y:0.5}}); }
  });
}


/* ────────────────────────────────────────
   EASTER EGG RASA — handled by spa-pameran.js
──────────────────────────────────────── */


/* ────────────────────────────────────────
   NOW PLAYING WIDGET — sinkron bgAudio
──────────────────────────────────────── */
(function() {
  const vinyl=document.getElementById('np-vinyl'), eq=document.getElementById('np-eq'), dot=document.getElementById('np-dot');
  const statusTxt=document.getElementById('np-status-txt'), progress=document.getElementById('np-progress');
  const curEl=document.getElementById('np-cur'), durEl=document.getElementById('np-dur');
  if (!vinyl||!bgAudio) return;
  document.querySelectorAll('.np-song').forEach(el=>el.textContent=CONFIG_MUSIK.judul);
  document.querySelectorAll('.np-artist').forEach(el=>el.textContent=CONFIG_MUSIK.artis);
  if (durEl) durEl.textContent=CONFIG_MUSIK.durasi;
  const fmt=s=>`${Math.floor(s/60)}:${Math.floor(s%60).toString().padStart(2,'0')}`;
  function setPlaying(on) {
    vinyl.classList.toggle('playing',on); eq.classList.toggle('playing',on);
    dot.classList.toggle('paused',!on); statusTxt.textContent=on?'NOW PLAYING':'PAUSED';
  }
  setInterval(()=>{ if(!bgAudio.paused&&bgAudio.duration){progress.style.width=(bgAudio.currentTime/bgAudio.duration*100)+'%';curEl.textContent=fmt(bgAudio.currentTime);durEl.textContent=fmt(bgAudio.duration);} },1000);
  bgAudio.addEventListener('play', ()=>setPlaying(true));
  bgAudio.addEventListener('pause',()=>setPlaying(false));
  bgAudio.addEventListener('ended',()=>setPlaying(false));
  setPlaying(!bgAudio.paused);
})();


/* ────────────────────────────────────────
   FLIP CARDS — render dari CONFIG_FLIPCARD + klik/tap/swipe
──────────────────────────────────────── */
(function() {
  // Map flip id → config key & nomor
  const FLIP_MAP = [
    { id: 'flip-about',  key: 'about',       num: '01' },
    { id: 'flip-person', key: 'personality',  num: '02' },
    { id: 'flip-daily',  key: 'daily',        num: '03' },
  ];

  FLIP_MAP.forEach(({ id, key, num }) => {
    const card = document.getElementById(id);
    if (!card) return;

    // ── Render bagian belakang dari config ──
    const cfg = CONFIG_FLIPCARD?.[key];
    const back = card.querySelector('.flip-card-back');

    if (cfg && back && cfg.type === 'info') {
      // Render ulang isi flip-card-back dari config
      const chipsHTML = (cfg.chips || [])
        .map(c => `<span class="chip">${c}</span>`)
        .join('');
      back.innerHTML = `
        <div class="flip-num">${num}</div>
        <div class="flip-emoji">${cfg.emoji || ''}</div>
        <div class="flip-title">${cfg.judul || ''}</div>
        <p class="flip-body">${cfg.isi || ''}</p>
        <div class="flip-chips">${chipsHTML}</div>
      `;
    }
    // type 'nowplaying' → biarkan HTML as-is (widget Spotify)

    // ── Interaksi klik/tap/swipe ──
    card.addEventListener('click', () => card.classList.toggle('flipped'));

    let tx = 0, ty = 0;
    card.addEventListener('touchstart', e => {
      tx = e.touches[0].clientX; ty = e.touches[0].clientY;
    }, { passive: true });
    card.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - tx;
      const dy = e.changedTouches[0].clientY - ty;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy))
        card.classList.toggle('flipped', dx < 0);
    }, { passive: true });
  });
})();


/* ────────────────────────────────────────
   BLOCK KLIK KANAN GAMBAR
──────────────────────────────────────── */
document.addEventListener('contextmenu', e=>{ if(e.target.tagName==='IMG')e.preventDefault(); });


/* ────────────────────────────────────────
   CONSOLE EASTER EGG
──────────────────────────────────────── */
console.log('%c🕵️ Secret Unlocked!','color:#39FF14;font-size:18px;font-weight:bold;font-family:monospace');
console.log('%cHalo dev! Lo nemuin easter egg console 😎','color:#22c55e;font-size:13px');
console.log('%cKeyword: '+EE_LIST.map(e=>e.keyword).join(' · '),'color:#22c55e;font-size:11px');
console.log('%cKonami: ↑↑↓↓←→←→BA  |  Double-click MIKHAYL  |  Shake HP  |  10x Support  |  Klik "rasa" 5x','color:#39FF14;font-size:11px;font-family:monospace');
