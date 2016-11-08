'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Drop = require('../utils/Drop');

var _Drop2 = _interopRequireDefault(_Drop);

var _DOM = require('../utils/DOM');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _CheckBox = require('./CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _RadioButton = require('./RadioButton');

var _RadioButton2 = _interopRequireDefault(_RadioButton);

var _Search = require('./Search');

var _Search2 = _interopRequireDefault(_Search);

var _CaretDown = require('./icons/base/CaretDown');

var _CaretDown2 = _interopRequireDefault(_CaretDown);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Announcer = require('../utils/Announcer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.SELECT; // (C) Copyright 2014 Hewlett Packard Enterprise Development LP

var INPUT = _CSSClassnames2.default.INPUT;
var FORM_FIELD = _CSSClassnames2.default.FORM_FIELD;

var Select = function (_Component) {
  (0, _inherits3.default)(Select, _Component);

  function Select(props, context) {
    (0, _classCallCheck3.default)(this, Select);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).call(this, props, context));

    _this._onAddDrop = _this._onAddDrop.bind(_this);
    _this._onRemoveDrop = _this._onRemoveDrop.bind(_this);
    _this._onForceClose = _this._onForceClose.bind(_this);
    _this._onSearchChange = _this._onSearchChange.bind(_this);
    _this._onNextOption = _this._onNextOption.bind(_this);
    _this._onPreviousOption = _this._onPreviousOption.bind(_this);
    _this._onEnter = _this._onEnter.bind(_this);
    _this._stopPropagation = _this._stopPropagation.bind(_this);
    _this._onInputKeyDown = _this._onInputKeyDown.bind(_this);
    _this._announceOptions = _this._announceOptions.bind(_this);

    _this.state = {
      announceChange: false,
      activeOptionIndex: -1,
      dropActive: false,
      defaultValue: props.defaultValue,
      searchText: '',
      value: _this._normalizeValue(props, {})
    };
    return _this;
  }

  (0, _createClass3.default)(Select, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.hasOwnProperty('value')) {
        this.setState({ value: this._normalizeValue(nextProps, this.state) });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props = this.props,
          inline = _props.inline,
          options = _props.options;
      var _state = this.state,
          announceChange = _state.announceChange,
          dropActive = _state.dropActive;
      var intl = this.context.intl;

      // Set up keyboard listeners appropriate to the current state.

      var activeKeyboardHandlers = {
        up: this._onPreviousOption,
        down: this._onNextOption,
        enter: this._onEnter,
        left: this._stopPropagation,
        right: this._stopPropagation
      };

      if (!inline) {
        activeKeyboardHandlers.esc = this._onForceClose;
        activeKeyboardHandlers.tab = this._onForceClose;
      }

      // the order here is important, need to turn off keys before turning on
      if (!dropActive && prevState.dropActive) {
        document.removeEventListener('click', this._onRemoveDrop);
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, activeKeyboardHandlers);
        if (this._drop) {
          this._drop.remove();
          this._drop = undefined;
        }
      }

      if (inline && !prevProps.inline || dropActive && !prevState.dropActive) {

        if (!inline) {
          document.addEventListener('click', this._onRemoveDrop);
        }

        _KeyboardAccelerators2.default.startListeningToKeyboard(this, activeKeyboardHandlers);

        if (!inline) {
          // If this is inside a FormField, place the drop in reference to it.
          var control = (0, _DOM.findAncestor)(this.componentRef, FORM_FIELD) || this.componentRef;
          this._drop = _Drop2.default.add(control, this._renderOptions(CLASS_ROOT + '__drop'), {
            align: { top: 'bottom', left: 'left' },
            context: this.context
          });
        }

        if (this._searchRef) {
          this._searchRef.focus();
          this._searchRef._inputRef.select();
        }
      } else if (dropActive && prevState.dropActive) {
        this._drop.render(this._renderOptions(CLASS_ROOT + '__drop'));
      }

      if (announceChange && options) {
        var matchResultsMessage = _Intl2.default.getMessage(intl, 'Match Results', {
          count: options.length
        });
        var navigationHelpMessage = '';
        if (options.length) {
          navigationHelpMessage = '(' + _Intl2.default.getMessage(intl, 'Navigation Help') + ')';
        }
        (0, _Announcer.announce)(matchResultsMessage + ' ' + navigationHelpMessage);
        this.setState({ announceChange: false });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this._onRemoveDrop);
      if (this._drop) {
        this._drop.remove();
      }
    }
  }, {
    key: '_normalizeValue',
    value: function _normalizeValue(props, state) {
      var multiple = props.multiple,
          value = props.value;

      var normalizedValue = value;
      if (multiple) {
        if (value) {
          if (!Array.isArray(value)) {
            normalizedValue = [value];
          }
        } else {
          normalizedValue = [];
        }
      }
      return normalizedValue;
    }
  }, {
    key: '_announceOptions',
    value: function _announceOptions(index) {
      var intl = this.context.intl;

      var labelMessage = this._renderLabel(this.props.options[index], true);
      var enterSelectMessage = _Intl2.default.getMessage(intl, 'Enter Select');
      (0, _Announcer.announce)(labelMessage + ' ' + enterSelectMessage);
    }
  }, {
    key: '_onInputKeyDown',
    value: function _onInputKeyDown(event) {
      var up = 38;
      var down = 40;
      if (event.keyCode === up || event.keyCode === down) {
        // stop the input to move the cursor when options are present
        event.preventDefault();
      }
    }
  }, {
    key: '_onSearchChange',
    value: function _onSearchChange(event) {
      var inline = this.props.inline;

      this.setState({
        announceChange: true,
        activeOptionIndex: -1,
        dropActive: !inline,
        searchText: event.target.value
      });
      if (this.props.onSearch) {
        this.props.onSearch(event);
      }
    }
  }, {
    key: '_onAddDrop',
    value: function _onAddDrop(event) {
      var _props2 = this.props,
          options = _props2.options,
          value = _props2.value;

      event.preventDefault();
      // Get values of options, so we can highlight selected option
      if (options) {
        var optionValues = options.map(function (option) {
          if ((typeof option === 'undefined' ? 'undefined' : (0, _typeof3.default)(option)) === 'object') {
            return option.value;
          } else {
            return option;
          }
        });
        var activeOptionIndex = optionValues.indexOf(value);
        this.setState({
          dropActive: true,
          activeOptionIndex: activeOptionIndex
        });
      }
    }
  }, {
    key: '_onRemoveDrop',
    value: function _onRemoveDrop(event) {
      if (!this._searchRef || !(0, _reactDom.findDOMNode)(this._searchRef).contains(event.target)) {
        this.setState({ dropActive: false });
      }
    }
  }, {
    key: '_onForceClose',
    value: function _onForceClose() {
      this.setState({ dropActive: false });
    }
  }, {
    key: '_onNextOption',
    value: function _onNextOption(event) {
      event.preventDefault();
      var index = this.state.activeOptionIndex;
      index = Math.min(index + 1, this.props.options.length - 1);
      this.setState({ activeOptionIndex: index }, this._announceOptions.bind(this, index));
    }
  }, {
    key: '_onPreviousOption',
    value: function _onPreviousOption(event) {
      event.preventDefault();
      var index = this.state.activeOptionIndex;
      index = Math.max(index - 1, 0);
      this.setState({ activeOptionIndex: index }, this._announceOptions.bind(this, index));
    }
  }, {
    key: '_onEnter',
    value: function _onEnter(event) {
      var _this2 = this;

      var _props3 = this.props,
          onChange = _props3.onChange,
          options = _props3.options;
      var activeOptionIndex = this.state.activeOptionIndex;
      var intl = this.context.intl;

      this.setState({ dropActive: false });
      if (activeOptionIndex >= 0) {
        (function () {
          event.preventDefault(); // prevent submitting forms
          var option = options[activeOptionIndex];
          _this2.setState({ value: option }, function () {
            var optionMessage = _this2._renderLabel(option, true);
            var selectedMessage = _Intl2.default.getMessage(intl, 'Selected');
            (0, _Announcer.announce)(optionMessage + ' ' + selectedMessage);
          });
          if (onChange) {
            onChange({ target: _this2.inputRef, option: option });
          }
        })();
      }
    }
  }, {
    key: '_stopPropagation',
    value: function _stopPropagation() {
      if ((0, _reactDom.findDOMNode)(this._searchRef).contains(document.activeElement)) {
        return true;
      }
    }
  }, {
    key: '_onClickOption',
    value: function _onClickOption(option) {
      var multiple = this.props.multiple;
      var value = this.state.value;

      var nextValue = void 0;
      if (multiple) {
        nextValue = value.slice(0);
        var index = void 0;
        for (index = 0; index < nextValue.length; index += 1) {
          if (this._valueEqualsOption(nextValue[index], option)) {
            break;
          }
        }
        if (index < nextValue.length) {
          // already existing, remove
          nextValue.splice(index, 1);
        } else {
          // not there, add
          nextValue.push(option);
        }
      } else {
        nextValue = option;
      }
      this.setState({ value: nextValue, dropActive: false });
      if (this.props.onChange) {
        this.props.onChange({
          target: this.inputRef, option: option, value: nextValue
        });
      }
    }
  }, {
    key: '_renderLabel',
    value: function _renderLabel(option, announce) {
      if ((typeof option === 'undefined' ? 'undefined' : (0, _typeof3.default)(option)) === 'object') {
        // revert for announce as label is often a complex object
        return announce ? option.value || option.label || '' : option.label || option.value || '';
      } else {
        return option || '';
      }
    }
  }, {
    key: '_valueEqualsOption',
    value: function _valueEqualsOption(value, option) {
      var result = false;
      if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
        if ((typeof option === 'undefined' ? 'undefined' : (0, _typeof3.default)(option)) === 'object') {
          result = value.value === option.value;
        } else {
          result = value.value === option;
        }
      } else {
        if ((typeof option === 'undefined' ? 'undefined' : (0, _typeof3.default)(option)) === 'object') {
          result = value === option.value;
        } else {
          result = value === option;
        }
      }
      return result;
    }
  }, {
    key: '_optionSelected',
    value: function _optionSelected(option, value) {
      var _this3 = this;

      var result = false;
      if (value && Array.isArray(value)) {
        result = value.some(function (val) {
          return _this3._valueEqualsOption(val, option);
        });
      } else {
        result = this._valueEqualsOption(value, option);
      }
      return result;
    }
  }, {
    key: '_renderOptions',
    value: function _renderOptions(className) {
      var _this4 = this;

      var restProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _props4 = this.props,
          id = _props4.id,
          inline = _props4.inline,
          multiple = _props4.multiple,
          options = _props4.options,
          onSearch = _props4.onSearch,
          placeHolder = _props4.placeHolder,
          value = _props4.value;
      var _state2 = this.state,
          activeOptionIndex = _state2.activeOptionIndex,
          searchText = _state2.searchText;


      var search = void 0;
      if (onSearch) {
        search = _react2.default.createElement(_Search2.default, { className: CLASS_ROOT + '__search',
          ref: function ref(_ref) {
            return _this4._searchRef = _ref;
          },
          inline: true, fill: true, responsive: false, pad: 'medium',
          placeHolder: placeHolder, value: searchText,
          onDOMChange: this._onSearchChange,
          onKeyDown: this._onInputKeyDown });
      }

      var items = void 0;
      if (options) {
        items = options.map(function (option, index) {
          var _classnames;

          var classes = (0, _classnames4.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__option', true), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__option--active', index === activeOptionIndex), _classnames));

          var content = _this4._renderLabel(option);
          if (option.icon) {
            content = _react2.default.createElement(
              'span',
              null,
              option.icon,
              ' ',
              content
            );
          }

          var itemOnClick = void 0;
          if (inline) {
            var itemId = id + '-' + (option.value || option);
            var checked = _this4._optionSelected(option, value);
            var Type = multiple ? _CheckBox2.default : _RadioButton2.default;
            content = _react2.default.createElement(Type, { key: itemId, id: itemId, label: content, checked: checked,
              onChange: _this4._onClickOption.bind(_this4, option) });
          } else {
            itemOnClick = _this4._onClickOption.bind(_this4, option);
          }

          return _react2.default.createElement(
            'li',
            { key: index, className: classes, onClick: itemOnClick },
            content
          );
        });
      }

      var onClick = void 0;
      if (!inline) {
        onClick = this._onRemoveDrop;
      }

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, restProps, { className: className }),
        search,
        _react2.default.createElement(
          'ol',
          { className: CLASS_ROOT + '__options', onClick: onClick },
          items
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames2,
          _this5 = this;

      var _props5 = this.props,
          className = _props5.className,
          inline = _props5.inline,
          value = _props5.value;
      var active = this.state.active;
      var intl = this.context.intl;

      var classes = (0, _classnames4.default)(CLASS_ROOT, (_classnames2 = {}, (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '--active', active), (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '--inline', inline), _classnames2), className);
      var restProps = _Props2.default.omit(this.props, (0, _keys2.default)(Select.propTypes));

      if (inline) {
        return this._renderOptions(classes, restProps);
      } else {
        return _react2.default.createElement(
          'div',
          { ref: function ref(_ref3) {
              return _this5.componentRef = _ref3;
            }, className: classes,
            onClick: this._onAddDrop },
          _react2.default.createElement('input', (0, _extends3.default)({}, restProps, { ref: function ref(_ref2) {
              return _this5.inputRef = _ref2;
            },
            className: INPUT + ' ' + CLASS_ROOT + '__input',
            disabled: true, value: this._renderLabel(value) })),
          _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__control',
            a11yTitle: _Intl2.default.getMessage(intl, 'Select Icon'),
            icon: _react2.default.createElement(_CaretDown2.default, null), onClick: this._onAddDrop })
        );
      }

      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref5) {
            return _this5.componentRef = _ref5;
          }, className: classes,
          onClick: onClick },
        _react2.default.createElement('input', (0, _extends3.default)({}, restProps, { ref: function ref(_ref4) {
            return _this5.inputRef = _ref4;
          },
          className: INPUT + ' ' + CLASS_ROOT + '__input',
          disabled: true, value: this._renderLabel(value) })),
        button,
        drop
      );
    }
  }]);
  return Select;
}(_react.Component);

Select.displayName = 'Select';
exports.default = Select;


var valueType = _react.PropTypes.oneOfType([_react.PropTypes.shape({
  label: _react.PropTypes.node,
  value: _react.PropTypes.any
}), _react.PropTypes.string]);

Select.propTypes = {
  // deprecate?
  defaultValue: _react.PropTypes.oneOfType([valueType, _react.PropTypes.arrayOf(valueType)]),
  inline: _react.PropTypes.bool,
  multiple: _react.PropTypes.bool,
  onSearch: _react.PropTypes.func,
  onChange: _react.PropTypes.func, // (value(s))
  placeHolder: _react.PropTypes.string,
  options: _react.PropTypes.arrayOf(valueType).isRequired,
  value: _react.PropTypes.oneOfType([valueType, _react.PropTypes.arrayOf(valueType)])
};

Select.contextTypes = {
  intl: _react.PropTypes.object
};
module.exports = exports['default'];