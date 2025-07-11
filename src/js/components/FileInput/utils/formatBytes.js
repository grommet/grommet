const SI_CONVERSION_FACTOR = 1000;
const IEC_CONVERSION_FACTOR = 1024;

const getCurrentOS = () => {
  const currentOS = ['Win', 'Linux', 'Mac'].find((v) => {
    if (typeof window !== 'undefined')
      return window?.navigator?.userAgent?.indexOf(v) >= 0;
    return undefined;
  });

  return currentOS;
};

const defaultFormat = (size) => {
  if (
    size === null ||
    size === undefined ||
    size === '' ||
    Number.isNaN(Number(size))
  ) {
    return '0 B';
  }
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const factor = SI_CONVERSION_FACTOR;

  let index = 0;
  let num = Number(size);
  while (num >= factor && index < units.length - 1) {
    num /= factor;
    index += 1;
  }
  return `${num.toFixed(1)} ${units[index]}`;
};

const windowsFormat = (size) => {
  if (
    size === null ||
    size === undefined ||
    size === '' ||
    Number.isNaN(Number(size))
  ) {
    return '0 KB';
  }

  const num = Number(size);
  const rounded = Math.ceil(num / IEC_CONVERSION_FACTOR);
  return `${Intl.NumberFormat().format(rounded)} KB`;
};

const makeFormatBytes = (OS) => (size) => {
  switch (OS) {
    case 'Win':
      return windowsFormat(size);
    default:
      return defaultFormat(size);
  }
};

const formatBytes = makeFormatBytes(getCurrentOS());

export { formatBytes };
