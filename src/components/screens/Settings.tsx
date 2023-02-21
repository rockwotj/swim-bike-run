import {useLiveQuery} from 'dexie-react-hooks';
import {useLocation} from 'wouter';
import {db} from '../../lib/db';
import {queryParams} from '../../lib/url';
import {CloseIcon} from '../common/Icon';
import classes from './settings.module.css';


export function Settings(): JSX.Element {
  const [, navigate] = useLocation();
  const handleClose = () => {
    const prev = queryParams().get("prev");
    navigate(prev ? decodeURIComponent(prev) : "/");
  };
  // TODO: Handle flickering loading
  const raceDate = useLiveQuery(() => db.settings.get("race-date"), [], null);
  return (<div className={classes.container}>
    <CloseIcon onClick={handleClose} />
    <div className={classes.section}>
      <h3>Race Date</h3>
      <input 
        type="date"
        className={classes.dateInput}
        value={raceDate?.value || ""} 
        onChange={(e) => db.settings.put({id: 'race-date', value: e.target.value})}
      />
    </div>
  </div>);
}
