(function () {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  const filters = document.getElementById("filters");
  const folder = `${ROOT}assets/images/gallery/`;

  const CATEGORY_LABELS = {
    auto: "f_auto",
    machinery: "f_mach",
    structures: "f_struct",
    parts: "f_parts",
    other: "f_other",
  };

  const PHOTOS = [
    { category: "auto", file: "auto-01.jpg", ratio: "4/3" },
    { category: "machinery", file: "utilaje-01.jpg", ratio: "3/4" },
    { category: "structures", file: "structura-01.jpg", ratio: "1/1" },
    { category: "parts", file: "piesa-01.jpg", ratio: "4/3" },
    { category: "auto", file: "auto-02.jpg", ratio: "3/4" },
    { category: "other", file: "alte-01.jpg", ratio: "1/1" },
    { category: "parts", file: "piesa-02.jpg", ratio: "3/4" },
    { category: "machinery", file: "utilaje-02.jpg", ratio: "4/3" },
    { category: "structures", file: "structura-02.jpg", ratio: "4/3" },
    { category: "auto", file: "auto-03.jpg", ratio: "1/1" },
    { category: "other", file: "alte-02.jpg", ratio: "3/4" },
    { category: "parts", file: "piesa-03.jpg", ratio: "4/3" },
  ];

  let activeCategory = "all";
  let visiblePhotos = [];
  let currentIndex = 0;

  function filterMarkup(category) {
    const labelKey = category === "all" ? "f_all" : CATEGORY_LABELS[category];
    const activeClass = category === "all" ? "on" : "";
    return `<button data-c="${category}" data-i18n="${labelKey}" class="${activeClass}"></button>`;
  }

  function photoMarkup(photo, index) {
    return `
      <figure data-n="${index}" tabindex="0" style="aspect-ratio:${photo.ratio}">
        <img loading="lazy" src="${folder}${photo.file}" alt="" data-i18n-alt="${CATEGORY_LABELS[photo.category]}">
      </figure>`;
  }

  function renderPhotos() {
    visiblePhotos = PHOTOS.filter(
      (photo) => activeCategory === "all" || photo.category === activeCategory,
    );
    gallery.innerHTML = visiblePhotos.map(photoMarkup).join("");
    applyLang();
  }

  filters.innerHTML = ["all", ...Object.keys(CATEGORY_LABELS)].map(filterMarkup).join("");

  filters.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    activeCategory = button.dataset.c;
    filters.querySelectorAll("button").forEach((other) => {
      other.classList.toggle("on", other === button);
    });
    renderPhotos();
  });

  const lightbox = document.createElement("div");
  lightbox.className = "lb";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.innerHTML = `
    <button class="x" aria-label="Close">&times;</button>
    <button class="p" aria-label="Previous">&#8249;</button>
    <img data-noph alt="">
    <button class="n" aria-label="Next">&#8250;</button>
    <div class="cap"></div>`;
  document.body.appendChild(lightbox);

  const image = lightbox.querySelector("img");
  const caption = lightbox.querySelector(".cap");

  function show(index) {
    currentIndex = (index + visiblePhotos.length) % visiblePhotos.length;
    const photo = visiblePhotos[currentIndex];

    image.style.display = "";
    image.src = folder + photo.file;
    image.onerror = () => {
      image.style.display = "none";
    };
    caption.textContent = t(CATEGORY_LABELS[photo.category]);
  }

  function open(index) {
    show(index);
    lightbox.classList.add("open");
  }

  function close() {
    lightbox.classList.remove("open");
  }

  gallery.addEventListener("click", (event) => {
    const figure = event.target.closest("figure");
    if (figure) open(Number(figure.dataset.n));
  });

  gallery.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;

    const figure = event.target.closest("figure");
    if (figure) open(Number(figure.dataset.n));
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target.closest(".x") || event.target === lightbox) close();
    else if (event.target.closest(".p")) show(currentIndex - 1);
    else if (event.target.closest(".n")) show(currentIndex + 1);
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) return;

    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(currentIndex - 1);
    if (event.key === "ArrowRight") show(currentIndex + 1);
  });

  renderPhotos();
})();
