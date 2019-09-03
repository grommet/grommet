function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, CheckBox, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';
var dummyOptions = Array(2000).fill().map(function (_, i) {
  return "option " + i;
}).sort(function (a, b) {
  return a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base'
  });
});

var Option =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Option, _PureComponent);

  function Option() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Option.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        value = _this$props.value,
        selected = _this$props.selected;
    return React.createElement(Box, {
      direction: "row",
      gap: "small",
      align: "center",
      pad: "xsmall"
    }, React.createElement(CheckBox, {
      tabIndex: "-1",
      checked: selected,
      onChange: function onChange() {}
    }), value);
  };

  return Option;
}(PureComponent);

var LazyLoading = function LazyLoading() {
  var _React$useState = React.useState([]),
      selected = _React$useState[0],
      setSelected = _React$useState[1];

  var _React$useState2 = React.useState(dummyOptions.slice(0, 200)),
      options = _React$useState2[0],
      setOptions = _React$useState2[1];

  var onMore = function onMore() {
    setTimeout(function () {
      console.log('onmore called');
      setOptions(dummyOptions.slice(0, options.length + 200));
    }, 1000);
  };

  var onClose = function onClose() {
    setOptions(options.sort(function (p1, p2) {
      var p1Exists = selected.includes(p1);
      var p2Exists = selected.includes(p2);

      if (!p1Exists && p2Exists) {
        return 1;
      }

      if (p1Exists && !p2Exists) {
        return -1;
      }

      return p1.localeCompare(p2, undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    }));
  };

  var onChange = function onChange(_ref) {
    var nextSelected = _ref.selected;
    return setSelected(nextSelected);
  };

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, React.createElement(Select, {
    multiple: true,
    closeOnChange: false,
    placeholder: "select an option...",
    selected: selected,
    options: options,
    dropHeight: "medium",
    onMore: onMore,
    onClose: onClose,
    onChange: onChange
  }, function (option, index) {
    return React.createElement(Option, {
      value: option,
      selected: selected.indexOf(index) !== -1
    });
  })));
};

storiesOf('Select', module).add('Lazy Loading options', function () {
  return React.createElement(LazyLoading, null);
});