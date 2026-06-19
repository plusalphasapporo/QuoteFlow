# QuoteFlow エラーチェック結果

## 確認内容

- `index.html` が存在すること
- `src/app.js` が存在すること
- `src/styles.css` が存在すること
- `assets/quoteflow-logo.png` が存在すること
- `templates/estimate-template.xlsx` が存在すること
- `src/app.js` のJavaScript構文チェック
- `scripts/serve.js` のJavaScript構文チェック

## 実行コマンド

```bash
npm run check
```

## 結果

```text
QuoteFlow file check passed.
```

## 補足

このZIPはGitHubへそのままアップロードしやすいように、デモ画像、作業途中ファイル、起動補助の重複ファイルを除外した最小構成です。
