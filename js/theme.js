(function () {
  let theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  try {
    theme = localStorage.getItem("theme") || theme;
  } catch (error) {}

  document.documentElement.dataset.theme = theme;

  window.toggleTheme = function () {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;

    try {
      localStorage.setItem("theme", nextTheme);
    } catch (error) {}
  };
})();
