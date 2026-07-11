export const profile = {
  name: 'Ananya Patel',
  role: 'Full Stack Developer',
  location: 'Gujarat, India',
  headline: 'I build production web applications end to end.',
  intro:
    'From multi-role hospital platforms to donation systems handling real money, I design the database, write the API, and ship the interface. Mostly JavaScript, PostgreSQL, and whatever the problem actually needs.',
  // Email and phone deliberately live encoded in utils/contact.js, never as plain text here.
  linkedin:
    'https://www.linkedin.com/in/ananya-patel-1a61a82b3?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  github: 'https://github.com/ananyatech2006/',
  photo: '/digital_portfolio/ananya.png',
  resume: 'https://drive.google.com/file/d/1_BAl0pgdeWHsNPbEVPym5AgzWwvIhLSX/view?usp=sharing',
};

export const skillGroups = [
  {
    title: 'Languages',
    items: ['JavaScript (ES6+)', 'SQL', 'HTML5', 'CSS3', 'JSX'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Material UI', 'Framer Motion'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'MVC Architecture', 'Repository Pattern'],
  },
  {
    title: 'Database',
    items: ['PostgreSQL', 'Schema Design', 'Connection Pooling', 'SQL Migrations'],
  },
  {
    title: 'Auth & Security',
    items: ['JWT', 'bcrypt', 'Email OTP', 'Helmet', 'CORS Allowlists', 'Rate Limiting'],
  },
  {
    title: 'Integrations & Tooling',
    items: ['Razorpay', 'Nodemailer', 'AWS SES', 'pdf-lib', 'jsPDF', 'Multer', 'Vercel', 'Git'],
  },
];

export const projects = [
  {
    id: 'hospital',
    mark: 'SD',
    logo: '/digital_portfolio/logos/superspeciality-doctor-consultation.png',
    screenshots: ['/digital_portfolio/Superspeciality Doctor Consultation.png', '/digital_portfolio/Superspeciality Doctor Login.png'],
    name: 'Superspeciality Doctors Consultation',
    tagline: 'Four-role hospital platform with OTP login and online payments',
    status: 'live',
    summary:
      'A hospital management platform serving four distinct roles — Patient, Doctor, Receptionist and Admin — with passwordless email OTP login, department-wise appointment booking, Razorpay consultation payments, and printable PDF receipts.',
    details: [
      {
        title: 'Authentication & Security',
        items: [
          'Passwordless login using 6-digit email OTPs delivered through Nodemailer.',
          'Hand-crafted JSON Web Tokens signed with the Node crypto module to protect every REST endpoint.',
          'A unified login screen that resolves the user\'s role and redirects to the matching dashboard.',
          'Passwords for staff accounts hashed with bcrypt.',
        ],
      },
      {
        title: 'Patient Portal',
        items: [
          'Browse departments, check live doctor availability, and book a consultation slot.',
          'Pay consultation fees online through the Razorpay payment gateway.',
          'Download PDF receipts and prescription records generated with jsPDF and jspdf-autotable.',
          'Rate and review doctors once an appointment is completed.',
        ],
      },
      {
        title: 'Doctor Dashboard',
        items: [
          'Work the appointment queue, review consultation slots, and read patient-submitted symptoms.',
          'Maintain the specialty profile and track accumulated patient ratings.',
          'New doctor registrations land in a pending-approval queue rather than going live immediately.',
        ],
      },
      {
        title: 'Receptionist Dashboard',
        items: [
          'Book and manage walk-in and offline patient appointments.',
          'Reschedule appointments and resolve slot conflicts against the doctor schedule.',
        ],
      },
      {
        title: 'Admin Panel',
        items: [
          'Approve pending doctor registrations and activate or deactivate medical staff.',
          'Provision new system users such as receptionists and additional administrators.',
          'Manage the department catalogue and read visitor contact messages.',
        ],
      },
      {
        title: 'Data Model',
        items: [
          'PostgreSQL schema across 11 tables: users, doctors, doctor_requests, patients, appointments, schedules, departments, otps, contact_messages, doctor_reviews and notifications.',
          'The hospital_management database self-provisions on first local start, seeded with 10 default departments including Cardiology, Neurology, Pediatrics and Gynecology.',
        ],
      },
    ],
    stack: [
      'Node.js',
      'Express',
      'PostgreSQL',
      'React',
      'Vite',
      'Tailwind CSS',
      'JWT',
      'Razorpay',
      'Nodemailer',
      'bcrypt',
      'jsPDF',
      'Vercel',
    ],
    links: {
      live: 'https://hospital-website-plum-six.vercel.app/index.html',
      source: 'https://github.com/ananyatech2006/hospital-website',
    },
  },
  {
    id: 'donation',
    mark: 'VA',
    logo: '/digital_portfolio/logos/va-donation.png',
    screenshots: ['/digital_portfolio/VA Donation.png', '/digital_portfolio/VA Donation Login.png'],
    name: 'Vallabh Aashram Donation System',
    tagline: 'Trust donation receipts with race-safe fiscal numbering',
    status: 'live',
    summary:
      'A donation management system for charitable trusts. Its defining constraint: receipt numbers must restart at 1 for every financial year and every trust, and must never collide — solved with a server-side mutex around the numbering transaction.',
    details: [
      {
        title: 'Receipts & Fiscal Sequencing',
        items: [
          'Receipt numbers auto-generate per unique (Financial Year, Trust) pair, restarting at 1 each year.',
          'An asynchronous mutex lock serialises the numbering step so concurrent entries cannot claim the same number.',
          'Full create, read, update and delete coverage across every donation record.',
        ],
      },
      {
        title: 'Dynamic PDF Generation',
        items: [
          'Coordinate-calibrated PDFs rendered on the fly with pdf-lib.',
          'Standardised donation receipts with automated formatting.',
          'Dynamic cover letters addressed to individual donors.',
          'Multi-page thank-you letter bundles, print-ready in one pass.',
        ],
      },
      {
        title: 'Master Modules',
        items: [
          'Dashboard surfacing donation statistics, activity logs and system summaries.',
          'Donor master with full CRUD and supporting document uploads (Aadhaar, PAN).',
          'Trust master supporting multiple trusts — for example Shree Vallabh Gaushala Trust — each with its own logo.',
          'Remark master storing predefined remarks to speed up receipt entry.',
        ],
      },
      {
        title: 'Architecture',
        items: [
          'A repository pattern lets the storage engine swap at runtime through the REPO_DRIVER environment variable.',
          'JSON file storage backs local development; PostgreSQL backs production.',
          'JWT authentication for admin roles, with Multer middleware restricting and processing uploads.',
        ],
      },
    ],
    stack: [
      'React 18',
      'Vite',
      'Material UI',
      'Node.js',
      'Express',
      'PostgreSQL',
      'JWT',
      'pdf-lib',
      'Multer',
    ],
    links: {
      live: 'https://vadonation.nmediasoft.com/login',
      source: 'https://github.com/ananyatech2006/donation-management-system',
    },
  },
  {
    id: 'hostel-erp',
    mark: 'HE',
    logo: '/digital_portfolio/logos/hostel-erp.png',
    screenshots: ['/digital_portfolio/Hostel ERP Login.png', '/digital_portfolio/Hostel ERP Dashboard.png'],
    name: 'Hostel ERP',
    tagline: 'Multi-tenant hostel operations, from admission to invoice',
    status: 'wip',
    summary:
      'A multi-tenant ERP where a Super Admin onboards and approves hostels, and each Hostel Admin runs rooms, beds, admissions, staff, mess and billing for their own property. Currently in active development.',
    details: [
      {
        title: 'Multi-Tenant Architecture',
        items: [
          'Super Admin manages registered hostels, reviews new registrations, and controls the master directory.',
          'Hostel Admin scopes to a single property: rooms, bed allocation, admissions, staff, daily expenses, mess operations and invoices.',
        ],
      },
      {
        title: 'Self-Registration Flow',
        items: [
          'Public sign-up screen with a time-of-day theme that shifts across Morning, Afternoon, Evening and Night.',
          'Secure OTP email verification over AWS SES SMTP via Nodemailer.',
          'Submissions enter a pending state and wait on Super Admin review before activation.',
        ],
      },
      {
        title: 'Admissions & Invoicing',
        items: [
          'Wizard-driven student admission mapping room categories, prices, deposits and mess plan subscriptions.',
          'Automatic monthly recurring invoice generation with full billing history ledgers.',
        ],
      },
      {
        title: 'Operators & Roles',
        items: [
          'Dedicated users screen for adding operators with Aadhaar uploads and live camera photo capture.',
          'Role mapping that binds each operator to a custom permission set.',
        ],
      },
    ],
    stack: [
      'Next.js 15',
      'React',
      'PostgreSQL',
      'Vanilla CSS',
      'AWS SES',
      'Nodemailer',
      'API Routes',
    ],
    links: {},
  },
  {
    id: 'dcms',
    mark: 'DC',
    logo: '/digital_portfolio/Doctor Clinic Management System.jpeg',
    screenshots: ['/digital_portfolio/Doctor Clinic Login.png', '/digital_portfolio/Doctor Clinic Dashboard.png'],
    name: 'Doctor Clinic Management System',
    tagline: 'OPD to IPD to printed prescription, on a clinical letterhead',
    status: 'wip',
    summary:
      'A single-clinic, single-doctor system modelling the real clinical workflow: Receptionist registers, Medical Officer captures vitals, Doctor consults, and the prescription prints onto the clinic\'s own letterhead. Includes an inpatient ward module and regulatory 3C registers. Currently in active development.',
    details: [
      {
        title: 'Roles & Workflow',
        items: [
          'Receptionist registers new patients or logs an "Old Case", and takes the initial payment.',
          'Medical Officer prescreens the queue and records weight, pulse, SpO2 and blood pressure with complaint duration.',
          'Doctor reviews history, examines, diagnoses, prescribes, and schedules the follow-up.',
          'Admin — the doctor — controls configuration, user creation, settings and print setup.',
        ],
      },
      {
        title: 'OPD Flow',
        items: [
          'Unique patient codes on registration plus a sequential global case number per financial year.',
          'Disease-specific prescription templates that auto-fill medicines for a known diagnosis.',
          'Treatment plan mapping, dictated medical advice, and follow-up scheduling.',
        ],
      },
      {
        title: 'IPD Flow',
        items: [
          'Ward and bed management tracking FREE, OCCUPIED and UNDER_MAINTENANCE states across General and Private wards.',
          'Admission direct from an OPD visit, with admission diagnosis capture and discharge processing.',
          'Indoor observation sheet: a daily grid logging vitals four times a day (10 AM, 4 PM, 10 PM, 6 AM), steam and chest physiotherapy counts, and active medication orders.',
        ],
      },
      {
        title: 'Billing & Registers',
        items: [
          'A bill is created automatically for every OPD and IPD visit.',
          'Service names and prices are snapshotted at transaction time, so later master-data price changes never rewrite financial history.',
          '3C OPD register tracking daily receipts with override capability.',
          '3C IPD register tracking monthly records, sequential registration numbers (NN/MM-YY), receipt numbers and discharge tallies.',
        ],
      },
      {
        title: 'Printing & Audit',
        items: [
          'Upload a single-page PDF clinical letterhead; prescriptions overlay onto it at configured coordinates via pdf-lib.',
          'Falls back to a clean standard A4 prescription page when no template is uploaded.',
          'Patient scans and records (PDF, JPG, PNG under 10MB) stored through validated file-upload middleware.',
          'Audit trail logging every mutation, login and logout against user ID and IP address.',
        ],
      },
      {
        title: 'Data Model',
        items: [
          'Normalised PostgreSQL schema driven through the native pg client with no ORM, for direct control over query performance.',
          'Master registers for languages, villages, referrals, known diseases, advice, examinations, complaints, investigations, medicines, plans and services.',
          'Core tables spanning users, patients, patient_visits, wards, beds, admissions, indoor_sheet_days, bills, bill_services, audit_logs, reports and reminders.',
        ],
      },
    ],
    stack: [
      'React',
      'Vite',
      'Material UI',
      'Node.js',
      'Express',
      'PostgreSQL',
      'pdf-lib',
      'JWT',
      'bcrypt',
      'Helmet',
    ],
    links: {
      source: 'https://github.com/ananyatech2006/hospital_management_papa',
    },
  },
];
