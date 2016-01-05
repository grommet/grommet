'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "tab";

var Tab = (function (_Component) {
  _inherits(Tab, _Component);

  function Tab() {
    _classCallCheck(this, Tab);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tab).call(this));

    _this._processSpace = _this._processSpace.bind(_this);
    _this._onClickTab = _this._onClickTab.bind(_this);
    return _this;
  }

  _createClass(Tab, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _KeyboardAccelerators2.default.startListeningToKeyboard(this, {
        space: this._processSpace
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _KeyboardAccelerators2.default.stopListeningToKeyboard(this, {
        space: this._processSpace
      });
    }
  }, {
    key: '_processSpace',
    value: function _processSpace(event) {
      if (event.target === this.refs.tab) {
        this._onClickTab(event);
      }
    }
  }, {
    key: '_onClickTab',
    value: function _onClickTab(event) {
      event.preventDefault();
      this.props.onRequestForActive();
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];

      if (this.props.active) {
        classes.push(CLASS_ROOT + "--active");
      }

      return _react2.default.createElement(
        'li',
        { className: classes.join(' '), id: this.props.id },
        _react2.default.createElement(
          'a',
          { ref: 'tab', role: 'tab', href: '#', onClick: this._onClickTab,
            'aria-expanded': this.props.active, 'aria-selected': this.props.active,
            className: CLASS_ROOT + "__link", 'aria-labelledby': this.props.id },
          _react2.default.createElement(
            'label',
            { className: CLASS_ROOT + '__label', htmlFor: this.props.id },
            this.props.title
          )
        )
      );
    }
  }]);

  return Tab;
})(_react.Component);

exports.default = Tab;

Tab.propTypes = {
  title: _react.PropTypes.string.isRequired,
  active: _react.PropTypes.bool,
  id: _react.PropTypes.string
};
module.exports = exports['default'];