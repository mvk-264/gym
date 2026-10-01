import { Dumbbell } from 'lucide-react';
import { workoutSchedule } from '../data/workoutData';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface DashboardProps {
  onSelectDay: (id: string) => void;
}

export function Dashboard({ onSelectDay }: DashboardProps) {
  const [completedSets] = useLocalStorage<Record<string, Record<string, boolean>>>('gym-tracker-sets', {});

  return (
    <div className="p-4 md:p-6 lg:max-w-7xl lg:mx-auto w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-100">Your Routine</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {workoutSchedule.map((day) => {
          const totalSets = day.exercises.reduce((acc, ex) => acc + ex.sets, 0);
          let doneSets = 0;
          
          if (completedSets[day.id]) {
            const dayData = completedSets[day.id];
            day.exercises.forEach(ex => {
              for (let i = 0; i < ex.sets; i++) {
                if (dayData[`${ex.id}-${i}`]) doneSets++;
              }
            });
          }
          
          const progress = totalSets === 0 ? 0 : Math.round((doneSets / totalSets) * 100);

          return (
          <div 
            key={day.id}
            onClick={() => onSelectDay(day.id)}
            className="bg-gray-900 rounded-xl shadow-md border border-gray-800 p-4 cursor-pointer active:scale-95 transition-transform"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-semibold text-lg text-gray-100">{day.day}</h3>
                <p className="text-sm text-gray-400">{day.title}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-900/50 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Dumbbell size={20} />
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Progress</span>
                <span>{doneSets} / {totalSets} sets</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}
