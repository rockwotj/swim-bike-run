import {useLocation} from "wouter";
import {db} from "../../lib/db";
import {CloseIcon} from "../common/Icon"
import classes from './completed.module.css';
import {useLiveQuery} from 'dexie-react-hooks';
import {Loading} from "./Loading";

export function Completed(): JSX.Element {
  const [,navigate] = useLocation();
  const completedWorkouts = useLiveQuery(
    () => db.completedWorkouts.reverse().toArray(),
    [],
    null
  );
  return (<div className={classes.container}>
    <CloseIcon className={classes.closeIcon} onClick={() => navigate('/')}/>
    <h1 className={classes.heading}>Completed</h1>
    <div className={classes.content}>
    {!completedWorkouts ? <Loading /> : null}
    {completedWorkouts?.length === 0 ? 'No completed workouts' : null}
    {completedWorkouts?.map((completed) => (
      <CompletedEntry key={completed.id} workout={completed.workout} time={completed.time}/>
    ))}
    </div>
  </div>);
};

interface CompletedEntryProps {
  readonly workout: string;
  readonly time: number;
}

const FORMATTER = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'short',
  timeStyle: 'short',
});

function CompletedEntry({workout, time}: CompletedEntryProps): JSX.Element {
return <div className={classes.entry}>
  <span className={classes.truncate}>{workout}</span> at {FORMATTER.format(time)}
</div>
}
