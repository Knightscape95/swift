import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { MapPin, Droplets, Wind, Thermometer, Globe } from 'lucide-react';
import { BottomSheet } from './BottomSheet';
import { LayerToggle } from './LayerToggle';
import { WeatherMap } from './WeatherMap';

interface MapViewProps {
  selectedLayer: 'rain' | 'wind' | 'temp';
  onLayerChange: (layer: 'rain' | 'wind' | 'temp') => void;
  timelineHour: number;
  language: 'en' | 'hi';
  onLanguageChange: (lang: 'en' | 'hi') => void;
}

export function MapView({ selectedLayer, onLayerChange, timelineHour, language, onLanguageChange }: MapViewProps) {
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<{ lat: number; lng: number } | null>(null);
  const [currentCondition, setCurrentCondition] = useState({ temp: 32, rain: 65, wind: 12 });

  const translations = {
    en: {
      location: 'Nashik, Maharashtra',
      recommendation: 'What should I do today?',
      doNotSpray: 'Do not spray pesticides today',
      irrigate: 'Irrigate after 5 PM',
      rain: 'Rain',
      wind: 'Wind',
      temp: 'Temperature'
    },
    hi: {
      location: 'नासिक, महाराष्ट्र',
      recommendation: 'आज मुझे क्या करना चाहिए?',
      doNotSpray: 'आज कीटनाशक न छिड़कें',
      irrigate: 'शाम 5 बजे के बाद सिंचाई करें',
      rain: 'बारिश',
      wind: 'हवा',
      temp: 'तापमान'
    }
  };

  const t = translations[language];

  const getConditionIcon = () => {
    if (currentCondition.rain > 50) return <Droplets className="size-5" />;
    if (currentCondition.wind > 15) return <Wind className="size-5" />;
    return <Thermometer className="size-5" />;
  };

  const getConditionColor = () => {
    if (currentCondition.rain > 50) return 'bg-blue-500';
    if (currentCondition.wind > 15) return 'bg-cyan-500';
    return 'bg-orange-500';
  };

  return (
    <div className="relative h-full w-full">
      {/* Top Bar - Floating, Transparent */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-4">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between rounded-2xl bg-black/40 backdrop-blur-md px-4 py-3 shadow-lg border border-white/10"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <MapPin className="size-5 flex-shrink-0 text-green-400" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{t.location}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <div className={`${getConditionColor()} rounded-full p-2`}>
              {getConditionIcon()}
            </div>
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'hi' : 'en')}
              className="p-2 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors"
              aria-label="Change language"
            >
              <Globe className="size-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Weather Map - 75% of screen */}
      <div className="absolute inset-0">
        <WeatherMap
          selectedLayer={selectedLayer}
          timelineHour={timelineHour}
          onPointSelect={setSelectedPoint}
        />
      </div>

      {/* Layer Toggle - Floating Bottom Right */}
      <div className="absolute bottom-24 right-4 z-20">
        <LayerToggle
          selectedLayer={selectedLayer}
          onLayerChange={onLayerChange}
          language={language}
        />
      </div>

      {/* Bottom Sheet */}
      <BottomSheet
        isExpanded={isSheetExpanded}
        onExpandChange={setIsSheetExpanded}
        language={language}
      />

      {/* Selected Point Tooltip */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-black/90 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-white/20"
          >
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">32°C</div>
              <div className="text-sm text-neutral-300 mb-2">Rain: 65% | Wind: 12 km/h</div>
              <button
                onClick={() => setSelectedPoint(null)}
                className="text-xs text-blue-400"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
