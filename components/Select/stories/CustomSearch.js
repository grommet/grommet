"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomSearch = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _theme = require("./theme");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// https://github.com/grommet/grommet/blob/master/src/js/components/Select/stories/theme.js
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

var CustomSearch = function CustomSearch() {
  var _useState = (0, _react.useState)([]),
      selectedContentPartners = _useState[0],
      setSelectedContentPartners = _useState[1];

  var _useState2 = (0, _react.useState)(allContentPartners),
      contentPartners = _useState2[0],
      setContentPartners = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      searching = _useState3[0],
      setSearching = _useState3[1];

  var _useState4 = (0, _react.useState)(''),
      searchQuery = _useState4[0],
      setSearchQuery = _useState4[1];

  var selectRef = (0, _react.useRef)();

  var clearContentPartners = function clearContentPartners() {
    setSelectedContentPartners([]);
  };

  (0, _react.useEffect)(function () {
    var filterContentPartners = allContentPartners.filter(function (s) {
      return s.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0;
    });
    setTimeout(function () {
      setSearching(false);
      setContentPartners(filterContentPartners);
    }, 500);
  }, [searching, searchQuery]);

  var renderOption = function renderOption(_ref) {
    var name = _ref.name;
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      align: "center",
      pad: "small",
      flex: false
    }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
      tabIndex: "-1",
      checked: selectedContentPartners.some(function (partner) {
        return partner.name === name;
      }),
      label: /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        size: "small"
      }, name),
      onChange: function onChange() {}
    }));
  };

  var renderContentPartners = function renderContentPartners() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      gap: "xsmall",
      pad: {
        left: 'small',
        vertical: 'small'
      },
      align: "center",
      flex: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
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
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, selectedContentPartners.length)), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      flex: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small",
      truncate: true
    }, selectedContentPartners.length > 1 ? 'multiple' : selectedContentPartners.map(function (_ref2) {
      var name = _ref2.name;
      return name;
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      href: "#",
      onFocus: function onFocus(event) {
        return event.stopPropagation();
      },
      onClick: function onClick(event) {
        event.preventDefault();
        event.stopPropagation();
        clearContentPartners();
        selectRef.current.focus();
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: "gray",
      round: "full"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormClose, {
      style: {
        width: '12px',
        height: '12px'
      }
    }))));
  };

  var sortContentPartners = function sortContentPartners(selectedPartnerNames) {
    return function (p1, p2) {
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
    };
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _theme.theme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center",
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    ref: selectRef,
    closeOnChange: false,
    placeholder: "Select Content Partners",
    searchPlaceholder: "Search Content Partners",
    emptySearchMessage: "No partners found",
    searching: searching,
    multiple: true,
    value: selectedContentPartners.length ? renderContentPartners() : undefined,
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
      var sortedContentPartners = [].concat(allContentPartners).sort(sortContentPartners(selectedPartnerNames));
      setSelectedContentPartners(newSelectedPartners);
      setContentPartners(sortedContentPartners);
    },
    onSearch: function onSearch(query) {
      setSearching(true);
      setSearchQuery(query);
    }
  }, renderOption)));
};

exports.CustomSearch = CustomSearch;
CustomSearch.storyName = 'Custom search';
var _default = {
  title: 'Input/Select/Custom search'
};
exports["default"] = _default;