import React from 'react';
import Emoji, { EmojioneV4 } from 'react-emoji-render';
import styled from 'styled-components';

const StyledEmoji = styled(Emoji)`
  span {
    margin: 0px !important;
  }
`;

export const isAppleProduct = () => {
  // eslint-disable-next-line no-undef
  return navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i);
};

export const getEmoji = name => {
  return isAppleProduct() ? (
    <StyledEmoji text={name} />
  ) : (
    <EmojioneV4 size={128} text={name} />
  );
};

