import React, { useContext } from 'react';
import { CheckBox } from '../CheckBox';
import { RadioButton } from '../RadioButton';
import { SelectorGroupContext } from '../SelectorGroup/SelctorGroup';

// what if you use this outside of selector? TODO

const SelectorIndicator = () => {
  const { multiple } = useContext(SelectorGroupContext);

  return (
    <>
      {/* TO DO ability to hide when not selected */}
      {multiple ? (
        <CheckBox pad="none" tabIndex={-1} />
      ) : (
        // TO DO how to overcome pad from extend in single selection?
        <RadioButton pad="none" tabIndex={-1} />
      )}
    </>
  );
};

SelectorIndicator.displayName = 'SelectorIndicator';
// SelectorIndicator.propTypes = SelectorIndicatorPropTypes;

export { SelectorIndicator };
