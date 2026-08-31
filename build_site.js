const fs = require("fs");
const path = require("path");
const OUT = __dirname;

/* ---------------- shared assets ---------------- */
const NAV = [
  { href: "index.html", label: "หน้าแรก", key: "home" },
  { href: "about.html", label: "เกี่ยวกับคณะฯ", key: "about" },
  { href: "scope.html", label: "กรอบการพิจารณาศึกษา", key: "scope" },
  { href: "plan.html", label: "แผนการพิจารณาศึกษา", key: "plan" },
  { href: "results.html", label: "ผลการพิจารณาศึกษา", key: "results" },
  { href: "contact.html", label: "ติดต่อ", key: "contact" },
];

const BRAND_MARK = `<svg class="brand__mark" viewBox="0 0 48 48" fill="none" aria-hidden="true" role="img">
  <rect x="2" y="2" width="44" height="44" rx="12" fill="#16233F"/>
  <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#bg)" fill-opacity="0.35"/>
  <path d="M24 15c-2.4-1.5-5.2-2.1-8-1.8v14.9c2.8-.3 5.6.3 8 1.8 2.4-1.5 5.2-2.1 8-1.8V13.2c-2.8-.3-5.6.3-8 1.8Z" stroke="#C9A867" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M24 15v14.9" stroke="#C9A867" stroke-width="1.8"/>
  <circle cx="16" cy="35" r="1.7" fill="#C9A867"/><circle cx="21.3" cy="35" r="1.7" fill="#C9A867"/>
  <circle cx="26.6" cy="35" r="1.7" fill="#C9A867"/><circle cx="32" cy="35" r="1.7" fill="#C9A867"/>
  <defs><linearGradient id="bg" x1="4" y1="4" x2="44" y2="44"><stop stop-color="#35589E"/><stop offset="1" stop-color="#16233F"/></linearGradient></defs>
</svg>`;

const FAVICON = "data:image/svg+xml," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#16233F"/><path d="M24 15c-2.4-1.5-5.2-2.1-8-1.8v14.9c2.8-.3 5.6.3 8 1.8 2.4-1.5 5.2-2.1 8-1.8V13.2c-2.8-.3-5.6.3-8 1.8Z" stroke="#C9A867" stroke-width="1.8" stroke-linejoin="round" fill="none"/><path d="M24 15v14.9" stroke="#C9A867" stroke-width="1.8"/><circle cx="16" cy="35" r="1.7" fill="#C9A867"/><circle cx="21.3" cy="35" r="1.7" fill="#C9A867"/><circle cx="26.6" cy="35" r="1.7" fill="#C9A867"/><circle cx="32" cy="35" r="1.7" fill="#C9A867"/></svg>`
);

const ic = {
  a: `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M4 20 L10 6 L16 20 M6 15 H14"/></svg>`,
  contrast: `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor" stroke="none"/></svg>`,
  menu: `<svg class="ic-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg><svg class="ic-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
  arrowUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>`,
  arrowRight: `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  download: `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 6c-2-1.3-4.4-1.8-7-1.5v13c2.6-.3 5 .2 7 1.5 2-1.3 4.4-1.8 7-1.5v-13c-2.6-.3-5 .2-7 1.5Z"/><path d="M12 6v13"/></svg>`,
  school: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M3 10 12 5l9 5-9 5-9-5Z"/><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"/><path d="M21 10v5"/></svg>`,
  access: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="4.5" r="2"/><path d="M5 8.5h14M12 8v5m0 0-3.5 6.5M12 13l3.5 6.5"/></svg>`,
  balance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 3v18M6 21h12M4 8l4-3 4 3M4 8l-2 4a3 3 0 0 0 6 0L6 8M12 8l4-3 4 3m0 0-2 4a3 3 0 0 0 6 0l-2-4M8 5l8-1.4"/></svg>`,
  scales: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 3v18M7 21h10M5 6l14-2"/><path d="M5 6 2 12a3 3 0 0 0 6 0L5 6ZM19 4l-3 6a3 3 0 0 0 6 0l-3-6Z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 5c0 8.3 6.7 15 15 15l0-3.5-4-1-2 2c-2.5-1.3-4.7-3.5-6-6l2-2-1-4L4 5Z"/></svg>`,
  info: `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.5"/></svg>`,
  gavel: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m14 6-6 6M9 4l6 6-2 2-6-6 2-2ZM4 20h9M13 11l4 4"/></svg>`,
  comment: `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z"/><path d="M8.5 11h7M8.5 14h4"/></svg>`,
  external: `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>`,
  clipboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 4v1H9V4Z"/><path d="M9 10h6M9 13.5h6M9 17h4"/></svg>`,
};

/* เว็บไซต์รับฟังความคิดเห็นและข้อเสนอแนะของคณะอนุกรรมาธิการฯ */
const OPINION = "https://opinion.thamdee.com";

function opinionBand() {
  return `<section class="section on-paper">
  <div class="container">
    <div class="cta-band cta-band--gold reveal">
      <p class="eyebrow" style="justify-content:center;color:var(--gold-soft)">ร่วมแสดงความคิดเห็น</p>
      <h2>เปิดรับฟังความคิดเห็นและข้อเสนอแนะจากทุกภาคส่วน</h2>
      <p>ผู้เกี่ยวข้องและประชาชนผู้สนใจสามารถร่วมเสนอความคิดเห็นต่อการพิจารณาศึกษาของคณะอนุกรรมาธิการฯ ได้ที่เว็บไซต์รับฟังความคิดเห็น</p>
      <div class="hero__cta">
        <a class="btn btn--gold" href="${OPINION}" target="_blank" rel="noopener">ร่วมแสดงความคิดเห็น ${ic.external}</a>
      </div>
      <p class="cta-band__url">${OPINION.replace("https://","")}</p>
    </div>
  </div>
</section>`;
}

function head(title, desc, extra = "") {
  return `<!DOCTYPE html>
<html lang="th" data-textsize="normal">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#16233F">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:locale" content="th_TH">
<link rel="icon" href="${FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@400;500;600;700&family=Sarabun:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
${extra}
</head>
<body>
<a class="skip-link" href="#main">ข้ามไปยังเนื้อหาหลัก</a>`;
}

function topbar() {
  return `<div class="topbar">
  <div class="container topbar__row">
    <span class="topbar__org"><span class="dot"></span>คณะกรรมาธิการการศึกษา การอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม วุฒิสภา</span>
    <span class="topbar__meta">
      <a class="topbar__opinion" href="${OPINION}" target="_blank" rel="noopener">ร่วมแสดงความคิดเห็น</a>
      <a href="contact.html">ติดต่อฝ่ายเลขานุการ</a>
    </span>
  </div>
</div>`;
}

function a11yToolbar(mobile = false) {
  const cls = mobile ? "a11y a11y-mobile" : "a11y";
  return `<div class="${cls}" role="group" aria-label="ปรับการแสดงผลเพื่อการเข้าถึง">
    <button class="a11y__btn a11y__btn--a1" type="button" data-a11y-size="normal" aria-pressed="true" title="ขนาดตัวอักษรปกติ" aria-label="ขนาดตัวอักษรปกติ">ก</button>
    <button class="a11y__btn a11y__btn--a2" type="button" data-a11y-size="large" aria-pressed="false" title="ขยายตัวอักษร" aria-label="ขยายตัวอักษร">ก</button>
    <button class="a11y__btn a11y__btn--a3" type="button" data-a11y-size="xlarge" aria-pressed="false" title="ขยายตัวอักษรมาก" aria-label="ขยายตัวอักษรมาก">ก</button>
    <button class="a11y__btn" type="button" data-a11y-contrast aria-pressed="false" title="สลับโหมดความเปรียบต่างสูง" aria-label="สลับโหมดความเปรียบต่างสูง">${ic.contrast}</button>
  </div>`;
}

function header(active) {
  const links = NAV.map(n =>
    `<li><a href="${n.href}"${n.key === active ? ' aria-current="page"' : ""}>${n.label}</a></li>`
  ).join("\n        ");
  return `${topbar()}
<header class="site-header">
  <div class="container nav">
    <a class="brand" href="index.html" aria-label="กลับสู่หน้าแรก คณะอนุกรรมาธิการการส่งเสริมการเรียนรู้ฯ">
      ${BRAND_MARK}
      <span class="brand__text">
        <b>คณะอนุกรรมาธิการการส่งเสริมการเรียนรู้ฯ</b>
        <span>การศึกษาเอกชน · การศึกษาพิเศษ · ความเท่าเทียมทางการศึกษา · วุฒิสภา</span>
      </span>
    </a>
    <nav aria-label="เมนูหลัก">
      <ul class="nav__links" id="primary-nav">
        ${links}
        <li class="a11y-mobile-wrap">${a11yToolbar(true)}</li>
      </ul>
    </nav>
    <div class="nav__tools">
      ${a11yToolbar(false)}
      <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="เปิดเมนู">${ic.menu}</button>
    </div>
  </div>
</header>
<div class="nav-scrim" aria-hidden="true"></div>`;
}

