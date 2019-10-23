import React from 'react';

import { Box } from '../Box';
import { Button } from '../Button';
import { withForwardRef } from '../hocs';

function areEqual(prevProps, nextProps) {
  const { active, disabled, option, selected } = prevProps;
  const {
    active: nextActive,
    disabled: nextDisabled,
    option: nextOption,
    selected: nextSelected,
  } = nextProps;
  return (
    active === nextActive &&
    selected === nextSelected &&
    disabled === nextDisabled &&
    option === nextOption
  );
}

const SelectOption = React.memo(({ forwardRef, ...rest }) => {
  return (
    <Box flex={false}>
      <Button
        tabIndex="-1"
        ref={forwardRef}
        role="menuitem"
        hoverIndicator="background"
        {...rest}
      />
    </Box>
  );
}, areEqual);

const SelectOptionWrapper = withForwardRef(SelectOption);

export { SelectOptionWrapper as SelectOption };
