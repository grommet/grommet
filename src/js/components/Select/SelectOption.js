import React, { Component } from 'react';

import { Box } from '../Box';
import { Button } from '../Button';
import { withForwardRef } from '../hocs';

class SelectOption extends Component {
  shouldComponentUpdate(nextProps) {
    const { active, disabled, option, selected } = this.props;
    const {
      active: nextActive,
      disabled: nextDisabled,
      option: nextOption,
      selected: nextSelected,
    } = nextProps;
    return (
      active !== nextActive ||
      disabled !== nextDisabled ||
      selected !== nextSelected ||
      option !== nextOption
    );
  }

  render() {
    const { forwardRef, ...rest } = this.props;
    return (
      <Box flex={false}>
        <Button
          ref={forwardRef}
          role="menuitem"
          hoverIndicator="background"
          {...rest}
        />
      </Box>
    );
  }
}

const SelectOptionWrapper = withForwardRef(SelectOption);

export { SelectOptionWrapper as SelectOption };
