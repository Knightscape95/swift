import { motion, PanInfo } from 'motion/react';
import { AlertTriangle, Droplets, Wind, Sun, ChevronUp, HelpCircle } from 'lucide-react';

interface BottomSheetProps {
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
  language: 'en' | 'hi';
}

export function BottomSheet({ isExpanded, onExpandChange, language }: BottomSheetProps) {
  const translations = {
    en: {
      recommendation: 'What should I do today?',
      doNotSpray: 'Do not spray pesticides today',
      irrigate: 'Irrigate after 5 PM',
      risks: "Today's Risks",
      rainRisk: 'Heavy Rain',
      windRisk: 'Strong Wind',
      heatRisk: 'Heat Stress',
      diseaseRisk: 'Disease Risk',
      confidence: 'Confidence',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      why: 'Why?'
    },
    hi: {
      recommendation: 'आज मुझे क्या करना चाहिए?',
      doNotSpray: 'आज कीटनाशक न छिड़कें',
      irrigate: 'शाम 5 बजे के बाद सिंचाई करें',
      risks: 'आज के जोखिम',
      rainRisk: 'भारी बारिश',
      windRisk: 'तेज हवा',
      heatRisk: 'गर्मी का तनाव',
      diseaseRisk: 'रोग का खतरा',
      confidence: 'विश्वसनीयता',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'निम्न',
      why: 'क्यों?'
    }
  };

  const t = translations[language];

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y < -50) {
      onExpandChange(true);
    } else if (info.offset.y > 50) {
      onExpandChange(false);
    }
  };

  const risks = [
    { icon: Droplets, label: t.rainRisk, confidence: t.high, color: 'bg-blue-500', level: 'high' },
    { icon: Wind, label: t.windRisk, confidence: t.medium, color: 'bg-cyan-500', level: 'medium' },
    { icon: Sun, label: t.heatRisk, confidence: t.low, color: 'bg-orange-500', level: 'low' },
    { icon: AlertTriangle, label: t.diseaseRisk, confidence: t.medium, color: 'bg-red-500', level: 'medium' },
  ];

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      animate={{ 
        y: isExpanded ? 0 : '70%',
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="absolute bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl shadow-2xl touch-pan-y"
      style={{ height: 'calc(100vh - 80px)' }}
    >
      {/* Drag Handle */}
      <div className="flex justify-center pt-3 pb-2">
        <div className="w-12 h-1.5 bg-neutral-300 rounded-full" />
      </div>

      {/* Collapsed Content */}
      <div className="px-5 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-neutral-900">{t.recommendation}</h2>
          <button
            onClick={() => onExpandChange(!isExpanded)}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <ChevronUp className={`size-5 text-neutral-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Quick Recommendations */}
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border-l-4 border-red-500">
            <AlertTriangle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-red-900">{t.doNotSpray}</p>
          </div>
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border-l-4 border-blue-500">
            <Droplets className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-blue-900">{t.irrigate}</p>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-5 pb-6 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 280px)' }}
        >
          <h3 className="text-base font-bold text-neutral-900 mb-4">{t.risks}</h3>

          <div className="space-y-3">
            {risks.map((risk, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-neutral-50 rounded-2xl border border-neutral-200"
              >
                <div className={`${risk.color} p-3 rounded-xl`}>
                  <risk.icon className="size-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-neutral-900">{risk.label}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-neutral-600">{t.confidence}:</span>
                    <span className={`text-xs font-medium ${
                      risk.level === 'high' ? 'text-red-600' :
                      risk.level === 'medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {risk.confidence}
                    </span>
                  </div>
                </div>
                <button className="p-2 hover:bg-white rounded-full transition-colors flex-shrink-0">
                  <HelpCircle className="size-5 text-neutral-400" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
