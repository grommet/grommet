"use strict";

exports.__esModule = true;
exports.DataTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Header = require("./Header");

var _Footer = require("./Footer");

var _Body = require("./Body");

var _GroupedBody = require("./GroupedBody");

var _buildState = require("./buildState");

var _StyledDataTable = require("./StyledDataTable");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DataTable =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(DataTable, _Component);

  function DataTable() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "onFiltering", function (property) {
      _this.setState({
        filtering: property
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onFilter", function (property, value) {
      /* eslint-disable-next-line react/prop-types */
      var onSearch = _this.props.onSearch;
      var filters = _this.state.filters;

      var nextFilters = _extends({}, filters);

      nextFilters[property] = value;

      _this.setState({
        filters: nextFilters
      }); // Let caller know about search, if interested


      if (onSearch) {
        onSearch(nextFilters);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSort", function (property) {
      return function () {
        var sort = _this.state.sort;
        var ascending = sort && property === sort.property ? !sort.ascending : true;

        _this.setState({
          sort: {
            property: property,
            ascending: ascending
          }
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onToggleGroup", function (groupValue) {
      return function () {
        var groupState = _this.state.groupState;

        var nextGroupState = _extends({}, groupState);

        nextGroupState[groupValue] = _extends({}, nextGroupState[groupValue], {
          expanded: !nextGroupState[groupValue].expanded
        });

        _this.setState({
          groupState: nextGroupState
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onToggleGroups", function () {
      var groupState = _this.state.groupState;
      var expanded = Object.keys(groupState).filter(function (k) {
        return !groupState[k].expanded;
      }).length === 0;
      var nextGroupState = {};
      Object.keys(groupState).forEach(function (k) {
        nextGroupState[k] = _extends({}, groupState[k], {
          expanded: !expanded
        });
      });

      _this.setState({
        groupState: nextGroupState
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onResize", function (property) {
      return function (width) {
        var widths = _this.state.widths;

        var nextWidths = _extends({}, widths || {});

        nextWidths[property] = width;

        _this.setState({
          widths: nextWidths
        });
      };
    });

    return _this;
  }

  DataTable.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    return (0, _buildState.buildState)(nextProps, prevState);
  };

  var _proto = DataTable.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        columns = _this$props.columns,
        propsData = _this$props.data,
        groupBy = _this$props.groupBy,
        onMore = _this$props.onMore,
        resizeable = _this$props.resizeable,
        size = _this$props.size,
        sortable = _this$props.sortable,
        step = _this$props.step,
        onSearch = _this$props.onSearch,
        rest = _objectWithoutPropertiesLoose(_this$props, ["columns", "data", "groupBy", "onMore", "resizeable", "size", "sortable", "step", "onSearch"]);

    var _this$state = this.state,
        data = _this$state.data,
        filtering = _this$state.filtering,
        filters = _this$state.filters,
        footerValues = _this$state.footerValues,
        groups = _this$state.groups,
        groupState = _this$state.groupState,
        primaryProperty = _this$state.primaryProperty,
        showFooter = _this$state.showFooter,
        sort = _this$state.sort,
        widths = _this$state.widths;

    if (size && resizeable) {
      console.warn('DataTable cannot combine "size" and "resizeble".');
    }

    return _react.default.createElement(_StyledDataTable.StyledDataTable, rest, _react.default.createElement(_Header.Header, {
      columns: columns,
      filtering: filtering,
      filters: filters,
      groups: groups,
      groupState: groupState,
      size: size,
      sort: sort,
      widths: widths,
      onFiltering: this.onFiltering,
      onFilter: this.onFilter,
      onResize: resizeable ? this.onResize : undefined,
      onSort: sortable ? this.onSort : undefined,
      onToggle: this.onToggleGroups
    }), groups ? _react.default.createElement(_GroupedBody.GroupedBody, {
      columns: columns,
      groupBy: groupBy,
      groups: groups,
      groupState: groupState,
      primaryProperty: primaryProperty,
      onToggle: this.onToggleGroup
    }) : _react.default.createElement(_Body.Body, {
      columns: columns,
      data: data,
      onMore: onMore,
      primaryProperty: primaryProperty,
      size: size,
      step: step
    }), showFooter && _react.default.createElement(_Footer.Footer, {
      columns: columns,
      footerValues: footerValues,
      groups: groups,
      primaryProperty: primaryProperty,
      size: size
    }));
  };

  return DataTable;
}(_react.Component);

_defineProperty(DataTable, "defaultProps", {
  columns: [],
  data: [],
  step: 50
});

var DataTableDoc;

if (process.env.NODE_ENV !== 'production') {
  DataTableDoc = require('./doc').doc(DataTable); // eslint-disable-line global-require
}

var DataTableWrapper = DataTableDoc || DataTable;
exports.DataTable = DataTableWrapper;