import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-forest';
  const accentColor = 'text-gold';

  return (
    <Link to="/" className={`flex items-center gap-2 group ${className}`}>
      <div className="relative w-9 h-9 flex items-center justify-center">
        <div className={`absolute inset-0 rounded-lg ${variant === 'light' ? 'bg-white/15' : 'bg-forest/10'} group-hover:scale-110 transition-transform duration-300`} />
        <svg
          viewBox="0 0 36 36"
          fill="none"
          className="w-7 h-7 relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 4L4 14V32H14V22H22V32H32V14L18 4Z"
            className={variant === 'light' ? 'fill-white' : 'fill-forest'}
          />
          <path
            d="M14 22H22V32H14V22Z"
            className="fill-gold"
          />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`text-lg font-bold tracking-tight ${textColor} transition-colors`}>
          Korutla
        </span>
        <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${accentColor}`}>
          Properties
        </span>
      </div>
    </Link>
  );
}
