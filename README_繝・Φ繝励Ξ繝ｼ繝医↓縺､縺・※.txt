const fs = require('fs');
const required = ['index.html','src/app.js','src/styles.css','assets/quoteflow-logo.png','templates/estimate-template.xlsx'];
let ok = true;
for (const f of required) {
  if (!fs.existsSync(f)) { console.error('missing:', f); ok = false; }
}
const html = fs.readFileSync('index.html','utf8');
if (!html.includes('id="view"')) { console.error('missing view root'); ok = false; }
if (!html.includes('src/app.js')) { console.error('missing app.js script'); ok = false; }
if (!html.includes('src/styles.css')) { console.error('missing css link'); ok = false; }
if (!ok) process.exit(1);
console.log('QuoteFlow file check passed.');
