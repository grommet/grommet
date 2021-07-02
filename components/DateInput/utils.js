"use strict";

exports.__esModule = true;
exports.valuesAreEqual = exports.textToValue = exports.valueToText = exports.schemaToMask = exports.formatToSchema = void 0;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Converting between Date and String types is handled via a "schema".
// The schema is an array of strings, split into strings with identical
// characters. So, 'mm/dd/yyyy' will be ['mm', '/', 'dd', '/', 'yyyyy'].
var formatToSchema = function formatToSchema(format) {
  if (!format) return undefined;
  var result = [];
  var i = 0;
  var part;

  while (i < format.length) {
    if (!part || part[0] !== format[i]) {
      if (part) result.push(part);
      part = format[i];
    } else {
      part += format[i];
    }

    i += 1;
  }

  if (part) result.push(part);
  return result;
};

exports.formatToSchema = formatToSchema;
var masks = {
  m: {
    length: [1, 2],
    regexp: new RegExp("^[1-9]$|^1[0-2]$")
  },
  mm: {
    length: [1, 2],
    regexp: new RegExp("^[0-1]$|^0[1-9]$|^1[0-2]$")
  },
  d: {
    length: [1, 2],
    regexp: new RegExp("^[1-9]$|^[1-2][0-9]$|^3[0-1]$")
  },
  dd: {
    length: [1, 2],
    regexp: new RegExp("^[0-3]$|^0[1-9]$|^[1-2][0-9]$|^3[0-1]$")
  },
  yy: {
    length: [1, 2],
    regexp: new RegExp("^[0-9]{1,2}$")
  },
  yyyy: {
    length: [1, 4],
    regexp: new RegExp("^[0-9]{1,4}$")
  }
};

var schemaToMask = function schemaToMask(schema) {
  if (!schema) return undefined;
  return schema.map(function (part) {
    var lower = part.toLowerCase();
    var _char = lower[0];
    if (_char === 'm' || _char === 'd' || _char === 'y') return _extends({
      placeholder: part
    }, masks[lower]);
    return {
      fixed: part
    };
  });
}; // convert value into text representation using the schema


exports.schemaToMask = schemaToMask;

var valueToText = function valueToText(value, schema) {
  var text = ''; // when user initializes dates as empty array, we want to still
  // show the placeholder text

  if (!value || Array.isArray(value) && !value.length) return text;
  var dates = (Array.isArray(value) ? value : [value]).map(function (v) {
    return new Date(v);
  });
  var dateIndex = 0;
  var parts = {};
  schema.every(function (part) {
    var _char2 = part[0].toLowerCase(); // advance dateIndex if we already have this part


    while (dateIndex < dates.length && (Number.isNaN(dates[dateIndex].date) || (_char2 === 'm' || _char2 === 'd' || _char2 === 'y') && parts[part])) {
      dateIndex += 1;
      parts = {};
    }

    var date = dates[dateIndex];

    if (date && part === 'm') {
      text += date.getMonth() + 1;
      parts[part] = true;
    } else if (date && part === 'mm') {
      text += ("0" + (date.getMonth() + 1)).slice(-2);
      parts[part] = true;
    } else if (date && part === 'd') {
      text += date.getDate();
      parts[part] = true;
    } else if (date && part === 'dd') {
      text += ("0" + date.getDate()).slice(-2);
      parts[part] = true;
    } else if (date && part === 'yy') {
      text += date.getFullYear().toString().slice(-2);
      parts[part] = true;
    } else if (date && part === 'yyyy') {
      text += date.getFullYear();
      parts[part] = true;
    } else if (!date && (part[0] === 'm' || part[0] === 'd' || part[0] === 'y')) {
      return false;
    } else {
      text += part;
    }

    return true;
  });
  return text;
};

exports.valueToText = valueToText;
var charCodeZero = '0'.charCodeAt(0);
var charCodeNine = '9'.charCodeAt(0);

var pullDigits = function pullDigits(text, index) {
  var end = index;

  while (text.charCodeAt(end) >= charCodeZero && text.charCodeAt(end) <= charCodeNine) {
    end += 1;
  }

  return text.slice(index, end);
};

var textToValue = function textToValue(text, schema, valueProp, range) {
  if (!text) return range ? [] : undefined;
  var result;

  var addDate = function addDate(parts) {
    // Do a little sanity checking on the parts first.
    // If not valid, leave as is.
    if (!parts.m || !parts.d || !parts.y || parts.y.length < 4 || parts.m.length > 2 || parts.d.length > 2 || parts.m > 12 || parts.d > 31) return parts;
    var date = new Date(parts.y, parts.m - 1, parts.d).toISOString(); // match time and timezone of any supplied valueProp

    if (valueProp && (Array.isArray(valueProp) && valueProp[0] || !Array.isArray(valueProp))) {
      var valueDate = new Date(Array.isArray(valueProp) && valueProp.length ? valueProp[0] : valueProp).toISOString();
      date = date.split('T')[0] + "T" + valueDate.split('T')[1];
    }

    if (!range) {
      if (!result) result = date;
    } else {
      if (!result) result = [];
      result.push(date);
    } // we've consumed these parts, return an empty object in case we need
    // to start building up another one for a range


    return {};
  };

  var parts = {};
  var index = 0;
  schema.forEach(function (part) {
    if (index < text.length) {
      var lower = part.toLowerCase();
      var _char3 = lower[0];
      if (parts[_char3] !== undefined) parts = addDate(parts);

      if (_char3 === 'm') {
        parts.m = pullDigits(text, index);
        index += parts.m.length;
      } else if (_char3 === 'd') {
        parts.d = pullDigits(text, index);
        index += parts.d.length;
      } else if (_char3 === 'y') {
        parts.y = pullDigits(text, index);
        index += parts.y.length;

        if (lower === 'yy' && parts.y.length === 2) {
          // convert to full year, pivot at 69 based on POSIX strptime()
          parts.y = "" + (parts.y < 69 ? 20 : 19) + parts.y;
        }
      } else if (text.slice(index, index + part.length) === part) {
        index += part.length;
      } else {
        // syntax error
        index = text.length;
        result = undefined;
      }
    }
  });
  parts = addDate(parts);
  if (!result) return range ? [] : undefined;
  return result;
};

exports.textToValue = textToValue;

var valuesAreEqual = function valuesAreEqual(value1, value2) {
  return Array.isArray(value1) && Array.isArray(value2) && value1.every(function (d1, i) {
    return d1 === value2[i];
  }) || value1 === value2;
};

exports.valuesAreEqual = valuesAreEqual;