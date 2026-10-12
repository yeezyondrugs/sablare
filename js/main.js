const CONFIG = {
  phone: "+37376764576",
  wa: "+37376764576",
  tiktok: "https://www.tiktok.com/@curatare_metal_cu_laser",
  formEndpoint: "",
  videos: [
    "7683183294501997844",
    "7683177128724073748",
    "7680245615858601236",
    "7688394071286517013",
    "7683559133269789973",
    "7609754284724555026",
    "7688051921587883284",
    "7683933583970503957",
  ],
};

const PAGES = [
  { file: "index", label: "nav_home", id: "home" },
  { file: "services", label: "nav_services", id: "services" },
  { file: "about", label: "nav_about", id: "about" },
  { file: "projects", label: "nav_projects", id: "projects" },
  { file: "before-after", label: "nav_ba", id: "ba" },
  { file: "contact", label: "nav_contact", id: "contact" },
];

const ICON_PATHS = {
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  target:
    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  tool: '<path d="M14 6a4 4 0 0 0 5 5l-9 9a2.1 2.1 0 0 1-3-3l9-9z"/>',
  spark:
    '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
};

const SUN_ICON = `
  <svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>
  </svg>`;

const MOON_ICON = `
  <svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round">
    <path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/>
  </svg>`;

const PLAY_ICON = `
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z"/>
  </svg>`;

const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);

const currentPageId = document.body.dataset.page;
const currentPage = PAGES.find((page) => page.id === currentPageId) || PAGES[0];
const currentFile = currentPage.file === "index" ? "" : currentPage.file;
const pageHref = (file) => (file === "index" ? "./" : file);
const phoneHref = `tel:${CONFIG.phone.replace(/\s/g, "")}`;
const whatsappHref = `https://wa.me/${CONFIG.wa}`;

function icon(name) {
  return `
    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      ${ICON_PATHS[name]}
    </svg>`;
}

function textCard(iconName, titleKey, textKey) {
  return `
    <article class="card pad">
      ${icon(iconName)}
      <h3 data-i18n="${titleKey}"></h3>
      <p data-i18n="${textKey}"></p>
    </article>`;
}

function stepCard(number) {
  return `
    <article class="card pad step">
      <b>0${number}</b>
      <h3 data-i18n="p${number}"></h3>
    </article>`;
}

function imageCard(folder, fileName, keyPrefix) {
  const source = `${ROOT}assets/images/${folder}/${fileName}.jpg`;

  return `
    <article class="card">
      <div class="im" data-zoom="${source}" tabindex="0">
        <img loading="lazy" src="${source}" alt="" data-i18n-alt="${keyPrefix}t">
      </div>
      <div class="tx">
        <h3 data-i18n="${keyPrefix}t"></h3>
        <p data-i18n="${keyPrefix}d"></p>
      </div>
    </article>`;
}

function numberedTextCards(icons, keyPrefix) {
  return icons.map((iconName, index) => {
    const key = `${keyPrefix}${index + 1}`;
    return textCard(iconName, `${key}t`, `${key}d`);
  });
}

const CARDS = {
  feat: numberedTextCards(["layers", "pin", "card", "tool"], "f"),
  svc: numberedTextCards(["spark", "layers", "target", "tool", "bolt", "pin"], "s"),
  why: numberedTextCards(["pin", "bolt", "target", "layers", "card"], "w"),
  steps: [1, 2, 3, 4].map(stepCard),
  eq: ["laser-machine-220v", "laser-machine-380v"].map((fileName, index) =>
    imageCard("equipment", fileName, `eq${index + 1}`),
  ),
  clean: [
    "truck-frame",
    "car-body",
    "car-parts",
    "machinery",
    "gates",
    "fences",
    "metal-structures",
    "industrial-components",
    "complex-shapes",
  ].map((fileName, index) => imageCard("services", fileName, `c${index + 1}`)),
};

function renderCards() {
  selectAll("[data-cards]").forEach((container) => {
    const cards = CARDS[container.dataset.cards];
    const limit = Number(container.dataset.limit) || cards.length;
    container.innerHTML = cards.slice(0, limit).join("");
  });
}

function logoMarkup() {
  return `
    <a class="logo" href="./" aria-label="Nume">
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
        <rect x="3" y="3" width="26" height="26" rx="6"/>
        <path d="M9 23 23 9M9 15l8 8"/>
      </svg>
      <span>Nume<b>.md</b></span>
    </a>`;
}

