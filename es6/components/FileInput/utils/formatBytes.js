var SI_CONVERSION_FACTOR = 1000;
var IEC_CONVERSION_FACTOR = 1024;
var getCurrentOS = function getCurrentOS() {
  var currentOS = ['Win', 'Linux', 'Mac'].find(function (v) {
    var _window;
    if (typeof window !== 'undefined') return ((_window = window) == null || (_window = _window.navigator) == null || (_window = _window.userAgent) == null ? void 0 : _window.indexOf(v)) >= 0;
    return undefined;
  });
  return currentOS;
};
var defaultFormat = function defaultFormat(size) {
  var units = ['B', 'KB', 'MB', 'GB', 'TB'];
  var factor = SI_CONVERSION_FACTOR;
  var index = 0;
  var num = size;
  while (num >= factor && index < units.length - 1) {
    num /= factor;
    index += 1;
  }
  return num.toFixed(1) + " " + units[index];
};
var windowsFormat = function windowsFormat(size) {
  var num = Math.ceil(size / IEC_CONVERSION_FACTOR);
  return Intl.NumberFormat().format(num) + " KB";
};
var makeFormatBytes = function makeFormatBytes(OS) {
  return function (size) {
    switch (OS) {
      case 'Win':
        return windowsFormat(size);
      default:
        return defaultFormat(size);
    }
  };
};
var formatBytes = makeFormatBytes(getCurrentOS());
export { formatBytes };