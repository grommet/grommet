import styled, { css } from 'styled-components';
import { genericStyles } from '../../utils';

import { defaultProps } from '../../default-props';

const sizeStyle = props => {
  const data = props.theme.calendar[props.sizeProp];
  return css`
    font-size: ${data.fontSize};
    line-height: ${data.lineHeight};
    width: ${props.theme.global.size[props.sizeProp]};
  `;
};

const StyledCard = styled.div`
  ${genericStyles}
  ${props => sizeStyle(props)}
  ${props => props.theme.card && props.theme.card.extend}
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  border: solid 1px #f2f2f2;
  padding-bottom: 15px;
  border-radius: 4px;
  margin: 15px;
`;

const StyledImage = styled.figure`
  width: 100%;
  height: auto;
  margin: 0;
  border-radius: 4px;
`;

const StyledBody = styled.div`
  width: auto;
  height: auto;
  padding: 3px 15px 0 15px;
`;

const StyledTitle = styled.h3`
  width: 100%;
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 8px;
  text-align: left;
  margin: 0 0 8px 0;
`;

StyledCard.defaultProps = {};
Object.setPrototypeOf(StyledCard.defaultProps, defaultProps);

export { StyledCard, StyledImage, StyledBody, StyledTitle };
