// (C) Copyright 2014 Hewlett Packard Enterprise Development LP
export default {
  getMessage (intl, key, values) {
    if (intl) {
      return intl.formatMessage({
        id: key,
        defaultMessage: key
      }, values);
    } else {
      return key;
    }
  }
};
