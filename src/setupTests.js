global.console.warn = (message) => {
  throw message;
};
global.console.error = (message) => {
  throw message;
};

jest.mock('./js/__mock__/ResizeObserver', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
}));
