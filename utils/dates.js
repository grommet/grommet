"use strict";

exports.__esModule = true;
exports.setHoursWithOffset = exports.pad = exports.normalizeStep = void 0;
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var setHoursWithOffset = exports.setHoursWithOffset = function setHoursWithOffset(date) {
  var newDate = new Date(date);
  if ((date == null ? void 0 : date.indexOf('T')) === -1) {
    var offset = newDate.getTimezoneOffset();
    var hour = newDate.getHours();
    newDate.setHours(hour, offset < 0 ? -offset : offset);
  }
  return newDate;
};
var pad = exports.pad = function pad(value) {
  return String(value).padStart(2, '0');
};
var normalizeStep = exports.normalizeStep = function normalizeStep(step) {
  var parsed = Number(step);
  if (!Number.isFinite(parsed) || parsed <= 0) return 1;
  return Math.max(1, Math.floor(parsed));
};