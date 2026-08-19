// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    messages: PropTypes.shape({
      filtered: PropTypes.string,
      filteredSingle: PropTypes.string,
      items: PropTypes.string,
      itemsSingle: PropTypes.string,
      selected: PropTypes.string,
      total: PropTypes.string,
      totalSingle: PropTypes.string
    })
  };
}
export var DataSummaryPropTypes = PropType;