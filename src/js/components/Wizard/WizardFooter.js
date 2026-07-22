import React from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { MessageContext } from '../../contexts/MessageContext';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// WizardFooter renders navigation buttons. Pass `children` to fully
// replace the default set.
export const WizardFooter = ({ children, ...rest }) => {
  const { theme, passThemeFlag } = useThemeValue();
  const { format } = React.useContext(MessageContext);
  const {
    currentStepObj,
    currentStepIndex,
    totalSteps,
    canGoNext,
    next,
    previous,
    skip,
    complete,
    cancel,
    hasCancelHandler,
    messages,
  } = useWizard();

  if (!currentStepObj) return null;

  const isFirstStep = currentStepIndex <= 0;
  const isLastStep = currentStepIndex >= totalSteps - 1;
  const canGoPrevious = !isFirstStep;

  const footerTheme = theme.wizard?.footer;

  const label = (id, override) => override || format({ id: `wizard.${id}` });

  const NextIcon = footerTheme?.button?.next?.icon;
  const PreviousIcon = footerTheme?.button?.previous?.icon;
  const SkipIcon = footerTheme?.button?.skip?.icon;
  const CompleteIcon = footerTheme?.button?.complete?.icon;
  const CancelIcon = footerTheme?.button?.cancel?.icon;

  // Array (not Fragment) so Box gap injection sees each child.
  const defaultButtons = [
    hasCancelHandler && (
      <Button
        key="cancel"
        label={label('cancel', messages?.cancel)}
        plain
        icon={CancelIcon ? <CancelIcon aria-hidden="true" /> : undefined}
        onClick={cancel}
      />
    ),
    !isFirstStep && (
      <Button
        key="previous"
        label={label('previous', messages?.previous)}
        secondary
        icon={PreviousIcon ? <PreviousIcon aria-hidden="true" /> : undefined}
        disabled={!canGoPrevious}
        onClick={previous}
      />
    ),
    currentStepObj.skippable && !isLastStep && (
      <Button
        key="skip"
        label={label('skip', messages?.skip)}
        secondary
        icon={SkipIcon ? <SkipIcon aria-hidden="true" /> : undefined}
        reverse
        onClick={skip}
      />
    ),
    isLastStep ? (
      <Button
        key="complete"
        label={label('complete', messages?.complete)}
        icon={CompleteIcon ? <CompleteIcon aria-hidden="true" /> : undefined}
        primary
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
