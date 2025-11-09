import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  count: number;
  children: React.ReactNode;
  colorClasses: {
    bg: string;
    border: string;
    text: string;
    ring: string;
  };
}

const Accordion: React.FC<AccordionProps> = ({ title, count, children, colorClasses }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`border ${colorClasses.border} rounded-lg mb-4 overflow-hidden shadow-lg`}>
      <h2>
        <button
          type="button"
          className={`flex items-center justify-between w-full p-4 font-medium text-right ${colorClasses.text} ${colorClasses.bg} transition-colors duration-300 ease-in-out hover:bg-opacity-80 focus:outline-none focus:ring-2 ${colorClasses.ring} print-accordion-button`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <div className="flex items-center space-x-3 space-x-reverse">
            <span>{title}</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold bg-black bg-opacity-20`}>{count}</span>
          </div>
          <svg
            className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </h2>
      <div className={`${isOpen ? 'max-h-[5000px]' : 'max-h-0'} overflow-hidden transition-max-height duration-700 ease-in-out print-accordion-content`}>
          <div className={`p-5 border-t ${colorClasses.border} bg-white/70 backdrop-blur-sm`}>
             <div className="space-y-4">{children}</div>
          </div>
      </div>
    </div>
  );
};

export default Accordion;