function controlsMarkup() {
  return `
    <div class="ctl">
      <div class="lang" role="group" aria-label="Language">
        <a data-lang="ro" lang="ro" hreflang="ro" href="${ROOT + currentFile || "./"}">RO</a>
        <a data-lang="ru" lang="ru" hreflang="ru" href="${ROOT}ru/${currentFile}">RU</a>
      </div>
      <button class="themebtn" data-theme-toggle aria-label="Dark / Light">
        ${SUN_ICON}
        ${MOON_ICON}
      </button>
    </div>`;
}

function navLinkMarkup(page) {
  const activeAttributes = page.id === currentPageId ? 'class="on" aria-current="page"' : "";
  return `<a href="${pageHref(page.file)}" data-i18n="${page.label}" ${activeAttributes}></a>`;
}

function renderHeader() {
  const header = select("#site-header");
  if (!header) return;

  header.innerHTML = `
    <header class="hdr">
      <div class="wrap hdr-in">
        ${logoMarkup()}
        <nav id="nav" aria-label="Main">
          ${PAGES.map(navLinkMarkup).join("")}
          <a class="btn sm" href="contact" data-i18n="cta"></a>
        </nav>
        ${controlsMarkup()}
        <button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="nav">
          <span></span>
        </button>
      </div>
    </header>`;
}

function renderFooter() {
  const footer = select("#site-footer");
  if (!footer) return;

  const pageLinks = PAGES.map(
    (page) => `<li><a href="${pageHref(page.file)}" data-i18n="${page.label}"></a></li>`,
  ).join("");

  const serviceLinks = [1, 2, 3, 4]
    .map((number) => `<li><a href="services" data-i18n="s${number}t"></a></li>`)
    .join("");

  footer.innerHTML = `
    <footer class="ftr">
      <div class="wrap">
        <div class="ftr-g">
          <div>
            ${logoMarkup()}
            <p style="margin-top:14px;color:var(--mu)" data-i18n="ft_d"></p>
            ${controlsMarkup()}
          </div>
          <div>
            <h3 data-i18n="ft_nav"></h3>
            <ul>${pageLinks}</ul>
          </div>
          <div>
            <h3 data-i18n="ft_sv"></h3>
            <ul>${serviceLinks}</ul>
          </div>
          <div>
            <h3 data-i18n="ft_ct"></h3>
            <ul>
              <li><a href="${phoneHref}">${CONFIG.phone}</a></li>
              <li><a href="${whatsappHref}" target="_blank" rel="noopener">WhatsApp</a></li>
              <li><a href="${CONFIG.tiktok}" target="_blank" rel="noopener">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div class="copy">
          <span>© ${new Date().getFullYear()} Nume. <span data-i18n="ft_c"></span></span>
        </div>
      </div>
    </footer>`;
}

function setupHeaderControls() {
  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-theme-toggle]")) toggleTheme();

    const nav = select("#nav");
    const burger = select(".burger");

    if (event.target.closest(".burger")) {
      const isOpen = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", isOpen);
    } else if (event.target.closest("#nav a") || !event.target.closest("#nav")) {
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", false);
    }
  });
}

function setupContactLinks() {
  selectAll("[data-wa]").forEach((link) => {
    link.href = whatsappHref;
  });

  selectAll("[data-tt]").forEach((link) => {
    link.href = CONFIG.tiktok;
  });

  selectAll("[data-tel]").forEach((link) => {
    link.href = phoneHref;
    link.querySelector("span:last-child").textContent = CONFIG.phone;
  });
}

function createLightbox(extraClass, innerMarkup) {
  const lightbox = document.createElement("div");
  lightbox.className = extraClass ? `lb ${extraClass}` : "lb";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.innerHTML = innerMarkup;
  document.body.appendChild(lightbox);
  return lightbox;
}

function videoCardMarkup(videoId) {
  return `
    <button type="button" class="vid" data-vid="${videoId}" data-i18n-aria="vd_play">
      <img loading="lazy" src="${ROOT}assets/images/videos/${videoId}.jpg" alt="" data-i18n-alt="vd_alt">
      <span class="play">${PLAY_ICON}</span>
    </button>`;
}

