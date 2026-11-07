import React, { useState, useRef, useEffect } from 'react';
import { PAMERAN } from '../data/config.js';
import { initTiltCards } from '../effects/premiumEffects.js';

export default function Pameran() {
  const [activeKey, setActiveKey] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const projectsRef = useRef(null);
  const detailRef = useRef(null);
  const trackRef = useRef(null);
  const videoRef = useRef(null);

  const entries = Object.entries(PAMERAN);
  const MAX_VISIBLE = 2;
  const activeData = activeKey ? PAMERAN[activeKey] : null;

  // Initialize tilt cards when grid items render or toggle
  useEffect(() => {
    if (!activeKey) {
      setTimeout(() => initTiltCards(), 150);
    }
  }, [showAll, activeKey]);

  // Open detail
  const handleOpenPameran = (key) => {
    setActiveKey(key);
    setSlideIndex(0);
    setTimeout(() => {
      if (detailRef.current) {
        window.scrollTo({ top: detailRef.current.offsetTop - 80, behavior: 'smooth' });
      }
    }, 100);
  };

  // Back to grid
  const handleBack = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setActiveKey(null);
    setTimeout(() => {
      if (projectsRef.current) {
        window.scrollTo({ top: projectsRef.current.offsetTop - 80, behavior: 'smooth' });
      }
    }, 100);
  };

  // Keyboard navigation for image slider
  useEffect(() => {
    if (!activeData || activeData.media?.type !== 'image') return;
    const images = activeData.media.images || [];
    if (images.length <= 1) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSlideIndex(idx => (idx - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSlideIndex(idx => (idx + 1) % images.length);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeData]);

  // Touch and drag slider handling
  const dragRef = useRef({ startX: 0, startY: 0, diffX: 0, isDragging: false, active: false });

  const onDragStart = (clientX, clientY) => {
    dragRef.current = { startX: clientX, startY: clientY, diffX: 0, isDragging: false, active: true };
    if (trackRef.current) trackRef.current.style.transition = 'none';
  };

  const onDragMove = (clientX, clientY, containerWidth, imagesCount) => {
    if (!dragRef.current.active) return;
    const diffX = clientX - dragRef.current.startX;
    const diffY = clientY - dragRef.current.startY;
    if (!dragRef.current.isDragging && Math.abs(diffX) < 5 && Math.abs(diffY) < 5) return;
    if (!dragRef.current.isDragging) {
      if (Math.abs(diffY) > Math.abs(diffX)) return;
      dragRef.current.isDragging = true;
    }
    dragRef.current.diffX = diffX;
    const base = slideIndex * (100 / imagesCount);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(calc(-${base}% + ${diffX}px))`;
    }
  };

  const onDragEnd = (containerWidth, imagesCount) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    const { diffX, isDragging } = dragRef.current;
    const threshold = containerWidth * 0.22;
    if (isDragging) {
      if (diffX < -threshold) {
        setSlideIndex(idx => (idx + 1) % imagesCount);
      } else if (diffX > threshold) {
        setSlideIndex(idx => (idx - 1 + imagesCount) % imagesCount);
      }
    }
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.42s cubic-bezier(0.25, 0.8, 0.25, 1)';
      trackRef.current.style.transform = `translateX(-${slideIndex * (100 / imagesCount)}%)`;
    }
  };

  const toShow = showAll ? entries : entries.slice(0, MAX_VISIBLE);

  return (
    <>
      {/* ── SECTION: PAMERAN GRID ── */}
      <section
        id="projects"
        ref={projectsRef}
        className="section-wrap"
        style={{
          display: activeKey ? 'none' : 'block',
          opacity: activeKey ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}
      >
        <div className="reveal">
          <div className="section-label">/ 04 — PAMERAN</div>
          <h2 className="section-title">Display</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '-28px', marginBottom: '32px' }}>
            Hal-hal yang pengen gw share & ceritain
          </p>
        </div>

        <div id="pameran-grid" className="pameran-grid">
          {toShow.map(([key, item]) => (
            <div
              key={key}
              className="pameran-card glass card-hover-green"
              onClick={() => handleOpenPameran(key)}
            >
              <div style={{ overflow: 'hidden' }}>
                <img
                  src={item.thumb}
                  alt={item.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                />
              </div>
              <div className="pameran-card-body">
                <span className="pameran-card-tag">Display</span>
                <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: '6px' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                  {item.description || ''}
                </p>
              </div>
            </div>
          ))}

          {/* "Tampilkan lebih banyak" card */}
          {!showAll && entries.length > MAX_VISIBLE && (
            <div
              className="pameran-card glass card-hover-green"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '280px',
                cursor: 'pointer'
              }}
              onClick={() => setShowAll(true)}
            >
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '12px' }}>✨</div>
                <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '1rem', color: 'var(--green)', marginBottom: '8px' }}>
                  Tampilkan lebih banyak
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                  {entries.length - MAX_VISIBLE} konten lainnya
                </p>
              </div>
            </div>
          )}
        </div>

        {/* "Tampilkan lebih sedikit" Button */}
        {showAll && (
          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <button
              className="toggle-btn"
              onClick={() => {
                setShowAll(false);
                if (projectsRef.current) {
                  window.scrollTo({
                    top: projectsRef.current.getBoundingClientRect().top + window.pageYOffset - 90,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              ↑ Tampilkan lebih sedikit
            </button>
          </div>
        )}
      </section>

      {/* ── SECTION: PAMERAN DETAIL ── */}
      <section
        id="pameran-page"
        ref={detailRef}
        className={activeKey ? '' : 'hidden'}
        style={{
          opacity: activeKey ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        {activeData && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>
              <h1
                id="pameran-title"
                style={{
                  fontFamily: 'var(--font-d)',
                  fontSize: 'clamp(1.4rem,4vw,2.2rem)',
                  fontWeight: 800,
                  color: 'var(--green)',
                  lineHeight: 1.1
                }}
              >
                {activeData.title}
              </h1>
              <button onClick={handleBack} className="pameran-back">
                ← Kembali
              </button>
            </div>

            {/* Media container */}
            <div className="media-wrap" style={{ marginBottom: '20px' }}>
              {activeData.media.type === 'image' && (
                (() => {
                  const images = activeData.media.images || [];
                  const isMultiple = images.length > 1;

                  return (
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                        userSelect: 'none'
                      }}
                      onMouseDown={(e) => isMultiple && onDragStart(e.clientX, e.clientY)}
                      onMouseMove={(e) => {
                        if (isMultiple && dragRef.current.active) {
                          const w = e.currentTarget.offsetWidth;
                          onDragMove(e.clientX, e.clientY, w, images.length);
                        }
                      }}
                      onMouseUp={(e) => isMultiple && onDragEnd(e.currentTarget.offsetWidth, images.length)}
                      onMouseLeave={(e) => isMultiple && onDragEnd(e.currentTarget.offsetWidth, images.length)}
                      onTouchStart={(e) => isMultiple && onDragStart(e.touches[0].clientX, e.touches[0].clientY)}
                      onTouchMove={(e) => {
                        if (isMultiple && dragRef.current.active) {
                          const w = e.currentTarget.offsetWidth;
                          onDragMove(e.touches[0].clientX, e.touches[0].clientY, w, images.length);
                        }
                      }}
                      onTouchEnd={(e) => isMultiple && onDragEnd(e.currentTarget.offsetWidth, images.length)}
                    >
                      <div
                        ref={trackRef}
                        style={{
                          display: 'flex',
                          width: `${images.length * 100}%`,
                          height: '100%',
                          transform: `translateX(-${slideIndex * (100 / images.length)}%)`,
                          transition: 'transform 0.42s cubic-bezier(0.25, 0.8, 0.25, 1)',
                          willChange: 'transform'
                        }}
                      >
                        {images.map((src, i) => (
                          <div
                            key={i}
                            style={{ width: `${100 / images.length}%`, height: '100%', flexShrink: 0, position: 'relative' }}
                          >
                            <img
                              src={src}
                              alt={activeData.title}
                              loading="lazy"
                              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'zoom-in' }}
                              onClick={() => {
                                if (!dragRef.current.isDragging && window.openImageModal) {
                                  window.openImageModal(src);
                                }
                              }}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Slider controls if multiple */}
                      {isMultiple && (
                        <>
                          <button
                            className="slider-btn prev"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSlideIndex(idx => (idx - 1 + images.length) % images.length);
                            }}
                          >
                            ❮
                          </button>
                          <button
                            className="slider-btn next"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSlideIndex(idx => (idx + 1) % images.length);
                            }}
                          >
                            ❯
                          </button>
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '12px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              display: 'flex',
                              gap: '6px',
                              zIndex: 10
                            }}
                          >
                            {images.map((_, i) => (
                              <button
                                key={i}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSlideIndex(i);
                                }}
                                style={{
                                  width: '7px',
                                  height: '7px',
                                  borderRadius: '50%',
                                  border: 'none',
                                  cursor: 'pointer',
                                  background: i === slideIndex ? '#39FF14' : 'rgba(255,255,255,0.4)',
                                  transform: i === slideIndex ? 'scale(1.3)' : 'scale(1)',
                                  transition: 'background 0.25s, transform 0.25s',
                                  padding: 0
                                }}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })()
              )}

              {activeData.media.type === 'video' && (
                <video
                  ref={videoRef}
                  src={activeData.media.src}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              )}
            </div>

            {/* Meta */}
            <div
              id="pameran-meta"
              style={{
                fontFamily: 'var(--font-m)',
                fontSize: '0.62rem',
                color: 'var(--text-muted)',
                letterSpacing: '2px',
                marginBottom: '20px'
              }}
            >
              {activeData.meta || ''}
            </div>

            {/* Content with HTML */}
            <article
              id="pameran-content"
              style={{ color: 'var(--text-muted)', lineHeight: 1.9, fontSize: '0.9rem' }}
              className="space-y-4"
              dangerouslySetInnerHTML={{ __html: activeData.content }}
            />
          </>
        )}
      </section>
    </>
  );
}

