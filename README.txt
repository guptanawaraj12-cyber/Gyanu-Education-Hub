╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║                      GYANU NOTES - COMPLETE SETUP GUIDE                       ║
║                          Free Study Notes Website                             ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝

📋 TABLE OF CONTENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. File Structure Overview
2. Quick Setup (5 Minutes)
3. Firebase Setup (10 Minutes)
4. Web3Forms Setup (2 Minutes)
5. Adding Your Logo
6. Creating Notes / Chapters
7. Customizing Content
8. Deploying to Web Hosting
9. Troubleshooting
10. Maintenance Guide


📁 1. FILE STRUCTURE OVERVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

gyanu-notes/
│
├── index.html                 ← Homepage (edit this)
├── notes.html                 ← Notes listing page
├── contact.html               ← Contact page
├── about.html                 ← About page
├── login.html                 ← Login page
├── dashboard.html             ← Student dashboard
├── settings.html              ← Settings page
│
├── css/
│   ├── style.css              ← Main styles (colors, layout)
│   ├── dark-mode.css          ← Dark theme styles
│   ├── responsive.css         ← Mobile responsive
│   └── animations.css         ← Button animations
│
├── js/
│   ├── firebase-config.js     ← 🔑 Firebase keys (YOU MUST EDIT)
│   ├── main.js                ← Core functions
│   ├── auth.js                ← Login/signup
│   ├── dashboard.js           ← Dashboard features
│   ├── settings.js            ← Settings page
│   ├── notes.js               ← Notes search/filter
│   └── contact.js             ← Contact form
│
├── images/
│   └── logo.png               ← 📷 YOUR LOGO HERE
│
├── notes/                     ← All chapter notes
│   ├── class8/
│   ├── class9/
│   ├── class10/
│   ├── class11/
│   └── class12/
│
├── pdfs/                      ← PDF files for download
│
├── templates/
│   └── chapter-template.html  ← Copy for new chapters
│
└── README.txt                 ← This file


⚡ 2. QUICK SETUP (5 Minutes)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 1: Extract Files
├── Download and extract the zip file
├── Place all files in your website folder

Step 2: Add Your Logo
├── Go to images/ folder
├── Replace logo.png with your own logo
├── Recommended size: 45x45 pixels (PNG format)

Step 3: Test Locally
├── Open index.html in your browser
├── Check if everything looks correct
├── Test mobile view (F12 → Device Toolbar)

Step 4: Deploy
├── Upload all files to your web host
├── Or use free hosting: Netlify, Vercel, GitHub Pages


🔥 3. FIREBASE SETUP (10 Minutes) - REQUIRED FOR LOGIN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 1: Create Firebase Project
├── Go to https://console.firebase.google.com/
├── Click "Create a project"
├── Name: "Gyanu Notes"
├── Disable Google Analytics (optional)
├── Click "Create project"

Step 2: Register Web App
├── Click the web icon (</>)
├── Name: "Gyanu Notes Web"
├── Click "Register app"

Step 3: Get Firebase Config
├── Copy the firebaseConfig object
├── It looks like this:
│
│   const firebaseConfig = {
│     apiKey: "AIzaSy...",
│     authDomain: "gyanu-notes.firebaseapp.com",
│     projectId: "gyanu-notes",
│     storageBucket: "gyanu-notes.appspot.com",
│     messagingSenderId: "123456789",
│     appId: "1:123456789:web:abc123"
│   };
│
└── PASTE THIS INTO js/firebase-config.js

Step 4: Enable Authentication
├── In Firebase Console, click "Authentication"
├── Click "Get started"
├── Enable "Email/Password" sign-in
├── Enable "Google" sign-in (click save)
└── Add your email as test user (optional)

Step 5: Create Firestore Database
├── Click "Firestore Database"
├── Click "Create database"
├── Start in test mode (for development)
├── Choose location: asia-south1 (Mumbai - closest to Nepal)
└── Click "Enable"

✅ Firebase is now ready!


