// const originalErr = global.console.error.bind(global.console.error);
// beforeEach(() => {
//   global.console.error = (msg) =>
//     !msg.toString().includes('ReactDOM.render') && originalErr(msg);
// });
// afterEach(() => {
//   global.console.error = originalErr;
// });

global.console.warn = (message) => {
  throw message;
};
global.console.error = (message) => {
  throw message;
};
