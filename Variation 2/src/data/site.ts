import { photo } from '../lib/assets';

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Admissions' | 'Guest Lecture' | 'Academic Notice' | 'Student Achievement';
  date: string;
  readTime: string;
  summary: string;
  author: string;
  imageUrl: string;
  content: string[];
}

export interface CampusEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  imageUrl: string;
  description: string;
  registrationRequired: boolean;
}

export interface CampusFacility {
  id: string;
  name: string;
  category: string;
  locationInCampus: string;
  imageUrl: string;
  description: string;
  features: string[];
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  department: string;
  credentialsPlaceholder: string;
  imageUrl: string;
  bio: string;
}

export interface StudentClub {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  description: string;
  highlights: string[];
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    "id": "admissions-open-2026",
    "title": "Admissions Now Open for 2026/2027 Academic Cohort at BIET Colombo Campus",
    "category": "Admissions",
    "date": "October 2026",
    "readTime": "3 min read",
    "summary": "Prospective students in Sri Lanka can now apply for higher national diplomas and undergraduate engineering pathways commencing in the forthcoming academic semester.",
    "author": "Office of the Registrar & Admissions",
    "imageUrl": photo('photo-1523240795612-9a054b0db644'),
    "content": [
      "The British Institute of Engineering and Technology (BIET) announces that admissions are officially accepted for the upcoming academic cycle across all three academic divisions: the School of Engineering, School of Computing & IT, and School of Built Environment.",
      "Prospective students with local G.C.E. Advanced Level results, Cambridge or Edexcel International A-Levels, or recognized foundation qualifications are invited to register early.",
      "Admissions counselors are available on-campus from Monday through Saturday to provide individualized course selection advisory, laboratory tours, and syllabus consultations.",
      "Official application submissions can be completed online or directly at the BIET Admissions Office located in Colombo, Sri Lanka."
    ]
  },
  {
    "id": "guest-lecture-sustainable-infrastructure",
    "title": "Distinguished Engineering Lecture: Next-Generation Resilient Infrastructure in South Asia",
    "category": "Guest Lecture",
    "date": "November 2026",
    "readTime": "4 min read",
    "summary": "BIET hosts a distinguished academic and professional seminar reviewing structural mitigation, climate-resilient engineering, and modern material sciences.",
    "author": "Faculty of Civil & Structural Engineering",
    "imageUrl": photo('photo-1486406146926-c627a92ad1ab'),
    "content": [
      "BIET will host a specialized technical session exploring advanced seismic design, coastal engineering, and carbon-reduced concrete formulations specifically tailored to South Asian maritime and geological conditions.",
      "The symposium welcomes current students, faculty members, and visiting engineering practitioners to examine case studies from international infrastructure developments.",
      "Student participation will include poster presentations of second-year and final-year capstone structural analyses.",
      "Detailed registration information and session itineraries are available via the academic department desk."
    ]
  },
  {
    "id": "academic-calendar-notice",
    "title": "Notice: Academic Calendar & Laboratory Orientation for Incoming Engineering Students",
    "category": "Academic Notice",
    "date": "October 2026",
    "readTime": "2 min read",
    "summary": "Important dates, laboratory safety induction requirements, and computing credentials distribution procedures for the new academic intake.",
    "author": "Academic Affairs Board",
    "imageUrl": photo('photo-1524178232363-1fb2b075b655'),
    "content": [
      "All newly registered students must attend the mandatory Laboratory Safety Induction prior to accessing the mechanical workshops, electrical test suites, and civil material testing laboratories.",
      "Student ID card issuance and institutional learning portal credentials will be dispatched during the orientation week schedule.",
      "For additional scheduling details or timetable inquiries, students may consult the Academic Affairs Board noticeboard or contact student services."
    ]
  },
  {
    "id": "student-robotics-showcase",
    "title": "BIET Student Engineering Society Unveils Autonomous Robotics Prototyping Showcase",
    "category": "Student Achievement",
    "date": "September 2026",
    "readTime": "3 min read",
    "summary": "Undergraduate student teams demonstrated multi-axis automated robotic arms and sensor telemetry systems developed in the BIET Mechatronics Workshop.",
    "author": "BIET Student Engineering Society",
    "imageUrl": photo('photo-1485827404703-89b55fcc595e'),
    "content": [
      "Student members of the BIET Engineering Society presented functional prototypes built with custom microcontrollers, CNC-machined aluminium chassis, and real-time sensor arrays.",
      "The initiative highlights BIET’s commitment to providing students with immediate, practical access to industrial prototyping tools from their first academic year.",
      "Mentorship was provided by faculty engineering staff, reinforcing theoretical principles of kinematics and feedback control algorithms."
    ]
  }
];

