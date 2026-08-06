// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
const sectionKeyByType = {
  day: 'day',
  month: 'month',
  year: 'year',
  hours: 'hour',
  minutes: 'minute',
  seconds: 'second',
  meridiem: 'period',
};

const sectionTokenByType = {
  day: 'dd',
  month: 'mm',
  year: 'yyyy',
  hours: 'hh',
  minutes: 'mm',
  seconds: 'ss',
  meridiem: 'aa',
};

const sectionMessageSuffixByType = {
  day: 'sectionDay',
  month: 'sectionMonth',
  year: 'sectionYear',
  hours: 'sectionHours',
  minutes: 'sectionMinutes',
  seconds: 'sectionSeconds',
  meridiem: 'sectionMeridiem',
};

const defaultSectionNameByType = {
  day: 'day',
  month: 'month',
  year: 'year',
  hours: 'hours',
  minutes: 'minutes',
  seconds: 'seconds',
  meridiem: 'meridiem',
};

export const getSectionKeyFromType = (sectionType) =>
  sectionKeyByType[sectionType];

export const getSectionTokenFromType = (sectionType) =>
  sectionTokenByType[sectionType];

export const getSectionKey = (sectionType) => sectionKeyByType[sectionType];

export const getSectionToken = (sectionType) => sectionTokenByType[sectionType];

export const getSectionNameFromType = ({
  sectionType,
  messagePrefix,
  formatMessage,
  messages,
}) => {
  if (formatMessage) {
    return formatMessage({
      id: `${messagePrefix}.${sectionMessageSuffixByType[sectionType]}`,
      messages,
    });
  }

  return defaultSectionNameByType[sectionType];
};
