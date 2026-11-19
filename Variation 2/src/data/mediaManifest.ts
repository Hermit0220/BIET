import { asset, photo } from '../lib/assets';

export interface MediaAssetRecord {
  id: string;
  filename: string;
  url: string;
  sourcePage: string;
  creator: string;
  license: string;
  intendedLocation: string;
  isIllustrative: boolean;
  alt: string;
  caption: string;
}

/**
 * Hero video assets downloaded from permitted Pexels free-license pages into local storage.
 * Desktop (16:9, 1920x1080, 13s, 6,958,527 bytes):
 *   https://www.pexels.com/video/college-students-in-class-8196805/ (Creator: Yan Krukau)
 * Mobile portrait (9:16, 1440x2560, 10s, 8,257,022 bytes):
 *   https://www.pexels.com/video/classmates-studying-together-7969418/ (Creator: George Pak)
 */
export const HERO_MEDIA = {
  desktopMp4: asset('assets/media/hero-desktop-8196805.mp4'),
  mobileMp4: asset('assets/media/hero-mobile-7969418.mp4'),
  posterDesktop: photo('photo-1522202176988-66273c2fd55f'),
  posterMobile: photo('photo-1523240795612-9a054b0db644'),
  posterAlt: 'Students collaborating over laptops and study materials in a modern academic setting',
  posterCaption: 'Illustrative learning environment imagery',
};

export const MEDIA_MANIFEST: MediaAssetRecord[] = [
  {
    id: 'biet-logo',
    filename: 'public/assets/biet-logo.png',
    url: asset('assets/biet-logo.png'),
    sourcePage: 'BIET Official Repository (BIET-NEW)',
    creator: 'BIET Campus',
    license: 'Official Institutional Brand Asset',
    intendedLocation: 'Header, Expansive Menu Drawer, Footer',
    isIllustrative: false,
    alt: 'BIET Campus official logo',
    caption: 'Official BIET Campus identity mark',
  },
  {
    id: 'hero-poster-desktop',
    filename: 'public/assets/images/photo-1522202176988-66273c2fd55f.webp',
    url: photo('photo-1522202176988-66273c2fd55f'),
    sourcePage: 'Bundled Local Assets (originally Unsplash, converted to local WebP)',
    creator: 'Stock Learning Photography',
    license: 'Permitted local bundled asset — illustrative atmosphere only',
    intendedLocation: 'Hero poster fallback & Student Life banner',
    isIllustrative: true,
    alt: 'Students engaged in collaborative group study at a table',
    caption: 'Illustrative learning imagery — not depicted as BIET campus facilities',
  },
  {
    id: 'business-card',
    filename: 'public/assets/images/photo-1517245386807-bb43f82c33c4.webp',
    url: photo('photo-1517245386807-bb43f82c33c4'),
    sourcePage: 'Bundled Local Assets (converted to local WebP)',
    creator: 'Stock Academic Photography',
    license: 'Permitted local bundled asset — illustrative only',
    intendedLocation: 'Diploma in Business Management card',
    isIllustrative: true,
    alt: 'Collaborative business seminar discussion',
    caption: 'Illustrative business classroom discussion',
  },
  {
    id: 'computing-card',
    filename: 'public/assets/images/photo-1517694712202-14dd9538aa97.webp',
    url: photo('photo-1517694712202-14dd9538aa97'),
    sourcePage: 'Bundled Local Assets (converted to local WebP)',
    creator: 'Stock Technology Photography',
    license: 'Permitted local bundled asset — illustrative only',
    intendedLocation: 'Diploma in Computing card',
    isIllustrative: true,
    alt: 'Student working on software development code on a laptop workstation',
    caption: 'Illustrative computing and software study scene',
  },
  {
    id: 'engineering-foundation-card',
    filename: 'public/assets/images/photo-1581092160607-ee22621dd758.webp',
    url: photo('photo-1581092160607-ee22621dd758'),
    sourcePage: 'Bundled Local Assets (converted to local WebP)',
    creator: 'Stock Engineering Photography',
    license: 'Permitted local bundled asset — illustrative only',
    intendedLocation: 'Foundation in Engineering card',
    isIllustrative: true,
    alt: 'Technical engineering instrumentation and prototyping workbench',
    caption: 'Illustrative engineering learning imagery',
  },
  {
    id: 'english-card',
    filename: 'public/assets/images/photo-1524178232363-1fb2b075b655.webp',
    url: photo('photo-1524178232363-1fb2b075b655'),
    sourcePage: 'Bundled Local Assets (converted to local WebP)',
    creator: 'Stock Academic Photography',
    license: 'Permitted local bundled asset — illustrative only',
    intendedLocation: 'Diploma in English card',
    isIllustrative: true,
    alt: 'Classroom seminar discussion and academic presentation session',
    caption: 'Illustrative academic communication and presentation session',
  },
  {
    id: 'psychology-card',
    filename: 'public/assets/images/photo-1515378791036-0648a3ef77b2.webp',
    url: photo('photo-1515378791036-0648a3ef77b2'),
    sourcePage: 'Bundled Local Assets (converted to local WebP)',
    creator: 'Stock Academic Photography',
    license: 'Permitted local bundled asset — illustrative only (non-clinical)',
    intendedLocation: 'Diploma in Psychology card',
    isIllustrative: true,
    alt: 'Student reading academic seminar literature at a study desk',
    caption: 'Illustrative academic study scene (non-clinical)',
  },
  {
    id: 'editorial-ambitions',
    filename: 'public/assets/images/photo-1531482615713-2afd69097998.webp',
    url: photo('photo-1531482615713-2afd69097998'),
    sourcePage: 'Bundled Local Assets (converted to local WebP)',
    creator: 'Stock Academic Photography',
    license: 'Permitted local bundled asset — illustrative only',
    intendedLocation: 'Homepage H04 Education shaped around your ambitions',
    isIllustrative: true,
    alt: 'Academic mentors and learners reviewing project coursework together',
    caption: 'Illustrative mentored academic learning',
  },
  {
    id: 'editorial-guidance',
    filename: 'public/assets/images/photo-1516321318423-f06f85e504b3.webp',
    url: photo('photo-1516321318423-f06f85e504b3'),
    sourcePage: 'Bundled Local Assets (converted to local WebP)',
    creator: 'Stock Academic Photography',
    license: 'Permitted local bundled asset — illustrative only',
    intendedLocation: 'Homepage H04 Guidance Along the Way',
    isIllustrative: true,
    alt: 'Collaborative study and admissions planning desk session',
    caption: 'Illustrative academic advising session',
  },
];