export const UPCOMING_EVENTS: CampusEvent[] = [
  {
    "id": "open-day-nov-2026",
    "title": "BIET Campus Open Day & Engineering Laboratory Walkthrough",
    "date": "Saturday, 14 November 2026",
    "time": "09:30 AM – 03:30 PM (IST)",
    "location": "Main Auditorium & Laboratory Wings, BIET Colombo Campus",
    "category": "Open Day",
    "imageUrl": photo('photo-1541339907198-e08756dedf3f'),
    "description": "An open campus experience for prospective students and parents. Meet faculty deans, tour mechanical and civil test facilities, and undergo on-the-spot transcript evaluation.",
    "registrationRequired": true
  },
  {
    "id": "guest-lecture-ai-cloud",
    "title": "Technical Symposium: High-Performance Distributed Systems in Modern Enterprise",
    "date": "Thursday, 26 November 2026",
    "time": "02:00 PM – 05:00 PM (IST)",
    "location": "Lecture Theatre 1 & Virtual Live Stream",
    "category": "Guest Lecture",
    "imageUrl": photo('photo-1451187580459-43490279c0fa'),
    "description": "Visiting industry leaders and software fellows explore multi-cloud redundancy, microservices resiliency, and containerized deployment at scale.",
    "registrationRequired": true
  },
  {
    "id": "annual-capstone-expo-2027",
    "title": "Annual Undergraduate Engineering & Technology Capstone Expo",
    "date": "Friday, 15 January 2027",
    "time": "10:00 AM – 04:30 PM (IST)",
    "location": "BIET Innovation Hall, Colombo Campus",
    "category": "Symposium",
    "imageUrl": photo('photo-1531482615713-2afd69097998'),
    "description": "Final-year engineering and computing students exhibit working prototypes, CAD simulations, and structural analyses to corporate engineering judges.",
    "registrationRequired": false
  },
  {
    "id": "feb-intake-induction",
    "title": "Academic Orientation & Safety Induction for February 2027 Cohort",
    "date": "Monday, 08 February 2027",
    "time": "08:30 AM – 01:00 PM (IST)",
    "location": "Main Campus Assembly & Departmental Studios",
    "category": "Admissions",
    "imageUrl": photo('photo-1523240795612-9a054b0db644'),
    "description": "Mandatory induction for newly enrolled engineering, computing, and built environment undergraduates covering laboratory protocols and IT credentials.",
    "registrationRequired": true
  }
];

