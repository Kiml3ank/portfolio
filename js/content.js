/* =========================================================
   EDIT YOUR CONTENT HERE  (used by every page)
   ========================================================= */
const EMAIL = 'Kimbank258@gmail.com';
const ACCENTS = ['#d42f24', '#2f6fd4', '#1f9a5b', '#8a3fd1'];

/* PROJECTS
   - area:    which work page lists it: 'dev' | 'graphic' | 'photography' | 'barista'
              (every project also appears in "Projects" on the home page)
   - summary: one line on the home-page card   - desc: full text
   - stack:   tools / technologies             - image: e.g. 'images/pos.jpg'
   - link:    GitHub URL ('' = no button)   - demo: live demo URL (optional)
   - logo:    optional logo for the home-page card (shown whole); logoBg = its background colour,
              logoSize = CSS background-size, logoPixel = true for pixel art (keeps it sharp) */
const PROJECTS = [
  {
    area: 'dev', title: 'Multi-branch Restaurant POS', category: 'Web app', year: '2026',
    summary: 'Four connected screens: QR ordering, staff POS, kitchen display and admin.',
    desc: 'A web POS for restaurant and drink chains with several branches. Four screens share one dataset and update in real time (SSE): customers order from a QR code at the table, staff run tables, takeaway, payments, receipts and shifts on the POS, the kitchen display tracks tickets by station, and the admin back office manages menu, staff, promotions, reports with CSV export, an audit log and cross-branch comparison. I designed the database and the backend logic. Newer work adds a demo payment flow, a bill-status QR for guests, self device setup, a serve screen, a tablet POS layout and installing as an app (PWA). Bilingual UI (Vietnamese / English).',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Docker', 'PWA'],
    image: 'images/dev/restaurant-pos.jpg', link: 'https://github.com/Kiml3ank/POS-Restaurant'
  },
  {
    area: 'dev', title: 'DuayChai Station POS', category: 'Web app', year: '2026',
    summary: 'Tablet & phone ordering app for a Lao coffee shop: try the live demo (PIN 1234).',
    desc: 'A staff ordering app for DuayChai Station, a coffee shop in Laos, for tablet and phone. Staff sign in with a PIN, browse drinks by category or search, customise each drink (temperature, size, sweetness, milk, extra shots, notes) with the price updating live, and build a dine-in or takeaway order. Checkout takes cash (quick amounts, keypad, live change), card or LaoQR. Lao interface, kip with 10% VAT included, installable as a PWA. Live demo: pick a name and enter PIN 1234.',
    stack: ['JavaScript', 'HTML / CSS', 'PWA', 'Responsive UI', 'Lao localisation'],
    image: 'images/dev/duaychai-pos.jpg',
    logo: 'images/dev/duaychai-logo.png',   // home-page card shows the shop logo
    demo: 'https://kiml3ank.github.io/DuayChai-Station-POS/',
    link: 'https://github.com/Kiml3ank/DuayChai-Station-POS'
  },
  {
    area: 'dev', title: 'LaoRum ERP', category: 'ERP system', year: '2026',
    summary: 'Restaurant ERP in Lao & English: POS, recipe costing, inventory and purchasing, offline on one PC.',
    desc: 'A single-restaurant ERP in Lao and English that runs on one PC with no internet; staff use it from any browser on the shop Wi-Fi. It covers POS (cash, card, QR), menu and recipes with recipe cost and food-cost %, inventory where stock falls by the recipe when an order is paid, waste, staff meals and stock counts with reasons, and purchasing with approval and goods receiving. Stock is always the sum of recorded movements, never typed over. CSV exports for Excel, daily backups, and acceptance tests for every business rule (T1–T8).',
    stack: ['Node.js', 'SQLite', 'JavaScript', 'HTML / CSS', 'Lao / English i18n', 'Automated tests'],
    image: 'images/dev/laorum-erp-pos.jpg',
    link: 'https://github.com/Kiml3ank/LaoRum-ERP'
  },
  {
    area: 'dev', title: 'Livora — Dormitory Management System', category: 'Web app', year: '',
    summary: 'Dormitory management: rooms, bookings, payments and announcements.',
    desc: 'A dormitory management system designed as a project. I planned the features for rooms, bookings, payments, maintenance and announcements, and worked on the system structure and database design.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    image: '', link: ''
  },
  {
    area: 'dev', title: 'Daily Car-Sales Report Automation', category: 'Automation', year: '2026',
    summary: 'Turns raw ERP exports into the daily sales workbook, with a QC report.',
    desc: 'Python automation built for daily brand reporting. One script exports the day\'s sale, order and stock reports from the ERP (query and export only, with a safety stop). A second script recognises each file, cleans and maps the rows to the right sheet by maker, applies them to a copy of the main workbook and writes a QC report with a checklist of missing or unexpected data. The original workbook is never changed. Everything runs from Diana, an 8-bit desktop assistant I built: one click to download, build and check the day’s report.',
    stack: ['Python', 'openpyxl', 'xlrd', 'Excel', 'Windows automation'],
    logo: 'images/dev/diana.png', logoBg: '#fbe3ec', logoSize: 'auto 78%', logoPixel: true,   // Diana, the report bot
    // Link hidden on purpose: this repo's history contains company Excel data. Add
    // 'https://github.com/Kiml3ank/Auto-report-sale' back only after that data is removed.
    image: '', link: ''
  },
  {
    area: 'dev', title: 'ExpenseAI — Expense Tracker Backend', category: 'Backend API', year: '2026',
    summary: 'Expense-assistant API with auth, transactions, budgets and reports.',
    desc: 'The backend for a conversational expense assistant for Vietnamese users. It provides authentication, user management, transactions, categories, budgets and reporting, with a layered architecture (routes, services, repositories). The user ID always comes from the JWT, so each user\'s data stays isolated by design. Migrations run automatically in Docker, and the code is covered by pytest tests.',
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'PostgreSQL', 'JWT', 'pytest', 'Docker'],
    image: '', link: 'https://github.com/Kiml3ank/Co-Chi'
  },
  {
    area: 'dev', title: 'POS System (Django)', category: 'Web app', year: '2025',
    summary: 'Point-of-sale with products, orders, accounts and printable reports.',
    desc: 'A point-of-sale web application built with Django, organised into apps for accounts, products, orders, the POS screen and reports. It includes a REST API, PDF output and Excel export for reports.',
    stack: ['Python', 'Django', 'Django REST Framework', 'HTML / CSS', 'ReportLab', 'openpyxl'],
    image: '', link: 'https://github.com/Kiml3ank/POS'
  },
  {
    area: 'photography', title: 'Student Council Event Photography', category: 'Photography', year: '2023–2026',
    summary: 'University activities, events and student programmes.',
    desc: 'Photographs of university activities and events, taken for the Quang Binh University student council media team.',
    stack: ['Photography', 'Lightroom', 'Photoshop'], image: '', link: ''
  },
  {
    area: 'graphic', title: 'Student Council Social Media Design', category: 'Graphic design', year: '2023–2026',
    summary: 'Graphics and posts for the student council Facebook page.',
    desc: 'Graphics and posts designed for the Quang Binh University student council Facebook page, plus content prepared with the team for students.',
    stack: ['Photoshop', 'Illustrator', 'Canva'], image: 'images/graphic/national-day-league-key-visual.jpg', link: 'graphic.html'
  }
];

