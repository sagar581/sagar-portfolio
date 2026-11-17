// Everything the site says lives in this one file.
// Edit text here; you should not need to touch the components.

import slHome from './assets/sl-home.webp'
import slFocus from './assets/sl-focus.webp'
import slVideos from './assets/sl-videos.webp'
import slIcon from './assets/sl-icon.webp'

export const person = {
  name: 'Sagar Chaudhari',
  role: 'Senior SDE, Android',
  company: 'Indiabulls Securities',
  city: 'Gurugram',
  // Preferred work locations, in order of preference.
  openTo: ['Bangalore', 'Pune', 'Hyderabad', 'Mumbai', 'Gurugram', 'Noida', 'Delhi', 'Ahmedabad'],
  headline: 'I build the Android screens money moves through.',
  intro:
    'Senior SDE at Indiabulls Securities in Gurugram. UPI flows, payment integrations and app security in Kotlin and Flutter, plus backend in Java and Spring Boot.',
  email: 'sbchaudhari581@gmail.com',
  links: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sagar-chaudhari-588864208' },
    { label: 'GitHub', url: 'https://github.com/sagar581' },
    { label: 'CodeChef', url: 'https://www.codechef.com/users/checking' },
  ],
}

// Scrolls across the top of the first screen.
export const ticker = [
  'Kotlin', 'Jetpack Compose', 'UPI Lite', 'Juspay HyperSDK', 'Flutter', 'Spring Boot', 'Play Integrity',
  'Razorpay', 'Firebase Crashlytics', 'Bitrise CI/CD', 'SSL pinning', 'KMM', 'Python', '4 stars on CodeChef', 'Live on Google Play',
]

// The languages in the order I met them. Typed out in the About section.
export const hello = [
  { lang: 'C', code: 'printf("Hello, DA-IICT");' },
  { lang: 'C++', code: 'cout << "Hello, contests";' },
  { lang: 'Python', code: 'print("Hello, CodeChef")' },
  { lang: 'Kotlin', code: 'Text("Hello, Android")' },
  { lang: 'Dart', code: "Text('Hello, Flutter')" },
  { lang: 'Java', code: 'return "Hello, Spring Boot";' },
]

export const about = {
  title: 'Started with C. Stayed for the hard problems.',
  paragraphs: [
    'I joined DA-IICT in 2019 and found out fast that I like writing code. C first, then C++, then contest programming in Python, which is still the only language I use for DSA.',
    'Since 2023 I have worked on fintech apps: a design system at Freecharge, then payments, UPI and security at the Indiabulls group. On the side I built and shipped Smart Library on my own, from the Android app to the backend.',
    'Android is the job title. Backend is the other half I care about, and I build it in Java and Spring Boot on my own time.',
  ],
  offHours: ['Cricket', 'Movies and series', 'Gaming', 'Music'],
}

// The work that asked the most of me. Shown right after the intro.
export const highlights = {
  title: 'The demanding parts',
  intro: 'Fintech leaves no room for “works on my phone”. These are the pieces that asked the most of me.',
  items: [
    {
      head: 'Payments that cannot half-work',
      body: 'Add funds and the payment integrations inside a live trading app. When this path breaks it is someone’s money, so it gets tested like it.',
      where: 'Indiabulls Securities',
    },
    {
      head: 'One app, two UI toolkits',
      body: 'Made native Android and Flutter screens navigate and talk to each other as a single app, while the migration was still under way.',
      where: 'Indiabulls Securities',
    },
    {
      head: 'Most of a UPI app',
      body: 'Send money, collect, UPI Lite, UPI number, face auth payments, accounts and history, all built on Juspay HyperSDK.',
      where: 'Dhani UPI',
    },
    {
      head: 'Security to NPCI and RBI rules',
      body: 'Root, emulator and tamper detection, Play Integrity, SSL pinning and screen capture blocking. The app assumes the phone may be hostile.',
      where: 'Dhani UPI',
    },
    {
      head: 'A whole product, alone',
      body: 'Two Android apps, a rate-limited backend and in-app payments for a real business with paying members. Live on Google Play.',
      where: 'Smart Library',
    },
  ],
}

