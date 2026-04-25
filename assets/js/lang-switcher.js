/* ── Language Switcher ── */
(function () {

  /* ── CSS ── */
  var style = document.createElement('style');
  style.textContent = [
    '.lang-switcher{position:fixed;bottom:24px;left:24px;background:#1a1a1a;border-radius:14px;',
    'padding:8px;display:flex;flex-direction:column;gap:4px;z-index:99999;',
    'box-shadow:0 4px 24px rgba(0,0,0,.35);}',
    '.lang-btn{display:flex;align-items:center;gap:10px;padding:10px 16px;border-radius:10px;',
    'border:none;background:transparent;color:#fff;font-size:14px;font-weight:500;cursor:pointer;',
    'font-family:"DM Sans",sans-serif;white-space:nowrap;transition:background .2s;}',
    '.lang-btn:hover{background:rgba(255,255,255,.1);}',
    '.lang-btn.active{background:#C9A84C;color:#fff;}',
    '.lang-btn img{width:20px;height:14px;object-fit:cover;border-radius:2px;}',
    /* Push GT icon behind the header (z-index < 1000) */
    '.VIpgJd-ZVi9od-l4eHX-hSRGPd,.VIpgJd-ZVi9od-aZ2wEe,',
    '.VIpgJd-yAWNEb-L7lbkb,.VIpgJd-ZVi9od-SmfZ-OEVmcd,',
    '.goog-te-gadget-icon,.goog-te-gadget{z-index:999!important;}',
    /* Kill every Google Translate toolbar/banner */
    '.goog-te-banner-frame,.goog-te-menu-frame,#goog-gt-tt,',
    '.goog-te-balloon-frame,.goog-tooltip,.goog-te-ftab-float{',
    'display:none!important;visibility:hidden!important;',
    'opacity:0!important;pointer-events:none!important;}',
    'iframe.skiptranslate{display:none!important;}',
    'body{top:0!important;margin-top:0!important;}',
    'html{top:0!important;}'
  ].join('');
  document.head.appendChild(style);

  /* ── Button panel ── */
  var panel = document.createElement('div');
  panel.className = 'lang-switcher';
  panel.innerHTML =
    '<button class="lang-btn active" id="langFr" onclick="window.__setLang(\'fr\')">' +
      '<img src="https://flagcdn.com/w40/fr.png" alt="FR"> Fran\u00e7ais' +
    '</button>' +
    '<button class="lang-btn" id="langEn" onclick="window.__setLang(\'en\')">' +
      '<img src="https://flagcdn.com/w40/us.png" alt="EN"> English' +
    '</button>';
  document.body.appendChild(panel);

  /* Hidden GT anchor */
  var gtDiv = document.createElement('div');
  gtDiv.id = 'google_translate_element';
  gtDiv.style.display = 'none';
  document.body.appendChild(gtDiv);

  /* ── Suppress GT bar continuously ── */
  function suppressBar() {
    document.body.style.top = '0px';
    document.documentElement.style.top = '0px';
    document.querySelectorAll(
      'iframe.skiptranslate, .goog-te-banner-frame, ' +
      '.VIpgJd-ZVi9od-l4eHX-hSRGPd, .VIpgJd-ZVi9od-SmfZ-OEVmcd'
    ).forEach(function (el) {
      el.style.setProperty('display', 'none', 'important');
    });
  }
  setInterval(suppressBar, 250);

  /* ── Fire the GT combo select ── */
  function fireSelect(lang) {
    var select = document.querySelector('.goog-te-combo');
    if (!select) return false;
    select.value = lang;
    ['change', 'input'].forEach(function (evName) {
      var ev = document.createEvent('HTMLEvents');
      ev.initEvent(evName, true, true);
      select.dispatchEvent(ev);
    });
    return true;
  }

  /* ── Translate with retries to catch all content ── */
  var retryTimer = null;
  function translateAll(lang) {
    clearTimeout(retryTimer);
    /* Fire immediately, then again at 400 ms, 900 ms, 1800 ms
       so lazy-loaded / below-fold content also gets translated */
    var delays = [0, 400, 900, 1800];
    delays.forEach(function (d) {
      setTimeout(function () {
        fireSelect(lang);
        suppressBar();
      }, d);
    });
  }

  /* ── Update button highlight ── */
  function setActive(lang) {
    var fr = document.getElementById('langFr');
    var en = document.getElementById('langEn');
    if (!fr || !en) return;
    fr.classList.toggle('active', lang === 'fr');
    en.classList.toggle('active', lang === 'en');
  }

  /* ── Public setter called by buttons ── */
  window.__setLang = function (lang) {
    translateAll(lang);
    setActive(lang);
    localStorage.setItem('siteLang', lang);
  };

  /* ── Google Translate init callback ── */
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({
      pageLanguage: 'fr',
      includedLanguages: 'en,fr',
      autoDisplay: false
    }, 'google_translate_element');

    suppressBar();

    /* Restore language saved from previous page */
    var saved = localStorage.getItem('siteLang') || 'fr';
    if (saved === 'en') {
      setActive('en');
      translateAll('en');
    }
  };

  /* ── Load GT script ── */
  var script = document.createElement('script');
  script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);

})();
