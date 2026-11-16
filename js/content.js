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
   - link:    GitHub / live URL ('' = no button) */
const PROJECTS = [
  {
    area: 'dev', title: 'Multi-branch Restaurant POS', category: 'Web app', year: '2026',
    summary: 'Four connected screens: QR ordering, staff POS, kitchen display and admin.',
    desc: 'A web POS for restaurant and drink chains with several branches. Four screens share one dataset and update in real time (SSE): customers order from a QR code at the table, staff run tables, takeaway, payments, receipts and shifts on the POS, the kitchen display tracks tickets by station, and the admin back office manages menu, staff, promotions, reports with CSV export, an audit log and cross-branch comparison. I designed the database and the backend logic. Bilingual UI (Vietnamese / English).',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Docker'],
    image: '', link: 'https://github.com/Kiml3ank/POS-Restaurant'
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
    desc: 'Python automation built for daily brand reporting. One script exports the day\'s sale, order and stock reports from the ERP (query and export only, with a safety stop). A second script recognises each file, cleans and maps the rows to the right sheet by maker, applies them to a copy of the main workbook and writes a QC report with a checklist of missing or unexpected data. The original workbook is never changed.',
    stack: ['Python', 'openpyxl', 'xlrd', 'Excel', 'Windows automation'],
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
    stack: ['Photoshop', 'Illustrator', 'Canva'], image: '', link: ''
  }
];

/* GALLERY — pictures for the work pages.
   Add your image files to the "images" folder and put the path in image: 'images/xxx.jpg'.
   Tiles without an image show "[ADD IMAGE]". Add or remove items freely. */
const GALLERY = {
  graphic: [
    { title: '[Design title]', note: '[Student Council Facebook post · year]', image: '' },
    { title: '[Design title]', note: '[Event poster · year]', image: '' },
    { title: '[Design title]', note: '[Announcement graphic · year]', image: '' },
    { title: '[Design title]', note: '[Social media banner · year]', image: '' },
    { title: '[Design title]', note: '[Promotional material · year]', image: '' },
    { title: '[Design title]', note: '[Where it was used · year]', image: '' }
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
