import styled from 'styled-components';

const StyledWorldMap = styled.svg`
  width: 100%;
`;

export default StyledWorldMap.extend`
  ${props => props.theme.diagram && props.theme.diagram.extend}
`;
