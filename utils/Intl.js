// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

"use strict";

module.exports = {
  getMessage: function getMessage(intl, key) {
    console.log(intl);
    if (intl) {
      return intl.formatMessage(key);
    } else {
      return key;
    }
  }
};