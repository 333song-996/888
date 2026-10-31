const http = require('http');
const fs = require('fs');
const path = require('path');

const GAME = 'C:/Users/宋嘉铭/Desktop/工作区/soldier_dodge.html';
const LOGGER = `<script>
window.__log = [];
['click','pointerdown','pointerup','keydown','touchstart'].forEach(function(t){
  document.addEventListener(t, function(e){
    window.__log.push({t:t, ts:Math.round(performance.now()), tr:e.isTrusted, tag:e.target&&e.target.tagName, id:e.target&&e.target.id, x:e.clientX, y:e.clientY, detail:e.detail});
  }, true);
});
document.addEventListener('DOMContentLoaded', function(){
  var n = 0;
  new MutationObserver(function(){
    var el = document.getElementById('startOverlay');
    if (el && el.classList.contains('hidden') && n++ === 0) {
      window.__log.push({t:'START_HIDDEN', ts:Math.round(performance.now()), stack:new Error().stack});
    }
  }).observe(document.documentElement, {subtree:true, attributes:true, attributeFilter:['class']});
});
</script>`;

http.createServer((req, res) => {
  fs.readFile(GAME, 'utf8', (err, s) => {
    if (err) { res.writeHead(404); res.end('nf'); return; }
    s = s.replace('<head>', '<head>' + LOGGER);
    s = s.replace('  var hudCache', '  window.__game = state;\n  var hudCache');
    s = s.replace('if (e && e.isTrusted === false) return;', '');
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(s);
  });
}).listen(8782, '127.0.0.1', () => console.log('debug server 8782'));
