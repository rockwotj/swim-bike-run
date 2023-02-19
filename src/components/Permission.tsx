import classes from './permission.module.css';

interface PermissionProps {
  readonly description: string;
  readonly requestPermission: () => void;
}

export function Permission({description, requestPermission}: PermissionProps): JSX.Element {
  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>Permission Required</h2> <p className={classes.description}>{description}</p>
      <button className={classes.button} onClick={requestPermission}>
        Continue
      </button>
    </div>
  );
}
