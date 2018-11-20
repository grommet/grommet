function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { createRef, Component, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { FormClose } from "grommet-icons/es6/icons/FormClose";
import { Box, Button, CheckBox, Grommet, Select, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { theme as customSearchTheme } from './theme';
import { SearchInputContext } from './components/SearchInputContext';
var customRoundedTheme = deepMerge(grommet, {
  global: {
    control: {
      border: {
        radius: '24px'
      }
    },
    input: {
      weight: 400
    },
    font: {
      size: '12px'
    }
  },
  text: {
    medium: '13px'
  },
  textInput: {
    extend: 'padding: 0 12px;'
  },
  select: {
    control: {
      extend: 'padding: 3px 6px;'
    }
  }
});

var SimpleSelect =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleSelect, _Component);

  function SimpleSelect() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      options: ['one', 'two'],
      value: ''
    });

    return _this;
  }

  var _proto = SimpleSelect.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var theme = this.props.theme;
    var _this$state = this.state,
        options = _this$state.options,
        value = _this$state.value;
    return React.createElement(Grommet, {
      full: true,
      theme: theme || grommet
    }, React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, React.createElement(Select, {
      id: "select",
      name: "select",
      placeholder: "Select",
      value: value,
      options: options,
      onChange: function onChange(_ref) {
        var option = _ref.option;
        return _this2.setState({
          value: option
        });
      }
    })));
  };

  return SimpleSelect;
}(Component);

_defineProperty(SimpleSelect, "propTypes", {
  theme: PropTypes.shape({})
});

_defineProperty(SimpleSelect, "defaultProps", {
  theme: undefined
});

var DEFAULT_OPTIONS = [];

for (var i = 1; i <= 200; i += 1) {
  DEFAULT_OPTIONS.push("option " + i);
}

var SearchSelect =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(SearchSelect, _Component2);

  function SearchSelect() {
    var _this3;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "state", {
      options: DEFAULT_OPTIONS,
      value: ''
    });

    return _this3;
  }

  var _proto2 = SearchSelect.prototype;

  _proto2.render = function render() {
    var _this4 = this;

    var _this$state2 = this.state,
        options = _this$state2.options,
        value = _this$state2.value;
    return React.createElement(Grommet, {
      full: true,
      theme: grommet
    }, React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, React.createElement(Select, {
      size: "medium",
      placeholder: "Select",
      value: value,
      options: options,
      onChange: function onChange(_ref2) {
        var option = _ref2.option;
        return _this4.setState({
          value: option
        });
      },
      onClose: function onClose() {
        return _this4.setState({
          options: DEFAULT_OPTIONS
        });
      },
      onSearch: function onSearch(text) {
        var exp = new RegExp(text, 'i');

        _this4.setState({
          options: DEFAULT_OPTIONS.filter(function (o) {
            return exp.test(o);
          })
        });
      }
    })));
  };

  return SearchSelect;
}(Component);

var allSeasons = ['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07', 'S08', 'S09', 'S10'];

var SeasonsSelect =
/*#__PURE__*/
function (_Component3) {
  _inheritsLoose(SeasonsSelect, _Component3);

  function SeasonsSelect() {
    var _this5;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this5 = _Component3.call.apply(_Component3, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this5)), "state", {
      selected: []
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this5)), "onRemoveSeason", function (season) {
      var selected = _this5.state.selected;
      var nextSelected = selected.concat();
      nextSelected.splice(nextSelected.indexOf(allSeasons.indexOf(season)), 1);

      _this5.setState({
        selected: nextSelected
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this5)), "renderSeason", function (season) {
      return React.createElement(Button, {
        key: "season_tag_" + season,
        href: "#",
        onClick: function onClick(event) {
          event.preventDefault();
          event.stopPropagation();

          _this5.onRemoveSeason(season);
        },
        onFocus: function onFocus(event) {
          return event.stopPropagation();
        }
      }, React.createElement(Box, {
        align: "center",
        direction: "row",
        gap: "xsmall",
        pad: {
          vertical: 'xsmall',
          horizontal: 'small'
        },
        margin: "xsmall",
        background: "accent-1",
        round: "large"
      }, React.createElement(Text, {
        size: "small",
        color: "white"
      }, season), React.createElement(Box, {
        background: "white",
        round: "full",
        margin: {
          left: 'xsmall'
        }
      }, React.createElement(FormClose, {
        color: "accent-1",
        size: "small",
        style: {
          width: '12px',
          height: '12px'
        }
      }))));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this5)), "renderOption", function (option, index, options, state) {
      return React.createElement(Box, {
        pad: "small",
        background: state.active ? 'active' : undefined
      }, option);
    });

    return _this5;
  }

  var _proto3 = SeasonsSelect.prototype;

  _proto3.render = function render() {
    var _this6 = this;

    var selected = this.state.selected;
    return React.createElement(Grommet, {
      full: true,
      theme: grommet
    }, React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, React.createElement(Select, {
      placeholder: "Select Season",
      closeOnChange: false,
      multiple: true,
      value: selected && selected.length ? React.createElement(Box, {
        wrap: true,
        direction: "row",
        style: {
          width: '208px'
        }
      }, selected.map(function (index) {
        return _this6.renderSeason(allSeasons[index]);
      })) : undefined,
      options: allSeasons,
      selected: selected,
      disabled: [2, 6],
      onChange: function onChange(_ref3) {
        var nextSelected = _ref3.selected;

        _this6.setState({
          selected: nextSelected.sort()
        });
      }
    }, this.renderOption)));
  };

  return SeasonsSelect;
}(Component);

