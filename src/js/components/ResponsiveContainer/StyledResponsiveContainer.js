import styled from 'styled-components';
import { styledComponentsConfig } from '../../utils/styles';

export const StyledResponsiveContainer = styled.div.withConfig(
  styledComponentsConfig,
)`
  container-type: inline-size;
`;
