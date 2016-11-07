// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

/*
 * Scroll provides smooth scrolling.
 */

const SCROLL_STEPS = 25;

function easeInOutQuad (t) {
  return (t < .5 ?  2 * t * t : -1 + (4 - 2 * t) * t);
}

export default {

  // component: component to scroll
  // property: 'scrollTop' | 'scrollLeft'
  // delta: amount to scroll
  // doneHandler: optional function called when the scroll is done

  scrollBy (component, property, delta, doneHandler) {
    clearInterval(this._scrollToTimer);
    const start = component[property];
    const end = start + delta;
    let step = 1;
    this._scrollToTimer = setInterval(() => {
      const current = component[property];
      let next;
      const easing = easeInOutQuad(step / SCROLL_STEPS);
      if (end > start) {
        next = Math.min(end, Math.max(current,
          Math.round(start + ((end - start) * easing))));
      } else {
        next = Math.max(end, Math.min(current,
          Math.round(start - ((start - end) * easing))));
      }
      component[property] = next;
      step += 1;
      if (step > SCROLL_STEPS) {
        // we're done, but the browser/OS might still be easing from a
        // mouse wheel interaction. So, set it one more time after a bit.
        clearInterval(this._scrollToTimer);
        this._scrollToTimer = setTimeout(() => {
          component[property] = next;
          if (doneHandler) {
            doneHandler();
          }
        }, 200);
      }
    }, 8);
  }
};
