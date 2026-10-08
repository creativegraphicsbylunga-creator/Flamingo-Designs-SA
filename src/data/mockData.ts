import {
  User,
  ServiceItem,
  PortfolioItem,
  PrintSpecial,
  Invoice,
  ArtworkFile,
  ProofItem,
  QuoteRequest,
  Booking
} from '../types';

export const BUSINESS_INFO = {
  name: 'Flamingo Designs SA',
  phone: '+27 83 337 4954',
  whatsappRaw: '27833374954',
  email: 'info@flamingodesignssa.co.za',
  adminEmail: 'creativegraphicsbylunga@gmail.com',
  website: 'flamingodesignssa.co.za',
  location: 'Van Riebeeck Ave, Edenvale, 1609 & Harding Street, Estcourt, KZN',
  branches: [
    { name: 'Edenvale Studio (Gauteng)', address: 'Van Riebeeck Ave, Edenvale, 1609' },
    { name: 'Estcourt Studio (KZN)', address: 'Harding Street, Estcourt, KZN' }
  ],
  bankDetails: {
    bank: 'First National Bank (FNB)',
    accountName: 'Flamingo Designs SA Pty Ltd',
    accountNumber: '62849921034',
    accountType: 'Business Cheque',
    branchCode: '250655',
    reference: 'Invoice Number or Company Name'
  }
};