function footer() {
  return `<footer class="footer">
  <div class="container">
    <div class="footer__top">
      <div class="footer__brand">
        <span class="eyebrow">วุฒิสภา</span>
        <b>คณะอนุกรรมาธิการการส่งเสริมการเรียนรู้ การศึกษาเอกชน การศึกษาพิเศษ และความเท่าเทียมทางการศึกษา</b>
        <p>ในคณะกรรมาธิการการศึกษา การอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม วุฒิสภา จัดทำโดยฝ่ายเลขานุการคณะอนุกรรมาธิการฯ</p>
      </div>
      <div>
        <h4>เมนู</h4>
        <ul>
          <li><a href="about.html">เกี่ยวกับคณะฯ</a></li>
          <li><a href="scope.html">กรอบการพิจารณาศึกษา</a></li>
          <li><a href="plan.html">แผนการพิจารณาศึกษา</a></li>
          <li><a href="results.html">ผลการพิจารณาศึกษา</a></li>
        </ul>
      </div>
      <div>
        <h4>มีส่วนร่วมและติดต่อ</h4>
        <ul>
          <li><a href="${OPINION}" target="_blank" rel="noopener">ร่วมแสดงความคิดเห็น (opinion.thamdee.com)</a></li>
          <li><a href="contact.html">แบบฟอร์มติดต่อฝ่ายเลขานุการ</a></li>
          <li>สำนักกรรมาธิการ สำนักงานเลขาธิการวุฒิสภา</li>
          <li><a href="https://www.senate.go.th" target="_blank" rel="noopener">เว็บไซต์วุฒิสภา</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© พุทธศักราช <span data-year>๒๕๖๘</span> คณะอนุกรรมาธิการการส่งเสริมการเรียนรู้ฯ วุฒิสภา</span>
      <span>เว็บไซต์นี้ออกแบบให้เข้าถึงได้ตามหลักการ WCAG — ปรับขนาดตัวอักษรและความเปรียบต่างได้จากแถบเครื่องมือด้านบน</span>
    </div>
  </div>
</footer>`;
}

function tail() {
  return `<button class="to-top" type="button" aria-label="กลับขึ้นด้านบน">${ic.arrowUp}</button>
<script src="assets/js/main.js" defer></script>
</body>
</html>`;
}

/* motif svg for hero background */
const HERO_MOTIF = `<svg class="hero__grid-motif" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs><pattern id="dots" width="42" height="42" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#4c6bb0" fill-opacity="0.35"/></pattern></defs>
  <rect width="1200" height="500" fill="url(#dots)"/>
  <g fill="none" stroke="#5a79c0" stroke-opacity="0.18" stroke-width="1.5">
    <rect x="740" y="-60" width="360" height="360" rx="60"/>
    <rect x="800" y="0" width="360" height="360" rx="60"/>
    <rect x="860" y="60" width="360" height="360" rx="60"/>
  </g>
</svg>`;

const PAGE_MOTIF = `<svg class="page-hero__motif" viewBox="0 0 200 200" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-width="2"><rect x="20" y="20" width="120" height="120" rx="28"/><rect x="50" y="50" width="120" height="120" rx="28"/></g></svg>`;

/* ---------------- page bodies ---------------- */

function pageHero(crumbLabel, title, lead) {
  return `<section class="page-hero">
  ${PAGE_MOTIF}
  <div class="container">
    <ul class="crumbs"><li><a href="index.html">หน้าแรก</a></li><li>${crumbLabel}</li></ul>
    <h1>${title}</h1>
    <p>${lead}</p>
  </div>
</section>`;
}

/* ---- HOME ---- */
const home = `
<section class="hero">
  ${HERO_MOTIF}
  <div class="container hero__inner">
    <p class="eyebrow reveal">คณะอนุกรรมาธิการ · วุฒิสภา</p>
    <h1 class="reveal" data-delay="1">การเรียนรู้ที่ทั่วถึง<br>และ<span class="accent">เท่าเทียม</span>สำหรับทุกคน</h1>
    <p class="hero__lead reveal" data-delay="2">คณะอนุกรรมาธิการพิจารณาศึกษากฎหมาย นโยบาย และการบริหารราชการแผ่นดินใน ๔ ด้าน เพื่อให้ประชาชนทุกกลุ่มเข้าถึงการศึกษาและการเรียนรู้อย่างมีคุณภาพ เป็นธรรม และไม่เลือกปฏิบัติ</p>
    <div class="hero__cta reveal" data-delay="3">
      <a class="btn btn--on-dark" href="scope.html">ดูกรอบการพิจารณาศึกษา ${ic.arrowRight}</a>
      <a class="btn btn--ghost-dark" href="plan.html">ดูแผนการพิจารณาศึกษา ${ic.arrowRight}</a>
    </div>

    <div class="spine reveal" data-delay="3" role="list" aria-label="สี่ด้านภารกิจของคณะอนุกรรมาธิการ">
      <div class="spine__node" role="listitem"><span class="spine__k">ด้าน ๑</span><span class="spine__t">การส่งเสริมการเรียนรู้</span><span class="spine__d">การเรียนรู้ตลอดชีวิตและนอกระบบ</span></div>
      <div class="spine__node" role="listitem"><span class="spine__k">ด้าน ๒</span><span class="spine__t">การศึกษาเอกชน</span><span class="spine__d">กำกับดูแลและส่งเสริม</span></div>
      <div class="spine__node" role="listitem"><span class="spine__k">ด้าน ๓</span><span class="spine__t">การศึกษาพิเศษ</span><span class="spine__d">คนพิการและผู้มีความต้องการจำเป็นพิเศษ</span></div>
      <div class="spine__node" role="listitem"><span class="spine__k">ด้าน ๔</span><span class="spine__t">ความเท่าเทียมทางการศึกษา</span><span class="spine__d">ลดความเหลื่อมล้ำ</span></div>
    </div>
  </div>
</section>

<main id="main">
<section class="section on-paper">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">บทบาทของคณะฯ</p>
      <h2>พิจารณาศึกษาเพื่อประโยชน์สาธารณะและสิทธิของกลุ่มเปราะบาง</h2>
      <p>งานทั้งสี่ด้านมีรากฐานร่วมกันในรัฐธรรมนูญ มาตรา ๒๗ ว่าด้วยความเสมอภาค และมาตรา ๕๔ ว่าด้วยหน้าที่ของรัฐด้านการศึกษา โดยเชื่อมโยงกับยุทธศาสตร์ชาติและแผนการศึกษาแห่งชาติ</p>
    </div>
    <div class="metrics">
      <div class="metric reveal"><b>๔</b><span>ด้านภารกิจตามคำสั่งแต่งตั้ง</span></div>
      <div class="metric reveal" data-delay="1"><b>๙+</b><span>กฎหมายหลักที่อยู่ในขอบเขต</span></div>
      <div class="metric reveal" data-delay="2"><b>๖</b><span>หน้าที่และอำนาจ</span></div>
      <div class="metric reveal" data-delay="3"><b>๒๕๖๐</b><span>ฐานรัฐธรรมนูญ มาตรา ๒๗ และ ๕๔</span></div>
    </div>
  </div>
</section>

<section class="section on-white">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">สี่ด้านภารกิจ</p>
      <h2>ขอบเขตเนื้อหาที่คณะฯ พิจารณาศึกษา</h2>
    </div>
    <div class="pillars">
      <a class="pillar pillar--link reveal" href="scope.html#learning">
        <div class="pillar__icon">${ic.book}</div>
        <div class="pillar__no">ด้าน ๑</div>
        <h3>การส่งเสริมการเรียนรู้</h3>
        <p>การเรียนรู้ตลอดชีวิต การเรียนรู้เพื่อพัฒนาตนเอง และการเรียนรู้เพื่อคุณวุฒิตามระดับ พร้อมระบบเทียบโอนและสะสมหน่วยการเรียนรู้</p>
        <p class="pillar__law"><strong>ฐานกฎหมาย:</strong> พ.ร.บ.ส่งเสริมการเรียนรู้ พ.ศ. ๒๕๖๖</p>
        <span class="pillar__more">ดูขอบเขตด้านนี้ ${ic.arrowRight}</span>
      </a>
      <a class="pillar pillar--link reveal" data-delay="1" href="scope.html#private">
        <div class="pillar__icon">${ic.school}</div>
        <div class="pillar__no">ด้าน ๒</div>
        <h3>การศึกษาเอกชน</h3>
        <p>การกำกับดูแลและส่งเสริมโรงเรียนเอกชนในระบบและนอกระบบ การอุดหนุน สิทธิประโยชน์ และการคุ้มครองครูและบุคลากร</p>
        <p class="pillar__law"><strong>ฐานกฎหมาย:</strong> พ.ร.บ.โรงเรียนเอกชน ๒๕๕๐/๒๕๕๔</p>
        <span class="pillar__more">ดูขอบเขตด้านนี้ ${ic.arrowRight}</span>
      </a>
      <a class="pillar pillar--link reveal" data-delay="2" href="scope.html#special">
        <div class="pillar__icon">${ic.access}</div>
        <div class="pillar__no">ด้าน ๓</div>
        <h3>การศึกษาพิเศษ</h3>
        <p>สิทธิทางการศึกษาของคนพิการ แผนการจัดการศึกษาเฉพาะบุคคล การเรียนรวม และเทคโนโลยีสิ่งอำนวยความสะดวก</p>
        <p class="pillar__law"><strong>ฐานกฎหมาย:</strong> พ.ร.บ.การจัดการศึกษาสำหรับคนพิการ ๒๕๕๑/๒๕๕๖</p>
        <span class="pillar__more">ดูขอบเขตด้านนี้ ${ic.arrowRight}</span>
      </a>
      <a class="pillar pillar--link reveal" data-delay="3" href="scope.html#equity">
        <div class="pillar__icon">${ic.scales}</div>
        <div class="pillar__no">ด้าน ๔</div>
        <h3>ความเท่าเทียมทางการศึกษา</h3>
        <p>การลดความเหลื่อมล้ำ การช่วยเหลือผู้ขาดแคลนทุนทรัพย์และผู้ด้อยโอกาส และการพัฒนาคุณภาพครู</p>
        <p class="pillar__law"><strong>ฐานกฎหมาย:</strong> พ.ร.บ.กองทุนเพื่อความเสมอภาคทางการศึกษา ๒๕๖๑</p>
        <span class="pillar__more">ดูขอบเขตด้านนี้ ${ic.arrowRight}</span>
      </a>
    </div>
    <p style="margin-top:var(--sp-4)"><a class="btn btn--ghost" href="scope.html">อ่านกรอบการพิจารณาศึกษาฉบับเต็ม ${ic.arrowRight}</a></p>
  </div>
</section>

<section class="section on-paper">
  <div class="container">
    <div class="cta-band reveal">
      <p class="eyebrow" style="justify-content:center;color:var(--gold-soft)">เนื้อหาประกอบการพิจารณา</p>
      <h2>กรอบและแผนการพิจารณาศึกษาของคณะอนุกรรมาธิการฯ</h2>
      <p>ประมวลกรอบสี่ด้าน เชื่อมโยงกับรัฐธรรมนูญ ยุทธศาสตร์ชาติ แผนพัฒนาฯ และแผนการศึกษาแห่งชาติ พร้อมแผนการพิจารณาศึกษารายด้าน อ่านได้บนเว็บไซต์</p>
      <div class="hero__cta">
        <a class="btn btn--on-dark" href="scope.html">อ่านกรอบการพิจารณาศึกษา ${ic.arrowRight}</a>
        <a class="btn btn--ghost-dark" href="plan.html">ดูแผนการพิจารณาศึกษา ${ic.arrowRight}</a>
      </div>
    </div>
  </div>
</section>

${opinionBand()}
</main>`;

