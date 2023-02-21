import {CSSProperties, MouseEventHandler} from 'react';
import {useLocation} from 'wouter';
import closeSvg from '../../assets/close.svg';
import settingsSvg from '../../assets/settings.svg';
import {combineClasses} from '../../lib/css';
import classes from './icon.module.css';

interface CloseIconProps {
  readonly style?: CSSProperties;
  readonly className?: string;
  readonly onClick: MouseEventHandler;
}

export function CloseIcon({className, ...props}: CloseIconProps): JSX.Element {
  return <img 
    {...props}
    className={combineClasses(className, classes.icon)}
    width={24}
    height={24}
    src={closeSvg}
  />
}

interface SettingsIconProps {
  readonly style?: CSSProperties;
  readonly className?: string;
}

export function SettingsIcon({className, ...props}: SettingsIconProps): JSX.Element {
  const [location, navigate] = useLocation();
  const handleClick = () => {
    navigate(`/settings?prev=${encodeURIComponent(location)}`);
  };
  return <img 
    {...props}
    className={combineClasses(className, classes.icon)}
    onClick={handleClick}
    width={24}
    height={24}
    src={settingsSvg}
  />
}
