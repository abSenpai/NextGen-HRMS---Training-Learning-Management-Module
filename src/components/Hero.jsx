import React from 'react';
import { FilePlus, Eye, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ onScrollToForm, onScrollToCards }) {
  return (
    <section className="relative w-full bg-[linear-gradient(98deg,#1a3a6b_0%,#22528a_55%,#1a3a6b_100%)] text-white overflow-hidden pt-[64px] pb-[56px] border-b border-gov-border">
      {/* Grid overlay for NIC portal aesthetic */}
      <div className="absolute inset-0 grid-overlay pointer-events-none"></div>
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#f5a623]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-5 relative z-10 flex flex-col items-start w-full">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-[16px] py-[8px] rounded-[3px] border border-[rgba(245,166,35,0.5)] bg-[rgba(245,166,35,0.18)] text-[#f5c86a] text-[14px] font-bold uppercase tracking-[0.5px] mb-[14px]"
        >
          Finance Department · Government of Tripura
        </motion.div>

        {/* Hero Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-bold text-white tracking-tight leading-[1.12] max-w-[700px] mb-[18px] w-full break-words font-segoe"
        >
          TRAINING & LEARNING MANAGEMENT
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-[17px] text-[#b8cbea] max-w-[620px] leading-relaxed mb-[30px] font-normal"
        >
          A Digital Training Records & Certification Management -<br />
          View, record, and maintain details of ongoing, completed, and pending government training modules across departments.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-[14px] w-full sm:w-auto"
        >
          <button 
            onClick={onScrollToForm}
            className="flex items-center justify-center gap-2 bg-[#f5a623] hover:bg-[#e09516] text-[#1a1a2e] font-bold min-h-[48px] px-[22px] rounded-[4px] border-2 border-transparent shadow-[0_6px_18px_rgba(245,166,35,0.30)] transition-all duration-150 ease-in-out transform hover:-translate-y-[2px] active:translate-y-0 cursor-pointer text-[15px]"
          >
            <FilePlus className="w-[18px] h-[18px]" />
            Submit Record
          </button>
          
          <button 
            onClick={onScrollToCards}
            className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-bold min-h-[48px] px-[22px] rounded-[4px] border-2 border-white/55 hover:border-white transition-all duration-150 ease-in-out transform hover:-translate-y-[2px] active:translate-y-0 cursor-pointer text-[15px]"
          >
            <Eye className="w-[18px] h-[18px]" />
            View Records
          </button>
        </motion.div>
      </div>
    </section>
  );
}