/* ---- ABOUT ---- */
const about = `
<main id="main">
${pageHero("เกี่ยวกับคณะฯ", "เกี่ยวกับคณะอนุกรรมาธิการ", "ที่มา บทบาท หน้าที่และอำนาจ ตลอดจนขอบเขตการทำงานของคณะอนุกรรมาธิการฯ ตามคำสั่งแต่งตั้ง")}

<section class="section on-paper">
  <div class="container narrow">
    <div class="section-head reveal">
      <p class="eyebrow">ที่มา</p>
      <h2>คณะอนุกรรมาธิการภายใต้วุฒิสภา</h2>
    </div>
    <p class="reveal">คณะอนุกรรมาธิการการส่งเสริมการเรียนรู้ การศึกษาเอกชน การศึกษาพิเศษ และความเท่าเทียมทางการศึกษา ตั้งขึ้นในคณะกรรมาธิการการศึกษา การอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม วุฒิสภา โดยอาศัยข้อบังคับการประชุมวุฒิสภา (ฉบับที่ ๕) พ.ศ. ๒๕๖๗ ข้อ ๗๘ วรรคสอง (๑๖) ประกอบข้อ ๘๙</p>
  </div>
</section>

<section class="section on-white">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">หน้าที่และอำนาจ</p>
      <h2>หกประการตามคำสั่งแต่งตั้ง</h2>
      <p>โครงสร้างการทำงานแบ่งเป็นภารกิจเชิงเนื้อหา (ข้อ ๑–๒) การประสานและรับฟัง (ข้อ ๓) และการรายงาน (ข้อ ๔–๕)</p>
    </div>
    <div class="layers">
      <div class="layer reveal"><div class="layer__badge"><span class="n">๑</span></div><div><h3>พิจารณาศึกษาร่างกฎหมายและการบังคับใช้</h3><p>พิจารณาศึกษาร่างพระราชบัญญัติทั้งสี่ด้าน สภาพปัญหาการบังคับใช้กฎหมาย และผลกระทบที่อาจเกิดขึ้น</p></div></div>
      <div class="layer reveal"><div class="layer__badge"><span class="n">๒</span></div><div><h3>ติดตามการบริหารราชการและการปฏิรูป</h3><p>ติดตามการพัฒนาและการควบคุมการบริหารราชการแผ่นดินให้มีประสิทธิภาพ เชื่อมโยงกับยุทธศาสตร์ชาติและแผนแม่บทฯ พร้อมเสนอแนะการปฏิรูป</p></div></div>
      <div class="layer reveal"><div class="layer__badge"><span class="n">๓</span></div><div><h3>ประสานงานและรับฟังความคิดเห็น</h3><p>บูรณาการภารกิจร่วมกับคณะอนุกรรมาธิการอื่น และรับฟังความคิดเห็นจากภาคส่วนต่าง ๆ อย่างรอบด้าน</p></div></div>
      <div class="layer reveal"><div class="layer__badge"><span class="n">๔</span></div><div><h3>รายงานผลการดำเนินงาน</h3><p>รายงานผลการดำเนินงานต่อคณะกรรมาธิการอย่างต่อเนื่อง</p></div></div>
      <div class="layer reveal"><div class="layer__badge"><span class="n">๕</span></div><div><h3>จัดทำรายงานผลการพิจารณาศึกษา</h3><p>จัดทำรายงาน ข้อสังเกตและข้อเสนอแนะ เสนอผ่านคณะกรรมาธิการต่อวุฒิสภา เพื่อส่งไปยังคณะรัฐมนตรีและหน่วยงานที่เกี่ยวข้อง</p></div></div>
      <div class="layer reveal"><div class="layer__badge"><span class="n">๖</span></div><div><h3>ดำเนินการอื่นตามที่ได้รับมอบหมาย</h3><p>ดำเนินการอื่นใดตามที่คณะกรรมาธิการมอบหมาย</p></div></div>
    </div>
  </div>
</section>

<section class="section on-paper">
  <div class="container narrow">
    <div class="section-head reveal">
      <p class="eyebrow">หลักการทำงาน</p>
      <h2>ยึดสิทธิ ความเสมอภาค และประโยชน์สาธารณะ</h2>
    </div>
    <ul class="reveal">
      <li>ทุกการวิเคราะห์คำนึงถึงสิทธิตามรัฐธรรมนูญ มาตรา ๒๗ (ความเสมอภาค) และมาตรา ๕๔ (หน้าที่ของรัฐด้านการศึกษา)</li>
      <li>คำนึงถึงผลกระทบต่อกลุ่มเปราะบางเสมอ และอ้างอิงพันธกรณีระหว่างประเทศที่ไทยเป็นภาคี ได้แก่ CRC, CRPD และ SDG 4 เมื่อเกี่ยวข้อง</li>
      <li>รักษาความเป็นกลาง นำเสนอหลายมุมมองอย่างเป็นธรรม และมุ่งประโยชน์สาธารณะ</li>
      <li>คุ้มครองข้อมูลส่วนบุคคลของผู้ร้องเรียนและผู้มีส่วนได้เสีย</li>
    </ul>
    <p style="margin-top:var(--sp-4)" class="reveal"><a class="btn btn--ghost" href="scope.html">ดูขอบเขตเนื้อหาทั้งสี่ด้าน ${ic.arrowRight}</a></p>
  </div>
</section>
</main>`;

