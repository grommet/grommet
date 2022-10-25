const SI_CONVERSION_FACTOR = 1000;
const IEC_CONVERSION_FACTOR = 1024;

const getBrowser = () => {
  const currentOS = ['Win', 'Linux', 'Mac'].find(
    (v) => window.navigator.userAgent.indexOf(v) >= 0,
  );

  return currentOS;
};

const defaultFormat = (size) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const factor = SI_CONVERSION_FACTOR;
  let index = 0;
  let num = size;
  while (num >= factor && index < units.length - 1) {
    num /= factor;
    index += 1;
  }
  return `${num.toFixed(1)} ${units[index]}`;
};

const windowsFormat = (size) => {
  const num = Math.ceil(size / IEC_CONVERSION_FACTOR);

  function formatNumber(number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

  return `${formatNumber(num)} ${'KB'}`;
};

const makeFormatBytes = (browser) => (size) => {
  switch (browser) {
    case 'Win':
      return windowsFormat(size);
    default:
      return defaultFormat(size);
  }
};

const formatBytes = makeFormatBytes(getBrowser());

export { formatBytes };
