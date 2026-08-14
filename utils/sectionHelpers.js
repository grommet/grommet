"use strict";

exports.__esModule = true;
exports.getSectionTokenFromType = exports.getSectionNameFromType = exports.getSectionKeyFromType = void 0;
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var sectionKeyByType = {
  day: 'day',
  month: 'month',
  year: 'year',
  hours: 'hour',
  minutes: 'minute',
  seconds: 'second',
  meridiem: 'period'
};
var sectionTokenByType = {
  day: 'dd',
  month: 'mm',
  year: 'yyyy',
  hours: 'hh',
  minutes: 'mm',
  seconds: 'ss',
  meridiem: 'aa'
};
var sectionMessageSuffixByType = {
  day: 'sectionDay',
  month: 'sectionMonth',
  year: 'sectionYear',
  hours: 'sectionHours',
  minutes: 'sectionMinutes',
  seconds: 'sectionSeconds',
  meridiem: 'sectionMeridiem'
};
var defaultSectionNameByType = {
  day: 'day',
  month: 'month',
  year: 'year',
  hours: 'hours',
  minutes: 'minutes',
  seconds: 'seconds',
  meridiem: 'meridiem'
};
var getSectionKeyFromType = exports.getSectionKeyFromType = function getSectionKeyFromType(sectionType) {
  return sectionKeyByType[sectionType];
};
var getSectionTokenFromType = exports.getSectionTokenFromType = function getSectionTokenFromType(sectionType) {
  return sectionTokenByType[sectionType];
};
var getSectionNameFromType = exports.getSectionNameFromType = function getSectionNameFromType(_ref) {
  var sectionType = _ref.sectionType,
    messagePrefix = _ref.messagePrefix,
    formatMessage = _ref.formatMessage,
    messages = _ref.messages;
  if (formatMessage) {
    return formatMessage({
      id: messagePrefix + "." + sectionMessageSuffixByType[sectionType],
      messages: messages
    });
  }
  return defaultSectionNameByType[sectionType];
};