// Posts the contact form to the Google Apps Script endpoint, which writes to a
// sheet and sends the email. The payload shape must match that script.
document.querySelectorAll("form.form").forEach(function (form) {
  var error = form.querySelector(".form__error");
  var thanks = form.querySelector(".form__thanks");
  var button = form.querySelector("button");

  function showError(message) {
    error.textContent = message;
    error.hidden = false;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
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

    button.disabled = true;
    fetch(form.action, { method: "POST", body: body })
      .then(function (response) {
        if (!response.ok) throw new Error(response.status);
        form.reset();
        thanks.hidden = false;
      })
      .catch(function () {
        button.disabled = false;
        showError(form.dataset.sendError);
      });
  });
});
