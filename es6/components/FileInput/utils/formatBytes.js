var SI_CONVERSION_FACTOR = 1000;
var IEC_CONVERSION_FACTOR = 1024;
var getCurrentOS = function getCurrentOS() {
  var currentOS = ['Win', 'Linux', 'Mac'].find(function (v) {
    return window.navigator.userAgent.indexOf(v) >= 0;
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