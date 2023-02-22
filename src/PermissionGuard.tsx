import {App} from './App';
import {Loading} from './components/screens/Loading';
import {Permission} from './components/screens/Permission';
import {ShakePermission, useIsShakePermitted} from './lib/shake'
import {assertNever} from './lib/util';

export function PermissionGuard() {
  const {permission, requestPermission} = useIsShakePermitted();
  switch (permission) {
    case ShakePermission.GRANTED:
      return <App />
    case ShakePermission.REQUESTING:
      return <Loading />
    case ShakePermission.DENIED:
      return <Permission description='In order to detect you shaking your device you must grant permissions' requestPermission={requestPermission} />
    default:
      assertNever(permission);
  };
}

