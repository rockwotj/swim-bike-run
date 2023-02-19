import classes from './permission.module.css';

interface PermissionProps {
  readonly description: string;
  readonly requestPermission: () => void;
}

export function Permission({description, requestPermission}: PermissionProps): JSX.Element {
  return (
    <div>
      <h2>Permission Required</h2>
      <p>{description}</p>
      <button onClick={requestPermission}>
        Continue
      </button>
    </div>
  );
}
