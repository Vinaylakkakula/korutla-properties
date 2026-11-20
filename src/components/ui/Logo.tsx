import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-forest';
  const accentColor = 'text-gold';

  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`}>
      {/* Logo Icon - Premium "K" monogram in a house shape */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        <div className={`absolute inset-0 rounded-xl ${variant === 'light' ? 'bg-white/15' : 'bg-forest/10'} group-hover:scale-110 transition-transform duration-300`} />
        <svg
          viewBox="0 0 44 44"
          fill="none"
          className="w-9 h-9 relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* House outline */}
          <path
            d="M22 5L6 18V38H16V27H28V38H38V18L22 5Z"
            className={variant === 'light' ? 'fill-white' : 'fill-forest'}
          />
          {/* Roof accent */}
          <path
            d="M22 2L3 18H8L22 5.5L36 18H41L22 2Z"
            className="fill-gold"
          />
          {/* Door accent */}
          <rect x="19" y="27" width="6" height="11" rx="1" className="fill-gold" opacity="0.9" />
          {/* K monogram */}
          <text
            x="22"
            y="23"
            textAnchor="middle"
            className={variant === 'light' ? 'fill-[#183D34]' : 'fill-white'}
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="11"
            fontWeight="bold"
          >
            K
          </text>
        </svg>
      </div>
      {/* Logo Text */}
      <div className="flex flex-col leading-none">
        <span className={`text-[19px] font-bold tracking-tight ${textColor} transition-colors`}>
          Korutla
        </span>
        <span className={`text-[9px] font-bold uppercase tracking-[0.25em] ${accentColor}`}>
          Properties
        </span>
      </div>
    </Link>
  );
}