/* ---- SCOPE ---- */
const scope = `
<main id="main">
${pageHero("กรอบการพิจารณาศึกษา", "กรอบขอบเขตการพิจารณาศึกษา", "ฉบับปรับตามคำสั่งแต่งตั้ง — จัดวางเป็นสี่ชั้น เชื่อมรัฐธรรมนูญและยุทธศาสตร์เข้ากับเนื้อหาสี่ด้านและกระบวนการทำงาน")}

<section class="section on-paper">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">ชั้นยุทธศาสตร์</p>
      <h2>ลำดับศักดิ์ของกรอบอ้างอิง</h2>
      <p>หน้าที่และอำนาจข้อ ๒ กำหนดให้การพิจารณาศึกษาเชื่อมโยงกับยุทธศาสตร์ชาติและแผนแม่บทฯ ชั้นนี้จึงเรียงจากรัฐธรรมนูญลงสู่แผนระดับปฏิบัติ</p>
    </div>
    <div class="layers">
      <div class="layer reveal"><div class="layer__badge"><span class="n">๑</span><span class="lbl">สูงสุด</span></div><div>
        <h3>รัฐธรรมนูญแห่งราชอาณาจักรไทย พุทธศักราช ๒๕๖๐</h3>
        <p>มาตรา ๒๗ (ความเสมอภาคและการห้ามเลือกปฏิบัติ) และมาตรา ๕๔ (หน้าที่ของรัฐด้านการศึกษา) เป็นฐานร่วมของทั้งสี่ด้าน ประกอบมาตรา ๒๕๘ จ. (การปฏิรูป) และมาตรา ๕๑ (สิทธิประชาชนติดตามและฟ้องร้อง)</p>
        <ul class="chips"><li>ม.๒๗</li><li>ม.๕๔</li><li>ม.๒๕๘ จ.</li><li>ม.๕๑</li></ul>
      </div></div>
      <div class="layer reveal"><div class="layer__badge"><span class="n">๒</span><span class="lbl">๒๐ ปี</span></div><div>
        <h3>ยุทธศาสตร์ชาติ (พ.ศ. ๒๕๖๑–๒๕๘๐)</h3>
        <p>เกี่ยวข้องโดยตรงกับยุทธศาสตร์ที่ ๓ (การพัฒนาทรัพยากรมนุษย์ — การเรียนรู้ตลอดชีวิตและพหุปัญญา) และยุทธศาสตร์ที่ ๔ (การสร้างโอกาสและความเสมอภาคทางสังคม — การลดความเหลื่อมล้ำทางการศึกษา)</p>
        <ul class="chips"><li>ยุทธศาสตร์ ๓ (๔.๓.๔)</li><li>ยุทธศาสตร์ ๔ (๔.๑.๗)</li></ul>
      </div></div>
      <div class="layer reveal"><div class="layer__badge"><span class="n">๓</span><span class="lbl">๕ ปี</span></div><div>
        <h3>แผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ</h3>
        <p>แปลงยุทธศาสตร์ชาติสู่การปฏิบัติระยะกลาง หมุดหมายที่เกี่ยวข้องคือกำลังคนสมรรถนะสูงและการเรียนรู้ต่อเนื่อง ตลอดจนการลดความเหลื่อมล้ำ ใช้เป็นกรอบตรวจสอบความสอดคล้องของหน่วยงาน</p>
      </div></div>
      <div class="layer reveal"><div class="layer__badge"><span class="n">๔</span><span class="lbl">๒๐ ปี</span></div><div>
        <h3>แผนการศึกษาแห่งชาติ พ.ศ. ๒๕๖๐–๒๕๗๙</h3>
        <p>แผนแม่บทด้านการศึกษาตามมาตรา ๕๔ วรรคสาม ยึดหลัก Education for All, Inclusive Education และ All for Education เป้าหมายห้าประการ ได้แก่ การเข้าถึง ความเท่าเทียม คุณภาพ ประสิทธิภาพ และการตอบโจทย์บริบท</p>
        <ul class="chips"><li>Access</li><li>Equity</li><li>Quality</li><li>Efficiency</li><li>Relevancy</li></ul>
      </div></div>
    </div>
  </div>
</section>

<section class="section on-white">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">ชั้นเนื้อหาสี่ด้าน</p>
      <h2>สามแกนวิเคราะห์ในแต่ละด้าน</h2>
      <p>แต่ละด้านจำแนกเป็นกฎหมายที่ใช้บังคับ ร่างกฎหมายและกฎหมายลำดับรอง และการวิเคราะห์ผลกระทบและช่องว่างการบังคับใช้</p>
    </div>
    <div class="pillars">
      <article class="pillar reveal" id="learning">
        <div class="pillar__icon">${ic.book}</div><div class="pillar__no">ด้าน ๑</div>
        <h3>การส่งเสริมการเรียนรู้</h3>
        <p>พ.ร.บ.ส่งเสริมการเรียนรู้ พ.ศ. ๒๕๖๖ กำหนดการเรียนรู้ ๓ รูปแบบ (มาตรา ๖) ระบบเทียบระดับ–เทียบโอน–สะสมหน่วยการเรียนรู้ (มาตรา ๑๔–๑๕) และคณะกรรมการส่งเสริมการเรียนรู้จังหวัด</p>
        <p class="pillar__law"><strong>ช่องว่าง:</strong> ความทั่วถึง การยอมรับคุณวุฒิ และสิ่งอำนวยความสะดวกสำหรับคนพิการ (มาตรา ๑๖(๔))</p>
      </article>
      <article class="pillar reveal" data-delay="1" id="private">
        <div class="pillar__icon">${ic.school}</div><div class="pillar__no">ด้าน ๒</div>
        <h3>การศึกษาเอกชน</h3>
        <p>พ.ร.บ.โรงเรียนเอกชน ๒๕๕๐/๒๕๕๔ กำหนดฐานะนิติบุคคล การอุดหนุนและสิทธิประโยชน์ (มาตรา ๔๘) กองทุนส่งเสริมโรงเรียนในระบบ (มาตรา ๔๙) การกำกับดูแลและระบบอุทธรณ์</p>
        <p class="pillar__law"><strong>ช่องว่าง:</strong> ความเป็นธรรมของการอุดหนุน และการจัดการศึกษาสำหรับนักเรียนพิการ/ด้อยโอกาส (มาตรา ๔๘(๒))</p>
      </article>
      <article class="pillar reveal" data-delay="2" id="special">
        <div class="pillar__icon">${ic.access}</div><div class="pillar__no">ด้าน ๓</div>
        <h3>การศึกษาพิเศษ</h3>
        <p>พ.ร.บ.การจัดการศึกษาสำหรับคนพิการ ๒๕๕๑/๒๕๕๖ รับรองสิทธิเรียนฟรีตั้งแต่แรกพบความพิการ (มาตรา ๕) แผน IEP และหลักห้ามปฏิเสธการรับเข้าเรียน (มาตรา ๘)</p>
        <p class="pillar__law"><strong>ช่องว่าง:</strong> คุณภาพการเรียนรวม ความเพียงพอของครูการศึกษาพิเศษ และการเข้าถึงเทคโนโลยีสิ่งอำนวยความสะดวก</p>
      </article>
      <article class="pillar reveal" data-delay="3" id="equity">
        <div class="pillar__icon">${ic.scales}</div><div class="pillar__no">ด้าน ๔</div>
        <h3>ความเท่าเทียมทางการศึกษา</h3>
        <p>พ.ร.บ.กองทุนเพื่อความเสมอภาคทางการศึกษา ๒๕๖๑ นิยามความเหลื่อมล้ำ (มาตรา ๓) วัตถุประสงค์ ๗ ประการ (มาตรา ๕) ประกอบ พ.ร.บ.กยศ. (ฉบับที่ ๒) ๒๕๖๖</p>
        <p class="pillar__law"><strong>ช่องว่าง:</strong> การระบุกลุ่มเป้าหมาย เด็กปฐมวัย และความซ้ำซ้อนของกองทุนหลายฉบับ</p>
      </article>
    </div>
  </div>
</section>

<section class="section on-paper">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">ชั้นตารางจับคู่</p>
      <h2>Mapping: เนื้อหา × หน้าที่และอำนาจ</h2>
      <p>ยืนยันว่ากรอบเนื้อหาทั้งสี่ด้านรองรับหน้าที่และอำนาจครบถ้วน ไม่มีประเด็นตกหล่นหรือเกินขอบเขต (● หมายถึงเกี่ยวข้องโดยตรง)</p>
    </div>
    <div class="table-wrap reveal">
      <table class="matrix">
        <thead>
          <tr><th scope="col">กรอบเนื้อหา</th><th scope="col">ข้อ ๑ ร่าง กม./บังคับใช้</th><th scope="col">ข้อ ๒ ติดตาม/ปฏิรูป</th><th scope="col">ข้อ ๓ ประสาน/รับฟัง</th><th scope="col">ข้อ ๕ รายงาน</th></tr>
        </thead>
        <tbody>
          <tr><th scope="row">ด้าน ๑ ส่งเสริมการเรียนรู้</th><td data-label="ข้อ ๑" class="yes">●</td><td data-label="ข้อ ๒" class="yes">●</td><td data-label="ข้อ ๓" class="yes">●</td><td data-label="ข้อ ๕" class="yes">●</td></tr>
          <tr><th scope="row">ด้าน ๒ การศึกษาเอกชน</th><td data-label="ข้อ ๑" class="yes">●</td><td data-label="ข้อ ๒" class="yes">●</td><td data-label="ข้อ ๓" class="yes">●</td><td data-label="ข้อ ๕" class="yes">●</td></tr>
          <tr><th scope="row">ด้าน ๓ การศึกษาพิเศษ</th><td data-label="ข้อ ๑" class="yes">●</td><td data-label="ข้อ ๒" class="yes">●</td><td data-label="ข้อ ๓" class="yes">●</td><td data-label="ข้อ ๕" class="yes">●</td></tr>
          <tr><th scope="row">ด้าน ๔ ความเท่าเทียม</th><td data-label="ข้อ ๑" class="yes">●</td><td data-label="ข้อ ๒" class="yes">●</td><td data-label="ข้อ ๓" class="yes">●</td><td data-label="ข้อ ๕" class="yes">●</td></tr>
          <tr><th scope="row">ฐานรัฐธรรมนูญร่วม</th><td data-label="ข้อ ๑" class="yes">●</td><td data-label="ข้อ ๒" class="yes">●</td><td data-label="ข้อ ๓" class="no">—</td><td data-label="ข้อ ๕" class="yes">●</td></tr>
        </tbody>
      </table>
    </div>

    <div style="height:var(--sp-5)"></div>
    <div class="section-head reveal">
      <h2 style="font-size:var(--step-2)">Mapping: เนื้อหา × ยุทธศาสตร์</h2>
    </div>
    <div class="table-wrap reveal">
      <table class="matrix">
        <thead><tr><th scope="col">กรอบเนื้อหา</th><th scope="col">รัฐธรรมนูญ ๒๕๖๐</th><th scope="col">ยุทธศาสตร์ชาติ</th><th scope="col">แผนการศึกษาแห่งชาติ</th></tr></thead>
        <tbody>
          <tr><th scope="row">ด้าน ๑ ส่งเสริมการเรียนรู้</th><td data-label="รัฐธรรมนูญ">ม.๕๔ ว.๓</td><td data-label="ยุทธศาสตร์ชาติ">ยุทธศาสตร์ ๓ (๔.๓.๔)</td><td data-label="แผนการศึกษาฯ">ยุทธศาสตร์ ๓</td></tr>
          <tr><th scope="row">ด้าน ๒ การศึกษาเอกชน</th><td data-label="รัฐธรรมนูญ">ม.๕๔ ว.๒–๓</td><td data-label="ยุทธศาสตร์ชาติ">ยุทธศาสตร์ ๓–๔</td><td data-label="แผนการศึกษาฯ">ยุทธศาสตร์ ๖</td></tr>
          <tr><th scope="row">ด้าน ๓ การศึกษาพิเศษ</th><td data-label="รัฐธรรมนูญ">ม.๒๗, ๕๔</td><td data-label="ยุทธศาสตร์ชาติ">ยุทธศาสตร์ ๔ (๔.๑.๕)</td><td data-label="แผนการศึกษาฯ">ยุทธศาสตร์ ๔</td></tr>
          <tr><th scope="row">ด้าน ๔ ความเท่าเทียม</th><td data-label="รัฐธรรมนูญ">ม.๕๔ ว.๕–๖</td><td data-label="ยุทธศาสตร์ชาติ">ยุทธศาสตร์ ๔ (๔.๑.๗)</td><td data-label="แผนการศึกษาฯ">ยุทธศาสตร์ ๔</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section on-white">
  <div class="container narrow">
    <div class="section-head reveal">
      <p class="eyebrow">ชั้นกระบวนการ</p>
      <h2>วิธีการทำงานในทุกด้าน</h2>
    </div>
    <ul class="reveal">
      <li><strong>การรับฟังความคิดเห็น:</strong> รับฟังผู้มีส่วนได้เสียอย่างรอบด้าน โดยเฉพาะกลุ่มเปราะบาง องค์การคนพิการ ผู้ประกอบการโรงเรียนเอกชน และภาคีเครือข่ายการเรียนรู้</li>
      <li><strong>การประสานและบูรณาการ:</strong> ประสานกับคณะอนุกรรมาธิการอื่นเพื่อป้องกันความซ้ำซ้อน โดยประเด็นที่คาบเกี่ยวอุดมศึกษา/อาชีวศึกษา/วิจัย จะเข้าข่ายเฉพาะเมื่อเชื่อมโยงกับสี่ด้านนี้</li>
      <li><strong>ช่องทางการเสนอรายงาน:</strong> จัดทำรายงานพร้อมข้อสังเกตและข้อเสนอแนะ เสนอผ่านคณะกรรมาธิการต่อวุฒิสภา เพื่อส่งไปยังคณะรัฐมนตรีและหน่วยงานที่เกี่ยวข้อง</li>
    </ul>
  </div>
</section>

<section class="section on-paper">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">แหล่งกฎหมายอ้างอิง</p>
      <h2>กฎหมายและแผนที่เกี่ยวข้อง</h2>
      <p>รายการกฎหมายหลักที่อยู่ในขอบเขตการพิจารณาศึกษาของคณะฯ</p>
    </div>
    <div class="layers">
      <div class="layer reveal"><div class="layer__badge"><span class="n">รธน</span></div><div><h3>รัฐธรรมนูญและการปฏิรูป</h3><ul class="chips"><li>รัฐธรรมนูญ ๒๕๖๐ (ม.๒๗, ๕๔, ๒๕๘ จ., ๕๑)</li><li>คำอธิบายและความมุ่งหมายของรัฐธรรมนูญ ๒๕๖๐</li></ul></div></div>
      <div class="layer reveal"><div class="layer__badge"><span class="n">พรบ</span></div><div><h3>พระราชบัญญัติหลักสี่ด้าน</h3><ul class="chips"><li>ส่งเสริมการเรียนรู้ ๒๕๖๖</li><li>โรงเรียนเอกชน ๒๕๕๐/๒๕๕๔</li><li>การจัดการศึกษาสำหรับคนพิการ ๒๕๕๑/๒๕๕๖</li><li>กองทุนเพื่อความเสมอภาคทางการศึกษา ๒๕๖๑</li><li>กยศ. (ฉบับที่ ๒) ๒๕๖๖</li><li>การศึกษาแห่งชาติ ๒๕๔๒–๔</li><li>การศึกษาภาคบังคับ ๒๕๔๕</li></ul></div></div>
      <div class="layer reveal"><div class="layer__badge"><span class="n">แผน</span></div><div><h3>ยุทธศาสตร์และแผน</h3><ul class="chips"><li>ยุทธศาสตร์ชาติ ๒๕๖๑–๒๕๘๐</li><li>แผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ</li><li>แผนการศึกษาแห่งชาติ ๒๕๖๐–๒๕๗๙</li></ul></div></div>
    </div>
  </div>
</section>
</main>`;

