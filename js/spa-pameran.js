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

  const grid = document.getElementById("projects");
  const detail = document.getElementById("pameran-page");

  // animasi grid keluar
  grid.classList.add("fade-out-up");

  setTimeout(() => {
    // sembunyikan grid
    grid.classList.add("hidden");
    grid.classList.remove("fade-out-up");

    // tampilkan halaman detail
    detail.classList.remove("hidden");
    detail.classList.add("fade-in-up");

    // 🔥 FIX SCROLL (HP & PC)
    document
  .getElementById("pameran-title")
  .scrollIntoView({
    behavior: "smooth",
    block: "center"
  });


    // ======================
    // ISI KONTEN PAMERAN
    // ======================
    document.getElementById("pameran-title").textContent = data.title;
    document.getElementById("pameran-meta").textContent = data.meta || "";
    document.getElementById("pameran-content").innerHTML = data.content || "";

    const mediaWrapper = document.querySelector(".media-wrapper");
    mediaWrapper.innerHTML = "";

    // ======================
    // IMAGE SLIDER
    // ======================
    if (data.media.type === "image") {
      let index = 0;
      const images = data.media.images;

      const img = document.createElement("img");
      img.src = images[0];
      img.alt = data.title;

      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      img.style.cursor = "zoom-in";
      img.style.transition = "opacity 0.25s ease";

      // klik → rasio asli
      img.onclick = () => openImageModal(img.src);

      mediaWrapper.classList.add("relative");
      mediaWrapper.appendChild(img);

      // tombol slider kalau > 1 foto
      if (images.length > 1) {
        const prevBtn = document.createElement("button");
        const nextBtn = document.createElement("button");

        prevBtn.innerHTML = "◀";
        nextBtn.innerHTML = "▶";

        prevBtn.className =
          "slider-btn absolute left-2 top-1/2 -translate-y-1/2 z-10";
        nextBtn.className =
          "slider-btn absolute right-2 top-1/2 -translate-y-1/2 z-10";

        const updateImage = () => {
          img.style.opacity = 0;
          setTimeout(() => {
            img.src = images[index];
            img.style.opacity = 1;
          }, 150);
        };

        prevBtn.onclick = e => {
          e.stopPropagation();
          index = (index - 1 + images.length) % images.length;
          updateImage();
        };

        nextBtn.onclick = e => {
          e.stopPropagation();
          index = (index + 1) % images.length;
          updateImage();
        };

        mediaWrapper.appendChild(prevBtn);
        mediaWrapper.appendChild(nextBtn);
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
  const grid = document.getElementById("projects");
  const detail = document.getElementById("pameran-page");

  detail.classList.remove("fade-in-up");
  detail.classList.add("fade-out-up");

  setTimeout(() => {
    detail.classList.add("hidden");
    detail.classList.remove("fade-out-up");

    // stop video kalau ada
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
      currentVideo.remove();
      currentVideo = null;
    }

    // tampilkan grid
    grid.classList.remove("hidden");
    grid.classList.add("fade-in-up");

    // fokus balik ke section pameran
    grid.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 300);
}

// ==============================
// RENDER PAMERAN CARDS (GRID)
// ==============================
function renderPameranCards() {
  const grid = document.getElementById("pameran-grid");
  if (!grid) return;

  grid.innerHTML = "";

  Object.entries(PAMERAN).forEach(([key, item]) => {
    const card = document.createElement("div");

    card.className = `
      pameran-card cursor-pointer block
      bg-white/10 dark:bg-gray-800/30
      backdrop-blur-md border border-white/20 dark:border-white/10
      rounded-xl overflow-hidden
      hover:-translate-y-1 transition transform
    `;

    card.onclick = () => openPameran(key);

    card.innerHTML = `
      <img src="${item.thumb}"
           alt="${item.title}"
           class="h-56 w-full object-cover">

      <div class="p-4">
        <h3 class="font-semibold text-lg text-white">
          ${item.title}
        </h3>
        <p class="text-gray-200 text-sm mt-2">
          ${item.description || ""}
        </p>
      </div>
    `;

    grid.appendChild(card);
  });
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

