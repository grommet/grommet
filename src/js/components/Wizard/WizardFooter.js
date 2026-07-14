import React from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { MessageContext } from '../../contexts/MessageContext';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// WizardFooter renders navigation buttons. Labels come from MessageContext
// (with optional message override). Primary action changes on the last step
// (Complete) vs intermediate steps (Next). Icons come from theme.wizard.icons.
// Passing `children` fully replaces the default button set; callers use
// `useWizard()` for navigation callbacks while keeping the themed shell.
export const WizardFooter = ({ children, ...rest }) => {
  const { theme, passThemeFlag } = useThemeValue();
  const { format } = React.useContext(MessageContext);
  const {
    currentStepObj,
    isFirstStep,
    isLastStep,
    canGoNext,
    canGoPrevious,
    next,
    previous,
    skip,
    complete,
    cancel,
    hasCancelHandler,
    messages,
  } = useWizard();

  if (!currentStepObj) return null;

  const footerTheme = theme.wizard?.footer;
  const iconTheme = theme.wizard?.icons;

  const label = (id, override) => override || format({ id: `wizard.${id}` });

  const NextIcon = iconTheme?.next;
  const PreviousIcon = iconTheme?.previous;
  const CompleteIcon = iconTheme?.complete;
  const CancelIcon = iconTheme?.cancel;
  const SkipIcon = iconTheme?.skip;

  // Array (not Fragment) so Box gap injection sees each button as a
  // separate child. Cancel is rendered only when `onCancel` was provided;
  // otherwise the header X button is the sole cancel affordance.
  const defaultButtons = [
    hasCancelHandler && (
      <Button
        key="cancel"
        label={label('cancel', messages?.cancel)}
        kind={footerTheme?.button?.cancel?.kind}
        plain={footerTheme?.button?.cancel?.plain}
        icon={CancelIcon ? <CancelIcon aria-hidden="true" /> : undefined}
        onClick={cancel}
      />
    ),
    !isFirstStep && (
      <Button
        key="previous"
        label={label('previous', messages?.previous)}
        kind={footerTheme?.button?.previous?.kind}
        icon={PreviousIcon ? <PreviousIcon aria-hidden="true" /> : undefined}
        disabled={!canGoPrevious}
        onClick={previous}
      />
    ),
    currentStepObj.skippable && !isLastStep && (
      <Button
        key="skip"
        label={label('skip', messages?.skip)}
        kind={footerTheme?.button?.skip?.kind}
        icon={SkipIcon ? <SkipIcon aria-hidden="true" /> : undefined}
        reverse
        onClick={skip}
      />
    ),
    isLastStep ? (
      <Button
        key="complete"
        label={label('complete', messages?.complete)}
        primary
        icon={CompleteIcon ? <CompleteIcon aria-hidden="true" /> : undefined}
        disabled={!canGoNext}
        onClick={complete}
      />
    ) : (
      <Button
        key="next"
        label={label('next', messages?.next)}
        primary
        icon={NextIcon ? <NextIcon aria-hidden="true" /> : undefined}
        reverse
        disabled={!canGoNext}
        onClick={next}
      />
    ),
  ];

  return (
    <ResponsiveContext.Consumer>
      {(size) => {
        const isSmall = size === 'small';
        const gapSize = footerTheme?.gap;
        const rowGap = isSmall
          ? theme.global?.edgeSize?.[gapSize] || gapSize
          : undefined;
        return (
          <Box
            background={footerTheme?.background}
            border={footerTheme?.border}
            pad={
              isSmall
                ? { horizontal: 'small', vertical: 'small' }
                : footerTheme?.pad
            }
            gap={gapSize}
            height={isSmall ? undefined : footerTheme?.height}
            direction="row"
            justify={footerTheme?.justify}
            align="center"
            wrap={isSmall}
            flex={false}
            style={rowGap ? { rowGap } : undefined}
            {...passThemeFlag}
            {...rest}
          >
            {children ?? defaultButtons}
          </Box>
        );
      }}
    </ResponsiveContext.Consumer>
  );
};

WizardFooter.displayName = 'WizardFooter';