/* ---- RESULTS (coming soon) ---- */
const results = `
<main id="main">
${pageHero("ผลการพิจารณาศึกษา", "ผลการพิจารณาศึกษา", "พื้นที่สำหรับเผยแพร่รายงานผลการพิจารณาศึกษา ข้อสังเกต และข้อเสนอแนะของคณะอนุกรรมาธิการฯ")}

<section class="section on-paper">
  <div class="container narrow">
    <div class="empty reveal">
      <div class="empty__mark">${ic.gavel}</div>
      <h2>อยู่ระหว่างการพิจารณาศึกษา</h2>
      <p>ขณะนี้คณะอนุกรรมาธิการฯ อยู่ระหว่างการพิจารณาศึกษาตามกรอบขอบเขตที่กำหนด รายงานผลการพิจารณาศึกษาพร้อมข้อสังเกตและข้อเสนอแนะจะเผยแพร่ในหน้านี้เมื่อคณะกรรมาธิการและวุฒิสภาให้ความเห็นชอบแล้ว</p>
      <div class="empty__timeline">
        <div class="empty__step" data-active="true"><span class="k">๑</span><b>กำหนดกรอบการศึกษา</b><span>จัดทำกรอบขอบเขตตามคำสั่งแต่งตั้ง</span></div>
        <div class="empty__step" data-active="true"><span class="k">๒</span><b>พิจารณาศึกษา</b><span>รับฟังความคิดเห็นและรวบรวมข้อมูล</span></div>
        <div class="empty__step"><span class="k">๓</span><b>จัดทำรายงาน</b><span>ข้อสังเกตและข้อเสนอแนะ</span></div>
        <div class="empty__step"><span class="k">๔</span><b>เผยแพร่</b><span>เมื่อวุฒิสภาให้ความเห็นชอบ</span></div>
      </div>
      <p style="margin-top:var(--sp-4)"><a class="btn" href="${OPINION}" target="_blank" rel="noopener">ร่วมแสดงความคิดเห็นระหว่างการพิจารณาศึกษา ${ic.external}</a> <a class="btn btn--ghost" href="scope.html">ดูกรอบการพิจารณาศึกษา ${ic.arrowRight}</a></p>
    </div>
  </div>
</section>
</main>`;

/* ---- DOCUMENTS ---- */
const documents = `
<main id="main">
${pageHero("เอกสารเผยแพร่", "เอกสารเผยแพร่และดาวน์โหลด", "กรอบขอบเขตการพิจารณาศึกษา และร่างแผนการพิจารณาศึกษารายด้าน ในรูปแบบที่พร้อมนำไปใช้และแก้ไข")}

<section class="section on-paper">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">ชุดเอกสารปัจจุบัน</p>
      <h2>กรอบขอบเขตการพิจารณาศึกษา (ฉบับปรับตามคำสั่งแต่งตั้ง)</h2>
      <p>ประมวลกรอบสี่ด้าน ชั้นยุทธศาสตร์ ตารางจับคู่ และกระบวนการทำงาน มีให้เลือกสามรูปแบบ</p>
    </div>
    <div class="docs">
      <a class="doc reveal" href="documents/กรอบขอบเขตการพิจารณาศึกษา_ฉบับปรับตามคำสั่งแต่งตั้ง.docx" download>
        <div class="doc__badge doc__badge--docx">DOCX</div>
        <div class="doc__body"><b>ฉบับ Word</b><span>สำหรับเวียนและปรับแก้เป็นทางการ</span><span class="go">ดาวน์โหลด ${ic.arrowRight}</span></div>
      </a>
      <a class="doc reveal" data-delay="1" href="documents/กรอบขอบเขตการพิจารณาศึกษา_ฉบับปรับตามคำสั่งแต่งตั้ง.pdf" download>
        <div class="doc__badge doc__badge--pdf">PDF</div>
        <div class="doc__body"><b>ฉบับ PDF</b><span>สำหรับอ่านและพิมพ์ รักษารูปแบบ</span><span class="go">ดาวน์โหลด ${ic.arrowRight}</span></div>
      </a>
      <a class="doc reveal" data-delay="2" href="documents/กรอบขอบเขตการพิจารณาศึกษา_ฉบับปรับตามคำสั่งแต่งตั้ง.md" download>
        <div class="doc__badge doc__badge--md">MD</div>
        <div class="doc__body"><b>ฉบับ Markdown</b><span>สำหรับแก้ไขและทำงานร่วมกัน</span><span class="go">ดาวน์โหลด ${ic.arrowRight}</span></div>
      </a>
    </div>
    <div class="note reveal">${ic.info}<p>เอกสารมีเครื่องหมาย [โปรดตรวจสอบ] ในจุดที่ต้องยืนยันกับต้นฉบับทางการ เช่น เลขที่คำสั่งแต่งตั้งและเลขหมุดหมายของแผนพัฒนาฯ ก่อนรับรองเอกสาร</p></div>

    <div class="section-head reveal" style="margin-top:var(--sp-6)">
      <p class="eyebrow">ชุดเอกสารเพิ่มเติม</p>
      <h2>ร่างแผนการพิจารณาศึกษารายด้าน และชุดคำถาม</h2>
      <p>แผนปฏิบัติรายด้านทั้งสี่ด้าน พร้อมประเด็นพิจารณาศึกษา หน่วยงานที่ควรเชิญมาชี้แจง และชุดคำถามสำหรับการชี้แจง</p>
    </div>
    <div class="docs">
      <a class="doc reveal" href="documents/ร่างแผนการพิจารณาศึกษารายด้าน_และชุดคำถาม.docx" download>
        <div class="doc__badge doc__badge--docx">DOCX</div>
        <div class="doc__body"><b>ฉบับ Word</b><span>สำหรับเวียนและปรับแก้เป็นทางการ</span><span class="go">ดาวน์โหลด ${ic.arrowRight}</span></div>
      </a>
      <a class="doc reveal" data-delay="1" href="documents/ร่างแผนการพิจารณาศึกษารายด้าน_และชุดคำถาม.pdf" download>
        <div class="doc__badge doc__badge--pdf">PDF</div>
        <div class="doc__body"><b>ฉบับ PDF</b><span>สำหรับอ่านและพิมพ์ รักษารูปแบบ</span><span class="go">ดาวน์โหลด ${ic.arrowRight}</span></div>
      </a>
      <a class="doc reveal" data-delay="2" href="documents/ร่างแผนการพิจารณาศึกษารายด้าน_และชุดคำถาม.md" download>
        <div class="doc__badge doc__badge--md">MD</div>
        <div class="doc__body"><b>ฉบับ Markdown</b><span>สำหรับแก้ไขและทำงานร่วมกัน</span><span class="go">ดาวน์โหลด ${ic.arrowRight}</span></div>
      </a>
    </div>
    <p style="margin-top:var(--sp-4)" class="reveal"><a class="btn btn--ghost" href="plan.html">อ่านแผนการพิจารณาศึกษาบนเว็บ ${ic.arrowRight}</a></p>
  </div>
</section>

<section class="section on-white">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">แหล่งกฎหมายอ้างอิง</p>
      <h2>กฎหมายและแผนที่เกี่ยวข้อง</h2>
      <p>รายการกฎหมายหลักที่อยู่ในขอบเขตการพิจารณาศึกษาของคณะฯ</p>
    </div>
    <div class="layers">
      <div class="layer reveal"><div class="layer__badge"><span class="n">รธน</span></div><div><h3>รัฐธรรมนูญและการปฏิรูป</h3><ul class="chips"><li>รัฐธรรมนูญ ๒๕๖๐ (ม.๒๗, ๕๔, ๒๕๘ จ., ๕๑)</li><li>คำอธิบายและความมุ่งหมายของรัฐธรรมนูญ ๒๕๖๐</li></ul></div></div>
      <div class="layer reveal"><div class="layer__badge"><span class="n">พรบ</span></div><div><h3>พระราชบัญญัติหลักสี่ด้าน</h3><ul class="chips"><li>ส่งเสริมการเรียนรู้ ๒๕๖๖</li><li>โรงเรียนเอกชน ๒๕๕๐/๒๕๕๔</li><li>การจัดการศึกษาสำหรับคนพิการ ๒๕๕๑/๒๕๕๖</li><li>กองทุนเพื่อความเสมอภาคทางการศึกษา ๒๕๖๑</li><li>กยศ. (ฉบับที่ ๒) ๒๕๖๖</li><li>การศึกษาแห่งชาติ ๒๕๔๒–๔</li><li>การศึกษาภาคบังคับ ๒๕๔๕</li></ul></div></div>
      <div class="layer reveal"><div class="layer__badge"><span class="n">แผน</span></div><div><h3>ยุทธศาสตร์และแผน</h3><ul class="chips"><li>ยุทธศาสตร์ชาติ ๒๕๖๑–๒๕๘๐</li><li>แผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ</li><li>แผนการศึกษาแห่งชาติ ๒๕๖๐–๒๕๗๙</li></ul></div></div>
    </div>
  </div>
</section>
</main>`;

