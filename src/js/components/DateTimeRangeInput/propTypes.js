// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    alignSelf: genericProps.alignSelf,
    defaultValue: PropTypes.arrayOf(PropTypes.string),
    disabled: PropTypes.bool,
    focusIndicator: PropTypes.bool,
    format: PropTypes.oneOf(['12', '24']),
    gridArea: genericProps.gridArea,
    id: PropTypes.string,
    locale: PropTypes.string,
    margin: genericProps.margin,
    messages: PropTypes.shape({
      activeSection: PropTypes.string,
      activeSectionValue: PropTypes.string,
      chooseDateTime: PropTypes.string,
      chooseDateTimeRange: PropTypes.string,
      cancel: PropTypes.string,
      endLabel: PropTypes.string,
      inputLabel: PropTypes.string,
      invalidDateTime: PropTypes.string,
      invalidRange: PropTypes.string,
      next: PropTypes.string,
      nextRange: PropTypes.string,
      apply: PropTypes.string,
      openDrop: PropTypes.string,
      previousRange: PropTypes.string,
      sectionDay: PropTypes.string,
      sectionHours: PropTypes.string,
      sectionMeridiem: PropTypes.string,
      sectionMinutes: PropTypes.string,
      sectionMonth: PropTypes.string,
      sectionSeconds: PropTypes.string,
      sectionYear: PropTypes.string,
      separator: PropTypes.string,
      startLabel: PropTypes.string,
    }),
    minuteStep: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    plain: PropTypes.bool,
    ranges: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.node.isRequired,
        getValue: PropTypes.func.isRequired,
      }),
    ),
    readOnly: PropTypes.bool,
    showSeconds: PropTypes.bool,
    value: PropTypes.arrayOf(PropTypes.string),
  };
}

export const DateTimeRangeInputPropTypes = PropType;