// Real contest history from codechef.com/users/checking
export const rating = {
  peak: 1927,
  stars: 4,
  solved: 104,
  contests: [
    { code: 'Starters 35', date: '2022-04-20', rating: 1490, rank: 422 },
    { code: 'Starters 36', date: '2022-04-27', rating: 1790, rank: 24 },
    { code: 'May Cook-Off', date: '2022-05-01', rating: 1857, rank: 262 },
    { code: 'May Long One', date: '2022-05-09', rating: 1847, rank: 99 },
    { code: 'Starters 38', date: '2022-05-11', rating: 1836, rank: 319 },
    { code: 'Starters 39', date: '2022-05-18', rating: 1914, rank: 34 },
    { code: 'Starters 41', date: '2022-06-01', rating: 1927, rank: 498 },
    { code: 'June Cook-Off', date: '2022-06-05', rating: 1909, rank: 872 },
    { code: 'Starters 42', date: '2022-06-08', rating: 1867, rank: 2130 },
    { code: 'Starters 43', date: '2022-06-15', rating: 1848, rank: 1152 },
    { code: 'Starters 44', date: '2022-06-22', rating: 1834, rank: 844 },
    { code: 'Starters 45', date: '2022-06-29', rating: 1834, rank: 823 },
    { code: 'July Cook-Off', date: '2022-07-03', rating: 1801, rank: 1530 },
    { code: 'Starters 46', date: '2022-07-06', rating: 1825, rank: 551 },
    { code: 'July Lunchtime', date: '2022-07-17', rating: 1805, rank: 1198 },
    { code: 'Starters 48', date: '2022-07-20', rating: 1807, rank: 786 },
  ],
}

// The journey, written as passbook entries. `credited` is what each stop added.
export const passbook = [
  {
    id: 'daiict',
    date: '2019',
    until: '2023',
    from: 'DA-IICT',
    place: 'Gandhinagar',
    what: 'B.Tech in Information and Communication Technology',
    credited: ['C', 'C++', 'Python', 'SQL'],
    details: [
      'Learned C first, moved to C++, then picked Python for contests.',
      'Ranked 296 in ACPC after Class 12 (Gujarat Board) to get here.',
    ],
  },
  {
    id: 'cp',
    date: '2022',
    from: 'CodeChef',
    place: 'Online',
    what: 'Sixteen rated contests in thirteen weeks, all in Python',
    credited: ['DSA', 'Problem solving', '4 stars'],
    details: [
      'Rank 24 in Starters 36, rank 34 in Starters 39, rank 99 in May Long One 2022.',
      'Peak rating 1927. 104 problems solved.',
    ],
    chart: true,
  },
  {
    id: 'ml',
    date: '2022',
    from: 'ML elective, DA-IICT',
    place: 'Gandhinagar',
    what: 'Chose machine learning and built a face mask recognition model',
    credited: ['TensorFlow', 'NumPy', 'Pandas'],
    details: [
      'Python for every model and assignment in the course.',
      'Course project: detecting whether a face is wearing a mask.',
    ],
  },
  {
    id: 'clomotech',
    date: 'Jan 2023',
    until: 'May 2023',
    from: 'Clomotech',
    place: 'Remote',
    what: 'B.Tech project internship, on work for Monocept and ICICI Lombard',
    credited: ['C#', '.NET', 'AWS Lambda', 'AWS Cognito', 'JMeter'],
    details: [
      'Migrated Python code to C# and deployed it as an AWS Lambda function. JMeter tests showed a 54.34% performance improvement.',
      'Built a user authentication demo in C# on AWS Cognito with JWT tokens.',
    ],
  },
  {
    id: 'freecharge',
    date: 'Jul 2023',
    until: 'Jul 2024',
    from: 'Freecharge, DBAT by Axis Bank',
    place: 'Mumbai, remote',
    what: 'Software Development Engineer, Android. Where I learned Android properly.',
    credited: ['Kotlin', 'Custom views', 'Jetpack Compose', 'KMM', 'Node.js'],
    details: [
      'Built SubZero 2.0, the design system behind Axis Bank apps: custom layouts and components as Kotlin classes with XML.',
      'Helped extend it to iOS with Kotlin Multiplatform Mobile and Jetpack Compose.',
      'Wrote the test suites for Android and iOS, which cut the issues found after release.',
      'Wrote the Express.js backend for Hirehub, a demo MCQ hiring portal, including the user and admin login APIs.',
    ],
  },
  {
    id: 'indiabulls',
    date: 'Sep 2024',
    until: 'Now',
    from: 'Indiabulls Securities',
    place: 'Gurugram',
    current: true,
    what: 'Senior SDE, Android. Two apps: Indiabulls Securities and Dhani UPI.',
    credited: ['Android', 'Kotlin', 'Jetpack Compose', 'Gradle', 'Flutter', 'Juspay HyperSDK', 'UPI', 'App security', 'Firebase', 'FCM', 'Crashlytics', 'Bitrise'],
    details: [
      'Started on the fully native app, building in Kotlin and Jetpack Compose with Gradle, before the Flutter migration began.',
      'Payment flows and the Android to Flutter migration on the trading app.',
      'Most of the UPI surface and the security hardening on Dhani UPI.',
    ],
    more: { label: 'See the work', href: '#work' },
  },
  {
    id: 'backend',
    date: 'Ongoing',
    from: 'Own projects',
    place: 'After hours',
    what: 'Backend development outside the job, in Java and Spring Boot',
    credited: ['Java', 'Spring Boot', 'REST APIs', 'SQL'],
    details: ['Not part of my official role. I build backends for my own work because I like that side as much as Android.'],
  },
  {
    id: 'smartlibrary',
    date: '2026',
    from: 'Smart Library',
    place: 'Idar, Gujarat',
    what: 'Designed, built and shipped a product alone. Live on Google Play.',
    credited: ['Razorpay', 'Cloudflare', 'FCM', 'Google Sign-In'],
    details: ['Student app, admin app and backend for a 78-seat study library in Gujarat.'],
    more: { label: 'See the app', href: '#apps' },
  },
]

