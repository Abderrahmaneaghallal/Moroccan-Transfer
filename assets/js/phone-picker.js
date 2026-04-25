/* ── Phone Picker Component ── */
(function () {

  var COUNTRIES = [
    { code: 'MA', dial: '+212', flag: '🇲🇦', name: 'Maroc' },
    { code: 'FR', dial: '+33',  flag: '🇫🇷', name: 'France' },
    { code: 'BE', dial: '+32',  flag: '🇧🇪', name: 'Belgique' },
    { code: 'CH', dial: '+41',  flag: '🇨🇭', name: 'Suisse' },
    { code: 'GB', dial: '+44',  flag: '🇬🇧', name: 'Royaume-Uni' },
    { code: 'DE', dial: '+49',  flag: '🇩🇪', name: 'Allemagne' },
    { code: 'ES', dial: '+34',  flag: '🇪🇸', name: 'Espagne' },
    { code: 'IT', dial: '+39',  flag: '🇮🇹', name: 'Italie' },
    { code: 'NL', dial: '+31',  flag: '🇳🇱', name: 'Pays-Bas' },
    { code: 'PT', dial: '+351', flag: '🇵🇹', name: 'Portugal' },
    { code: 'US', dial: '+1',   flag: '🇺🇸', name: 'États-Unis' },
    { code: 'CA', dial: '+1',   flag: '🇨🇦', name: 'Canada' },
    { code: 'DZ', dial: '+213', flag: '🇩🇿', name: 'Algérie' },
    { code: 'TN', dial: '+216', flag: '🇹🇳', name: 'Tunisie' },
    { code: 'SA', dial: '+966', flag: '🇸🇦', name: 'Arabie Saoudite' },
    { code: 'AE', dial: '+971', flag: '🇦🇪', name: 'Émirats Arabes' },
    { code: 'QA', dial: '+974', flag: '🇶🇦', name: 'Qatar' },
    { code: 'SE', dial: '+46',  flag: '🇸🇪', name: 'Suède' },
    { code: 'NO', dial: '+47',  flag: '🇳🇴', name: 'Norvège' },
    { code: 'DK', dial: '+45',  flag: '🇩🇰', name: 'Danemark' },
    { code: 'PL', dial: '+48',  flag: '🇵🇱', name: 'Pologne' },
    { code: 'RU', dial: '+7',   flag: '🇷🇺', name: 'Russie' },
    { code: 'CN', dial: '+86',  flag: '🇨🇳', name: 'Chine' },
    { code: 'JP', dial: '+81',  flag: '🇯🇵', name: 'Japon' },
    { code: 'AU', dial: '+61',  flag: '🇦🇺', name: 'Australie' },
    { code: 'BR', dial: '+55',  flag: '🇧🇷', name: 'Brésil' },
  ];

  /* ── CSS ── */
  var style = document.createElement('style');
  style.textContent = [
    '.pp-wrap{display:flex;align-items:stretch;border:1.5px solid #e8e2da;border-radius:10px;overflow:hidden;background:#faf8f5;transition:border-color .2s,box-shadow .2s;}',
    '.pp-wrap:focus-within{border-color:#C9A84C;box-shadow:0 0 0 3px rgba(201,168,76,0.12);}',
    '.pp-trigger{display:flex;align-items:center;gap:6px;padding:10px 10px 10px 12px;cursor:pointer;border-right:1.5px solid #e8e2da;background:#faf8f5;flex-shrink:0;user-select:none;position:relative;}',
    '.pp-flag{font-size:18px;line-height:1;}',
    '.pp-dial{font-size:13px;font-weight:600;color:#111;white-space:nowrap;}',
    '.pp-chevron{color:#999;flex-shrink:0;transition:transform .2s;}',
    '.pp-trigger.open .pp-chevron{transform:rotate(180deg);}',
    '.pp-number{flex:1;border:none;background:transparent;padding:10px 12px;font-size:14px;font-family:"DM Sans",sans-serif;color:#111;outline:none;min-width:0;}',
    '.pp-number::placeholder{color:#bbb;}',

    /* Dropdown */
    '.pp-dropdown{position:absolute;top:calc(100% + 6px);left:0;min-width:240px;background:#fff;border:1.5px solid #e8e2da;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.12);z-index:99999;display:none;overflow:hidden;}',
    '.pp-trigger.open .pp-dropdown{display:block;}',
    '.pp-search-wrap{padding:10px 12px;border-bottom:1px solid #f0ece6;}',
    '.pp-search{width:100%;border:1.5px solid #e8e2da;border-radius:8px;padding:7px 10px;font-size:13px;font-family:"DM Sans",sans-serif;color:#111;outline:none;background:#faf8f5;}',
    '.pp-search:focus{border-color:#C9A84C;}',
    '.pp-list{max-height:220px;overflow-y:auto;padding:6px 0;}',
    '.pp-option{display:flex;align-items:center;gap:10px;padding:9px 14px;cursor:pointer;font-size:13px;color:#333;transition:background .15s;}',
    '.pp-option:hover,.pp-option.active{background:#fffbf0;}',
    '.pp-option.active{font-weight:600;color:#C9A84C;}',
    '.pp-opt-flag{font-size:18px;flex-shrink:0;}',
    '.pp-opt-name{flex:1;}',
    '.pp-opt-dial{font-size:12px;color:#999;font-weight:600;}',
  ].join('');
  document.head.appendChild(style);

  function buildPicker(input) {
    var selected = COUNTRIES[0]; // Default: Morocco

    /* Wrapper */
    var wrap = document.createElement('div');
    wrap.className = 'pp-wrap';

    /* Trigger */
    var trigger = document.createElement('div');
    trigger.className = 'pp-trigger';
    trigger.innerHTML =
      '<span class="pp-flag">' + selected.flag + '</span>' +
      '<span class="pp-dial">' + selected.dial + '</span>' +
      '<svg class="pp-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>' +
      '<div class="pp-dropdown">' +
        '<div class="pp-search-wrap"><input class="pp-search" placeholder="Rechercher un pays…" autocomplete="off"></div>' +
        '<div class="pp-list"></div>' +
      '</div>';

    /* Prepare input */
    input.classList.add('pp-number');
    input.removeAttribute('placeholder');
    input.setAttribute('placeholder', 'N° de téléphone');
    input.setAttribute('inputmode', 'numeric');
    input.setAttribute('autocomplete', 'tel-national');

    /* Numbers-only filter */
    input.addEventListener('input', function () {
      var pos = this.selectionStart;
      var cleaned = this.value.replace(/[^0-9\s\-]/g, '');
      if (cleaned !== this.value) {
        this.value = cleaned;
        this.setSelectionRange(pos - 1, pos - 1);
      }
    });
    input.addEventListener('keypress', function (e) {
      if (!/[\d\s\-]/.test(e.key) && !['Backspace','Delete','Tab','Enter','ArrowLeft','ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    });

    wrap.appendChild(trigger);
    wrap.appendChild(input.cloneNode(true));

    /* Replace original input with wrap */
    var newInput = wrap.querySelector('.pp-number');

    /* Copy all attributes from original */
    Array.from(input.attributes).forEach(function(attr) {
      if (attr.name !== 'type' && attr.name !== 'placeholder') {
        newInput.setAttribute(attr.name, attr.value);
      }
    });
    newInput.setAttribute('inputmode', 'numeric');
    newInput.setAttribute('type', 'tel');

    input.parentNode.replaceChild(wrap, input);

    /* Render list */
    var list = trigger.querySelector('.pp-list');
    var searchInput = trigger.querySelector('.pp-search');

    function renderList(filter) {
      list.innerHTML = '';
      COUNTRIES.filter(function(c) {
        return !filter || c.name.toLowerCase().includes(filter.toLowerCase()) || c.dial.includes(filter);
      }).forEach(function(c) {
        var opt = document.createElement('div');
        opt.className = 'pp-option' + (c.code === selected.code ? ' active' : '');
        opt.innerHTML =
          '<span class="pp-opt-flag">' + c.flag + '</span>' +
          '<span class="pp-opt-name">' + c.name + '</span>' +
          '<span class="pp-opt-dial">' + c.dial + '</span>';
        opt.addEventListener('mousedown', function(e) {
          e.preventDefault();
          selected = c;
          trigger.querySelector('.pp-flag').textContent = c.flag;
          trigger.querySelector('.pp-dial').textContent = c.dial;
          trigger.classList.remove('open');
          renderList('');
          newInput.focus();
        });
        list.appendChild(opt);
      });
    }
    renderList('');

    /* Toggle dropdown */
    trigger.addEventListener('click', function(e) {
      if (e.target.closest('.pp-dropdown')) return;
      trigger.classList.toggle('open');
      if (trigger.classList.contains('open')) {
        searchInput.focus();
        searchInput.value = '';
        renderList('');
      }
    });

    /* Search */
    searchInput.addEventListener('input', function() {
      renderList(this.value);
    });

    /* Close on outside click */
    document.addEventListener('click', function(e) {
      if (!trigger.contains(e.target)) trigger.classList.remove('open');
    });

    /* Numbers-only on new input */
    newInput.addEventListener('input', function () {
      var pos = this.selectionStart;
      var cleaned = this.value.replace(/[^0-9\s\-]/g, '');
      if (cleaned !== this.value) { this.value = cleaned; this.setSelectionRange(pos-1,pos-1); }
    });
    newInput.addEventListener('keypress', function (e) {
      if (!/[\d\s\-]/.test(e.key) && !['Backspace','Delete','Tab','Enter','ArrowLeft','ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    });
  }

  /* ── Init: apply to all tel inputs ── */
  function init() {
    document.querySelectorAll('input[type="tel"]').forEach(function(input) {
      if (!input.closest('.pp-wrap')) buildPicker(input);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
