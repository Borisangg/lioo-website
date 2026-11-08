/* Language choice for the Lioo website: English at "/", Bulgarian at "/bg/".
   First visit: a Bulgarian browser is sent to the Bulgarian page.
   A manual choice (EN / BG switch) is remembered and wins over the browser language. */
(function () {
  'use strict';
  var KEY = 'lioo_site_lang';
  var root = document.documentElement;
  var stored = null;
  try { stored = window.localStorage.getItem(KEY); } catch (e) { /* storage blocked */ }

  var alt = root.getAttribute('data-lang-alt');
  if (root.lang === 'en' && alt) {
    var browser = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    var wanted = stored || (/^bg/i.test(browser) ? 'bg' : 'en');
    if (wanted === 'bg') {
      window.location.replace(alt + window.location.search + window.location.hash);
      return;
    }
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest ? event.target.closest('[data-set-lang]') : null;
    if (!link) return;
    try { window.localStorage.setItem(KEY, link.getAttribute('data-set-lang')); } catch (e) { /* ignore */ }
  });
})();
