import { motion } from 'motion/react';
import { Map, Clock, Bell, Sprout } from 'lucide-react';

interface BottomNavProps {
  activeScreen: 'map' | 'timeline' | 'alerts' | 'crop';
  onScreenChange: (screen: 'map' | 'timeline' | 'alerts' | 'crop') => void;
  language: 'en' | 'hi';
}

export function BottomNav({ activeScreen, onScreenChange, language }: BottomNavProps) {
  const translations = {
    en: {
      map: 'Map',
      timeline: 'Timeline',
      alerts: 'Alerts',
      crop: 'Crop'
    },
    hi: {
      map: 'नक्शा',
      timeline: 'समयरेखा',
      alerts: 'चेतावनी',
      crop: 'फसल'
    }
  };

  const t = translations[language];

  const navItems = [
    { id: 'map' as const, icon: Map, label: t.map },
    { id: 'timeline' as const, icon: Clock, label: t.timeline },
    { id: 'alerts' as const, icon: Bell, label: t.alerts },
    { id: 'crop' as const, icon: Sprout, label: t.crop },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="bg-white border-t border-neutral-200 px-2 py-2 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onScreenChange(item.id)}
                className="relative flex-1 flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-colors active:bg-neutral-100"
              >
                <div className="relative">
                  <item.icon 
                    className={`size-6 ${isActive ? 'text-green-600' : 'text-neutral-500'}`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -inset-2 bg-green-50 rounded-xl -z-10"
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    />
                  )}
                </div>
                <span className={`text-xs font-medium ${isActive ? 'text-green-600' : 'text-neutral-500'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
