import {useLocation} from 'wouter';
import {queryParams} from '../../lib/url';
import {CloseIcon} from '../common/Icon';
import classes from './settings.module.css';


export function Settings(): JSX.Element {
  const [, navigate] = useLocation();
  const handleClose = () => {
    const prev = queryParams().get("prev");
    navigate(prev ? decodeURIComponent(prev) : "/");
  };
  return (<div className={classes.container}>
    <CloseIcon onClick={handleClose} />
    <div>
      Settings go here
    </div>
  </div>);
}
