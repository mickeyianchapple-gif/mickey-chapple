// Submit the contact form without leaving the page, so a sender stays on the site.
(function () {
  var form = document.querySelector('.form');
  if (!form) return;

  var note = form.querySelector('.form__note');
  var button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var original = button.textContent;
    button.disabled = true;
    button.textContent = 'Sending…';
    note.className = 'form__note';
    note.textContent = '';

    fetch(form.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    })
      .then(function (res) { return res.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (data && data.success) {
          form.reset();
          note.className = 'form__note form__note--ok';
          note.textContent = 'Thank you — your message is on its way. I will reply shortly.';
        } else {
          throw new Error((data && data.message) || 'Send failed');
        }
      })
      .catch(function () {
        note.className = 'form__note form__note--err';
        note.innerHTML =
          'Something went wrong sending that. Please email me directly at ' +
          '<a href="mailto:mickeychapple@arizona.edu">mickeychapple@arizona.edu</a>.';
      })
      .finally(function () {
        button.disabled = false;
        button.textContent = original;
      });
  });
})();
