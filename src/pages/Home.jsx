import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrainingForm from '../components/TrainingForm';
import JsonPreview from '../components/JsonPreview';
import TrainingCards from '../components/TrainingCards';
import FaqAccordion from '../components/FaqAccordion';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import initialData from '../data/trainingData.json';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const emptyForm = {
  employeeName: '',
  employeeId: '',
  department: '',
  trainingModule: '',
  trainingType: '',
  status: '',
  issueDate: '',
  instructor: '',
  certificateNumber: '',
  certificateFile: '',
  remarks: ''
};

export default function Home() {
  const [formData, setFormData] = useState(emptyForm);
  const [records, setRecords] = useState([]);
  const [notification, setNotification] = useState(null); // { type: 'success'|'error', message: '' }

  // Refs for smooth scroll
  const formRef = useRef(null);
  const recordsRef = useRef(null);

  // Initialize records from localStorage or JSON file
  useEffect(() => {
    const stored = localStorage.getItem('tripura_hrms_training');
    if (stored) {
      try {
        setRecords(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to parse local records', err);
        setRecords(initialData);
      }
    } else {
      localStorage.setItem('tripura_hrms_training', JSON.stringify(initialData));
      setRecords(initialData);
    }
  }, []);

  const triggerNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormReset = () => {
    setFormData(emptyForm);
    triggerNotification('info', 'Form input fields cleared.');
  };

  const handleFormSubmit = () => {
    // Basic verification
    if (!formData.employeeName || !formData.employeeId || !formData.department || !formData.trainingModule) {
      triggerNotification('error', 'Please fill in all mandatory fields (*).');
      return;
    }

    // Check if record already exists (combination of ID and Module)
    const exists = records.some(
      (rec) => rec.employeeId.toLowerCase() === formData.employeeId.toLowerCase() && 
             rec.trainingModule.toLowerCase() === formData.trainingModule.toLowerCase()
    );

    if (exists) {
      triggerNotification('error', `A record for Employee ID ${formData.employeeId} under the module "${formData.trainingModule}" already exists.`);
      return;
    }

    // Add to records list
    const updatedRecords = [formData, ...records];
    setRecords(updatedRecords);
    localStorage.setItem('tripura_hrms_training', JSON.stringify(updatedRecords));

    // Reset Form & Notify
    setFormData(emptyForm);
    triggerNotification('success', `Training record for ${formData.employeeName} has been recorded successfully under Ref ID: HRMS-TR-${Math.floor(1000 + Math.random() * 9000)}.`);
    
    // Smooth scroll to records to show addition
    setTimeout(() => {
      scrollToRef(recordsRef);
    }, 400);
  };

  const handleDeleteRecord = (id, module) => {
    const updated = records.filter(
      (rec) => !(rec.employeeId === id && rec.trainingModule === module)
    );
    setRecords(updated);
    localStorage.setItem('tripura_hrms_training', JSON.stringify(updated));
    triggerNotification('success', `Record deleted successfully.`);
  };

  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gov-bg w-full">
      {/* Global Header */}
      <Header />

      {/* Hero Banner */}
      <Hero 
        onScrollToForm={() => scrollToRef(formRef)}
        onScrollToCards={() => scrollToRef(recordsRef)}
      />

      {/* Main Page Layout Container */}
      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-8 py-10 w-full flex flex-col gap-10">
        
        {/* Floating Toast Notification Bar */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`p-4 border rounded-[4px] shadow-sm flex items-start gap-3 w-full max-w-2xl mx-auto select-none ${
                notification.type === 'success'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : notification.type === 'error'
                  ? 'bg-rose-50 border-rose-300 text-rose-800'
                  : 'bg-blue-50 border-blue-300 text-blue-800'
              }`}
            >
              {notification.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-grow text-xs md:text-sm font-semibold">
                {notification.message}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section: Form & Live Schema View */}
        <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 scroll-mt-28">
          {/* Form Side */}
          <div className="lg:col-span-7 h-full">
            <TrainingForm 
              formData={formData}
              onChange={handleFormChange}
              onReset={handleFormReset}
              onSubmit={handleFormSubmit}
            />
          </div>

          {/* Real-time JSON Preview Side */}
          <div className="lg:col-span-5 h-full">
            <div className="sticky top-[calc(50vh-270px)]">
              <JsonPreview formData={formData} />
            </div>
          </div>
        </div>

        {/* Section: Recent Listings Cards/Table */}
        <div ref={recordsRef} className="scroll-mt-28">
          <TrainingCards 
            records={records} 
            onDeleteRecord={handleDeleteRecord}
          />
        </div>

        {/* Section: FAQs */}
        <div className="scroll-mt-28">
          <FaqAccordion />
        </div>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Scroll Assistant */}
      <BackToTop />
    </div>
  );
}
