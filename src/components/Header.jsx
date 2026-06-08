import React from 'react';
import { ShieldCheck, UserCheck, BookOpen } from 'lucide-react';
import tripuraLogo from '../assets/tripura_logo.svg';

export default function Header() {
  return (
    <>
      {/* Top Utility Bar */}
      <div className="w-full bg-[#1a3a6b] text-white border-b-2 border-[#f5a623]">
        <div className="max-w-[1200px] mx-auto px-5 py-[6px] flex justify-end items-center gap-1 flex-wrap">
          <a 
            href="https://nextgenhrms.tripura.gov.in/ehrmis/user-onboarding" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-[14px] py-[6px] rounded-[3px] text-[#e8eef8] hover:bg-white/13 hover:text-white transition-all duration-[180ms] text-[13.5px] font-normal"
          >
            Onboarding
          </a>
          <a 
            href="https://nextgenhrms.tripura.gov.in/ehrmis" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-[14px] py-[6px] rounded-[3px] bg-[#f5a623] hover:bg-[#e09516] text-[#1a1a2e] transition-all duration-[180ms] text-[13.5px] font-bold text-center ml-1 mr-1"
          >
            Login
          </a>
          <a 
            href="https://nextgenhrms.tripura.gov.in/dashboard/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-[14px] py-[6px] rounded-[3px] text-[#e8eef8] hover:bg-white/13 hover:text-white transition-all duration-[180ms] text-[13.5px] font-normal"
          >
            Dashboard
          </a>
          <a 
            href="#faq" 
            className="px-[14px] py-[6px] rounded-[3px] text-[#e8eef8] hover:bg-white/13 hover:text-white transition-all duration-[180ms] text-[13.5px] font-normal"
          >
            FAQs
          </a>
        </div>
      </div>

      {/* Main Branding Header (Sticky top-0) */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gov-border">
        <div className="max-w-[1200px] mx-auto py-3 px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Side: Logo & Title */}
          <div className="flex items-center gap-4 text-left min-w-0 w-full md:w-auto">
            {/* Tripura Government Emblem Logo */}
            <div className="w-16 h-16 flex-shrink-0 relative">
              <img 
                src={tripuraLogo} 
                alt="Government of Tripura Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="flex flex-col min-w-0">
              <h1 className="text-[1.45rem] font-extrabold text-[#1a3a6b] leading-tight tracking-[0.2px] break-words">
                NextGen HRMS
              </h1>
              <p className="text-[13px] text-[#546080] font-normal tracking-normal break-words">
                Government of Tripura
              </p>
              <p className="text-[11px] text-[#546080] font-normal leading-tight break-words mt-0.5">
                Integrated Human Resource Management System
              </p>
            </div>
          </div>

          {/* Right Side: Quick Stats / Seal */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 border-l border-gov-border pl-6">
              <ShieldCheck className="text-primary-blue w-6 h-6" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-primary-blue">Secure Portal</span>
                <span className="text-[10px] text-text-secondary">National Informatics Centre</span>
              </div>
            </div>
            <div className="flex items-center gap-2 border-l border-gov-border pl-6">
              <BookOpen className="text-accent-orange w-6 h-6" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-primary-blue">Training Module</span>
                <span className="text-[10px] text-text-secondary">v2.1 Live</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
