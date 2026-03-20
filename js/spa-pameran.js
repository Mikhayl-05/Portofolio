// ==============================
// GLOBAL STATE
// ==============================
let currentVideo = null;

// ==============================
// OPEN PAMERAN (DENGAN ANIMASI + FIX SCROLL)
// ==============================
function openPameran(key) {
  const data = PAMERAN[key];
  if (!data) return;

  // v3: hide the whole projects section, show pameran-page
  const projectsSection = document.getElementById("projects");
  const detail = document.getElementById("pameran-page");

  if (projectsSection) {
    projectsSection.style.opacity = "0";
    projectsSection.style.transition = "opacity 0.3s ease";
    setTimeout(() => { projectsSection.style.display = "none"; }, 300);
  }

  setTimeout(() => {
    detail.classList.remove("hidden");
    detail.style.opacity = "0";
    setTimeout(() => { detail.style.opacity = "1"; detail.style.transition = "opacity 0.3s ease"; }, 50);

    // scroll to top of detail
    window.scrollTo({ top: detail.offsetTop - 80, behavior: "smooth" });

    // ISI KONTEN PAMERAN
    document.getElementById("pameran-title").textContent = data.title;
    document.getElementById("pameran-meta").textContent = data.meta || "";
    document.getElementById("pameran-content").innerHTML = data.content || "";

    // v3 uses class .media-wrap instead of .media-wrapper
    const mediaWrapper = document.querySelector(".media-wrap") || document.querySelector(".media-wrapper");
    if (!mediaWrapper) return;
    mediaWrapper.innerHTML = "";

    // ======================
    // IMAGE SLIDER
    // ======================
    if (data.media.type === "image") {
      let index = 0;
      const images = data.media.images;

      // ── SLIDER WRAPPER ──
      mediaWrapper.style.overflow = "hidden";
      mediaWrapper.style.position = "relative";
      mediaWrapper.style.userSelect = "none";

      // ── TRACK (holds all images side by side) ──
      const track = document.createElement("div");
      track.style.cssText = `
        display: flex;
        width: ${images.length * 100}%;
        height: 100%;
        transition: transform 0.42s cubic-bezier(0.25, 0.8, 0.25, 1);
        will-change: transform;
      `;

      images.forEach((src, i) => {
        const slide = document.createElement("div");
        slide.style.cssText = `width:${100 / images.length}%; height:100%; flex-shrink:0; position:relative;`;

        const img = document.createElement("img");
        img.src = src;
        img.alt = data.title;
        img.loading = "lazy";
        img.style.cssText = `width:100%;height:100%;object-fit:cover;display:block;cursor:zoom-in;`;
        img.onclick = () => { if (!_isDragging) openImageModal(img.src); };

        slide.appendChild(img);
        track.appendChild(slide);
      });

      mediaWrapper.appendChild(track);

      // ── GOTO SLIDE ──
      function goTo(newIndex, dir) {
        index = ((newIndex % images.length) + images.length) % images.length;
        track.style.transition = "transform 0.42s cubic-bezier(0.25,0.8,0.25,1)";
        track.style.transform = `translateX(-${index * (100 / images.length)}%)`;
        updateDots();
      }

      // ── ONLY ADD CONTROLS IF > 1 IMAGE ──
      if (images.length > 1) {

        // Prev / Next buttons
        const prevBtn = document.createElement("button");
        const nextBtn = document.createElement("button");
        prevBtn.innerHTML = "❮";
        nextBtn.innerHTML = "❯";
        prevBtn.className = "slider-btn prev";
        nextBtn.className = "slider-btn next";
        prevBtn.onclick = e => { e.stopPropagation(); goTo(index - 1); };
        nextBtn.onclick = e => { e.stopPropagation(); goTo(index + 1); };
        mediaWrapper.appendChild(prevBtn);
        mediaWrapper.appendChild(nextBtn);

        // Dot indicators
        const dotsWrap = document.createElement("div");
        dotsWrap.style.cssText = `
          position:absolute; bottom:12px; left:50%; transform:translateX(-50%);
          display:flex; gap:6px; z-index:10;
        `;
        const dots = images.map((_, i) => {
          const d = document.createElement("button");
          d.style.cssText = `
            width:7px; height:7px; border-radius:50%; border:none; cursor:pointer;
            background: ${i === 0 ? '#39FF14' : 'rgba(255,255,255,0.4)'};
            transition: background 0.25s, transform 0.25s;
            padding:0;
          `;
          d.onclick = e => { e.stopPropagation(); goTo(i); };
          dotsWrap.appendChild(d);
          return d;
        });
        mediaWrapper.appendChild(dotsWrap);

        function updateDots() {
          dots.forEach((d, i) => {
            d.style.background = i === index ? '#39FF14' : 'rgba(255,255,255,0.4)';
            d.style.transform = i === index ? 'scale(1.3)' : 'scale(1)';
          });
        }

        // ── SWIPE / DRAG (touch + mouse) ──
        let startX = 0, startY = 0, diffX = 0, isDraggingSlider = false;
        let _isDragging = false;

        function onDragStart(x, y) {
          startX = x; startY = y; diffX = 0; isDraggingSlider = false;
          track.style.transition = "none";
        }

        function onDragMove(x, y) {
          diffX = x - startX;
          const diffY = y - startY;
          if (!isDraggingSlider && Math.abs(diffX) < 5 && Math.abs(diffY) < 5) return;
          if (!isDraggingSlider) {
            // Lock axis — if more vertical, ignore
            if (Math.abs(diffY) > Math.abs(diffX)) return;
            isDraggingSlider = true;
            _isDragging = true;
          }
          const base = index * (100 / images.length);
          const dragPct = (diffX / mediaWrapper.offsetWidth) * (100 / images.length);
          track.style.transform = `translateX(calc(-${base}% + ${diffX}px))`;
        }

        function onDragEnd() {
          const threshold = mediaWrapper.offsetWidth * 0.22;
          if (isDraggingSlider) {
            if (diffX < -threshold) goTo(index + 1);
            else if (diffX > threshold) goTo(index - 1);
            else goTo(index); // snap back
          }
          setTimeout(() => { _isDragging = false; }, 50);
          isDraggingSlider = false;
        }

        // Touch events
        mediaWrapper.addEventListener("touchstart", e => {
          onDragStart(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });
        mediaWrapper.addEventListener("touchmove", e => {
          onDragMove(e.touches[0].clientX, e.touches[0].clientY);
          if (isDraggingSlider) e.preventDefault();
        }, { passive: false });
        mediaWrapper.addEventListener("touchend", onDragEnd);

        // Mouse drag events (PC)
        let mouseDown = false;
        mediaWrapper.addEventListener("mousedown", e => {
          mouseDown = true;
          onDragStart(e.clientX, e.clientY);
          mediaWrapper.style.cursor = "grabbing";
        });
        window.addEventListener("mousemove", e => {
          if (!mouseDown) return;
          onDragMove(e.clientX, e.clientY);
        });
        window.addEventListener("mouseup", e => {
          if (!mouseDown) return;
          mouseDown = false;
          onDragEnd();
          mediaWrapper.style.cursor = "";
        });

        // Keyboard ← → (only when pameran page is visible)
        const keyHandler = e => {
          const page = document.getElementById("pameran-page");
          if (!page || page.classList.contains("hidden")) return;
          if (e.key === "ArrowLeft")  { e.preventDefault(); goTo(index - 1); }
          if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1); }
        };
        document.addEventListener("keydown", keyHandler);
        // Cleanup keyhandler when leaving pameran
        const backBtn = document.querySelector(".pameran-back");
        if (backBtn) {
          const origClick = backBtn.onclick;
          backBtn.onclick = (...args) => {
            document.removeEventListener("keydown", keyHandler);
            if (origClick) origClick(...args);
          };
        }

      } else {
        // Single image — just zoom on click, no drag needed
        let _isDragging = false;
        const img = track.querySelector("img");
        if (img) img.onclick = () => openImageModal(img.src);
      }
    }

    // ======================
    // VIDEO
    // ======================
    if (data.media.type === "video") {
      const video = document.createElement("video");
      video.src = data.media.src;
      video.controls = true;
      video.className = "w-full h-full";

      mediaWrapper.appendChild(video);
      video.play();
      currentVideo = video;
    }
  }, 300);
}

