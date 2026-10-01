import { useState, useEffect } from 'react';
import { ArrowLeft, Check, Timer } from 'lucide-react';
import type { DayWorkout } from '../data/workoutData';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface DayViewProps {
  day: DayWorkout;
  onBack: () => void;
}

export function DayView({ day, onBack }: DayViewProps) {
  // Structure: { dayId: { 'exId-setIdx': boolean } }
  const [completedSets, setCompletedSets] = useLocalStorage<Record<string, Record<string, boolean>>>('gym-tracker-sets', {});
  // Structure: { dayId: { 'exId-setIdx-type': value } } where type is 'weight' or 'reps'
  const [setLogs, setSetLogs] = useLocalStorage<Record<string, Record<string, string>>>('gym-tracker-logs', {});
  
  const [restTimer, setRestTimer] = useState<number>(0);

  useEffect(() => {
    let interval: number;
    if (restTimer > 0) {
      interval = window.setInterval(() => {
        setRestTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [restTimer]);

  const toggleSet = (exId: string, setIdx: number) => {
    const key = `${exId}-${setIdx}`;
    const isCompleted = completedSets[day.id]?.[key];
    
    setCompletedSets(prev => ({
      ...prev,
      [day.id]: {
        ...(prev[day.id] || {}),
        [key]: !isCompleted
      }
    }));

    if (!isCompleted) {
      // Trigger 60s rest timer when a set is completed
      setRestTimer(60);
    } else {
      setRestTimer(0);
    }
  };

  const updateLog = (exId: string, setIdx: number, type: 'weight' | 'reps', value: string) => {
    const key = `${exId}-${setIdx}-${type}`;
    setSetLogs(prev => ({
      ...prev,
      [day.id]: {
        ...(prev[day.id] || {}),
        [key]: value
      }
    }));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-gray-950">
      <div className="bg-gray-900 border-b border-gray-800 p-4 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 mr-2 text-gray-400 hover:text-gray-200 active:bg-gray-800 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="font-bold text-lg text-gray-100">{day.day}</h2>
          <p className="text-xs text-gray-400">{day.title}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {day.exercises.map((ex, index) => (
          <div key={ex.id} className="bg-gray-900 rounded-xl shadow-md border border-gray-800 p-4">
            <div className="mb-4">
              <h3 className="font-bold text-gray-200 text-lg">{index + 1}. {ex.name}</h3>
              <p className="text-sm text-indigo-400 font-medium">Target: {ex.sets} sets × {ex.reps}</p>
            </div>

            <div className="space-y-3">
              {Array.from({ length: ex.sets }).map((_, setIdx) => {
                const isCompleted = completedSets[day.id]?.[`${ex.id}-${setIdx}`] || false;
                const weight = setLogs[day.id]?.[`${ex.id}-${setIdx}-weight`] || '';
                const reps = setLogs[day.id]?.[`${ex.id}-${setIdx}-reps`] || '';

                return (
                  <div key={setIdx} className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${isCompleted ? 'bg-green-900/20' : 'bg-gray-800'}`}>
                    <div className="w-6 text-center text-sm font-semibold text-gray-500">
                      {setIdx + 1}
                    </div>
                    
                    <input 
                      type="number" 
                      placeholder="kg/lbs" 
                      value={weight}
                      onChange={(e) => updateLog(ex.id, setIdx, 'weight', e.target.value)}
                      disabled={isCompleted}
                      className="w-20 text-center text-sm p-2 rounded border border-gray-700 bg-gray-900 text-gray-100 disabled:opacity-50 disabled:border-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-600"
                    />
                    
                    <span className="text-gray-500 text-sm">×</span>
                    
                    <input 
                      type="number" 
                      placeholder="reps" 
                      value={reps}
                      onChange={(e) => updateLog(ex.id, setIdx, 'reps', e.target.value)}
                      disabled={isCompleted}
                      className="w-16 text-center text-sm p-2 rounded border border-gray-700 bg-gray-900 text-gray-100 disabled:opacity-50 disabled:border-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-600"
                    />

                    <button 
                      onClick={() => toggleSet(ex.id, setIdx)}
                      className={`ml-auto w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isCompleted ? 'bg-green-600 text-white' : 'bg-gray-800 border-2 border-gray-600 text-gray-500 hover:border-gray-500'}`}
                    >
                      <Check size={20} className={isCompleted ? 'opacity-100' : 'opacity-0'} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Rest Timer */}
      {restTimer > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 border border-gray-700 text-white px-6 py-3 rounded-full shadow-2xl shadow-black/50 flex items-center gap-3 animate-bounce">
          <Timer size={20} className="text-indigo-400" />
          <span className="font-mono font-bold text-lg">{formatTime(restTimer)}</span>
          <button 
            onClick={() => setRestTimer(0)}
            className="ml-2 text-xs uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
          >
            Skip
          </button>
        </div>
      )}
    </div>
  );
}
