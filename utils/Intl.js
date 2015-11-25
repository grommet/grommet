// (C) Copyright 2014 Hewlett Packard Enterprise Development LP
"use strict";

module.exports = {
  getMessage: function getMessage(intl, key, values) {
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