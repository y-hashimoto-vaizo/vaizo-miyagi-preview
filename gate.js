(function () {
  var KEY = 'vaizo_miyagi_gate_ok';
  if (sessionStorage.getItem(KEY) === '1') return;

  var hideStyle = document.createElement('style');
  hideStyle.id = 'gate-hide-style';
  hideStyle.textContent = 'body{display:none!important}';
  document.documentElement.appendChild(hideStyle);

  var gateStyle = document.createElement('style');
  gateStyle.textContent = [
    '#vaizo-gate{position:fixed;inset:0;background:#0a0a0a;color:#fff;z-index:99999;display:flex;align-items:center;justify-content:center;font-family:"Noto Sans JP","Hiragino Kaku Gothic ProN","Yu Gothic",sans-serif;-webkit-font-smoothing:antialiased}',
    '#vaizo-gate .g-inner{text-align:center;padding:40px;max-width:460px;width:90%}',
    '#vaizo-gate .g-brand{font-family:"Times New Roman",serif;letter-spacing:.22em;font-size:24px;margin-bottom:56px;color:#fff}',
    '#vaizo-gate .g-eyebrow{font-family:"Times New Roman",serif;font-size:12px;letter-spacing:.35em;color:#888;margin-bottom:14px}',
    '#vaizo-gate h1{font-size:22px;margin-bottom:20px;letter-spacing:.02em;line-height:1.6;font-weight:700}',
    '#vaizo-gate p{color:#999;font-size:13px;line-height:1.9;margin-bottom:36px}',
    '#vaizo-gate input{width:100%;padding:18px 20px;background:transparent;border:1px solid #2a2a2a;color:#fff;border-radius:2px;font-size:20px;letter-spacing:.5em;text-align:center;font-family:inherit;margin-bottom:16px;transition:border-color .2s}',
    '#vaizo-gate input:focus{outline:none;border-color:#fff}',
    '#vaizo-gate button{width:100%;padding:16px;background:#fff;color:#0a0a0a;border:none;border-radius:2px;font-size:13px;letter-spacing:.18em;cursor:pointer;font-family:inherit;transition:opacity .2s}',
    '#vaizo-gate button:hover{opacity:.82}',
    '#vaizo-gate .g-err{color:#ff7a7a;font-size:12px;min-height:16px;margin-top:10px;letter-spacing:.05em}',
    '#vaizo-gate .g-foot{margin-top:48px;color:#555;font-size:11px;letter-spacing:.18em}'
  ].join('');
  document.documentElement.appendChild(gateStyle);

  function build() {
    var wrap = document.createElement('div');
    wrap.id = 'vaizo-gate';
    wrap.innerHTML =
      '<div class="g-inner">' +
        '<div class="g-brand">VAIZO</div>' +
        '<div class="g-eyebrow">PRIVATE PREVIEW</div>' +
        '<h1>みやぎ産業振興機構様向け<br>簡易版WEBサイト</h1>' +
        '<p>このページは関係者限定のプレビューです。<br>ご案内した暗証番号をご入力ください。</p>' +
        '<input type="password" inputmode="numeric" maxlength="10" id="vaizo-pin" placeholder="・・・・" autocomplete="off" />' +
        '<div class="g-err" id="vaizo-err"></div>' +
        '<button id="vaizo-submit">入場する</button>' +
        '<div class="g-foot">© 2026 VAIZO Inc.</div>' +
      '</div>';
    document.documentElement.appendChild(wrap);
    var input = document.getElementById('vaizo-pin');
    var btn = document.getElementById('vaizo-submit');
    var err = document.getElementById('vaizo-err');
    setTimeout(function(){ input.focus(); }, 100);
    function check() {
      if (input.value === '0415') {
        sessionStorage.setItem(KEY, '1');
        wrap.remove();
        hideStyle.remove();
        gateStyle.remove();
      } else {
        err.textContent = '暗証番号が違います';
        input.value = '';
        input.focus();
      }
    }
    btn.addEventListener('click', check);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
