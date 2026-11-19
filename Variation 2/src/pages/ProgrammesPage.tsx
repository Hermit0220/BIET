import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ArrowRight,
  Compass,
  X,
  RotateCcw,
} from 'lucide-react';
import {
  getActiveCatalogue,
  getDerivedCampuses,
  getDerivedCategories,
  getDerivedLevels,
  getDerivedModes,
} from '../data/catalogue';
import { StructuredData } from '../components/seo/StructuredData';
import { SmartImage } from '../components/ui/SmartImage';

interface ProgrammesPageProps {
  onOpenConsultation: (programmeId?: string) => void;
}

export const ProgrammesPage: React.FC<ProgrammesPageProps> = ({ onOpenConsultation }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  );
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get('level') || 'all');
  const [selectedMode, setSelectedMode] = useState(searchParams.get('mode') || 'all');
  const [selectedCampus, setSelectedCampus] = useState(searchParams.get('campus') || 'all');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const activeCatalogue = useMemo(() => getActiveCatalogue(), []);
  const categories = useMemo(() => getDerivedCategories(), []);
  const levels = useMemo(() => getDerivedLevels(), []);
  const modes = useMemo(() => getDerivedModes(), []);
  const campuses = useMemo(() => getDerivedCampuses(), []);

  // Sync URL -> state on browser back/forward
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    setSelectedCategory(searchParams.get('category') || 'all');
    setSelectedLevel(searchParams.get('level') || 'all');
    setSelectedMode(searchParams.get('mode') || 'all');
    setSelectedCampus(searchParams.get('campus') || 'all');
  }, [searchParams]);

  const updateUrlParams = (
    next: Partial<{
      q: string;
      category: string;
      level: string;
      mode: string;
      campus: string;
    }>
  ) => {
    const merged = {
      q: next.q ?? query,
      category: next.category ?? selectedCategory,
      level: next.level ?? selectedLevel,
      mode: next.mode ?? selectedMode,
      campus: next.campus ?? selectedCampus,
    };
    const params = new URLSearchParams();
    if (merged.q.trim()) params.set('q', merged.q.trim());
    if (merged.category !== 'all') params.set('category', merged.category);
    if (merged.level !== 'all') params.set('level', merged.level);
    if (merged.mode !== 'all') params.set('mode', merged.mode);
    if (merged.campus !== 'all') params.set('campus', merged.campus);
    setSearchParams(params);
  };

  const filteredProgrammes = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = activeCatalogue.filter((prog) => {
      if (selectedCategory !== 'all' && prog.category !== selectedCategory) return false;
      if (selectedLevel !== 'all' && prog.qualificationLevel !== selectedLevel) return false;
      if (
        selectedMode !== 'all' &&
        !prog.deliveryModes.some((m) => m.toLowerCase() === selectedMode.toLowerCase())
      ) {
        return false;
      }
      if (
        selectedCampus !== 'all' &&
        !prog.campuses.some((c) => c.toLowerCase() === selectedCampus.toLowerCase())
      ) {
        return false;
      }
      if (!q) return true;
      return (
        prog.title.toLowerCase().includes(q) ||
        prog.category.toLowerCase().includes(q) ||
        prog.qualificationLevel.toLowerCase().includes(q) ||
        prog.shortDescription.toLowerCase().includes(q) ||
        prog.overview.toLowerCase().includes(q) ||
        prog.curriculumModules.some((m) => m.title.toLowerCase().includes(q))
      );
    });

    // Priority programmes lead the default marketing view cleanly
    return matched.sort((a, b) => {
      if (a.marketingPriority !== b.marketingPriority) {
        return a.marketingPriority ? -1 : 1;
      }
      return (a.priorityOrder ?? 50) - (b.priorityOrder ?? 50);
    });
  }, [activeCatalogue, query, selectedCategory, selectedLevel, selectedMode, selectedCampus]);

  const clearAllFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedMode('all');
    setSelectedCampus('all');
    setSearchParams({});
  };

  const hasActiveFilters =
    Boolean(query.trim()) ||
    selectedCategory !== 'all' ||
    selectedLevel !== 'all' ||
    selectedMode !== 'all' ||
    selectedCampus !== 'all';

  return (
    <main id="main-content" className="surface-light bg-white text-[#111111] min-h-screen">
      <StructuredData
        pageTitle="Programmes & Study Options Directory"
        pageDescription="Browse BIET Campus programmes across business management, computing, engineering, English, psychology and built environment."
      />

      {/* Top Breadcrumb + Charcoal/White Editorial Header */}
      <section className="bg-[#111111] text-white py-12 lg:py-16 border-b border-[#262626]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 space-y-5">
          <nav aria-label="Breadcrumb" className="text-xs font-semibold text-white/70 flex items-center gap-2">
            <Link to="/" className="hover:text-[#FFCC00] underline-offset-4 hover:underline">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#FFCC00]">Programmes</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="diagonal-accent-rule" aria-hidden="true" />
              <h1 className="heading-section text-white uppercase">Programmes Directory</h1>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                Explore study options across business, computing, engineering, English, psychology
                and built environment at BIET Campus.
              </p>
            </div>

            <Link
              to="/find-my-path"
              className="inline-flex items-center gap-2 min-h-[48px] px-5 bg-[#FFCC00] hover:bg-[#E6B800] text-[#111111] font-extrabold text-sm rounded-[4px] shrink-0 self-start lg:self-auto"
            >
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>Unsure? Find My Path</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Toolbar & Collapsible Multi-Column Filters (TCU Pattern + Live Count Upgrade) */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 space-y-8">
          <div className="border-b-2 border-[#111111] pb-5 space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Filter toggle + View mode toggle */}
              <div className="flex flex-wrap items-center gap-2 order-1 md:order-2">
                <button
                  type="button"
                  onClick={() => setFiltersOpen((prev) => !prev)}
                  aria-expanded={filtersOpen}
                  className={`inline-flex items-center gap-2 min-h-[48px] px-4 rounded-[4px] border-2 font-bold text-xs uppercase tracking-wider cursor-pointer ${
                    filtersOpen
                      ? 'bg-[#111111] text-[#FFCC00] border-[#111111]'
                      : 'bg-white text-[#111111] border-[#111111] hover:bg-[#F4F4F5]'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                  <span>Filters</span>
                </button>

                <div className="inline-flex border-2 border-[#111111] rounded-[4px] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    aria-pressed={viewMode === 'grid'}
                    className={`inline-flex items-center gap-1.5 min-h-[44px] px-3.5 text-xs font-extrabold uppercase cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-[#111111] text-[#FFCC00]'
                        : 'bg-white text-[#111111] hover:bg-[#F4F4F5]'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" aria-hidden="true" />
                    <span>View Grid</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    aria-pressed={viewMode === 'list'}
                    className={`inline-flex items-center gap-1.5 min-h-[44px] px-3.5 text-xs font-extrabold uppercase cursor-pointer border-l-2 border-[#111111] ${
                      viewMode === 'list'
                        ? 'bg-[#111111] text-[#FFCC00]'
                        : 'bg-white text-[#111111] hover:bg-[#F4F4F5]'
                    }`}
                  >
                    <List className="w-4 h-4" aria-hidden="true" />
                    <span>View List</span>
                  </button>
                </div>
              </div>

              {/* Prominent Search Input */}
              <div className="relative flex-1 max-w-xl order-2 md:order-1">
                <Search
                  className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  aria-label="Search all BIET programmes"
                  value={query}
                  onChange={(e) => {
                    const val = e.target.value;
                    setQuery(val);
                    updateUrlParams({ q: val });
                  }}
                  placeholder="Search programmes or subjects"
                  className="w-full min-h-[50px] pl-10 pr-4 rounded-[4px] border-2 border-[#111111]/30 focus:border-[#111111] bg-white text-base text-[#111111] placeholder-[#666666] focus:outline-none"
                />
              </div>
            </div>

            {/* Expandable Multi-Column Filter Drawer */}
            {filtersOpen && (
              <div className="p-5 sm:p-6 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#111111]">
                      Subject Category
                    </h2>
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2.5 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="filter-cat"
                        checked={selectedCategory === 'all'}
                        onChange={() => {
                          setSelectedCategory('all');
                          updateUrlParams({ category: 'all' });
                        }}
                        className="w-4 h-4 accent-[#111111]"
                      />
                      <span>All subject areas</span>
                    </label>
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-2.5 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="filter-cat"
                          checked={selectedCategory === cat}
                          onChange={() => {
                            setSelectedCategory(cat);
                            updateUrlParams({ category: cat });
                          }}
                          className="w-4 h-4 accent-[#111111]"
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#111111] mb-2.5">
                    Qualification Level
                  </h2>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2.5 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="filter-level"
                        checked={selectedLevel === 'all'}
                        onChange={() => {
                          setSelectedLevel('all');
                          updateUrlParams({ level: 'all' });
                        }}
                        className="w-4 h-4 accent-[#111111]"
                      />
                      <span>All levels</span>
                    </label>
                    {levels.map((lvl) => (
                      <label key={lvl} className="flex items-center gap-2.5 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="filter-level"
                          checked={selectedLevel === lvl}
                          onChange={() => {
                            setSelectedLevel(lvl);
                            updateUrlParams({ level: lvl });
                          }}
                          className="w-4 h-4 accent-[#111111]"
                        />
                        <span>{lvl}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#111111] mb-2.5">
                    Delivery Mode
                  </h2>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2.5 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="filter-mode"
                        checked={selectedMode === 'all'}
                        onChange={() => {
                          setSelectedMode('all');
                          updateUrlParams({ mode: 'all' });
                        }}
                        className="w-4 h-4 accent-[#111111]"
                      />
                      <span>Any study mode</span>
                    </label>
                    {modes.map((m) => (
                      <label key={m} className="flex items-center gap-2.5 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="filter-mode"
                          checked={selectedMode === m}
                          onChange={() => {
                            setSelectedMode(m);
                            updateUrlParams({ mode: m });
                          }}
                          className="w-4 h-4 accent-[#111111]"
                        />
                        <span>{m}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-4">
                  <div>
                    <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#111111] mb-2.5">
                      Campus Availability
                    </h2>
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2.5 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="filter-campus"
                          checked={selectedCampus === 'all'}
                          onChange={() => {
                            setSelectedCampus('all');
                            updateUrlParams({ campus: 'all' });
                          }}
                          className="w-4 h-4 accent-[#111111]"
                        />
                        <span>All locations</span>
                      </label>
                      {campuses.map((c) => (
                        <label key={c} className="flex items-center gap-2.5 text-sm cursor-pointer">
                          <input
                            type="radio"
                            name="filter-campus"
                            checked={selectedCampus === c}
                            onChange={() => {
                              setSelectedCampus(c);
                              updateUrlParams({ campus: c });
                            }}
                            className="w-4 h-4 accent-[#111111]"
                          />
                          <span>{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFiltersOpen(false)}
                    className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-4 bg-[#111111] text-white text-xs font-bold uppercase rounded-[4px] cursor-pointer self-start"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                    <span>Close Filters</span>
                  </button>
                </div>
              </div>
            )}

            {/* Result Counter & Active Filter Chips */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span aria-live="polite" className="font-bold text-[#111111]">
                  Showing {filteredProgrammes.length} of {activeCatalogue.length} programmes
                </span>

                {selectedCategory !== 'all' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      updateUrlParams({ category: 'all' });
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FFF0B3] border border-[#111111] rounded-[4px] text-xs font-bold cursor-pointer"
                  >
                    <span>Category: {selectedCategory}</span>
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}

                {selectedLevel !== 'all' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLevel('all');
                      updateUrlParams({ level: 'all' });
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FFF0B3] border border-[#111111] rounded-[4px] text-xs font-bold cursor-pointer"
                  >
                    <span>Level: {selectedLevel}</span>
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}

                {selectedMode !== 'all' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMode('all');
                      updateUrlParams({ mode: 'all' });
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FFF0B3] border border-[#111111] rounded-[4px] text-xs font-bold cursor-pointer"
                  >
                    <span>Mode: {selectedMode}</span>
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}

                {selectedCampus !== 'all' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCampus('all');
                      updateUrlParams({ campus: 'all' });
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FFF0B3] border border-[#111111] rounded-[4px] text-xs font-bold cursor-pointer"
                  >
                    <span>Campus: {selectedCampus}</span>
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#111111] underline cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Clear All</span>
                </button>
              )}
            </div>
          </div>

          {/* Empty State vs Results Grid / List */}
          {filteredProgrammes.length === 0 ? (
            <div className="p-10 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px] text-center space-y-4">
              <h2 className="text-xl font-extrabold text-[#111111]">No programmes matched</h2>
              <p className="text-sm text-[#666666] max-w-md mx-auto">
                No active programmes matched your selected filters. Try clearing filters or explore
                guided study options through Find My Path.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button type="button" onClick={clearAllFilters} className="biet-btn-primary text-sm">
                  Clear All Filters
                </button>
                <Link to="/find-my-path" className="biet-btn-secondary-light text-sm">
                  Open Find My Path
                </Link>
              </div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProgrammes.map((prog) => (
                <article
                  key={prog.id}
                  className="bg-[#111111] text-white border border-[#262626] rounded-[4px] overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    <div className="aspect-[16/10] w-full overflow-hidden bg-[#1A1A1A] relative">
                      <SmartImage
                        src={prog.media.imageUrl}
                        alt={prog.media.alt}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                      {prog.marketingPriority && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#FFCC00] text-[#111111] text-[10px] font-extrabold uppercase tracking-wider rounded-[4px]">
                          Priority Programme
                        </span>
                      )}
                    </div>
                    <div className="p-6 space-y-3">
                      <span className="block text-[11px] font-bold uppercase tracking-widest text-[#FFCC00]">
                        {prog.category}
                      </span>
                      <h2 className="heading-card text-white">
                        <Link
                          to={`/programmes/${prog.slug}`}
                          className="hover:text-[#FFCC00] transition-colors"
                        >
                          {prog.title}
                        </Link>
                      </h2>
                      <div className="w-10 h-[2px] bg-[#FFCC00]" aria-hidden="true" />
                      <p className="text-sm text-white/80 leading-relaxed line-clamp-3">
                        {prog.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-[#262626] flex items-center justify-between gap-2">
                    <Link
                      to={`/programmes/${prog.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#FFCC00] hover:underline"
                    >
                      <span>View Programme</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <span className="text-xs font-mono text-white/65">
                      {prog.qualificationLevel}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <ul className="divide-y divide-[#E2E2E6] border-y border-[#E2E2E6]">
              {filteredProgrammes.map((prog) => (
                <li
                  key={prog.id}
                  className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#666666]">
                      <span>{prog.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{prog.qualificationLevel}</span>
                      {prog.duration && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{prog.duration}</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-xl font-extrabold text-[#111111]">
                      <Link to={`/programmes/${prog.slug}`} className="hover:underline">
                        {prog.title}
                      </Link>
                    </h2>
                    <p className="text-sm text-[#666666]">{prog.shortDescription}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      to={`/programmes/${prog.slug}`}
                      className="biet-btn-secondary-light text-xs min-h-[44px] px-4"
                    >
                      View Programme
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Callout for Undecided Visitors */}
          <div className="p-6 sm:p-8 bg-[#111111] text-white rounded-[4px] border border-[#262626] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#FFCC00]">
                <Compass className="w-4 h-4" aria-hidden="true" />
                <span>Find My Path</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Comparing qualifications or unsure where to start?
              </h3>
              <p className="text-sm text-white/80">
                Answer four short steps about your background and interests to explore suitable study
                routes, or request a consultation with BIET admissions.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link to="/find-my-path" className="biet-btn-primary text-sm">
                Launch Find My Path
              </Link>
              <button
                type="button"
                onClick={() => onOpenConsultation()}
                className="biet-btn-secondary-dark text-sm"
              >
                Request Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