export const INITIAL_USERS: User[] = [
  {
    id: 'user_1',
    name: 'Sipho Khumalo',
    email: 'sipho@horizonsafaris.co.za',
    company: 'Horizon Safari Co.',
    phone: '+27 72 491 8820',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user_2',
    name: 'Dr. Lerato Mokoena',
    email: 'lerato@apexaesthetics.co.za',
    company: 'Apex Aesthetics Clinic',
    phone: '+27 82 554 9912',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'admin_1',
    name: 'Lunga (Creative Director)',
    email: 'creativegraphicsbylunga@gmail.com',
    company: 'Flamingo Designs SA',
    phone: '+27 83 337 4954',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'graphic-design',
    title: 'Graphic & Print Design',
    category: 'graphic-design',
    priceFrom: 450,
    turnaround: '2-4 business days',
    description: 'Bespoke marketing collateral, flyers, company profiles, brochures, menus, and high-impact digital graphics.',
    deliverables: ['Print-ready PDF with 3mm bleed', 'High-res JPEG & PNG', 'Vector source AI/EPS', 'Social media crops'],
    features: ['3 Initial concepts included', 'Unlimited minor revisions', 'Full commercial copyright ownership', 'Fast turnaround']
  },
  {
    id: 'web-hosting',
    title: 'Web Design & Fast Hosting',
    category: 'web-hosting',
    priceFrom: 3500,
    turnaround: '7-14 business days',
    description: 'High-converting responsive websites, WordPress development, e-commerce stores, South African domain registration (.co.za) & NVMe hosting.',
    deliverables: ['Responsive desktop & mobile website', 'SSL security certificate', '1 Year .co.za domain & emails', 'Speed optimized'],
    features: ['WhatsApp chat integration', 'Google Analytics & SEO setup', 'CMS client training', 'Free monthly maintenance pack']
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity & Logo Design',
    category: 'brand-identity',
    priceFrom: 1850,
    turnaround: '4-7 business days',
    description: 'Memorable brand systems, distinctive logo marks, typography pairings, color palettes, and comprehensive corporate guidelines.',
    deliverables: ['Full vector logo suite (AI, SVG, PDF, PNG)', 'Brand style guide (PDF)', 'Favicon & social avatars', 'CMYK & Pantone color specs'],
    features: ['Multiple bespoke style avenues', 'Monochrome & inverted variations', 'Strict trademark-ready artwork', 'Stationery kit integration']
  },
  {
    id: 'print-signage',
    title: 'Commercial Print & Signage',
    category: 'print-signage',
    priceFrom: 750,
    turnaround: '3-5 business days',
    description: 'Premium business cards, luxury pull-up banners, vinyl decals, PVC banners, vehicle wraps, and corporate promotional gifts.',
    deliverables: ['Quality litho & digital print runs', 'Delivered door-to-door across SA', 'Pre-flight file inspection', 'Finishing & laminations'],
    features: ['Matt / Gloss / Soft-touch finishes', 'Spot UV & Gold foil available', 'Heavyweight 350gsm–400gsm artboard', 'Nationwide courier delivery']
  },
  {
    id: 'video-animation',
    title: 'Motion Graphics & Video',
    category: 'video-animation',
    priceFrom: 1200,
    turnaround: '3-6 business days',
    description: 'Engaging animated logo reveals, kinetic social reels, TikTok promos, and corporate explainer motion graphics.',
    deliverables: ['4K / Full HD MP4 exports', '9:16 vertical & 16:9 widescreen formats', 'Sound design & licensed music track', 'Transparent alpha video'],
    features: ['Custom storyboarding', 'Dynamic typography & captions', 'Fast 48h rush option', 'Brand element animation']
  },
  {
    id: 'social-media',
    title: 'Social Media Management & Poster Design',
    category: 'social-media',
    priceFrom: 950,
    turnaround: 'Monthly Retainer (R950/mo)',
    description: 'Bespoke promotional poster designs created, captioned, and published across all major socials to grow your brand consistency.',
    deliverables: ['Custom poster designs created', 'Publishing & scheduling across all socials', 'Hashtags & copy optimization', 'Peak engagement timing'],
    features: ['Includes creative poster design', 'Targeted scheduling', 'Meta & multi-channel publishing', 'Consistent monthly visual identity']
  },
  {
    id: 'social-media-general',
    title: 'General Socials Management (Without Designs)',
    category: 'social-media',
    priceFrom: 450,
    turnaround: 'Monthly Retainer (R450/mo)',
    description: 'Professional management using your existing content assets. Includes publishing on all social platforms with targeted audience locations.',
    deliverables: ['Posting on all socials (FB, IG, LinkedIn, X)', 'Location-targeted audience reach', 'Content scheduling calendar', 'Status & reach monitoring'],
    features: ['Budget-friendly for active brands', 'No design fee (client supplies art)', 'Location demographic targeting', 'All major networks included']
  },
  {
    id: 'web-maintenance',
    title: 'Monthly Website Maintenance & Security',
    category: 'web-maintenance',
    priceFrom: 260,
    turnaround: 'Monthly Retainer (From R260/mo)',
    description: 'Continuous proactive care: content updates, security scans, optimum upload times, hacking prevention, and secure cloud backups.',
    deliverables: ['Regular website updates & patches', 'Security checks & vulnerability scans', 'Optimum upload times & speed tuning', 'Hacking prevention & firewall care', 'Automated cloud website backups'],
    features: ['99.9% uptime monitoring', 'Emergency restore protection', 'WordPress & plugin updates', 'Proactive security patching']
  },
  {
    id: 'it-support',
    title: 'General IT Support (Online & Onsite)',
    category: 'it-support',
    priceFrom: 1600,
    turnaround: 'Monthly Retainer (R1,600 – R5,600/mo)',
    description: 'Comprehensive business IT infrastructure support. Choose between Online-Only Support (R1,600/mo) or Full Support with monthly onsite visits (R5,600/mo).',
    deliverables: ['Work device management (PCs, Macs, Laptops)', 'Business email management (Google/M365)', 'Automated secure data backups', 'Online remote helpdesk (R1,600/mo)', 'Monthly onsite office visits included (R5,600/mo tier)'],
    features: ['Device optimization & antivirus care', 'Email mailbox configuration & anti-spam', 'Cloud data redundancy backup', 'Rapid technical resolution']
  }
];

