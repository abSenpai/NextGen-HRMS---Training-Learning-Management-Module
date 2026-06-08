import React, { useState } from 'react';
import { LayoutGrid, Table, Search, Trash2, Award, Calendar, FileText, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TrainingCards({ records, onDeleteRecord }) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter logic
  const filteredRecords = records.filter(rec => {
    const matchesSearch = 
      rec.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.trainingModule.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || rec.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Helper to get status colors
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'In Progress':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Under Review':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Expired':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  // Helper to determine left border color based on status
  const getCardBorderColor = (status, idx) => {
    // Mirror the screenshots where some cards have blue, some have orange
    if (status === 'In Progress') return 'border-l-[4px] border-l-accent-orange';
    if (status === 'Expired') return 'border-l-[4px] border-l-rose-500';
    // Otherwise alternate or default to primary blue
    return 'border-l-[4px] border-l-primary-blue';
  };

  return (
    <div className="w-full bg-white border border-gov-border rounded-[4px] shadow-xs p-6 md:p-8 animate-fade-up">
      {/* Title & View Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gov-border pb-4 mb-6 gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-primary-blue flex items-center gap-2">
            <span className="w-1.5 h-6 bg-accent-orange inline-block rounded-sm"></span>
            Recent Training Records
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Displaying active employee training registrations and digital certificates.
          </p>
        </div>
        
        {/* Toggle Grid/Table View */}
        <div className="flex items-center gap-2 border border-gov-border rounded-[4px] p-1 bg-gov-bg/40">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-[3px] transition-colors cursor-pointer ${
              viewMode === 'grid' ? 'bg-primary-blue text-white shadow-xs' : 'text-text-secondary hover:text-primary-blue'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Grid View
          </button>
          
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-[3px] transition-colors cursor-pointer ${
              viewMode === 'table' ? 'bg-primary-blue text-white shadow-xs' : 'text-text-secondary hover:text-primary-blue'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            Table View
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Search */}
        <div className="relative md:col-span-2">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search by Employee Name, ID, or Module..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gov-border rounded-[4px] text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue bg-gov-bg/10 focus:bg-white transition-all"
          />
        </div>
        
        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gov-border rounded-[4px] text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue bg-gov-bg/10 focus:bg-white transition-all"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Under Review">Under Review</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Main Content (Listings) */}
      {filteredRecords.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gov-border rounded-[4px] text-text-secondary">
          No training records found matching your filters.
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {viewMode === 'grid' ? (
            /* Card Grid View (Tripura "Major Modules" style) */
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredRecords.map((rec, idx) => {
                const formattedIdx = String(idx + 1).padStart(2, '0');
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={rec.employeeId + rec.trainingModule}
                    className={`bg-white border border-gov-border rounded-[4px] shadow-xs hover:shadow-md transition-shadow flex flex-col relative overflow-hidden ${getCardBorderColor(rec.status, idx)}`}
                  >
                    {/* Index & Status */}
                    <div className="px-5 pt-5 pb-2 flex justify-between items-start">
                      <span className="text-3xl font-extrabold text-[#D4DBE8] font-mono leading-none">
                        {formattedIdx}
                      </span>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-[3px] border ${getStatusBadgeClass(rec.status)}`}>
                        {rec.status}
                      </span>
                    </div>

                    {/* Content Body */}
                    <div className="px-5 pb-5 flex-grow flex flex-col">
                      <h3 className="text-md font-extrabold text-primary-blue leading-snug mb-3">
                        {rec.trainingModule}
                      </h3>
                      
                      {/* Detailed Stats */}
                      <div className="space-y-2 text-xs text-text-secondary flex-grow">
                        <div className="flex items-center gap-2 pb-1.5 border-b border-gov-bg/60">
                          <User className="w-3.5 h-3.5 text-primary-blue/70" />
                          <div>
                            <span className="font-semibold text-text-primary block">{rec.employeeName}</span>
                            <span className="text-[10px] text-text-secondary uppercase">ID: {rec.employeeId} • {rec.department}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-text-secondary/70" />
                            <div>
                              <span className="text-[10px] text-text-secondary uppercase block">Issued</span>
                              <span className="font-medium text-text-primary">{rec.issueDate || 'N/A'}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-text-secondary/70" />
                            <div>
                              <span className="text-[10px] text-text-secondary uppercase block">Attachment</span>
                              <span className="font-semibold text-primary-blue block max-w-[125px] truncate" title={rec.certificateFile || 'None'}>
                                {rec.certificateFile || 'No file'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {rec.certificateNumber && (
                          <div className="bg-gov-bg/30 p-2 rounded-[3px] border border-gov-border/40 mt-3">
                            <div className="flex items-center gap-1.5 text-[10px] text-text-secondary font-bold uppercase tracking-wider mb-0.5">
                              <Award className="w-3.5 h-3.5 text-accent-orange" />
                              <span>Certificate No</span>
                            </div>
                            <span className="font-mono text-xs text-primary-blue font-semibold">{rec.certificateNumber}</span>
                          </div>
                        )}

                        {rec.remarks && (
                          <div className="text-[11px] italic bg-gov-bg/10 p-2 rounded-[3px] border-l-2 border-l-gov-border mt-2 leading-relaxed">
                            "{rec.remarks}"
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-4 pt-3 border-t border-gov-border/60">
                        <button
                          onClick={() => onDeleteRecord(rec.employeeId, rec.trainingModule)}
                          className="flex-1 flex items-center justify-center gap-1 border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-xs py-2 rounded-[3px] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete Record
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* Table View (Tripura "Nodal Officers list" style) */
            <motion.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overflow-x-auto border border-gov-border rounded-[4px]"
            >
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-primary-blue text-white text-xs uppercase tracking-wider font-bold">
                    <th className="py-3.5 px-4 text-center w-12 border-r border-[#1C355E]">#</th>
                    <th className="py-3.5 px-4 border-r border-[#1C355E]">Employee Information</th>
                    <th className="py-3.5 px-4 border-r border-[#1C355E]">Training Details</th>
                    <th className="py-3.5 px-4 border-r border-[#1C355E]">Certificate</th>
                    <th className="py-3.5 px-4 border-r border-[#1C355E] text-center w-28">Status</th>
                    <th className="py-3.5 px-4 text-center w-28">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gov-border text-xs md:text-sm">
                  {filteredRecords.map((rec, idx) => (
                    <tr 
                      key={rec.employeeId + rec.trainingModule} 
                      className={`hover:bg-gov-bg/30 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gov-bg/15'}`}
                    >
                      {/* S.No */}
                      <td className="py-4 px-3 text-center font-mono font-bold text-text-secondary border-r border-gov-border">
                        {idx + 1}
                      </td>

                      {/* Employee Details */}
                      <td className="py-4 px-4 border-r border-gov-border">
                        <div className="font-extrabold text-primary-blue text-sm">{rec.employeeName}</div>
                        <div className="text-[10px] text-text-secondary uppercase mt-0.5">ID: {rec.employeeId}</div>
                        <div className="text-[11px] font-medium text-text-secondary mt-0.5">{rec.department}</div>
                      </td>

                      {/* Training Details */}
                      <td className="py-4 px-4 border-r border-gov-border">
                        <div className="font-bold text-text-primary text-sm">{rec.trainingModule}</div>
                        <div className="text-[10px] text-text-secondary uppercase mt-1">
                          Type: <span className="font-bold">{rec.trainingType}</span>
                        </div>
                        {rec.remarks && (
                          <div className="text-[10px] text-text-secondary italic mt-1 max-w-xs truncate" title={rec.remarks}>
                            "{rec.remarks}"
                          </div>
                        )}
                      </td>

                      {/* Certificate */}
                      <td className="py-4 px-4 border-r border-gov-border">
                        <div className="font-mono text-xs font-semibold text-primary-blue">{rec.certificateNumber || 'N/A'}</div>
                        <div className="text-[10px] text-text-secondary mt-1">
                          Issued: <span className="font-medium">{rec.issueDate || 'N/A'}</span>
                        </div>
                        {rec.certificateFile && (
                          <div className="flex items-center gap-1.5 mt-2 bg-gov-bg/40 border border-gov-border/40 py-1 px-2 rounded-[3px] max-w-[190px]">
                            <FileText className="w-3.5 h-3.5 text-primary-blue flex-shrink-0" />
                            <span className="font-semibold text-text-primary text-[10px] truncate" title={rec.certificateFile}>
                              {rec.certificateFile}
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 text-center border-r border-gov-border">
                        <span className={`inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-[3px] border ${getStatusBadgeClass(rec.status)}`}>
                          {rec.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-3 text-center">
                        <button
                          onClick={() => onDeleteRecord(rec.employeeId, rec.trainingModule)}
                          className="flex items-center justify-center gap-1 border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-xs py-1.5 px-3 rounded-[3px] mx-auto transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
