import React, { useState } from 'react';
import { Info, Github, Navigation, RotateCw } from 'lucide-react';

export const UIOverlay: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6">
      {/* Header */}
      <header className="flex justify-between items-start pointer-events-auto">
        <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white animate-fade-in-down">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Terra 3D
          </h1>
          <p className="text-sm text-gray-300 mt-1">Explorador Interativo WebGL</p>
        </div>

        <button 
          onClick={() => setShowInfo(!showInfo)}
          className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all duration-300 border border-white/10"
          aria-label="Info"
        >
          <Info size={24} />
        </button>
      </header>

      {/* Info Modal/Card */}
      {showInfo && (
        <div className="absolute top-24 right-6 w-80 bg-black/80 backdrop-blur-lg border border-white/10 rounded-xl p-6 text-white pointer-events-auto transition-all animate-fade-in">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <Github size={18} /> Teste GitHub
          </h3>
          <p className="text-gray-300 text-sm mb-4">
            Este projeto é uma demonstração de renderização 3D de alta performance utilizando React Three Fiber.
            Projetado para ser leve e visualmente impactante.
          </p>
          <div className="space-y-2 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>React 18 + TypeScript</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>Three.js + Drei</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              <span>Tailwind CSS</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Controls / Instructions */}
      <footer className="flex flex-col items-center pointer-events-auto">
        <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 text-white flex gap-6 text-sm">
            <div className="flex items-center gap-2">
                <RotateCw size={16} className="text-blue-400" />
                <span>Arraste para girar</span>
            </div>
            <div className="flex items-center gap-2">
                <Navigation size={16} className="text-emerald-400" />
                <span>Role para ampliar</span>
            </div>
        </div>
      </footer>
    </div>
  );
};