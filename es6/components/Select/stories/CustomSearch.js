function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { createRef, Component } from 'react';
import { storiesOf } from '@storybook/react';
import { FormClose } from "grommet-icons/es6/icons/FormClose";
import { Box, Button, CheckBox, Grommet, Select, Text } from 'grommet';
import { theme as customSearchTheme } from './theme';
import { SearchInputContext } from './components/SearchInputContext';
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

    _defineProperty(_assertThisInitialized(_this), "selectRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "clearContentPartners", function () {
      return _this.setState({
        selectedContentPartners: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderOption", function (_ref) {
      var name = _ref.name;
      var selectedContentPartners = _this.state.selectedContentPartners;
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

    _defineProperty(_assertThisInitialized(_this), "renderContentPartners", function () {
      var selectedContentPartners = _this.state.selectedContentPartners;
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
      }, selectedContentPartners.map(function (_ref2) {
        var name = _ref2.name;
        return name;
      }).join(', '))), React.createElement(Button, {
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

    return _this;
  }

  var _proto = CustomSearchSelect.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        contentPartners = _this$state.contentPartners,
        searching = _this$state.searching,
        selectedContentPartners = _this$state.selectedContentPartners;
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
}(Component);

storiesOf('Select', module).add('Custom Search', function () {
  return React.createElement(CustomSearchSelect, null);
});