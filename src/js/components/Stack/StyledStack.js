import styled from 'styled-components';

const fillStyle = `
  width: 100%;
  height: 100%;
  max-width: none;
  flex-grow: 1;
  display: flex;
`;

const StyledStack = styled.div`
  position: relative;
  ${props => props.fillContainer && fillStyle}
`;

export default StyledStack.extend`
  ${props => props.theme.stack && props.theme.stack.extend}
`;
