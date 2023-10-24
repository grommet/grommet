"use strict";

exports.__esModule = true;
exports["default"] = exports.OnUpdateDataTable = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } /* eslint-disable no-param-reassign */ // Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
// The key of the header selection state in groupBy.select
// Other keys in groupBy.select will be group id's.
var HEADER_KEY = '';
var SELECTED = {
  none: 'none',
  some: 'some',
  all: 'all'
};
var expandable = [].concat(_data.locations);

// copy groupColumns but remove the primaryKey from any that have it.
var columns = _data.groupColumns.map(function (col) {
  return _extends({}, col, {
    primary: false
  });
});
var numExtra = 20;
var buildGroups = function buildGroups() {
  var data = [].concat(_data.DATA);

  // Add some extra people to each location
  _data.locations.forEach(function (location, index) {
    for (var i = 0; i < numExtra * (index + 1); i += 1) {
      data.push({
        name: location[0] + "Name" + i,
        location: location,
        date: _data.DATA[index % _data.DATA.length].date,
        percent: _data.DATA[index % _data.DATA.length].percent,
        paid: _data.DATA[index % _data.DATA.length].paid
      });
    }
  });
  var groupKeys = [''].concat(expandable);
  var nextGroupMap = {};
  var nextGroups = groupKeys.map(function (id) {
    var members = data.filter(function (item) {
      return item.location === id;
    }).map(function (item) {
      return _extends({
        id: item.name
      }, item);
    });
    var group = {
      id: id,
      members: members,
      selected: false
    };
    nextGroupMap[id] = group;
    return group;
  });
  return [nextGroups, nextGroupMap];
};
var _buildGroups = buildGroups(),
  groups = _buildGroups[0],
  groupMap = _buildGroups[1];
