import {useCallback, useEffect, useRef, useState} from 'react';
import {db} from './db';

declare var DeviceMotionEvent: {
  requestPermission(): Promise<PermissionState>;
}

export enum ShakePermission {
  GRANTED, DENIED, UNKNOWN, REQUESTING
}

export function useIsShakePermitted() {
  const [permission, setPermission] = useState(() => {
    if (typeof window.DeviceMotionEvent === "undefined") return ShakePermission.GRANTED;
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      return ShakePermission.UNKNOWN;
    } else {
      return ShakePermission.GRANTED;
    }
  });
  useEffect(() => {
    if (permission !== null) return;
    db.permissions.get('shake').then((stored) => {
      setPermission(stored?.status === "granted" ? ShakePermission.GRANTED : ShakePermission.DENIED);
    });
  }, [permission]);
  const requestPermission = useCallback(async () => {
    if (permission) return;
    setPermission(ShakePermission.REQUESTING);
    const status = await DeviceMotionEvent.requestPermission();
    await db.permissions.put({id: 'shake', status});
    setPermission(status === 'granted' ? ShakePermission.GRANTED : ShakePermission.DENIED);
  }, [permission]);
  return {
    permission,
    requestPermission,
  };
}

type ShakeCallback = () => void;

export function useOnShake(cb: ShakeCallback) {
  const latestCb = useRef(cb);
  latestCb.current = cb;
  useEffect(() => {
    const shake = new ShakeListener(() => latestCb.current());
    shake.start();
    return () => shake.stop();
  }, []);
}


interface ShakeOptions {
  /**
   * Minimum acceleration needed to dispatch an event:
   * meters per second squared (m/s²).
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent/acceleration
   */
  readonly threshold: number;
  /**
   * After a shake event is dispatched, subsequent events will not be dispatched
   * until after a duration greater than or equal to this value (milliseconds).
   */
  readonly timeout: number;
};

class ShakeListener {
  #threshold: ShakeOptions['threshold'];
  #timeout: ShakeOptions['timeout'];
  #timeStamp: number;
  #callback: ShakeCallback;

  constructor(cb: ShakeCallback, options: Partial<ShakeOptions> = {}) {
    const {threshold = 15, timeout = 1000} = options;
    this.#threshold = threshold;
    this.#timeout = timeout;
    this.#timeStamp = timeout * -1;
    this.#callback = cb;
  }
  
  #handleDeviceMotion = (event: DeviceMotionEvent): void => {
    const diff = event.timeStamp - this.#timeStamp;
    if (diff < this.#timeout) return;
    const accel = this.#getMaxAcceleration(event);
    if (accel < this.#threshold) return;
    this.#timeStamp = event.timeStamp;
    this.#callback();
  };

  start() {
    window.addEventListener('devicemotion', this.#handleDeviceMotion);
  }

  stop(): void {
    window.removeEventListener('devicemotion', this.#handleDeviceMotion);
  }

  #getMaxAcceleration(event: DeviceMotionEvent): number {
    let max = 0;
    if (event.acceleration) {
      for (const key of ['x', 'y', 'z'] as const) {
        const value = Math.abs(event.acceleration[key] ?? 0);
        if (value > max) max = value;
      }
    }
    return max;
  }
}


