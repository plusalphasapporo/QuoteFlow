const fs = require('fs');
const required = ['index.html','README.md','package.json','.gitignore','.nojekyll','assets/quoteflow-logo.png','templates/estimate-template.xlsx'];
const missing = required.filter(f => !fs.existsSync(f));
if (missing.length) { console.error('Missing files:', missing.join(', ')); process.exit(1); }
const html = fs.readFileSync('index.html','utf8');
for (const word of ['QuoteFlow','見積管理ダッシュボード','新規作成','見積検索','見積台帳','マスタ','設定']) {
  if (!html.includes(word)) { console.error('Missing text in index.html:', word); process.exit(1); }
}
const match = html.match(/\/\* APP_START \*\/[\s\S]*?\/\* APP_END \*\//);
if (!match) { console.error('App script block not found'); process.exit(1); }
try { new Function(match[0].replace('/* APP_START */','').replace('/* APP_END */','')); }
catch (e) { console.error('JavaScript syntax error:', e.message); process.exit(1); }
console.log('QuoteFlow check passed. index.html is present, script syntax is valid, and required assets exist.');
