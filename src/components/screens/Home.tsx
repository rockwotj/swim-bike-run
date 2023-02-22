import {useLocation} from "wouter";
import {RNG} from "../../lib/random";
import {useOnShake} from "../../lib/shake";
import {ALL_SPORTS} from "../../lib/sport";
import {Button} from "../common/Button";
import {SettingsIcon} from "../common/Icon";
import classes from './home.module.css';

const rng = new RNG();

export function Home(): JSX.Element {
  const [,navigate] = useLocation();
  useOnShake(() => {
    navigate(`/sport/${rng.choice(ALL_SPORTS)}`);
  });
  return <div className={classes.container}>
    <SettingsIcon className={classes.settingsIcon}/>
    <div className={classes.content}>
      <h1 className={classes.header}>Welcome</h1>
      {ALL_SPORTS.map((sport) => (
        <Button key={sport.type} className={classes.button} onClick={() => navigate(`/sport/${sport.type}`)}>
          {sport.asTitle()}
        </Button>
      ))}
        <Button color="green" className={classes.button} onClick={() => navigate(`/completed`)}>
          Completed Workouts
        </Button>
    </div>
  </div>
}
