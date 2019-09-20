// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

export const throttle = (fn, threshhold = 250, scope = this) => {
  let last;
  let deferTimer;

  return (...args) => {
    const now = Date.now();
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(scope, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(scope, args);
    }
  };
};
