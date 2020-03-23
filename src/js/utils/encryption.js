import md5 from 'js-md5';

export const getMd5 = email => {
  const lowCaseTrimmed = email.toLowerCase();
  return md5(lowCaseTrimmed);
};
