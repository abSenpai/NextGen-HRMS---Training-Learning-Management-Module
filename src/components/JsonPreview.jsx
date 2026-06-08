import React, { useState } from 'react';
import { Copy, Check, Code } from 'lucide-react';

export default function JsonPreview({ formData }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Generate clean JSON representation
    const jsonStr = JSON.stringify(formData, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const renderHighlightedJson = (obj) => {
    const jsonStr = JSON.stringify(obj, null, 2);
    return jsonStr.split('\n').map((line, idx) => {
      // Matches spaces, key in quotes, colon, and value
      const pairMatch = line.match(/^(\s*)"([^"]+)":\s*(.*)$/);
      if (pairMatch) {
        const indent = pairMatch[1];
        const key = pairMatch[2];
        const val = pairMatch[3];
        return (
          <div key={idx} className="font-mono text-xs md:text-sm leading-6 select-text">
            <span className="text-slate-500">{indent}</span>
            <span className="text-[#F5A623]">"{key}"</span>
            <span className="text-slate-400">: </span>
            {val.endsWith(',') ? (
              <>
                <span className={val.startsWith('"') ? "text-emerald-400" : "text-sky-400"}>
                  {val.slice(0, -1)}
                </span>
                <span className="text-slate-400">,</span>
              </>
            ) : (
              <span className={val.startsWith('"') ? "text-emerald-400" : "text-sky-400"}>
                {val}
              </span>
            )}
          </div>
        );
      }
      return (
        <div key={idx} className="font-mono text-xs md:text-sm leading-6 text-slate-300 select-text">
          {line}
        </div>
      );
    });
  };

  return (
    <div className="bg-[#0D2248] text-white border border-[#1A3A6B] rounded-[4px] shadow-sm flex flex-col h-full animate-fade-up">
      {/* Header Bar */}
      <div className="border-b border-[#1C355E] bg-[#0A1B3B] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-accent-orange" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Live JSON Schema Preview
          </span>
        </div>
        
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs bg-[#1C355E] hover:bg-[#25467C] active:scale-95 text-slate-200 px-3 py-1.5 rounded-[3px] border border-[#2D4E87] transition-all cursor-pointer"
          title="Copy JSON to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Schema</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container */}
      <div className="p-4 md:p-6 overflow-auto max-h-[460px] flex-grow custom-scrollbar bg-[#091833]">
        <pre className="select-text">
          <code>
            {renderHighlightedJson(formData)}
          </code>
        </pre>
      </div>
      
      {/* Footer Info */}
      <div className="bg-[#0A1B3B] border-t border-[#1C355E] px-4 py-2 text-[10px] text-slate-400 text-center font-medium">
        Schema schema complies with NIC-HRMS data standard v2.0
      </div>
    </div>
  );
}
