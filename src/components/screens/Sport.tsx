import {useState} from "react";
import {RNG} from "../../lib/random";
import {useOnShake} from "../../lib/shake";
import {Sport} from "../../lib/sport";

const rng = new RNG();

interface SportWorkoutProps {
  readonly sport: Sport;
}

export function SportWorkout({sport}: SportWorkoutProps): JSX.Element {
  const [workout, setWorkout] = useState<number>(rng.nextRange(0, 100));
  useOnShake(() => {
    setWorkout(rng.nextRange(0, 100));
  });
  return <div>
    <h1>{sport.asTitle()} Workout</h1>
    <p>Workout {workout}</p>
  </div>
}
