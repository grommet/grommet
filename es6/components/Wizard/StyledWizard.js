import styled from 'styled-components';
import { styledComponentsConfig } from '../../utils';

// Kept as a styled component so consumers can theme the wizard root via
// `theme.wizard.container.extend`. Grommet Box does not expose a
// per-instance `extend` prop, so this escape hatch requires styled CSS.
export var StyledWizard = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledWizard",
  componentId: "sc-1o4qqu4-0"
})(["display:flex;flex-direction:column;flex:1 1 auto;width:100%;height:100%;min-height:0;", ""], function (props) {
  var _props$theme$wizard;
  return (_props$theme$wizard = props.theme.wizard) == null || (_props$theme$wizard = _props$theme$wizard.container) == null ? void 0 : _props$theme$wizard.extend;
});

// Programmatic focus target for step transitions (tabIndex={-1}); no visible
// focus indication — screen readers announce via aria-live on this element.
export var StyledWizardFocusAnchor = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledWizard__StyledWizardFocusAnchor",
  componentId: "sc-1o4qqu4-1"
})(["outline:none;"]);