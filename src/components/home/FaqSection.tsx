import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'How does Korutla Properties verify listings?',
      answer:
        'Every listing marked with the "Verified" badge undergoes physical site visits and digital verification of layout permissions (HMDA, DTCP, or RERA registration), title deeds, encumbrance certificates (EC), and municipal zone approvals before being published.',
    },
    {
      question: 'Can NRIs buy agricultural land or residential plots in Telangana?',
      answer:
        'Under FEMA guidelines, NRIs and OCIs can freely purchase residential and commercial properties in India without prior RBI approval. However, agricultural land and farm land have specific legal regulations. Our specialized NRI desk provides complete end-to-end legal and power-of-attorney documentation assistance.',
    },
    {
      question: 'What are the typical registration and stamp duty costs in Telangana?',
      answer:
        'In Telangana, the stamp duty and registration charge is currently 7.5% (consisting of 5.5% stamp duty, 1.5% transfer duty, and 0.5% registration fee) calculated on the higher of the sale consideration or government guideline market value.',
    },
    {
      question: 'How do I schedule a site visit or video walkthrough?',
      answer:
        'Simply click the "Schedule Visit" button on any property detail page. You can select your preferred date, choose between an in-person guided tour or a live video walkthrough, and our assigned local advisor will confirm your slot within 2 hours.',
    },
    {
      question: 'Is it free to list my property on Korutla Properties?',
      answer:
        'Yes! Listing your property for sale or rent is completely free on Korutla Properties. You get direct inquiries from genuine buyers without broker intermediaries.',
    },
    {
      question: 'What are the high-growth real estate corridors in Korutla (505326)?',
      answer:
        'The Metpally Bypass corridor, Jagtial Highway (NH-63), and Raikal Road are seeing rapid residential and commercial expansion. For open plots and farm lands, Venkateshwara Colony, Shantinagar, Dharmapuri road, and Mohanraopet offer high appreciation and clear Dharani registration records.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about buying, selling, and investing in Telangana real estate."
          align="center"
        />

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-neutral-200 rounded-2xl overflow-hidden transition-colors bg-ivory-50/50"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-serif text-lg sm:text-xl font-bold text-forest">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-forest/5 flex items-center justify-center text-forest transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-forest text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-charcoal/75 leading-relaxed font-light border-t border-neutral-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

