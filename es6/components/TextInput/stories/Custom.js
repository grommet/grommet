import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
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

var CustomSuggestionsTextInput = function CustomSuggestionsTextInput() {
  var _useState = useState(''),
      value = _useState[0],
      setValue = _useState[1];

  var _useState2 = useState(false),
      suggestionOpen = _useState2[0],
      setSuggestionOpen = _useState2[1];

  var _useState3 = useState([]),
      suggestedFolks = _useState3[0],
      setSuggestedFolks = _useState3[1];

  var _useState4 = useState(),
      updateState = _useState4[1];

  var forceUpdate = useCallback(function () {
    return updateState({});
  }, []);
  var boxRef = useRef();
  useEffect(function () {
    forceUpdate();
  }, [forceUpdate]);

  var onChange = function onChange(event) {
    var newValue = event.target.value;
    setValue(newValue);

    if (!newValue.trim()) {
      setSuggestedFolks([]);
    } else {
      // simulate an async call to the backend
      setTimeout(function () {
        return setSuggestedFolks(folks);
      }, 300);
    }
  };

  var onSelect = function onSelect(event) {
    return setValue(event.suggestion.value);
  };

  var onOpen = useCallback(function () {
    return setSuggestionOpen(true);
  }, [setSuggestionOpen]);
  var onClose = useCallback(function () {
    return setSuggestionOpen(false);
  }, [setSuggestionOpen]);
  var suggestions = useMemo(function () {
    return suggestedFolks.filter(function (_ref) {
      var name = _ref.name;
      return name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
    }).map(function (_ref2, index, list) {
      var name = _ref2.name,
          imageUrl = _ref2.imageUrl;
      return {
        label: /*#__PURE__*/React.createElement(Box, {
          direction: "row",
          align: "center",
          gap: "small",
          border: index < list.length - 1 ? 'bottom' : undefined,
          pad: "small"
        }, /*#__PURE__*/React.createElement(Image, {
          width: "48px",
          src: imageUrl,
          style: {
            borderRadius: '100%'
          }
        }), /*#__PURE__*/React.createElement(Text, null, /*#__PURE__*/React.createElement("strong", null, name))),
        value: name
      };
    });
  }, [suggestedFolks, value]);
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: myCustomTheme,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    background: "dark-1",
    fill: true,
    align: "center",
    pad: {
      top: 'large'
    }
  }, /*#__PURE__*/React.createElement(Box, {
    ref: boxRef,
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
  }, /*#__PURE__*/React.createElement(Search, {
    color: "brand"
  }), /*#__PURE__*/React.createElement(TextInput, {
    type: "search",
    dropTarget: boxRef.current,
    plain: true,
    value: value,
    onChange: onChange,
    onSelect: onSelect,
    suggestions: suggestions,
    placeholder: "Enter your name...",
    onSuggestionsOpen: onOpen,
    onSuggestionsClose: onClose
  }))));
};

storiesOf('TextInput', module).add('Custom', function () {
  return /*#__PURE__*/React.createElement(CustomSuggestionsTextInput, null);
});