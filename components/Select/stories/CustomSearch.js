"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _theme = require("./theme");

var _SearchInputContext = require("./components/SearchInputContext");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
function (_Component) {
  _inheritsLoose(CustomSearchSelect, _Component);

  function CustomSearchSelect() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      contentPartners: allContentPartners,
      selectedContentPartners: [],
      searching: false
    });

    _defineProperty(_assertThisInitialized(_this), "selectRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_this), "clearContentPartners", function () {
      return _this.setState({
        selectedContentPartners: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderOption", function (_ref) {
      var name = _ref.name;
      var selectedContentPartners = _this.state.selectedContentPartners;
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

    _defineProperty(_assertThisInitialized(_this), "renderContentPartners", function () {
      var selectedContentPartners = _this.state.selectedContentPartners;
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
      }, selectedContentPartners.map(function (_ref2) {
        var name = _ref2.name;
        return name;
      }).join(', '))), _react.default.createElement(_grommet.Button, {
        href: "#",
        onFocus: function onFocus(event) {
          return event.stopPropagation();
        },
        onClick: function onClick(event) {
          event.preventDefault();
          event.stopPropagation();

          _this.clearContentPartners();

          _this.selectRef.current.focus();
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

    return _this;
  }

  var _proto = CustomSearchSelect.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        contentPartners = _this$state.contentPartners,
        searching = _this$state.searching,
        selectedContentPartners = _this$state.selectedContentPartners;
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
      onChange: function onChange(_ref3) {
        var option = _ref3.option;
        var newSelectedPartners = [].concat(selectedContentPartners);
        var seasonIndex = newSelectedPartners.map(function (_ref4) {
          var name = _ref4.name;
          return name;
        }).indexOf(option.name);

        if (seasonIndex >= 0) {
          newSelectedPartners.splice(seasonIndex, 1);
        } else {
          newSelectedPartners.push(option);
        }

        var selectedPartnerNames = newSelectedPartners.map(function (_ref5) {
          var name = _ref5.name;
          return name;
        });

        _this2.setState({
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
        _this2.setState({
          searching: true
        }, function () {
          setTimeout(function () {
            _this2.setState({
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

(0, _react2.storiesOf)('Select', module).add('Custom Search', function () {
  return _react.default.createElement(CustomSearchSelect, null);
});