// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Drop from '../utils/Drop';
import { findAncestor } from '../utils/DOM';
import Intl from '../utils/Intl';
import { announce } from '../utils/Announcer';
import Button from './Button';

import SearchIcon from './icons/base/Search';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.SEARCH_INPUT;
const INPUT = CSSClassnames.INPUT;
const FORM_FIELD = CSSClassnames.FORM_FIELD;

export default class SearchInput extends Component {

  constructor(props, context) {
    super(props, context);

    this._onInputChange = this._onInputChange.bind(this);
    this._onAddDrop = this._onAddDrop.bind(this);
    this._onRemoveDrop = this._onRemoveDrop.bind(this);
    this._onNextSuggestion = this._onNextSuggestion.bind(this);
    this._onPreviousSuggestion = this._onPreviousSuggestion.bind(this);
    this._onEnter = this._onEnter.bind(this);
    this._onClickSuggestion = this._onClickSuggestion.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onInputKeyDown = this._onInputKeyDown.bind(this);
    this._stopPropagation = this._stopPropagation.bind(this);
    this._announceSuggestion = this._announceSuggestion.bind(this);

    this.state = {
      announceChange: false,
      dropActive: false,
      defaultValue: props.defaultValue,
      value: props.value,
      activeSuggestionIndex: -1
    };
  }

  componentDidUpdate (prevProps, prevState) {
    const { suggestions } = this.props;
    const { announceChange, dropActive } = this.state;
    const { intl } = this.context;
    // Set up keyboard listeners appropriate to the current state.
    let activeKeyboardHandlers = {
      esc: this._onRemoveDrop,
      tab: this._onRemoveDrop,
      up: this._onPreviousSuggestion,
      down: this._onNextSuggestion,
      enter: this._onEnter,
      left: this._stopPropagation,
      right: this._stopPropagation
    };

    // the order here is important, need to turn off keys before turning on
    if (! dropActive && prevState.dropActive) {
      document.removeEventListener('click', this._onRemoveDrop);
      KeyboardAccelerators.stopListeningToKeyboard(this,
        activeKeyboardHandlers);
      if (this._drop) {
        this._drop.remove();
        this._drop = undefined;
      }
    }

    if (dropActive && ! prevState.dropActive) {
      document.addEventListener('click', this._onRemoveDrop);
      KeyboardAccelerators.startListeningToKeyboard(this,
        activeKeyboardHandlers);

      // If this is inside a FormField, place the drop in reference to it.
      const control =
        findAncestor(this.componentRef, FORM_FIELD) || this.componentRef;
      this._drop = new Drop(control,
        this._renderDropContent(), {
          align: {top: 'bottom', left: 'left'}
        });

      this.inputRef.focus();
    } else if (dropActive && prevState.dropActive) {
      this._drop.render(this._renderDropContent());
    }

    if (announceChange && suggestions) {
      const matchResultsMessage = Intl.getMessage(
        intl, 'Match Results', {
          count: suggestions.length
        }
      );
      let navigationHelpMessage = '';
      if (suggestions.length) {
        navigationHelpMessage = `(${Intl.getMessage(intl, 'Navigation Help')})`;
      }
      announce(`${matchResultsMessage} ${navigationHelpMessage}`);
      this.setState({ announceChange: false });
    }
  }

  componentWillUnmount () {
    document.removeEventListener('click', this._onRemoveDrop);
    if (this._drop) {
      this._drop.remove();
    }
    KeyboardAccelerators.stopListeningToKeyboard(this);
  }

  _stopPropagation () {
    if (document.activeElement === this.inputRef) {
      return true;
    }
  }

  _fireDOMChange () {
    const { onDOMChange } = this.props;
    let event;
    try {
      event = new Event('change', {
        'bubbles': true,
        'cancelable': true
      });
    } catch (e) {
      // IE11 workaround.
      event = document.createEvent('Event');
      event.initEvent('change', true, true);
    }
    // We use dispatchEvent to have the browser fill out the event fully.
    this.inputRef.dispatchEvent(event);
    // Manually dispatched events aren't delivered by React, so we notify too.
    onDOMChange(event);
  }

  _onInputChange (event) {
    const { onDOMChange } = this.props;
    this.setState({
      activeSuggestionIndex: -1, announceChange: true, dropActive: true
    });
    if (onDOMChange) {
      this._fireDOMChange();
    }
  }

  _announceSuggestion (index) {
    const { intl } = this.context;
    const labelMessage = this._renderLabel(this.props.suggestions[index]);
    const enterSelectMessage = Intl.getMessage(intl, 'Enter Select');
    announce(`${labelMessage} ${enterSelectMessage}`);
  }

