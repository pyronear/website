document.querySelectorAll("form.form").forEach(function (form) {
  var error = form.querySelector("p.form__error");
  var note = form.querySelector(".form__note");
  var thanks = form.querySelector(".form__thanks");
  var button = form.querySelector('[type="submit"]');
  var retry = form.querySelector(".form__retry");
  var email = form.elements.email;
  var emailError = form.querySelector("#email-error");
  var label = button.textContent;
  var token = "";
  var widget;
  var sending = false;
  var sent = false;
  var previousPayload;
  var requestId;

  function updateButton() {
    button.disabled = sending || sent || !token || !email.validity.valid || !form.elements.message.value.trim() || !form.checkValidity();
  }

  function showError(message) {
    error.textContent = message;
    error.hidden = false;
  }

  function captchaFailed() {
    token = "";
    updateButton();
    if (sending || sent) return;
    retry.hidden = false;
    showError(form.dataset.captchaError);
  }

  function renderCaptcha() {
    widget = window.turnstile.render(form.querySelector(".form__captcha"), {
      sitekey: form.dataset.sitekey,
      action: "contact",
      theme: "dark",
      size: "flexible",
      language: form.dataset.language,
      callback: function (value) {
        token = value;
        retry.hidden = true;
        if (error.textContent === form.dataset.captchaError) error.hidden = true;
        updateButton();
      },
      "expired-callback": function () { token = ""; updateButton(); },
      "error-callback": captchaFailed,
      "timeout-callback": captchaFailed,
    });
  }

  function loadCaptcha() {
    retry.hidden = true;
    var script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = renderCaptcha;
    script.onerror = function () { script.remove(); captchaFailed(); };
    document.head.appendChild(script);
  }

  function validateEmail() {
    email.value = email.value.trim();
    emailError.hidden = email.validity.valid;
    email.setAttribute("aria-invalid", String(!email.validity.valid));
    updateButton();
  }
  email.addEventListener("blur", validateEmail);
  form.addEventListener("input", function () {
    if (!emailError.hidden) validateEmail();
    updateButton();
  });
  retry.addEventListener("click", function () {
    retry.hidden = true;
    if (widget !== undefined) window.turnstile.reset(widget);
    else loadCaptcha();
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (sending || sent || !form.reportValidity() || !token) return;
    error.hidden = true;
    var data = new FormData(form);
    if (data.get("honeypot")) return;
    var fields = ["email", "subject", "message"];
    var values = fields.map(function (name) { return String(data.get(name)).trim(); });
    var payload = JSON.stringify(values);
    // Keep the same Resend idempotency key when retrying an unchanged message.
    if (payload !== previousPayload) {
      requestId = crypto.randomUUID();
      previousPayload = payload;
    }
    var body = new URLSearchParams();
    fields.forEach(function (name, index) { body.append(name, values[index]); });
    body.append("honeypot", data.get("honeypot"));
    body.append("cf-turnstile-response", token);
    body.append("requestId", requestId);
    sending = true;
    updateButton();
    button.textContent = form.dataset.sending;
    note.hidden = false;
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, 25000);
    try {
      var response = await fetch(form.action, { method: "POST", body: body, signal: controller.signal });
      var result = await response.json();
      if (!response.ok || result.result !== "success") {
        throw new Error(result.error || "send_failed");
      }
      sent = true;
      form.reset();
      window.turnstile.remove(widget);
      retry.hidden = true;
      error.hidden = true;
      thanks.hidden = false;
    } catch (failure) {
      var messages = {
        captcha_failed: form.dataset.captchaError,
        rate_limited: form.dataset.rateError,
        invalid_input: form.dataset.inputError,
      };
      showError(messages[failure.message] || form.dataset.sendError);
      token = "";
      window.turnstile.reset(widget);
    } finally {
      clearTimeout(timer);
      sending = false;
      note.hidden = true;
      button.textContent = label;
      updateButton();
    }
  });

  if (form.dataset.sitekey && form.getAttribute("action")) loadCaptcha();
});
