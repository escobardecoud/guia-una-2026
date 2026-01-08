import React, { useState, useMemo } from 'react';
import { careers } from './services/data';
import { CareerCard } from './components/CareerCard';
import { FilterSidebar } from './components/FilterSidebar';
import { CareerDetailModal } from './components/CareerDetailModal';
import { GeminiAdvisor } from './components/GeminiAdvisor';
import { Career, Modality } from './types';
import { Search, Menu, Filter as FilterIcon } from 'lucide-react';

function App() {
  const [filters, setFilters] = useState({
    search: '',
    faculty: '',
    location: '',
    modality: ''
  });
  
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Extract unique locations for filter dropdown
  const availableLocations = useMemo(() => {
    const locs = new Set<string>();
    careers.forEach(c => c.locations.forEach(l => locs.add(l)));
    return Array.from(locs).sort();
  }, []);

  // Filter Logic
  const filteredCareers = useMemo(() => {
    return careers.filter(career => {
      const matchSearch = career.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                          career.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
      const matchFaculty = filters.faculty ? career.faculty === filters.faculty : true;
      const matchLocation = filters.location ? career.locations.includes(filters.location) : true;
      
      // Fix: Check if the selected modality exists in the career's modalities array
      const matchModality = filters.modality 
        ? career.modality.includes(filters.modality as Modality) 
        : true;

      return matchSearch && matchFaculty && matchLocation && matchModality;
    });
  }, [filters]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo Fix */}
            <div className="w-14 h-14 flex items-center justify-center">
               <img 
                 src="https://i.imgur.com/enT97Pe.png" 
                 alt="Escudo UNA" 
                 className="w-full h-full object-contain drop-shadow-sm" 
               />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">Universidad Nacional<br/>de Asunción</h1>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-sm font-semibold text-una-red tracking-wide">GUÍA ACADÉMICA 2026</span>
          </div>
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: 'url("https://www.una.py/wp-content/uploads/2021/08/rectorado-una-1.jpg")' }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-una-red to-red-900 opacity-90"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Diseña tu futuro en la UNA
          </h2>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Explora nuestra oferta académica 2026. Encuentra la carrera que transformará tu vida y la del país.
          </p>
          
          {/* Main Search Bar (Quick Access) */}
          <div className="max-w-2xl mx-auto relative">
            <input 
              type="text" 
              placeholder="¿Qué te gustaría estudiar? (Ej: Ingeniería, Salud, Arte...)" 
              className="w-full pl-6 pr-14 py-4 rounded-full text-gray-900 shadow-xl focus:ring-4 focus:ring-white/30 outline-none text-lg"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
            <div className="absolute right-3 top-3 bg-una-red p-2 rounded-full text-white">
              <Search size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar (Desktop) */}
          <aside className="hidden md:block w-72 shrink-0">
            <FilterSidebar 
              filters={filters} 
              setFilters={setFilters} 
              availableLocations={availableLocations} 
            />
          </aside>

          {/* Mobile Filters Drawer */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setShowMobileFilters(false)}>
              <div 
                className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">Filtros</h3>
                  <button onClick={() => setShowMobileFilters(false)}>
                    <XIcon />
                  </button>
                </div>
                <FilterSidebar 
                  filters={filters} 
                  setFilters={setFilters} 
                  availableLocations={availableLocations} 
                />
              </div>
            </div>
          )}

          {/* Results Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-gray-800">
                {filteredCareers.length} Carreras encontradas
              </h3>
              <button 
                className="md:hidden flex items-center gap-2 text-sm font-semibold text-una-red"
                onClick={() => setShowMobileFilters(true)}
              >
                <FilterIcon size={16} />
                Filtrar
              </button>
            </div>

            {filteredCareers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCareers.map(career => (
                  <CareerCard 
                    key={career.id} 
                    career={career} 
                    onSelect={setSelectedCareer} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <div className="text-gray-400 mb-2">
                  <Search size={48} className="mx-auto" />
                </div>
                <h4 className="text-lg font-medium text-gray-900">No se encontraron resultados</h4>
                <p className="text-gray-500">Intenta ajustar tus filtros de búsqueda.</p>
                <button 
                  onClick={() => setFilters({ search: '', faculty: '', location: '', modality: '' })}
                  className="mt-4 text-una-red font-semibold hover:underline"
                >
                  Ver todas las carreras
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6 mt-12 border-t border-red-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src="https://i.imgur.com/enT97Pe.png" alt="UNA Logo" className="w-16 h-16 bg-white rounded-full p-1 mb-4 object-contain" />
              <h4 className="font-bold text-lg mb-2">Universidad Nacional de Asunción</h4>
              <p className="text-gray-400 text-sm">
                Campus Universitario, San Lorenzo<br/>
                Paraguay
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-red-400">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Admisiones 2026</a></li>
                <li><a href="#" className="hover:text-white">Becas y Aranceles</a></li>
                <li><a href="#" className="hover:text-white">Campus Virtual</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-red-400">Contacto General</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Tel: (595-21) 328 5997</li>
                <li>Email: planides@rec.una.py</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
            © 2025 Universidad Nacional de Asunción. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <CareerDetailModal 
        career={selectedCareer} 
        onClose={() => setSelectedCareer(null)} 
      />
      
      <GeminiAdvisor />
    </div>
  );
}

// Simple Icon component helper
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export default App;