/* ---- CONTACT ---- */
const contact = `
<main id="main">
${pageHero("ติดต่อ", "ติดต่อฝ่ายเลขานุการคณะอนุกรรมาธิการฯ", "สอบถามข้อมูล เสนอความคิดเห็น หรือขอเอกสารประกอบการพิจารณาศึกษา")}

<section class="section on-paper">
  <div class="container">
    <div class="contact-grid">
      <div class="reveal">
        <div class="section-head" style="margin-bottom:var(--sp-4)">
          <p class="eyebrow">ช่องทางติดต่อ</p>
          <h2>ฝ่ายเลขานุการคณะอนุกรรมาธิการฯ</h2>
        </div>
        <ul class="info-list">
          <li><span class="ic">${ic.comment}</span><div><b>ร่วมแสดงความคิดเห็น (สำหรับผู้เกี่ยวข้องและประชาชนทั่วไป)</b><a href="${OPINION}" target="_blank" rel="noopener">opinion.thamdee.com</a></div></li>
          <li><span class="ic">${ic.pin}</span><div><b>ที่ทำการ</b><span>สำนักกรรมาธิการ สำนักงานเลขาธิการวุฒิสภา อาคารรัฐสภา เขตดุสิต กรุงเทพมหานคร</span></div></li>
          <li><span class="ic">${ic.clock}</span><div><b>เวลาทำการ</b><span>วันจันทร์–ศุกร์ เวลา ๐๘.๓๐–๑๖.๓๐ น. (เว้นวันหยุดราชการ)</span></div></li>
        </ul>
      </div>

      <div class="form-card reveal" data-delay="1">
        <h3 style="font-size:var(--step-1);margin-bottom:1rem">ส่งข้อความถึงฝ่ายเลขานุการ</h3>
        <form action="#" method="post" onsubmit="return false">
          <div class="field"><label for="name">ชื่อ–นามสกุล</label><input id="name" name="name" type="text" autocomplete="name" required></div>
          <div class="field"><label for="email">ไปรษณีย์อิเล็กทรอนิกส์</label><input id="email" name="email" type="email" autocomplete="email" required></div>
          <div class="field"><label for="topic">หัวข้อ</label>
            <select id="topic" name="topic">
              <option>สอบถามข้อมูลทั่วไป</option>
              <option>ขอเอกสารประกอบการพิจารณา</option>
              <option>เสนอความคิดเห็นด้านการส่งเสริมการเรียนรู้</option>
              <option>เสนอความคิดเห็นด้านการศึกษาเอกชน</option>
              <option>เสนอความคิดเห็นด้านการศึกษาพิเศษ</option>
              <option>เสนอความคิดเห็นด้านความเท่าเทียมทางการศึกษา</option>
            </select>
          </div>
          <div class="field"><label for="msg">ข้อความ</label><textarea id="msg" name="msg" rows="5" required></textarea></div>
          <button class="btn" type="submit">ส่งข้อความ ${ic.arrowRight}</button>
        </form>
      </div>
    </div>
  </div>
</section>
</main>`;

