import { useState } from 'react';
import { motion } from 'motion/react';
import { Wheat, Grape, Leaf, Sprout, Droplet, ChevronRight } from 'lucide-react';

interface CropProfileViewProps {
  language: 'en' | 'hi';
}

export function CropProfileView({ language }: CropProfileViewProps) {
  const [selectedCrop, setSelectedCrop] = useState<string | null>('wheat');
  const [growthStage, setGrowthStage] = useState(2);
  const [soilType, setSoilType] = useState<'clay' | 'loam' | 'sandy'>('loam');

  const translations = {
    en: {
      title: 'Crop Profile',
      selectCrop: 'Select Your Crop',
      growthStage: 'Growth Stage',
      soilType: 'Soil Type',
      saveProfile: 'Save Profile',
      storedLocally: 'Stored locally for offline use',
      wheat: 'Wheat',
      grape: 'Grape',
      cotton: 'Cotton',
      soybean: 'Soybean',
      clay: 'Clay',
      loam: 'Loam',
      sandy: 'Sandy',
      germination: 'Germination',
      vegetative: 'Vegetative',
      flowering: 'Flowering',
      maturity: 'Maturity',
      harvest: 'Harvest'
    },
    hi: {
      title: 'फसल प्रोफ़ाइल',
      selectCrop: 'अपनी फसल चुनें',
      growthStage: 'विकास चरण',
      soilType: 'मिट्टी का प्रकार',
      saveProfile: 'प्रोफ़ाइल सहेजें',
      storedLocally: 'ऑफ़लाइन उपयोग के लिए स्थानीय रूप से संग्रहीत',
      wheat: 'गेहूं',
      grape: 'अंगूर',
      cotton: 'कपास',
      soybean: 'सोयाबीन',
      clay: 'चिकनी',
      loam: 'दोमट',
      sandy: 'रेतीली',
      germination: 'अंकुरण',
      vegetative: 'वनस्पति',
      flowering: 'फूल आना',
      maturity: 'परिपक्वता',
      harvest: 'कटाई'
    }
  };

  const t = translations[language];

  const crops = [
    { id: 'wheat', icon: Wheat, label: t.wheat, color: 'bg-yellow-500' },
    { id: 'grape', icon: Grape, label: t.grape, color: 'bg-purple-500' },
    { id: 'cotton', icon: Leaf, label: t.cotton, color: 'bg-green-500' },
    { id: 'soybean', icon: Sprout, label: t.soybean, color: 'bg-emerald-500' },
  ];

  const growthStages = [
    { id: 0, label: t.germination },
    { id: 1, label: t.vegetative },
    { id: 2, label: t.flowering },
    { id: 3, label: t.maturity },
    { id: 4, label: t.harvest },
  ];

  const soilTypes = [
    { id: 'clay' as const, label: t.clay, color: 'bg-amber-700', icon: '🟤' },
    { id: 'loam' as const, label: t.loam, color: 'bg-amber-600', icon: '🟫' },
    { id: 'sandy' as const, label: t.sandy, color: 'bg-amber-400', icon: '🟨' },
  ];

  return (
    <div className="h-full bg-gradient-to-b from-green-50 to-white overflow-y-auto pb-20 pt-safe">
      {/* Header */}
      <div className="px-5 py-6">
        <h1 className="text-2xl font-bold text-neutral-900">{t.title}</h1>
        <p className="text-sm text-neutral-600 mt-1 flex items-center gap-2">
          <Droplet className="size-3" />
          {t.storedLocally}
        </p>
      </div>

      {/* Crop Selection */}
      <div className="px-5 mb-8">
        <h2 className="text-base font-bold text-neutral-900 mb-4">{t.selectCrop}</h2>
        <div className="grid grid-cols-2 gap-3">
          {crops.map((crop) => {
            const isSelected = selectedCrop === crop.id;
            return (
              <motion.button
                key={crop.id}
                onClick={() => setSelectedCrop(crop.id)}
                className={`
                  relative p-5 rounded-3xl border-2 transition-all
                  ${isSelected
                    ? 'border-green-500 bg-green-50 shadow-lg'
                    : 'border-neutral-200 bg-white'
                  }
                `}
                whileTap={{ scale: 0.97 }}
              >
                <div className={`${crop.color} p-4 rounded-2xl inline-block mb-3`}>
                  <crop.icon className="size-8 text-white" />
                </div>
                <div className="text-base font-semibold text-neutral-900">
                  {crop.label}
                </div>
                {isSelected && (
                  <motion.div
                    layoutId="selectedCrop"
                    className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <ChevronRight className="size-4 text-white rotate-90" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Growth Stage */}
      <div className="px-5 mb-8">
        <h2 className="text-base font-bold text-neutral-900 mb-4">{t.growthStage}</h2>
        <div className="relative">
          {/* Timeline Bar */}
          <div className="absolute top-6 left-6 right-6 h-1 bg-neutral-200 rounded-full">
            <motion.div
              className="h-full bg-green-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(growthStage / (growthStages.length - 1)) * 100}%` }}
              transition={{ type: 'spring', damping: 20 }}
            />
          </div>

          {/* Stage Buttons */}
          <div className="flex justify-between">
            {growthStages.map((stage) => {
              const isActive = growthStage === stage.id;
              const isPast = growthStage > stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setGrowthStage(stage.id)}
                  className="flex flex-col items-center gap-2 relative z-10"
                >
                  <motion.div
                    className={`
                      w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all
                      ${isActive
                        ? 'bg-green-500 border-white shadow-lg scale-110'
                        : isPast
                        ? 'bg-green-500 border-white'
                        : 'bg-white border-neutral-200'
                      }
                    `}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className={`text-sm font-bold ${isActive || isPast ? 'text-white' : 'text-neutral-400'}`}>
                      {stage.id + 1}
                    </span>
                  </motion.div>
                  <span className={`text-xs font-medium text-center max-w-16 ${isActive ? 'text-green-600' : 'text-neutral-600'}`}>
                    {stage.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Soil Type */}
      <div className="px-5 mb-8">
        <h2 className="text-base font-bold text-neutral-900 mb-4">{t.soilType}</h2>
        <div className="grid grid-cols-3 gap-3">
          {soilTypes.map((soil) => {
            const isSelected = soilType === soil.id;
            return (
              <motion.button
                key={soil.id}
                onClick={() => setSoilType(soil.id)}
                className={`
                  p-4 rounded-2xl border-2 transition-all
                  ${isSelected
                    ? 'border-green-500 bg-green-50 shadow-md'
                    : 'border-neutral-200 bg-white'
                  }
                `}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-3xl mb-2">{soil.icon}</div>
                <div className={`text-sm font-semibold ${isSelected ? 'text-green-600' : 'text-neutral-700'}`}>
                  {soil.label}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Save Button */}
      <div className="px-5 pb-8">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-green-500 text-white rounded-2xl font-bold text-base shadow-lg active:bg-green-600 transition-colors"
        >
          {t.saveProfile}
        </motion.button>
      </div>
    </div>
  );
}
