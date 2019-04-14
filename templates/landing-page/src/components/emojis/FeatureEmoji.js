import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getEmoji } from './utils';

const StyledFlip = styled.span`
  -moz-transform: scale(-1, 1);
  -webkit-transform: scale(-1, 1);
  -o-transform: scale(-1, 1);
  -ms-transform: scale(-1, 1);
  transform: scale(-1, 1);
`;

const FeatureEmoji = ({ name, flip }) => {
  return flip ? (
    <StyledFlip style={{ fontSize: '128px' }}>{getEmoji(name)}</StyledFlip>
  ) : (
    <span style={{ fontSize: '128px' }}>{getEmoji(name)}</span>
  );
};

FeatureEmoji.defaultProps = {
  flip: false,
};

FeatureEmoji.propTypes = {
  flip: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

export { FeatureEmoji };
