import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Droplets, Wind, Thermometer, ChevronDown } from 'lucide-react';
import { WeatherMap } from './WeatherMap';

interface TimelineViewProps {
  timelineHour: number;
  onTimelineChange: (hour: number) => void;
  selectedLayer: 'rain' | 'wind' | 'temp';
  language: 'en' | 'hi';
}

export function TimelineView({ timelineHour, onTimelineChange, selectedLayer, language }: TimelineViewProps) {
  const [viewMode, setViewMode] = useState<'hourly' | 'daily'>('hourly');
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'gfs' | 'ecmwf' | 'icon'>('gfs');
  const scrollRef = useRef<HTMLDivElement>(null);

  const translations = {
    en: {
      hourly: 'Hourly',
      daily: '7-Day',
      model: 'Model',
      gfs: 'GFS',
      ecmwf: 'ECMWF',
      icon: 'ICON'
    },
    hi: {
      hourly: 'प्रति घंटा',
      daily: '7-दिन',
      model: 'मॉडल',
      gfs: 'GFS',
      ecmwf: 'ECMWF',
      icon: 'ICON'
    }
  };

  const t = translations[language];

  // Generate hourly data for next 24 hours
  const hourlyData = Array.from({ length: 24 }, (_, i) => {
    const hour = (new Date().getHours() + i) % 24;
    return {
      hour,
      displayHour: hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`,
      temp: 25 + Math.sin(i / 4) * 7,
      rain: Math.max(0, 50 + Math.sin(i / 3) * 40),
      wind: 10 + Math.random() * 10,
    };
  });

  // Generate daily data for next 7 days
  const dailyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const days = language === 'en' 
      ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      : ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
    return {
      day: days[date.getDay()],
      date: `${date.getDate()}/${date.getMonth() + 1}`,
      tempHigh: 32 + Math.random() * 5,
      tempLow: 20 + Math.random() * 5,
      rain: Math.random() * 100,
      wind: 10 + Math.random() * 15,
    };
  });

  const getWeatherIcon = (rain: number) => {
    if (rain > 70) return '🌧️';
    if (rain > 40) return '⛅';
    return '☀️';
  };

  return (
    <div className="relative h-full w-full flex flex-col">
      {/* Weather Map Background - 60% */}
      <div className="h-3/5 relative">
        <WeatherMap
          selectedLayer={selectedLayer}
          timelineHour={timelineHour}
          onPointSelect={() => {}}
        />
        
        {/* Overlay Info */}
        <div className="absolute top-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div className="bg-black/40 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/10">
              <div className="text-white text-sm font-medium">
                {viewMode === 'hourly' 
                  ? hourlyData[timelineHour].displayHour 
                  : dailyData[timelineHour] ? dailyData[timelineHour].day : dailyData[0].day
                }
              </div>
            </div>
            
            {/* Model Picker */}
            <div className="relative">
              <button
                onClick={() => setShowModelPicker(!showModelPicker)}
                className="bg-black/40 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/10 flex items-center gap-2"
              >
                <span className="text-white text-sm font-medium">{t.model}: {selectedModel.toUpperCase()}</span>
                <ChevronDown className="size-4 text-white" />
              </button>
              
              {showModelPicker && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-xl overflow-hidden min-w-32"
                >
                  {(['gfs', 'ecmwf', 'icon'] as const).map((model) => (
                    <button
                      key={model}
                      onClick={() => {
                        setSelectedModel(model);
                        setShowModelPicker(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm font-medium text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200"
                    >
                      {model.toUpperCase()}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Controls - 40% */}
      <div className="h-2/5 bg-white">
        {/* View Mode Toggle */}
        <div className="flex items-center justify-center gap-2 py-3 border-b border-neutral-200">
          <button
            onClick={() => {
              setViewMode('hourly');
              onTimelineChange(0);
            }}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${
              viewMode === 'hourly'
                ? 'bg-green-500 text-white'
                : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            {t.hourly}
          </button>
          <button
            onClick={() => {
              setViewMode('daily');
              onTimelineChange(0);
            }}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${
              viewMode === 'daily'
                ? 'bg-green-500 text-white'
                : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            {t.daily}
          </button>
        </div>

        {/* Timeline Slider */}
        <div className="overflow-x-auto overflow-y-hidden h-full pb-safe" ref={scrollRef}>
          <div className="flex gap-2 p-4 min-w-max">
            {viewMode === 'hourly' ? (
              hourlyData.map((data, index) => (
                <motion.button
                  key={index}
                  onClick={() => onTimelineChange(index)}
                  className={`
                    flex-shrink-0 w-20 p-3 rounded-2xl border-2 transition-all
                    ${timelineHour === index
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-neutral-200 bg-white'
                    }
                  `}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-xs font-medium text-neutral-600 mb-2">
                    {data.displayHour}
                  </div>
                  <div className="text-2xl mb-2">{getWeatherIcon(data.rain)}</div>
                  <div className="text-lg font-bold text-neutral-900 mb-1">
                    {Math.round(data.temp)}°
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Droplets className="size-3 text-blue-500" />
                    <span className="text-xs text-neutral-600">{Math.round(data.rain)}%</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Wind className="size-3 text-cyan-500" />
                    <span className="text-xs text-neutral-600">{Math.round(data.wind)}</span>
                  </div>
                </motion.button>
              ))
            ) : (
              dailyData.map((data, index) => (
                <motion.button
                  key={index}
                  onClick={() => onTimelineChange(index)}
                  className={`
                    flex-shrink-0 w-24 p-3 rounded-2xl border-2 transition-all
                    ${timelineHour === index
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-neutral-200 bg-white'
                    }
                  `}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-xs font-medium text-neutral-600 mb-1">
                    {data.day}
                  </div>
                  <div className="text-xs text-neutral-500 mb-2">
                    {data.date}
                  </div>
                  <div className="text-2xl mb-2">{getWeatherIcon(data.rain)}</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="text-base font-bold text-neutral-900">{Math.round(data.tempHigh)}°</span>
                    <span className="text-sm text-neutral-500">{Math.round(data.tempLow)}°</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Droplets className="size-3 text-blue-500" />
                    <span className="text-xs text-neutral-600">{Math.round(data.rain)}%</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Wind className="size-3 text-cyan-500" />
                    <span className="text-xs text-neutral-600">{Math.round(data.wind)}</span>
                  </div>
                </motion.button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
