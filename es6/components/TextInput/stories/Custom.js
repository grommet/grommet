function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { createRef, Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Search } from "grommet-icons/es6/icons/Search";
import { Box, Image, Grommet, Text, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var myCustomTheme = deepMerge(grommet, {
  global: {
    drop: {
      background: '#444444',
      shadowSize: 'medium',
      extend: "\n          border-bottom-left-radius: 12px;\n          border-bottom-right-radius: 12px;\n  \n          overflow: hidden;\n        "
    },
    elevation: {
      dark: {
        medium: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
      },
      light: {
        medium: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
      }
    },
    input: {
      weight: 400
    },
    font: {
      size: '14px',
      family: 'Arial'
    }
  }
});
var folks = [{
  name: 'Alan Souza',
  imageUrl: 'https://s.gravatar.com/avatar/b226da5c619b18b44eb95c30be393953?s=80'
}, {
  name: 'Bryan Jacquot',
  imageUrl: 'https://s.gravatar.com/avatar/10d15019166606cfed23846a7f902660?s=80'
}, {
  name: 'Chris Carlozzi',
  imageUrl: 'https://s.gravatar.com/avatar/56ea1e2ecd0d3cc85479b2d09e31d071?s=80'
}, {
  name: 'Eric Soderberg',
  imageUrl: 'https://s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80'
}, {
  name: 'Marlon Parizzotto',
  imageUrl: 'https://s.gravatar.com/avatar/e6684969375a4dcc0aa99f0bfae544c3?s=80'
}, {
  name: 'Tales Chaves',
  imageUrl: 'https://s.gravatar.com/avatar/1f80adca55d9f5d97932ff97f631a4e8?s=80'
}, {
  name: 'Tracy Barmore',
  imageUrl: 'https://s.gravatar.com/avatar/4ec9c3a91da89f278e4482811caad7f3?s=80'
}];

var CustomSuggestionsTextInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CustomSuggestionsTextInput, _Component);

  function CustomSuggestionsTextInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: '',
      suggestionOpen: false,
      suggestedFolks: []
    });

    _defineProperty(_assertThisInitialized(_this), "boxRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      return _this.setState({
        value: event.target.value
      }, function () {
        var value = _this.state.value;

        if (!value.trim()) {
          _this.setState({
            suggestedFolks: []
          });
        } else {
          // simulate an async call to the backend
          setTimeout(function () {
            return _this.setState({
              suggestedFolks: folks
            });
          }, 300);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (event) {
      return _this.setState({
        value: event.suggestion.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderSuggestions", function () {
      var _this$state = _this.state,
          value = _this$state.value,
          suggestedFolks = _this$state.suggestedFolks;
      return suggestedFolks.filter(function (_ref) {
        var name = _ref.name;
        return name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
      }).map(function (_ref2, index, list) {
        var name = _ref2.name,
            imageUrl = _ref2.imageUrl;
        return {
          label: React.createElement(Box, {
            direction: "row",
            align: "center",
            gap: "small",
            border: index < list.length - 1 ? 'bottom' : undefined,
            pad: "small"
          }, React.createElement(Image, {
            width: "48px",
            src: imageUrl,
            style: {
              borderRadius: '100%'
            }
          }), React.createElement(Text, null, React.createElement("strong", null, name))),
          value: name
        };
      });
    });

    return _this;
  }

  var _proto = CustomSuggestionsTextInput.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.forceUpdate();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$state2 = this.state,
        suggestionOpen = _this$state2.suggestionOpen,
        value = _this$state2.value;
    return React.createElement(Grommet, {
      theme: myCustomTheme,
      full: true
    }, React.createElement(Box, {
      background: "dark-1",
      fill: true,
      align: "center",
      pad: {
        top: 'large'
      }
    }, React.createElement(Box, {
      ref: this.boxRef,
      width: "large",
      direction: "row",
      align: "center",
      pad: {
        horizontal: 'small',
        vertical: 'xsmall'
      },
      round: "small",
      elevation: suggestionOpen ? 'medium' : undefined,
      border: {
        side: 'all',
        color: suggestionOpen ? 'transparent' : 'border'
      },
      style: suggestionOpen ? {
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px'
      } : undefined
    }, React.createElement(Search, {
      color: "brand"
    }), React.createElement(TextInput, {
      type: "search",
      dropTarget: this.boxRef.current,
      plain: true,
      value: value,
      onChange: this.onChange,
      onSelect: this.onSelect,
      suggestions: this.renderSuggestions(),
      placeholder: "Enter your name...",
      onSuggestionsOpen: function onSuggestionsOpen() {
        return _this2.setState({
          suggestionOpen: true
        });
      },
      onSuggestionsClose: function onSuggestionsClose() {
        return _this2.setState({
          suggestionOpen: false
        });
      }
    }))));
  };

  return CustomSuggestionsTextInput;
}(Component);

storiesOf('TextInput', module).add('Custom', function () {
  return React.createElement(CustomSuggestionsTextInput, null);
});