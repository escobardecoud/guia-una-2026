import React, { useState } from 'react';
import { Career } from '../types';
import { X, MapPin, Calendar, Book, GraduationCap, Globe, Mail, Clock, Sun, Moon, CalendarDays, FileCheck } from 'lucide-react';

interface Props {
  career: Career | null;
  onClose: () => void;
}

export const CareerDetailModal: React.FC<Props> = ({ career, onClose }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'admission'>('info');

  if (!career) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-start" style={{ backgroundColor: '#A92624' }}>
          <div className="text-white">
            <h4 className="text-sm font-medium opacity-90 mb-1">{career.faculty}</h4>
            <h2 className="text-2xl md:text-3xl font-bold">{career.name}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-4 text-sm font-semibold text-center transition-colors ${activeTab === 'info' ? 'text-una-red border-b-2 border-una-red bg-red-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Información General
          </button>
          <button
            onClick={() => setActiveTab('admission')}
            className={`flex-1 py-4 text-sm font-semibold text-center transition-colors ${activeTab === 'admission' ? 'text-una-red border-b-2 border-una-red bg-red-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Admisión y Requisitos
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8 flex-1">
          
          {activeTab === 'info' ? (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <Calendar className="text-una-red mb-2" size={20} />
                  <p className="text-xs text-gray-500 uppercase font-semibold">Duración</p>
                  <p className="font-medium text-gray-900">{career.duration}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <Clock className="text-una-red mb-2" size={20} />
                  <p className="text-xs text-gray-500 uppercase font-semibold">Carga Horaria</p>
                  <p className="font-medium text-gray-900">{career.hours} horas</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <Book className="text-una-red mb-2" size={20} />
                  <p className="text-xs text-gray-500 uppercase font-semibold">Modalidad</p>
                  <p className="font-medium text-gray-900">{career.modality}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <MapPin className="text-una-red mb-2" size={20} />
                  <p className="text-xs text-gray-500 uppercase font-semibold">Sedes</p>
                  <p className="font-medium text-gray-900 text-sm truncate" title={career.locations.join(', ')}>{career.locations.join(', ')}</p>
                </div>
              </div>

              {/* Turnos Section */}
              <div className="flex items-center gap-4 bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                <p className="text-sm font-semibold text-yellow-800 uppercase shrink-0">Turnos Disponibles:</p>
                <div className="flex flex-wrap gap-2">
                  {career.shifts.map(shift => (
                    <span key={shift} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-yellow-200 text-yellow-900 text-sm font-medium">
                      {shift === 'Mañana' && <Sun size={14} />}
                      {shift === 'Tarde' && <Sun size={14} className="text-orange-500" />}
                      {shift === 'Noche' && <Moon size={14} />}
                      {shift === 'Completo' && <Clock size={14} />}
                      {shift}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Left Column (Main Info) */}
                <div className="md:col-span-2 space-y-8">
                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1 h-6 bg-una-red rounded-full"></span>
                      Descripción
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-justify">
                      {career.description}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1 h-6 bg-una-red rounded-full"></span>
                      Perfil del Egresado
                    </h3>
                    <ul className="space-y-2">
                      {career.profile.map((item, index) => (
                        <li key={index} className="flex gap-3 text-gray-600">
                          <GraduationCap size={20} className="shrink-0 text-una-red/70 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Right Column (Contact) */}
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Contacto</h3>
                    <div className="space-y-3">
                      <a href={`mailto:${career.contactEmail}`} className="flex items-center gap-2 text-gray-600 hover:text-una-red transition-colors">
                        <Mail size={18} />
                        <span className="text-sm truncate">{career.contactEmail}</span>
                      </a>
                      <a href={career.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-una-red transition-colors">
                        <Globe size={18} />
                        <span className="text-sm">Sitio Web Oficial</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Calendario Banner */}
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <CalendarDays size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 text-lg">Calendario de Admisión</h3>
                  <p className="text-blue-700 mt-1">{career.admissionCalendar}</p>
                  <p className="text-xs text-blue-600 mt-2 font-medium bg-blue-100/50 inline-block px-2 py-1 rounded">
                    * Fechas sujetas a cambios por la Facultad
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Requisitos */}
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                    <FileCheck className="text-una-red" size={20} />
                    Requisitos Documentales
                  </h3>
                  <ul className="space-y-3">
                    {career.admissionRequirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-una-red mt-1.5 shrink-0"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Exámenes */}
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                    <Book className="text-una-red" size={20} />
                    Asignaturas a Evaluar
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    {career.admissionExams.map((exam, i) => (
                      <div key={i} className="p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 flex items-center gap-3">
                        <span className="font-mono text-xs text-gray-400 w-6">{(i + 1).toString().padStart(2, '0')}</span>
                        <span className="text-gray-700 font-medium">{exam}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

        </div>
        
        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
          >
            Cerrar
          </button>
          <a 
            href={career.website}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-lg bg-una-red text-white font-medium hover:bg-una-dark transition-colors shadow-lg shadow-red-900/20"
            style={{ backgroundColor: '#A92624' }}
          >
            Ir al sitio de la Facultad
          </a>
        </div>
      </div>
    </div>
  );
};