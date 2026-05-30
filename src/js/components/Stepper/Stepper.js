import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ThemeContext } from 'styled-components';
import { normalizeColor } from '../../utils';
import { StepperContext } from './StepperContext';
import { StepperStep } from './StepperStep';
import { StyledStepper } from './StyledStepper';
import { useThemeValue } from '../../utils/useThemeValue';
import { StepperPropTypes } from './propTypes';

const flattenSteps = (steps) => {
  const flat = [];
  steps.forEach((step, parentIdx) => {
    const hasChildren = step.children && step.children.length > 0;
    const isLastParent = parentIdx === steps.length - 1;
    flat.push({
      ...step,
      isSubStep: false,
      showConnector: !isLastParent,
    });
    if (hasChildren) {
      step.children.forEach((child) => {
        flat.push({
          ...child,
          isSubStep: true,
          showConnector: false,
        });
      });
    }
  });
  return flat;
};

const Stepper = forwardRef(
  (
    {
      steps = [],
      currentStep,
      direction = 'horizontal',
      clickableSteps = true,
      onStepClick,
      'aria-label': ariaLabel,
      children,
      id,
      ...rest
    },
    ref,
  ) => {
    const { theme } = useThemeValue();
    const stepRefs = useRef(new Map());
    const flatSteps = useMemo(() => flattenSteps(steps), [steps]);
    const stepsRef = useRef(flatSteps);
    stepsRef.current = flatSteps;

    // Force vertical if steps have children
    // (horizontal substeps not supported)
    const hasSubSteps = steps.some(
      (step) => step.children && step.children.length > 0,
    );
    const effectiveDirection =
      hasSubSteps && direction === 'horizontal' ? 'vertical' : direction;

    // Warn in dev about invalid state
    if (process.env.NODE_ENV !== 'production') {
      if (hasSubSteps && direction === 'horizontal') {
        console.warn(
          'Stepper: horizontal direction with sub-steps is not supported. ' +
            'Falling back to vertical.',
        );
      }
      if (currentStep) {
        const currentStepObj = flatSteps.find((s) => s.id === currentStep);
        if (!currentStepObj) {
          console.warn(
            'Stepper: currentStep "' +
              `${currentStep}" does not match any ` +
              'step id. Falling back to the ' +
              'first non-disabled step.',
          );
        } else if (currentStepObj.status === 'disabled') {
          console.warn(
            `Stepper: currentStep "${currentStep}" matches a disabled step. ` +
              `This is an invalid state. The step will render as disabled.`,
          );
        }
      }
    }

    // Determine effective current step (fallback to first non-disabled)
    const effectiveCurrentStep = useMemo(() => {
      const match = flatSteps.find((s) => s.id === currentStep);
      if (match && match.status !== 'disabled') return currentStep;
      const fallback = flatSteps.find((s) => s.status !== 'disabled');
      return fallback ? fallback.id : flatSteps[0]?.id || '';
    }, [currentStep, flatSteps]);

    // Roving tabindex state
    const currentIndex = flatSteps.findIndex(
      (s) => s.id === effectiveCurrentStep,
    );
    const [focusedIndex, setFocusedIndex] = useState(
      currentIndex >= 0 ? currentIndex : 0,
    );

    const stepIndex = useCallback(
      (stepId) => flatSteps.findIndex((s) => s.id === stepId),
      [flatSteps],
    );

    const isPriorStep = useCallback(
      (stepId) => {
        const idx = stepIndex(stepId);
        const curIdx = stepIndex(effectiveCurrentStep);
        return idx < curIdx;
      },
      [stepIndex, effectiveCurrentStep],
    );

    const isAfterStep = useCallback(
      (stepId) => {
        const idx = stepIndex(stepId);
        const curIdx = stepIndex(effectiveCurrentStep);
        return idx > curIdx;
      },
      [stepIndex, effectiveCurrentStep],
    );

    const isCurrentStep = useCallback(
      (stepId) => stepId === effectiveCurrentStep,
      [effectiveCurrentStep],
    );

    const canNavigateTo = useCallback(
      (stepId) => {
        const step = flatSteps.find((s) => s.id === stepId);
        return clickableSteps && step && step.status !== 'disabled';
      },
      [flatSteps, clickableSteps],
    );

    const contextValue = useMemo(
      () => ({
        currentStep: effectiveCurrentStep,
        steps: flatSteps,
        direction: effectiveDirection,
        clickableSteps,
        onStepClick,
        stepIndex,
        isPriorStep,
        isAfterStep,
        isCurrentStep,
        canNavigateTo,
      }),
      [
        effectiveCurrentStep,
        flatSteps,
        effectiveDirection,
        clickableSteps,
        onStepClick,
        stepIndex,
        isPriorStep,
        isAfterStep,
        isCurrentStep,
        canNavigateTo,
      ],
    );

    const handleKeyDown = useCallback(
      (e, index) => {
        let nextIndex;
        const isHorizontal = effectiveDirection === 'horizontal';

        switch (e.key) {
          case 'ArrowRight':
            if (isHorizontal) {
              e.preventDefault();
              nextIndex = (index + 1) % flatSteps.length;
            }
            break;
          case 'ArrowLeft':
            if (isHorizontal) {
              e.preventDefault();
              nextIndex = (index - 1 + flatSteps.length) % flatSteps.length;
            }
            break;
          case 'ArrowDown':
            if (!isHorizontal) {
              e.preventDefault();
              nextIndex = (index + 1) % flatSteps.length;
            }
            break;
          case 'ArrowUp':
            if (!isHorizontal) {
              e.preventDefault();
              nextIndex = (index - 1 + flatSteps.length) % flatSteps.length;
            }
            break;
          case 'Home':
            e.preventDefault();
            nextIndex = 0;
            break;
          case 'End':
            e.preventDefault();
            nextIndex = flatSteps.length - 1;
            break;
          default:
            break;
        }

        if (nextIndex !== undefined) {
          setFocusedIndex(nextIndex);
          // Focus the button at the next index via refs
          const nextButton = stepRefs.current.get(nextIndex);
          if (nextButton) {
            nextButton.focus();
          }
        }
      },
      [effectiveDirection, flatSteps.length],
    );

    const renderDefaultSteps = () => {
      let flatIndex = 0;
      const elements = [];
      steps.forEach((step, parentIdx) => {
        const parentFlatIndex = flatIndex;
        flatIndex += 1;
        const childElements = step.children
          ? step.children.map((child) => {
              const childFlatIndex = flatIndex;
              flatIndex += 1;
              return (
                <StepperStep
                  key={child.id}
                  step={child}
                  stepNumber={childFlatIndex + 1}
                  isLast={false}
                  showConnector={false}
                  direction={effectiveDirection}
                  focusedIndex={focusedIndex}
                  index={childFlatIndex}
                  isSubStep
                  onKeyDown={handleKeyDown}
                  stepsRef={stepsRef}
                  stepRefs={stepRefs}
                />
              );
            })
          : null;
        const isLastParent = parentIdx === steps.length - 1;
        elements.push(
          <StepperStep
            key={step.id}
            step={step}
            stepNumber={parentFlatIndex + 1}
            isLast={isLastParent}
            showConnector={
              effectiveDirection === 'horizontal'
                ? false
                : !isLastParent || !!childElements
            }
            direction={effectiveDirection}
            focusedIndex={focusedIndex}
            index={parentFlatIndex}
            isSubStep={false}
            onKeyDown={handleKeyDown}
            stepsRef={stepsRef}
            stepRefs={stepRefs}
          />,
        );
        if (effectiveDirection === 'horizontal' && !isLastParent) {
          elements.push(
            <li
              key={`${step.id}-connector`}
              aria-hidden="true"
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                position: 'relative',
                minWidth: '16px',
                overflow: 'visible',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: 'calc(-50% + 16px)',
                  right: 'calc(-50% + 16px)',
                  height: '2px',
                  background: normalizeColor('border', theme),
                }}
              />
              {childElements && (
                <span
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '8px',
                    paddingTop: '24px',
                    maxWidth: '100%',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  {childElements}
                </span>
              )}
            </li>,
          );
        }
        if (
          effectiveDirection === 'vertical' &&
          (!isLastParent || childElements)
        ) {
          const connectorColor = (() => {
            switch (step.status) {
              case 'completed':
                return normalizeColor('brand', theme);
              case 'error':
                return normalizeColor('status-error', theme);
              default:
                return normalizeColor('border', theme);
            }
          })();
          elements.push(
            <li
              key={`${step.id}-connector`}
              aria-hidden="true"
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                minHeight: '16px',
                overflow: 'visible',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: '15px',
                  top: '0',
                  bottom: '0',
                  width: '2px',
                  background: connectorColor,
                  borderRadius: '4px',
                }}
              />
              {childElements && (
                <ol
                  style={{
                    listStyle: 'none',
                    padding: '0 0 0 36px',
                    margin: 0,
                  }}
                >
                  {childElements}
                </ol>
              )}
            </li>,
          );
        }
      });
      return elements;
    };

    return (
      <StepperContext.Provider value={contextValue}>
        <ThemeContext.Consumer>
          {() => (
            <StyledStepper
              ref={ref}
              aria-label={ariaLabel || 'Progress'}
              direction={effectiveDirection}
              id={id}
              theme={theme}
              {...rest}
            >
              {children || renderDefaultSteps()}
            </StyledStepper>
          )}
        </ThemeContext.Consumer>
      </StepperContext.Provider>
    );
  },
);

Stepper.displayName = 'Stepper';
Stepper.propTypes = StepperPropTypes;

export { Stepper };