export const CAMPUS_FACILITIES: CampusFacility[] = [
  {
    "id": "engineering-labs",
    "name": "Advanced Engineering Laboratories",
    "category": "Academic & Practical Infrastructure",
    "locationInCampus": "Building A, Ground & Level 1",
    "imageUrl": photo('photo-1581092160607-ee22621dd758'),
    "description": "Purpose-built physical test environments equipped for material stress testing, fluid mechanics, electrical circuit prototyping, and precision CNC manufacturing.",
    "features": [
      "Hydraulics & Thermo-fluids Test Station",
      "Universal Materials Tensile Testing Bench",
      "High-voltage and Electronics Oscilloscopes"
    ]
  },
  {
    "id": "computing-studios",
    "name": "High-Performance Computing & Cyber Labs",
    "category": "Digital Systems",
    "locationInCampus": "Building B, Level 3",
    "imageUrl": photo('photo-1558494949-ef010cbdcc31'),
    "description": "High-speed networked computational suites dedicated to software development, virtual machine emulation, network security diagnostics, and data analytics.",
    "features": [
      "Dedicated Hardware Routers & Switches (Cisco Rack)",
      "Isolated Air-Gapped Network Testing Cluster",
      "Dual-monitor developer workstations"
    ]
  },
  {
    "id": "lecture-theatres",
    "name": "Tiered Lecture Theatres & Seminar Suites",
    "category": "Teaching Spaces",
    "locationInCampus": "Central Academic Block, Level 2",
    "imageUrl": photo('photo-1517245386807-bb43f82c33c4'),
    "description": "Acoustically treated, multimedia-enabled presentation theatres designed for collaborative lectures, symposiums, and visiting scholar guest discourses.",
    "features": [
      "High-definition laser projection systems",
      "Integrated student audio-visual participation mics",
      "Ergonomic tiered seating with power ports"
    ]
  },
  {
    "id": "library-resource-centre",
    "name": "Institutional Library & Digital Repository",
    "category": "Research & Study",
    "locationInCampus": "Building A, Level 4",
    "imageUrl": photo('photo-1521587760476-6c12a4b040da'),
    "description": "Quiet study halls, private group research rooms, and physical catalog of British engineering texts alongside digital academic journal access [Access Placeholder].",
    "features": [
      "Quiet individual study pods",
      "Online journal repository terminal access",
      "Reference collection of international standards (BS/ISO/ASTM)"
    ]
  },
  {
    "id": "fabrication-workshop",
    "name": "Precision Prototyping & CAD Workshop",
    "category": "Practical Fabrication",
    "locationInCampus": "Engineering Pavilion, Ground Floor",
    "imageUrl": photo('photo-1581092160607-ee22621dd758'),
    "description": "Mechanical workshop with 3D printers, CNC cutting apparatus, welding bays, and measurement calibration tools for capstone project hardware development.",
    "features": [
      "Industrial 3D additive printing setups",
      "Precision bench drills and metal turning lathes",
      "Full safety ventilation and extraction hoods"
    ]
  },
  {
    "id": "student-lounge",
    "name": "Student Hub & Collaboration Commons",
    "category": "Student Life & Recreation",
    "locationInCampus": "Central Block, Mezzanine Level",
    "imageUrl": photo('photo-1522202176988-66273c2fd55f'),
    "description": "Spacious relaxation and casual meeting space for student study circles, society discussions, indoor table games, and cafeteria refreshments.",
    "features": [
      "High-speed Wi-Fi coverage and charging stations",
      "Comfortable modular lounge seating",
      "Quiet study corners and discussion whiteboards"
    ]
  }
];

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    "id": "dean-engineering",
    "name": "[Academic Dean Placeholder]",
    "role": "Dean, School of Engineering",
    "department": "Faculty of Engineering & Technology",
    "credentialsPlaceholder": "BSc Eng (Hons), MSc, PhD, CEng, FIE [Placeholder]",
    "imageUrl": photo('photo-1534528741775-53994a69daeb'),
    "bio": "Oversees engineering academic governance, curriculum benchmarking against UK engineering frameworks, laboratory capital investment, and faculty research ethics."
  },
  {
    "id": "head-computing",
    "name": "[Head of Computing Placeholder]",
    "role": "Head, School of Computing & IT",
    "department": "Faculty of Information & Network Systems",
    "credentialsPlaceholder": "BSc (Hons) Comp Sci, PhD, MBCS, CITP [Placeholder]",
    "imageUrl": photo('photo-1507003211169-0a1dd7228f2d'),
    "bio": "Leads software engineering, cloud systems, and cybersecurity curricula with emphasis on industry-standard engineering methodologies and cloud certification alignment."
  },
  {
    "id": "head-built-env",
    "name": "[Head of Built Environment Placeholder]",
    "role": "Head, School of Built Environment",
    "department": "Department of Quantity Surveying & Commercial Management",
    "credentialsPlaceholder": "BSc (Hons) QS, MSc, MRICS, AIQSL [Placeholder]",
    "imageUrl": photo('photo-1573496359142-b8d87734a5a2'),
    "bio": "Directs quantity surveying and construction economics courses, standard contract education (FIDIC), and digital BIM cost simulation practices."
  },
  {
    "id": "head-registrar",
    "name": "[Registrar & Secretary Placeholder]",
    "role": "Registrar & Head of Academic Admissions",
    "department": "Office of the Registrar",
    "credentialsPlaceholder": "BA, MBA, MEd [Placeholder]",
    "imageUrl": photo('photo-1500648767791-00dcc994a43e'),
    "bio": "Responsible for student enrollment governance, transcript verification, international awarding body examinations, and student record compliance."
  }
];

