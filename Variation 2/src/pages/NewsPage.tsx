import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';
import { StructuredData } from '../components/seo/StructuredData';
import { NEWS_ARTICLES } from '../data/site';

interface NewsPageProps {
  onOpenConsultation: (programmeId?: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onOpenConsultation }) => (
  <main id="main-content" className="surface-light bg-white text-[#111111]">
    <StructuredData
      pageTitle="News & Events"
      pageDescription="Official announcements and institutional updates from BIET Campus."
    />

    <section className="bg-[#111111] text-white py-12 lg:py-16 border-b border-[#262626]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 space-y-5">
        <nav aria-label="Breadcrumb" className="text-xs font-semibold text-white/70 flex items-center gap-2">
          <Link to="/" className="hover:text-[#FFCC00]">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#FFCC00]">News &amp; Events</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="diagonal-accent-rule" aria-hidden="true" />
          <h1 className="heading-section text-white">News &amp; Institutional Events</h1>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">
            Verified announcements, intake notices and upcoming campus events approved for
            publication by BIET Campus.
          </p>
        </div>
      </div>
    </section>

    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 max-w-4xl space-y-8">
        {/* Honest Empty State for Approved Current News / Upcoming Events */}
        <div className="p-6 sm:p-8 bg-[#FFF0B3] border-2 border-[#111111] rounded-[4px] space-y-4">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-[#111111] shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-[#111111]">
                No Confirmed Upcoming Events Currently Scheduled Online
              </h2>
              <p className="text-sm sm:text-base text-[#111111]/85 leading-relaxed">
                Confirmed intake announcements, guest lectures and campus event dates are published
                here once approved by BIET. To enquire about the next cohort or request campus
                information, please contact admissions directly.
              </p>
            </div>
          </div>
          <div className="pl-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onOpenConsultation()}
              className="biet-btn-secondary-light bg-white text-sm"
            >
              <span>Enquire About Upcoming Intakes</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <Link to="/programmes" className="biet-btn-primary text-sm">
              Browse Programmes
            </Link>
          </div>
        </div>

        {/* Historical / Draft Reference Notices Transparently Separated (Never Presented as Live Confirmed Events) */}
        <details className="p-6 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px] space-y-4">
          <summary className="text-base font-extrabold text-[#111111] cursor-pointer">
            Review Draft Repository Sample Notices (Pending BIET Approval)
          </summary>
          <div className="pt-4 space-y-4 border-t border-[#E2E2E6]">
            {NEWS_ARTICLES.map((art) => (
              <article
                key={art.id}
                className="p-4 bg-white border border-[#E2E2E6] rounded-[4px] space-y-1.5"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#666666]">
                  <span className="px-2 py-0.5 bg-[#111111] text-[#FFCC00] font-bold uppercase rounded-[4px]">
                    Draft Sample · {art.category}
                  </span>
                  <span>{art.date}</span>
                </div>
                <h3 className="text-base font-extrabold text-[#111111]">{art.title}</h3>
                <p className="text-sm text-[#666666]">{art.summary}</p>
              </article>
            ))}
          </div>
        </details>
      </div>
    </section>
  </main>
);
