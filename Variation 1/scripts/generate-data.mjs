import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modDir =
  process.env.BIET_REF_MODULES_DIR || path.resolve(__dirname, '..', 'reference', 'modules');
const outDir = path.resolve(__dirname, '..', 'src', 'data');

function evalVar(file, varName) {
  const src = fs.readFileSync(path.join(modDir, file), 'utf8').trim().replace(/,$/, ';');
  return new Function(`var ${src}\nreturn ${varName};`)();
}

const ei = evalVar('02-ei.js', 'ei');
const ti = evalVar('03-ti.js', 'ti');
const ni = evalVar('04-ni.js', 'ni');
const ri = evalVar('05-ri.js', 'ri');

const iiSrc = fs.readFileSync(path.join(modDir, '06-ii.js'), 'utf8').trim().replace(/,$/, ';');
const { ii, ai } = new Function(`var ${iiSrc}\nreturn { ii, ai };`)();
const F = evalVar('07-F.js', 'F');

function serializeWithPhoto(obj) {
  let json = JSON.stringify(obj, null, 2);
  json = json.replace(
    /"https:\/\/images\.unsplash\.com\/(photo-[a-zA-Z0-9-]+)\?[^"]*"/g,
    "photo('$1')"
  );
  return json;
}

const progTs = `import { photo } from '../lib/assets';

export interface ModuleItem {
  code: string;
  name: string;
  credits: number;
  description: string;
}

export interface StructureYear {
  yearTitle: string;
  level: string;
  credits: number;
  description: string;
  modules: ModuleItem[];
}

export interface AllModuleRow {
  no: number;
  code?: string;
  title: string;
  credits?: number;
  creditsDisplay?: string;
  semester?: string;
  moduleType?: string;
  academicYear?: string;
}

export interface GalleryImage {
  url: string;
  caption: string;
  category: string;
}

export type ImageSvgType =
  | 'civil'
  | 'mechanical'
  | 'electrical'
  | 'software'
  | 'cyber'
  | 'quantity-surveying';

export interface Programme {
  id: string;
  title: string;
  category: 'engineering' | 'computing' | 'built-environment';
  school: string;
  qualification: string;
  affiliatedInstitution?: string;
  awardingBodyPlaceholder: string;
  duration: string;
  studyMode: string;
  studySchedule?: string;
  intakes: string[];
  nextIntakeHighlight?: string;
  imageSvgType: ImageSvgType;
  imageUrl?: string;
  heroImageUrl?: string;
  sampleBadgeNote: string;
  totalCredits?: string;
  moduleCount?: number;
  assessmentMethod?: string;
  assessmentNote?: string;
  overview: string;
  progressionOpportunities?: string[];
  whatYouWillLearn: string[];
  allModules?: AllModuleRow[];
  coreModulesYear1: string[];
  coreModulesYear2: string[];
  coreModulesYear3: string[];
  structureBreakdown?: StructureYear[];
  entryRequirements: string[];
  careerPathways: string[];
  industrySectors: string[];
  laboratories: string[];
  galleryImages?: GalleryImage[];
}

export const PROGRAMMES: Programme[] = ${serializeWithPhoto(ei)};
`;

fs.writeFileSync(path.join(outDir, 'programmes.ts'), progTs, 'utf8');

const siteTs = `import { photo } from '../lib/assets';

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

export const NEWS_ARTICLES: NewsArticle[] = ${serializeWithPhoto(ti)};

export const UPCOMING_EVENTS: CampusEvent[] = ${serializeWithPhoto(ni)};

export const CAMPUS_FACILITIES: CampusFacility[] = ${serializeWithPhoto(ri)};

export const FACULTY_MEMBERS: FacultyMember[] = ${serializeWithPhoto(ii)};

export const STUDENT_CLUBS: StudentClub[] = ${serializeWithPhoto(ai)};

export const INSTITUTION_INFO = ${JSON.stringify(F, null, 2)} as const;
`;

fs.writeFileSync(path.join(outDir, 'site.ts'), siteTs, 'utf8');
console.log('Generated programmes.ts and site.ts successfully!');
