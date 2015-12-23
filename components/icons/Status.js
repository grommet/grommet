// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _statusOK = require('./status/OK');

var _statusOK2 = _interopRequireDefault(_statusOK);

var _statusCriticalStatus = require('./status/CriticalStatus');

var _statusCriticalStatus2 = _interopRequireDefault(_statusCriticalStatus);

var _statusErrorStatus = require('./status/ErrorStatus');

var _statusErrorStatus2 = _interopRequireDefault(_statusErrorStatus);

var _statusWarning = require('./status/Warning');

var _statusWarning2 = _interopRequireDefault(_statusWarning);

var _statusDisabled = require('./status/Disabled');

var _statusDisabled2 = _interopRequireDefault(_statusDisabled);

var _statusUnknown = require('./status/Unknown');

var _statusUnknown2 = _interopRequireDefault(_statusUnknown);

var _statusLabel = require('./status/Label');

var _statusLabel2 = _interopRequireDefault(_statusLabel);

var CLASS_ROOT = "status-icon";

var Status = (function (_Component) {
  _inherits(Status, _Component);

  function Status(props, context) {
    _classCallCheck(this, Status);

    _get(Object.getPrototypeOf(Status.prototype), 'constructor', this).call(this, props, context);
    this.state = this._stateFromProps(props);
  }

  _createClass(Status, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.setState(this._stateFromProps(newProps));
    }
  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(_ref) {
      var size = _ref.size;
      var small = _ref.small;
      var large = _ref.large;

      return { size: size || (small ? 'small' : large ? 'large' : null) };
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      var a11yTitle = this.props.a11yTitle;
      var size = this.state.size;

      if (this.props.className) {
        classes.push(this.props.className);
      }
      if (size) {
        classes.push(CLASS_ROOT + "--" + size);
      }
      var className = classes.join(' ');
      var icon = _react2['default'].createElement(
        'span',
        null,
        '?'
      );
      switch (this.props.value.toLowerCase()) {
        case 'ok':
        case 'normal':
          icon = _react2['default'].createElement(_statusOK2['default'], { className: className, a11yTitle: a11yTitle });
          break;
        case 'warning':
          icon = _react2['default'].createElement(_statusWarning2['default'], { className: className, a11yTitle: a11yTitle });
          break;
        // 'error' is deprecated, use 'critical'
        case 'error':
          icon = _react2['default'].createElement(_statusErrorStatus2['default'], { className: className, a11yTitle: a11yTitle });
          break;
        case 'critical':
          icon = _react2['default'].createElement(_statusCriticalStatus2['default'], { className: className, a11yTitle: a11yTitle });
          break;
        case 'disabled':
          icon = _react2['default'].createElement(_statusDisabled2['default'], { className: className, a11yTitle: a11yTitle });
          break;
        case 'unknown':
          icon = _react2['default'].createElement(_statusUnknown2['default'], { className: className, a11yTitle: a11yTitle });
          break;
        case 'label':
          icon = _react2['default'].createElement(_statusLabel2['default'], { className: className, a11yTitle: a11yTitle });
          break;
      }
      return icon;
    }
  }]);

  return Status;
})(_react.Component);

exports['default'] = Status;

Status.defaultProps = { value: 'unknown' };

Status.propTypes = {
  a11yTitle: _react.PropTypes.string,
  large: _react.PropTypes.bool,
  small: _react.PropTypes.bool,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  value: _react.PropTypes.oneOf(['critical', 'warning', 'ok', 'unknown', 'disabled', 'Critical', 'Warning', 'OK', 'Unknown', 'Disabled'])
};
module.exports = exports['default'];