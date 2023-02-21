import {CSSProperties, ReactNode, MouseEventHandler} from 'react';
import {combineClasses} from '../../lib/css';
import classes from './button.module.css';

interface ButtonProps {
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly children: ReactNode;
  readonly onClick: MouseEventHandler;
  readonly color?: 'orange' | 'green';
}

export function Button({className, children, color, ...rest}: ButtonProps) {
  return <button {...rest}
  className={combineClasses(classes.button, color && classes[color], className)}>
    {children}
  </button>
}
