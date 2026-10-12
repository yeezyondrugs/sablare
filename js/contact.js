(function () {
  const form = document.getElementById("quote");
  if (!form) return;

  const status = form.querySelector(".status");
  const PHONE_PATTERN = /^[+\d][\d\s()-]{6,}$/;
  const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

  function showStatus(messageKey, className) {
    status.dataset.i18n = messageKey;
    status.textContent = t(messageKey);
    status.className = `status ${className}`;
  }

  function errorKeyFor(field) {
    const value = field.value.trim();

    if (!value && field.hasAttribute("data-req")) return "e_req";
    if (value && field.name === "phone" && !PHONE_PATTERN.test(value)) return "e_ph";
    if (value && field.name === "email" && !EMAIL_PATTERN.test(value)) return "e_em";
    return "";
  }

  function validate() {
    let isValid = true;

    form.querySelectorAll("[data-v]").forEach((field) => {
      const errorKey = errorKeyFor(field);
      const errorLabel = field.parentElement.querySelector(".err");

      errorLabel.dataset.i18n = errorKey;
      errorLabel.textContent = errorKey ? t(errorKey) : "";
      field.classList.toggle("bad", Boolean(errorKey));

      if (errorKey) isValid = false;
    });

    return isValid;
  }

  async function sendToEndpoint() {
    try {
      const response = await fetch(CONFIG.formEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Request failed");

      showStatus("ok", "ok");
      form.reset();
    } catch (error) {
      showStatus("e_send", "bad");
    }
  }

  function openWhatsApp() {
    const data = Object.fromEntries(new FormData(form));
    const workType = form.type.options[form.type.selectedIndex].text;

    const lines = [data.name, data.phone];
    if (data.email) lines.push(data.email);
    lines.push(data.place ? `${workType} - ${data.place}` : workType);
    if (data.message) lines.push(data.message);

    const url = `https://wa.me/${CONFIG.wa}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validate()) {
      form.querySelector(".bad").focus();
      return;
    }

    if (CONFIG.formEndpoint) await sendToEndpoint();
    else openWhatsApp();
  });

  document.addEventListener("langchange", () => {
    if (status.dataset.i18n) status.textContent = t(status.dataset.i18n);
  });
})();
