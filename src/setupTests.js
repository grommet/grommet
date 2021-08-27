global.console.warn = (message) => {
  throw message;
};
global.console.error = (message) => {
  throw message;
};

class ResizeObserver {
    // eslint-disable-next-line class-methods-use-this
    observe() {
        // do nothing
    }

    // eslint-disable-next-line class-methods-use-this
    unobserve() {
        // do nothing
    }
}

window.ResizeObserver = ResizeObserver;