/* ---- PLAN ---- */
const planData = [
  {
    key: "ด้าน ๑", name: "การส่งเสริมการเรียนรู้", icon: ic.book,
    rationale: "พระราชบัญญัติส่งเสริมการเรียนรู้ พ.ศ. ๒๕๖๖ เป็นกฎหมายใหม่ที่จัดตั้งกรมส่งเสริมการเรียนรู้และวางระบบการเรียนรู้สามรูปแบบ การติดตามการบังคับใช้ในระยะแรกจึงสำคัญต่อการวางรากฐานการเรียนรู้ตลอดชีวิต",
    objectives: [
      "ประเมินความคืบหน้าและความพร้อมของการบังคับใช้พระราชบัญญัติส่งเสริมการเรียนรู้ พ.ศ. ๒๕๖๖",
      "ระบุช่องว่างของการเข้าถึงและคุณภาพของการจัดการเรียนรู้ทั้งสามรูปแบบ",
      "เสนอแนะแนวทางเชิงกฎหมาย นโยบาย และงบประมาณเพื่อยกระดับการเรียนรู้ตลอดชีวิต",
    ],
    issues: [
      "ความคืบหน้าการจัดตั้งและการปรับบทบาทของกรมส่งเสริมการเรียนรู้ และการถ่ายโอนภารกิจจากสำนักงาน กศน. เดิม",
      "การจัดการเรียนรู้สามรูปแบบตามมาตรา ๖ ในด้านงบประมาณ บุคลากร และความครอบคลุมกลุ่มเป้าหมาย",
      "สถานะการพัฒนาระบบเทียบระดับ เทียบโอน และสะสมหน่วยการเรียนรู้ (มาตรา ๑๔–๑๕) และการยอมรับคุณวุฒิ",
      "การเข้าถึงของกลุ่มเปราะบางและการจัดสิ่งอำนวยความสะดวกสำหรับคนพิการ (มาตรา ๑๖(๔))",
      "การเชื่อมโยงกับการศึกษาภาคบังคับ (มาตรา ๑๒ วรรคท้าย) และการใช้ กยศ. เพื่อการเรียนรู้ตลอดชีวิต",
      "บทบาทของคณะกรรมการส่งเสริมการเรียนรู้จังหวัด และการมีส่วนร่วมของภาคีเครือข่าย",
    ],
    agencies: [
      { t: "กรมส่งเสริมการเรียนรู้ กระทรวงศึกษาธิการ", lead: true },
      { t: "สำนักงานปลัดกระทรวงศึกษาธิการ" },
      { t: "สำนักงานเลขาธิการสภาการศึกษา" },
      { t: "สถาบันคุณวุฒิวิชาชีพ (องค์การมหาชน)" },
      { t: "กองทุนเงินให้กู้ยืมเพื่อการศึกษา" },
    ],
    groups: [
      { t: "ก. โครงสร้างและการเปลี่ยนผ่าน", qs: ["ความคืบหน้าของการจัดตั้งกรมและการปรับโครงสร้างเป็นอย่างไร และมีอุปสรรคในการถ่ายโอนภารกิจ บุคลากร และทรัพย์สินหรือไม่", "กฎหมายลำดับรองที่จำเป็นออกครบถ้วนแล้วหรือไม่ ฉบับใดยังอยู่ระหว่างดำเนินการ"] },
      { t: "ข. การจัดการเรียนรู้และงบประมาณ", qs: ["การเรียนรู้ทั้งสามรูปแบบมีกลุ่มเป้าหมาย จำนวนผู้เข้าร่วม และงบประมาณอย่างไร", "อัตรากำลังและสมรรถนะบุคลากรเพียงพอหรือไม่ และมีแผนพัฒนาอย่างไร"] },
      { t: "ค. คุณวุฒิและการเทียบโอน", qs: ["ระบบเทียบระดับ เทียบโอน และสะสมหน่วยการเรียนรู้อยู่ในขั้นใด และมีอัตราการยอมรับคุณวุฒิเพียงใด", "มีกลไกใดรับรองการยอมรับคุณวุฒิในระบบการศึกษาและตลาดแรงงาน"] },
      { t: "ง. การเข้าถึงและความเท่าเทียม", qs: ["มีมาตรการใดให้กลุ่มเปราะบางและคนพิการเข้าถึงการเรียนรู้อย่างทั่วถึง และมีข้อจำกัดใด", "หน่วยงานมีข้อเสนอแนะเชิงกฎหมาย นโยบาย หรืองบประมาณใดเพื่อยกระดับการเรียนรู้ตลอดชีวิต"] },
    ],
  },
  {
    key: "ด้าน ๒", name: "การศึกษาเอกชน", icon: ic.school,
    rationale: "การศึกษาเอกชนช่วยเพิ่มทางเลือกและแบ่งเบาภาระการจัดการศึกษาของรัฐ ตามพระราชบัญญัติโรงเรียนเอกชน พ.ศ. ๒๕๕๐ และที่แก้ไขเพิ่มเติม ประเด็นสำคัญคือความเป็นธรรมของการอุดหนุน การคุ้มครองครู และผลกระทบเชิงระบบ",
    objectives: [
      "ประเมินความเป็นธรรมและประสิทธิภาพของกลไกการอุดหนุนและสิทธิประโยชน์แก่โรงเรียนเอกชน",
      "ตรวจสอบการคุ้มครองการทำงานและสวัสดิการของครูและบุคลากร",
      "เสนอแนะแนวทางส่งเสริมและกำกับดูแลการศึกษาเอกชนอย่างสมดุล",
    ],
    issues: [
      "ระบบและอัตราการอุดหนุนรายหัว (มาตรา ๔๘) ความเป็นธรรมต่อโรงเรียนขนาดเล็ก การกุศล และสอนศาสนา",
      "สิทธิประโยชน์ทางภาษีและอากร และการดำเนินงานของกองทุนส่งเสริมโรงเรียนในระบบ (มาตรา ๔๙)",
      "การคุ้มครองการทำงานและสวัสดิการของผู้อำนวยการ ครู และบุคลากร รวมถึงกองทุนสงเคราะห์",
      "การจัดการศึกษาสำหรับนักเรียนพิการ ผู้ด้อยโอกาส และผู้มีความสามารถพิเศษ (มาตรา ๔๘(๒))",
      "ประสิทธิภาพและความเป็นธรรมของการกำกับดูแล (มาตรา ๘๗–๙๑) และระบบอุทธรณ์",
      "การกำกับและส่งเสริมโรงเรียนนอกระบบ และแนวโน้มจำนวนนักเรียน/โรงเรียนเอกชน",
    ],
    agencies: [
      { t: "สำนักงานคณะกรรมการส่งเสริมการศึกษาเอกชน", lead: true },
      { t: "สำนักงานปลัดกระทรวงศึกษาธิการ" },
      { t: "ผู้แทนสมาคมและสมาพันธ์การศึกษาเอกชน" },
      { t: "กองทุนสงเคราะห์ (ครูและบุคลากรโรงเรียนเอกชน)" },
      { t: "กรมสรรพากร — ในส่วนสิทธิประโยชน์ทางภาษี" },
    ],
    groups: [
      { t: "ก. การอุดหนุนและสิทธิประโยชน์", qs: ["อัตราและวิธีการอุดหนุนรายหัวสะท้อนต้นทุนที่แท้จริงเพียงใด โดยเฉพาะโรงเรียนขนาดเล็ก การกุศล และสอนศาสนา", "การใช้สิทธิประโยชน์ทางภาษีและกองทุนส่งเสริมโรงเรียนในระบบมีผลและข้อจำกัดอย่างไร"] },
      { t: "ข. ครูและบุคลากร", qs: ["การคุ้มครองและสวัสดิการของครูเอกชนเทียบกับภาครัฐแตกต่างอย่างไร และกองทุนสงเคราะห์มีความยั่งยืนเพียงใด"] },
      { t: "ค. ความเท่าเทียมในโรงเรียนเอกชน", qs: ["โรงเรียนเอกชนจัดการศึกษาสำหรับนักเรียนพิการและผู้ด้อยโอกาสได้เพียงใด และได้รับการสนับสนุนอย่างไร"] },
      { t: "ง. การกำกับดูแลและแนวโน้ม", qs: ["ระบบกำกับดูแลและอุทธรณ์มีประสิทธิภาพและเป็นธรรมเพียงใด และมีภาระการรายงานซ้ำซ้อนหรือไม่", "แนวโน้มจำนวนนักเรียนและโรงเรียนเอกชนเป็นอย่างไร และมีข้อเสนอแนะเชิงนโยบายอย่างไร"] },
    ],
  },
  {
    key: "ด้าน ๓", name: "การศึกษาพิเศษ", icon: ic.access,
    rationale: "พระราชบัญญัติการจัดการศึกษาสำหรับคนพิการ พ.ศ. ๒๕๕๑ และที่แก้ไขเพิ่มเติม รับรองสิทธิของคนพิการอย่างกว้างขวาง การพิจารณาจึงมุ่งช่องว่างระหว่างสิทธิตามกฎหมายกับการปฏิบัติจริง โดยคำนึงถึงหลักเรียนรวมและพันธกรณี CRPD",
    objectives: [
      "ประเมินการบังคับใช้สิทธิทางการศึกษาของคนพิการตามกฎหมาย",
      "ตรวจสอบความเพียงพอของครู เทคโนโลยีสิ่งอำนวยความสะดวก และรูปแบบการจัดการศึกษา",
      "เสนอแนะแนวทางยกระดับการจัดการศึกษาให้สอดคล้องกับหลักเรียนรวม",
    ],
    issues: [
      "การบังคับใช้สิทธิเรียนฟรีตั้งแต่แรกพบความพิการ (มาตรา ๕) และการเข้าถึงบริการจริง",
      "คุณภาพและการติดตามแผนการจัดการศึกษาเฉพาะบุคคล (IEP) ในสถานศึกษาทุกสังกัด (มาตรา ๘)",
      "การบังคับใช้หลักห้ามปฏิเสธการรับเข้าเรียน และสัดส่วนการรับเข้าศึกษาต่อในอุดมศึกษา (มาตรา ๘)",
      "ความเพียงพอ คุณภาพ และค่าตอบแทนของครูการศึกษาพิเศษ (มาตรา ๖)",
      "การเข้าถึงเทคโนโลยีสิ่งอำนวยความสะดวก สื่อ และบริการที่ใช้ประโยชน์ได้จริง",
      "ความครอบคลุมของรูปแบบการจัดการศึกษา และการดำเนินงานของกองทุนฯ คนพิการ (มาตรา ๒๑)",
    ],
    agencies: [
      { t: "สำนักบริหารงานการศึกษาพิเศษ สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน", lead: true },
      { t: "กรมส่งเสริมและพัฒนาคุณภาพชีวิตคนพิการ กระทรวง พม." },
      { t: "สำนักงานปลัดกระทรวง อว. — ในส่วนการรับเข้าศึกษาต่อ" },
      { t: "กองทุนส่งเสริมและพัฒนาการศึกษาสำหรับคนพิการ" },
      { t: "สภาคนพิการทุกประเภทแห่งประเทศไทย" },
    ],
    groups: [
      { t: "ก. การเข้าถึงสิทธิและการรับเข้าเรียน", qs: ["การบังคับใช้สิทธิเรียนฟรีตั้งแต่แรกพบความพิการเป็นอย่างไร และมีเด็กพิการที่ยังเข้าไม่ถึงการศึกษาเท่าใด", "มีรายงานการปฏิเสธการรับเข้าเรียนหรือไม่ และมีกลไกร้องเรียนและเยียวยาอย่างไร"] },
      { t: "ข. แผน IEP และบุคลากร", qs: ["การจัดทำและติดตามแผน IEP มีคุณภาพและครอบคลุมเพียงใด", "จำนวนและคุณวุฒิของครูการศึกษาพิเศษเพียงพอหรือไม่ และค่าตอบแทนเป็นไปตามกฎหมายเพียงใด"] },
      { t: "ค. เทคโนโลยีและรูปแบบการจัดการศึกษา", qs: ["การจัดสรรเทคโนโลยีสิ่งอำนวยความสะดวกครอบคลุมและใช้ได้จริงเพียงใด", "รูปแบบการเรียนรวมและสถานศึกษาเฉพาะความพิการครอบคลุมเชิงพื้นที่และคุณภาพอย่างไร"] },
      { t: "ง. กองทุนและพันธกรณีระหว่างประเทศ", qs: ["กองทุนฯ คนพิการมีสถานะการเงินและผลลัพธ์อย่างไร", "มีข้อเสนอแนะอย่างไรให้การจัดการศึกษาสอดคล้องกับหลักเรียนรวมตาม CRPD"] },
    ],
  },
  {
    key: "ด้าน ๔", name: "ความเท่าเทียมและการลดความเหลื่อมล้ำ", icon: ic.scales,
    rationale: "รัฐธรรมนูญ มาตรา ๕๔ วรรคห้าและหก เป็นที่มาของกองทุนเพื่อความเสมอภาคทางการศึกษา พ.ศ. ๒๕๖๑ การพิจารณามุ่งความแม่นยำของการระบุกลุ่มเป้าหมาย ประสิทธิผลของมาตรการ และการบูรณาการกองทุน โดยให้ความสำคัญกับเด็กปฐมวัยและเด็กนอกระบบ",
    objectives: [
      "ประเมินความครอบคลุมและความแม่นยำของการระบุกลุ่มเป้าหมายผู้ขาดแคลนทุนทรัพย์และผู้ด้อยโอกาส",
      "ประเมินประสิทธิผลของมาตรการต่อการคงอยู่และการสำเร็จการศึกษา",
      "เสนอแนะการบูรณาการกองทุนและมาตรการเพื่อลดความซ้ำซ้อน",
    ],
    issues: [
      "ความครอบคลุมและความแม่นยำของการระบุกลุ่มเป้าหมายของกองทุนเพื่อความเสมอภาคทางการศึกษา",
      "ประสิทธิผลของมาตรการช่วยเหลือต่ออัตราการคงอยู่และการสำเร็จการศึกษาขั้นพื้นฐาน",
      "เด็กปฐมวัยในฐานะจุดตัดของความเหลื่อมล้ำ และการดูแลร่วมกับ อปท. และเอกชน (มาตรา ๕๔ วรรคสอง)",
      "การดำเนินงานของ กยศ. (ฉบับที่ ๒) พ.ศ. ๒๕๖๖ การขยายโอกาสและการชำระคืนตามรายได้",
      "ความซ้ำซ้อนและการบูรณาการระหว่างกองทุนด้านการศึกษาหลายฉบับ",
      "มาตรการงบประมาณและภาษีตามมาตรา ๕๔ วรรคหก และฐานข้อมูลเด็กนอกระบบการศึกษา",
    ],
    agencies: [
      { t: "กองทุนเพื่อความเสมอภาคทางการศึกษา", lead: true },
      { t: "กองทุนเงินให้กู้ยืมเพื่อการศึกษา" },
      { t: "สำนักงานเลขาธิการสภาการศึกษา" },
      { t: "สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน" },
      { t: "กรมส่งเสริมการปกครองท้องถิ่น กระทรวงมหาดไทย" },
      { t: "สำนักงบประมาณ และกรมสรรพากร" },
    ],
    groups: [
      { t: "ก. กลุ่มเป้าหมายและประสิทธิผล", qs: ["วิธีการระบุและคัดกรองกลุ่มเป้าหมายแม่นยำเพียงใด และมีกลุ่มตกหล่นในลักษณะใด", "มาตรการช่วยเหลือส่งผลต่ออัตราการคงอยู่และการสำเร็จการศึกษาอย่างไร"] },
      { t: "ข. เด็กปฐมวัยและเด็กนอกระบบ", qs: ["การดูแลเด็กปฐมวัยของผู้ด้อยโอกาสครอบคลุมเพียงใด และการดูแลร่วมกับ อปท. และเอกชนเป็นอย่างไร", "ฐานข้อมูลเด็กนอกระบบสมบูรณ์เพียงใด และมีแนวทางนำกลับเข้าสู่การเรียนรู้อย่างไร"] },
      { t: "ค. เงินให้กู้ยืมและมาตรการทางการคลัง", qs: ["การดำเนินงานตามกฎหมาย กยศ. ที่แก้ไขใหม่มีผลและข้อจำกัดอย่างไร", "มาตรการงบประมาณและภาษีเพื่อลดความเหลื่อมล้ำได้รับการนำไปปฏิบัติเพียงใด"] },
      { t: "ง. การบูรณาการกองทุน", qs: ["กองทุนหลายฉบับมีความซ้ำซ้อนหรือไม่ และมีข้อเสนอแนะการบูรณาการอย่างไร"] },
    ],
  },
];

