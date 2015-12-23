// (C) Copyright 2014 Hewlett Packard Enterprise Development LP
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
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
module.exports = exports["default"];