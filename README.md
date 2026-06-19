<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>QuoteFlow | 見積管理</title>
  <meta name="description" content="QuoteFlow - 見積作成、旧物件・残債、利益率計算、検索、台帳、PDF印刷、Drive同期を管理するアプリ">
  <style>
    :root{
      --navy:#07162f;--navy2:#0b2348;--ink:#0b1733;--muted:#667085;--line:#d8e0ee;--bg:#f6f9ff;--card:#fff;
      --blue:#2f8cff;--purple:#7b35ff;--green:#22a35a;--yellow:#b97800;--red:#c43d3d;
      --shadow:0 18px 45px rgba(12,26,61,.10),0 3px 12px rgba(12,26,61,.06);
      --soft:0 8px 22px rgba(12,26,61,.08);--grad:linear-gradient(135deg,#2d9bff 0%,#7b35ff 100%);
    }
    *{box-sizing:border-box} html,body{height:100%} body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans JP",Meiryo,sans-serif;color:var(--ink);background:var(--bg)}
    button,input,select,textarea{font:inherit} button{cursor:pointer}.hidden{display:none!important}.small{font-size:12px;color:var(--muted)}
    .app{min-height:100vh;display:grid;grid-template-columns:280px 1fr;background:radial-gradient(circle at 84% 0%,rgba(47,140,255,.12),transparent 38%),linear-gradient(180deg,#fbfdff,#f4f8ff)}
    .sidebar{position:sticky;top:0;height:100vh;padding:28px 20px;background:linear-gradient(180deg,#07162f 0%,#081c3b 55%,#061529 100%);color:white;display:flex;flex-direction:column;gap:22px;box-shadow:8px 0 32px rgba(5,18,42,.15)}

    .qf-logo-mark{width:48px;height:48px;display:inline-grid;place-items:center;flex:0 0 48px;filter:drop-shadow(0 10px 18px rgba(84,75,255,.25))}
    .qf-logo-mark svg{width:48px;height:48px;display:block}
    .qf-logo-word{font-weight:900;font-size:26px;letter-spacing:-.04em;color:#fff}
    .qdoc{width:794px;min-height:1123px;margin:0 auto;background:#fff;color:#111;padding:48px 30px 34px;font-family:"Noto Sans JP",Meiryo,sans-serif;box-shadow:var(--shadow);border:1px solid var(--line);position:relative}
    .qdoc-title{text-align:center;font-size:28px;font-weight:900;letter-spacing:.08em;margin:0 0 26px;color:#111}.qdoc-top{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-bottom:30px}.qdoc-left{font-size:14px;line-height:1.55;white-space:pre-line}.qdoc-customer{font-size:15px;font-weight:900;margin-bottom:10px}.qdoc-right{font-size:14px;line-height:1.45;text-align:left;justify-self:end;width:300px;position:relative}.plus-logo{font-family:Georgia,"Times New Roman",serif;font-size:34px;font-weight:900;letter-spacing:-.03em;color:#555;margin-bottom:14px;display:flex;align-items:center;gap:10px}.plus-arrows{font-size:34px;color:#777;letter-spacing:-.25em;font-family:Arial,sans-serif}.stamp{position:absolute;right:70px;top:62px;width:44px;height:44px;border:2px solid rgba(190,50,50,.55);border-radius:50%;color:rgba(190,50,50,.65);font-size:10px;display:grid;place-items:center;transform:rotate(-12deg);font-weight:900}.qdoc-meta{margin-top:16px;line-height:1.35}.qdoc-subject{font-size:15px;font-weight:800;margin:28px 0 22px}.qdoc-amount{font-size:17px;font-weight:900;margin:0 0 6px}.qdoc-amount span{font-size:19px}.qdoc-rule{height:1px;background:#bbb;margin:0 0 24px}.qdoc-table{width:100%;border-collapse:collapse;font-size:14px;margin-top:6px}.qdoc-table th{border-bottom:1px solid #777;text-align:right;padding:4px 4px;font-weight:900}.qdoc-table th.item{text-align:left}.qdoc-table td{padding:4px;border-bottom:1px solid #e5e5e5;text-align:right}.qdoc-table td.item{text-align:left}.qdoc-table tbody tr:nth-child(even){background:#dcdcdc}.qdoc-table .unit{text-align:center}.qdoc-totals{margin-left:auto;width:290px;margin-top:10px;font-size:14px}.qdoc-totals-row{display:grid;grid-template-columns:1fr 120px;border-bottom:1px solid #bbb;padding:5px 0}.qdoc-totals-row div:last-child{text-align:right;font-weight:800}.qdoc-breakdown{display:grid;grid-template-columns:1fr 1fr;gap:10px;border-bottom:1px solid #bbb;padding:6px 0 4px}.qdoc-breakdown div:last-child{text-align:right}.qdoc-tax-small{font-size:11px;text-align:right;margin-top:4px}.qdoc-notes-title{font-weight:900;margin-top:24px;margin-bottom:5px}.qdoc-notes{border:1px solid #bbb;min-height:130px;padding:10px;font-size:13px;line-height:1.35;white-space:pre-line}.qdoc-footer{position:absolute;bottom:24px;left:0;right:0;text-align:center;font-size:14px;color:#111}

    .customer-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:14px}.customer-address-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
    .print-company-logo-img{max-width:210px;max-height:62px;object-fit:contain;display:block;margin-bottom:12px}.print-company-logo-text{font-family:Georgia,"Times New Roman",serif;font-size:34px;font-weight:900;letter-spacing:-.03em;color:#555;margin-bottom:14px;display:flex;align-items:center;gap:10px}
    .print-stamp-img{position:absolute;right:72px;top:64px;width:46px;height:46px;object-fit:contain;opacity:.86}.stamp.fallback-stamp{right:72px;top:64px;width:46px;height:46px}
    .image-preview{border:1px dashed var(--line);border-radius:14px;padding:12px;background:#fbfdff;min-height:74px;display:flex;align-items:center;gap:12px}.image-preview img{max-height:58px;max-width:180px;object-fit:contain}.image-preview .placeholder{color:var(--muted);font-weight:800;font-size:13px}
    
    .company-master-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
    .company-master-grid .wide{grid-column:span 2}
    .company-preview{border:1px solid var(--line);border-radius:16px;padding:16px;background:#fbfdff;line-height:1.7;font-weight:700}
    @media(max-width:1000px){.company-master-grid{grid-template-columns:1fr}.company-master-grid .wide{grid-column:auto}}
    @media(max-width:900px){.customer-grid,.customer-address-grid{grid-template-columns:1fr}}
    @media print{.qdoc{width:210mm;min-height:297mm;box-shadow:none;border:0;margin:0;padding:14mm 8mm 10mm}.print-preview{padding:0!important}.qdoc-footer{bottom:8mm}.qdoc-table tbody tr:nth-child(even){background:#ddd!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}}

    .brand{display:flex;align-items:center;gap:12px;padding:0 8px}.brand img{width:48px;height:48px;object-fit:contain;filter:drop-shadow(0 10px 18px rgba(84,75,255,.25))}.brand-name{font-weight:900;font-size:26px;letter-spacing:-.04em}.nav{display:grid;gap:10px}.nav button{width:100%;border:0;border-radius:18px;padding:15px 18px;background:transparent;color:#dce7ff;display:flex;align-items:center;gap:16px;font-weight:800;text-align:left}.nav button:hover{background:rgba(255,255,255,.08)}.nav button.active{background:var(--grad);color:#fff;box-shadow:0 14px 28px rgba(75,88,255,.32)}.nav svg,.action svg{width:24px;height:24px;stroke:currentColor;stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round}.side-spacer{flex:1}.profile{border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.08);border-radius:16px;padding:15px;display:flex;align-items:center;gap:12px}.avatar{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:var(--grad);font-weight:900;font-size:22px}.profile b{display:block}.profile small{color:#b8c7e9}
    .main{padding:54px 44px 80px;overflow:auto}.page{display:none}.page.active{display:block;animation:fade .18s ease}@keyframes fade{from{opacity:.4;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
    .headline{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:28px}.headline h1{margin:0;font-size:34px;line-height:1.2;letter-spacing:-.04em}.headline p{margin:12px 0 0;color:var(--muted);font-weight:600}.badge{border:1px solid var(--line);background:white;border-radius:999px;padding:8px 12px;color:var(--muted);font-weight:700;box-shadow:var(--soft)}
    .stats{display:grid;grid-template-columns:repeat(4,minmax(150px,1fr));gap:20px;margin-bottom:28px}.stat{background:rgba(255,255,255,.90);border:1px solid var(--line);border-radius:20px;padding:24px;box-shadow:var(--soft);display:flex;align-items:center;gap:18px}.stat .ico{width:54px;height:54px;border-radius:50%;display:grid;place-items:center;background:rgba(123,53,255,.10);color:var(--purple)}.stat .label{color:#6e7890;font-weight:800}.stat .value{margin-top:6px;font-size:28px;font-weight:950;letter-spacing:-.03em}.actions{display:flex;gap:14px;flex-wrap:wrap;margin:0 0 38px}.action{border:1px solid var(--line);background:white;border-radius:13px;padding:14px 20px;display:flex;align-items:center;gap:10px;font-weight:900;color:#15213b;box-shadow:var(--soft)}.action.primary{background:var(--grad);color:white;border:0}.action.danger{color:var(--red)}.section-title{font-size:24px;margin:0 0 14px;letter-spacing:-.03em}.card{background:rgba(255,255,255,.92);border:1px solid var(--line);border-radius:20px;box-shadow:var(--soft);overflow:hidden}.table-wrap{overflow:auto}.table{width:100%;border-collapse:collapse;min-width:900px}.table th,.table td{padding:16px 14px;border-bottom:1px solid #e7edf6;text-align:left;white-space:nowrap}.table th{font-size:13px;color:#667085;background:#fbfdff}.table td{font-weight:650}.table tr:last-child td{border-bottom:0}.pill{display:inline-flex;align-items:center;justify-content:center;padding:6px 12px;border-radius:999px;font-size:12px;font-weight:900}.pill.confirmed{background:#d8f7df;color:#13733e}.pill.draft{background:#ffe8aa;color:#9b6500}.pill.info{background:#e4edff;color:#2654ad}.pill.old{background:#f1e7ff;color:#6b35b4}.link{border:0;background:transparent;color:#5d42ff;font-weight:900;padding:0 4px}.grid2{display:grid;grid-template-columns:1.1fr .9fr;gap:22px}.form{padding:24px}.field{display:grid;gap:7px;margin-bottom:16px}.field label{font-size:13px;font-weight:900;color:#49546a}.field input,.field select,.field textarea{width:100%;border:1px solid var(--line);border-radius:12px;padding:12px 13px;background:#fff;color:var(--ink);outline:0}.field input:focus,.field select:focus,.field textarea:focus{border-color:#8267ff;box-shadow:0 0 0 4px rgba(123,53,255,.12)}.row{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.line-items{display:grid;gap:10px}.line-item{display:grid;grid-template-columns:1.2fr 80px 110px 110px 110px 44px;gap:8px;align-items:center}.line-item input{border:1px solid var(--line);border-radius:10px;padding:10px}.mini-btn{border:1px solid var(--line);background:#fff;border-radius:10px;padding:10px;font-weight:900}.notice{padding:14px 16px;border-radius:14px;background:#edf4ff;border:1px solid #cfe0ff;color:#25406c;font-weight:700;margin-bottom:18px}.error{background:#fff0f0;border-color:#ffd2d2;color:#aa2222}.settings-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;padding:22px}.empty{padding:36px;text-align:center;color:var(--muted);font-weight:800}.toast{position:fixed;right:24px;bottom:24px;z-index:20;padding:14px 18px;border-radius:14px;background:#0c1b35;color:white;box-shadow:var(--shadow);font-weight:900;display:none}.toast.show{display:block}.print-preview{max-width:850px;background:white;margin:auto;padding:48px;border:1px solid var(--line);box-shadow:var(--shadow)}.print-preview h2{text-align:center;font-size:30px;margin:0 0 30px}.print-header{display:flex;justify-content:space-between;gap:30px;margin-bottom:30px}.print-total{text-align:right;font-size:24px;font-weight:950;margin:20px 0}.footer-note{margin-top:34px;color:#667085;line-height:1.8}

    /* 明細入力を1項目ずつ分かるカード形式に変更 */
    .line-items{display:grid;gap:14px}
    .line-head{display:none}
    .line-item{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:start;padding:16px;border:1px solid #d8e0ee;border-radius:18px;background:linear-gradient(180deg,#ffffff,#f9fbff);box-shadow:0 8px 18px rgba(12,26,61,.05)}
    .line-item-fields{display:grid;grid-template-columns:1.8fr .7fr 1fr 1fr 1fr 1fr .9fr;gap:12px;align-items:end}
    .line-item .field{margin-bottom:0}
    .line-item .field label{min-height:32px;display:flex;align-items:flex-end;line-height:1.25}
    .line-item input{border:1px solid var(--line);border-radius:12px;padding:11px 12px;background:#fff;color:var(--ink)}
    .line-item .sales input{background:#f3f7ff;border-color:#bfd4ff}
    .line-item .sales label{color:#1d5fd1}
    .line-item .cost input{background:#fff8f0;border-color:#ffd4a8}
    .line-item .cost label{color:#ba5b00}
    .line-item .result input{background:#f7fafc;border-color:#e1e8f0;font-weight:900}
    .line-item .profit input{background:#f2fff7;border-color:#bbefcf;color:#147a3d}
    .line-item .delete-wrap{padding-top:31px}
    .calc-panel{position:sticky;top:22px;align-self:start}
    .calc-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .calc-mini{border:1px solid var(--line);border-radius:15px;background:#fff;padding:13px;box-shadow:0 6px 14px rgba(12,26,61,.04)}
    .calc-mini .label{font-size:12px;color:#6e7890;font-weight:900}
    .calc-mini .value{font-size:18px;font-weight:950;letter-spacing:-.03em;margin-top:4px}
    .calc-mini.total{grid-column:1/-1;background:linear-gradient(135deg,#f4f8ff,#fbf8ff)}
    .calc-mini.total .value{font-size:24px}

    .create-layout{display:grid;gap:22px}
    .estimate-wide .wide-top{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
    .estimate-wide .wide-main{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:2px}
    .estimate-wide .wide-bottom{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
    .estimate-wide .field input,.estimate-wide .field select{min-height:46px}
    .subsection-title{font-size:22px;margin:10px 0 12px;letter-spacing:-.02em}
    .old-register-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
    .old-register-card{border:1px solid var(--line);border-radius:18px;padding:18px;background:linear-gradient(180deg,#fff,#f9fbff);box-shadow:0 8px 18px rgba(12,26,61,.05)}
    .old-register-card h4{margin:0 0 12px;font-size:18px}
    .summary-bottom{margin-top:22px}
    .summary-bottom .calc-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
    .summary-bottom .calc-mini .value{font-size:16px}
    .summary-bottom .calc-mini.total .value{font-size:22px}

    .master-form{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:14px;align-items:end}
    .master-form .wide{grid-column:span 2}
    .rate-actions{display:flex;gap:8px;flex-wrap:wrap}
    .danger-text{color:var(--red)!important}
    @media(max-width:900px){.master-form{grid-template-columns:1fr}.master-form .wide{grid-column:auto}}

    /* Excelテンプレートに合わせた明細列 */
    .line-item-fields{grid-template-columns:70px 2fr .65fr .75fr 1.1fr 1.15fr 1.1fr!important;gap:12px;align-items:end}
    .line-item .field.no input{text-align:center;font-weight:900;background:#f8fbff}.line-item .field.unit input{text-align:center;font-weight:900;background:#fff}
    .line-item .field.amount input{text-align:right;font-weight:950;background:#f7fafc}
    .line-item .field.price input,.line-item .field.cost input{text-align:right;font-weight:900;font-variant-numeric:tabular-nums}
    .line-item .field.price label{color:#1d5fd1}.line-item .field.cost label{color:#ba5b00}.line-item .field.amount label{color:#49546a}

    @media(max-width:1200px){.estimate-wide .wide-top{grid-template-columns:repeat(2,minmax(0,1fr))}.estimate-wide .wide-bottom{grid-template-columns:1fr}.summary-bottom .calc-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:900px){.estimate-wide .wide-main,.old-register-grid,.summary-bottom .calc-grid{grid-template-columns:1fr}.estimate-wide .wide-top{grid-template-columns:1fr}}
    @media(max-width:1100px){.line-item-fields{grid-template-columns:1fr 1fr}.line-item{grid-template-columns:1fr}.line-item .delete-wrap{padding-top:0}.calc-panel{position:static}}
    @media(max-width:1000px){.app{grid-template-columns:1fr}.sidebar{position:relative;height:auto}.nav{grid-template-columns:repeat(3,1fr)}.side-spacer,.profile{display:none}.main{padding:28px 18px}.stats{grid-template-columns:repeat(2,1fr)}.grid2,.settings-grid{grid-template-columns:1fr}}@media(max-width:600px){.stats{grid-template-columns:1fr}.nav{grid-template-columns:1fr}.line-item{grid-template-columns:1fr 70px 90px 90px 90px 40px}.headline{display:block}.brand-name{font-size:22px}}
    @media print{body{background:#fff}.sidebar,.headline,.actions,.nav,.no-print{display:none!important}.app{display:block}.main{padding:0}.page{display:none!important}#page-print{display:block!important}.print-preview{box-shadow:none;border:0;max-width:none}}
  </style>
</head>
<body>
<div class="app">
  <aside class="sidebar">
    <div class="brand"><span class="qf-logo-mark" aria-hidden="true"><svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="qfg" x1="8" y1="12" x2="56" y2="52" gradientUnits="userSpaceOnUse"><stop stop-color="#2d9bff"/><stop offset="1" stop-color="#7b35ff"/></linearGradient></defs><path d="M16 28 30 14h22c3 0 6 3 6 6v10l-8-8H33L19 36c-2 2-5 2-7 0l-2-2c-2-2-2-5 0-7z" fill="url(#qfg)"/><path d="M48 28 34 42H14c-3 0-6-3-6-6V25l8 8h15l14-14c2-2 5-2 7 0l2 2c2 2 2 5 0 7z" fill="url(#qfg)"/><path d="M25 31l8 8 16-18" fill="none" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div class="qf-logo-word">QuoteFlow</div></div>
    <nav class="nav" aria-label="メインメニュー">
      <button class="active" data-page="dashboard"><svg viewBox="0 0 24 24"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>TOP</button>
      <button data-page="create"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>新規作成</button>
      <button data-page="old"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10"/><path d="M17 15l2 2 4-4"/></svg>旧物件・残債</button>
      <button data-page="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>見積検索</button>
      <button data-page="ledger"><svg viewBox="0 0 24 24"><path d="M7 3h8l4 4v14H7z"/><path d="M15 3v5h5M9 13h6M9 17h6"/></svg>見積台帳</button>
      <button data-page="master"><svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/></svg>マスタ</button>
      <button data-page="settings"><svg viewBox="0 0 24 24"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V22a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H2a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V2a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H22a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>設定</button>
    </nav>
    <div class="side-spacer"></div>
    <div class="profile"><div class="avatar">Q</div><div><b>QuoteFlow</b><small>Ver 1.0</small></div></div>
  </aside>

  <main class="main">
    <section class="page active" id="page-dashboard">
      <div class="headline"><div><h1>見積管理ダッシュボード</h1><p>Excelテンプレート構成を維持しながら、見積作成・検索・台帳・旧物件・残債・PDF印刷・Drive同期を管理します。</p></div><span class="badge" id="syncBadge">ローカル保存</span></div>
      <div class="stats">
        <div class="stat"><div class="ico">▣</div><div><div class="label">今月の見積</div><div class="value" id="statMonth">0件</div></div></div>
        <div class="stat"><div class="ico">✓</div><div><div class="label">確定見積</div><div class="value" id="statConfirmed">0件</div></div></div>
        <div class="stat"><div class="ico">¥</div><div><div class="label">今月合計</div><div class="value" id="statTotal">¥0</div></div></div>
        <div class="stat"><div class="ico">旧</div><div><div class="label">旧物件・残債</div><div class="value" id="statOld">0件</div></div></div>
      </div>
      <div class="actions">
        <button class="action primary" data-goto="create">＋ 新規見積を作成</button>
        <button class="action" data-goto="create">旧物件・残債を登録</button>
        <button class="action" data-goto="search">見積を検索</button>
        <button class="action" data-goto="master">料率マスタ</button>
      </div>
      <h2 class="section-title">最近の見積</h2>
      <div class="card table-wrap"><table class="table"><thead><tr><th>見積番号</th><th>日付</th><th>得意先</th><th>案件名</th><th>月額税込</th><th>合計</th><th>状態</th><th>操作</th></tr></thead><tbody id="recentRows"></tbody></table></div>
    </section>

    <section class="page" id="page-create">
      <div class="headline"><div><h1>新規作成</h1><p>Excelテンプレートの構成に合わせて、見積情報と明細を入力します。</p></div><span class="badge" id="nextNumberBadge">次番号</span></div>
      <div class="notice">見積番号はローカル台帳で重複確認します。Googleスプレッドシート連携時は設定画面でSpreadsheet IDを設定してください。</div>
      <div class="create-layout">
        <div class="card form estimate-wide">
          <h3 class="subsection-title">見積情報</h3>
          <div class="wide-top">
            <div class="field"><label>見積番号</label><input id="estimateNo" readonly></div>
            <div class="field"><label>作成日</label><input id="estimateDate" type="date"></div>
            <div class="field"><label>リース期間</label><select id="leaseMonths"><option>36</option><option>48</option><option selected>60</option><option>72</option><option>84</option><option>96</option></select></div>
            <div class="field"><label>状態</label><select id="status"><option value="draft">下書き</option><option value="confirmed">確定</option></select></div>
            <div class="field"><label>自社担当者</label><input id="staffName" placeholder="担当者名"></div>
          </div>
          <div class="wide-main">
            <div class="field"><label>顧客名</label><input id="customerName" placeholder="株式会社サンプル商事"></div>
            <div class="field"><label>案件名</label><input id="projectName" placeholder="OA機器リース導入"></div>
          </div>
          <div class="customer-grid">
            <div class="field"><label>郵便番号</label><input id="customerZip" placeholder="〒060-0000"></div>
            <div class="field"><label>担当者</label><input id="customerPerson" placeholder="竹生 香理様"></div>
          </div>
          <div class="customer-address-grid">
            <div class="field"><label>住所1</label><input id="customerAddress1" placeholder="札幌市○○区○○1条1丁目1-1"></div>
            <div class="field"><label>住所2</label><input id="customerAddress2" placeholder="建物名・部署名など"></div>
          </div>
          <div class="wide-bottom">
            <div class="field"><label>適用料率</label><select id="rateSelect"></select></div>
            <div class="field"><label>旧物件・残債 反映額 1</label><select id="oldBalanceSelect1"></select></div>
            <div class="field"><label>旧物件・残債 反映額 2</label><select id="oldBalanceSelect2"></select></div>
            <div class="notice" style="margin-bottom:0;align-self:end">旧物件・残債は下の登録欄で2件まで同時登録できます。保存後、ここにすぐ反映されます。</div>
          </div>
        </div>

        <div class="card form">
          <h3 class="subsection-title">明細</h3>
          <p class="small">Excelテンプレートに合わせて「No. / 物件名・型番 / 数量 / 単位 / 税抜単価 / 税抜金額 / 仕入れ単価」で入力します。単位は「個」「式」「台」「セット」など自由に入力できます。税抜金額は数量×税抜単価で自動計算します。</p>
          <div class="line-items" id="lineItems"></div><datalist id="unitOptions"><option value="個"><option value="式"><option value="台"><option value="セット"><option value="本"><option value="枚"><option value="月"></datalist>
          <div class="field" style="margin-top:18px"><label>備考</label><textarea id="estimateNotes" rows="6" placeholder="例：年額お支払いになります。\n拠点ごとに導入\n1ライセンス5ユーザー設定可能"></textarea></div>
          <div class="actions" style="margin-top:18px"><button class="action" id="addLine">明細追加</button><button class="action primary" id="saveEstimate">保存</button><button class="action" id="showPrint">印刷プレビュー</button></div>
        </div>

        <div class="card form">
          <h3 class="subsection-title">旧物件・残債を登録</h3>
          <div class="old-register-grid">
            <div class="old-register-card">
              <h4>旧物件・残債 1</h4>
              <div class="field"><label>旧物件名</label><input id="inlineOldName1" placeholder="旧複合機リース 1"></div>
              <div class="row"><div class="field"><label>既存リース会社</label><input id="inlineOldCompany1" placeholder="〇〇リース"></div><div class="field"><label>契約番号</label><input id="inlineOldContract1" placeholder="L-0001"></div></div>
              <div class="row"><div class="field"><label>残回数</label><input id="inlineOldRemaining1" type="number" min="0" value="12"></div><div class="field"><label>月額税込</label><input id="inlineOldMonthly1" type="number" min="0" value="0"></div></div>
              <div class="row"><div class="field"><label>税込残債（自動計算：月額税込×残回数）</label><input id="inlineOldBalance1" type="number" min="0" value="0"></div><div class="field"><label>税込解約金・精算額</label><input id="inlineOldSettlement1" type="number" min="0" value="0"></div></div>
              <div class="row"><div class="field"><label>見積反映区分</label><select id="inlineOldApply1"><option value="include">新規見積に含める</option><option value="reference">参考情報</option></select></div><div class="field"><label>見積反映額</label><input id="inlineOldApplyAmount1" type="number" min="0" value="0"></div></div>
              <div class="field"><label>備考</label><textarea id="inlineOldNote1" rows="2" placeholder="残債精算予定日など"></textarea></div>
              <div class="actions"><button class="action" id="saveInlineOld1" type="button">保存して反映 1</button><button class="action" id="clearInlineOld1" type="button">入力クリア</button></div>
            </div>
            <div class="old-register-card">
              <h4>旧物件・残債 2</h4>
              <div class="field"><label>旧物件名</label><input id="inlineOldName2" placeholder="旧複合機リース 2"></div>
              <div class="row"><div class="field"><label>既存リース会社</label><input id="inlineOldCompany2" placeholder="〇〇リース"></div><div class="field"><label>契約番号</label><input id="inlineOldContract2" placeholder="L-0002"></div></div>
              <div class="row"><div class="field"><label>残回数</label><input id="inlineOldRemaining2" type="number" min="0" value="12"></div><div class="field"><label>月額税込</label><input id="inlineOldMonthly2" type="number" min="0" value="0"></div></div>
              <div class="row"><div class="field"><label>税込残債（自動計算：月額税込×残回数）</label><input id="inlineOldBalance2" type="number" min="0" value="0"></div><div class="field"><label>税込解約金・精算額</label><input id="inlineOldSettlement2" type="number" min="0" value="0"></div></div>
              <div class="row"><div class="field"><label>見積反映区分</label><select id="inlineOldApply2"><option value="include">新規見積に含める</option><option value="reference">参考情報</option></select></div><div class="field"><label>見積反映額</label><input id="inlineOldApplyAmount2" type="number" min="0" value="0"></div></div>
              <div class="field"><label>備考</label><textarea id="inlineOldNote2" rows="2" placeholder="残債精算予定日など"></textarea></div>
              <div class="actions"><button class="action" id="saveInlineOld2" type="button">保存して反映 2</button><button class="action" id="clearInlineOld2" type="button">入力クリア</button></div>
            </div>
          </div>
        </div>

        <div class="card form summary-bottom">
          <h3 class="subsection-title">計算結果</h3>
          <div class="calc-grid">
            <div class="calc-mini total"><div class="label">見積合計税込</div><div class="value" id="calcTotal">¥0</div></div>
            <div class="calc-mini"><div class="label">月額税込</div><div class="value" id="calcMonthly">¥0</div></div>
            <div class="calc-mini"><div class="label">利益率</div><div class="value" id="calcMargin">0.0%</div></div>
            <div class="calc-mini"><div class="label">税抜売上合計</div><div class="value" id="calcSales">¥0</div></div>
            <div class="calc-mini"><div class="label">仕入税抜</div><div class="value" id="calcCost">¥0</div></div>
            <div class="calc-mini"><div class="label">粗利</div><div class="value" id="calcProfit">¥0</div></div>
            <div class="calc-mini"><div class="label">旧物件・残債反映</div><div class="value" id="calcOld">¥0</div></div>
            <div class="calc-mini"><div class="label">消費税</div><div class="value" id="calcTax">¥0</div></div>
            <div class="calc-mini"><div class="label">税率</div><div class="value" id="calcTaxRate">10%</div></div>
          </div>
          <p class="small">利益率は明細の税抜売上合計と仕入税抜から計算します。旧物件・残債は合計へ加算し、利益率計算からは除外します。</p>
        </div>
      </div>
    </section>

    <section class="page" id="page-old">
      <div class="headline"><div><h1>旧物件・残債</h1><p>既存リース契約、残回数、残債、精算額を管理します。Excelの「旧物件_残債」シートに相当する画面です。</p></div><span class="badge">残債管理</span></div>
      <div class="grid2">
        <div class="card form">
          <h3>旧物件・残債を登録</h3>
          <div class="field"><label>旧物件名</label><input id="oldName" placeholder="旧複合機リース"></div>
          <div class="row"><div class="field"><label>既存リース会社</label><input id="oldCompany" placeholder="〇〇リース"></div><div class="field"><label>契約番号</label><input id="oldContract" placeholder="L-0001"></div></div>
          <div class="row"><div class="field"><label>残回数</label><input id="oldRemaining" type="number" min="0" value="12"></div><div class="field"><label>月額税込</label><input id="oldMonthly" type="number" min="0" value="0"></div></div>
          <div class="row"><div class="field"><label>税込残債（自動計算：月額税込×残回数）</label><input id="oldBalance" type="number" min="0" value="0"></div><div class="field"><label>税込解約金・精算額</label><input id="oldSettlement" type="number" min="0" value="0"></div></div>
          <div class="row"><div class="field"><label>見積反映区分</label><select id="oldApply"><option value="include">新規見積に含める</option><option value="reference">参考情報</option></select></div><div class="field"><label>見積反映額</label><input id="oldApplyAmount" type="number" min="0" value="0"></div></div>
          <div class="field"><label>備考</label><textarea id="oldNote" rows="3" placeholder="残債精算予定日など"></textarea></div>
          <div class="actions"><button class="action primary" id="saveOld">旧物件を保存</button><button class="action" id="clearOld">入力クリア</button></div>
        </div>
        <div class="card form"><h3>残債サマリー</h3><div class="stat"><div class="ico">件</div><div><div class="label">登録件数</div><div class="value" id="oldCount">0件</div></div></div><br><div class="stat"><div class="ico">¥</div><div><div class="label">見積反映額合計</div><div class="value" id="oldApplyTotal">¥0</div></div></div><p class="small">見積反映区分が「新規見積に含める」の旧物件のみ、新規作成画面の選択肢に表示されます。</p></div>
      </div>
      <h2 class="section-title" style="margin-top:28px">旧物件・残債一覧</h2>
      <div class="card table-wrap"><table class="table"><thead><tr><th>旧物件名</th><th>リース会社</th><th>契約番号</th><th>残回数</th><th>月額税込</th><th>税込残債</th><th>精算額</th><th>反映区分</th><th>反映額</th><th>操作</th></tr></thead><tbody id="oldRows"></tbody></table></div>
    </section>

    <section class="page" id="page-search"><div class="headline"><div><h1>見積検索</h1><p>顧客名、案件名、見積番号で検索できます。</p></div></div><div class="actions"><input id="searchKeyword" placeholder="検索キーワード" style="border:1px solid var(--line);border-radius:13px;padding:14px 16px;min-width:280px"><select id="searchStatus" style="border:1px solid var(--line);border-radius:13px;padding:14px 16px"><option value="">すべて</option><option value="draft">下書き</option><option value="confirmed">確定</option></select></div><div class="card table-wrap"><table class="table"><thead><tr><th>見積番号</th><th>日付</th><th>得意先</th><th>案件名</th><th>月額税込</th><th>合計</th><th>状態</th><th>操作</th></tr></thead><tbody id="searchRows"></tbody></table></div></section>
    <section class="page" id="page-ledger"><div class="headline"><div><h1>見積台帳</h1><p>見積番号の発行履歴を確認します。</p></div></div><div class="card table-wrap"><table class="table"><thead><tr><th>見積番号</th><th>作成日</th><th>顧客名</th><th>案件名</th><th>状態</th><th>登録日時</th></tr></thead><tbody id="ledgerRows"></tbody></table></div></section>
    <section class="page" id="page-master">
      <div class="headline"><div><h1>マスタ</h1><p>料率マスタを追加・編集できます。同じ期間でも、リース会社や条件が違う料率を複数登録できます。</p></div></div>
      <div class="card form">
        <h3 class="subsection-title">会社情報マスタ</h3>
        <p class="small">ここで登録した自社情報が印刷プレビュー右上に表示されます。サンプル社名は表示しません。</p>
        <div class="company-master-grid">
          <div class="field"><label>会社名</label><input id="companyName" placeholder="例：株式会社○○"></div>
          <div class="field"><label>郵便番号</label><input id="companyZip" placeholder="〒000-0000"></div>
          <div class="field"><label>TEL</label><input id="companyTel" placeholder="000-0000-0000"></div>
          <div class="field wide"><label>住所1</label><input id="companyAddress1" placeholder="札幌市○○区○○1条1丁目1-1"></div>
          <div class="field"><label>FAX</label><input id="companyFax" placeholder="000-0000-0000"></div>
          <div class="field wide"><label>住所2</label><input id="companyAddress2" placeholder="建物名・部署名など"></div>
          <div class="field"><label>代表担当者</label><input id="companyDefaultStaff" placeholder="担当者名"></div>
          <div class="field wide"><label>会社メモ</label><input id="companyMemo" placeholder="帳票には表示しない管理用メモ"></div>
        </div>
        <div class="actions" style="margin-top:8px"><button class="action primary" id="saveCompany" type="button">会社情報を保存</button><button class="action" id="clearCompany" type="button">入力クリア</button></div>
        <div class="company-preview" id="companyPreview" style="margin-top:14px"></div>
      </div>
      <div class="card form">
        <h3 class="subsection-title">料率マスタ登録・編集</h3>
        <input id="rateEditId" type="hidden">
        <div class="master-form">
          <div class="field"><label>期間（月）</label><input id="rateMonths" type="number" min="1" placeholder="60"></div>
          <div class="field"><label>料率</label><input id="rateValue" type="number" step="0.0001" min="0" placeholder="0.0196"></div>
          <div class="field"><label>リース会社 / 条件名</label><input id="rateName" placeholder="標準料率 / A社"></div>
          <div class="field"><label>状態</label><select id="rateActive"><option value="true">有効</option><option value="false">無効</option></select></div>
          <div class="field"><label>適用開始日</label><input id="rateStart" type="date"></div>
          <div class="field wide"><label>備考</label><input id="rateMemo" placeholder="同じ60ヶ月でもキャンペーン料率などを登録可能"></div>
          <div class="actions" style="margin:0"><button class="action primary" id="saveRate" type="button">料率を登録</button><button class="action" id="clearRate" type="button">入力クリア</button></div>
        </div>
      </div>
      <h2 class="section-title" style="margin-top:28px">料率一覧</h2>
      <div class="card table-wrap"><table class="table"><thead><tr><th>期間（月）</th><th>料率</th><th>リース会社 / 条件名</th><th>適用開始日</th><th>備考</th><th>状態</th><th>操作</th></tr></thead><tbody id="rateRows"></tbody></table></div>
    </section>
    <section class="page" id="page-settings"><div class="headline"><div><h1>設定</h1><p>Google Drive / スプレッドシート連携と消費税計算の設定値を保存します。</p></div></div><div class="card settings-grid"><div class="field"><label>Google Client ID</label><input id="googleClientId" placeholder="xxxxxxxx.apps.googleusercontent.com"></div><div class="field"><label>Spreadsheet ID / URL</label><input id="spreadsheetId" placeholder="見積台帳のURLまたはID"></div><div class="field"><label>台帳シート名</label><input id="sheetName" value="見積台帳"></div><div class="field"><label>Drive保存フォルダ</label><input id="driveFolder" value="QuoteFlow/PDF"></div><div class="field"><label>消費税率（%）</label><input id="taxRate" type="number" min="0" step="0.1" value="10" placeholder="10"></div><div class="field"><label>消費税の端数処理</label><select id="taxRounding"><option value="round">四捨五入</option><option value="floor">切り捨て</option><option value="ceil">切り上げ</option></select></div><div class="field"><label>会社ロゴ画像</label><input id="companyLogoFile" type="file" accept="image/*"><div class="image-preview" id="companyLogoPreview"><span class="placeholder">未設定の場合は会社名テキストを表示</span></div></div><div class="field"><label>会社印鑑画像</label><input id="companyStampFile" type="file" accept="image/*"><div class="image-preview" id="companyStampPreview"><span class="placeholder">未設定の場合は印鑑なし</span></div></div><div style="grid-column:1/-1" class="notice">消費税は「税抜売上合計 + 旧物件・残債反映額」に対して計算します。会社ロゴと印鑑は印刷プレビューに表示されます。印鑑は帳票右上に約46pxで表示します。</div><div style="grid-column:1/-1" class="actions"><button class="action primary" id="saveSettings">設定を保存</button><button class="action" id="testSettings">接続設定を確認</button></div></div></section>
    <section class="page" id="page-print"><div class="actions no-print"><button class="action" data-goto="create">戻る</button><button class="action primary" onclick="window.print()">PDF保存 / 印刷</button></div><div class="print-preview" id="printDoc"></div></section>
  </main>
</div>
<div class="toast" id="toast"></div>
<script>
(function(){
'use strict';
const STORE_KEY='quoteflow.estimates.v4';
const OLD_KEY='quoteflow.oldBalances.v1';
const SETTINGS_KEY='quoteflow.settings.v5';
const RATE_KEY='quoteflow.rates.v1';
const COMPANY_KEY='quoteflow.company.v1';
const defaultRates=[{id:'rate-36-std',m:36,r:.0311,name:'標準料率',start:'',memo:'月額料率',active:true},{id:'rate-48-std',m:48,r:.0239,name:'標準料率',start:'',memo:'月額料率',active:true},{id:'rate-60-std',m:60,r:.0196,name:'標準料率',start:'',memo:'月額料率',active:true},{id:'rate-72-std',m:72,r:.0167,name:'標準料率',start:'',memo:'月額料率',active:true},{id:'rate-84-std',m:84,r:.0146,name:'標準料率',start:'',memo:'月額料率',active:true},{id:'rate-96-std',m:96,r:.0138,name:'標準料率',start:'',memo:'月額料率',active:true}];
const sampleEstimates=[
 {no:'Q-2026-001',date:'2026-06-19',customer:'株式会社サンプル商事',project:'OA機器リース導入',months:60,status:'confirmed',oldId:'old-1',items:[{name:'複合機リース',qty:1,price:1494000,cost:1180000}],createdAt:'2026-06-19 09:00'},
 {no:'Q-2026-002',date:'2026-06-19',customer:'有限会社テストオフィス',project:'PC・周辺機器リース',months:60,status:'draft',oldId:'',items:[{name:'PC・周辺機器',qty:1,price:900000,cost:720000}],createdAt:'2026-06-19 10:10'}
];
const sampleOld=[{id:'old-1',name:'旧複合機リース',company:'サンプルリース',contract:'L-2023-009',remaining:12,monthly:19800,balance:237600,settlement:0,apply:'include',applyAmount:237600,note:'新規見積に残債精算として反映'}];
const $=s=>document.querySelector(s); const $$=s=>Array.from(document.querySelectorAll(s));
function money(n){return '¥'+Math.round(Number(n)||0).toLocaleString('ja-JP')}
function today(){return new Date().toISOString().slice(0,10)}
function nowText(){return new Date().toLocaleString('ja-JP',{hour12:false}).replace(/\//g,'-')}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400)}
function read(key,fallback){try{const raw=localStorage.getItem(key);if(raw)return JSON.parse(raw)}catch(e){console.error(e)}return fallback}
function estimates(){return read(STORE_KEY,sampleEstimates)}
function oldRows(){return read(OLD_KEY,sampleOld)}
function saveEstimates(rows){localStorage.setItem(STORE_KEY,JSON.stringify(rows));renderAll()}
function saveOldRows(rows){localStorage.setItem(OLD_KEY,JSON.stringify(rows));renderAll()}
function settings(){return read(SETTINGS_KEY,{taxRate:10,taxRounding:'round'})}
function rates(){return read(RATE_KEY,defaultRates)}
function saveRates(rows){localStorage.setItem(RATE_KEY,JSON.stringify(rows));renderAll()}
function companyInfo(){return read(COMPANY_KEY,{name:'',zip:'',address1:'',address2:'',tel:'',fax:'',defaultStaff:'',memo:''})}
function saveCompanyInfo(c){localStorage.setItem(COMPANY_KEY,JSON.stringify(c));renderAll()}
function taxRate(){const r=Number(settings().taxRate);return isFinite(r)?r:10}
function roundTax(v){const mode=settings().taxRounding||'round';if(mode==='floor')return Math.floor(v);if(mode==='ceil')return Math.ceil(v);return Math.round(v)}
function taxAmount(net){return roundTax((Number(net)||0)*taxRate()/100)}
function taxIncluded(net){const n=Number(net)||0;return n+taxAmount(n)}
function rateFor(months,rateId){const rows=rates().filter(x=>x.active!==false);let r=rateId?rows.find(x=>x.id===rateId):null;if(!r)r=rows.find(x=>x.m==months)||rows[0]||defaultRates[2];return Number(r.r)||0}
function oldIds(est){return Array.isArray(est.oldIds)?est.oldIds.filter(Boolean):(est.oldId?[est.oldId]:[])}
function oldAmount(est){return oldIds(est).reduce((total,id)=>{const old=oldRows().find(x=>x.id===id);return total+(old&&old.apply==='include'?(Number(old.applyAmount)||0):0)},0)}
function sales(est){return (est.items||[]).reduce((a,x)=>a+(Number(x.qty)||0)*(Number(x.price)||0),0)}
function purchaseCost(est){return (est.items||[]).reduce((a,x)=>a+(Number(x.qty)||0)*(Number(x.cost)||0),0)}
function grossProfit(est){return sales(est)-purchaseCost(est)}
function profitMargin(est){return sales(est)>0?grossProfit(est)/sales(est)*100:0}
function sum(est){return sales(est)+oldAmount(est)}
function monthly(est){return Math.round(taxIncluded(sum(est))*rateFor(est.months,est.rateId))}
function nextNo(){const year=new Date().getFullYear();let max=0;estimates().forEach(r=>{const m=String(r.no||'').match(/^Q-(\d{4})-(\d{3,})$/);if(m&&Number(m[1])===year)max=Math.max(max,Number(m[2]))});return 'Q-'+year+'-'+String(max+1).padStart(3,'0')}
function statusPill(s){return '<span class="pill '+(s==='confirmed'?'confirmed':'draft')+'">'+(s==='confirmed'?'confirmed':'draft')+'</span>'}
function rowHtml(r){return '<tr><td>'+r.no+'</td><td>'+r.date+'</td><td>'+r.customer+'</td><td>'+r.project+'</td><td>'+money(monthly(r))+'</td><td>'+money(taxIncluded(sum(r)))+'</td><td>'+statusPill(r.status)+'</td><td><button class="link" data-edit="'+r.no+'">編集</button><button class="link" data-copy="'+r.no+'">複製</button></td></tr>'}
function goto(page){$$('.page').forEach(p=>p.classList.remove('active'));$('#page-'+page).classList.add('active');$$('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===page));if(page==='create')resetForm();renderAll()}
function renderDashboard(){const rows=estimates();const month=new Date().toISOString().slice(0,7);const monthRows=rows.filter(r=>String(r.date).slice(0,7)===month||String(r.date).slice(0,4)==='2026');$('#statMonth').textContent=monthRows.length+'件';$('#statConfirmed').textContent=rows.filter(r=>r.status==='confirmed').length+'件';$('#statTotal').textContent=money(monthRows.reduce((a,r)=>a+taxIncluded(sum(r)),0));$('#statOld').textContent=oldRows().length+'件';$('#recentRows').innerHTML=rows.slice(-5).reverse().map(rowHtml).join('')||'<tr><td colspan="8" class="empty">まだ見積がありません</td></tr>'}
function renderSearch(){const rows=estimates();const kw=($('#searchKeyword').value||'').toLowerCase();const st=$('#searchStatus').value;const res=rows.filter(r=>(!st||r.status===st)&&[r.no,r.customer,r.project].join(' ').toLowerCase().includes(kw));$('#searchRows').innerHTML=res.map(rowHtml).join('')||'<tr><td colspan="8" class="empty">該当する見積がありません</td></tr>'}
function renderLedger(){const rows=estimates();$('#ledgerRows').innerHTML=rows.map(r=>'<tr><td>'+r.no+'</td><td>'+r.date+'</td><td>'+r.customer+'</td><td>'+r.project+'</td><td>'+statusPill(r.status)+'</td><td>'+(r.createdAt||'')+'</td></tr>').join('')}
function renderRates(){ const rows=rates(); $('#rateRows').innerHTML=rows.map(r=>'<tr><td>'+r.m+'</td><td>'+Number(r.r).toFixed(4)+'</td><td>'+(r.name||'')+'</td><td>'+(r.start||'')+'</td><td>'+(r.memo||'')+'</td><td><span class="pill '+(r.active===false?'draft':'confirmed')+'">'+(r.active===false?'無効':'有効')+'</span></td><td class="rate-actions"><button class="link" data-edit-rate="'+r.id+'">編集</button><button class="link danger-text" data-delete-rate="'+r.id+'">削除</button></td></tr>').join('')||'<tr><td colspan="7" class="empty">料率が登録されていません</td></tr>' }
function renderRateSelect(){ const sel=$('#rateSelect'); if(!sel)return; const current=sel.value; const rows=rates().filter(r=>r.active!==false); sel.innerHTML=rows.map(r=>'<option value="'+r.id+'">'+r.m+'ヶ月 / '+Number(r.r).toFixed(4)+' / '+(r.name||'料率')+'</option>').join(''); if(rows.some(r=>r.id===current))sel.value=current }
function clearRateForm(){ $('#rateEditId').value=''; $('#rateMonths').value=''; $('#rateValue').value=''; $('#rateName').value=''; $('#rateActive').value='true'; $('#rateStart').value=''; $('#rateMemo').value=''; $('#saveRate').textContent='料率を登録' }
function editRate(id){ const r=rates().find(x=>x.id===id); if(!r)return; goto('master'); $('#rateEditId').value=r.id; $('#rateMonths').value=r.m; $('#rateValue').value=r.r; $('#rateName').value=r.name||''; $('#rateActive').value=String(r.active!==false); $('#rateStart').value=r.start||''; $('#rateMemo').value=r.memo||''; $('#saveRate').textContent='料率を更新' }
function saveRate(){ if(!confirm('料率マスタを登録・更新します。よろしいですか？'))return; const m=Number($('#rateMonths').value)||0; const rv=Number($('#rateValue').value)||0; if(!m||!rv){toast('期間と料率を入力してください');return} const rows=rates(); const id=$('#rateEditId').value||('rate-'+Date.now()); const row={id,m,r:rv,name:$('#rateName').value||'料率',active:$('#rateActive').value==='true',start:$('#rateStart').value||'',memo:$('#rateMemo').value||''}; const idx=rows.findIndex(x=>x.id===id); if(idx>=0)rows[idx]=row; else rows.push(row); saveRates(rows); clearRateForm(); toast('料率マスタを保存しました') }
function deleteRate(id){ if(!confirm('この料率マスタを削除します。よろしいですか？'))return; saveRates(rates().filter(r=>r.id!==id)); toast('料率マスタを削除しました') }

function renderOld(){const rows=oldRows();$('#oldCount').textContent=rows.length+'件';$('#oldApplyTotal').textContent=money(rows.filter(r=>r.apply==='include').reduce((a,r)=>a+(Number(r.applyAmount)||0),0));$('#oldRows').innerHTML=rows.map(r=>'<tr><td>'+r.name+'</td><td>'+r.company+'</td><td>'+r.contract+'</td><td>'+r.remaining+'</td><td>'+money(r.monthly)+'</td><td>'+money(r.balance)+'</td><td>'+money(r.settlement)+'</td><td><span class="pill '+(r.apply==='include'?'old':'info')+'">'+(r.apply==='include'?'新規見積に含める':'参考情報')+'</span></td><td>'+money(r.applyAmount)+'</td><td><button class="link" data-delete-old="'+r.id+'">削除</button></td></tr>').join('')||'<tr><td colspan="10" class="empty">旧物件・残債は未登録です</td></tr>'}
function renderOldSelect(){const opts=['<option value="">旧物件・残債を反映しない</option>'].concat(oldRows().filter(r=>r.apply==='include').map(r=>'<option value="'+r.id+'">'+r.name+' / '+money(r.applyAmount)+'</option>'));['#oldBalanceSelect1','#oldBalanceSelect2'].forEach(sel=>{const el=$(sel);if(el)el.innerHTML=opts.join('')})}
function renderImagePreview(id, data, placeholder){
  const box=$(id); if(!box)return;
  box.innerHTML = data ? '<img src="'+data+'" alt="preview"><span class="placeholder">登録済み</span>' : '<span class="placeholder">'+placeholder+'</span>';
}
function renderCompany(){
  const c=companyInfo();
  const set=(id,v)=>{const el=document.querySelector(id); if(el)el.value=v||''};
  set('#companyName',c.name); set('#companyZip',c.zip); set('#companyAddress1',c.address1); set('#companyAddress2',c.address2); set('#companyTel',c.tel); set('#companyFax',c.fax); set('#companyDefaultStaff',c.defaultStaff); set('#companyMemo',c.memo);
  const p=document.querySelector('#companyPreview');
  if(p){p.innerHTML='<b>印刷プレビュー表示</b><br>'+escapeHtml(c.name||'会社名未設定')+'<br>'+escapeHtml(c.zip||'〒000-0000')+'<br>'+escapeHtml(c.address1||'札幌市○○区○○1条1丁目1-1')+(c.address2?'<br>'+escapeHtml(c.address2):'')+'<br>TEL: '+escapeHtml(c.tel||'000-0000-0000')+'<br>FAX: '+escapeHtml(c.fax||'000-0000-0000')+(c.defaultStaff?'<br>担当: '+escapeHtml(c.defaultStaff):'');}
}
function saveCompanyMaster(){
  if(!confirm('会社情報マスタを保存します。よろしいですか？'))return;
  const c={name:$('#companyName').value||'',zip:$('#companyZip').value||'',address1:$('#companyAddress1').value||'',address2:$('#companyAddress2').value||'',tel:$('#companyTel').value||'',fax:$('#companyFax').value||'',defaultStaff:$('#companyDefaultStaff').value||'',memo:$('#companyMemo').value||''};
  saveCompanyInfo(c);toast('会社情報を保存しました');
}
function clearCompanyMaster(){
  if(!confirm('会社情報マスタの入力内容をクリアします。よろしいですか？'))return;
  ['#companyName','#companyZip','#companyAddress1','#companyAddress2','#companyTel','#companyFax','#companyDefaultStaff','#companyMemo'].forEach(id=>{const el=$(id);if(el)el.value=''});
  toast('会社情報の入力欄をクリアしました');renderCompany();
}
function renderSettings(){const s=settings();$('#googleClientId').value=s.googleClientId||'';$('#spreadsheetId').value=s.spreadsheetId||'';$('#sheetName').value=s.sheetName||'見積台帳';$('#driveFolder').value=s.driveFolder||'QuoteFlow/PDF';$('#taxRate').value=s.taxRate??10;$('#taxRounding').value=s.taxRounding||'round';renderImagePreview('#companyLogoPreview',s.companyLogo,'未設定の場合は会社名テキストを表示');renderImagePreview('#companyStampPreview',s.companyStamp,'未設定の場合は印鑑なし');$('#syncBadge').textContent=s.spreadsheetId?'Sheets設定あり':'ローカル保存'}
function renderAll(){renderDashboard();renderSearch();renderLedger();renderRates();renderCompany();renderOld();renderOldSelect();renderSettings()}
function addLine(data){const div=document.createElement('div');div.className='line-item';const no=($$('#lineItems .line-item').length+1);div.innerHTML='<div class="line-item-fields"><div class="field no"><label>No.</label><input class="li-no" readonly value="'+(data&&data.no?data.no:no)+'"></div><div class="field"><label>物件名・型番</label><input class="li-name" placeholder="例：OA機器一式" value="'+(data&&data.name?data.name:'')+'"></div><div class="field"><label>数量</label><input class="li-qty" type="number" min="0" placeholder="1" value="'+(data&&data.qty?data.qty:1)+'"></div><div class="field unit"><label>単位</label><input class="li-unit" list="unitOptions" placeholder="個・式・台" value="'+(data&&data.unit?data.unit:'個')+'"></div><div class="field price"><label>税抜単価</label><input class="li-price" type="number" min="0" placeholder="1000000" value="'+(data&&data.price?data.price:0)+'"></div><div class="field amount"><label>税抜金額</label><input class="li-sales" readonly value="¥0"></div><div class="field cost"><label>仕入れ単価</label><input class="li-cost" type="number" min="0" placeholder="仕入単価" value="'+(data&&data.cost?data.cost:0)+'"></div></div><div class="delete-wrap"><button class="mini-btn danger" type="button">削除</button></div>';div.querySelectorAll('input').forEach(i=>i.addEventListener('input',calcForm));div.querySelector('button').onclick=()=>{if(!confirm('この明細を削除します。よろしいですか？'))return;div.remove();renumberLines();calcForm()};$('#lineItems').appendChild(div);renumberLines();calcForm()}
function renumberLines(){$$('#lineItems .line-item').forEach((el,i)=>{const n=el.querySelector('.li-no');if(n)n.value=i+1})}
function formItems(){return $$('#lineItems .line-item').map(el=>({no:Number(el.querySelector('.li-no').value)||0,name:el.querySelector('.li-name').value||'明細',qty:Number(el.querySelector('.li-qty').value)||0,unit:(el.querySelector('.li-unit')?el.querySelector('.li-unit').value:'')||'個',price:Number(el.querySelector('.li-price').value)||0,cost:Number(el.querySelector('.li-cost').value)||0}))}
function resetForm(){ $('#estimateNo').value=nextNo(); $('#nextNumberBadge').textContent='次番号 '+nextNo(); $('#estimateDate').value=today(); $('#customerName').value=''; $('#projectName').value=''; $('#customerZip').value=''; $('#customerAddress1').value=''; $('#customerAddress2').value=''; $('#customerPerson').value=''; if($('#staffName'))$('#staffName').value=companyInfo().defaultStaff||''; if($('#estimateNotes'))$('#estimateNotes').value=''; $('#leaseMonths').value='60'; $('#status').value='draft'; renderRateSelect(); const defaultRate=rates().find(r=>r.m==60&&r.active!==false)||rates()[0]; if($('#rateSelect')&&defaultRate)$('#rateSelect').value=defaultRate.id; $('#oldBalanceSelect1').value=''; $('#oldBalanceSelect2').value=''; $('#lineItems').innerHTML=''; addLine({name:'OA機器一式',qty:1,price:0,cost:0}); calcForm() }
function calcForm(){
  $$('#lineItems .line-item').forEach(el=>{const q=Number(el.querySelector('.li-qty').value)||0,p=Number(el.querySelector('.li-price').value)||0;el.querySelector('.li-sales').value=money(q*p)});
  const est={months:$('#leaseMonths').value,rateId:$('#rateSelect')?$('#rateSelect').value:'',items:formItems(),oldIds:[$('#oldBalanceSelect1').value,$('#oldBalanceSelect2').value].filter(Boolean)};
  const net=sum(est);$('#calcTotal').textContent=money(taxIncluded(net));$('#calcMonthly').textContent=money(monthly(est));
  $('#calcSales').textContent=money(sales(est));$('#calcCost').textContent=money(purchaseCost(est));$('#calcProfit').textContent=money(grossProfit(est));$('#calcMargin').textContent=profitMargin(est).toFixed(1)+'%';$('#calcOld').textContent=money(oldAmount(est));$('#calcTax').textContent=money(taxAmount(net));$('#calcTaxRate').textContent=taxRate().toFixed(1).replace(/\.0$/,'')+'%';
}
function saveEstimate(){if(!confirm('この内容で見積を登録します。よろしいですか？'))return;const no=$('#estimateNo').value;const rows=estimates();if(rows.some(r=>r.no===no)){toast('見積番号が重複しています。次番号を再発行します。');$('#estimateNo').value=nextNo();return}const est={no,date:$('#estimateDate').value||today(),customer:$('#customerName').value||'未入力',customerZip:$('#customerZip').value||'',customerAddress1:$('#customerAddress1').value||'',customerAddress2:$('#customerAddress2').value||'',customerPerson:$('#customerPerson').value||'',staffName:($('#staffName')?$('#staffName').value:''),project:$('#projectName').value||'未入力',notes:($('#estimateNotes')?$('#estimateNotes').value:''),months:Number($('#leaseMonths').value),status:$('#status').value,rateId:$('#rateSelect')?$('#rateSelect').value:'',oldIds:[$('#oldBalanceSelect1').value,$('#oldBalanceSelect2').value].filter(Boolean),items:formItems(),createdAt:nowText()};rows.push(est);saveEstimates(rows);toast('保存しました：'+est.no);goto('dashboard')}
function editOrCopy(no,copy){const r=estimates().find(x=>x.no===no);if(!r)return;goto('create');$('#estimateNo').value=copy?nextNo():r.no;$('#estimateDate').value=today();$('#customerName').value=r.customer;$('#customerZip').value=r.customerZip||'';$('#customerAddress1').value=r.customerAddress1||'';$('#customerAddress2').value=r.customerAddress2||'';$('#customerPerson').value=r.customerPerson||''; if($('#staffName'))$('#staffName').value=r.staffName||companyInfo().defaultStaff||'';$('#projectName').value=r.project;if($('#estimateNotes'))$('#estimateNotes').value=r.notes||'';$('#leaseMonths').value=r.months;$('#status').value=copy?'draft':r.status;renderRateSelect(); if($('#rateSelect')&&r.rateId)$('#rateSelect').value=r.rateId;const ids=oldIds(r);$('#oldBalanceSelect1').value=ids[0]||'';$('#oldBalanceSelect2').value=ids[1]||'';$('#lineItems').innerHTML='';(r.items||[]).forEach(addLine);calcForm();if(!copy)toast('編集時は別番号保存を避けるため、必要に応じて複製してください。')}

function clearInlineOldForm(slot,skipConfirm){if(!skipConfirm&&!confirm('旧物件・残債 '+slot+' の入力内容をクリアします。よろしいですか？'))return;['Name','Company','Contract','Note'].forEach(k=>$('#inlineOld'+k+slot).value='');$('#inlineOldRemaining'+slot).value=12;$('#inlineOldMonthly'+slot).value=0;$('#inlineOldBalance'+slot).value=0;$('#inlineOldSettlement'+slot).value=0;$('#inlineOldApply'+slot).value='include';$('#inlineOldApplyAmount'+slot).value=0}
function updateInlineOldApply(slot){ $('#inlineOldApplyAmount'+slot).value=(Number($('#inlineOldBalance'+slot).value)||0)+(Number($('#inlineOldSettlement'+slot).value)||0) }
function calcInlineOldBalance(slot){
  const monthly=Number($('#inlineOldMonthly'+slot).value)||0;
  const remaining=Number($('#inlineOldRemaining'+slot).value)||0;
  $('#inlineOldBalance'+slot).value=monthly*remaining;
  updateInlineOldApply(slot);
}
function updateOldApply(){ $('#oldApplyAmount').value=(Number($('#oldBalance').value)||0)+(Number($('#oldSettlement').value)||0) }
function calcOldBalance(){
  const monthly=Number($('#oldMonthly').value)||0;
  const remaining=Number($('#oldRemaining').value)||0;
  $('#oldBalance').value=monthly*remaining;
  updateOldApply();
}
function saveInlineOld(slot){if(!confirm('旧物件・残債 '+slot+' を登録して見積へ反映します。よろしいですか？'))return;const rows=oldRows();const balance=Number($('#inlineOldBalance'+slot).value)||0;const settlement=Number($('#inlineOldSettlement'+slot).value)||0;const applyAmount=Number($('#inlineOldApplyAmount'+slot).value)||balance+settlement;const row={id:'old-'+Date.now()+'-'+slot,name:$('#inlineOldName'+slot).value||('旧物件 '+slot),company:$('#inlineOldCompany'+slot).value||'',contract:$('#inlineOldContract'+slot).value||'',remaining:Number($('#inlineOldRemaining'+slot).value)||0,monthly:Number($('#inlineOldMonthly'+slot).value)||0,balance,settlement,apply:$('#inlineOldApply'+slot).value,applyAmount,note:$('#inlineOldNote'+slot).value||''};rows.push(row);saveOldRows(rows);renderOldSelect();$('#oldBalanceSelect'+slot).value=row.id;clearInlineOldForm(slot,true);calcForm();toast('旧物件・残債 '+slot+' を保存して見積へ反映しました')}
function clearOldForm(skipConfirm){if(!skipConfirm&&!confirm('旧物件・残債の入力内容をクリアします。よろしいですか？'))return;['oldName','oldCompany','oldContract','oldNote'].forEach(id=>$('#'+id).value='');$('#oldRemaining').value=12;$('#oldMonthly').value=0;$('#oldBalance').value=0;$('#oldSettlement').value=0;$('#oldApply').value='include';$('#oldApplyAmount').value=0}
function saveOld(){if(!confirm('旧物件・残債を登録します。よろしいですか？'))return;const rows=oldRows();const balance=Number($('#oldBalance').value)||0;const settlement=Number($('#oldSettlement').value)||0;const applyAmount=Number($('#oldApplyAmount').value)||balance+settlement;rows.push({id:'old-'+Date.now(),name:$('#oldName').value||'旧物件',company:$('#oldCompany').value||'',contract:$('#oldContract').value||'',remaining:Number($('#oldRemaining').value)||0,monthly:Number($('#oldMonthly').value)||0,balance,settlement,apply:$('#oldApply').value,applyAmount,note:$('#oldNote').value||''});saveOldRows(rows);clearOldForm(true);toast('旧物件・残債を保存しました')}
function deleteOld(id){if(!confirm('旧物件・残債を削除します。よろしいですか？'))return;saveOldRows(oldRows().filter(r=>r.id!==id));toast('削除しました')}

function escapeHtml(s){return String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function num(v){return Math.round(Number(v)||0).toLocaleString('ja-JP')}
function formatDateSlash(s){if(!s)return'';return String(s).replaceAll('-','/')}
function addDays(dateStr,days){const d=new Date(dateStr);if(Number.isNaN(d.getTime()))return'';d.setDate(d.getDate()+days);return d.toISOString().slice(0,10)}

function printPreview(){
  const est={
    no:$('#estimateNo').value,
    date:$('#estimateDate').value||today(),
    customer:$('#customerName').value||'未入力',
    customerZip:$('#customerZip').value||'',
    customerAddress1:$('#customerAddress1').value||'',
    customerAddress2:$('#customerAddress2').value||'',
    customerPerson:$('#customerPerson').value||'',
    staffName:($('#staffName')?$('#staffName').value:''),
    project:$('#projectName').value||'未入力',
    notes:($('#estimateNotes')?$('#estimateNotes').value:''),
    months:$('#leaseMonths').value,
    status:$('#status').value,
    rateId:$('#rateSelect')?$('#rateSelect').value:'',
    oldIds:[$('#oldBalanceSelect1').value,$('#oldBalanceSelect2').value].filter(Boolean),
    items:formItems()
  };
  const base=sum(est);
  const tax=taxAmount(base);
  const total=taxIncluded(base);
  const oldLines=oldIds(est).map(id=>oldRows().find(x=>x.id===id)).filter(Boolean).map(old=>({name:'旧物件・残債精算：'+old.name,price:old.applyAmount,qty:1,unit:'式',amount:old.applyAmount}));
  const lines=est.items.map(i=>({name:i.name,price:i.price,qty:i.qty,unit:i.unit||'個',amount:i.qty*i.price})).concat(oldLines);
  const rows=lines.map(i=>'<tr><td class="item">'+escapeHtml(i.name)+'</td><td>¥'+num(i.price)+'</td><td>'+num(i.qty)+'</td><td class="unit">'+escapeHtml(i.unit||'')+'</td><td>¥'+num(i.amount)+'</td></tr>').join('');
  const validDate = est.date ? addDays(est.date, 30) : '';
  const notes = est.notes || '';
  const s=settings();
  const customerAddress=[est.customerZip,est.customerAddress1,est.customerAddress2,est.customerPerson||'ご担当者様'].filter(Boolean).map(escapeHtml).join('\n');
  const cinfo=companyInfo();
  const companyLogo = s.companyLogo ? '<img class="print-company-logo-img" src="'+s.companyLogo+'" alt="会社ロゴ">' : '<div class="print-company-logo-text">'+escapeHtml(cinfo.name||'会社名未設定')+'</div>'; 
  const companyStamp = s.companyStamp ? '<img class="print-stamp-img" src="'+s.companyStamp+'" alt="会社印鑑">' : '';
  const companyLines=[cinfo.name||'会社名未設定',cinfo.zip||'〒000-0000',cinfo.address1||'札幌市○○区○○1条1丁目1-1',cinfo.address2||'',cinfo.tel?'TEL: '+cinfo.tel:'TEL: 000-0000-0000',cinfo.fax?'FAX: '+cinfo.fax:'FAX: 000-0000-0000',est.staffName?'担当: '+est.staffName:(cinfo.defaultStaff?'担当: '+cinfo.defaultStaff:'')].filter(Boolean).map(escapeHtml).join('<br>');
  $('#printDoc').innerHTML='<div class="qdoc">'
    +'<h2 class="qdoc-title">見積書</h2>'
    +'<div class="qdoc-top"><div class="qdoc-left"><div class="qdoc-customer">'+escapeHtml(est.customer)+' 御中</div>'+customerAddress+'</div>'
    +'<div class="qdoc-right">'+companyLogo+'<div>'+companyLines+'</div>'+companyStamp+'<div class="qdoc-meta">見積書番号：'+escapeHtml(est.no.replace(/^Q-\d{4}-/,''))+'<br>発行日： '+formatDateSlash(est.date)+'<br>有効期限： '+formatDateSlash(validDate)+'</div></div></div>'
    +'<div class="qdoc-subject">件名： '+escapeHtml(est.project)+'</div>'
    +'<div class="qdoc-amount">御見積金額 <span>'+num(total)+' 円</span></div><div class="qdoc-rule"></div>'
    +'<table class="qdoc-table"><thead><tr><th class="item">品目</th><th>単価</th><th>数量</th><th>単位</th><th>合計</th></tr></thead><tbody>'+rows+'</tbody></table>'
    +'<div class="qdoc-totals"><div class="qdoc-totals-row"><div>小計</div><div>'+num(base)+' 円</div></div><div class="qdoc-totals-row"><div>消費税</div><div>'+num(tax)+' 円</div></div><div class="qdoc-totals-row"><div>合計</div><div>'+num(total)+' 円</div></div><div class="qdoc-breakdown"><div>内訳　　'+taxRate().toFixed(0)+'%対象</div><div>'+num(base)+' 円</div></div><div class="qdoc-tax-small">消費税 '+num(tax)+' 円</div></div>'
    +'<div class="qdoc-notes-title">備考</div><div class="qdoc-notes">'+escapeHtml(notes)+'</div><div class="qdoc-footer">1 / 1</div></div>';
  goto('print')
}


function readImageFile(input, key, previewId, placeholder){
  const file=input.files && input.files[0];
  if(!file)return;
  if(!file.type.startsWith('image/')){toast('画像ファイルを選択してください'); input.value=''; return;}
  const reader=new FileReader();
  reader.onload=()=>{const s=settings();s[key]=reader.result;localStorage.setItem(SETTINGS_KEY,JSON.stringify(s));renderImagePreview(previewId,reader.result,placeholder);toast((key==='companyLogo'?'会社ロゴ':'会社印鑑')+'を設定しました');};
  reader.readAsDataURL(file);
}

function bindEvents(){
  document.addEventListener('click',e=>{
    const b=e.target.closest('button');
    if(!b)return;
    if(b.dataset.page){
      const page=b.dataset.page;
      if(page==='create' && !confirm('新規作成画面を開きます。入力中の内容は初期化されます。よろしいですか？')) return;
      goto(page);
      return;
    }
    if(b.dataset.goto){goto(b.dataset.goto);return;}
    if(b.dataset.edit){editOrCopy(b.dataset.edit,false);return;}
    if(b.dataset.copy){editOrCopy(b.dataset.copy,true);return;}
    if(b.dataset.deleteOld){deleteOld(b.dataset.deleteOld);return;}
    if(b.dataset.editRate){editRate(b.dataset.editRate);return;}
    if(b.dataset.deleteRate){deleteRate(b.dataset.deleteRate);return;}
  });
  const addLineBtn=$('#addLine'); if(addLineBtn)addLineBtn.onclick=()=>addLine({name:'',qty:1,unit:'個',price:0,cost:0});
  const saveEstimateBtn=$('#saveEstimate'); if(saveEstimateBtn)saveEstimateBtn.onclick=saveEstimate;
  const showPrintBtn=$('#showPrint'); if(showPrintBtn)showPrintBtn.onclick=printPreview;
  const saveInlineOld1=$('#saveInlineOld1'); if(saveInlineOld1)saveInlineOld1.onclick=()=>saveInlineOld(1);
  const clearInlineOld1=$('#clearInlineOld1'); if(clearInlineOld1)clearInlineOld1.onclick=()=>clearInlineOldForm(1);
  const saveInlineOld2=$('#saveInlineOld2'); if(saveInlineOld2)saveInlineOld2.onclick=()=>saveInlineOld(2);
  const clearInlineOld2=$('#clearInlineOld2'); if(clearInlineOld2)clearInlineOld2.onclick=()=>clearInlineOldForm(2);
  const saveOldBtn=$('#saveOld'); if(saveOldBtn)saveOldBtn.onclick=saveOld;
  const clearOldBtn=$('#clearOld'); if(clearOldBtn)clearOldBtn.onclick=()=>clearOldForm(false);
  const saveRateBtn=$('#saveRate'); if(saveRateBtn)saveRateBtn.onclick=saveRate;
  const clearRateBtn=$('#clearRate'); if(clearRateBtn)clearRateBtn.onclick=()=>{if(confirm('料率マスタの入力内容をクリアします。よろしいですか？'))clearRateForm()};
  const saveSettingsBtn=$('#saveSettings'); if(saveSettingsBtn)saveSettingsBtn.onclick=()=>{if(!confirm('設定を保存します。よろしいですか？'))return;localStorage.setItem(SETTINGS_KEY,JSON.stringify({googleClientId:$('#googleClientId').value,spreadsheetId:$('#spreadsheetId').value,sheetName:$('#sheetName').value,driveFolder:$('#driveFolder').value,taxRate:Number($('#taxRate').value)||10,taxRounding:$('#taxRounding').value,companyLogo:(settings().companyLogo||''),companyStamp:(settings().companyStamp||'')}));toast('設定を保存しました');calcForm();renderAll()};
  const testSettingsBtn=$('#testSettings'); if(testSettingsBtn)testSettingsBtn.onclick=()=>toast($('#spreadsheetId').value?'設定値を確認しました':'Spreadsheet IDが未入力です');
  const logoFile=$('#companyLogoFile'); if(logoFile)logoFile.addEventListener('change',()=>readImageFile(logoFile,'companyLogo','#companyLogoPreview','未設定の場合は会社名テキストを表示'));
  const stampFile=$('#companyStampFile'); if(stampFile)stampFile.addEventListener('change',()=>readImageFile(stampFile,'companyStamp','#companyStampPreview','未設定の場合は印鑑なし'));
  const searchKeyword=$('#searchKeyword'); if(searchKeyword)searchKeyword.addEventListener('input',renderSearch);
  const searchStatus=$('#searchStatus'); if(searchStatus)searchStatus.addEventListener('change',renderSearch);
  ['#leaseMonths','#rateSelect','#oldBalanceSelect1','#oldBalanceSelect2'].forEach(sel=>{const el=$(sel);if(el)el.addEventListener('change',calcForm)});
  ['#oldMonthly','#oldRemaining'].forEach(sel=>{const el=$(sel);if(el)el.addEventListener('input',calcOldBalance)});
  ['#oldBalance','#oldSettlement'].forEach(sel=>{const el=$(sel);if(el)el.addEventListener('input',updateOldApply)});
  [1,2].forEach(slot=>{
    ['Monthly','Remaining'].forEach(k=>{const el=$('#inlineOld'+k+slot);if(el)el.addEventListener('input',()=>calcInlineOldBalance(slot))});
    ['Balance','Settlement'].forEach(k=>{const el=$('#inlineOld'+k+slot);if(el)el.addEventListener('input',()=>updateInlineOldApply(slot))});
  });
}
function initStorage(){
  if(!localStorage.getItem(STORE_KEY))localStorage.setItem(STORE_KEY,JSON.stringify(sampleEstimates));
  if(!localStorage.getItem(OLD_KEY))localStorage.setItem(OLD_KEY,JSON.stringify(sampleOld));
  if(!localStorage.getItem(RATE_KEY))localStorage.setItem(RATE_KEY,JSON.stringify(sampleRates));
}
const saveCompanyBtn=$('#saveCompany'); if(saveCompanyBtn)saveCompanyBtn.onclick=saveCompanyMaster;
  const clearCompanyBtn=$('#clearCompany'); if(clearCompanyBtn)clearCompanyBtn.onclick=clearCompanyMaster;
  window.addEventListener('error',ev=>{console.error(ev.error);toast('エラーを検出しました。画面は継続表示しています。')});
initStorage();
bindEvents();
renderAll();
resetForm();
goto('dashboard');

})();
</script>
</body>
</html>
