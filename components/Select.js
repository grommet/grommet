'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _Search = require('./Search');

var _Search2 = _interopRequireDefault(_Search);

var _CaretDown = require('./icons/base/CaretDown');

var _CaretDown2 = _interopRequireDefault(_CaretDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.SELECT;
var INPUT = _CSSClassnames2.default.INPUT;
var FORM_FIELD = _CSSClassnames2.default.FORM_FIELD;

var Select = function (_Component) {
  (0, _inherits3.default)(Select, _Component);

  function Select(props, context) {
    (0, _classCallCheck3.default)(this, Select);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).call(this, props, context));

    _this._onAddDrop = _this._onAddDrop.bind(_this);
    _this._onRemoveDrop = _this._onRemoveDrop.bind(_this);
    _this._onSearchChange = _this._onSearchChange.bind(_this);
    _this._onNextOption = _this._onNextOption.bind(_this);
    _this._onPreviousOption = _this._onPreviousOption.bind(_this);
    _this._onEnter = _this._onEnter.bind(_this);
    _this._onClickOption = _this._onClickOption.bind(_this);

    _this.state = {
      activeOptionIndex: -1,
      dropActive: false,
      defaultValue: props.defaultValue,
      searchText: '',
      value: props.value
    };
    return _this;
  }

  (0, _createClass3.default)(Select, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      // Set up keyboard listeners appropriate to the current state.

      var activeKeyboardHandlers = {
        esc: this._onRemoveDrop,
        tab: this._onRemoveDrop,
        up: this._onPreviousOption,
        down: this._onNextOption,
        enter: this._onEnter
      };

      // the order here is important, need to turn off keys before turning on

      if (!this.state.dropActive && prevState.dropActive) {
        document.removeEventListener('click', this._onRemoveDrop);
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, activeKeyboardHandlers);
        if (this._drop) {
          this._drop.remove();
          this._drop = null;
        }
      }

      if (this.state.dropActive && !prevState.dropActive) {
        document.addEventListener('click', this._onRemoveDrop);
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, activeKeyboardHandlers);

        // If this is inside a FormField, place the drop in reference to it.
        var control = (0, _DOM.findAncestor)(this.componentRef, FORM_FIELD) || this.componentRef;
        this._drop = _Drop2.default.add(control, this._renderDrop(), { align: { top: 'bottom', left: 'left' } });
      } else if (this.state.dropActive && prevState.dropActive) {
        this._drop.render(this._renderDrop());
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
    key: '_onSearchChange',
    value: function _onSearchChange(event) {
      this.setState({
        activeOptionIndex: -1,
        dropActive: true,
        searchText: event.target.value
      });
      if (this.props.onSearch) {
        this.props.onSearch(event);
      }
    }
  }, {
    key: '_onAddDrop',
    value: function _onAddDrop(event) {
      var _props = this.props;
      var options = _props.options;
      var value = _props.value;

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
    value: function _onRemoveDrop() {
      this.setState({ dropActive: false });
    }
  }, {
    key: '_onNextOption',
    value: function _onNextOption() {
      var index = this.state.activeOptionIndex;
      index = Math.min(index + 1, this.props.options.length - 1);
      this.setState({ activeOptionIndex: index });
    }
  }, {
    key: '_onPreviousOption',
    value: function _onPreviousOption() {
      var index = this.state.activeOptionIndex;
      index = Math.max(index - 1, 0);
      this.setState({ activeOptionIndex: index });
    }
  }, {
    key: '_onEnter',
    value: function _onEnter(event) {
      var _props2 = this.props;
      var onChange = _props2.onChange;
      var options = _props2.options;
      var activeOptionIndex = this.state.activeOptionIndex;

      this.setState({ dropActive: false });
      if (activeOptionIndex >= 0) {
        event.preventDefault(); // prevent submitting forms
        var option = options[activeOptionIndex];
        this.setState({ value: option });
        if (onChange) {
          onChange({ target: this.inputRef, option: option });
        }
      }
    }
  }, {
    key: '_onClickOption',
    value: function _onClickOption(option) {
      this.setState({ value: option, dropActive: false });
      if (this.props.onChange) {
        this.props.onChange({ target: this.inputRef, option: option });
      }
    }
  }, {
    key: '_renderLabel',
    value: function _renderLabel(option) {
      if ((typeof option === 'undefined' ? 'undefined' : (0, _typeof3.default)(option)) === 'object') {
        return option.label || option.value;
      } else {
        return option;
      }
    }
  }, {
    key: '_renderDrop',
    value: function _renderDrop() {
      var _this2 = this;

      var _props3 = this.props;
      var onSearch = _props3.onSearch;
      var placeHolder = _props3.placeHolder;
      var options = _props3.options;
      var _state = this.state;
      var activeOptionIndex = _state.activeOptionIndex;
      var searchText = _state.searchText;

      var search = void 0;
      if (onSearch) {
        search = _react2.default.createElement(_Search2.default, { className: CLASS_ROOT + '__search',
          inline: true, fill: true, responsive: false, pad: 'medium',
          placeHolder: placeHolder, initialFocus: true, value: searchText,
          onDOMChange: this._onSearchChange });
      }

      var items = void 0;
      if (options) {
        items = options.map(function (option, index) {
          var _classnames;

          var classes = (0, _classnames4.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__option', true), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__option--active', index === activeOptionIndex), _classnames));
          return _react2.default.createElement(
            'li',
            { key: index,
              className: classes,
              onClick: _this2._onClickOption.bind(_this2, option) },
            _this2._renderLabel(option)
          );
        });
      }

      return _react2.default.createElement(
        'div',
        { className: CLASS_ROOT + '__drop' },
        search,
        _react2.default.createElement(
          'ol',
          { className: CLASS_ROOT + '__options',
            onClick: this._onRemoveDrop },
          items
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props4 = this.props;
      var className = _props4.className;
      var id = _props4.id;
      var name = _props4.name;
      var value = _props4.value;
      var active = this.state.active;

      var classes = (0, _classnames4.default)(CLASS_ROOT, (0, _defineProperty3.default)({}, CLASS_ROOT + '--active', active), className);
      var restProps = _Props2.default.omit(this.props, (0, _keys2.default)(Select.propTypes));

      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref) {
            return _this3.componentRef = _ref;
          }, className: classes,
          onClick: this._onAddDrop },
        _react2.default.createElement('input', (0, _extends3.default)({}, restProps, { className: INPUT + ' ' + CLASS_ROOT + '__input',
          id: id, name: name, disabled: true,
          value: this._renderLabel(value) })),
        _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__control', icon: _react2.default.createElement(_CaretDown2.default, null),
          onClick: this._onAddDrop })
      );
    }
  }]);
  return Select;
}(_react.Component);

Select.displayName = 'Select';
exports.default = Select;


Select.propTypes = {
  defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.string
  }), _react.PropTypes.string]),
  id: _react.PropTypes.string,
  name: _react.PropTypes.string,
  onSearch: _react.PropTypes.func,
  onChange: _react.PropTypes.func,
  placeHolder: _react.PropTypes.string,
  options: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.shape({
    label: _react.PropTypes.node,
    value: _react.PropTypes.any
  }), _react.PropTypes.string])),
  value: _react.PropTypes.oneOfType([_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.string
  }), _react.PropTypes.string])
};
module.exports = exports['default'];