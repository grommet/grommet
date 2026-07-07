import React, {
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import { normalizeColor } from '../../utils';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';

import { Keyboard } from '../Keyboard';

import { StepperContext } from './StepperContext';
import { StepperStep } from './StepperStep';
import { StyledStepper } from './StyledStepper';
import { StepperPropTypes } from './propTypes';

// Flattens steps with parent/child relationships into a linear list
// for keyboard navigation and index-based tracking.
const flattenSteps = (steps) => {
  const flat = [];
  steps.forEach((step, parentIdx) => {
    const hasChildren = step.children && step.children.length > 0;
    const isLastParent = parentIdx === steps.length - 1;
    flat.push({
      ...step,
      isSubStep: false,
      showConnector: !isLastParent,
      childIds: hasChildren ? step.children.map((c) => c.id) : [],
    });
    if (hasChildren) {
      step.children.forEach((child) => {
        flat.push({
          ...child,
          isSubStep: true,
          showConnector: false,
          parentId: step.id,
          childIds: [],
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
    const { format } = useContext(MessageContext);
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

    // Roving tabindex: only the focused step has tabIndex=0,
    // all others have tabIndex=-1. A ref keeps the index synchronous
    // for keyboard handlers that fire before React re-renders.
    const currentIndex = flatSteps.findIndex(
      (s) => s.id === effectiveCurrentStep,
    );
    const flatStepsLength = flatSteps.length;
    const [focusedIndex, setFocusedIndex] = useState(
      currentIndex >= 0 ? currentIndex : 0,
    );
    const focusedIndexRef = useRef(focusedIndex);

    const updateFocusedIndex = useCallback((idx) => {
      focusedIndexRef.current = idx;
      setFocusedIndex(idx);
    }, []);

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

    // Wraps around the step list to find the next step
    // in the given direction (+1 forward, -1 backward).
    const findNextEnabledIndex = useCallback(
      (startIndex, delta) =>
        (startIndex + delta + flatStepsLength) % flatStepsLength,
      [flatStepsLength],
    );

    const findFirstEnabledIndex = useCallback(() => 0, []);

    const findLastEnabledIndex = useCallback(
      () => flatStepsLength - 1,
      [flatStepsLength],
    );

    const moveFocus = useCallback(
      (nextIndex) => {
        if (nextIndex !== undefined && nextIndex !== focusedIndexRef.current) {
          updateFocusedIndex(nextIndex);
          const nextButton = stepRefs.current.get(nextIndex);
          if (nextButton) {
            nextButton.focus();
          }
        }
      },
      [updateFocusedIndex],
    );

    const onNext = useCallback(() => {
      moveFocus(findNextEnabledIndex(focusedIndexRef.current, 1));
    }, [findNextEnabledIndex, moveFocus]);

    const onPrevious = useCallback(() => {
      moveFocus(findNextEnabledIndex(focusedIndexRef.current, -1));
    }, [findNextEnabledIndex, moveFocus]);

    const handleKeyDown = useCallback(
      (event) => {
        const isHorizontal = effectiveDirection === 'horizontal';
        switch (event.key) {
          case 'ArrowRight':
            if (isHorizontal) {
              event.preventDefault();
              onNext();
            }
            break;
          case 'ArrowLeft':
            if (isHorizontal) {
              event.preventDefault();
              onPrevious();
            }
            break;
          case 'ArrowDown':
            if (!isHorizontal) {
              event.preventDefault();
              onNext();
            }
            break;
          case 'ArrowUp':
            if (!isHorizontal) {
              event.preventDefault();
              onPrevious();
            }
            break;
          case 'Home':
            event.preventDefault();
            moveFocus(findFirstEnabledIndex());
            break;
          case 'End':
            event.preventDefault();
            moveFocus(findLastEnabledIndex());
            break;
          default:
            break;
        }
      },
      [
        effectiveDirection,
        onNext,
        onPrevious,
        findFirstEnabledIndex,
        findLastEnabledIndex,
        moveFocus,
      ],
    );

    const renderDefaultSteps = () => {
      const indicatorSize =
        theme.stepper?.indicator?.size &&
        theme.global?.edgeSize?.[theme.stepper.indicator.size]
          ? theme.global.edgeSize[theme.stepper.indicator.size]
          : theme.global?.edgeSize?.medium || '24px';
      const buttonPad = theme.global?.edgeSize?.xxsmall || '4px';
      const connectorThickness =
        theme.stepper?.connector?.stroke?.width ||
        theme.global?.borderSize?.small ||
        '2px';
      const connectorRadius = theme.global?.edgeSize?.xsmall || '4px';
      const connectorOffset = `calc(${indicatorSize} / 2 + ${buttonPad})`;
      const childGap = theme.global?.edgeSize?.xsmall || '8px';
      const childPadTop = theme.global?.edgeSize?.medium || '24px';
      const childIndent = `calc(${indicatorSize} + ${
        theme.global?.edgeSize?.small || '12px'
      })`;
      const minConnectorInlineSize = theme.global?.edgeSize?.small || '12px';

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
                  onFocusStep={updateFocusedIndex}
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
            onFocusStep={updateFocusedIndex}
            stepsRef={stepsRef}
            stepRefs={stepRefs}
          />,
        );
        if (effectiveDirection === 'horizontal' && !isLastParent) {
          elements.push(
            <li
              key={`${step.id}-connector`}
              aria-hidden={childElements ? undefined : 'true'}
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                position: 'relative',
                minWidth: minConnectorInlineSize,
                overflow: 'visible',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: connectorOffset,
                  left: `calc(-50% + ${connectorOffset})`,
                  right: `calc(-50% + ${connectorOffset})`,
                  height: connectorThickness,
                  background: normalizeColor('border', theme),
                }}
              />
              {childElements && (
                <span
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: childGap,
                    paddingTop: childPadTop,
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
              aria-hidden={childElements ? undefined : 'true'}
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                position: 'relative',
                flex: 1,
                minHeight: minConnectorInlineSize,
                overflow: 'visible',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: `calc(${connectorOffset} - ${connectorThickness} / 2)`,
                  top: '0',
                  bottom: '0',
                  width: connectorThickness,
                  background: connectorColor,
                  borderRadius: connectorRadius,
                }}
              />
              {childElements && (
                <ol
                  style={{
                    listStyle: 'none',
                    padding: `0 0 0 ${childIndent}`,
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

    const stepperContent = (
      <StyledStepper
        ref={ref}
        aria-label={
          ariaLabel ||
          format({
            id: 'stepper.progress',
          })
        }
        direction={effectiveDirection}
        id={id}
        theme={theme}
        {...rest}
      >
        {children || renderDefaultSteps()}
      </StyledStepper>
    );

    return (
      <StepperContext.Provider value={contextValue}>
        {clickableSteps ? (
          <Keyboard onKeyDown={handleKeyDown}>{stepperContent}</Keyboard>
        ) : (
          stepperContent
        )}
      </StepperContext.Provider>
    );
  },
);

Stepper.displayName = 'Stepper';
Stepper.propTypes = StepperPropTypes;

export { Stepper };
