import React, { useEffect, useRef, useState } from 'react';

export default function Preloader({ onDone }) {
  const [visible, setVisible] = useState(true);
  const statusRef = useRef(null);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const msgs = ['Initializing', 'Loading assets', 'Rendering', 'Almost ready'];
    let mi = 0;
    const t = setInterval(() => {
      mi = (mi + 1) % msgs.length;
      if (statusRef.current) statusRef.current.textContent = msgs[mi];
    }, 700);

    let done = false;
    const hide = () => {
      if (done) return;
      done = true;
      clearInterval(t);
      const el = document.getElementById('preloader');
      if (el) {
        el.style.opacity = '0';
        setTimeout(() => {
          setVisible(false);
          onDone?.();
        }, 600);
      } else {
        setVisible(false);
        onDone?.();
      }
    };

    const elapsed = Date.now() - startRef.current;
    const timer1 = setTimeout(hide, Math.max(0, 2400 - elapsed));
    const timer2 = setTimeout(hide, 4000);

    return () => { clearInterval(t); clearTimeout(timer1); clearTimeout(timer2); };
  }, [onDone]);

  if (!visible) return null;

  return (
    <div id="preloader">
      <div className="pre-grid"></div>
      <div className="pre-scan"></div>
      <div className="pre-corner tl"></div>
      <div className="pre-corner tr"></div>
      <div className="pre-corner bl"></div>
      <div className="pre-corner br"></div>
      <div className="pre-dot" style={{'--d':'3.5s','--dl':'0s','--op':'0.4',top:'22%',left:'12%'}}></div>
      <div className="pre-dot" style={{'--d':'4.2s','--dl':'-1s','--op':'0.25',top:'65%',left:'8%'}}></div>
      <div className="pre-dot" style={{'--d':'5s','--dl':'-2s','--op':'0.35',top:'28%',right:'10%'}}></div>
      <div className="pre-dot" style={{'--d':'3.8s','--dl':'-0.5s','--op':'0.2',top:'72%',right:'15%'}}></div>
      <div className="pre-dot" style={{'--d':'4.5s','--dl':'-1.5s','--op':'0.3',top:'82%',left:'28%'}}></div>
      <div className="pre-ring">
        <img src="/img/profil/profil.jpg" alt="Mikhayl" />
      </div>
      <div className="pre-name" data-text="MIKHAYL">MIKHAYL</div>
      <div className="pre-sub">Portfolio</div>
      <div className="pre-status" id="pre-status">
        <span ref={statusRef}>Initializing</span>
      </div>
      <div className="pre-bar-wrap"><div className="pre-bar-fill"></div></div>
    </div>
  );
}