function renderPlanDomain(d, i) {
  const alt = i % 2 === 0 ? "on-white" : "on-paper";
  const objectives = d.objectives.map(o => `<li>${o}</li>`).join("");
  const issues = d.issues.map(o => `<li>${o}</li>`).join("");
  const agencies = d.agencies.map(a => `<li${a.lead ? ' class="lead"' : ""}>${a.t}${a.lead ? " (หน่วยงานหลัก)" : ""}</li>`).join("");
  const groups = d.groups.map(g => `<div class="qset__group"><b>${g.t}</b><ol>${g.qs.map(q => `<li>${q}</li>`).join("")}</ol></div>`).join("");
  return `<section class="section ${alt}">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">${d.key}</p>
      <h2>${d.name}</h2>
      <p class="plan-rationale">${d.rationale}</p>
    </div>
    <div class="plan-cols">
      <div class="reveal">
        <h3 class="plan-h">วัตถุประสงค์</h3>
        <ul>${objectives}</ul>
        <h3 class="plan-h">ประเด็นพิจารณาศึกษาหลัก</h3>
        <ol class="plan-ol">${issues}</ol>
      </div>
      <aside class="plan-aside reveal" data-delay="1">
        <h3 class="plan-h">หน่วยงานที่ควรเชิญมาชี้แจง</h3>
        <ul class="plan-agencies">${agencies}</ul>
        <details class="qset">
          <summary>ชุดคำถามสำหรับการชี้แจง</summary>
          ${groups}
        </details>
      </aside>
    </div>
  </div>
</section>`;
}

const plan = `
<main id="main">
${pageHero("แผนการพิจารณาศึกษา", "ร่างแผนการพิจารณาศึกษารายด้าน", "แผนปฏิบัติรายด้านทั้งสี่ด้าน พร้อมประเด็นพิจารณาศึกษา หน่วยงานที่ควรเชิญมาชี้แจง และชุดคำถามสำหรับการชี้แจง")}

<section class="section on-paper">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">แนวทางร่วม</p>
      <h2>วิธีการและกรอบเวลาที่ใช้ร่วมกัน</h2>
    </div>
    <div class="plan-cols">
      <div class="reveal">
        <h3 class="plan-h">วิธีการพิจารณาศึกษา</h3>
        <ol class="plan-ol">
          <li>ศึกษาเอกสาร กฎหมาย กฎหมายลำดับรอง สถิติ และงบประมาณที่เกี่ยวข้อง</li>
          <li>เชิญหน่วยงานที่เกี่ยวข้องมาชี้แจงตามชุดคำถามที่กำหนด</li>
          <li>รับฟังความคิดเห็นจากผู้มีส่วนได้เสีย โดยเฉพาะกลุ่มเปราะบาง</li>
          <li>ศึกษาดูงานหรือลงพื้นที่เมื่อจำเป็น</li>
          <li>ศึกษาเปรียบเทียบต่างประเทศและพันธกรณีระหว่างประเทศ (CRC, CRPD, SDG 4)</li>
          <li>จัดทำรายงานผลการพิจารณาศึกษา ข้อสังเกตและข้อเสนอแนะ เสนอผ่านคณะกรรมาธิการ</li>
        </ol>
      </div>
      <div class="reveal" data-delay="1">
        <h3 class="plan-h">กรอบเวลาโดยประมาณ</h3>
        <div class="table-wrap">
          <table class="matrix">
            <thead><tr><th scope="col">ระยะ</th><th scope="col">กิจกรรมหลัก</th></tr></thead>
            <tbody>
              <tr><th scope="row">ระยะ ๑ (เดือน ๑–๒)</th><td data-label="กิจกรรม" style="text-align:left">กำหนดกรอบ รวบรวมเอกสาร เชิญหน่วยงานหลักชี้แจง</td></tr>
              <tr><th scope="row">ระยะ ๒ (เดือน ๓–๕)</th><td data-label="กิจกรรม" style="text-align:left">รับฟังผู้มีส่วนได้เสีย ลงพื้นที่ วิเคราะห์ช่องว่าง</td></tr>
              <tr><th scope="row">ระยะ ๓ (เดือน ๖–๗)</th><td data-label="กิจกรรม" style="text-align:left">ยกร่างข้อสังเกตและข้อเสนอแนะ รับฟังเพิ่มเติม</td></tr>
              <tr><th scope="row">ระยะ ๔ (เดือน ๘)</th><td data-label="กิจกรรม" style="text-align:left">จัดทำรายงานฉบับสมบูรณ์เสนอคณะกรรมาธิการ</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>

${planData.map(renderPlanDomain).join("\n")}

<section class="section on-white">
  <div class="container narrow">
    <div class="section-head reveal">
      <p class="eyebrow">ส่วนที่ ๖</p>
      <h2>ชุดคำถามมาตรฐานสำหรับทุกหน่วยงาน</h2>
    </div>
    <ol class="plan-ol reveal">
      <li>โปรดสรุปภารกิจ อำนาจหน้าที่ และโครงสร้างการดำเนินงานในส่วนที่เกี่ยวข้อง</li>
      <li>งบประมาณและอัตรากำลังในสามปีงบประมาณล่าสุดเพียงพอต่อภารกิจหรือไม่</li>
      <li>ตัวชี้วัดและผลการดำเนินงานที่สำคัญเป็นอย่างไร</li>
      <li>อุปสรรคและข้อจำกัดสำคัญในการปฏิบัติตามกฎหมายและนโยบายมีประการใด</li>
      <li>มีกฎหมาย กฎหมายลำดับรอง หรือระเบียบใดที่ควรปรับปรุงหรือยกร่างเพิ่มเติม</li>
      <li>หน่วยงานมีข้อเสนอแนะเชิงกฎหมาย นโยบาย หรืองบประมาณต่อคณะอนุกรรมาธิการฯ อย่างไร</li>
    </ol>
  </div>
</section>

${opinionBand()}
</main>`;

/* ---------------- assemble ---------------- */
const pages = [
  { file: "index.html", active: "home", title: "คณะอนุกรรมาธิการการส่งเสริมการเรียนรู้ การศึกษาเอกชน การศึกษาพิเศษ และความเท่าเทียมทางการศึกษา · วุฒิสภา", desc: "เว็บไซต์คณะอนุกรรมาธิการฯ วุฒิสภา นำเสนอกรอบขอบเขตการพิจารณาศึกษาด้านการส่งเสริมการเรียนรู้ การศึกษาเอกชน การศึกษาพิเศษ และความเท่าเทียมทางการศึกษา", body: home },
  { file: "about.html", active: "about", title: "เกี่ยวกับคณะฯ · คณะอนุกรรมาธิการการส่งเสริมการเรียนรู้ฯ วุฒิสภา", desc: "ที่มา บทบาท และหน้าที่และอำนาจของคณะอนุกรรมาธิการฯ", body: about },
  { file: "scope.html", active: "scope", title: "กรอบการพิจารณาศึกษา · คณะอนุกรรมาธิการการส่งเสริมการเรียนรู้ฯ วุฒิสภา", desc: "กรอบขอบเขตการพิจารณาศึกษา ฉบับปรับตามคำสั่งแต่งตั้ง สี่ชั้น: ยุทธศาสตร์ เนื้อหาสี่ด้าน ตารางจับคู่ และกระบวนการ", body: scope },
  { file: "plan.html", active: "plan", title: "แผนการพิจารณาศึกษา · คณะอนุกรรมาธิการการส่งเสริมการเรียนรู้ฯ วุฒิสภา", desc: "ร่างแผนการพิจารณาศึกษารายด้านทั้งสี่ด้าน พร้อมประเด็น หน่วยงานที่ควรเชิญมาชี้แจง และชุดคำถามสำหรับการชี้แจง", body: plan },
  { file: "results.html", active: "results", title: "ผลการพิจารณาศึกษา · คณะอนุกรรมาธิการการส่งเสริมการเรียนรู้ฯ วุฒิสภา", desc: "รายงานผลการพิจารณาศึกษา ข้อสังเกต และข้อเสนอแนะของคณะอนุกรรมาธิการฯ", body: results },
  { file: "contact.html", active: "contact", title: "ติดต่อ · คณะอนุกรรมาธิการการส่งเสริมการเรียนรู้ฯ วุฒิสภา", desc: "ติดต่อฝ่ายเลขานุการคณะอนุกรรมาธิการฯ", body: contact },
];

pages.forEach(p => {
  const html = head(p.title, p.desc) + "\n" + header(p.active) + "\n" + p.body + "\n" + footer() + "\n" + tail();
  fs.writeFileSync(path.join(OUT, p.file), html, "utf8");
  console.log("wrote", p.file, html.length, "bytes");
});