export const work = {
  period: 'September 2024 to now',
  title: 'Two apps at the Indiabulls group',
  securities: {
    name: 'Indiabulls Securities',
    kind: 'Trading app. Native Android in Kotlin and Compose, now moving to Flutter.',
    points: [
      { head: 'Native Android first', body: 'Before the migration the app was native only. I built features in Kotlin and Jetpack Compose, with Gradle builds.' },
      { head: 'Payments', body: 'Owned large parts of the money paths: add funds and the payment integrations behind it, the flows users trust least and need most.' },
      { head: 'Android and Flutter, one app', body: 'Built the communication and navigation handling between native Android and Flutter modules, so one codebase can serve Android and iOS.' },
      { head: 'Modularisation', body: 'Split a large single app into modules with MVI and Clean Architecture, so teams can change one feature without touching the rest.' },
      { head: 'Engagement', body: 'CleverTap, FCM and Firebase for push notifications and tracking.' },
      { head: 'Stability', body: 'Firebase Crashlytics for crash reporting from production, used to keep the app stable.' },
      { head: 'Build and release', body: 'Bitrise CI/CD, git hooks, and R8 shrinking to cut APK size and cold-start time.' },
    ],
  },
  dhani: {
    name: 'Dhani UPI',
    kind: 'UPI app on Android and Flutter, built on Juspay HyperSDK (TPAP).',
    flowsIntro: 'Flows I worked on',
    flows: [
      { name: 'Send money', icon: '↗' },
      { name: 'UPI collect', icon: '↙' },
      { name: 'UPI Lite', icon: 'Lite' },
      { name: 'UPI number', icon: '#' },
      { name: 'Transaction history', icon: '≡' },
      { name: 'Account management', icon: '@' },
      { name: 'Face auth payments', icon: '◉' },
      { name: 'P2P transfers', icon: '⇄' },
    ],
    note: 'Also handled the HyperSDK-based architecture these flows sit on. Every one of them moves real money between real bank accounts.',
  },
  security: {
    title: 'Security checks',
    intro: 'What Dhani UPI verifies before it lets money move. I implemented these to NPCI and RBI rules.',
    checks: [
      { name: 'Rooted device', detail: 'App refuses to run on rooted phones' },
      { name: 'Emulator', detail: 'Blocked outside real hardware' },
      { name: 'Tampering', detail: 'Modified builds are rejected' },
      { name: 'Play Integrity API', detail: 'Device and app verdict from Google' },
      { name: 'SSL pinning', detail: 'Traffic only to the pinned certificates' },
      { name: 'Screenshots and recording', detail: 'Blocked with FLAG_SECURE' },
      { name: 'App switcher', detail: 'Screen blurs when the app goes to background' },
    ],
    disclaimer: 'This replays the list. Nothing on your device is inspected.',
    blurNote: 'This panel blurred while you were away. Dhani UPI does the same in the app switcher.',
  },
  earlier: {
    title: 'Before Indiabulls',
    roles: [
      {
        name: 'Freecharge, DBAT by Axis Bank',
        when: 'July 2023 to July 2024',
        lead: 'Built SubZero 2.0, the design system that Axis Bank apps are assembled from.',
        points: [
          'Custom layouts and components written as Kotlin classes with XML, reused across apps',
          'Took the same system to iOS with Kotlin Multiplatform Mobile and Jetpack Compose',
          'Test suites for Android and iOS that cut the issues found after release',
          'Express.js backend for Hirehub, a demo MCQ hiring portal, with secured user and admin login',
        ],
      },
      {
        name: 'Clomotech',
        when: 'January to May 2023',
        lead: '54.34% faster: moved a Python service to C# on AWS Lambda for ICICI Lombard, through Monocept.',
        points: [
          'Measured with JMeter before and after the migration',
          'User authentication demo in C# on AWS Cognito with JWT tokens',
        ],
      },
    ],
  },
}

