import {useState} from "react";
import {RNG} from "../lib/random"
import {useOnShake} from "../lib/shake";


const rng = new RNG();

export function Home(): JSX.Element {
  const [workout, setWorkout] = useState<number | null>(null);
  useOnShake(() => {
    setWorkout(rng.nextRange(0, 100));
  });
  return <div>
    <h1>Welcome home</h1>
    <p>{workout === null ? "Shake to select a workout" : `Workout ${workout}`}</p>
  </div>
}
