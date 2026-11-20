import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, MapPin, Users, ShieldCheck } from 'lucide-react';

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ end, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // ease-out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
};

export const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: <Building2 className="w-8 h-8 text-gold" />,
      value: 5000,
      suffix: '+',
      label: 'Properties Listed',
      description: 'Across Hyderabad and major Indian metros',
    },
    {
      icon: <MapPin className="w-8 h-8 text-gold" />,
      value: 50,
      suffix: '+',
      label: 'Locations Covered',
      description: 'Prime corridors and emerging development zones',
    },
    {
      icon: <Users className="w-8 h-8 text-gold" />,
      value: 10000,
      suffix: '+',
      label: 'Happy Customers',
      description: 'Homebuyers, investors, and trusted developers',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-gold" />,
      value: 2000,
      suffix: '+',
      label: 'Verified Listings',
      description: 'HMDA, RERA, and DTCP title authenticated',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-deep text-white relative overflow-hidden">
      {/* Background Subtle Geometric Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#B79A68_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-gold font-bold mb-2 block">
            Market Leadership
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Telangana's Most Trusted Real Estate Network
          </h2>
          <p className="text-sm sm:text-base text-ivory-300 leading-relaxed font-light">
            We bridge the gap between discerning property buyers and authentic, high-value real estate opportunities.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-forest-800/40 border border-white/10 rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center justify-center hover:border-gold/40 transition-colors"
            >
              <div className="mb-4 p-3 rounded-2xl bg-white/5 border border-white/10">
                {stat.icon}
              </div>
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gold mb-1">{stat.label}</h3>
              <p className="text-xs text-ivory-300 font-light">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

