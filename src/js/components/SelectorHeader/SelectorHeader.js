import React, { forwardRef, useContext } from 'react';
// import { ThemeContext } from 'styled-components';

import { Box } from '../Box';
import { useForwardedRef } from '../../utils';
import { SelectorPropTypes } from './propTypes';
import { CheckBox } from '../CheckBox';
import { RadioButton } from '../RadioButton';
import { SelectorGroupContext } from '../SelectorGroup/SelectorGroup';
import { SelectorTitle } from '../SelectorTitle';

// TO DO should title prop be here instead of "Selector"? This means
// you always have to compose with SelectorHeader, although maybe that
// is fine since padding might live on the SelectorHeader
const SelectorHeader = forwardRef(({ children, title, ...rest }, ref) => {
  // const theme = useContext(ThemeContext);
  const { multiple } = useContext(SelectorGroupContext);

  const componentRef = useForwardedRef(ref);

  return (
    <Box
      align="start"
      cssGap
      direction="row"
      gap="xsmall"
      pad="small"
      ref={componentRef}
      {...rest}
    >
      <Box flex>
        {title ? <SelectorTitle>{title}</SelectorTitle> : children}
      </Box>
      {/* TO DO build in selection indicator? or expose as subcomponent 
      people can compose with? */}
      {multiple ? (
        <CheckBox pad="none" tabIndex={-1} />
      ) : (
        // TO DO how to overcome pad from extend in HPE theme?
        <RadioButton pad="none" tabIndex={-1} />
      )}
    </Box>
  );
});

SelectorHeader.displayName = 'SelectorHeader';
SelectorHeader.propTypes = SelectorPropTypes;

export { SelectorHeader };
