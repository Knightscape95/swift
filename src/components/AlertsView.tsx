import { motion } from 'motion/react';
import { AlertTriangle, CloudRain, Wind, Thermometer, Bug, Volume2, ChevronRight } from 'lucide-react';

interface AlertsViewProps {
  language: 'en' | 'hi';
}

export function AlertsView({ language }: AlertsViewProps) {
  const translations = {
    en: {
      title: 'Weather Alerts',
      playAudio: 'Play Audio',
      viewDetails: 'View Details',
      cached: 'Cached for offline',
      urgentTitle: 'Heavy Rainfall Warning',
      urgentDesc: 'Expected 80-120mm rain in next 6 hours. Postpone spraying and harvesting.',
      highTitle: 'Strong Wind Alert',
      highDesc: 'Wind speed may reach 35-40 km/h. Secure lightweight structures.',
      mediumTitle: 'Heat Wave Forecast',
      mediumDesc: 'Temperature may exceed 38°C for next 3 days. Increase irrigation frequency.',
      lowTitle: 'Disease Risk: Leaf Rust',
      lowDesc: 'Humidity conditions favorable for fungal growth. Monitor crops closely.',
      noAlerts: 'No active alerts'
    },
    hi: {
      title: 'मौसम चेतावनी',
      playAudio: 'ऑडियो चलाएं',
      viewDetails: 'विवरण देखें',
      cached: 'ऑफ़लाइन के लिए संग्रहीत',
      urgentTitle: 'भारी बारिश की चेतावनी',
      urgentDesc: 'अगले 6 घंटों में 80-120 मिमी बारिश की संभावना। छिड़काव और कटाई स्थगित करें।',
      highTitle: 'तेज हवा की चेतावनी',
      highDesc: 'हवा की गति 35-40 किमी/घंटा तक पहुंच सकती है। हल्की संरचनाओं को सुरक्षित करें।',
      mediumTitle: 'गर्मी की लहर का पूर्वानुमान',
      mediumDesc: 'अगले 3 दिनों तक तापमान 38°C से अधिक हो सकता है। सिंचाई की आवृत्ति बढ़ाएं।',
      lowTitle: 'रोग जोखिम: पत्ती का जंग',
      lowDesc: 'फंगल विकास के लिए आर्द्रता की स्थिति अनुकूल। फसलों की बारीकी से निगरानी करें।',
      noAlerts: 'कोई सक्रिय चेतावनी नहीं'
    }
  };

  const t = translations[language];

  const alerts = [
    {
      id: 1,
      urgency: 'urgent',
      icon: CloudRain,
      title: t.urgentTitle,
      description: t.urgentDesc,
      time: '10 min ago',
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
    },
    {
      id: 2,
      urgency: 'high',
      icon: Wind,
      title: t.highTitle,
      description: t.highDesc,
      time: '1 hour ago',
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-500',
    },
    {
      id: 3,
      urgency: 'medium',
      icon: Thermometer,
      title: t.mediumTitle,
      description: t.mediumDesc,
      time: '3 hours ago',
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-500',
    },
    {
      id: 4,
      urgency: 'low',
      icon: Bug,
      title: t.lowTitle,
      description: t.lowDesc,
      time: '5 hours ago',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
    },
  ];

  const playAudio = (alertTitle: string) => {
    // In production, this would trigger text-to-speech
    console.log('Playing audio for:', alertTitle);
  };

  return (
    <div className="h-full bg-gradient-to-b from-neutral-50 to-white overflow-y-auto pb-20 pt-safe">
      {/* Header */}
      <div className="px-5 py-6">
        <h1 className="text-2xl font-bold text-neutral-900">{t.title}</h1>
        <p className="text-sm text-neutral-600 mt-1 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          {t.cached}
        </p>
      </div>

      {/* Alerts List */}
      <div className="px-5 space-y-4">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${alert.bgColor} rounded-3xl border-l-4 ${alert.borderColor} shadow-sm overflow-hidden`}
          >
            <div className="p-5">
              {/* Alert Header */}
              <div className="flex items-start gap-4 mb-3">
                <div className={`${alert.color} p-3 rounded-2xl flex-shrink-0`}>
                  <alert.icon className="size-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-base font-bold text-neutral-900">{alert.title}</h3>
                    {alert.urgency === 'urgent' && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="flex-shrink-0"
                      >
                        <AlertTriangle className="size-5 text-red-600" />
                      </motion.div>
                    )}
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">{alert.description}</p>
                  <p className="text-xs text-neutral-400 mt-2">{alert.time}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => playAudio(alert.title)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-xl border border-neutral-200 active:bg-neutral-50 transition-colors"
                >
                  <Volume2 className="size-4 text-neutral-600" />
                  <span className="text-sm font-medium text-neutral-700">{t.playAudio}</span>
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-neutral-900 rounded-xl active:bg-neutral-800 transition-colors"
                >
                  <span className="text-sm font-medium text-white">{t.viewDetails}</span>
                  <ChevronRight className="size-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Padding for Nav */}
      <div className="h-8"></div>
    </div>
  );
}