📧 4. WEB3FORMS SETUP (2 Minutes) - FOR CONTACT FORM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 1: Get Free API Key
├── Go to https://web3forms.com/
├── Click "Get Access Key for Free"
├── Enter your email: gyanunotes@gmail.com
├── Check your email for the access key

Step 2: Add Key to Website
├── Open js/contact.js
├── Find: const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE"
└── Replace with your actual access key

Step 3: Set Email Forwarding (Optional)
├── Login to Web3Forms dashboard
├── Add your email to receive form submissions
└── You'll get emails when students contact you

✅ Contact form is now working!


🖼️ 5. ADDING YOUR LOGO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Option A: Replace existing logo
├── Open images/logo.png
├── Replace with your logo
└── Keep the same filename

Option B: Use different logo format
├── Upload your logo (e.g., mylogo.jpg)
├── Open index.html and all HTML files
├── Find: src="images/logo.png"
└── Change to: src="images/mylogo.jpg"

Recommended Logo Size: 45x45 pixels (PNG with transparency)
Background: Transparent preferred


📝 6. CREATING NOTES / CHAPTERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Method: Using Chapter Template (Recommended)

Step 1: Copy Template
├── Go to templates/chapter-template.html
├── Copy the file

Step 2: Rename and Place
├── Example for Class 10 Science Chapter 1:
├── Rename to: notes/class10/science/ch1.html

Step 3: Edit the Content
├── Open the file in any text editor
├── Replace all [PLACEHOLDER] values:
│
│   [CHAPTER TITLE] → Chemical Reactions and Equations
│   [CLASS NAME] → Class 10
│   [CLASS_KEY] → class10
│   [SUBJECT NAME] → Science
│   [SUBJECT_KEY] → science
│   [CHAPTER_ID] → ch1
│
├── Add your actual notes content
├── Add practice questions
└── Save the file

Step 4: Add PDF (Optional)
├── Place PDF in: pdfs/class10/science/ch1.pdf
└── Update PDF link in the chapter page

Step 5: Repeat for all chapters
├── Class 10 Science: 15 chapters
├── Class 10 Math: 15 chapters
└── Follow same pattern for other classes

Quick Chapter Creation Workflow:
├── 1. Copy template (2 seconds)
├── 2. Rename file (5 seconds)
├── 3. Replace placeholders (30 seconds)
├── 4. Add content (10-30 minutes)
└── 5. Upload PDF (1 minute)


🎨 7. CUSTOMIZING CONTENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A. Change Website Colors
├── Open css/style.css
├── Find all #2E7D32 (green color)
├── Replace with your preferred color
├── Examples: #1B5E20 (dark green), #1565C0 (blue)

B. Change Fonts
├── Open css/style.css
├── Find: font-family: 'Poppins', sans-serif;
├── Change to your preferred font
├── Add Google Fonts link in HTML files

C. Update Footer Social Links
├── Open index.html (and all HTML files)
├── Find the social-links section
├── Replace href URLs with your social media links

D. Update Contact Information
├── Open index.html, contact.html
├── Find email, phone, address
└── Update with your information

E. Change Site Name
├── Open all HTML files
├── Find: <span class="site-name">Gyanu Notes</span>
└── Change to your website name


🚀 8. DEPLOYING TO WEB HOSTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Option 1: Netlify (Free - Recommended)
├── Go to https://netlify.com
├── Drag and drop your entire gyanu-notes folder
├── Your site is live at: your-site-name.netlify.app
└── Can connect custom domain for free

Option 2: Vercel (Free)
├── Go to https://vercel.com
├── Import your project from folder
├── Deploy with one click
└── Get free SSL and CDN

Option 3: GitHub Pages (Free)
├── Upload files to GitHub repository
├── Go to Settings → Pages
├── Select branch: main
├── Your site at: username.github.io/repository-name

Option 4: PythonAnywhere (For Python backend)
├── Not needed for static version
└── Only if adding Python backend later

Option 5: Your Own Hosting (Paid)
├── Upload via FTP (FileZilla)
├── or cPanel File Manager
└── Ensure index.html is in root folder


