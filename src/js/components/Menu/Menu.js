import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { compose } from 'recompose';

import { FormDown } from 'grommet-icons';

import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Drop } from '../Drop';

import { withTheme } from '../hocs';

import doc from './doc';

class Menu extends Component {
  static contextTypes = {
    grommet: PropTypes.object,
    theme: PropTypes.object,
    router: PropTypes.any,
  }

  static defaultProps = {
    dropAlign: { top: 'top', left: 'left' },
  };

  state = {
    activeItemIndex: -1,
    showDrop: false,
  }

  buttonRefs = {}

  onDropClose() {
    this.setState({
      activeItemIndex: -1,
      showDrop: false,
    });
  }

  onSelectMenuItem() {
    const { activeItemIndex } = this.state;
    findDOMNode(this.buttonRefs[activeItemIndex]).click();
  }

  onNextMenuItem() {
    const { showDrop, activeItemIndex } = this.state;
    if (!showDrop) {
      this.setState({
        showDrop: true,
        activeItemIndex: -1,
      });
    } else {
      const { items } = this.props;
      const index = Math.min(activeItemIndex + 1, items.length - 1);
      this.setState({ activeItemIndex: index });
      // this.setState({ activeSuggestionIndex: index },
      //   this._announceSuggestion.bind(this, index));
    }
  }

  onPreviousMenuItem() {
    const { showDrop, activeItemIndex } = this.state;
    if (!showDrop) {
      this.setState({
        showDrop: true,
        activeItemIndex: -1,
      });
    } else {
      const { items } = this.props;
      const index = (activeItemIndex === -1 ? (items.length - 1) :
        Math.max(activeItemIndex - 1, 0));
      this.setState({ activeItemIndex: index });
      // this.setState({ activeSuggestionIndex: index },
      //   this._announceSuggestion.bind(this, index));
    }
  }

  render() {
    const {
      background,
      dropAlign,
      icon,
      items,
      label,
      messages = {},
      onKeyDown,
      theme,
      ...rest
    } = this.props;
    const { activeItemIndex, showDrop } = this.state;

    const menuIcon = icon || <FormDown />;

    const controlMirror = (
      <Button
        justify={dropAlign.right ? 'end' : 'start'}
        fill={true}
        a11yTitle={messages.closeMenu || 'Close Menu'}
        box={true}
        reverse={true}
        icon={menuIcon}
        label={label}
        direction='row'
        pad='small'
        onClick={() => this.onDropClose()}
      />
    );

    let drop;
    if (showDrop) {
      drop = (
        <Drop
          align={dropAlign}
          background={background}
          ref={(ref) => {
            this.dropRef = ref;
          }}
          context={{ ...this.context }}
          control={this.componentRef}
          onClose={() => this.onDropClose()}
        >
          {dropAlign.top === 'top' ? controlMirror : undefined}
          {items.map(
            (item, index) => (
              <Button
                ref={(ref) => {
                  this.buttonRefs[index] = ref;
                }}
                active={activeItemIndex === index}
                box={true}
                pad='small'
                key={`menuItem_${index}`}
                fill={true}
                align='start'
                hoverIndicator='background'
                {...item}
                onClick={item.onClick ? (...args) => {
                  item.onClick(...args);
                  if (item.close !== false) {
                    this.onDropClose();
                  }
                } : undefined}
              />
            )
          )}
          {dropAlign.bottom === 'bottom' ? controlMirror : undefined }
        </Drop>
      );
    }

    const clickHandler = (event) => {
      if (activeItemIndex >= 0) {
        event.preventDefault();
        event.stopPropagation();
        this.onSelectMenuItem();
      }
    };

    return (
      <Keyboard
        onEnter={clickHandler}
        onSpace={clickHandler}
        onDown={(event) => {
          event.preventDefault();
          this.onNextMenuItem();
        }}
        onUp={(event) => {
          event.preventDefault();
          this.onPreviousMenuItem();
        }}
        onEsc={() => this.onDropClose()}
        onTab={() => this.onDropClose()}
        onKeyDown={onKeyDown}
      >
        <div>
          <Button
            ref={(ref) => {
              this.componentRef = ref;
            }}
            a11yTitle={messages.openMenu || 'Open Menu'}
            align='start'
            box={true}
            reverse={true}
            icon={menuIcon}
            label={label}
            onClick={() => this.setState({ activeItemIndex: -1, showDrop: !this.state.showDrop })}
            direction='row'
            pad='small'
            {...rest}
          />
          {drop}
        </div>
      </Keyboard>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Menu);
}

export default compose(
  withTheme,
)(Menu);
