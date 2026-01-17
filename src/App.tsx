import { useState } from 'react';
import { MapView } from './components/MapView';
import { TimelineView } from './components/TimelineView';
import { AlertsView } from './components/AlertsView';
import { CropProfileView } from './components/CropProfileView';
import { BottomNav } from './components/BottomNav';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'map' | 'timeline' | 'alerts' | 'crop'>('map');
  const [selectedLayer, setSelectedLayer] = useState<'rain' | 'wind' | 'temp'>('rain');
  const [timelineHour, setTimelineHour] = useState(0);
  const [language, setLanguage] = useState<'en' | 'hi'>('hi');

  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-900 text-white">
      {/* Active Screen */}
      <div className="h-full w-full">
        {activeScreen === 'map' && (
          <MapView 
            selectedLayer={selectedLayer}
            onLayerChange={setSelectedLayer}
            timelineHour={timelineHour}
            language={language}
            onLanguageChange={setLanguage}
          />
        )}
        {activeScreen === 'timeline' && (
          <TimelineView
            timelineHour={timelineHour}
            onTimelineChange={setTimelineHour}
            selectedLayer={selectedLayer}
            language={language}
          />
        )}
        {activeScreen === 'alerts' && (
          <AlertsView language={language} />
        )}
        {activeScreen === 'crop' && (
          <CropProfileView language={language} />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        activeScreen={activeScreen}
        onScreenChange={setActiveScreen}
        language={language}
      />
    </div>
  );
}
