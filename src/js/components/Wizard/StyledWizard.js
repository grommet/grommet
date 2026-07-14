import styled from 'styled-components';
import { focusStyle, styledComponentsConfig } from '../../utils';

// Root wizard container. Flex column so header, middle, and footer
// stack; `height: 100%` fills a bounded block parent, while
// `flex: 1 1 auto` + `min-height: 0` let it shrink to fit a flex
// parent's remaining space (e.g. next to a sibling toolbar) so the
// internal scroll region can engage. If the parent has no bounded
// height, `height: 100%` resolves to auto and long content just
// grows the wizard instead of scrolling.
export const StyledWizard = styled.div.withConfig(styledComponentsConfig)`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  min-height: 0;

  ${(props) => props.theme.wizard?.container?.extend}
`;

// Middle region between the sticky header and footer. Establishes a
// bounded height (via `flex: 1 1 auto` + `min-height: 0`) so descendants
// can compute their own scroll boundaries. It does not scroll itself —
// scrolling happens inside `<WizardContent>` so the stepper and step
// title remain visible above the scrolling content.
export const StyledWizardMiddle = styled.div.withConfig(styledComponentsConfig)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
`;

// Centered content column inside the scroll region. Carries the
// `kind`-driven max-width so only the middle content is constrained;
// header and footer remain full-width. `maxWidth` may be a Grommet
// size token (e.g. 'large', 'xlarge') or a CSS length; unknown values
// fall through as-is.
export const StyledWizardCenter = styled.div.withConfig(styledComponentsConfig)`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  ${(props) => {
    if (!props.maxWidth) return '';
    const resolved =
      props.theme?.global?.size?.[props.maxWidth] || props.maxWidth;
    return `
      max-width: ${resolved};
      margin-left: auto;
      margin-right: auto;
    `;
  }}
`;

// Body region holds either [Progress | Content] side-by-side (vertical
// direction) or Content only (horizontal direction has Progress in a header).
export const StyledWizardBody = styled.div.withConfig(styledComponentsConfig)`
  display: flex;
  flex-direction: ${(props) =>
    props.direction === 'vertical' ? 'row' : 'column'};
  flex: 1 1 auto;
  min-height: 0;
`;

// Content column holds StepHeader + Content + Footer. `min-height: 0`
// is required so <WizardContent> below can shrink and clip its own
// overflow instead of pushing the whole column past its parent.
export const StyledWizardContentColumn = styled.div.withConfig(
  styledComponentsConfig,
)`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
`;

// Focus anchor for step transitions. Not visible until it receives
// keyboard focus, at which point the theme focus ring shows.
export const StyledWizardFocusAnchor = styled.div.withConfig(
  styledComponentsConfig,
)`
  outline: none;

  &:focus {
    ${focusStyle({ justBorder: true })}
  }
`;
