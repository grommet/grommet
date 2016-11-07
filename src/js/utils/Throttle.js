// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

export default function (fn, threshhold = 250, scope = this) {
  let last;
  let deferTimer;

  return function () {
    let now = Date.now();
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(scope, arguments);
      }, threshhold);
    } else {
      last = now;
      fn.apply(scope, arguments);
    }
  };
}