/* GALLERY — pictures for the work pages.
   Add your image files to the "images" folder and put the path in image: 'images/xxx.jpg'.
   Tiles without an image show "[ADD IMAGE]". Add or remove items freely. */
const GALLERY = {
  // Lao Student Council, Quang Binh University — https://www.facebook.com/laostudentinquangbinhuniversity
  // category: series name · w / h: image size (keeps the masonry layout from jumping while images load)
  graphic: [
    { category: 'National Day Sports League', title: 'Key visual', note: 'Main banner for the Lao National Day Sports League (20 Oct – 3 Nov), held at Luxe Stadium and Quang Binh University.', image: 'images/graphic/national-day-league-key-visual.jpg', w: 1024, h: 576 },
    { category: 'National Day Sports League', title: 'Match schedule', note: 'Fixture graphic for the league: team match-ups with the referee team for each game.', image: 'images/graphic/national-day-league-schedule.jpg', w: 1600, h: 900 },
    { category: 'National Day Sports League', title: 'Full-time score', note: 'Result post: K63 + K64 vs YT A, 0–2.', image: 'images/graphic/national-day-league-full-time.jpg', w: 768, h: 1024 },
    { category: 'National Day Sports League', title: 'Match-up · 8 Nov 2025', note: 'Sport event match-up post for the men’s and women’s football games on 8 November 2025.', image: 'images/graphic/sport-event-match-up.jpg', w: 1600, h: 800 },
    { category: 'National Day Sports League', title: 'Match score · 8 Nov 2025', note: 'Score post with goal scorers: K67 8–5 YT, combined with a photo from the match.', image: 'images/graphic/sport-event-match-score.jpg', w: 1600, h: 800 },
    { category: 'National Day Sports League', title: 'Volleyball final', note: 'Final match announcement: K67 vs YT, at the Quang Binh University sports hall.', image: 'images/graphic/volleyball-final.jpg', w: 1080, h: 1350 },
    { category: 'Pi Mai Lao', title: 'Pi Mai Lao Football League', note: 'Tournament poster for the Lao New Year football league, with traditional Lao motifs.', image: 'images/graphic/pimailao-football-league.jpg', w: 896, h: 1088 },
    { category: 'Lao New Year 2025', title: 'Happy Lao New Year 2025', note: 'Main greeting banner for Lao New Year 2025, mixing Quang Binh and Vientiane landmarks with student portraits.', image: 'images/graphic/lao-new-year-2025-banner.jpg', w: 1600, h: 1005 },
    { category: 'Lao New Year 2025', title: 'New Year portrait frame I', note: 'Portrait frame from the Lao New Year greeting series.', image: 'images/graphic/lao-new-year-portrait-1.jpg', w: 1200, h: 1600 },
    { category: 'Lao New Year 2025', title: 'New Year portrait frame II', note: 'Portrait frame from the Lao New Year greeting series.', image: 'images/graphic/lao-new-year-portrait-2.jpg', w: 1200, h: 1600 },
    { category: 'Lao New Year 2025', title: 'New Year portrait frame III', note: 'Portrait frame from the Lao New Year greeting series.', image: 'images/graphic/lao-new-year-portrait-3.jpg', w: 1200, h: 1600 },
    { category: 'Lao New Year 2025', title: 'New Year portrait frame IV', note: 'Portrait frame from the Lao New Year greeting series.', image: 'images/graphic/lao-new-year-portrait-4.jpg', w: 1200, h: 1600 },
    { category: 'Events', title: 'Welcome K18', note: 'Welcome event banner for the new K18 students of the Vietnamese language group.', image: 'images/graphic/welcome-k18.jpg', w: 1600, h: 800 },
    { category: 'Events', title: 'Lao Women’s Union · 70 years', note: 'Post for the 70th anniversary of the founding of the Lao Women’s Union (20 July).', image: 'images/graphic/lao-womens-union-70-years.jpg', w: 1200, h: 1200 }
  ],
  photography: [
    { title: '[Photo title]', note: '[University event · year]', image: '' },
    { title: '[Photo title]', note: '[Student programme · year]', image: '' },
    { title: '[Photo title]', note: '[Activity · year]', image: '' },
    { title: '[Photo title]', note: '[Portrait / people · year]', image: '' },
    { title: '[Photo title]', note: '[Place · year]', image: '' },
    { title: '[Photo title]', note: '[Event · year]', image: '' }
  ],
  barista: [
    { title: '[Drink photo]', note: '[Café name · year]', image: '' },
    { title: '[Drink photo]', note: '[Latte art / coffee]', image: '' },
    { title: '[Drink photo]', note: '[Signature drink]', image: '' },
    { title: '[Bar photo]', note: '[Behind the bar]', image: '' }
  ]
};
