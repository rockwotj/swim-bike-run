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
    <SettingsIcon/>
    <div className={classes.content}>
      <h1>Welcome home</h1>
      {ALL_SPORTS.map((sport) => (
        <Button key={sport.type} onClick={() => navigate(`/sport/${sport.type}`)}>
          {sport.asTitle()}
        </Button>
      ))}
    </div>
  </div>
}
