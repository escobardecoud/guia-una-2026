import React from 'react';
import { Career } from '../types';
import { MapPin, Clock, BookOpen, ChevronRight } from 'lucide-react';

interface Props {
  career: Career;
  onSelect: (career: Career) => void;
}

export const CareerCard: React.FC<Props> = ({ career, onSelect }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="p-5 flex-1">
        <div className="text-xs font-bold uppercase tracking-wider text-una-red mb-2">
          {career.faculty}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-una-red transition-colors">
          {career.name}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-start gap-2">
            <Clock size={16} className="mt-0.5 shrink-0 text-gray-400" />
            <span>{career.duration}</span>
          </div>
          <div className="flex items-start gap-2">
            <BookOpen size={16} className="mt-0.5 shrink-0 text-gray-400" />
            <span>{career.modality}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" />
            <span className="line-clamp-1">{career.locations.join(', ')}</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2">
          {career.description}
        </p>
      </div>
      
      <div className="p-4 border-t border-gray-50 bg-gray-50 group-hover:bg-white transition-colors">
        <button 
          onClick={() => onSelect(career)}
          className="w-full flex items-center justify-center gap-2 text-una-red font-semibold text-sm py-2 rounded-lg border border-una-red/20 hover:bg-una-red hover:text-white transition-all"
        >
          Ver Detalles
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
