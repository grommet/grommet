import React, { Component } from 'react';

import { Box } from '../Box';
import { Button } from '../Button';
import { withForwardRef } from '../hocs';

class SelectOption extends Component {
  shouldComponentUpdate(nextProps) {
    const { active } = this.props;
    const { active: nextActive } = nextProps;
    return active !== nextActive;
  }

  render() {
    const { forwardRef, value, ...rest } = this.props;
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
