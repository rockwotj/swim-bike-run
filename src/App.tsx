import {Home} from './components/Home';
import {Loading} from './components/Loading';
import {Permission} from './components/Permission';
import {ShakePermission, useIsShakePermitted} from './lib/shake'
import {assertNever} from './lib/util';

function App() {
  const {permission, requestPermission} = useIsShakePermitted();
  switch (permission) {
    case ShakePermission.GRANTED:
    case ShakePermission.UNKNOWN:
      return <Home />
    case ShakePermission.REQUESTING:
      return <Loading />
    case ShakePermission.DENIED:
      return <Permission description='In order to detect you shaking your device you must grant permissions' requestPermission={requestPermission} />
    default:
      assertNever(permission);
  };
}

export default App