  _onAddDrop (event) {
    const { suggestions, value } = this.props;
    // Get values of suggestions, so we can highlight selected suggestion
    if (suggestions) {
      event.preventDefault();
      const suggestionValues = suggestions.map(this._renderLabel);
      let activeSuggestionIndex = suggestionValues.indexOf(value);
      this.setState({
        dropActive: true,
        activeSuggestionIndex: activeSuggestionIndex
      });
    }
  }

  _onRemoveDrop () {
    this.setState({ dropActive: false });
  }

  _onNextSuggestion () {
    const { suggestions } = this.props;
    const { activeSuggestionIndex } = this.state;
    if (suggestions) {
      const index = Math.min(activeSuggestionIndex + 1, suggestions.length - 1);
      this.setState({ activeSuggestionIndex: index },
        this._announceSuggestion.bind(this, index));
    }
  }

  _onPreviousSuggestion () {
    let index = this.state.activeSuggestionIndex;
    index = Math.max(index - 1, 0);
    this.setState({ activeSuggestionIndex: index },
      this._announceSuggestion.bind(this, index));
  }

  _onEnter (event) {
    const { suggestions, onSelect } = this.props;
    const { activeSuggestionIndex } = this.state;
    const { intl } = this.context;
    this.setState({ dropActive: false });
    if (activeSuggestionIndex >= 0) {
      event.preventDefault(); // prevent submitting forms
      let suggestion = suggestions[activeSuggestionIndex];
      this.setState({ value: suggestion }, () => {
        const suggestionMessage = this._renderLabel(suggestion);
        const selectedMessage = Intl.getMessage(intl, 'Selected');
        announce(`${suggestionMessage} ${selectedMessage}`);
      });
      if (onSelect) {
        onSelect({ target: this.inputRef, suggestion: suggestion });
      }
    }
  }

  _onClickSuggestion (suggestion) {
    const { onSelect } = this.props;
    this.setState({value: suggestion, dropActive: false});
    if (onSelect) {
      onSelect({ target: this.inputRef, suggestion: suggestion });
    }
  }

  _onFocus () {
    this.setState({
      activeSuggestionIndex: -1
    });
  }

  _onInputKeyDown (event) {
    const { suggestions } = this.props;
    const { dropActive } = this.state;
    if (suggestions) {
      const up = 38;
      const down = 40;
      if (event.keyCode === up || event.keyCode === down) {
        // stop the input to move the cursor when suggestions are present
        event.preventDefault();

        if (event.keyCode === down && !dropActive) {
          this._onAddDrop(event);
        }
      }
    }
  }

  _renderLabel (suggestion) {
    if (typeof suggestion === 'object') {
      return suggestion.label || suggestion.value;
    } else {
      return suggestion;
    }
  }

  _renderDropContent () {
    const { suggestions } = this.props;
    const { activeSuggestionIndex } = this.state;
    let suggestionsNode;
    if (suggestions) {
      suggestionsNode = suggestions.map((suggestion, index) => {
        const classes = classnames(
          `${CLASS_ROOT}__suggestion`, {
            [`${CLASS_ROOT}__suggestion--active`]:
              index === activeSuggestionIndex
          }
        );
        return (
          <li key={index} className={classes}
            onClick={this._onClickSuggestion.bind(this, suggestion)}>
            {this._renderLabel(suggestion)}
          </li>
        );
      }, this);
    }

    return (
      <ol className={`${CLASS_ROOT}__suggestions`} onClick={this._onRemoveDrop}>
        {suggestionsNode}
      </ol>
    );
  }

  render () {
    const {
      className, defaultValue, id, name, placeHolder, value
    } = this.props;
    const { active } = this.state;
    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--active`]: active
      },
      className
    );

    return (
      <div ref={ref => this.componentRef = ref} className={classes}>
        <input ref={ref => this.inputRef = ref} id={id} name={name}
          className={`${INPUT} ${CLASS_ROOT}__input`}
          value={this._renderLabel(value)}
          defaultValue={this._renderLabel(defaultValue)}
          placeholder={placeHolder} autoComplete='off'
          onChange={this._onInputChange} onFocus={this._onFocus}
          onKeyDown={this._onInputKeyDown} />
        <Button className={`${CLASS_ROOT}__control`} icon={<SearchIcon />}
          onClick={this._onAddDrop} />
      </div>
    );
  }

}

SearchInput.contextTypes = {
  intl: PropTypes.object
};

SearchInput.propTypes = {
  defaultValue: PropTypes.oneOfType([
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    PropTypes.string
  ]),
  id: PropTypes.string,
  name: PropTypes.string,
  onDOMChange: PropTypes.func,
  onSelect: PropTypes.func,
  placeHolder: PropTypes.string,
  suggestions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        label: PropTypes.node,
        value: PropTypes.any
      }),
      PropTypes.string
    ])
  ),
  value: PropTypes.oneOfType([
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    PropTypes.string
  ])
};
