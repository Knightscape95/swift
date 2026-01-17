import { motion } from 'motion/react';
import { Droplets, Wind, Thermometer } from 'lucide-react';

interface LayerToggleProps {
  selectedLayer: 'rain' | 'wind' | 'temp';
  onLayerChange: (layer: 'rain' | 'wind' | 'temp') => void;
  language: 'en' | 'hi';
}

export function LayerToggle({ selectedLayer, onLayerChange, language }: LayerToggleProps) {
  const layers = [
    { id: 'rain' as const, icon: Droplets, color: 'bg-blue-500', labelEn: 'Rain', labelHi: 'बारिश' },
    { id: 'wind' as const, icon: Wind, color: 'bg-cyan-500', labelEn: 'Wind', labelHi: 'हवा' },
    { id: 'temp' as const, icon: Thermometer, color: 'bg-orange-500', labelEn: 'Temp', labelHi: 'तापमान' },
  ];

  return (
    <div className="flex flex-col gap-2">
      {layers.map((layer) => {
        const isSelected = selectedLayer === layer.id;
        return (
          <motion.button
            key={layer.id}
            onClick={() => onLayerChange(layer.id)}
            className={`
              relative p-3 rounded-2xl shadow-lg transition-all
              ${isSelected 
                ? `${layer.color} scale-110` 
                : 'bg-white/90 backdrop-blur-md hover:scale-105'
              }
            `}
            whileTap={{ scale: 0.95 }}
          >
            <layer.icon 
              className={`size-6 ${isSelected ? 'text-white' : 'text-neutral-700'}`}
            />
            {isSelected && (
              <motion.div
                layoutId="selectedLayer"
                className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-current"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
