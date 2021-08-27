global.console.warn = (message) => {
  throw message;
};
global.console.error = (message) => {
  throw message;
};

class ResizeObserver {
    observe() {
        // do nothing
    }
    unobserve() {
        // do nothing
    }
}

window.ResizeObserver = ResizeObserver;