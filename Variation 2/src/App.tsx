import React, { useState, useRef, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteMenu } from './components/layout/SiteMenu';
import { SiteSearch } from './components/layout/SiteSearch';
import { ActionBar } from './components/layout/ActionBar';
import { Footer } from './components/layout/Footer';
import { ConsultationDialog } from './components/consultation/ConsultationDialog';
import { PathwayProvider, usePathway } from './context/PathwayContext';
import { HomePage } from './pages/HomePage';
import { getProgrammeBySlugOrId } from './data/catalogue';
import type { WhatsAppMessageContext } from './config/siteConfig';

const ProgrammesPage = lazy(() =>
  import('./pages/ProgrammesPage').then((m) => ({ default: m.ProgrammesPage }))
);
const ProgrammeDetailPage = lazy(() =>
  import('./pages/ProgrammeDetailPage').then((m) => ({ default: m.ProgrammeDetailPage }))
);
const FindMyPathPage = lazy(() =>
  import('./pages/FindMyPathPage').then((m) => ({ default: m.FindMyPathPage }))
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const AdmissionsPage = lazy(() =>
  import('./pages/AdmissionsPage').then((m) => ({ default: m.AdmissionsPage }))
);
const StudentLifePage = lazy(() =>
  import('./pages/StudentLifePage').then((m) => ({ default: m.StudentLifePage }))
);
const NewsPage = lazy(() =>
  import('./pages/NewsPage').then((m) => ({ default: m.NewsPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);

const AppShell: React.FC = () => {
  const location = useLocation();
  const { state: finderState, evaluation: finderEvaluation } = usePathway();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationProgrammeId, setConsultationProgrammeId] = useState<string>('');

  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);

  const openConsultation = (programmeId = '') => {
    setConsultationProgrammeId(programmeId);
    setConsultationOpen(true);
  };

  // Context-aware WhatsApp payload for ActionBar
  const whatsAppContext: WhatsAppMessageContext = (() => {
    if (location.pathname.startsWith('/programmes/')) {
      const slug = location.pathname.replace('/programmes/', '').split('/')[0];
      const prog = getProgrammeBySlugOrId(slug);
      if (prog) return { kind: 'programme', programmeTitle: prog.title };
    }
    if (location.pathname.startsWith('/find-my-path')) {
      const top =
        finderEvaluation.primarySuggestions[0]?.programme.title ||
        finderState.interests[0] ||
        'BIET Study Options';
      return { kind: 'finder', subjectOrProgramme: top };
    }
    return { kind: 'general' };
  })();

  // Suppress persistent bottom ActionBar while Finder steps 1–4 or Contact consultation form are active, or while an overlay dialog is open
  const isFinderStepsActive =
    location.pathname.startsWith('/find-my-path') && finderState.currentStep <= 4;
  const isContactPage = location.pathname.startsWith('/contact');
  const showActionBar =
    !menuOpen && !searchOpen && !consultationOpen && !isFinderStepsActive && !isContactPage;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111] font-sans antialiased">
      <SiteHeader
        onOpenSearch={() => setSearchOpen(true)}
        onOpenMenu={() => setMenuOpen(true)}
        menuTriggerRef={menuTriggerRef}
        searchTriggerRef={searchTriggerRef}
      />

      <div className="flex-1">
        <Suspense
          fallback={
            <div className="max-w-[1280px] mx-auto px-5 py-20 text-sm font-bold text-[#666666]">
              Loading page...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage onOpenConsultation={openConsultation} />} />
            <Route
              path="/about"
              element={<AboutPage onOpenConsultation={() => openConsultation()} />}
            />
            <Route
              path="/programmes"
              element={<ProgrammesPage onOpenConsultation={openConsultation} />}
            />
            <Route
              path="/programmes/:programmeId"
              element={<ProgrammeDetailPage onOpenConsultation={openConsultation} />}
            />
            <Route
              path="/admissions"
              element={<AdmissionsPage onOpenConsultation={() => openConsultation()} />}
            />
            <Route
              path="/student-life"
              element={<StudentLifePage onOpenConsultation={() => openConsultation()} />}
            />
            <Route
              path="/news"
              element={<NewsPage onOpenConsultation={openConsultation} />}
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/find-my-path"
              element={<FindMyPathPage onOpenConsultation={openConsultation} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>

      <Footer onRequestConsultation={() => openConsultation()} />

      <ActionBar
        visible={showActionBar}
        onRequestConsultation={() => openConsultation()}
        whatsAppContext={whatsAppContext}
      />

      <SiteMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenConsultation={() => openConsultation()}
        returnFocusRef={menuTriggerRef}
      />

      <SiteSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenConsultation={openConsultation}
        returnFocusRef={searchTriggerRef}
      />

      <ConsultationDialog
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        programmeId={consultationProgrammeId}
      />
    </div>
  );
};

export function App() {
  const baseName = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <BrowserRouter basename={baseName}>
      <ScrollToTop />
      <PathwayProvider>
        <AppShell />
      </PathwayProvider>
    </BrowserRouter>
  );
}

export default App;