var allContentPartners = [{
  name: 'Test Partner',
  id: '32131232'
}, {
  name: 'Test Partner 1',
  id: '32131232'
}, {
  name: 'Test Partner 2',
  id: '32131242'
}, {
  name: 'Test Partner 3',
  id: '32131252'
}, {
  name: 'Test Partner 4',
  id: '32131262'
}, {
  name: 'Test Partner 5',
  id: '32131272'
}, {
  name: 'Test Partner 6',
  id: '32131231'
}, {
  name: 'Test Partner 7',
  id: '32131234'
}, {
  name: 'Test Partner 8',
  id: '32131245'
}, {
  name: 'Test Partner 9',
  id: '32131256'
}, {
  name: 'Test Partner 10',
  id: '32131269'
}, {
  name: 'Test Partner 11',
  id: '32131244'
}];

var CustomSearchSelect =
/*#__PURE__*/
function (_Component4) {
  _inheritsLoose(CustomSearchSelect, _Component4);

  function CustomSearchSelect() {
    var _this7;

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    _this7 = _Component4.call.apply(_Component4, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this7)), "state", {
      contentPartners: allContentPartners,
      selectedContentPartners: [],
      searching: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this7)), "selectRef", createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this7)), "clearContentPartners", function () {
      return _this7.setState({
        selectedContentPartners: []
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this7)), "renderOption", function (_ref4) {
      var name = _ref4.name;
      var selectedContentPartners = _this7.state.selectedContentPartners;
      return React.createElement(Box, {
        direction: "row",
        align: "center",
        pad: "small",
        flex: false
      }, React.createElement(CheckBox, {
        tabIndex: "-1",
        checked: selectedContentPartners.some(function (partner) {
          return partner.name === name;
        }),
        label: React.createElement(Text, {
          size: "small"
        }, name),
        onChange: function onChange() {}
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this7)), "renderContentPartners", function () {
      var selectedContentPartners = _this7.state.selectedContentPartners;
      return React.createElement(Box, {
        direction: "row",
        gap: "xsmall",
        pad: {
          left: 'small',
          vertical: 'small'
        },
        align: "center",
        flex: true
      }, React.createElement(Box, {
        background: "brand",
        round: "medium",
        align: "center",
        justify: "center",
        pad: {
          horizontal: 'xsmall'
        },
        style: {
          minWidth: '21px'
        }
      }, React.createElement(Text, {
        size: "small"
      }, selectedContentPartners.length)), React.createElement(Box, {
        flex: true
      }, React.createElement(Text, {
        size: "small",
        truncate: true
      }, selectedContentPartners.map(function (_ref5) {
        var name = _ref5.name;
        return name;
      }).join(', '))), React.createElement(Button, {
        href: "#",
        onFocus: function onFocus(event) {
          return event.stopPropagation();
        },
        onClick: function onClick(event) {
          event.preventDefault();
          event.stopPropagation();

          _this7.clearContentPartners();
          /* eslint-disable-next-line react/no-find-dom-node */


          findDOMNode(_this7.selectRef.current).focus();
        }
      }, React.createElement(Box, {
        background: "gray",
        round: "full"
      }, React.createElement(FormClose, {
        style: {
          width: '12px',
          height: '12px'
        }
      }))));
    });

    return _this7;
  }

  var _proto4 = CustomSearchSelect.prototype;

  _proto4.render = function render() {
    var _this8 = this;

    var _this$state3 = this.state,
        contentPartners = _this$state3.contentPartners,
        searching = _this$state3.searching,
        selectedContentPartners = _this$state3.selectedContentPartners;
    return React.createElement(Grommet, {
      full: true,
      theme: customSearchTheme
    }, React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center",
      width: "medium"
    }, React.createElement(SearchInputContext.Provider, {
      value: {
        searching: searching
      }
    }, React.createElement(Select, {
      ref: this.selectRef,
      closeOnChange: false,
      placeholder: "Select Content Partners",
      searchPlaceholder: "Search Content Partners",
      multiple: true,
      value: selectedContentPartners.length ? this.renderContentPartners() : undefined,
      selected: selectedContentPartners.map(function (option) {
        return contentPartners.indexOf(option);
      }),
      options: contentPartners,
      onChange: function onChange(_ref6) {
        var option = _ref6.option;
        var newSelectedPartners = selectedContentPartners.concat();
        var seasonIndex = newSelectedPartners.map(function (_ref7) {
          var name = _ref7.name;
          return name;
        }).indexOf(option.name);

        if (seasonIndex >= 0) {
          newSelectedPartners.splice(seasonIndex, 1);
        } else {
          newSelectedPartners.push(option);
        }

        var selectedPartnerNames = newSelectedPartners.map(function (_ref8) {
          var name = _ref8.name;
          return name;
        });

        _this8.setState({
          selectedContentPartners: newSelectedPartners,
          contentPartners: allContentPartners.sort(function (p1, p2) {
            var p1Exists = selectedPartnerNames.includes(p1.name);
            var p2Exists = selectedPartnerNames.includes(p2.name);

            if (!p1Exists && p2Exists) {
              return 1;
            }

            if (p1Exists && !p2Exists) {
              return -1;
            }

            if (p1.name.toLowerCase() < p2.name.toLowerCase()) {
              return -1;
            }

            return 1;
          })
        });
      },
      onSearch: function onSearch(query) {
        _this8.setState({
          searching: true
        }, function () {
          setTimeout(function () {
            _this8.setState({
              searching: false,
              contentPartners: allContentPartners.filter(function (s) {
                return s.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
              })
            });
          }, 500);
        });
      }
    }, this.renderOption))));
  };

  return CustomSearchSelect;
}(Component);

