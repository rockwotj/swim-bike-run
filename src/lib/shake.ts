import {useCallback, useEffect, useRef, useState} from 'react';

declare var DeviceMotionEvent: {
  requestPermission(): Promise<PermissionState>;
}

export enum ShakePermission {
  GRANTED, DENIED, REQUESTING
}

export function useIsShakePermitted() {
  const [permission, setPermission] = useState(() => {
    if (typeof window.DeviceMotionEvent === "undefined") return ShakePermission.GRANTED;
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      return ShakePermission.DENIED;
    } else {
      return ShakePermission.GRANTED;
    }
  });
  const requestPermission = useCallback(async () => {
    if (permission !== ShakePermission.DENIED) return;
    setPermission(ShakePermission.REQUESTING);
    const status = await DeviceMotionEvent.requestPermission();
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
    const {threshold = 5, timeout = 1000} = options;
    this.#threshold = threshold;
    this.#timeout = timeout;
    this.#timeStamp = Date.now() - timeout;
    this.#callback = cb;
  }
  
  #handleDeviceMotion = (event: DeviceMotionEvent): void => {
    const now = Date.now();
    const diff = now - this.#timeStamp;
    if (diff < this.#timeout) return;
    const accel = this.#getMaxAcceleration(event);
    if (accel < this.#threshold) return;
    this.#timeStamp = now;
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
    } else {
      console.log("Missing event.acceleration");
    }
    return max;
  }
}


