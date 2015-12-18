// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Drop from '../utils/Drop';
import Responsive from '../utils/Responsive';
import Button from './Button';
import SearchIcon from './icons/base/Search';

const CLASS_ROOT = "search";

class Search extends Component {

  constructor(props) {
    super(props);

    this._onAddDrop = this._onAddDrop.bind(this);
    this._onRemoveDrop = this._onRemoveDrop.bind(this);
    this._onFocusControl = this._onFocusControl.bind(this);
    this._onBlurControl = this._onBlurControl.bind(this);
    this._onFocusInput = this._onFocusInput.bind(this);
    this._onBlurInput = this._onBlurInput.bind(this);
    this._onChangeInput = this._onChangeInput.bind(this);
    this._onNextSuggestion = this._onNextSuggestion.bind(this);
    this._onPreviousSuggestion = this._onPreviousSuggestion.bind(this);
    this._onEnter = this._onEnter.bind(this);
    this._onClickSuggestion = this._onClickSuggestion.bind(this);
    this._onSink = this._onSink.bind(this);
    this._onResponsive = this._onResponsive.bind(this);

    this.state = {
      align: 'left',
      controlFocused: false,
      inline: props.inline,
      dropActive: false,
      activeSuggestionIndex: -1
    };
  }

  componentDidMount () {
    if (this.props.inline && this.props.responsive) {
      this._responsive = Responsive.start(this._onResponsive);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.suggestions && nextProps.suggestions.length > 0 &&
      ! this.state.dropActive && this.refs.input === document.activeElement) {
      this.setState({dropActive: true});
    } else if ((! nextProps.suggestions || nextProps.suggestions.length === 0) &&
      this.state.inline) {
      this.setState({dropActive: false});
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // Set up keyboard listeners appropriate to the current state.

    var activeKeyboardHandlers = {
      esc: this._onRemoveDrop,
      tab: this._onRemoveDrop,
      up: this._onPreviousSuggestion,
      down: this._onNextSuggestion,
      enter: this._onEnter
    };
    var focusedKeyboardHandlers = {
      space: this._onAddDrop
    };

    // the order here is important, need to turn off keys before turning on

    if (! this.state.controlFocused && prevState.controlFocused) {
      KeyboardAccelerators.stopListeningToKeyboard(this, focusedKeyboardHandlers);
    }

    if (! this.state.dropActive && prevState.dropActive) {
      document.removeEventListener('click', this._onRemoveDrop);
      KeyboardAccelerators.stopListeningToKeyboard(this, activeKeyboardHandlers);
      if (this._drop) {
        this._drop.remove();
        this._drop = null;
      }
    }

    if (this.state.controlFocused && ! prevState.controlFocused) {
      KeyboardAccelerators.startListeningToKeyboard(this, focusedKeyboardHandlers);
    }

    if (this.state.dropActive && ! prevState.dropActive) {
      // Slow down adding the click handler,
      // otherwise the drop will close when the mouse is released.
      // Not observable in Safari, 1ms is sufficient for Chrome, Firefox needs 100ms though. :(
      // TODO: re-evaluate how to solve this without a timeout.
      setTimeout(function () {
        document.addEventListener('click', this._onRemoveDrop);
      }.bind(this), 100);
      KeyboardAccelerators.startListeningToKeyboard(this, activeKeyboardHandlers);

      var baseElement;
      if (this.refs.control) {
        baseElement = ReactDOM.findDOMNode(this.refs.control);
      } else {
        baseElement = this.refs.input;
      }
      var dropAlign = this.props.dropAlign || {
        top: (this.state.inline ? 'bottom' : 'top'),
        left: 'left'
      };
      this._drop = Drop.add(baseElement, this._renderDrop(), dropAlign);

      if (! this.state.inline) {
        document.getElementById('search-drop-input').focus();
      }
    } else if (this._drop) {
      this._drop.render(this._renderDrop());
    }
  }

  componentWillUnmount () {
    document.removeEventListener('click', this._onRemoveDrop);
    KeyboardAccelerators.stopListeningToKeyboard(this);
    if (this._responsive) {
      this._responsive.stop();
    }
    if (this._drop) {
      this._drop.remove();
    }
  }

  _onAddDrop (event) {
    event.preventDefault();
    this.setState({dropActive: true, activeSuggestionIndex: -1});
  }

  _onRemoveDrop () {
    this.setState({dropActive: false});
  }

  _onFocusControl () {
    this.setState({
      controlFocused: true,
      dropActive: true,
      activeSuggestionIndex: -1
    });
  }

  _onBlurControl () {
    this.setState({controlFocused: false});
  }

  _onFocusInput () {
    this.refs.input.select();
    this.setState({
      dropActive: (! this.state.inline ||
        (this.props.suggestions && this.props.suggestions.length > 0)),
      activeSuggestionIndex: -1
    });
  }

  _onBlurInput () {
    //this.setState({drop: false});
  }

  _onChangeInput (event) {
    this.setState({activeSuggestionIndex: -1});
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }

  _onNextSuggestion () {
    var index = this.state.activeSuggestionIndex;
    index = Math.min(index + 1, this.props.suggestions.length - 1);
    this.setState({activeSuggestionIndex: index});
  }

  _onPreviousSuggestion () {
    var index = this.state.activeSuggestionIndex;
    index = Math.max(index - 1, 0);
    this.setState({activeSuggestionIndex: index});
  }

  _onEnter () {
    this._onRemoveDrop();
    if (this.state.activeSuggestionIndex >= 0) {
      var suggestion = this.props.suggestions[this.state.activeSuggestionIndex];
      if (this.props.onChange) {
        this.props.onChange(suggestion);
      }
    }
  }

  _onClickSuggestion (item) {
    this._onRemoveDrop();
    if (this.props.onChange) {
      this.props.onChange(item);
    }
  }

  _onSink (event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  _onResponsive (small) {
    if (small) {
      this.setState({inline: false});
    } else {
      this.setState({inline: this.props.inline});
    }
  }

  focus () {
    var ref = this.refs.input || this.refs.control;
    if (ref) {
      ref.focus();
    }
  }

  _classes (prefix) {
    var classes = [prefix];

    if (this.state.inline) {
      classes.push(prefix + "--inline");
    } else {
      classes.push(prefix + "--controlled");
    }

    return classes;
  }

  _renderSuggestionLabel (suggestion) {
    var label;
    if (suggestion.hasOwnProperty('label')) {
      label = suggestion.label;
    } else {
      label = suggestion;
    }
    return label;
  }

  _renderDrop () {
    var classes = this._classes(CLASS_ROOT + "__drop");
    if (this.props.dropColorIndex) {
      classes.push("background-color-index-" + this.props.dropColorIndex);
    }
    if (this.props.large) {
      classes.push(CLASS_ROOT + "__drop--large");
    }

    var input;
    if (! this.state.inline) {
      input = (
        <input key="input" id="search-drop-input" type="search"
          defaultValue={this.props.defaultValue}
          value={this.props.value}
          className={CLASS_ROOT + "__input"}
          onChange={this._onChangeInput} />
      );
    }

    var suggestions;
    if (this.props.suggestions) {
      suggestions = this.props.suggestions.map(function (item, index) {
        var classes = [CLASS_ROOT + "__suggestion"];
        if (index === this.state.activeSuggestionIndex) {
          classes.push(CLASS_ROOT + "__suggestion--active");
        }
        return (
          <div key={index}
            className={classes.join(' ')}
            onClick={this._onClickSuggestion.bind(this, item)}>
            {this._renderSuggestionLabel(item)}
          </div>
        );
      }, this);
      suggestions = (
        <div key="suggestions" className={CLASS_ROOT + "__suggestions"}>
          {suggestions}
        </div>
      );
    }

    var contents = [input, suggestions];

    if (! this.state.inline) {
      contents = [
        <Button key="icon" type="icon"
          className={CLASS_ROOT + "__drop-control"}
          onClick={this._onRemoveDrop}>
          <SearchIcon />
        </Button>,
        <div key="contents" className={CLASS_ROOT + "__drop-contents"}
          onClick={this._onSink}>
          {contents}
        </div>
      ];
      if (this.props.dropAlign && ! this.props.dropAlign.left) {
        contents.reverse();
      }
    }

    return (
      <div id="search-drop" className={classes.join(' ')}>
        {contents}
      </div>
    );
  }

  render () {

    var classes = this._classes(CLASS_ROOT);
    if (this.props.size) {
      classes.push(CLASS_ROOT + "--" + this.props.size);
    } else if (this.props.large && ! this.props.size) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    if (this.state.inline) {

      return (
        <div className={classes.join(' ')}>
          <input ref="input" type="search"
            id={this.props.id}
            placeholder={this.props.placeHolder}
            defaultValue={this.props.defaultValue}
            value={this.props.value}
            className={CLASS_ROOT + "__input"}
            onFocus={this._onFocusInput}
            onBlur={this._onBlurInput}
            onChange={this._onChangeInput} />
          <SearchIcon />
        </div>
      );

    } else {

      return (
        <Button ref="control" id={this.props.id}
          className={classes.join(' ')}
          type="icon"
          tabIndex="0"
          onClick={this._onAddDrop}
          onFocus={this._onFocusControl}
          onBlur={this._onBlurControl}>
          <SearchIcon />
        </Button>
      );
    }
  }

}

Search.propTypes = {
  defaultValue: PropTypes.string,
  dropAlign: Drop.alignPropType,
  dropColorIndex: PropTypes.string,
  id: React.PropTypes.string,
  inline: PropTypes.bool,
  large: PropTypes.bool,
  onChange: PropTypes.func,
  placeHolder: PropTypes.string,
  responsive: PropTypes.bool,
  size: React.PropTypes.oneOf(['small', 'medium', 'large']),
  suggestions: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      label: PropTypes.string.isRequired
    })
  ])),
  value: PropTypes.string
};

Search.defaultProps = {
  align: 'left',
  inline: false,
  responsive: true
};

module.exports = Search;
