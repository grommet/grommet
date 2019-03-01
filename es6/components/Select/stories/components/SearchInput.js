function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { createRef, Component } from 'react';
import { TextInput } from '../../..';
import { SearchBorderBox } from './SearchBorderBox';
import { SearchInputContext } from './SearchInputContext';
export var SearchInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SearchInput, _Component);

  function SearchInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "textInputRef", createRef());

    return _this;
  }

  var _proto = SearchInput.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.focusTimeout = setTimeout(function () {
      _this2.textInputRef.current.focus();
    }, 300);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.focusTimeout);
  };

  _proto.render = function render() {
    var _this3 = this;

    return React.createElement(SearchInputContext.Consumer, null, function (_ref) {
      var searching = _ref.searching;
      return React.createElement(SearchBorderBox, {
        searching: searching
      }, React.createElement(TextInput, _extends({}, _this3.props, {
        plain: true,
        ref: _this3.textInputRef
      })));
    });
  };

  return SearchInput;
}(Component);