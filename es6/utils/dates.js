// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
export var setHoursWithOffset = function setHoursWithOffset(date) {
  var newDate = new Date(date);
  if ((date == null ? void 0 : date.indexOf('T')) === -1) {
    var offset = newDate.getTimezoneOffset();
    var hour = newDate.getHours();
    newDate.setHours(hour, offset < 0 ? -offset : offset);
  }
  return newDate;
};
export var pad = function pad(value) {
  return String(value).padStart(2, '0');
};
export var normalizeStep = function normalizeStep(step) {
  var parsed = Number(step);
  if (!Number.isFinite(parsed) || parsed <= 0) return 1;
  return Math.max(1, Math.floor(parsed));
};