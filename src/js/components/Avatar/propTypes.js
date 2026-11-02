// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    size: PropTypes.oneOfType([
      PropTypes.oneOf([
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
      ]),
      PropTypes.string,
    ]),
    src: PropTypes.string,
    imageProps: PropTypes.object,
  };
}
export const AvatarPropTypes = PropType;
