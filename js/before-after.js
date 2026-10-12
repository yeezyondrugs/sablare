(function () {
  const COMPARISONS = [
    { file: "rust", captionKey: "ba2" },
    { file: "car", captionKey: "ba1" },
    { file: "example-3", captionKey: "ba3" },
    { file: "example-4", captionKey: "ba4" },
  ];

  function comparisonMarkup({ file, captionKey }) {
    const folder = `${ROOT}assets/images/before-after`;

    return `
      <div class="ba-box">
        <div class="la">
          <img loading="lazy" src="${folder}/${file}-after.jpg" alt="" data-i18n-alt="${captionKey}">
        </div>
        <div class="la top">
          <img loading="lazy" src="${folder}/${file}-before.jpg" alt="" data-i18n-alt="${captionKey}">
        </div>
        <span class="tag l" data-i18n="lbl_b"></span>
        <span class="tag r" data-i18n="lbl_a"></span>
        <div class="ba-line"></div>
        <input type="range" min="0" max="100" value="50" data-i18n-aria="${captionKey}" aria-label="">
      </div>
      <figcaption data-i18n="${captionKey}"></figcaption>`;
  }

  function createComparison(comparison) {
    const figure = document.createElement("figure");
    figure.className = "ba";
    figure.innerHTML = comparisonMarkup(comparison);

    const box = figure.querySelector(".ba-box");
    figure.querySelector("input").addEventListener("input", (event) => {
      box.style.setProperty("--p", `${event.target.value}%`);
    });

    return figure;
  }

  document.querySelectorAll("[data-ba]").forEach((container) => {
    const limit = Number(container.dataset.ba) || COMPARISONS.length;

    COMPARISONS.slice(0, limit).forEach((comparison) => {
      container.appendChild(createComparison(comparison));
    });
  });
})();
