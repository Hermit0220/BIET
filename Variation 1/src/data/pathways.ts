import { PROGRAMMES, type Programme } from './programmes';

export interface QualificationOption {
  id: string;
  title: string;
  category: 'secondary' | 'post-secondary' | 'higher' | 'other';
  description: string;
}

export interface GoalOption {
  id: string;
  title: string;
  desc: string;
}

export interface FieldOption {
  id: string;
  label: string;
  desc: string;
}

export interface PathwayRule {
  id: string;
  programmeId: string;
  programmeTitle: string;
  category: string;
  minOLMathsGrade: string;
  minOLEnglishGrade: string;
  requiredALStreams: string[];
  minALPasses: number;
  acceptedAlternativeQualifications: string[];
  progressionPathwayCourse: string;
  progressionNote: string;
  isActive: boolean;
}

export interface PathwayProfile {
  qualifications: string[];
  customQualification: string;
  examCountry: string;
  stream: string;
  mathsGrade: string;
  englishGrade: string;
  alPassesCount: number;
  subjectsStudied: string[];
  yearOfCompletion: string;
  additionalQualifications: string;
  currentStatus: string;
  goals: string[];
  preferredFields: string[];
  studyMode: string;
}

export type MatchStatus = 'DIRECT_ENTRY' | 'CONDITIONAL_ASSESSMENT' | 'PROGRESSION_PATHWAY';

export interface PathwayMatchResult {
  programme: Programme;
  status: MatchStatus;
  matchScore: number;
  headline: string;
  matchReasons: string[];
  requirementsSummary: string;
  progressionNote: string;
  recommendedPathway: string;
  alternativeRoutes: string[];
}

export interface PathwayLead {
  id: string;
  timestamp: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  preferredIntake?: string;
  additionalNotes?: string;
  notes?: string;
  profile: PathwayProfile;
  matchedCourses?: string[];
  recommendedProgrammes?: { id: string; title: string; status: MatchStatus }[];
}

export const QUALIFICATION_OPTIONS: QualificationOption[] = [
  {
    id: 'gce-ol-sl',
    title: 'G.C.E. O/L (Sri Lankan)',
    category: 'secondary',
    description: 'Sri Lanka National Ordinary Level Examination',
  },
  {
    id: 'gce-al-sl',
    title: 'G.C.E. A/L (Sri Lankan)',
    category: 'secondary',
    description: 'Sri Lanka National Advanced Level Examination',
  },
  {
    id: 'cambridge-ol',
    title: 'Cambridge O/L / Edexcel IGCSE',
    category: 'secondary',
    description: 'UK International GCSE / Ordinary Level',
  },
  {
    id: 'cambridge-al',
    title: 'Cambridge A/L / Edexcel International A-Level',
    category: 'secondary',
    description: 'UK International Advanced Level',
  },
  {
    id: 'foundation',
    title: 'Foundation Programme',
    category: 'post-secondary',
    description: 'Pre-University International Foundation Diploma',
  },
  {
    id: 'certificate',
    title: 'Certificate Qualification',
    category: 'post-secondary',
    description: 'NVQ Level 3/4 or Vocational Certificate',
  },
  {
    id: 'diploma',
    title: 'Diploma / National Diploma (NDT / HNDE / NDEV)',
    category: 'higher',
    description: 'Technical Diploma or National Diploma',
  },
  {
    id: 'higher-diploma',
    title: 'Higher National Diploma (HND)',
    category: 'higher',
    description: 'Pearson BTEC or Institutional HND (NVQ L5/6)',
  },
  {
    id: 'bachelor',
    title: 'Bachelor’s Degree / Undergraduate Credits',
    category: 'higher',
    description: 'Completed or Partial Degree Studies',
  },
  {
    id: 'professional',
    title: 'Professional Qualification',
    category: 'higher',
    description: 'CIMA, ACCA, BCS, BIT, City & Guilds, IET, AIQSL',
  },
  {
    id: 'international',
    title: 'International Qualification',
    category: 'higher',
    description: 'High School Diploma (US/Aus/EU) or IB Diploma',
  },
  {
    id: 'other',
    title: 'Other Qualification',
    category: 'other',
    description: 'Specify your unique academic background',
  },
];

