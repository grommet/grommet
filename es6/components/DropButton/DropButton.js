function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { createRef, Component } from 'react';
import { compose } from 'recompose';
import { Button } from '../Button';
import { Drop } from '../Drop';
import { withForwardRef } from '../hocs';
import { setFocusWithoutScroll } from '../../utils';

var DropButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(DropButton, _Component);

  function DropButton(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "buttonRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "onDropClose", function () {
      var onClose = _this.props.onClose;

      _this.setState({
        show: false
      }, function () {
        if (onClose) {
          onClose();
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onToggle", function () {
      var _this$props = _this.props,
          onClose = _this$props.onClose,
          onOpen = _this$props.onOpen;
      var show = _this.state.show;

      _this.setState({
        show: !show
      }, function () {
        return show ? onClose && onClose() : onOpen && onOpen();
      });
    });

    _this.state = {
      show: props.open || false
    };
    return _this;
  }

  DropButton.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var show = prevState.show;
    var open = nextProps.open;

    if (open !== undefined && open !== show) {
      return {
        show: open
      };
    }

    return null;
  };

  var _proto = DropButton.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var open = this.props.open;

    if (open) {
      this.forceUpdate();
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var forwardRef = this.props.forwardRef;
    var show = this.state.show;

    if (!show && prevState.show) {
      // focus on the button if the drop is closed
      setFocusWithoutScroll((forwardRef || this.buttonRef).current);
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        disabled = _this$props2.disabled,
        dropAlign = _this$props2.dropAlign,
        dropProps = _this$props2.dropProps,
        forwardRef = _this$props2.forwardRef,
        dropContent = _this$props2.dropContent,
        dropTarget = _this$props2.dropTarget,
        id = _this$props2.id,
        open = _this$props2.open,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["disabled", "dropAlign", "dropProps", "forwardRef", "dropContent", "dropTarget", "id", "open"]);

    var show = this.state.show;
    delete rest.onClose;
    delete rest.onOpen;
    var drop;

    if (show && (forwardRef || this.buttonRef).current) {
      drop = React.createElement(Drop, _extends({
        id: id ? id + "__drop" : undefined,
        restrictFocus: true,
        align: dropAlign,
        target: dropTarget || (forwardRef || this.buttonRef).current,
        onClickOutside: this.onDropClose,
        onEsc: this.onDropClose
      }, dropProps), dropContent);
    }

    return React.createElement(React.Fragment, null, React.createElement(Button, _extends({
      id: id,
      ref: forwardRef || this.buttonRef,
      disabled: disabled,
      onClick: this.onToggle
    }, rest)), drop);
  };

  return DropButton;
}(Component);

_defineProperty(DropButton, "defaultProps", {
  a11yTitle: 'Open Drop',
  dropAlign: {
    top: 'top',
    left: 'left'
  }
});

var DropButtonDoc;

if (process.env.NODE_ENV !== 'production') {
  DropButtonDoc = require('./doc').doc(DropButton); // eslint-disable-line global-require
}

var DropButtonWrapper = compose(withForwardRef)(DropButtonDoc || DropButton);
export { DropButtonWrapper as DropButton };