export const STUDENT_CLUBS: StudentClub[] = [
  {
    "id": "engineering-society",
    "name": "BIET Student Engineering Society",
    "category": "Academic & Professional",
    "imageUrl": photo('photo-1581092580497-e0d23cbdf1dc'),
    "description": "The flagship student organization organizing hackathons, drone fabrication workshops, robotics design sprints, and industrial study tours across Sri Lanka.",
    "highlights": [
      "Annual Autonomous Robotics Competition",
      "Industry Field Trips to Major Civil Works & Dams",
      "Peer-to-Peer Engineering Tutorials"
    ]
  },
  {
    "id": "tech-innovators-club",
    "name": "Computing & Open Source Developers Club",
    "category": "Technology & Software",
    "imageUrl": photo('photo-1531403009284-440f080d1e12'),
    "description": "A vibrant community of software developers, ethical hackers, and cloud enthusiasts collaborating on open source utilities, CTF challenges, and web projects.",
    "highlights": [
      "24-Hour Hackathons",
      "Cybersecurity Capture-The-Flag (CTF) Sprints",
      "Open Source Contribution Workshops"
    ]
  },
  {
    "id": "sports-wellness",
    "name": "Sports & Recreational Council",
    "category": "Recreation & Well-being",
    "imageUrl": photo('photo-1461896836934-ffe607ba8211'),
    "description": "Organizes intra-faculty cricket tournaments, badminton, futsal leagues, and wellness programs to promote work-life balance for rigorous STEM disciplines.",
    "highlights": [
      "Annual BIET Inter-Faculty Cricket Trophy",
      "Table Tennis & Badminton Tournaments",
      "Annual Community Outreach & Beach Clean-ups"
    ]
  }
];

export const INSTITUTION_INFO = {
  "name": "British Institute of Engineering and Technology (BIET)",
  "shortName": "BIET",
  "country": "Sri Lanka",
  "tagline": "Excellence in Engineering & Technology Education",
  "statutoryNote": "Higher Education Institution in Sri Lanka. Academic programmes, awarding bodies, and institutional affiliations are subject to formal confirmation. [Accreditation & Partnership Placeholder]",
  "campusAddressPlaceholder": "BIET Campus, Colombo, Sri Lanka [Detailed Campus Address Placeholder]",
  "telephonePlaceholder": "+94 (0) 11 2XX XXXX [Telephone Placeholder]",
  "telephone": "+94 11 234 5678",
  "whatsappNumber": "94112345678",
  "emailPlaceholder": "info@biet.lk / admissions@biet.lk [Email Placeholder]",
  "hours": "Monday – Saturday: 8:30 AM – 5:30 PM (IST)",
  "socials": {
    "linkedin": "https://linkedin.com",
    "facebook": "https://facebook.com",
    "instagram": "https://instagram.com",
    "youtube": "https://youtube.com"
  }
} as const;
