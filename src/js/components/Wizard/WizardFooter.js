import React from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// WizardFooter renders navigation buttons. Labels come from MessageContext
// (with optional message override). Primary action changes on the last step
// (Complete) vs intermediate steps (Next). Icons come from theme.wizard.icons.
export const WizardFooter = () => {
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

  return (
    <Box
      background={footerTheme?.background}
      border={footerTheme?.border}
      pad={footerTheme?.pad}
      gap={footerTheme?.gap}
      height={footerTheme?.height}
      direction="row"
      justify={footerTheme?.justify}
      align="center"
      flex={false}
      {...passThemeFlag}
    >
      <Box direction="row" gap={footerTheme?.gap} align="center">
        <Button
          label={label('cancel', messages?.cancel)}
          kind={footerTheme?.button?.cancel?.kind}
          plain={footerTheme?.button?.cancel?.plain}
          icon={CancelIcon ? <CancelIcon /> : undefined}
          onClick={cancel}
        />
      </Box>
      <Box direction="row" gap={footerTheme?.gap} align="center">
        {currentStepObj.skippable && !isLastStep && (
          <Button
            label={label('skip', messages?.skip)}
            kind={footerTheme?.button?.skip?.kind}
            icon={SkipIcon ? <SkipIcon /> : undefined}
            onClick={skip}
          />
        )}
        {!isFirstStep && (
          <Button
            label={label('previous', messages?.previous)}
            kind={footerTheme?.button?.previous?.kind}
            icon={PreviousIcon ? <PreviousIcon /> : undefined}
            disabled={!canGoPrevious}
            onClick={previous}
          />
        )}
        {isLastStep ? (
          <Button
            label={label('complete', messages?.complete)}
            primary
            icon={CompleteIcon ? <CompleteIcon /> : undefined}
            disabled={!canGoNext}
            onClick={complete}
          />
        ) : (
          <Button
            label={label('next', messages?.next)}
            primary
            icon={NextIcon ? <NextIcon /> : undefined}
            disabled={!canGoNext}
            onClick={next}
          />
        )}
      </Box>
    </Box>
  );
};

WizardFooter.displayName = 'WizardFooter';
