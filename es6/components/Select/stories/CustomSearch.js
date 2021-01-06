import React, { useRef, useState, useEffect } from 'react';
import { FormClose } from "grommet-icons/es6/icons/FormClose";
import { Box, Button, CheckBox, Grommet, Select, Text } from 'grommet'; // https://github.com/grommet/grommet/blob/master/src/js/components/Select/stories/theme.js

import { theme as customSearchTheme } from './theme';
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
export var CustomSearch = function CustomSearch() {
  var _useState = useState([]),
      selectedContentPartners = _useState[0],
      setSelectedContentPartners = _useState[1];

  var _useState2 = useState(allContentPartners),
      contentPartners = _useState2[0],
      setContentPartners = _useState2[1];

  var _useState3 = useState(false),
      searching = _useState3[0],
      setSearching = _useState3[1];

  var _useState4 = useState(''),
      searchQuery = _useState4[0],
      setSearchQuery = _useState4[1];

  var selectRef = useRef();

  var clearContentPartners = function clearContentPartners() {
    setSelectedContentPartners([]);
  };

  useEffect(function () {
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
    return /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      align: "center",
      pad: "small",
      flex: false
    }, /*#__PURE__*/React.createElement(CheckBox, {
      tabIndex: "-1",
      checked: selectedContentPartners.some(function (partner) {
        return partner.name === name;
      }),
      label: /*#__PURE__*/React.createElement(Text, {
        size: "small"
      }, name),
      onChange: function onChange() {}
    }));
  };

  var renderContentPartners = function renderContentPartners() {
    return /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      gap: "xsmall",
      pad: {
        left: 'small',
        vertical: 'small'
      },
      align: "center",
      flex: true
    }, /*#__PURE__*/React.createElement(Box, {
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
    }, /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, selectedContentPartners.length)), /*#__PURE__*/React.createElement(Box, {
      flex: true
    }, /*#__PURE__*/React.createElement(Text, {
      size: "small",
      truncate: true
    }, selectedContentPartners.map(function (_ref2) {
      var name = _ref2.name;
      return name;
    }).join(', '))), /*#__PURE__*/React.createElement(Button, {
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
    }, /*#__PURE__*/React.createElement(Box, {
      background: "gray",
      round: "full"
    }, /*#__PURE__*/React.createElement(FormClose, {
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

  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: customSearchTheme
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center",
    width: "medium"
  }, /*#__PURE__*/React.createElement(Select, {
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
CustomSearch.story = {
  name: 'Custom search'
};