"use strict";

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

var _theme = require("./theme");

var _SearchInputContext = require("./components/SearchInputContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var customRoundedTheme = (0, _utils.deepMerge)(_themes.grommet, {
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

    _defineProperty(_assertThisInitialized(_this), "state", {
      options: ['one', 'two'],
      value: ''
    });

    return _this;
  }

  var _proto = SimpleSelect.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        theme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["theme"]);

    var _this$state = this.state,
        options = _this$state.options,
        value = _this$state.value;
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: theme || _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, _react.default.createElement(_grommet.Select, _extends({
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
    }, rest))));
  };

  return SimpleSelect;
}(_react.Component);

_defineProperty(SimpleSelect, "propTypes", {
  theme: _propTypes.default.shape({})
});

_defineProperty(SimpleSelect, "defaultProps", {
  theme: undefined
});

var defaultOptions = [];
var objectOptions = [];

for (var i = 1; i <= 200; i += 1) {
  defaultOptions.push("option " + i);
  objectOptions.push({
    lab: "option " + i,
    val: i,
    dis: i % 5 === 0,
    sel: i % 13 === 0
  });
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

    _defineProperty(_assertThisInitialized(_this3), "state", {
      options: defaultOptions,
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
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, _react.default.createElement(_grommet.Select, {
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
          options: defaultOptions
        });
      },
      onSearch: function onSearch(text) {
        var exp = new RegExp(text, 'i');

        _this4.setState({
          options: defaultOptions.filter(function (o) {
            return exp.test(o);
          })
        });
      }
    })));
  };

  return SearchSelect;
}(_react.Component);

var SimpleMultiSelect =
/*#__PURE__*/
function (_Component3) {
  _inheritsLoose(SimpleMultiSelect, _Component3);

  function SimpleMultiSelect() {
    var _this5;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this5 = _Component3.call.apply(_Component3, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this5), "state", {
      options: defaultOptions,
      value: ''
    });

    return _this5;
  }

  var _proto3 = SimpleMultiSelect.prototype;

  _proto3.render = function render() {
    var _this6 = this;

    var _this$state3 = this.state,
        options = _this$state3.options,
        value = _this$state3.value;
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, _react.default.createElement(_grommet.Select, {
      size: "medium",
      placeholder: "Select",
      multiple: true,
      value: value,
      options: options,
      onChange: function onChange(_ref3) {
        var nextValue = _ref3.value;
        return _this6.setState({
          value: nextValue
        });
      },
      onClose: function onClose() {
        return _this6.setState({
          options: defaultOptions
        });
      },
      onSearch: function onSearch(text) {
        var exp = new RegExp(text, 'i');

        _this6.setState({
          options: defaultOptions.filter(function (o) {
            return exp.test(o);
          })
        });
      }
    })));
  };

  return SimpleMultiSelect;
}(_react.Component);

var ObjectMultiSelect =
/*#__PURE__*/
function (_Component4) {
  _inheritsLoose(ObjectMultiSelect, _Component4);

  function ObjectMultiSelect() {
    var _this7;

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    _this7 = _Component4.call.apply(_Component4, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this7), "state", {
      options: objectOptions,
      value: ''
    });

    return _this7;
  }

  var _proto4 = ObjectMultiSelect.prototype;

  _proto4.render = function render() {
    var _this8 = this;

    var _this$state4 = this.state,
        options = _this$state4.options,
        value = _this$state4.value;
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, _react.default.createElement(_grommet.Select, {
      size: "medium",
      placeholder: "Select",
      multiple: true,
      closeOnChange: false,
      disabledKey: "dis",
      labelKey: "lab",
      valueKey: "val",
      value: value,
      options: options,
      onChange: function onChange(_ref4) {
        var nextValue = _ref4.value;
        return _this8.setState({
          value: nextValue
        });
      },
      onClose: function onClose() {
        return _this8.setState({
          options: objectOptions
        });
      },
      onSearch: function onSearch(text) {
        var exp = new RegExp(text, 'i');

        _this8.setState({
          options: objectOptions.filter(function (o) {
            return exp.test(o.lab);
          })
        });
      }
    })));
  };

  return ObjectMultiSelect;
}(_react.Component);

