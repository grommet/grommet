import styled from 'styled-components';

const StyledStack = styled.div`
  position: relative;
`;

export default StyledStack.extend`
  ${props => props.theme.stack && props.theme.stack.extend}
`;
