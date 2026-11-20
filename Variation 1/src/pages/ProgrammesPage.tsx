import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Download,
  Search,
  Filter,
  Clock,
  Layers,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { PROGRAMMES, type Programme } from '../data/programmes';
import { SmartImage } from '../components/ui/SmartImage';
import { photo } from '../lib/assets';

interface ProgrammesPageProps {
  onSelectProgramme?: (prog: Programme) => void;
  onApplyForProgramme: (programmeTitle: string) => void;
  onProspectusClick: () => void;
}

export const ProgrammesPage: React.FC<ProgrammesPageProps> = ({
  onApplyForProgramme,
  onProspectusClick,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam &&
      ['all', 'engineering', 'computing', 'built-environment'].includes(categoryParam)
      ? categoryParam
      : 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (
      categoryParam &&
      ['all', 'engineering', 'computing', 'built-environment'].includes(categoryParam)
    ) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    if (val === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: val });
    }
  };

  const categories = [
    { label: `All (${PROGRAMMES.length})`, value: 'all' },
    {
      label: `Engineering (${PROGRAMMES.filter((p) => p.category === 'engineering').length})`,
      value: 'engineering',
    },
    {
      label: `Computing & IT (${PROGRAMMES.filter((p) => p.category === 'computing').length})`,
      value: 'computing',
    },
    {
      label: `Built Environment (${
        PROGRAMMES.filter((p) => p.category === 'built-environment').length
      })`,
      value: 'built-environment',
    },
  ];

  const filteredProgrammes = useMemo(
    () =>
      PROGRAMMES.filter((p) => {
        const matchesCat =
          selectedCategory === 'all' || p.category === selectedCategory;
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          searchQuery.trim() === '' ||
          p.title.toLowerCase().includes(q) ||
          p.school.toLowerCase().includes(q) ||
          p.overview.toLowerCase().includes(q) ||
          p.qualification.toLowerCase().includes(q) ||
          p.coreModulesYear1.some((m) => m.toLowerCase().includes(q)) ||
          p.coreModulesYear2.some((m) => m.toLowerCase().includes(q)) ||
          p.coreModulesYear3.some((m) => m.toLowerCase().includes(q));
        return matchesCat && matchesSearch;
      }),
    [selectedCategory, searchQuery]
  );

  return (
    <div className="bg-white text-[#111111]">
      <section className="relative overflow-hidden text-white py-16 lg:py-24 border-b border-[#1a3b61]/40 bg-[#001733]">
        {/* Background Image with Signature BIET Blue Gradient */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src={photo('photo-1581092160607-ee22621dd758')}
            alt=""
            className="w-full h-full object-cover object-center transform scale-105"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001633]/70 via-[#001633]/40 to-[#001633]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00142a]/60 via-transparent to-black/25" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
              <Link to="/" className="hover:text-white transition-colors text-white/60">
                Home
              </Link>
              <span aria-hidden="true" className="text-white/40">
                /
              </span>
              <span className="font-bold text-white">Programmes</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
              Academic Programmes
            </h1>
            <p className="text-base sm:text-lg text-neutral-200 max-w-3xl leading-relaxed">
              Undergraduate degree and diploma programmes combining British curricula with laboratory application in Colombo, Sri Lanka.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onProspectusClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#002147]" />
                <span>Prospectus</span>
              </button>
              <button
                onClick={() => onApplyForProgramme('General Engineering Admissions')}
                className="px-6 py-3.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl transition-colors cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#001a39] via-[#002147] to-[#001a39] p-4 sm:p-5 rounded-2xl border border-[#1a3b61]/60 shadow-xl mb-12 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 text-white">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#001428]/80 border border-[#1a3b61]/40 rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.value
                      ? 'bg-[#fdc800] text-[#002147] font-bold shadow-xs'
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="relative min-w-[280px]">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programmes..."
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#001428]/80 border border-[#1a3b61]/50 focus:border-[#fdc800] focus:ring-1 focus:ring-[#fdc800] rounded-xl outline-none transition-colors text-white placeholder:text-neutral-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-500 mb-6 px-1">
            <span>
              Showing <strong>{filteredProgrammes.length}</strong> programmes
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
          </div>

          {filteredProgrammes.length === 0 ? (
            <div className="p-16 text-center bg-white rounded-3xl border border-neutral-200 shadow-sm">
              <Filter className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-neutral-900">
                No matching programmes
              </h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                Try searching for other engineering or computing keywords.
              </p>
              <button
                onClick={() => {
                  handleCategoryChange('all');
                  setSearchQuery('');
                }}
                className="mt-5 px-5 py-2.5 text-xs font-semibold text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] rounded-xl cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProgrammes.map((prog) => (
                <div
                  key={prog.id}
                  className="flex flex-col justify-between bg-white rounded-3xl border border-neutral-200 hover:border-[#fdc800] transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden group"
                >
                  <div className="relative h-48 w-full overflow-hidden border-b border-neutral-100 bg-neutral-100">
                    <SmartImage
                      src={prog.imageUrl}
                      alt={prog.title}
                      imageSvgType={prog.imageSvgType}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                      <span className="px-2.5 py-0.5 rounded bg-[#002147]/90 backdrop-blur-md text-[11px] font-bold text-[#fdc800] uppercase tracking-wider">
                        {prog.school.replace('School of ', '')}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-300 bg-black/60 px-2 py-0.5 rounded">
                        {prog.qualification.split('/')[0]}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-neutral-500 flex-wrap gap-1">
                        <span className="font-semibold text-[#002147]">
                          {prog.school}
                        </span>
                        {prog.affiliatedInstitution && (
                          <span className="px-2 py-0.5 rounded bg-[#002147] text-[#fdc800] text-[10px] font-bold uppercase tracking-wider">
                            {prog.affiliatedInstitution}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-bold text-[#111111] group-hover:text-[#002147] transition-colors leading-snug">
                        <Link to={`/programmes/${prog.id}`} className="hover:underline">
                          {prog.title}
                        </Link>
                      </h2>
                      <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                        {prog.overview}
                      </p>
                      <div className="pt-3 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#002147] shrink-0" />
                          <span>Duration: {prog.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 text-[#002147] shrink-0" />
                          <span>Mode: {prog.studyMode}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#002147] shrink-0" />
                          <span>Intakes: {prog.intakes.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-5 mt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                      <Link
                        to={`/programmes/${prog.id}`}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#111111] bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-[#002147] rounded-xl transition-colors cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#111111]" />
                      </Link>
                      <button
                        onClick={() => onApplyForProgramme(prog.title)}
                        className="inline-flex items-center justify-center gap-1 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] rounded-xl transition-all shadow-xs active:scale-[0.98] cursor-pointer"
                      >
                        <span>Apply Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