var allSeasons = ['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07', 'S08', 'S09', 'S10'];

var SeasonsSelect =
/*#__PURE__*/
function (_Component5) {
  _inheritsLoose(SeasonsSelect, _Component5);

  function SeasonsSelect() {
    var _this9;

    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    _this9 = _Component5.call.apply(_Component5, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this9), "state", {
      selected: []
    });

    _defineProperty(_assertThisInitialized(_this9), "onRemoveSeason", function (season) {
      var selected = _this9.state.selected;
      var nextSelected = [].concat(selected);
      nextSelected.splice(nextSelected.indexOf(allSeasons.indexOf(season)), 1);

      _this9.setState({
        selected: nextSelected
      });
    });

    _defineProperty(_assertThisInitialized(_this9), "renderSeason", function (season) {
      return _react.default.createElement(_grommet.Button, {
        key: "season_tag_" + season,
        href: "#",
        onClick: function onClick(event) {
          event.preventDefault();
          event.stopPropagation();

          _this9.onRemoveSeason(season);
        },
        onFocus: function onFocus(event) {
          return event.stopPropagation();
        }
      }, _react.default.createElement(_grommet.Box, {
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
      }, _react.default.createElement(_grommet.Text, {
        size: "small",
        color: "white"
      }, season), _react.default.createElement(_grommet.Box, {
        background: "white",
        round: "full",
        margin: {
          left: 'xsmall'
        }
      }, _react.default.createElement(_grommetIcons.FormClose, {
        color: "accent-1",
        size: "small",
        style: {
          width: '12px',
          height: '12px'
        }
      }))));
    });

    _defineProperty(_assertThisInitialized(_this9), "renderOption", function (option, index, options, state) {
      return _react.default.createElement(_grommet.Box, {
        pad: "small",
        background: state.active ? 'active' : undefined
      }, option);
    });

    return _this9;
  }

  var _proto5 = SeasonsSelect.prototype;

  _proto5.render = function render() {
    var _this10 = this;

    var selected = this.state.selected;
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, _react.default.createElement(_grommet.Select, {
      closeOnChange: false,
      multiple: true,
      value: _react.default.createElement(_grommet.Box, {
        wrap: true,
        direction: "row",
        width: "small"
      }, selected && selected.length ? selected.map(function (index) {
        return _this10.renderSeason(allSeasons[index]);
      }) : _react.default.createElement(_grommet.Box, {
        pad: {
          vertical: 'xsmall',
          horizontal: 'small'
        },
        margin: "xsmall"
      }, "Select Season")),
      options: allSeasons,
      selected: selected,
      disabled: [2, 6],
      onChange: function onChange(_ref5) {
        var nextSelected = _ref5.selected;

        _this10.setState({
          selected: nextSelected.sort()
        });
      }
    }, this.renderOption)));
  };

  return SeasonsSelect;
}(_react.Component);

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
function (_Component6) {
  _inheritsLoose(CustomSearchSelect, _Component6);

  function CustomSearchSelect() {
    var _this11;

    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    _this11 = _Component6.call.apply(_Component6, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this11), "state", {
      contentPartners: allContentPartners,
      selectedContentPartners: [],
      searching: false
    });

    _defineProperty(_assertThisInitialized(_this11), "selectRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_this11), "clearContentPartners", function () {
      return _this11.setState({
        selectedContentPartners: []
      });
    });

    _defineProperty(_assertThisInitialized(_this11), "renderOption", function (_ref6) {
      var name = _ref6.name;
      var selectedContentPartners = _this11.state.selectedContentPartners;
      return _react.default.createElement(_grommet.Box, {
        direction: "row",
        align: "center",
        pad: "small",
        flex: false
      }, _react.default.createElement(_grommet.CheckBox, {
        tabIndex: "-1",
        checked: selectedContentPartners.some(function (partner) {
          return partner.name === name;
        }),
        label: _react.default.createElement(_grommet.Text, {
          size: "small"
        }, name),
        onChange: function onChange() {}
      }));
    });

    _defineProperty(_assertThisInitialized(_this11), "renderContentPartners", function () {
      var selectedContentPartners = _this11.state.selectedContentPartners;
      return _react.default.createElement(_grommet.Box, {
        direction: "row",
        gap: "xsmall",
        pad: {
          left: 'small',
          vertical: 'small'
        },
        align: "center",
        flex: true
      }, _react.default.createElement(_grommet.Box, {
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
      }, _react.default.createElement(_grommet.Text, {
        size: "small"
      }, selectedContentPartners.length)), _react.default.createElement(_grommet.Box, {
        flex: true
      }, _react.default.createElement(_grommet.Text, {
        size: "small",
        truncate: true
      }, selectedContentPartners.map(function (_ref7) {
        var name = _ref7.name;
        return name;
      }).join(', '))), _react.default.createElement(_grommet.Button, {
        href: "#",
        onFocus: function onFocus(event) {
          return event.stopPropagation();
        },
        onClick: function onClick(event) {
          event.preventDefault();
          event.stopPropagation();

          _this11.clearContentPartners();

          _this11.selectRef.current.focus();
        }
      }, _react.default.createElement(_grommet.Box, {
        background: "gray",
        round: "full"
      }, _react.default.createElement(_grommetIcons.FormClose, {
        style: {
          width: '12px',
          height: '12px'
        }
      }))));
    });

    return _this11;
  }

  var _proto6 = CustomSearchSelect.prototype;

  _proto6.render = function render() {
    var _this12 = this;

    var _this$state5 = this.state,
        contentPartners = _this$state5.contentPartners,
        searching = _this$state5.searching,
        selectedContentPartners = _this$state5.selectedContentPartners;
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: _theme.theme
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center",
      width: "medium"
    }, _react.default.createElement(_SearchInputContext.SearchInputContext.Provider, {
      value: {
        searching: searching
      }
    }, _react.default.createElement(_grommet.Select, {
      ref: this.selectRef,
      closeOnChange: false,
      placeholder: "Select Content Partners",
      searchPlaceholder: "Search Content Partners",
      emptySearchMessage: "No partners found",
      multiple: true,
      value: selectedContentPartners.length ? this.renderContentPartners() : undefined,
      selected: selectedContentPartners.map(function (option) {
        return contentPartners.indexOf(option);
      }),
      options: contentPartners,
      onChange: function onChange(_ref8) {
        var option = _ref8.option;
        var newSelectedPartners = [].concat(selectedContentPartners);
        var seasonIndex = newSelectedPartners.map(function (_ref9) {
          var name = _ref9.name;
          return name;
        }).indexOf(option.name);

        if (seasonIndex >= 0) {
          newSelectedPartners.splice(seasonIndex, 1);
        } else {
          newSelectedPartners.push(option);
        }

        var selectedPartnerNames = newSelectedPartners.map(function (_ref10) {
          var name = _ref10.name;
          return name;
        });

        _this12.setState({
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
        _this12.setState({
          searching: true
        }, function () {
          setTimeout(function () {
            _this12.setState({
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
}(_react.Component);

var DarkSelect =
/*#__PURE__*/
function (_Component7) {
  _inheritsLoose(DarkSelect, _Component7);

  function DarkSelect() {
    var _this13;

    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    _this13 = _Component7.call.apply(_Component7, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this13), "state", {
      options: ['one', 'two'],
      value: ''
    });

    return _this13;
  }

  var _proto7 = DarkSelect.prototype;

  _proto7.render = function render() {
    var _this14 = this;

    var _this$state6 = this.state,
        options = _this$state6.options,
        value = _this$state6.value;
    return _react.default.createElement(_grommet.Grommet, _extends({
      full: true,
      theme: _themes.grommet
    }, this.props), _react.default.createElement(_grommet.Box, {
      fill: true,
      background: "dark-1",
      align: "center",
      justify: "center"
    }, _react.default.createElement(_grommet.Select, {
      placeholder: "Select",
      value: value,
      options: options,
      onChange: function onChange(_ref11) {
        var option = _ref11.option;
        return _this14.setState({
          value: option
        });
      }
    })));
  };

  return DarkSelect;
}(_react.Component);

var Option =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Option, _PureComponent);

  function Option() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto8 = Option.prototype;

  _proto8.render = function render() {
    var _this$props2 = this.props,
        value = _this$props2.value,
        selected = _this$props2.selected;
    return _react.default.createElement(_grommet.Box, {
      direction: "row",
      gap: "small",
      align: "center",
      pad: "xsmall"
    }, _react.default.createElement(_grommet.CheckBox, {
      tabIndex: "-1",
      checked: selected,
      onChange: function onChange() {}
    }), value);
  };

  return Option;
}(_react.PureComponent);

var dummyOptions = Array(2000).fill().map(function (_, i) {
  return "option " + i;
}).sort(function (a, b) {
  return a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base'
  });
});

var ManyOptions =
/*#__PURE__*/
function (_Component8) {
  _inheritsLoose(ManyOptions, _Component8);

  function ManyOptions() {
    var _this15;

    for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }

    _this15 = _Component8.call.apply(_Component8, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this15), "state", {
      selected: [],
      options: dummyOptions
    });

    return _this15;
  }

  var _proto9 = ManyOptions.prototype;

  _proto9.render = function render() {
    var _this16 = this;

    var _this$state7 = this.state,
        options = _this$state7.options,
        selected = _this$state7.selected;
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, _react.default.createElement(_grommet.Select, {
      multiple: true,
      closeOnChange: false,
      placeholder: "select an option...",
      selected: selected,
      options: options,
      dropHeight: "medium",
      onClose: function onClose() {
        return _this16.setState({
          options: options.sort(function (p1, p2) {
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
          })
        });
      },
      onChange: function onChange(_ref12) {
        var nextSelected = _ref12.selected;

        _this16.setState({
          selected: nextSelected
        });
      }
    }, function (option, index) {
      return _react.default.createElement(Option, {
        value: option,
        selected: selected.indexOf(index) !== -1
      });
    })));
  };

  return ManyOptions;
}(_react.Component);

var CustomSelectValue =
/*#__PURE__*/
function (_Component9) {
  _inheritsLoose(CustomSelectValue, _Component9);

  function CustomSelectValue() {
    var _this17;

    for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }

    _this17 = _Component9.call.apply(_Component9, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this17), "state", {
      options: ['one', 'two'],
      value: undefined
    });

    return _this17;
  }

  var _proto10 = CustomSelectValue.prototype;

  _proto10.render = function render() {
    var _this18 = this;

    var _this$state8 = this.state,
        options = _this$state8.options,
        value = _this$state8.value;
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, _react.default.createElement(_grommet.Select, _extends({
      id: "select",
      name: "select",
      placeholder: "Select",
      value: value,
      options: options,
      onChange: function onChange(_ref13) {
        var option = _ref13.option;
        return _this18.setState({
          value: option
        });
      },
      plain: true,
      valueLabel: _react.default.createElement(_grommet.Box, {
        background: "brand",
        width: "small",
        round: "small",
        overflow: "hidden",
        align: "center"
      }, value || 'Select...'),
      icon: false
    }, this.props))));
  };

  return CustomSelectValue;
}(_react.Component);

(0, _react2.storiesOf)('Select', module).add('Simple', function () {
  return _react.default.createElement(SimpleSelect, null);
}).add('Search', function () {
  return _react.default.createElement(SearchSelect, null);
}).add('Simple Multiple', function () {
  return _react.default.createElement(SimpleMultiSelect, null);
}).add('Object Multiple', function () {
  return _react.default.createElement(ObjectMultiSelect, null);
}).add('Seasons', function () {
  return _react.default.createElement(SeasonsSelect, null);
}).add('Custom Search', function () {
  return _react.default.createElement(CustomSearchSelect, null);
}).add('Dark', function () {
  return _react.default.createElement(DarkSelect, null);
}).add('Custom Colors', function () {
  return _react.default.createElement(DarkSelect, {
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
}).add('Custom', function () {
  return _react.default.createElement(SimpleSelect, {
    open: true,
    theme: customRoundedTheme
  });
}).add('Lots of options', function () {
  return _react.default.createElement(ManyOptions, null);
}).add('Custom Value', function () {
  return _react.default.createElement(CustomSelectValue, null);
}).add('Custom Icon', function () {
  return _react.default.createElement(CustomSelectValue, {
    icon: _grommetIcons.CaretDown
  });
});