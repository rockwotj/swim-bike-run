import {useState} from "react";
import {useLocation} from "wouter";
import {db} from "../../lib/db";
import {RNG} from "../../lib/random";
import {useOnShake} from "../../lib/shake";
import {Sport} from "../../lib/sport";
import {Button} from "../common/Button";
import {CloseIcon, SettingsIcon} from "../common/Icon";
import classes from './sport.module.css'

const rng = new RNG();

interface SportWorkoutProps {
  readonly sport: Sport;
}

export function SportWorkout({sport}: SportWorkoutProps): JSX.Element {
  const [,navigate] = useLocation();
  const [isInProgress, setIsInProgress] = useState(false);
  const [workout, setWorkout] = useState<string>(rng.choice(sport.workouts()));
  useOnShake(() => {
    let newWorkout = rng.choice(sport.workouts());
    while (newWorkout === workout) {
      newWorkout = rng.choice(sport.workouts());
    }
    setWorkout(newWorkout);
  });
  const handleCloseClick = () => {
    if (isInProgress) {
      setIsInProgress(false);
    } else {
      navigate("/");
    }
  }
  const handleButtonClick = async () => {
    if (isInProgress) {
      // TODO: Progress indicator
      await db.completedWorkouts.add({workout, time: Date.now()});
      navigate('/completed');
    }
    setIsInProgress(!isInProgress);
  };
  return <div className={classes.container}>
    <CloseIcon className={classes.closeIcon} onClick={handleCloseClick} />
    {isInProgress ? null : <SettingsIcon className={classes.settingsIcon}/>}
    <h1 className={classes.heading}>{sport.asTitle()} Workout</h1>
    <p className={classes.workout}>{workout}</p>
    <Button className={classes.button} color={isInProgress ? 'green' : "orange"} onClick={handleButtonClick}>
      {isInProgress ? 'Complete Workout' : 'Select Workout'}
    </Button>
  </div>
}