// ==============================
// BACK TO HOME (DENGAN ANIMASI + SCROLL BALIK)
// ==============================
function backToHome() {
  const projectsSection = document.getElementById("projects");
  const detail = document.getElementById("pameran-page");

  detail.style.opacity = "0";
  detail.style.transition = "opacity 0.3s ease";

  setTimeout(() => {
    detail.classList.add("hidden");
    detail.style.opacity = "";
    detail.style.transition = "";

    // stop video kalau ada
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
      currentVideo.remove();
      currentVideo = null;
    }

    // tampilkan section projects lagi
    if (projectsSection) {
      projectsSection.style.display = "";
      projectsSection.style.opacity = "0";
      setTimeout(() => {
        projectsSection.style.opacity = "1";
        projectsSection.style.transition = "opacity 0.3s ease";
      }, 50);
      setTimeout(() => { projectsSection.style.transition = ""; }, 400);
    }

    // scroll balik ke section pameran
    window.scrollTo({ top: (projectsSection ? projectsSection.offsetTop - 80 : 0), behavior: "smooth" });
  }, 300);
}

// ==============================
// RENDER PAMERAN CARDS (GRID) — max 5, then "Tampilkan lebih banyak" + "Tampilkan lebih sedikit"
// ==============================
function renderPameranCards() {
  const grid = document.getElementById("pameran-grid");
  const section = document.getElementById("projects");
  if (!grid) return;

  // Remove old toggle btn if exists
  const oldBtn = document.getElementById("pameran-toggle-btn");
  if (oldBtn) oldBtn.remove();

  const entries = Object.entries(PAMERAN);
  const MAX_VISIBLE = 2;

  // Create persistent "Tampilkan lebih sedikit" button (hidden by default, placed after grid)
  const lessBtn = document.createElement("div");
  lessBtn.id = "pameran-toggle-btn";
  lessBtn.style.cssText = "display:none; text-align:center; margin-top:28px; opacity:0; transition:opacity 0.4s ease;";
  lessBtn.innerHTML = `
    <button style="font-family:var(--font-m);font-size:0.68rem;letter-spacing:2px;text-transform:uppercase;color:var(--green);background:rgba(57,255,20,0.08);border:1px solid rgba(57,255,20,0.3);padding:10px 26px;border-radius:99px;cursor:pointer;transition:all 0.25s ease;" onmouseover="this.style.background='rgba(57,255,20,0.18)';this.style.borderColor='rgba(57,255,20,0.6)'" onmouseout="this.style.background='rgba(57,255,20,0.08)';this.style.borderColor='rgba(57,255,20,0.3)'">
      ↑ Tampilkan lebih sedikit
    </button>
  `;
  grid.insertAdjacentElement("afterend", lessBtn);
  lessBtn.querySelector("button").addEventListener("click", () => {
    buildCards(false);
    // Scroll back up to section start
    if (section) window.scrollTo({ top: section.getBoundingClientRect().top + window.pageYOffset - 90, behavior: "smooth" });
  });

  function buildCards(showAll) {
    grid.innerHTML = "";
    const toShow = showAll ? entries : entries.slice(0, MAX_VISIBLE);

    toShow.forEach(([key, item], index) => {
      const card = document.createElement("div");
      card.className = "pameran-card glass card-hover-green";
      card.style.cssText = `opacity:0; transform:translateY(30px); transition: opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s, box-shadow 0.3s ease, border-color 0.3s ease;`;
      card.onclick = () => openPameran(key);
      card.innerHTML = `
        <div style="overflow:hidden">
          <img src="${item.thumb}" alt="${item.title}" style="width:100%;height:200px;object-fit:cover;display:block;transition:transform 0.5s ease">
        </div>
        <div class="pameran-card-body">
          <span class="pameran-card-tag">Display</span>
          <h3 style="font-family:var(--font-d);font-weight:700;font-size:1rem;color:var(--text);margin-bottom:6px">${item.title}</h3>
          <p style="color:var(--text-muted);font-size:0.8rem;line-height:1.5">${item.description || ""}</p>
        </div>
      `;
      grid.appendChild(card);
      setTimeout(() => { card.style.opacity = "1"; card.style.transform = "translateY(0)"; }, 100 + index * 100);
    });

    // "Tampilkan lebih banyak" card
    if (!showAll && entries.length > MAX_VISIBLE) {
      const moreCard = document.createElement("div");
      moreCard.className = "pameran-card glass card-hover-green";
      moreCard.style.cssText = `opacity:0; transform:translateY(30px); transition: opacity 0.5s ease ${toShow.length * 0.1}s, transform 0.5s ease ${toShow.length * 0.1}s, box-shadow 0.3s ease, border-color 0.3s ease; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:280px; cursor:pointer;`;
      moreCard.innerHTML = `
        <div style="text-align:center;padding:24px">
          <div style="font-size:2.2rem;margin-bottom:12px">✨</div>
          <h3 style="font-family:var(--font-d);font-weight:700;font-size:1rem;color:var(--green);margin-bottom:8px">Tampilkan lebih banyak</h3>
          <p style="color:var(--text-muted);font-size:0.78rem">${entries.length - MAX_VISIBLE} konten lainnya</p>
        </div>
      `;
      moreCard.onclick = () => {
        buildCards(true);
        // Show "Tampilkan lebih sedikit" button
        lessBtn.style.display = "block";
        setTimeout(() => { lessBtn.style.opacity = "1"; }, 30);
      };
      grid.appendChild(moreCard);
      setTimeout(() => { moreCard.style.opacity = "1"; moreCard.style.transform = "translateY(0)"; }, 100 + toShow.length * 100);

      // Hide less button
      lessBtn.style.opacity = "0";
      setTimeout(() => { lessBtn.style.display = "none"; }, 400);
    } else if (showAll) {
      // Show less button
      lessBtn.style.display = "block";
      setTimeout(() => { lessBtn.style.opacity = "1"; }, 30);
    }
  }

  buildCards(false);
}


// ==============================
// IMAGE MODAL (RASIO ASLI)
// ==============================
function openImageModal(src) {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");

  if (!modal || !modalImg) return;

  modalImg.src = src;
  modal.style.display = "flex";
}

// ==============================
// INIT
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  renderPameranCards();

  const modal = document.getElementById("image-modal");
  if (modal) {
    modal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
});

// ==============================
// EASTER EGG: RASA (5 KLIK)
// ==============================
let rasaClick = 0;

document.addEventListener("click", e => {
  if (e.target.id === "easter-rasa") {
    rasaClick++;

    if (rasaClick === 5) {
      const popup = document.getElementById("rasa-popup");
      popup.classList.remove("hidden");
      rasaClick = 0; // reset biar bisa diulang
    }
  }
});

// close popup
document.addEventListener("click", e => {
  if (e.target.id === "close-rasa") {
    document.getElementById("rasa-popup").classList.add("hidden");
  }
});