export const PRINT_SPECIALS: PrintSpecial[] = [
  {
    id: 'special-social-posters',
    title: 'Socials Management + Poster Designs',
    originalPrice: 1450,
    specialPrice: 950,
    unit: 'Per Month',
    turnaround: 'Monthly Retainer',
    badge: 'Popular Retainer',
    description: 'Social media management with eye-catching bespoke poster designs included and published across all your brand channels.',
    specs: [
      'Custom Promotional Poster Designs Included',
      'Publishing Across All Major Social Networks',
      'Caption Copywriting & Hashtag Curation',
      'Scheduled at Peak Engagement Times',
      'R950 Monthly Retainer'
    ],
    image: '/src/assets/images/flamingo_social_branding_1791437584466.jpg',
    popular: true
  },
  {
    id: 'special-social-general',
    title: 'General Socials (Without Designs)',
    originalPrice: 650,
    specialPrice: 450,
    unit: 'Per Month',
    turnaround: 'Monthly Retainer',
    badge: 'Affordable Reach',
    description: 'Management & posting on all socials with location targeting. Ideal if you already have your own graphics and flyers.',
    specs: [
      'Posting Across All Your Social Accounts',
      'Location & Audience Geo-Targeting',
      'Content Calendar & Optimum Scheduling',
      'Without Designs (Client Supplies Art)',
      'R450 Monthly Retainer'
    ],
    image: '/src/assets/images/flamingo_social_branding_1791437584466.jpg'
  },
  {
    id: 'special-web-maintenance',
    title: 'Monthly Website Maintenance',
    originalPrice: 400,
    specialPrice: 260,
    unit: 'From / Month',
    turnaround: 'Continuous 24/7 Care',
    badge: 'Security Shield',
    description: 'Routine website updates, continuous security checks, optimum upload times, hacking prevention, and automated off-site backups.',
    specs: [
      'Regular CMS & Plugin Updates',
      'Airtight Security & Threat Checks',
      'Optimum Upload Times & Speed Tuning',
      'Proactive Hacking Prevention Firewall',
      'Automated Cloud Backups (from R260/mo)'
    ],
    image: '/src/assets/images/flamingo_web_showcase_1791437564561.jpg'
  },
  {
    id: 'special-it-support',
    title: 'General IT Support Retainer',
    originalPrice: 2100,
    specialPrice: 1600,
    unit: 'From / Month',
    turnaround: 'Online & Onsite Options',
    badge: 'Business Tech',
    description: 'Work device management, business email administration, and secure data backups. From R1,600 (Online Only) to R5,600 (includes monthly onsite visits).',
    specs: [
      'Work Device Management (Laptops/PCs/Macs)',
      'Business Email Administration (M365/Google)',
      'Automated Disaster Recovery Data Backup',
      'Online Helpdesk: R1,600 Monthly',
      'Onsite Monthly Office Visit: R5,600 Monthly'
    ],
    image: '/src/assets/images/flamingo_brand_hero_1791437552842.jpg'
  },
  {
    id: 'special-cards-500',
    title: '500 Luxury Business Cards',
    originalPrice: 1100,
    specialPrice: 750,
    unit: '500 Units',
    turnaround: '3-4 Days Delivery',
    badge: 'Print Special',
    description: 'Double-sided full color print on premium 350gsm artboard with sleek matt or gloss lamination. Nationwide SA courier available.',
    specs: [
      '500 Double Sided Cards',
      '350gsm Heavyweight Silk Board',
      'Full Color High-Res Litho Print',
      'Protective Matt or Gloss Lamination',
      'Standard 90x50mm size with rounded or square corners'
    ],
    image: '/src/assets/images/flamingo_print_cards_1791437574553.jpg'
  },
  {
    id: 'special-rollup-banner',
    title: 'Executive Pull-Up Banner',
    originalPrice: 1250,
    specialPrice: 890,
    unit: 'Per Unit',
    turnaround: '2-3 Days Delivery',
    badge: 'Event Ready',
    description: 'High-grade 850mm x 2000mm retractable aluminium cassette banner, non-curl PVC substrate with padded luxury carry bag.',
    specs: [
      '850mm x 2000mm Visible Area',
      'Non-curl anti-glare blockout PVC',
      'Heavy-duty aluminium base & pole',
      'Reinforced padded zip carry case',
      'Vivid UV-stable ink'
    ],
    image: '/src/assets/images/flamingo_brand_hero_1791437552842.jpg'
  },
  {
    id: 'special-starter-web',
    title: 'Starter Business Web & Domain',
    originalPrice: 4800,
    specialPrice: 3500,
    unit: 'Once-off Package',
    turnaround: '7-10 Days Launch',
    badge: 'Digital Presence',
    description: 'Up to 5 custom-designed responsive pages, 1 year .co.za domain registration, fast SSL hosting, business email accounts and WhatsApp click-to-chat.',
    specs: [
      '5 Modern Responsive Pages',
      'Free .co.za Domain (1st Year)',
      '12 Months High-Speed Hosting',
      'Up to 5 Business Email Accounts',
      'Mobile Optimized & WhatsApp Integration'
    ],
    image: '/src/assets/images/flamingo_web_showcase_1791437564561.jpg'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port_1',
    title: 'Horizon Safari Luxury Lodges',
    client: 'Horizon Safari Co.',
    category: 'Branding',
    year: '2025',
    coverImage: '/src/assets/images/flamingo_brand_hero_1791437552842.jpg',
    tags: ['Brand Identity', 'Gold Foil Cards', 'Signage'],
    outcome: '+165% Bookings in Q1 post-rebrand',
    description: 'A comprehensive visual transformation for an eco-luxury private game reserve in Limpopo, South Africa.',
    challenge: 'The legacy identity felt dated and did not convey the high-end boutique hospitality experience to international guests.',
    solution: 'Designed an earth-toned luxury visual system with African wildlife iconography, metallic foil stationery, and on-site signage.',
    deliverables: ['Custom Typography & Wordmark', '500 Foil Stamped Business Cards', 'Guest Welcome Dossier', 'Directional Timber Signage']
  },
  {
    id: 'port_2',
    title: 'Apex Aesthetics Medical Clinic',
    client: 'Apex Aesthetics Clinic',
    category: 'Web Design',
    year: '2026',
    coverImage: '/src/assets/images/flamingo_web_showcase_1791437564561.jpg',
    tags: ['Web Design', 'Online Booking', 'SEO'],
    outcome: '3.4x Increase in online patient consultations',
    description: 'Bespoke clinical aesthetic website featuring fast WhatsApp triage, procedure galleries, and automated appointment scheduling.',
    challenge: 'Patients struggled to navigate complex treatment options and booking drop-off was nearly 70%.',
    solution: 'Engineered a modern, minimalist interface with treatment cost calculators, before/after galleries, and real-time appointment booking.',
    deliverables: ['Responsive Web Portal', 'WhatsApp Click-to-Book', 'Treatment Guides', 'Google Analytics & Local SEO']
  },
  {
    id: 'port_3',
    title: 'Kasi Craft Brewing Heritage Series',
    client: 'Kasi Brew Craft Co.',
    category: 'Print & Signage',
    year: '2025',
    coverImage: '/src/assets/images/flamingo_print_cards_1791437574553.jpg',
    tags: ['Packaging', 'Beer Labels', 'Merchandise'],
    outcome: 'Sold out 10,000 launch bottles in 14 days',
    description: 'Vibrant beer can and bottle packaging celebrating vibrant South African street culture and heritage ingredients.',
    challenge: 'Standing out on crowded craft supermarket shelves while honoring authentic township pride.',
    solution: 'Crafted bold geometric African motifs, metallic foil accents, and high-durability waterproof label coatings.',
    deliverables: ['Can Wraps & Bottle Neck Labels', 'Outer Carton Packaging', 'Bar Display Banners', 'Coaster Runs']
  },
  {
    id: 'port_4',
    title: 'Volt Electric Mobility Campaign',
    client: 'Volt Mobility SA',
    category: 'Social Media',
    year: '2026',
    coverImage: '/src/assets/images/flamingo_social_branding_1791437584466.jpg',
    tags: ['Social Content', 'Meta Ads', 'Carousels'],
    outcome: 'R4.2M in fleet test drive inquiries',
    description: 'High-octane multi-channel social advertising campaign across Meta, LinkedIn, and YouTube shorts.',
    challenge: 'Demystifying EV range anxiety for corporate fleet managers across Gauteng.',
    solution: 'Data-driven carousel ads showcasing cost savings per kilometer, fast charging maps, and customer testimonials.',
    deliverables: ['24 Animated Feed Ads', '12 Story Promo Carousels', 'Copywriting & Lead Forms', 'Campaign Analytics']
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv_101',
    invoiceNumber: 'FD-2026-084',
    clientName: 'Sipho Khumalo',
    clientEmail: 'sipho@horizonsafaris.co.za',
    clientCompany: 'Horizon Safari Co.',
    clientPhone: '+27 72 491 8820',
    clientVat: 'ZA4820199411',
    issueDate: '2026-09-18',
    dueDate: '2026-10-18',
    items: [
      {
        description: 'Brand Identity Redesign Suite (Logo, Style Guide, Vector Files)',
        quantity: 1,
        unitPrice: 2800,
        total: 2800
      },
      {
        description: '500 Luxury Business Cards Print Special (350gsm Silk, Matt Lam)',
        quantity: 1,
        unitPrice: 750,
        total: 750
      },
      {
        description: 'Nationwide Courier Delivery (Limpopo Private Reserve)',
        quantity: 1,
        unitPrice: 150,
        total: 150
      }
    ],
    subtotal: 3700,
    vatRate: 0.15,
    vatAmount: 555,
    total: 4255,
    status: 'Unpaid',
    notes: 'Payment due within 30 days. Please use invoice number FD-2026-084 as EFT reference.'
  },
  {
    id: 'inv_102',
    invoiceNumber: 'FD-2026-072',
    clientName: 'Sipho Khumalo',
    clientEmail: 'sipho@horizonsafaris.co.za',
    clientCompany: 'Horizon Safari Co.',
    clientPhone: '+27 72 491 8820',
    clientVat: 'ZA4820199411',
    issueDate: '2026-08-05',
    dueDate: '2026-09-05',
    items: [
      {
        description: '2x Executive Pull-Up Banners (850mm x 2000mm Aluminum Base)',
        quantity: 2,
        unitPrice: 890,
        total: 1780
      },
      {
        description: 'High-Res Artwork Pre-flight & Proofing',
        quantity: 1,
        unitPrice: 250,
        total: 250
      }
    ],
    subtotal: 2030,
    vatRate: 0.15,
    vatAmount: 304.5,
    total: 2334.5,
    status: 'Paid',
    paidAt: '2026-08-12',
    paymentMethod: 'EFT',
    notes: 'Paid in full via FNB EFT. Thank you for choosing Flamingo Designs SA!'
  },
  {
    id: 'inv_103',
    invoiceNumber: 'FD-2026-091',
    clientName: 'Dr. Lerato Mokoena',
    clientEmail: 'lerato@apexaesthetics.co.za',
    clientCompany: 'Apex Aesthetics Clinic',
    clientPhone: '+27 82 554 9912',
    clientVat: 'ZA4910283719',
    issueDate: '2026-09-25',
    dueDate: '2026-10-25',
    items: [
      {
        description: 'Starter Business Web Package (Responsive, 5 Pages, SEO)',
        quantity: 1,
        unitPrice: 3500,
        total: 3500
      },
      {
        description: 'Annual Domain .co.za & NVMe Hosting (1st Year Inclusive)',
        quantity: 1,
        unitPrice: 0,
        total: 0
      },
      {
        description: 'WhatsApp Interactive Lead Integration Module',
        quantity: 1,
        unitPrice: 650,
        total: 650
      }
    ],
    subtotal: 4150,
    vatRate: 0.15,
    vatAmount: 622.5,
    total: 4772.5,
    status: 'Unpaid',
    notes: 'Staged deposit invoice for medical web platform development.'
  }
];