var DarkSelect =
/*#__PURE__*/
function (_Component5) {
  _inheritsLoose(DarkSelect, _Component5);

  function DarkSelect() {
    var _this9;

    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    _this9 = _Component5.call.apply(_Component5, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this9)), "state", {
      options: ['one', 'two'],
      value: ''
    });

    return _this9;
  }

  var _proto5 = DarkSelect.prototype;

  _proto5.render = function render() {
    var _this10 = this;

    var _this$state4 = this.state,
        options = _this$state4.options,
        value = _this$state4.value;
    return React.createElement(Grommet, _extends({
      full: true,
      theme: grommet
    }, this.props), React.createElement(Box, {
      fill: true,
      background: "dark-1",
      align: "center",
      justify: "center"
    }, React.createElement(Select, {
      placeholder: "Select",
      value: value,
      options: options,
      onChange: function onChange(_ref9) {
        var option = _ref9.option;
        return _this10.setState({
          value: option
        });
      }
    })));
  };

  return DarkSelect;
}(Component);

var Option =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Option, _PureComponent);

  function Option() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto6 = Option.prototype;

  _proto6.render = function render() {
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

var dummyOptions = Array(2000).fill().map(function (_, i) {
  return "option " + i;
}).sort();
var theme = deepMerge(grommet, {
  select: {
    step: 100
  }
});

var ManyOptions =
/*#__PURE__*/
function (_Component6) {
  _inheritsLoose(ManyOptions, _Component6);

  function ManyOptions() {
    var _this11;

    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    _this11 = _Component6.call.apply(_Component6, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this11)), "state", {
      selected: [],
      options: dummyOptions
    });

    return _this11;
  }

  var _proto7 = ManyOptions.prototype;

  _proto7.render = function render() {
    var _this12 = this;

    var _this$state5 = this.state,
        options = _this$state5.options,
        selected = _this$state5.selected;
    return React.createElement(Grommet, {
      theme: theme
    }, React.createElement(Box, {
      pad: "xsmall"
    }, React.createElement(Select, {
      multiple: true,
      closeOnChange: false,
      placeholder: "select an option...",
      value: selected,
      options: options,
      onClose: function onClose() {
        return _this12.setState({
          options: options.sort(function (p1, p2) {
            var p1Exists = selected.includes(p1);
            var p2Exists = selected.includes(p2);

            if (!p1Exists && p2Exists) {
              return 1;
            }

            if (p1Exists && !p2Exists) {
              return -1;
            }

            return p1.localeCompare(p2);
          })
        });
      },
      onChange: function onChange(_ref10) {
        var option = _ref10.option;
        var newSelected = selected.concat();
        var selectedIndex = newSelected.indexOf(option);

        if (selectedIndex >= 0) {
          newSelected.splice(selectedIndex, 1);
        } else {
          newSelected.push(option);
        }

        _this12.setState({
          selected: newSelected
        });
      }
    }, function (option) {
      return React.createElement(Option, {
        value: option,
        selected: selected.indexOf(option) >= 0
      });
    })));
  };

  return ManyOptions;
}(Component);

storiesOf('Select', module).add('Simple Select', function () {
  return React.createElement(SimpleSelect, null);
}).add('Search Select', function () {
  return React.createElement(SearchSelect, null);
}).add('Seasons Select', function () {
  return React.createElement(SeasonsSelect, null);
}).add('Custom Search', function () {
  return React.createElement(CustomSearchSelect, null);
}).add('Dark', function () {
  return React.createElement(DarkSelect, null);
}).add('Custom Colors', function () {
  return React.createElement(DarkSelect, {
    theme: {
      global: {
        font: {
          family: 'Arial'
        }
      },
      select: {
        background: '#000000',
        iconColor: '#d3d3d3'
      }
    }
  });
}).add('Custom Rounded', function () {
  return React.createElement(SimpleSelect, {
    theme: customRoundedTheme
  });
}).add('Lots of options', function () {
  return React.createElement(ManyOptions, null);
});