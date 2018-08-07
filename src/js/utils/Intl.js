// (C) Copyright 2014 Hewlett Packard Enterprise Development LP
export default {
  getMessage (intl, key, values, defaultMessage) {
    if (intl) {
      return intl.formatMessage({
        id: key,
        defaultMessage: defaultMessage || key
      }, values);
    } else {
      return key;
    }
  }
};
