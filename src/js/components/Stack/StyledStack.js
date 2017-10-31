import styled from 'styled-components';

const StyledStack = styled.div`
  position: relative;
  display: flex;
`;

export default StyledStack.extend`
  ${props => props.theme.stack && props.theme.stack.extend}
`;
