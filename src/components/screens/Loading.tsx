import classes from './loading.module.css';

export function Loading(): JSX.Element {
  return <div className={classes.container}><span className={classes.loader}/></div>
}