function renderVideos() {
  const videoIds = CONFIG.videos
    .map((video) => (String(video).match(/\d{15,}/) || [])[0])
    .filter(Boolean);

  selectAll("[data-videos]").forEach((container) => {
    const limit = Number(container.dataset.videos) || 99;
    container.className = "vids";
    container.innerHTML = videoIds.slice(0, limit).map(videoCardMarkup).join("");
  });
}

function setupVideoLightbox() {
  if (!select("[data-vid]")) return;

  const lightbox = createLightbox(
    "lbv",
    `<button class="x" aria-label="Close">&times;</button>
     <div class="frame"></div>`,
  );
  const frame = lightbox.querySelector(".frame");

  function close() {
    lightbox.classList.remove("open");
    frame.innerHTML = "";
  }

  function open(videoId) {
    const playerUrl = `https://www.tiktok.com/player/v1/${videoId}?autoplay=1&rel=0&description=0&music_info=0`;
    frame.innerHTML = `<iframe src="${playerUrl}" title="TikTok" allow="autoplay; fullscreen; encrypted-media" allowfullscreen></iframe>`;
    lightbox.classList.add("open");
  }

  document.addEventListener("click", (event) => {
    const videoCard = event.target.closest("[data-vid]");

    if (videoCard) {
      open(videoCard.dataset.vid);
    } else if (event.target === lightbox || event.target.closest(".lbv .x")) {
      close();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) close();
  });
}

function setupImagePlaceholders() {
  document.addEventListener(
    "error",
    (event) => {
      const image = event.target;
      if (image.tagName !== "IMG" || image.hasAttribute("data-noph")) return;

      let variant = "";
      if (/before/.test(image.src)) variant = "before";
      else if (/after/.test(image.src)) variant = "after";

      const placeholder = document.createElement("div");
      placeholder.className = `ph ${variant}`;
      placeholder.textContent = image.getAttribute("src").split("/").slice(-3).join("/");
      placeholder.setAttribute("role", "img");
      placeholder.setAttribute("aria-label", image.alt || "");
      image.replaceWith(placeholder);
    },
    true,
  );
}

function setupCardLightbox() {
  if (!select("[data-zoom]")) return;

  const lightbox = createLightbox(
    "",
    `<button class="x" aria-label="Close">&times;</button>
     <button class="p" aria-label="Previous">&#8249;</button>
     <img data-noph alt="">
     <button class="n" aria-label="Next">&#8250;</button>
     <div class="cap"></div>`,
  );
  const image = lightbox.querySelector("img");
  const caption = lightbox.querySelector(".cap");
  let items = [];
  let currentIndex = 0;

  function show(index) {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];

    image.style.display = "";
    image.onerror = () => {
      image.style.display = "none";
    };
    image.src = item.dataset.zoom;
    caption.textContent = item.closest(".card").querySelector("h3").textContent;
  }

  function open(item) {
    const grid = item.parentElement.parentElement;
    items = [...grid.querySelectorAll("[data-zoom]")];
    show(items.indexOf(item));
    lightbox.classList.add("open");
  }

  function close() {
    lightbox.classList.remove("open");
  }

  document.addEventListener("click", (event) => {
    const item = event.target.closest("[data-zoom]");
    if (item) open(item);
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target.closest(".x") || event.target === lightbox) close();
    else if (event.target.closest(".p")) show(currentIndex - 1);
    else if (event.target.closest(".n")) show(currentIndex + 1);
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) {
      const item = event.key === "Enter" && event.target.closest("[data-zoom]");
      if (item) open(item);
      return;
    }

    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(currentIndex - 1);
    if (event.key === "ArrowRight") show(currentIndex + 1);
  });
}

function setupRevealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -6% 0px" },
  );

  selectAll(".sec .wrap>*").forEach((element) => {
    element.classList.add("rv");
    observer.observe(element);
  });
}

function setupLocalPreviewLinks() {
  if (location.protocol !== "file:") return;

  selectAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (/^([a-z]+:|#)/i.test(href)) return;

    if (href.endsWith("/")) link.setAttribute("href", `${href}index.html`);
    else if (!/\.[a-z0-9]+$/i.test(href)) link.setAttribute("href", `${href}.html`);
  });
}

renderCards();
renderHeader();
renderFooter();
setupHeaderControls();
setupContactLinks();
renderVideos();
setupVideoLightbox();
setupImagePlaceholders();
setupCardLightbox();
setupRevealOnScroll();
setupLocalPreviewLinks();
