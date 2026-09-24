// Posts the contact form to the Google Apps Script endpoint, which writes to a
// sheet and sends the email. The payload shape must match that script.
// The script takes 3 to 30 seconds to answer, so the form shows progress and
// only reports success when the script says so.
var TIMEOUT_MS = 45000;

document.querySelectorAll("form.form").forEach(function (form) {
  var error = form.querySelector(".form__error");
  var note = form.querySelector(".form__note");
  var thanks = form.querySelector(".form__thanks");
  var button = form.querySelector("button");
  var label = button.textContent;

  function showError(message) {
    error.textContent = message;
    error.hidden = false;
  }

  function setSending(sending) {
    button.disabled = sending;
    button.textContent = sending ? form.dataset.sending : label;
    note.hidden = !sending;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (button.disabled) return;
    error.hidden = true;
    var data = new FormData(form);
    // Silently drop submissions from bots that fill the hidden field
    if (data.get("honeypot")) return;
    if (String(data.get("captcha")).trim() !== "6") {
      showError(form.dataset.captchaError);
      return;
    }

    var fields = ["email", "subject", "message"];
    var body = new URLSearchParams();
    fields.forEach(function (name) { body.append(name, data.get(name)); });
    body.append("formDataNameOrder", JSON.stringify(fields));
    body.append("formGoogleSheetName", "responses");
    body.append("formGoogleSendEmail", "");

    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, TIMEOUT_MS);
    setSending(true);
    fetch(form.action, { method: "POST", body: body, signal: controller.signal })
      .then(function (response) { return response.json(); })
      .then(function (result) {
        if (result.result !== "success") throw new Error(result.error || "script error");
        form.reset();
        note.hidden = true;
        button.textContent = label;
        thanks.hidden = false; // the button stays disabled: one message per visit
      })
      .catch(function () {
        setSending(false);
        showError(form.dataset.sendError);
      })
      .finally(function () { clearTimeout(timer); });
  });
});
