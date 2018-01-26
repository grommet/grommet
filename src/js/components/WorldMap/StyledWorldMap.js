import styled from 'styled-components';

const StyledWorldMap = styled.svg`
  width: 100%;

  // IE11 fix world map height
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    // The padding value below comes from svg height / width
    padding-bottom: 49%; // 460 / 940 = .489361702 rounding off to 49
    height: 1px;
  }
`;

export default StyledWorldMap.extend`
  ${props => props.theme.diagram && props.theme.diagram.extend}
`;
