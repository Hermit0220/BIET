import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Compass, Users } from 'lucide-react';
import { StructuredData } from '../components/seo/StructuredData';
import { SmartImage } from '../components/ui/SmartImage';
import { photo } from '../lib/assets';

interface StudentLifePageProps {
  onOpenConsultation: () => void;
}

export const StudentLifePage: React.FC<StudentLifePageProps> = ({ onOpenConsultation }) => (
  <main id="main-content" className="surface-light bg-white text-[#111111]">
    <StructuredData
      pageTitle="Student Life & Learning Environment"
      pageDescription="Discover the collaborative learning environment and academic student support at BIET Campus."
    />

    <section className="bg-[#111111] text-white py-12 lg:py-16 border-b border-[#262626]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 space-y-5">
        <nav aria-label="Breadcrumb" className="text-xs font-semibold text-white/70 flex items-center gap-2">
          <Link to="/" className="hover:text-[#FFCC00]">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#FFCC00]">Student Life</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="diagonal-accent-rule" aria-hidden="true" />
          <h1 className="heading-section text-white">
            More than what you study. It&apos;s who you become.
          </h1>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">
            Explore how classroom collaboration, lecturer mentorship and academic guidance shape the
            student learning experience at BIET Campus.
          </p>
        </div>
      </div>
    </section>

    <section className="py-16 lg:py-20 bg-white border-b border-[#E2E2E6]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 space-y-10">
        <figure className="space-y-2">
          <div className="aspect-[21/9] w-full overflow-hidden bg-[#1A1A1A] border border-[#E2E2E6]">
            <SmartImage
              src={photo('photo-1522202176988-66273c2fd55f')}
              alt="Illustrative collaborative student study discussion"
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="text-xs text-[#666666]">
            Illustrative collaborative learning environment imagery; authentic campus photographs and
            verified student societies will be published as confirmed by BIET.
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: BookOpen,
              title: 'Academic Learning Support',
              text: 'Structured study modules and academic advisory guidance designed to help students progress across core subjects.',
            },
            {
              icon: Users,
              title: 'Collaborative Peer Environment',
              text: 'Group project work, seminar discussions and guided problem-solving across business, computing and engineering cohorts.',
            },
            {
              icon: Compass,
              title: 'Pathway & Career Guidance',
              text: 'Admissions advisors assist learners in reviewing qualification prerequisites and further academic study routes.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px] space-y-3"
              >
                <div className="w-11 h-11 rounded-[4px] bg-[#111111] text-[#FFCC00] flex items-center justify-center">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h2 className="text-lg font-extrabold text-[#111111]">{item.title}</h2>
                <p className="text-sm text-[#666666] leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>

        <div className="p-6 bg-[#111111] text-white rounded-[4px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-white">
              Would you like to arrange a campus inquiry or visit?
            </h2>
            <p className="text-sm text-white/75">
              Speak with BIET admissions about facilities available for your programme of interest.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenConsultation}
            className="biet-btn-primary text-sm shrink-0"
          >
            <span>Request a Consultation</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  </main>
);
