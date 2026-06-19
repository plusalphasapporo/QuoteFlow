# QuoteFlow

QuoteFlow は、OA機器リース見積の作成・検索・見積番号台帳・PDF印刷を管理するための静的Webアプリです。

## 重要

GitHub Pagesで開けるように、アプリ本体はリポジトリ直下の `index.html` にまとめています。
Excelテンプレートをブラウザで開くと文字化けのように見えるため、画面確認は必ず `index.html` または GitHub Pages の公開URLで行ってください。

## 構成

```text
index.html
README.md
.gitignore
.nojekyll
assets/quoteflow-logo.png
templates/estimate-template.xlsx
scripts/check-files.js
```

## GitHub Pagesで表示する方法

1. このZIPを解凍
2. 中身をGitHubリポジトリ直下へアップロード
3. GitHubの `Settings` → `Pages`
4. `Deploy from a branch` を選択
5. Branchを `main`、Folderを `/root` にする
6. 表示された Pages URL を開く

GitHub上で `index.html` をクリックしてもソース表示になるだけです。アプリ画面は GitHub Pages URL で開きます。

## ローカルで確認する方法

`index.html` をダブルクリック、または以下で確認できます。

```bash
npm run dev
```

## チェック

```bash
npm run check
```
