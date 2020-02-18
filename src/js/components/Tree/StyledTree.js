import styled, { css } from 'styled-components';

import { defaultProps } from '../../default-props';

const StyledIcon = styled.i`
  ${props => {
    return css`
      margin-right: 10px;
      font-size: 30px;
      transition: all 0.3s ease;
      ${props.opened && 'transform: rotate(90deg);'}
    `;
  }}
`;

const StyledNodeHeader = styled.div`
  flex-direction: row;
  display: flex;
  margin: 10px 0;
  cursor: pointer;
`;

const StyledNode = styled.div`
  ${props => {
    return css`
      display: flex;
      flex-direction: column;
      align-items: baseline;
      margin-left: ${(props.positions.length - 1) * 20}px;
      transition: all 0.3s ease;
      padding: 15px;
      ${props.opened && 'transform: rotate(90deg);'}

      &:hover {
        background: #f2f2f2;
      }
    `;
  }}
`;

const StyledName = styled.h3`
  margin: 0;
  font-weight: 100;
  font-size: 20px;
`;

const StyledChilds = styled.div`
  ${props => {
    return css`
      width: 100%;
      overflow: hidden;
      ${props.opened ? 'height: auto' : 'height: 0'};
    `;
  }}
`;

const StyledTree = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
`;

StyledTree.defaultProps = {};
Object.setPrototypeOf(StyledTree.defaultProps, defaultProps);

export {
  StyledTree,
  StyledNode,
  StyledName,
  StyledNodeHeader,
  StyledIcon,
  StyledChilds,
};
