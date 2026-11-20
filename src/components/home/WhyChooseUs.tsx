import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, Eye, BadgePercent, Sparkles, Scale } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-forest" />,
      title: '100% Verified Titles',
      description: 'Every property listed undergoes rigorous legal title verification, HMDA/DTCP layout checks, and encumbrance certificate scrutiny.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-forest" />,
      title: 'Curated Local Portfolio',
      description: 'From Korutla town independent homes to Dharmapuri & Raikal managed farm retreats, we list only authentic, high-potential property assets.',
    },
    {
      icon: <UserCheck className="w-6 h-6 text-forest" />,
      title: 'Direct Local Agents',
      description: 'Connect directly with certified property advisors who possess deep ground-level knowledge of local submarkets and pricing.',
    },
    {
      icon: <Eye className="w-6 h-6 text-forest" />,
      title: 'Transparent Pricing',
      description: 'Zero hidden fees. Complete visibility on registration costs, GST, development charges, and true negotiable market value.',
    },
    {
      icon: <Scale className="w-6 h-6 text-forest" />,
      title: 'Smart Side-by-Side Comparison',
      description: 'Compare price per square yard, floor-to-ceiling heights, road width, and amenities side-by-side with our comparison tool.',
    },
    {
      icon: <BadgePercent className="w-6 h-6 text-forest" />,
      title: 'Hassle-Free Home Loans',
      description: 'Pre-approved loan sanction tie-ups with leading Indian banks including SBI, HDFC, and ICICI at lowest competitive interest rates.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why Choose Korutla Properties"
          subtitle="Redefining Telangana's real estate with transparency, architectural elegance, and verified intelligence."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((r, idx) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-8 rounded-2xl bg-ivory-100 border border-neutral-200/60 hover:border-forest/30 hover:bg-white hover:shadow-card-hover transition-all duration-300 flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-neutral-200/80 flex items-center justify-center mb-5 text-forest">
                {r.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-forest mb-2">{r.title}</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed font-light">
                {r.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

