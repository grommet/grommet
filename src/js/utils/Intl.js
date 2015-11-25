// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

module.exports = {
  getMessage: function (intl, key) {
    console.log(intl);
    if (intl) {
      return intl.formatMessage(key);
    } else {
      return key;
    }
  }
};