export const INITIAL_ARTWORK_FILES: ArtworkFile[] = [
  {
    id: 'art_1',
    fileName: 'Horizon_Safari_Logo_Final_CMYK.ai',
    fileSize: 18450000,
    fileType: 'application/illustrator',
    uploadedAt: '2026-09-20',
    clientName: 'Sipho Khumalo',
    clientEmail: 'sipho@horizonsafaris.co.za',
    status: 'Print Ready',
    notes: 'Vector artwork checked. Bleed 3mm confirmed with Pantone PMS 130 C spot color.',
    jobReference: 'FD-2026-084'
  },
  {
    id: 'art_2',
    fileName: 'Staff_Business_Cards_BatchA_Print.pdf',
    fileSize: 6200000,
    fileType: 'application/pdf',
    uploadedAt: '2026-09-22',
    clientName: 'Sipho Khumalo',
    clientEmail: 'sipho@horizonsafaris.co.za',
    status: 'Proof Ready',
    notes: '500 units order. Double sided with matt lamination requested.',
    jobReference: 'FD-2026-084'
  },
  {
    id: 'art_3',
    fileName: 'Apex_Clinic_Signage_Mockups.psd',
    fileSize: 44100000,
    fileType: 'image/vnd.adobe.photoshop',
    uploadedAt: '2026-09-28',
    clientName: 'Dr. Lerato Mokoena',
    clientEmail: 'lerato@apexaesthetics.co.za',
    status: 'Pre-flight Verified',
    notes: 'Backlit acrylic reception sign specifications.',
    jobReference: 'FD-2026-091'
  }
];

