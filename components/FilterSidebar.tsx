import React from 'react';
import { faculties } from '../services/data';
import { Modality } from '../types';

interface Props {
  filters: {
    search: string;
    faculty: string;
    location: string;
    modality: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  availableLocations: string[];
}

export const FilterSidebar: React.FC<Props> = ({ filters, setFilters, availableLocations }) => {
  const handleChange = (key: string, value: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-gray-900 text-lg">Filtrar Carreras</h2>
        {(filters.faculty || filters.location || filters.modality || filters.search) && (
          <button 
            onClick={() => setFilters({ search: '', faculty: '', location: '', modality: '' })}
            className="text-xs text-una-red hover:underline font-medium"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Búsqueda</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Ej: Derecho, Informática..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-una-red focus:border-una-red outline-none"
          />
        </div>

        {/* Faculty */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facultad</label>
          <select
            value={filters.faculty}
            onChange={(e) => handleChange('faculty', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-una-red focus:border-una-red outline-none bg-white"
          >
            <option value="">Todas las Facultades</option>
            {faculties.map((f) => (
              <option key={f.id} value={f.name}>{f.name}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sede / Filial</label>
          <select
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-una-red focus:border-una-red outline-none bg-white"
          >
            <option value="">Cualquier ubicación</option>
            {availableLocations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Modality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Modalidad</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="modality" 
                value=""
                checked={filters.modality === ''}
                onChange={() => handleChange('modality', '')}
                className="text-una-red focus:ring-una-red"
              />
              <span className="text-sm text-gray-600">Todas</span>
            </label>
            {Object.values(Modality).map((m) => (
              <label key={m} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="modality" 
                  value={m}
                  checked={filters.modality === m}
                  onChange={() => handleChange('modality', m)}
                  className="text-una-red focus:ring-una-red"
                />
                <span className="text-sm text-gray-600">{m}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
