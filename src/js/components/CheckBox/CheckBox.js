import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import StyledCheckBox, {
  StyledCheckBoxContainer,
  StyledCheckBoxInput,
  StyledCheckBoxBox,
  StyledCheckBoxToggle,
  StyledCheckBoxKnob,
} from './StyledCheckBox';
import doc from './doc';

class CheckBox extends Component {
  static contextTypes = {
    grommet: PropTypes.object.isRequired,
  }

  render() {
    const {
      checked, disabled, id, label, name, onChange, reverse, theme, toggle,
      ...rest
    } = this.props;
    const { grommet } = this.context;

    const normalizedLabel = (typeof label === 'string' ? <div>{label}</div> : label);

    let hidden;
    if (disabled && checked) {
      hidden = <input name={name} type='hidden' value='true' />;
    }

    const control = (toggle ? (
      <StyledCheckBoxToggle theme={theme} grommet={grommet}>
        <StyledCheckBoxKnob theme={theme} grommet={grommet} />
      </StyledCheckBoxToggle>
    ) : (
      <StyledCheckBoxBox theme={theme} grommet={grommet}>
        <svg viewBox='0 0 24 24' preserveAspectRatio='xMidYMid meet'>
          <path fill='none' d='M6,11.3 L10.3,16 L18,6.2' />
        </svg>
      </StyledCheckBoxBox>
    ));

    return (
      <StyledCheckBoxContainer
        htmlFor={id}
        reverse={reverse}
        theme={theme}
        grommet={grommet}
      >
        <StyledCheckBox theme={theme}>
          <StyledCheckBoxInput
            {...rest}
            tabIndex='0'
            id={id}
            name={name}
            type='checkbox'
            disabled={disabled}
            checked={checked}
            onChange={onChange}
            theme={theme}
            grommet={grommet}
          />
          {control}
        </StyledCheckBox>
        {normalizedLabel}
        {hidden}
      </StyledCheckBoxContainer>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(CheckBox);
}

export default compose(
  withTheme,
)(CheckBox);
