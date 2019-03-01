function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { FormSearch } from 'grommet-icons/icons/FormSearch';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { normalizeColor } from '../../utils';

var Searcher =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Searcher, _Component);

  function Searcher() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "inputRef", React.createRef());

    return _this;
  }

  var _proto = Searcher.prototype;

  _proto.componentDidMount = function componentDidMount() {
    /* eslint-disable-next-line react/prop-types */
    var _this$props = this.props,
        filtering = _this$props.filtering,
        property = _this$props.property;

    if (this.inputRef.current && filtering === property) {
      this.inputRef.current.focus();
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        filtering = _this$props2.filtering,
        filters = _this$props2.filters,
        onFilter = _this$props2.onFilter,
        onFiltering = _this$props2.onFiltering,
        property = _this$props2.property,
        theme = _this$props2.theme;

    if (filtering === property) {
      return React.createElement(Keyboard, {
        onEsc: function onEsc() {
          return onFiltering(undefined);
        }
      }, React.createElement(Box, {
        flex: true,
        pad: {
          horizontal: 'small'
        }
      }, React.createElement(TextInput, {
        ref: this.inputRef,
        value: filters[property],
        onChange: function onChange(event) {
          return onFilter(property, event.target.value);
        },
        onBlur: function onBlur() {
          return onFiltering(undefined);
        }
      })));
    }

    return React.createElement(Fragment, null, filters[property] ? React.createElement(Box, {
      flex: false,
      pad: {
        horizontal: 'small'
      }
    }, React.createElement(Text, null, filters[property])) : null, React.createElement(Button, {
      icon: React.createElement(FormSearch, {
        color: normalizeColor(filtering === property ? 'brand' : 'border', theme)
      }),
      hoverIndicator: true,
      onClick: function onClick() {
        return onFiltering(filtering === property ? undefined : property);
      }
    }));
  };

  return Searcher;
}(Component);

Searcher.defaultProps = {};
Object.setPrototypeOf(Searcher.defaultProps, defaultProps);
var SearcherWrapper = compose(withTheme)(Searcher);
export { SearcherWrapper as Searcher };