export const INITIAL_PROOFS: ProofItem[] = [
  {
    id: 'proof_1',
    title: 'Horizon Safari 500 Business Cards - Front & Back Proof',
    jobReference: 'FD-2026-084',
    version: 'v2.1 Final',
    previewUrl: '/src/assets/images/flamingo_print_cards_1791437574553.jpg',
    specs: '350gsm Silk Board · 90mm x 50mm · 3mm Bleed · Double-sided Matt Lam · Spot Gold Foil Mark',
    uploadedAt: '2026-09-23',
    status: 'Pending Review',
    feedbackNotes: 'Please verify telephone number (+27 72 491 8820) and lodge coordinates before final sign-off.'
  },
  {
    id: 'proof_2',
    title: 'Horizon Safari Corporate Profile Folder & Insert Proof',
    jobReference: 'FD-2026-084',
    version: 'v1.0 Proof',
    previewUrl: '/src/assets/images/flamingo_brand_hero_1791437552842.jpg',
    specs: 'A4 Die-Cut Capacity Pocket Folder · 400gsm Board · Scuff-resistant Matt Lam',
    uploadedAt: '2026-09-19',
    status: 'Approved',
    feedbackNotes: 'Approved by Sipho Khumalo on 2026-09-20.'
  }
];

export const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'quote_1',
    name: 'Sipho Khumalo',
    email: 'sipho@horizonsafaris.co.za',
    phone: '+27 72 491 8820',
    company: 'Horizon Safari Co.',
    category: 'Brand Identity & Print',
    estimatedBudget: 'R 5,000 - R 10,000',
    timeline: 'Standard (1-2 weeks)',
    brief: 'Need complete rebrand assets, 500 cards, and roadside pull-up banners for the luxury lodge relaunch.',
    selectedAddons: ['Vector Logo Suite', 'Print Special 500 Cards', 'Executive Pull-up Banner'],
    submittedAt: '2026-09-15',
    status: 'Converted to Invoice',
    estimatedCost: 4255
  },
  {
    id: 'quote_2',
    name: 'Gareth van der Merwe',
    email: 'gareth@capetrailoutdoors.co.za',
    phone: '+27 84 902 1145',
    company: 'Cape Trail Outdoors',
    category: 'Web Design & Hosting',
    estimatedBudget: 'R 3,500 - R 5,000',
    timeline: 'Urgent (Under 7 days)',
    brief: 'E-commerce booking catalog for outdoor bike rentals and guided mountain trail tours in Stellenbosch.',
    selectedAddons: ['Starter Web Package', 'WhatsApp Direct Book', 'SEO Setup'],
    submittedAt: '2026-10-02',
    status: 'Pending',
    estimatedCost: 3850
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book_1',
    clientName: 'Sipho Khumalo',
    clientEmail: 'sipho@horizonsafaris.co.za',
    clientPhone: '+27 72 491 8820',
    company: 'Horizon Safari Co.',
    consultationType: 'Brand & Print Production Strategy (45 min)',
    date: '2026-10-14',
    time: '10:30 SAST',
    notes: 'Review foil stamp samples and Limpopo logistics.',
    googleMeetUrl: 'https://meet.google.com/flm-dsgn-sa1',
    status: 'Confirmed',
    createdAt: '2026-10-01'
  }
];
