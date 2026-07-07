import { SECTION_HOUR, SECTION_MINUTE, SECTION_PERIOD } from './utils';

const getSectionKey = (activeSection) => {
  if (activeSection === SECTION_HOUR) return 'hour';
  if (activeSection === SECTION_MINUTE) return 'minute';
  return 'second';
};

export const getActiveSectionValueAnnouncement = ({
  activeSection,
  format,
  formatMessage,
  messages,
  sections,
  getSectionName,
}) => {
  if (activeSection === SECTION_PERIOD) {
    return formatMessage({
      id: 'timeInput.activePeriodValue',
      messages,
      values: { period: sections.period || 'AM' },
    });
  }

  const sectionKey = getSectionKey(activeSection);
  const sectionValue = sections[sectionKey];

  if (sectionValue === undefined) {
    return formatMessage({
      id: 'timeInput.activeSection',
      messages,
      values: { section: getSectionName(activeSection, format) },
    });
  }

  return formatMessage({
    id: 'timeInput.activeSectionValue',
    messages,
    values: {
      value: sectionValue,
      section: getSectionName(activeSection, format),
    },
  });
};

export const getActiveSectionAriaMeta = ({
  activeSection,
  format,
  sections,
}) => {
  if (activeSection === SECTION_PERIOD) {
    return {
      now: sections.period === 'PM' ? 1 : 0,
      min: 0,
      max: 1,
    };
  }

  const sectionKey = getSectionKey(activeSection);
  const min = format === '12' && activeSection === SECTION_HOUR ? 1 : 0;
  let max = 59;

  if (activeSection === SECTION_HOUR) {
    max = format === '12' ? 12 : 23;
  }

  const now = sections[sectionKey] ?? min;

  return {
    now,
    min,
    max,
  };
};
