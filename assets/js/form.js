document.querySelectorAll("form.form").forEach(function (form) {
  var error = form.querySelector(".form__error");
  var note = form.querySelector(".form__note");
  var thanks = form.querySelector(".form__thanks");
  var button = form.querySelector("button");
  var label = button.textContent;
  var widget = form.querySelector(".cf-turnstile");
  var previousPayload, requestId;
  button.disabled = !widget;

  // Topic cards on wider screens, a dropdown on phones (same breakpoint as main.css); only the shown one is sent
  var topics = form.querySelector(".topics");
  var select = form.querySelector(".topics-select select");
  if (topics && select) {
    var phone = matchMedia("(max-width: 480px)");
    var switchTopics = function () {
      if (phone.matches) select.value = topics.querySelector("input:checked").value;
      else topics.querySelectorAll("input").forEach(function (radio) { radio.checked = radio.value === select.value; });
      topics.disabled = phone.matches;
      select.disabled = !phone.matches;
    };
    switchTopics();
    phone.addEventListener("change", switchTopics);
  }

  function showError(message) {
    error.textContent = message;
    error.hidden = false;
  }

  function setSending(sending) {
    button.disabled = sending;
    button.textContent = sending ? form.dataset.sending : label;
    note.hidden = !sending;
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (button.disabled || !form.reportValidity()) return;
    error.hidden = true;
    var data = new FormData(form);
    if (data.get("honeypot")) return;
    if (!data.get("message").trim()) return showError(form.dataset.inputError);
    if (!data.get("cf-turnstile-response")) {
      showError(form.dataset.captchaError);
      return;
    }
    // Reuse the retry key until the actual message changes.
    var payload = JSON.stringify(["email", "subject", "message"].map(name => data.get(name).trim()));
    if (payload !== previousPayload) {
      requestId = crypto.randomUUID();
      previousPayload = payload;
    }
    data.set("requestId", requestId);
    setSending(true);
    try {
      var response = await fetch(form.action, {
        method: "POST", body: new URLSearchParams(data), signal: AbortSignal.timeout(25000),
      });
      var result = await response.json();
      if (!response.ok || result.result !== "success") throw new Error(result.error || "send_failed");
      form.reset();
      window.turnstile.remove(widget);
      button.textContent = label;
      thanks.hidden = false; // the button stays disabled: one message per visit
    } catch (failure) {
      setSending(false);
      showError({
        captcha_failed: form.dataset.captchaError,
        invalid_input: form.dataset.inputError,
        rate_limited: form.dataset.rateError,
      }[failure.message] || form.dataset.sendError);
      window.turnstile.reset(widget);
    } finally {
      note.hidden = true;
    }
  });
});
