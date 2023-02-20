import {CSSProperties, MouseEventHandler} from 'react';
import {useLocation} from 'wouter';
import closeSvg from '../../assets/close.svg';
import settingsSvg from '../../assets/settings.svg';

interface CloseIconProps {
  readonly style?: CSSProperties;
  readonly className?: string;
  readonly onClick: MouseEventHandler;
}

export function CloseIcon(props: CloseIconProps): JSX.Element {
  return <img 
    {...props}
    width={24}
    height={24}
    src={closeSvg}
  />
}

interface SettingsIconProps {
  readonly style?: CSSProperties;
  readonly className?: string;
}

export function SettingsIcon(props: SettingsIconProps): JSX.Element {
  const [location, navigate] = useLocation();
  const handleClick = () => {
    navigate(`/settings?prev=${encodeURIComponent(location)}`);
  };
  return <img 
    {...props}
    onClick={handleClick}
    width={24}
    height={24}
    src={settingsSvg}
  />
}
