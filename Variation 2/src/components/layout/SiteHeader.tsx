import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, Compass } from 'lucide-react';
import { LOGO } from '../../lib/assets';
import { siteConfig } from '../../config/siteConfig';

interface SiteHeaderProps {
  onOpenSearch: () => void;
  onOpenMenu: () => void;
  menuTriggerRef: React.RefObject<HTMLButtonElement | null>;
  searchTriggerRef: React.RefObject<HTMLButtonElement | null>;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  onOpenSearch,
  onOpenMenu,
  menuTriggerRef,
  searchTriggerRef,
}) => {
  const location = useLocation();
  const isProgrammes = location.pathname.startsWith('/programmes');
  const isFinder = location.pathname.startsWith('/find-my-path');

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:px-4 focus:py-3 focus:bg-[#FFCC00] focus:text-[#111111] focus:font-extrabold focus:rounded-[4px] focus:border-2 focus:border-[#111111]"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-[40] w-full bg-[#111111] text-white border-b border-[#262626] h-[68px] md:h-[80px] flex items-center">
        <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            to="/"
            className="inline-flex items-center gap-3 shrink-0 focus-visible:outline-[#FFCC00]"
            aria-label={`${siteConfig.brandDisplay} — Homepage`}
          >
            <span className="bg-white px-2.5 py-1.5 rounded-[4px] flex items-center justify-center shrink-0">
              <img
                src={LOGO}
                alt={`${siteConfig.brandDisplay} official logo`}
                className="h-8 md:h-10 w-auto object-contain block"
                loading="eager"
                decoding="async"
              />
            </span>
          </Link>

          {/* Compact High-Contrast Controls: Programmes, Find My Path, Search, Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/programmes"
              className={`hidden md:inline-flex items-center min-h-[44px] px-4 text-sm font-bold rounded-[4px] transition-colors ${
                isProgrammes
                  ? 'text-[#FFCC00] bg-[#1A1A1A]'
                  : 'text-white hover:text-[#FFCC00] hover:bg-[#1A1A1A]'
              }`}
            >
              Programmes
            </Link>

            <Link
              to="/find-my-path"
              className={`hidden sm:inline-flex items-center gap-1.5 min-h-[44px] px-4 text-sm font-bold rounded-[4px] border-2 transition-colors ${
                isFinder
                  ? 'bg-[#FFCC00] text-[#111111] border-[#FFCC00]'
                  : 'border-[#FFCC00] text-[#FFCC00] hover:bg-[#FFCC00] hover:text-[#111111]'
              }`}
            >
              <Compass className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Find My Path</span>
            </Link>

            <button
              ref={searchTriggerRef}
              type="button"
              onClick={onOpenSearch}
              aria-label="Search programmes and pages"
              className="inline-flex items-center justify-center gap-2 min-w-[44px] min-h-[44px] px-3 sm:px-4 rounded-[4px] bg-[#1A1A1A] hover:bg-[#262626] border border-[#262626] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#FFCC00]" aria-hidden="true" />
              <span className="hidden lg:inline">Search</span>
            </button>

            <button
              ref={menuTriggerRef}
              type="button"
              onClick={onOpenMenu}
              aria-label="Open full site navigation menu"
              className="inline-flex items-center justify-center gap-2 min-w-[44px] min-h-[44px] px-3.5 sm:px-4 rounded-[4px] bg-[#FFCC00] hover:bg-[#E6B800] text-[#111111] text-sm font-extrabold transition-colors cursor-pointer"
            >
              <Menu className="w-4 h-4" aria-hidden="true" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
