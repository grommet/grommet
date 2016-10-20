// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

let passiveEventsSupport = null;

export default {
  /**
   * Determines if the browser supports passive event listeners.
   * https://github.com/Modernizr/Modernizr/issues/1894
   */
  passiveEvents () {
    if (passiveEventsSupport === null) {
      let supportsPassive = false;

      // Note: this works synchronously.
      document.createElement('div').addEventListener('test', null, {
        get passive() {
          supportsPassive = true;
        }
      });

      passiveEventsSupport = supportsPassive;
    }

    return passiveEventsSupport;
  }
};