export const STREAM_OPTIONS: string[] = [
  'Physical Science / Combined Mathematics',
  'Biological Science',
  'Engineering Technology',
  'Bio-Systems Technology',
  'Information & Communication Technology (ICT)',
  'Commerce & Accounting',
  'Arts & Humanities',
  'General Science (UK A-Levels)',
  'Other / Vocational Stream',
];

export const SUBJECT_OPTIONS: string[] = [
  'Combined Mathematics',
  'Higher Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Information Technology (ICT)',
  'Engineering Technology',
  'Science for Technology',
  'English Language & Literature',
  'Accounting',
  'Business Studies',
  'Economics',
];

export const GOAL_OPTIONS: GoalOption[] = [
  {
    id: 'start-new',
    title: 'Start a new undergraduate qualification',
    desc: 'Begin a full Bachelor degree or HND',
  },
  {
    id: 'continue-higher',
    title: 'Continue higher education after O/L or A/L',
    desc: 'Progress to degree level',
  },
  {
    id: 'upgrade-existing',
    title: 'Upgrade existing diploma to degree top-up',
    desc: 'Fast-track to BSc / BEng Year 3',
  },
  {
    id: 'develop-skills',
    title: 'Develop specialized technical skills',
    desc: 'Enhance career capabilities',
  },
  {
    id: 'career-change',
    title: 'Change career direction to Engineering or IT',
    desc: 'Transition into high-growth sectors',
  },
  {
    id: 'pursue-profession',
    title: 'Pursue a specific professional charter',
    desc: 'Chartered Engineer, QS, Cyber Analyst',
  },
];

export const FIELD_OPTIONS: FieldOption[] = [
  {
    id: 'engineering',
    label: 'School of Engineering',
    desc: 'Civil, Structural, Mechanical, Electrical',
  },
  {
    id: 'computing',
    label: 'School of Computing & IT',
    desc: 'Software Engineering, Cloud, Cyber Security',
  },
  {
    id: 'built-environment',
    label: 'School of Built Environment',
    desc: 'Quantity Surveying, Construction Management',
  },
];

