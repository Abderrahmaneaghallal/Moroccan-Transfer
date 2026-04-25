/* ── Phone Picker — intl-tel-input via CDN ── */
(function () {
  var ITI_VERSION = '18.5.3';
  var BASE = 'https://cdn.jsdelivr.net/npm/intl-tel-input@' + ITI_VERSION + '/build/';

  /* Load CSS */
  var link = document.createElement('link');
  link.rel  = 'stylesheet';
  link.href = BASE + 'css/intlTelInput.css';
  document.head.appendChild(link);

  /* Override styles to match site theme */
  var style = document.createElement('style');
  style.textContent =
    '.iti{width:100%;}' +
    '.iti__tel-input{width:100%;border:1.5px solid #e8e2da;border-radius:10px;padding:10px 12px 10px 52px;font-size:14px;font-family:"DM Sans",sans-serif;color:#111;background:#faf8f5;outline:none;transition:border-color .2s,box-shadow .2s;}' +
    '.iti__tel-input:focus{border-color:#C9A84C;box-shadow:0 0 0 3px rgba(201,168,76,0.12);}' +
    '.iti__tel-input::placeholder{color:#bbb;}' +
    '.iti__flag-container{left:0;}' +
    '.iti__selected-dial-code{font-size:13px;font-weight:600;color:#111;}' +
    '.iti__dropdown-content{border:1.5px solid #e8e2da;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.12);font-family:"DM Sans",sans-serif;}' +
    '.iti__search-input{border:1.5px solid #e8e2da;border-radius:8px;font-family:"DM Sans",sans-serif;}' +
    '.iti__search-input:focus{border-color:#C9A84C;outline:none;}' +
    '.iti__country.iti__highlight,.iti__country:hover{background:#fffbf0;}' +
    '.iti__dial-code{color:#999;}';
  document.head.appendChild(style);

  function initAll() {
    document.querySelectorAll('input[type="tel"]').forEach(function (input) {
      if (input.dataset.itiInit) return;
      input.dataset.itiInit = '1';

      window.intlTelInput(input, {
        initialCountry: 'ma',
        preferredCountries: ['ma', 'fr', 'be', 'ch', 'gb', 'de', 'es', 'it', 'nl', 'pt', 'us', 'ca', 'dz', 'tn', 'sa', 'ae'],
        separateDialCode: true,
        utilsScript: BASE + 'js/utils.js',
      });

      /* Numbers-only */
      input.setAttribute('inputmode', 'numeric');
      input.addEventListener('input', function () {
        var pos = this.selectionStart;
        var cleaned = this.value.replace(/[^0-9\s\-]/g, '');
        if (cleaned !== this.value) {
          this.value = cleaned;
          try { this.setSelectionRange(pos - 1, pos - 1); } catch(e){}
        }
      });
      input.addEventListener('keypress', function (e) {
        if (!/[\d\s\-]/.test(e.key) && !['Backspace','Delete','Tab','Enter','ArrowLeft','ArrowRight'].includes(e.key)) {
          e.preventDefault();
        }
      });
    });
  }

  /* Load intl-tel-input JS then init */
  var script = document.createElement('script');
  script.src = BASE + 'js/intlTelInput.min.js';
  script.onload = function () {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAll);
    } else {
      initAll();
    }
  };
  document.head.appendChild(script);
})();
