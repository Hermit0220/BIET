import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Award, Eye, Compass } from 'lucide-react';
import { INSTITUTION_INFO, FACULTY_MEMBERS } from '../data/site';
import { photo } from '../lib/assets';
import { SmartImage } from '../components/ui/SmartImage';

interface AboutPageProps {
  onApplyClick: () => void;
  onProspectusClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onApplyClick,
  onProspectusClick,
}) => (
  <div className="bg-white text-[#111111]">
    <section className="relative overflow-hidden text-white py-16 lg:py-24 border-b border-[#1a3b61]/40 bg-[#001733]">
      {/* Background Image with Signature BIET Blue Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src={photo('photo-1541339907198-e08756dedf3f')}
          alt=""
          className="w-full h-full object-cover object-center opacity-60 transform scale-105"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001633]/45 via-[#001633]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70 mb-3">
          <Link to="/" className="hover:text-white transition-colors text-white/60">
            Home
          </Link>
          <span aria-hidden="true" className="text-white/40">
            /
          </span>
          <span className="font-bold text-white">About BIET</span>
        </div>
        <div className="max-w-4xl space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
            Advancing Engineering Excellence
          </h1>
          <p className="text-base sm:text-lg text-neutral-200 max-w-3xl leading-relaxed">
            The British Institute of Engineering and Technology (BIET) delivers higher education across engineering, computing, and the built environment with British curricula in Sri Lanka.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 bg-[#001a39]/80 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-[#1a3b61]/60 text-white font-semibold">
              <Building2 className="w-4 h-4 text-[#fdc800]" />
              <span>Colombo Campus, Sri Lanka</span>
            </span>
            <span className="flex items-center gap-1.5 bg-[#001a39]/80 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-[#1a3b61]/60 text-white font-semibold">
              <Award className="w-4 h-4 text-[#fdc800]" />
              <span>British Curriculum Benchmarks</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147]">
              <span className="w-6 h-0.5 bg-[#fdc800]" />
              <span>Our Heritage & Purpose</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111] leading-tight">
              Theory and Laboratory Practice Combined
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              BIET was established to provide students in Sri Lanka with internationally benchmarked engineering and computing education. We integrate physical experimentation, workshops, and computer-aided engineering tools directly into our undergraduate curriculum.
            </p>
            <p className="text-base text-neutral-600 leading-relaxed">
              From our Colombo campus, students have regular access to materials testing bays, robotics suites, and computing laboratories, preparing them for technical leadership in Sri Lanka and abroad.
            </p>
            <div className="pt-3 flex flex-wrap gap-4">
              <button
                onClick={onApplyClick}
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#e6b800] rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Apply Now
              </button>
              <button
                onClick={onProspectusClick}
                className="px-6 py-3.5 text-xs font-semibold text-[#111111] bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-black rounded-xl transition-colors cursor-pointer"
              >
                Download Prospectus
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#002147] to-[#001a39] text-white rounded-3xl border border-[#1a3b61]/60 p-8 space-y-5 shadow-xl">
            <h3 className="text-lg font-bold text-white pb-3 border-b border-[#1a3b61]/50 flex items-center justify-between">
              <span>Institutional Profile</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#fdc800]" />
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[#d0d6dd] font-medium block">Institution</span>
                <span className="text-white font-bold text-sm">{INSTITUTION_INFO.name}</span>
              </div>
              <div>
                <span className="text-[#d0d6dd] font-medium block">Location</span>
                <span className="text-white font-bold text-sm">Colombo, Sri Lanka</span>
              </div>
              <div>
                <span className="text-[#d0d6dd] font-medium block">Academic Schools</span>
                <span className="text-white font-bold text-sm">
                  School of Engineering · School of Computing & IT · School of Built Environment
                </span>
              </div>
              <div>
                <span className="text-[#d0d6dd] font-medium block">Award Pathways</span>
                <span className="text-[#fdc800] font-bold text-sm">
                  Higher National Diplomas (HND) · BEng (Hons) · BSc (Hons)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147] mb-3">
            <span className="w-6 h-0.5 bg-[#fdc800]" />
            <span>Institutional Direction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
            Vision & Mission
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 bg-white rounded-3xl border-2 border-neutral-200 hover:border-[#fdc800] transition-all space-y-4 shadow-sm">
            <div className="w-12 h-1 bg-[#fdc800] mb-2" />
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147]">
              <Eye className="w-5 h-5 text-[#002147]" />
              <span>Our Vision</span>
            </div>
            <h3 className="text-2xl font-bold text-[#111111]">
              To be a leading institution for applied engineering rigor and technology education in South Asia.
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Developing graduates recognized for practical proficiency, problem-solving agility, and ethical stewardship.
            </p>
          </div>
          <div className="p-8 sm:p-10 bg-white rounded-3xl border-2 border-neutral-200 hover:border-[#fdc800] transition-all space-y-4 shadow-sm">
            <div className="w-12 h-1 bg-[#002147] mb-2" />
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147]">
              <Compass className="w-5 h-5 text-[#002147]" />
              <span>Our Mission</span>
            </div>
            <h3 className="text-2xl font-bold text-[#111111]">
              Delivering high-caliber, British-benchmarked education through disciplined inquiry and laboratory immersion.
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Empowering students with hands-on skills, industry projects, and direct progression to recognized degrees.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147] mb-3">
            <span className="w-6 h-0.5 bg-[#fdc800]" />
            <span>Core Values</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
            Our Guiding Principles
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            The principles guiding teaching, research ethics, and student development at BIET.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Academic Rigor',
              description:
                'Upholding the theoretical depth and precision demanded by British engineering benchmark statements.',
            },
            {
              title: 'Hands-On Labs',
              description:
                'Ensuring theoretical formulations are verified through weekly laboratory experimentation and testing.',
            },
            {
              title: 'Professional Ethics',
              description:
                'Cultivating engineering ethics, safety standards, and environmental responsibility across all built assets.',
            },
            {
              title: 'Industry Relevance',
              description:
                'Maintaining consultative relationships with industry practitioners to ensure contemporary curricula.',
            },
            {
              title: 'Global Progression',
              description:
                'Structuring qualifications to support seamless pathways into international bachelor’s top-ups and research.',
            },
            {
              title: 'Innovation & Agility',
              description:
                'Fostering independent inquiry and computational analysis to solve emerging engineering challenges.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border border-neutral-200 hover:border-[#fdc800] transition-all space-y-3 shadow-xs hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-[#002147]">0{idx + 1}.</span>
                <span className="w-2 h-2 rounded-full bg-[#fdc800]" />
              </div>
              <h3 className="text-base font-bold text-[#111111]">{item.title}</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147] mb-3">
            <span className="w-6 h-0.5 bg-[#fdc800]" />
            <span>Faculty Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
            Deans & Faculty Heads
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            Academic leaders and chartered engineers dedicated to curriculum standards and student achievement.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACULTY_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#fdc800] transition-all group"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden border-b border-neutral-200 bg-neutral-100">
                  <SmartImage
                    src={member.imageUrl || photo('photo-1534528741775-53994a69daeb')}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3">
                    <span className="px-2 py-0.5 rounded bg-[#002147]/85 backdrop-blur-md text-[10px] font-bold text-[#fdc800] uppercase tracking-wider">
                      {member.department.split('&')[0]}
                    </span>
                  </div>
                </div>
                <div className="p-6 pb-2">
                  <h3 className="text-base font-bold text-[#111111]">{member.name}</h3>
                  <div className="text-xs text-[#002147] font-semibold mt-0.5">{member.role}</div>
                  <p className="text-xs text-neutral-600 leading-relaxed mt-3 pt-3 border-t border-neutral-100">
                    {member.bio}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-2 text-[11px] text-neutral-400 border-t border-neutral-100">
                BIET Colombo Campus
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
          Explore Academic Opportunities
        </h2>
        <p className="text-sm text-neutral-600 max-w-xl mx-auto">
          Discover undergraduate degree programmes in Engineering, Computing, and Built Environment.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/programmes"
            className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#e6b800] rounded-xl transition-all shadow-sm"
          >
            Explore Programmes
          </Link>
          <button
            onClick={onApplyClick}
            className="px-6 py-3.5 text-xs font-semibold text-[#111111] bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-black rounded-xl transition-colors cursor-pointer"
          >
            Apply Now
          </button>
        </div>
      </div>
    </section>
  </div>
);
