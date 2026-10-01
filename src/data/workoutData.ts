export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
}

export interface DayWorkout {
  id: string;
  day: string;
  title: string;
  exercises: Exercise[];
}

export const workoutSchedule: DayWorkout[] = [
  {
    id: "mon",
    day: "Monday",
    title: "Upper Body A",
    exercises: [
      { id: "e1", name: "Dumbbell or Barbell Bench Press", sets: 3, reps: "8-10" },
      { id: "e2", name: "Lat Pulldown - Wide Grip", sets: 3, reps: "10-12" },
      { id: "e3", name: "Seated Dumbbell Shoulder Press", sets: 3, reps: "10-12" },
      { id: "e4", name: "Triceps Rope Pushdowns", sets: 3, reps: "12-15" }
    ]
  },
  {
    id: "tue",
    day: "Tuesday",
    title: "Push",
    exercises: [
      { id: "e5", name: "Incline Dumbbell Press", sets: 3, reps: "10-12" },
      { id: "e6", name: "Dumbbell Chest Flyes / Machine Pec Deck", sets: 3, reps: "12-15" },
      { id: "e7", name: "Dumbbell Lateral Raises", sets: 3, reps: "12-15" },
      { id: "e8", name: "Overhead Dumbbell Triceps Extension", sets: 3, reps: "10-12" }
    ]
  },
  {
    id: "wed",
    day: "Wednesday",
    title: "Pull",
    exercises: [
      { id: "e9", name: "Seated Cable Row", sets: 3, reps: "10-12" },
      { id: "e10", name: "Single-Arm Dumbbell Row", sets: 3, reps: "10-12 per arm" },
      { id: "e11", name: "Face Pulls - Cable", sets: 3, reps: "15" },
      { id: "e12", name: "Standing Dumbbell Bicep Curls", sets: 3, reps: "10-12" }
    ]
  },
  {
    id: "thu",
    day: "Thursday",
    title: "Upper Body B",
    exercises: [
      { id: "e13", name: "Flat Dumbbell Press", sets: 3, reps: "10-12" },
      { id: "e14", name: "Lat Pulldown - Close/Neutral Grip", sets: 3, reps: "10-12" },
      { id: "e15", name: "Dumbbell Arnold Press", sets: 3, reps: "10-12" },
      { id: "e16", name: "Dumbbell Hammer Curls", sets: 3, reps: "10-12" }
    ]
  },
  {
    id: "fri",
    day: "Friday",
    title: "Arms & Core",
    exercises: [
      { id: "e17", name: "EZ-Bar or Dumbbell Preacher Curls", sets: 3, reps: "10-12" },
      { id: "e18", name: "Bench Dips or Straight-Bar Pushdowns", sets: 3, reps: "10-12" },
      { id: "e19", name: "Cable or Dumbbell Reverse Flyes", sets: 3, reps: "12-15" },
      { id: "e20", name: "Planks", sets: 3, reps: "30-45 second holds" }
    ]
  },
  {
    id: "sat",
    day: "Saturday",
    title: "Full Legs",
    exercises: [
      { id: "e21", name: "Dumbbell Goblet Squats", sets: 3, reps: "10-12" },
      { id: "e22", name: "Dumbbell Romanian Deadlifts", sets: 3, reps: "10-12" },
      { id: "e23", name: "Leg Press Machine", sets: 3, reps: "10-12" },
      { id: "e24", name: "Lying or Seated Leg Curls", sets: 3, reps: "12-15" },
      { id: "e25", name: "Standing Calf Raises", sets: 3, reps: "15" }
    ]
  }
];
