import React from 'react';
import nicLogo from '../assets/nic_logo.svg';
import meityLogo from '../assets/meity_logo.svg';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0D2248] text-white pt-10 pb-6 mt-12 border-t border-[#1C355E] select-text">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 pb-8 border-b border-[#1C355E]">
          {/* Left Side: Agency Info */}
          <div className="flex flex-col gap-2.5 max-w-xl">
            <h3 className="text-md md:text-lg font-bold text-white tracking-wide">
              NextGen HRMS — Government of Tripura
            </h3>
            <p className="text-xs text-slate-300 font-medium">
              Integrated Human Resource Management System
            </p>
            <div className="text-xs text-slate-400 space-y-1 mt-2">
              <p>
                <span className="font-bold text-slate-300">Contact:</span> 0381-2415554 | Finance Department, Government of Tripura
              </p>
              <p>
                Developed by <span className="font-bold text-slate-300">National Informatics Centre (NIC)</span>
              </p>
            </div>
          </div>

          {/* Right Side: Official NIC & Ministry of Electronics Badges */}
          <div className="flex flex-wrap items-center gap-4">
            {/* NIC Logo Badge */}
            <div className="bg-[#102D5E] border border-[#1F4685] py-2 px-4 rounded-[4px] flex items-center justify-center min-h-[50px]">
              <img 
                src={nicLogo} 
                alt="National Informatics Centre Logo" 
                className="h-[32px] md:h-[34px] w-auto object-contain"
              />
            </div>

            {/* Ministry of Electronics & IT Badge */}
            <div className="bg-[#102D5E] border border-[#1F4685] py-2 px-4 rounded-[4px] flex items-center justify-center min-h-[50px]">
              <img 
                src={meityLogo} 
                alt="Ministry of Electronics and Information Technology Logo" 
                className="h-[32px] md:h-[34px] w-auto object-contain brightness-0 invert"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 gap-4">
          <p className="text-center md:text-left">
            © 2026 Finance Department, Government of Tripura. All rights reserved.
          </p>
          <p className="text-center md:text-right font-medium">
            Official portal for Tripura Government Employee Management
          </p>
        </div>
      </div>
    </footer>
  );
}
