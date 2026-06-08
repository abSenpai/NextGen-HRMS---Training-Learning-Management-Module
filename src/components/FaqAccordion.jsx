import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FaqAccordion() {
  const faqs = [
    {
      question: "What should I do if I forget my password?",
      answer: "You can click on the 'Forgot Password' link on the login page. An OTP will be sent to your registered mobile number and email ID to verify your identity and reset your password. If you still face issues, please contact your Departmental Nodal Officer."
    },
    {
      question: "Whom do I contact for HRMS-related issues?",
      answer: "For any technical or operational issues, please contact your Departmental Nodal Officer or reach the HRMS helpdesk directly at 0381-2415554 or email the Finance Department, Government of Tripura."
    },
    {
      question: "Why is the OTP not being received during registration or password reset?",
      answer: "OTP delivery can fail due to network congestion, incorrect mobile numbers in the official employee records, or active SMS blocklists. Please ensure your registered mobile number is active. If the issue persists, request your Nodal Officer to check your profile contact details."
    },
    {
      question: "What should be done if an employee is not appearing in the availability list?",
      answer: "This occurs if the employee onboarding process has not been completed by the Head of Office (HoO) or if their transfer status is active in transition. Ensure that onboarding details are finalized."
    },
    {
      question: "What if an employee is not visible in Next Gen HRMS but exists in the old HRMS?",
      answer: "Data migration is conducted in phases. If an employee is missing, the Departmental Admin should use the Migration Tool under the Admin panel to pull data from the legacy system and complete the profile onboarding."
    },
    {
      question: "What should be done if beneficiary details are not fetching while creating an employee profile?",
      answer: "Ensure the beneficiary's Treasury and Bank details are verified. If the Treasury system database is experiencing latency, retry after some time, or upload a manual Bank Mandate Form signed by the Treasury Officer."
    },
    {
      question: "Why are all fields not editable when clicking on the Edit option?",
      answer: "To maintain database integrity, core fields like Employee ID, Date of Birth, and Date of Joining are locked once verified. Modifying these locked fields requires submitting a formal request to the Finance Department with supporting documents."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-white border border-gov-border rounded-[4px] shadow-xs p-6 md:p-8 animate-fade-up">
      <div className="border-b border-gov-border pb-4 mb-6">
        <h2 className="text-xl font-extrabold text-primary-blue flex items-center gap-2">
          <span className="w-1.5 h-6 bg-accent-orange inline-block rounded-sm"></span>
          Frequently Asked Questions (FAQs)
        </h2>
        <p className="text-xs text-text-secondary mt-1">
          Quick answers to common system questions and portal concerns.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className="border border-gov-border rounded-[4px] hover:border-primary-blue/50 transition-colors bg-white overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left py-4 px-6 flex items-center justify-between gap-4 font-bold text-primary-blue text-sm md:text-base focus:outline-none transition-colors hover:bg-gov-bg/35 cursor-pointer"
              >
                <span className="leading-snug">{faq.question}</span>
                <div className="w-6 h-6 rounded-full bg-[#0D2248] text-white flex items-center justify-center flex-shrink-0">
                  {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-4 pt-1 text-sm text-text-secondary leading-relaxed border-t border-gov-border/60 bg-gov-bg/10 select-text">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
