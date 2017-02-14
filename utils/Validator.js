'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

exports.default = {
  validate: function validate(rules) {
    var result = {
      valid: true,
      errors: {},
      firstError: undefined
    };

    rules.forEach(function (rule) {
      if (rule.hasOwnProperty('test')) {
        if (rule.test) {
          result.errors[rule.field] = rule.message;
          result.valid = false;
          result.firstError = result.firstError || rule.field;
        }
      } else if (rule.hasOwnProperty('tests')) {
        rule.tests.some(function (test) {
          if (test.test) {
            result.errors[rule.field] = test.message;
            result.valid = false;
            result.firstError = result.firstError || rule.field;
            return true;
          }
          return false;
        });
      }
    });

    return result;
  }
};
module.exports = exports['default'];