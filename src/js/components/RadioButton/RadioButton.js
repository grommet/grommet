import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import StyledRadioButton,
  { StyledRadioButtonContainer, StyledRadioButtonInput,
    StyledRadioButtonButton } from './StyledRadioButton';

import { withTheme } from '../hocs';

import doc from './doc';

class RadioButton extends Component {
  static contextTypes = {
    grommet: PropTypes.object.isRequired,
  }

  render() {
    const { checked, disabled, id, label, name, onChange, theme, ...rest } = this.props;
    const { grommet } = this.context;

    const normalizedLabel = (typeof label === 'string' ? <div>{label}</div> : label);

    return (
      <StyledRadioButtonContainer
        htmlFor={id}
        theme={theme}
        grommet={grommet}
      >
        <StyledRadioButton theme={theme}>
          <StyledRadioButtonInput
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
          <StyledRadioButtonButton theme={theme} grommet={grommet}>
            <svg viewBox='0 0 24 24' preserveAspectRatio='xMidYMid meet'>
              <circle cx={12} cy={12} r={6} />
            </svg>
          </StyledRadioButtonButton>
        </StyledRadioButton>
        {normalizedLabel}
      </StyledRadioButtonContainer>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(RadioButton);
}

export default compose(
  withTheme,
)(RadioButton);