export const smartLibrary = {
  name: 'Smart Library',
  icon: slIcon,
  title: 'Smart Library: built alone, live on Google Play',
  summary:
    'Smart Library is a 24x7 study library in Idar, Gujarat. I built its student app, its admin app and the backend by myself, and members now pay for and manage their seat from their phone. Design, code, payments, release: one person.',
  playUrl: 'https://play.google.com/store/apps/details?id=com.libraryapp.student_app',
  siteUrl: 'https://smartlibrary-idar.pages.dev',
  shots: [
    { src: slHome, alt: 'Smart Library home screen showing membership status and study tools' },
    { src: slFocus, alt: 'Smart Library focus timer screen' },
    { src: slVideos, alt: 'Smart Library video lectures screen in dark theme' },
  ],
  sides: [
    {
      id: 'student',
      label: 'Student app',
      points: [
        'Physical and digital library memberships, paid in the app through Razorpay',
        'Secure login with Google Sign-In',
        'Video lectures with playlists and playback handling',
        'Study tools: notes, a Pomodoro focus timer, daily goals, job and exam updates',
        'Push notifications, announcements and in-app notifications',
        'Light and dark themes',
      ],
    },
    {
      id: 'admin',
      label: 'Admin app',
      points: [
        'Runs the business without an app update: turn online payments on or off instantly',
        'Set an in-app banner and schedule when it appears',
        'Send a push notification to everyone, to members only, or to one user',
        'Upload videos, PDFs and images as study material',
        'Dashboard with analytics and every student payment',
      ],
    },
    {
      id: 'backend',
      label: 'Backend',
      points: [
        'Hosted on Cloudflare',
        'Rate limiter in front of the API, so one client cannot flood it',
        'Razorpay payment gateway integration, verified through to the admin payment history',
        'Feeds both apps: memberships, materials, banners, announcements and notifications',
      ],
    },
  ],
}

// Honest order of preference, written as a batting order.
export const stack = {
  title: 'Batting order',
  intro: 'What I pick first, what I am comfortable with, and what I can do but would rather not.',
  tiers: [
    {
      name: 'Openers',
      note: 'First choice, every time',
      items: ['Kotlin', 'Android', 'Python', 'Java', 'Spring Boot'],
    },
    {
      name: 'Middle order',
      note: 'Comfortable, used at work',
      items: ['Flutter', 'Dart', 'C++'],
    },
    {
      name: 'Tail',
      note: 'Can hold a bat if the team needs it',
      items: ['JavaScript', 'TypeScript', 'React', 'React Native'],
    },
  ],
  kit: {
    label: 'Also in the kit bag',
    items: [
      'Jetpack Compose', 'KMM', 'MVVM', 'MVI', 'Clean Architecture', 'Coroutines', 'REST APIs', 'SQL',
      'Gradle', 'Firebase', 'FCM', 'Firebase Crashlytics', 'CleverTap', 'R8', 'Git', 'Bitbucket', 'Bitrise', 'AWS Lambda',
      'GitHub Copilot', 'Claude Code', 'Cursor',
    ],
  },
}

export const smallBuilds = {
  title: 'Smaller builds',
  items: [
    { name: 'Cricket over scorer', tech: 'Kotlin, Jetpack Compose', note: 'An Android app for scoring cricket overs. In progress.' },
    { name: 'WeatherApp', tech: 'Kotlin', url: 'https://github.com/sagar581/WeatherApp' },
    { name: 'ToDo List and Quote apps', tech: 'Kotlin', url: 'https://github.com/sagar581?tab=repositories' },
    { name: 'RSA algorithm', tech: 'C++', url: 'https://github.com/sagar581/RSA-Algorithm' },
    { name: 'Convolutional coding and Viterbi decoder', tech: 'MATLAB', url: 'https://github.com/sagar581/MATLAB-proj' },
    { name: 'Toy manufacturing database', tech: 'SQL, HTML', url: 'https://github.com/sagar581/Toy-Manufacturing-Database' },
  ],
}

export const contact = {
  title: 'Collect request',
  from: 'Sagar Chaudhari',
  purpose: 'A role, a project, or a conversation about payments',
  amount: 'One reply',
  approve: 'Approve and email Sagar',
  decline: 'Decline',
  waiting: 'Waiting for your approval',
  declined: 'Declined. The request stays open, and so does the inbox.',
}

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'passbook', label: 'Passbook' },
  { id: 'work', label: 'Work' },
  { id: 'apps', label: 'Apps' },
  { id: 'contact', label: 'Contact' },
]