var calcHeaderSelected = function calcHeaderSelected(nextGroupSelected, selected) {
  var _extends2;
  // Figure out if everything is selected or just partial or none.
  var totals = {
    all: 0,
    some: 0,
    none: 0
  };
  groups.forEach(function (group) {
    if (group.members.length > 0) {
      if (group.id) {
        var selectedValue = nextGroupSelected[group.id] || SELECTED.none;
        totals[selectedValue] += 1;
      } else {
        var keys = group.members.map(function (datum) {
          return datum.id;
        });
        var selectedMembers = keys.filter(function (key) {
          return selected.includes(key);
        }).length;
        if (selectedMembers === 0) {
          totals.none += 1;
        } else if (group.members.length === selectedMembers) {
          totals.all += 1;
        } else {
          totals.some += 1;
        }
      }
    }
  });
  var headerSelected = SELECTED.all;
  if (totals.all === 0 && totals.some === 0) {
    headerSelected = SELECTED.none;
  } else if (totals.some > 0 || totals.all > 0 && totals.none > 0) {
    headerSelected = SELECTED.some;
  }
  return _extends({}, nextGroupSelected, (_extends2 = {}, _extends2[HEADER_KEY] = headerSelected, _extends2));
};
var sortCompare = function sortCompare(a, b, sort) {
  var v1 = a[sort.property] || '';
  var v2 = b[sort.property] || '';
  var dir = sort.direction || 'asc';
  var result = 0;
  if (typeof v1 === 'string' && typeof v2 === 'string') {
    result = v1.localeCompare(v2, 'en', {
      sensitivity: 'base'
    });
  } else if (v1 === v2) {
    result = 0;
  } else if (v1 < v2) {
    result = -1;
  } else {
    result = 1;
  }
  return dir === 'desc' ? -result : result;
};
var getData = function getData(_ref) {
  var expanded = _ref.expanded,
    sort = _ref.sort,
    show = _ref.show,
    count = _ref.count;
  var items = [];

  // Sort the groups by location
  groups.sort(function (a, b) {
    var dir = (sort == null ? void 0 : sort.property) === 'location' ? sort.direction || 'asc' : 'asc';
    var result = a.id.localeCompare(b.id, 'en', {
      sensitivity: 'base'
    });
    return dir === 'desc' ? -result : result;
  });

  // add any non-empty groups to items. Also add members of
  // expanded groups.
  groups.forEach(function (_ref2) {
    var id = _ref2.id,
      members = _ref2.members;
    if (members.length > 0) {
      if (id) {
        var paid = members.reduce(function (prev, curr) {
          return prev + curr.paid;
        }, 0);
        items.push({
          id: id,
          name: id,
          paid: paid
        });
      }
      if (!id || expanded != null && expanded.includes(id)) {
        if (sort != null && sort.property) {
          members.sort(function (a, b) {
            return sortCompare(a, b, sort);
          });
        }
        items.push.apply(items, members);
      }
    }
  });
  var start = show || 0;
  var result = count ? items.slice(0, Math.max(count, start + count)) : items;
  return result;
};
var OnUpdateDataTable = exports.OnUpdateDataTable = function OnUpdateDataTable() {
  var step = 50;
  var _useState = (0, _react.useState)({}),
    groupSelected = _useState[0],
    setGroupSelected = _useState[1];
  var _useState2 = (0, _react.useState)([]),
    select = _useState2[0],
    setSelect = _useState2[1];
  var _useState3 = (0, _react.useState)(['Fort Collins']),
    expand = _useState3[0],
    setExpand = _useState3[1];
  var _useState4 = (0, _react.useState)(function () {
      return getData({
        expanded: expand,
        sort: {
          property: 'name',
          direction: 'asc'
        },
        count: step
      });
    }),
    data = _useState4[0],
    setData = _useState4[1];
  var onSelect = (0, _react.useCallback)(function (selected, row) {
    var groupUpdates = {};
    if (row != null && row.location) {
      // this is a member of a group. Update the group selection state
      var memberKeys = groupMap[row.location].members.map(function (_ref3) {
        var id = _ref3.id;
        return id;
      });
      var selectedMembers = selected.filter(function (s) {
        return memberKeys.includes(s);
      });
      if (selectedMembers.length === 0) {
        groupUpdates[row.location] = SELECTED.none;
      } else if (selectedMembers.length === memberKeys.length) {
        groupUpdates[row.location] = SELECTED.all;
      } else {
        groupUpdates[row.location] = SELECTED.some;
      }
    }
    setGroupSelected(function (prev) {
      return calcHeaderSelected(_extends({}, prev, groupUpdates), selected);
    });
    setSelect(selected);
  }, []);
  var onGroupSelect = (0, _react.useCallback)(function (selected, row, groupBySelected) {
    var nextSelected;
    var nextGroupSelected;
    if (row) {
      var memberKeys = groupMap[row.id].members.map(function (_ref4) {
        var id = _ref4.id;
        return id;
      });
      nextGroupSelected = _extends({}, groupSelected);
      nextSelected = selected.filter(function (s) {
        return !memberKeys.includes(s);
      });
      if (groupSelected[row.id] === SELECTED.some || groupSelected[row.id] === SELECTED.all) {
        nextGroupSelected[row.id] = SELECTED.none;
      } else {
        nextSelected = [].concat(nextSelected, memberKeys);
        nextGroupSelected[row.id] = SELECTED.all;
      }
      nextGroupSelected = calcHeaderSelected(nextGroupSelected, nextSelected);
    } else {
      // The header was selected/deselected
      nextGroupSelected = {};
      nextSelected = [];
      if (groupBySelected[HEADER_KEY] === SELECTED.all) {
        // add all groups and keys
        groups.forEach(function (_ref5) {
          var id = _ref5.id,
            members = _ref5.members;
          if (members.length > 0) {
            var _nextSelected;
            if (id) {
              nextGroupSelected[id] = SELECTED.all;
            }
            (_nextSelected = nextSelected).push.apply(_nextSelected, members.map(function (datum) {
              return datum.id;
            }));
          }
        });
        nextGroupSelected[HEADER_KEY] = SELECTED.all;
      } else {
        nextSelected = [];
      }
    }
    setSelect(nextSelected);
    setGroupSelected(nextGroupSelected);
  }, [groupSelected]);
  var groupBy = (0, _react.useMemo)(function () {
    return {
      expandable: expandable,
      expand: expand,
      select: groupSelected,
      property: 'location',
      onSelect: onGroupSelect
    };
  }, [expand, groupSelected, onGroupSelect]);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      primaryKey: "id",
      columns: columns,
      data: data,
      sortable: true,
      replace: true,
      groupBy: groupBy,
      onSelect: onSelect,
      onUpdate: function onUpdate(opts) {
        setExpand(opts.expanded);
        setData(getData(opts));
      },
      select: select,
      step: step
    }))
    // </Grommet>
  );
};

OnUpdateDataTable.storyName = 'OnUpdate';
var _default = exports["default"] = {
  title: 'Visualizations/DataTable/OnUpdate'
};