import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloat } from './components/layout/WhatsAppFloat';
import { ApplicationModal } from './components/modals/ApplicationModal';
import { ProgrammeQuickViewModal } from './components/modals/ProgrammeQuickViewModal';
import { ProspectusModal } from './components/modals/ProspectusModal';
import { NewsArticleModal } from './components/modals/NewsArticleModal';
import { PathwayAdminModal } from './components/modals/PathwayAdminModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgrammesPage } from './pages/ProgrammesPage';
import { ProgrammeDetailPage } from './pages/ProgrammeDetailPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { StudentLifePage } from './pages/StudentLifePage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';
import { FindMyPathPage } from './pages/FindMyPathPage';
import type { Programme } from './data/programmes';
import type { NewsArticle } from './data/site';

export function App() {
  const [applyOpen, setApplyOpen] = useState(false);
  const [defaultProgramme, setDefaultProgramme] = useState('');
  const [prospectusOpen, setProspectusOpen] = useState(false);
  const [quickViewProgramme, setQuickViewProgramme] = useState<Programme | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);

  const handleOpenApply = (programmeTitle = '') => {
    setDefaultProgramme(programmeTitle);
    setApplyOpen(true);
  };

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white text-[#111111] font-sans antialiased selection:bg-[#fdc800] selection:text-[#002147]">
        <Header onApplyClick={() => handleOpenApply('')} />
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onApplyClick={handleOpenApply}
                  onProspectusClick={() => setProspectusOpen(true)}
                  onSelectProgramme={(prog) => setQuickViewProgramme(prog)}
                  onSelectArticle={(article) => setSelectedArticle(article)}
                />
              }
            />
            <Route
              path="/about"
              element={
                <AboutPage
                  onApplyClick={() => handleOpenApply('')}
                  onProspectusClick={() => setProspectusOpen(true)}
                />
              }
            />
            <Route
              path="/programmes"
              element={
                <ProgrammesPage
                  onApplyForProgramme={handleOpenApply}
                  onProspectusClick={() => setProspectusOpen(true)}
                />
              }
            />
            <Route
              path="/programmes/:programmeId"
              element={
                <ProgrammeDetailPage
                  onApplyClick={handleOpenApply}
                  onProspectusClick={() => setProspectusOpen(true)}
                />
              }
            />
            <Route
              path="/admissions"
              element={
                <AdmissionsPage
                  onApplyClick={() => handleOpenApply('')}
                  onProspectusClick={() => setProspectusOpen(true)}
                />
              }
            />
            <Route
              path="/student-life"
              element={
                <StudentLifePage
                  onApplyClick={() => handleOpenApply('')}
                  onProspectusClick={() => setProspectusOpen(true)}
                />
              }
            />
            <Route
              path="/news"
              element={
                <NewsPage
                  onSelectArticle={(article) => setSelectedArticle(article)}
                  onApplyClick={() => handleOpenApply('')}
                />
              }
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/find-my-path"
              element={
                <FindMyPathPage
                  onApplyClick={handleOpenApply}
                  onSelectProgramme={(prog) => setQuickViewProgramme(prog)}
                  onOpenAdmin={() => setAdminOpen(true)}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer
          onApplyClick={() => handleOpenApply('')}
          onProspectusClick={() => setProspectusOpen(true)}
        />
        <WhatsAppFloat />
        <ApplicationModal
          isOpen={applyOpen}
          onClose={() => setApplyOpen(false)}
          defaultProgramme={defaultProgramme}
        />
        <ProgrammeQuickViewModal
          programme={quickViewProgramme}
          onClose={() => setQuickViewProgramme(null)}
          onApply={(title) => handleOpenApply(title)}
        />
        <ProspectusModal isOpen={prospectusOpen} onClose={() => setProspectusOpen(false)} />
        <NewsArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onApplyClick={() => handleOpenApply('')}
        />
        <PathwayAdminModal isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
      </div>
    </BrowserRouter>
  );
}

export default App;
