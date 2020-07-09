"use strict";

exports.__esModule = true;
exports.textToValue = exports.valueToText = exports.formatToSchema = void 0;

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
}; // convert value into text representation using the schema


exports.formatToSchema = formatToSchema;

var valueToText = function valueToText(value, schema) {
  if (!value) return '';
  var text = '';
  var dates = (Array.isArray(value) ? value : [value]).map(function (v) {
    return new Date(v);
  });
  var dateIndex = 0;
  var parts = {};
  schema.forEach(function (part) {
    var _char = part[0].toLowerCase(); // advance dateIndex if we already have this part


    while (dateIndex < dates.length && (Number.isNaN(dates[dateIndex].date) || (_char === 'm' || _char === 'd' || _char === 'y') && parts[_char])) {
      dateIndex += 1;
      parts = {};
    }

    var date = dates[dateIndex];

    if (date && _char === 'm') {
      text += date.getMonth() + 1;
      parts[_char] = true;
    } else if (date && _char === 'd') {
      text += date.getDate();
      parts[_char] = true;
    } else if (date && _char === 'y') {
      text += date.getFullYear();
      parts[_char] = true;
    } else text += part;
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

var textToValue = function textToValue(text, schema) {
  if (!text) return undefined;
  var result;

  var addDate = function addDate(parts) {
    // do a little sanity checking on the values
    if (!parts.m || !parts.d || !parts.y || parts.y.length < 4 || parts.m.length > 2 || parts.d.length > 2 || parts.m > 12 || parts.d > 31) return parts;
    var date = new Date(parts.y, parts.m - 1, parts.d).toISOString();
    if (!result) result = date; // single
    else if (Array.isArray(result)) result.push(date); // second
      else result = [result, date]; // third and beyond, unused?

    return {};
  };

  var parts = {};
  var index = 0;
  schema.forEach(function (part) {
    if (index < text.length) {
      var _char2 = part[0].toLowerCase();

      if (parts[_char2] !== undefined) parts = addDate(parts);

      if (_char2 === 'm') {
        parts.m = pullDigits(text, index);
        index += parts.m.length;
      } else if (_char2 === 'd') {
        parts.d = pullDigits(text, index);
        index += parts.d.length;
      } else if (_char2 === 'y') {
        parts.y = pullDigits(text, index);
        index += parts.y.length;
      } else if (text.slice(index, index + part.length) === part) {
        index += part.length;
      } else {
        // syntax error
        index = text.length;
        result = undefined;
      }
    }
  });
  addDate(parts);
  return result;
};

exports.textToValue = textToValue;