// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
export const setHoursWithOffset = (date) => {
  const newDate = new Date(date);

  if (date?.indexOf('T') === -1) {
    const offset = newDate.getTimezoneOffset();
    const hour = newDate.getHours();
    newDate.setHours(hour, offset < 0 ? -offset : offset);
  }

  return newDate;
};

export const pad = (value) => String(value).padStart(2, '0');

export const normalizeStep = (step) => {
  const parsed = Number(step);
  if (!Number.isFinite(parsed) || parsed <= 0) return 1;
  return Math.max(1, Math.floor(parsed));
};
