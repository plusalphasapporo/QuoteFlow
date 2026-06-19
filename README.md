# QuoteFlow

QuoteFlow は、OA機器リース見積の作成・検索・見積番号台帳・料率マスタを管理するシンプルなブラウザアプリです。

## GitHub Pagesで開く方法

このZIPは、GitHub Pagesでそのまま公開できるように、`index.html` をリポジトリ直下に置いています。

### 1. GitHubにアップロード

新しいリポジトリを作成し、このZIPを解凍して中身をそのままアップロードしてください。

リポジトリ直下が次の形になっていればOKです。

```text
index.html
src/
assets/
templates/
package.json
README.md
.nojekyll
.github/
```

`quoteflow` という親フォルダの中に入れたままアップロードしないでください。`index.html` がリポジトリ直下にある状態にしてください。

### 2. GitHub Pagesを有効化

GitHubのリポジトリ画面で、以下を設定してください。

1. `Settings` を開く
2. `Pages` を開く
3. `Build and deployment` の `Source` を `GitHub Actions` にする
4. `Actions` が完了するまで待つ
5. 表示されたURLを開く

URLの例：

```text
https://ユーザー名.github.io/リポジトリ名/
```

## ローカルで開く方法

`index.html` をダブルクリックしてください。

または、Node.js が入っている場合は以下でも起動できます。

```bash
npm install
npm run dev
```

## 注意

- GitHub上で `index.html` のファイル名をクリックしても、アプリ画面ではなくコード表示になります。
- アプリ画面を見るには GitHub Pages のURLを開いてください。
- `templates/estimate-template.xlsx` はExcelテンプレートです。ブラウザで直接開くと文字化けのように見えます。

## チェック

```bash
npm run check
```

