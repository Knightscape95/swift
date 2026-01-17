import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface WeatherMapProps {
  selectedLayer: 'rain' | 'wind' | 'temp';
  timelineHour: number;
  onPointSelect: (point: { lat: number; lng: number } | null) => void;
}

export function WeatherMap({ selectedLayer, timelineHour, onPointSelect }: WeatherMapProps) {
  const [mapCenter, setMapCenter] = useState({ x: 0, y: 0 });
  const [mapZoom, setMapZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([]);

  // Generate animated particles for weather overlay
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: selectedLayer === 'wind' ? Math.random() * 2 - 1 : 0,
      vy: selectedLayer === 'rain' ? 2 : selectedLayer === 'wind' ? Math.random() * 2 - 1 : 0,
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.vx + 100) % 100,
        y: (p.y + p.vy + 100) % 100,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, [selectedLayer]);

  const getLayerColor = () => {
    switch (selectedLayer) {
      case 'rain': return 'rgba(59, 130, 246, 0.4)';
      case 'wind': return 'rgba(6, 182, 212, 0.4)';
      case 'temp': return 'rgba(249, 115, 22, 0.4)';
    }
  };

  const getParticleColor = () => {
    switch (selectedLayer) {
      case 'rain': return '#3b82f6';
      case 'wind': return '#06b6d4';
      case 'temp': return '#f97316';
    }
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      onPointSelect({ lat: 20 + y / 10, lng: 73 + x / 10 });
      
      setTimeout(() => onPointSelect(null), 3000);
    }
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-800"
      onClick={handleMapClick}
      style={{ touchAction: 'pan-x pan-y pinch-zoom' }}
    >
      {/* Base Map Grid */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="opacity-20">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Simulated Map Features (Roads, Rivers) */}
      <div className="absolute inset-0">
        {/* River */}
        <div className="absolute top-1/4 left-0 w-full h-1 bg-blue-900/50 rotate-12 blur-sm"></div>
        <div className="absolute top-1/3 left-0 w-full h-2 bg-blue-800/40 -rotate-6 blur-sm"></div>
        
        {/* Roads */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-yellow-600/30"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-yellow-600/30"></div>
      </div>

      {/* Weather Layer Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: getLayerColor() }}
      >
        {/* Animated Particles */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: getParticleColor(),
              opacity: selectedLayer === 'rain' ? 0.8 : 0.5,
            }}
            animate={{
              scale: selectedLayer === 'rain' ? [1, 1.5, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: particle.id * 0.1,
            }}
          />
        ))}
      </motion.div>

      {/* Location Markers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"
        />
      </div>

      {/* Village Labels */}
      <div className="absolute top-1/3 left-1/4 text-xs text-white/70 pointer-events-none">
        Nashik
      </div>
      <div className="absolute top-2/3 left-2/3 text-xs text-white/70 pointer-events-none">
        Sinnar
      </div>
      <div className="absolute top-1/2 left-3/4 text-xs text-white/70 pointer-events-none">
        Malegaon
      </div>
    </div>
  );
}
