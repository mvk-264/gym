import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { DayView } from './components/DayView';
import { workoutSchedule } from './data/workoutData';

function App() {
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);

  const selectedDay = workoutSchedule.find(d => d.id === selectedDayId);

  return (
    <div className="min-h-screen bg-gray-950 w-full flex flex-col relative overflow-hidden text-gray-200">
      <header className="bg-gray-900 border-b border-gray-800 text-white p-4 shadow-md z-10 flex-shrink-0">
        <h1 className="text-xl md:text-2xl font-bold text-center">Gym Tracker</h1>
      </header>

      <main className="flex-1 overflow-y-auto pb-6 relative flex flex-col">
        {selectedDay ? (
          <DayView day={selectedDay} onBack={() => setSelectedDayId(null)} />
        ) : (
          <Dashboard onSelectDay={setSelectedDayId} />
        )}
      </main>
    </div>
  );
}

export default App;