export const DEFAULT_PATHWAY_RULES: PathwayRule[] = [
  {
    id: 'rule-civil',
    programmeId: 'civil-engineering',
    programmeTitle: 'Civil & Structural Engineering',
    category: 'engineering',
    minOLMathsGrade: 'C',
    minOLEnglishGrade: 'S',
    requiredALStreams: [
      'Physical Science / Combined Mathematics',
      'General Science (UK A-Levels)',
      'Engineering Technology',
    ],
    minALPasses: 2,
    acceptedAlternativeQualifications: [
      'Engineering Foundation Diploma (GPA 2.5+)',
      'National Diploma in Technology (NDT) Civil',
      'HND in Civil Engineering (Pearson BTEC / City & Guilds)',
      'NVQ Level 5 Civil Engineering',
    ],
    progressionPathwayCourse: 'BIET Engineering Foundation Diploma (1 Year)',
    progressionNote:
      'If you have O/L passes or non-Maths A/L, start with our 1-year Engineering Foundation to qualify directly for BEng (Hons) Year 1.',
    isActive: true,
  },
  {
    id: 'rule-mechanical',
    programmeId: 'mechanical-engineering',
    programmeTitle: 'Mechanical & Manufacturing Engineering',
    category: 'engineering',
    minOLMathsGrade: 'C',
    minOLEnglishGrade: 'S',
    requiredALStreams: [
      'Physical Science / Combined Mathematics',
      'General Science (UK A-Levels)',
      'Engineering Technology',
    ],
    minALPasses: 2,
    acceptedAlternativeQualifications: [
      'Engineering Foundation Diploma',
      'National Diploma in Technology (NDT) Mechanical',
      'HND in Mechanical Engineering',
      'City & Guilds Advanced Diploma in Mechanical',
    ],
    progressionPathwayCourse: 'BIET Engineering Foundation Diploma (1 Year)',
    progressionNote:
      'Complete BIET 1-Year Engineering Foundation for guaranteed direct entry into Year 1 BEng Mechanical.',
    isActive: true,
  },
  {
    id: 'rule-hndme',
    programmeId: 'hndme',
    programmeTitle: 'Higher National Diploma in Mechanical Engineering (HNDME)',
    category: 'engineering',
    minOLMathsGrade: 'S',
    minOLEnglishGrade: 'S',
    requiredALStreams: [
      'Physical Science / Combined Mathematics',
      'Engineering Technology',
      'General Science (UK A-Levels)',
      'Biological Science',
      'Other / Vocational Stream',
    ],
    minALPasses: 3,
    acceptedAlternativeQualifications: [
      'Foundation in Engineering / Technology',
      '3 A/L passes in Science/Technology or any related field',
      'Certificate Qualification in Mechanical/Manufacturing (NVQ L3/4)',
    ],
    progressionPathwayCourse: 'Top-up degree pathways & direct entry to BEng / BSc Year 3',
    progressionNote:
      'Entry requirements: Foundation or 3 A/L passes in Science/Technology or any related field. 18-month duration with coursework assessments and direct top-up degree progression.',
    isActive: true,
  },
  {
    id: 'rule-electrical',
    programmeId: 'electrical-electronic',
    programmeTitle: 'Electrical & Electronic Systems Engineering',
    category: 'engineering',
    minOLMathsGrade: 'C',
    minOLEnglishGrade: 'S',
    requiredALStreams: [
      'Physical Science / Combined Mathematics',
      'General Science (UK A-Levels)',
      'Engineering Technology',
    ],
    minALPasses: 2,
    acceptedAlternativeQualifications: [
      'Engineering Foundation Diploma',
      'NDT / HNDE / NDEV Electrical',
      'HND in Electrical & Electronic Engineering',
      'NVQ Level 5 Electrical Engineering',
    ],
    progressionPathwayCourse: 'BIET Engineering Foundation Diploma (1 Year)',
    progressionNote:
      'O/L graduates or non-Maths A/L stream students can enroll in the 1-year BIET Foundation in Electrical Engineering.',
    isActive: true,
  },
  {
    id: 'rule-beng-mechanical-manufacturing',
    programmeId: 'beng-mechanical-manufacturing',
    programmeTitle: 'BEng (Hons) Mechanical Engineering specialise in Manufacturing',
    category: 'engineering',
    minOLMathsGrade: 'S',
    minOLEnglishGrade: 'S',
    requiredALStreams: [
      'Any Stream',
      'Physical Science / Combined Mathematics',
      'Engineering Technology',
    ],
    minALPasses: 2,
    acceptedAlternativeQualifications: [
      'HNDE (Higher National Diploma in Engineering)',
      'NDT (National Diploma in Technology)',
      'Pearson BTEC HND in Mechanical / Manufacturing Engineering',
      'NVQ Level 5 / 6 Mechanical / Manufacturing Engineering Diploma',
      'Any similar technical engineering diploma programme',
    ],
    progressionPathwayCourse: 'Direct 1-Year Honours Degree with Masters Progression',
    progressionNote:
      'Direct entry for holders of HNDE, NDT or any similar programme. Complete your UK BEng (Hons) in 1 Year with direct progression to Master’s studies.',
    isActive: true,
  },
  {
    id: 'rule-beng-mechanical-mechatronics',
    programmeId: 'beng-mechanical-mechatronics',
    programmeTitle: 'BEng(Hons) Mechanical Engineering specialise in Mechatronics',
    category: 'engineering',
    minOLMathsGrade: 'S',
    minOLEnglishGrade: 'S',
    requiredALStreams: [
      'Any Stream',
      'Physical Science / Combined Mathematics',
      'Engineering Technology',
    ],
    minALPasses: 2,
    acceptedAlternativeQualifications: [
      'HNDE (Higher National Diploma in Engineering)',
      'NDT (National Diploma in Technology)',
      'Pearson BTEC HND in Mechanical / Mechatronics Engineering',
      'NVQ Level 5 / 6 Mechanical / Mechatronics Engineering Diploma',
      'Any similar technical engineering diploma programme',
    ],
    progressionPathwayCourse: 'Direct 1-Year Honours Degree with Masters Progression',
    progressionNote:
      'Direct entry for holders of HNDE, NDT or any similar programme. Complete your UK BEng (Hons) in 1 Year with direct progression to Master’s studies.',
    isActive: true,
  },
  {
    id: 'rule-beng-electrical-electronics',
    programmeId: 'beng-electrical-electronics',
    programmeTitle: 'BEng (Hons) Electrical and Electronics Engineering',
    category: 'engineering',
    minOLMathsGrade: 'S',
    minOLEnglishGrade: 'S',
    requiredALStreams: [
      'Any Stream',
      'Physical Science / Combined Mathematics',
      'Engineering Technology',
    ],
    minALPasses: 2,
    acceptedAlternativeQualifications: [
      'HNDE (Higher National Diploma in Engineering)',
      'NDT (National Diploma in Technology)',
      'Pearson BTEC HND in Electrical & Electronic Engineering',
      'NVQ Level 5 / 6 Electrical Engineering Diploma',
      'Any similar technical engineering diploma programme',
    ],
    progressionPathwayCourse: 'Direct 1-Year Honours Degree with Masters Progression',
    progressionNote:
      'Direct entry for holders of HNDE, NDT or any similar programme. Complete your UK BEng (Hons) in 1 year with direct progression to Master’s studies.',
    isActive: true,
  },
  {
    id: 'rule-hndeee',
    programmeId: 'hndeee',
    programmeTitle: 'Higher National Diploma in Electrical and Electronic Engineering (HNDEEE)',
    category: 'engineering',
    minOLMathsGrade: 'S',
    minOLEnglishGrade: 'S',
    requiredALStreams: [
      'Physical Science / Combined Mathematics',
      'Engineering Technology',
      'General Science (UK A-Levels)',
      'Biological Science',
      'Other / Vocational Stream',
    ],
    minALPasses: 3,
    acceptedAlternativeQualifications: [
      'Foundation in Engineering / Technology',
      '3 A/L passes in Science/Technology or any related field',
      'Certificate Qualification in Electrical/Electronic (NVQ L3/4)',
    ],
    progressionPathwayCourse: 'Top-up degree pathways & direct entry to BEng / BSc Year 3',
    progressionNote:
      'Entry requirements: Foundation or 3 A/L passes in Science/Technology or any related field. 18-month duration with coursework assessments and direct top-up degree progression.',
    isActive: true,
  },
  {
    id: 'rule-foundation-in-engineering',
    programmeId: 'foundation-in-engineering',
    programmeTitle: 'Foundation in Engineering',
    category: 'engineering',
    minOLMathsGrade: 'S',
    minOLEnglishGrade: 'S',
    requiredALStreams: [
      'Any Stream',
      'Physical Science / Combined Mathematics',
      'Engineering Technology',
    ],
    minALPasses: 0,
    acceptedAlternativeQualifications: [
      'After O/L (Direct Entry)',
      'G.C.E. Ordinary Level (O/L) Completed',
      'London / Cambridge O-Levels Completed',
    ],
    progressionPathwayCourse: 'Direct progression to Higher National Diploma (HND)',
    progressionNote:
      'Entry requirements: After O/L. 6-month duration with 6 core modules assessed via coursework. Enables direct progression to Higher National Diploma (HND) programmes in engineering.',
    isActive: true,
  },
  {
    id: 'rule-diploma-in-computing',
    programmeId: 'diploma-in-computing',
    programmeTitle: 'Diploma in Computing',
    category: 'computing',
    minOLMathsGrade: 'S',
    minOLEnglishGrade: 'S',
    requiredALStreams: ['Any Stream'],
    minALPasses: 0,
    acceptedAlternativeQualifications: [
      'O/L pending (Direct Entry)',
      'G.C.E. Ordinary Level (O/L) Pending / Appeared',
      'London / Cambridge O-Levels Pending',
    ],
    progressionPathwayCourse: 'HND Programmes in Computing & IT',
    progressionNote:
      'Entry requirements: O/L pending. 12-month programme delivering 8 core modules with a 2 days per week study schedule. Enables progression to HND Programmes.',
    isActive: true,
  },
  {
    id: 'rule-hnd-artificial-intelligence',
    programmeId: 'hnd-artificial-intelligence',
    programmeTitle: 'Higher National Diploma in Artificial Intelligence (AI)',
    category: 'computing',
    minOLMathsGrade: 'C',
    minOLEnglishGrade: 'C',
    requiredALStreams: ['Any Stream'],
    minALPasses: 2,
    acceptedAlternativeQualifications: [
      'BIET Diploma in Computing',
      'Three A/L passes in any stream',
      'Two A/L passes in Science/Technology',
      'Equivalent national or international IT qualifications (120 UK Credits)',
      'Pending A/L results (with O/L Maths – C and English – C)',
    ],
    progressionPathwayCourse: 'Top-Up Degree Programmes in AI / Computing',
    progressionNote:
      'Entry pathways include BIET Diploma in Computing, 3 A/L passes in any stream, 2 A/L passes in Science/Technology, or 120 UK Credits equivalent. Progression leads to Top-Up Degree Programmes.',
    isActive: true,
  },
  {
    id: 'rule-hnd-cyber-security-digital-forensics',
    programmeId: 'hnd-cyber-security-digital-forensics',
    programmeTitle: 'Higher National Diploma in Cyber Security and Digital Forensics',
    category: 'computing',
    minOLMathsGrade: 'C',
    minOLEnglishGrade: 'C',
    requiredALStreams: ['Any Stream'],
    minALPasses: 2,
    acceptedAlternativeQualifications: [
      'BIET Diploma in Computing',
      'A/L 3 passes (Any Stream)',
      'A/L 2 passes (Science/Technology)',
      'Equivalent national or international IT qualifications (120 Credits UK)',
      'Pending A/L result, subject to conditions: O/L result (Maths - C & English - C)',
    ],
    progressionPathwayCourse: 'Top - Up Degree Programmes',
    progressionNote:
      '18-month programme (240 Credits) delivered on-campus 2 days per week. Direct progression into Top - Up Degree Programmes.',
    isActive: true,
  },
  {
    id: 'rule-hnd-software-engineering',
    programmeId: 'hnd-software-engineering',
    programmeTitle: 'Higher National Diploma in Software Engineering (SE)',
    category: 'computing',
    minOLMathsGrade: 'C',
    minOLEnglishGrade: 'C',
    requiredALStreams: ['Any Stream'],
    minALPasses: 2,
    acceptedAlternativeQualifications: [
      'BIET Diploma in Computing',
      'A/L 3 passes (Any Stream)',
      'A/L 2 passes (Science/Technology)',
      'Equivalent national or international IT qualifications (120 Credits UK)',
      'Pending A/L result, subject to conditions: O/L result (Maths - C & English - C)',
    ],
    progressionPathwayCourse: 'Top - Up Degree Programmes',
    progressionNote:
      '18-month programme (240 Credits) delivered on-campus 2 days per week. Direct progression into Top - Up Degree Programmes.',
    isActive: true,
  },
  {
    id: 'rule-software',
    programmeId: 'software-engineering',
    programmeTitle: 'Software Engineering & Cloud Computing',
    category: 'computing',
    minOLMathsGrade: 'S',
    minOLEnglishGrade: 'S',
    requiredALStreams: ['Any Stream'],
    minALPasses: 2,
    acceptedAlternativeQualifications: [
      'Diploma in IT / Software Development',
      'BCS Certificate/Diploma in IT',
      'BIT First Year / Pearson BTEC HND in Computing',
      'NVQ Level 4/5 Software Development',
    ],
    progressionPathwayCourse: 'BIET Higher National Diploma (HND) in Computing (2 Years)',
    progressionNote:
      'Students with G.C.E. O/L or 1 A/L pass can start with BIET HND in Computing and top up directly to BSc (Hons) Year 3.',
    isActive: true,
  },
  {
    id: 'rule-cyber',
    programmeId: 'cyber-security',
    programmeTitle: 'Cyber Security & Network Engineering',
    category: 'computing',
    minOLMathsGrade: 'S',
    minOLEnglishGrade: 'S',
    requiredALStreams: ['Any Stream'],
    minALPasses: 2,
    acceptedAlternativeQualifications: [
      'Diploma in Network Security / Cyber Security',
      'Cisco CCNA + O/L Results',
      'HND in Computing / Cyber Security',
      'NVQ Level 4/5 Network Engineering',
    ],
    progressionPathwayCourse: 'BIET Higher National Diploma (HND) in Cyber Security',
    progressionNote:
      'O/L holders or diploma students can complete BIET Cyber Security HND before entering Final Year Degree.',
    isActive: true,
  },
  {
    id: 'rule-qs',
    programmeId: 'quantity-surveying',
    programmeTitle: 'Quantity Surveying & Commercial Management',
    category: 'built-environment',
    minOLMathsGrade: 'C',
    minOLEnglishGrade: 'S',
    requiredALStreams: ['Any Stream'],
    minALPasses: 2,
    acceptedAlternativeQualifications: [
      'National Diploma in Quantity Surveying',
      'AIQSL Certificate / Foundation in QS',
      'HND in Quantity Surveying / Construction Management',
      'NVQ Level 5 Building & Quantity Surveying',
    ],
    progressionPathwayCourse: 'BIET Diploma in Quantity Surveying & Built Environment (1 Year)',
    progressionNote:
      'Join our 1-Year Diploma in QS to build core measurement & costing skills before entering degree Year 2/3.',
    isActive: true,
  },
];

