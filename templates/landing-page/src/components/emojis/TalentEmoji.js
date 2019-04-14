import React from 'react';
import PropTypes from 'prop-types';

import { getEmoji } from './utils';

export const TalentEmoji = ({ name, ...rest }) => (
  <span
    role="img"
    aria-label={name}
    {...rest}
    style={{
      margin: '0px !important',
      display: 'inline!important',
      width: '30px',
      height: '50px',
      fontSize: '135px', // supports sizes of emojis on different OS
    }}
  >
    {getEmoji(name)}
  </span>
);

TalentEmoji.propTypes = {
  name: PropTypes.string.isRequired,
};