🔧 9. TROUBLESHOOTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Issue 1: Login not working
├── Check Firebase config in js/firebase-config.js
├── Verify Authentication is enabled in Firebase Console
└── Check console for errors (F12 → Console)

Issue 2: Contact form not sending emails
├── Verify Web3Forms access key is correct
├── Check if you're online (localhost may not work)
├── Deploy to test contact form
└── Check spam folder for emails

Issue 3: Images not showing
├── Check file path (case sensitive)
├── Ensure images are in images/ folder
└── Check image name matches (logo.png vs LOGO.png)

Issue 4: Dark mode not saving
├── Check localStorage is enabled in browser
├── Clear browser cache
└── Test in incognito mode

Issue 5: Mobile menu not working
├── Check hamburger icon is visible
├── Verify js/main.js is loaded
└── Check console for JavaScript errors

Issue 6: Notes search not finding chapters
├── Update notesData in js/notes.js
├── Add your chapters to the data structure
└── Ensure class/subject keys match folders

Issue 7: Firebase "quota exceeded" error
├── Free tier: 50k users/month
├── Check usage in Firebase Console
├── Upgrade if needed (rare for starting)

Issue 8: PDF download not working
├── Check PDF file exists in pdfs/ folder
├── Verify file path is correct
└── Ensure PDF is not corrupted


📅 10. MAINTENANCE GUIDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Daily Tasks (5 minutes)
├── Check contact form submissions
├── Reply to student questions
└── Update "What's New" section on homepage

Weekly Tasks (15 minutes)
├── Add 1-2 new chapters
├── Update featured notes
├── Check all links working
└── Backup your files

Monthly Tasks (30 minutes)
├── Review analytics (if added)
├── Update study tips section
├── Add new practice questions
├── Check Firebase usage
└── Update copyright year if needed

Adding New Chapter (Quick Checklist)
├── □ Copy chapter-template.html
├── □ Rename to correct folder
├── □ Replace all placeholders
├── □ Add notes content
├── □ Add practice questions
├── □ Upload PDF (if available)
├── □ Test chapter page in browser
└── □ Update notesData in js/notes.js

Updating Homepage Sections
├── Updates: Edit index.html → updates section
├── Featured Notes: Edit index.html → featured-notes section
├── Study Tips: Edit index.html → study-tips section
├── Testimonials: Edit index.html → testimonials section
└── FAQ: Edit index.html → faq-section


🆘 NEED HELP?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Common Commands to Remember:
├── Local testing: Open index.html in browser
├── Clear cache: Ctrl + Shift + R (Windows) or Cmd + Shift + R (Mac)
├── Open console: F12 → Console tab
├── View mobile: F12 → Toggle Device Toolbar (Ctrl + Shift + M)

Support Resources:
├── Firebase Docs: https://firebase.google.com/docs
├── Web3Forms Help: https://web3forms.com/help
├── MDN Web Docs: https://developer.mozilla.org
└── W3Schools: https://w3schools.com

Contact Developer:
├── Email: gyanunotes@gmail.com
└── Response time: Within 24 hours


✅ FINAL CHECKLIST BEFORE LAUNCH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

□ All HTML files updated with correct information
□ Firebase config added to firebase-config.js
□ Web3Forms API key added to contact.js
□ Logo added to images/logo.png
□ At least 5-10 chapters created
□ Tested on Chrome, Firefox, Safari
□ Tested on mobile phone
□ Dark mode works
□ Contact form sends emails
□ Login/Signup works
□ Dashboard shows user data
□ All links work
□ Social media links updated
□ Copyright year is 2026
□ Files uploaded to hosting
□ Custom domain connected (optional)

═══════════════════════════════════════════════════════════════════════════════

🎉 CONGRATULATIONS! Your Gyanu Notes website is ready!

Your students can now access free study notes at your website URL.
Keep adding more notes and helping students succeed!

Made with ❤️ for students in Nepal and around the world.

═══════════════════════════════════════════════════════════════════════════════