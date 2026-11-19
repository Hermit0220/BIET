import React, { useState, useEffect } from 'react';
import { photo, resolveImageUrl } from '../../lib/assets';
import type { ImageSvgType } from '../../data/programmes';

interface TechnicalGraphicProps {
  type: ImageSvgType;
  className?: string;
}

export const TechnicalGraphic: React.FC<TechnicalGraphicProps> = ({
  type,
  className = 'w-full h-48',
}) => (
  <div
    className={`relative overflow-hidden bg-[#001a39] flex items-center justify-center ${className}`}
  >
    <div
      className="absolute inset-0 opacity-[0.12] pointer-events-none"
      style={{
        backgroundImage: `
            linear-gradient(to right, #FFFFFF 1px, transparent 1px),
            linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)
          `,
        backgroundSize: '24px 24px',
      }}
    />
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#fdc800]/15 rounded-full blur-2xl pointer-events-none" />
    {type === 'civil' && (
      <svg viewBox="0 0 400 200" className="w-full h-full p-4 relative z-10 text-white/90">
        <defs>
          <linearGradient id="yellowGradCivil" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdc800" />
            <stop offset="100%" stopColor="#e6b800" />
          </linearGradient>
        </defs>
        <line x1="40" y1="160" x2="360" y2="160" stroke="#fdc800" strokeWidth="3" />
        <line
          x1="40"
          y1="80"
          x2="360"
          y2="80"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <polyline
          points="40,160 80,80 120,160 160,80 200,160 240,80 280,160 320,80 360,160"
          fill="none"
          stroke="url(#yellowGradCivil)"
          strokeWidth="2.5"
        />
        <line x1="80" y1="80" x2="80" y2="160" stroke="white" strokeWidth="1.5" opacity="0.6" />
        <line x1="160" y1="80" x2="160" y2="160" stroke="white" strokeWidth="1.5" opacity="0.6" />
        <line x1="240" y1="80" x2="240" y2="160" stroke="white" strokeWidth="1.5" opacity="0.6" />
        <line x1="320" y1="80" x2="320" y2="160" stroke="white" strokeWidth="1.5" opacity="0.6" />
        <rect
          x="30"
          y="160"
          width="30"
          height="25"
          fill="#333333"
          stroke="#fdc800"
          strokeWidth="1"
        />
        <rect
          x="185"
          y="160"
          width="30"
          height="25"
          fill="#333333"
          stroke="#fdc800"
          strokeWidth="1"
        />
        <rect
          x="340"
          y="160"
          width="30"
          height="25"
          fill="#333333"
          stroke="#fdc800"
          strokeWidth="1"
        />
        <text x="50" y="50" fill="#fdc800" fontSize="11" fontFamily="monospace" fontWeight="bold">
          STRUCTURAL MECHANICS · CAD/BIM
        </text>
        <text x="280" y="50" fill="#888888" fontSize="10" fontFamily="monospace">
          LOAD: 450 kN/m²
        </text>
      </svg>
    )}
    {type === 'mechanical' && (
      <svg viewBox="0 0 400 200" className="w-full h-full p-4 relative z-10 text-white/90">
        <defs>
          <linearGradient id="yellowGradMech" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdc800" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>
        <circle cx="150" cy="110" r="45" fill="none" stroke="#fdc800" strokeWidth="2.5" />
        <circle cx="150" cy="110" r="22" fill="#222222" stroke="white" strokeWidth="1.5" />
        <circle cx="150" cy="110" r="8" fill="#fdc800" />
        <circle
          cx="230"
          cy="80"
          r="32"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
        <circle cx="230" cy="80" r="14" fill="#222222" stroke="#fdc800" strokeWidth="1.5" />
        <path
          d="M 270 120 Q 320 120 340 150"
          fill="none"
          stroke="#fdc800"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
        <line
          x1="260"
          y1="140"
          x2="350"
          y2="140"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="6 3"
        />
        <text x="50" y="45" fill="#fdc800" fontSize="11" fontFamily="monospace" fontWeight="bold">
          THERMODYNAMICS & CNC AUTOMATION
        </text>
        <text x="50" y="180" fill="#888888" fontSize="10" fontFamily="monospace">
          TORSION: 240 Nm · SPEED: 1800 RPM
        </text>
      </svg>
    )}
    {type === 'electrical' && (
      <svg viewBox="0 0 400 200" className="w-full h-full p-4 relative z-10 text-white/90">
        <rect
          x="140"
          y="60"
          width="80"
          height="80"
          rx="6"
          fill="#1C1C1C"
          stroke="#fdc800"
          strokeWidth="2"
        />
        <circle cx="155" cy="75" r="4" fill="#fdc800" />
        <text x="150" y="105" fill="white" fontSize="10" fontFamily="monospace" fontWeight="bold">
          ARM/C++
        </text>
        <path d="M 50 70 L 110 70 L 140 85" fill="none" stroke="#fdc800" strokeWidth="2" />
        <path d="M 50 130 L 100 130 L 140 115" fill="none" stroke="white" strokeWidth="1.5" />
        <path d="M 220 85 L 260 70 L 340 70" fill="none" stroke="#fdc800" strokeWidth="2" />
        <path d="M 220 115 L 270 135 L 340 135" fill="none" stroke="white" strokeWidth="1.5" />
        <path
          d="M 50 35 Q 70 15 90 35 T 130 35 T 170 35 T 210 35 T 250 35 T 290 35 T 330 35"
          fill="none"
          stroke="#fdc800"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <text x="50" y="180" fill="#fdc800" fontSize="11" fontFamily="monospace" fontWeight="bold">
          POWER GRIDS · EMBEDDED SYSTEMS
        </text>
        <text x="250" y="180" fill="#888888" fontSize="10" fontFamily="monospace">
          FREQ: 50 Hz · 400V
        </text>
      </svg>
    )}
    {type === 'software' && (
      <svg viewBox="0 0 400 200" className="w-full h-full p-4 relative z-10 text-white/90">
        <rect
          x="50"
          y="70"
          width="70"
          height="50"
          rx="8"
          fill="#1E1E1E"
          stroke="#fdc800"
          strokeWidth="1.5"
        />
        <text x="62" y="100" fill="white" fontSize="10" fontFamily="monospace">
          API GW
        </text>
        <rect
          x="165"
          y="45"
          width="80"
          height="45"
          rx="8"
          fill="#1E1E1E"
          stroke="white"
          strokeWidth="1.5"
        />
        <text x="175" y="72" fill="#fdc800" fontSize="10" fontFamily="monospace">
          SVC_AUTH
        </text>
        <rect
          x="165"
          y="115"
          width="80"
          height="45"
          rx="8"
          fill="#1E1E1E"
          stroke="white"
          strokeWidth="1.5"
        />
        <text x="175" y="142" fill="#fdc800" fontSize="10" fontFamily="monospace">
          SVC_DATA
        </text>
        <rect
          x="290"
          y="70"
          width="75"
          height="50"
          rx="8"
          fill="#1E1E1E"
          stroke="#fdc800"
          strokeWidth="1.5"
        />
        <text x="302" y="100" fill="white" fontSize="10" fontFamily="monospace">
          POSTGRES
        </text>
        <line
          x1="120"
          y1="90"
          x2="165"
          y2="70"
          stroke="#fdc800"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <line
          x1="120"
          y1="100"
          x2="165"
          y2="135"
          stroke="#fdc800"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <line x1="245" y1="70" x2="290" y2="90" stroke="white" strokeWidth="1.5" />
        <line x1="245" y1="135" x2="290" y2="100" stroke="white" strokeWidth="1.5" />
        <text x="50" y="40" fill="#fdc800" fontSize="11" fontFamily="monospace" fontWeight="bold">
          CLOUD ARCHITECTURE · MICROSERVICES
        </text>
        <text x="50" y="180" fill="#888888" fontSize="10" fontFamily="monospace">
          CI/CD PIPELINES · CONTAINERIZED DEPLOY
        </text>
      </svg>
    )}
    {type === 'cyber' && (
      <svg viewBox="0 0 400 200" className="w-full h-full p-4 relative z-10 text-white/90">
        <path
          d="M 200 45 L 260 70 L 260 120 C 260 155 200 175 200 175 C 200 175 140 155 140 120 L 140 70 Z"
          fill="#1A1A1A"
          stroke="#fdc800"
          strokeWidth="2.5"
        />
        <circle cx="200" cy="100" r="12" fill="#fdc800" />
        <polygon points="195,105 205,105 208,130 192,130" fill="#fdc800" />
        <circle
          cx="70"
          cy="90"
          r="16"
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <line
          x1="86"
          y1="90"
          x2="140"
          y2="90"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="4 2"
        />
        <circle
          cx="330"
          cy="90"
          r="16"
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <line
          x1="260"
          y1="90"
          x2="314"
          y2="90"
          stroke="#fdc800"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        <text x="50" y="40" fill="#fdc800" fontSize="11" fontFamily="monospace" fontWeight="bold">
          ZERO-TRUST SECURITY · NETWORK DEFENSE
        </text>
        <text x="50" y="180" fill="#888888" fontSize="10" fontFamily="monospace">
          ENCRYPTION: AES-256-GCM · SOC MONITORING
        </text>
      </svg>
    )}
    {type === 'quantity-surveying' && (
      <svg viewBox="0 0 400 200" className="w-full h-full p-4 relative z-10 text-white/90">
        <polygon
          points="70,140 130,80 230,80 170,140"
          fill="#222222"
          stroke="#fdc800"
          strokeWidth="1.5"
        />
        <polygon
          points="170,140 230,80 230,140 170,170"
          fill="#1A1A1A"
          stroke="white"
          strokeWidth="1.5"
        />
        <polygon
          points="70,140 170,170 170,140 70,110"
          fill="#292929"
          stroke="white"
          strokeWidth="1.5"
        />
        <rect
          x="270"
          y="130"
          width="16"
          height="30"
          fill="#444444"
          stroke="white"
          strokeWidth="1"
        />
        <rect x="295" y="100" width="16" height="60" fill="#fdc800" />
        <rect
          x="320"
          y="70"
          width="16"
          height="90"
          fill="#222222"
          stroke="#fdc800"
          strokeWidth="1.5"
        />
        <rect x="345" y="115" width="16" height="45" fill="white" />
        <line
          x1="70"
          y1="150"
          x2="170"
          y2="180"
          stroke="#fdc800"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <text x="50" y="40" fill="#fdc800" fontSize="11" fontFamily="monospace" fontWeight="bold">
          COMMERCIAL CONTRACTS · BIM 5D ESTIMATION
        </text>
        <text x="50" y="180" fill="#888888" fontSize="10" fontFamily="monospace">
          STANDARD: NRM2 / FIDIC CONDITIONS
        </text>
      </svg>
    )}
    <div className="absolute bottom-2.5 right-3 px-2 py-0.5 bg-black/80 rounded border border-neutral-700 text-[10px] text-neutral-400 font-mono">
      BIET ACADEMIC FACILITY
    </div>
  </div>
);

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
  fallbackSrc?: string;
  fallbackText?: string;
  imageSvgType?: ImageSvgType;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = photo('photo-1504307651254-35680f356dfd'),
  fallbackText,
  imageSvgType,
  ...rest
}) => {
  const resolvedSrc = resolveImageUrl(src);
  const resolvedFallback = resolveImageUrl(fallbackSrc);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(resolvedSrc);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCurrentSrc(resolveImageUrl(src));
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  if (hasError || !currentSrc) {
    if (imageSvgType) {
      return <TechnicalGraphic type={imageSvgType} className={className} />;
    }
    return (
      <div
        className={`bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center p-4 relative overflow-hidden ${className}`}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #FFFFFF 1px, transparent 1px),
              linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="w-8 h-8 rounded-lg bg-[#fdc800]/20 text-[#fdc800] flex items-center justify-center font-bold text-xs mb-2">
          BIET
        </div>
        <span className="text-[11px] text-neutral-400 font-medium text-center line-clamp-1 relative z-10">
          {fallbackText || alt || 'BIET Engineering & Technology'}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-neutral-950 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-900 animate-pulse pointer-events-none" />
      )}
      <img
        ref={(el) => {
          if (el?.complete && el.naturalWidth > 0 && !isLoaded) {
            setIsLoaded(true);
          }
        }}
        src={currentSrc}
        alt={alt || 'BIET Campus Visual'}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (currentSrc !== resolvedFallback && resolvedFallback) {
            setCurrentSrc(resolvedFallback);
          } else {
            setHasError(true);
          }
        }}
        loading="eager"
        referrerPolicy="no-referrer"
        {...rest}
      />
    </div>
  );
};