export const INITIAL_PATHWAY_PROFILE: PathwayProfile = {
  qualifications: ['gce-al-sl'],
  customQualification: '',
  examCountry: 'Sri Lanka',
  stream: 'Physical Science / Combined Mathematics',
  mathsGrade: 'C',
  englishGrade: 'S',
  alPassesCount: 2,
  subjectsStudied: ['Combined Mathematics', 'Physics', 'Chemistry'],
  yearOfCompletion: '2025',
  additionalQualifications: '',
  currentStatus: 'Completed G.C.E. A/L',
  goals: ['start-new'],
  preferredFields: [],
  studyMode: 'any',
};

const RULES_STORAGE_KEY = 'biet_pathway_course_rules_v1';
const LEADS_STORAGE_KEY = 'biet_pathway_leads_v1';

export function getSavedPathwayRules(): PathwayRule[] {
  try {
    const raw = localStorage.getItem(RULES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.error('Error reading saved pathway rules:', err);
  }
  return DEFAULT_PATHWAY_RULES;
}

export function savePathwayRules(rules: PathwayRule[]): void {
  try {
    localStorage.setItem(RULES_STORAGE_KEY, JSON.stringify(rules));
  } catch (err) {
    console.error('Error saving pathway rules:', err);
  }
}

export function resetPathwayRules(): PathwayRule[] {
  localStorage.removeItem(RULES_STORAGE_KEY);
  return DEFAULT_PATHWAY_RULES;
}

export function savePathwayLead(
  lead: Omit<PathwayLead, 'id' | 'timestamp'>
): PathwayLead {
  const entry: PathwayLead = {
    ...lead,
    id: `LEAD-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
  };
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    const list: PathwayLead[] = raw ? JSON.parse(raw) : [];
    list.unshift(entry);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Error saving lead:', err);
  }
  return entry;
}

export function getPathwayLeads(): PathwayLead[] {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error getting pathway leads:', err);
    return [];
  }
}

function meetsGradeRequirement(candidateGrade: string, minGrade: string): boolean {
  if (minGrade === 'Any' || !candidateGrade || candidateGrade === 'Pending') return true;
  const ranks: Record<string, number> = { A: 4, B: 3, C: 2, S: 1, F: 0 };
  return (ranks[candidateGrade.toUpperCase()] ?? 1) >= (ranks[minGrade.toUpperCase()] ?? 1);
}

export function evaluatePathwayMatches(profile: PathwayProfile): PathwayMatchResult[] {
  const activeRules = getSavedPathwayRules().filter((r) => r.isActive);
  const results: PathwayMatchResult[] = [];
  const hasAL = profile.qualifications.some((q) => q === 'gce-al-sl' || q === 'cambridge-al');
  const hasOL = profile.qualifications.some((q) => q === 'gce-ol-sl' || q === 'cambridge-ol');
  const hasHigher = profile.qualifications.some((q) =>
    ['diploma', 'higher-diploma', 'bachelor', 'professional', 'foundation'].includes(q)
  );
  const alPasses = profile.alPassesCount || 0;
  const stream = profile.stream || '';

  PROGRAMMES.forEach((prog) => {
    const rule: PathwayRule = activeRules.find(
      (r) => r.programmeId === prog.id || r.programmeTitle === prog.title
    ) || {
      id: `default-${prog.id}`,
      programmeId: prog.id,
      programmeTitle: prog.title,
      category: prog.category,
      minOLMathsGrade: 'S',
      minOLEnglishGrade: 'S',
      requiredALStreams: ['Any Stream'],
      minALPasses: 2,
      acceptedAlternativeQualifications: ['Relevant Diploma or Foundation'],
      progressionPathwayCourse: 'BIET International Foundation',
      progressionNote: 'Entry via BIET Foundation Diploma',
      isActive: true,
    };

    const matchesFieldPreference =
      profile.preferredFields.length === 0 ||
      profile.preferredFields.includes(prog.category);

    let score = 50;
    const reasons: string[] = [];
    let status: MatchStatus = 'PROGRESSION_PATHWAY';
    let headline = '';

    const mathsOk = meetsGradeRequirement(profile.mathsGrade, rule.minOLMathsGrade);
    meetsGradeRequirement(profile.englishGrade, rule.minOLEnglishGrade);
    const streamOk =
      rule.requiredALStreams.includes('Any Stream') ||
      rule.requiredALStreams.some(
        (req) =>
          stream.toLowerCase().includes(req.toLowerCase()) ||
          req.toLowerCase().includes(stream.toLowerCase())
      );

    if (hasHigher) {
      status = 'DIRECT_ENTRY';
      score = 95;
      headline = 'Direct Entry / Fast-Track Advanced Standing Eligible';
      reasons.push('Your prior diploma, foundation, or higher qualification matches entry criteria.');
      if (profile.additionalQualifications) {
        reasons.push(`Recognized background: ${profile.additionalQualifications}`);
      }
    } else if (hasAL && alPasses >= rule.minALPasses && streamOk && mathsOk) {
      status = 'DIRECT_ENTRY';
      score = 90;
      headline = 'Direct Degree Entry Eligible';
      reasons.push(`You meet the required G.C.E. A/L passes (${alPasses} passes) in a recognized stream.`);
      if (mathsOk && profile.mathsGrade) {
        reasons.push(`Satisfies G.C.E. O/L Mathematics requirement (Grade: ${profile.mathsGrade}).`);
      }
    } else if (hasAL && alPasses >= rule.minALPasses && !streamOk && prog.category !== 'engineering') {
      status = 'DIRECT_ENTRY';
      score = 85;
      headline = 'Direct Degree Entry Eligible (Cross-Stream)';
      reasons.push('This programme welcomes G.C.E. A/L graduates from any academic stream.');
    } else if (hasAL && alPasses === 1) {
      status = 'CONDITIONAL_ASSESSMENT';
      score = 75;
      headline = 'Requires Special Assessment / Conditional Entry';
      reasons.push(
        'You hold 1 G.C.E. A/L pass. Admissible subject to BIET Academic Board interview and portfolio review.'
      );
      if (!streamOk && prog.category === 'engineering') {
        reasons.push('Engineering programmes recommend Combined Maths foundation bridge module.');
      }
    } else if (
      profile.currentStatus?.toLowerCase().includes('awaiting') ||
      profile.mathsGrade === 'Pending'
    ) {
      status = 'CONDITIONAL_ASSESSMENT';
      score = 70;
      headline = 'Conditional Offer Pending Official Results';
      reasons.push('Provisional admission granted based on pending G.C.E. O/L or A/L results.');
    } else if (hasOL || alPasses === 0) {
      status = 'PROGRESSION_PATHWAY';
      score = 65;
      headline = 'Foundation / Diploma Progression Pathway Recommended';
      reasons.push(`Start with ${rule.progressionPathwayCourse} to gain direct progression.`);
      if (rule.progressionNote) {
        reasons.push(rule.progressionNote);
      }
    } else {
      status = 'CONDITIONAL_ASSESSMENT';
      score = 60;
      headline = 'Individual Counsellor Assessment Recommended';
      reasons.push('Your academic credentials will be evaluated individually by BIET admissions.');
    }

    if (matchesFieldPreference) {
      score += 10;
    }
    score = Math.min(98, Math.max(50, score));

    const requirementsSummary = `Entry: Min ${rule.minALPasses} A/L passes in ${rule.requiredALStreams.join('/')} or recognized diploma. O/L Maths grade ${rule.minOLMathsGrade}+ required.`;

    results.push({
      programme: prog,
      status,
      matchScore: score,
      headline,
      matchReasons: reasons,
      requirementsSummary,
      progressionNote: rule.progressionNote,
      recommendedPathway: rule.progressionPathwayCourse,
      alternativeRoutes: rule.acceptedAlternativeQualifications,
    });
  });

  const priority: Record<MatchStatus, number> = {
    DIRECT_ENTRY: 3,
    CONDITIONAL_ASSESSMENT: 2,
    PROGRESSION_PATHWAY: 1,
  };

  return results.sort((a, b) => {
    const diff = priority[b.status] - priority[a.status];
    return diff === 0 ? b.matchScore - a.matchScore : diff;
  });
}
