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
    return (
      <Box flex={false}>
        <Button role="menuitem" hoverIndicator="background" {...this.props} />
      </Box>
    );
  }
}

const SelectOptionWrapper = withForwardRef(SelectOption);

export { SelectOptionWrapper as SelectOption };
