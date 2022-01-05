"use strict";

exports.__esModule = true;
exports["default"] = exports.SpaceX = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var columns = [{
  property: 'name',
  header: 'Name',
  size: 'medium'
}, {
  property: 'rocket',
  header: 'Rocket',
  size: 'small'
}, {
  property: 'success',
  header: 'Success',
  size: 'xsmall',
  render: function render(datum) {
    if (datum.success === false) {
      var _datum$failures;

      var content = /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        width: {
          max: 'medium'
        }
      }, (_datum$failures = datum.failures) == null ? void 0 : _datum$failures.map(function (_ref) {
        var reason = _ref.reason;
        return /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, reason);
      }));

      return /*#__PURE__*/_react["default"].createElement(_grommet.Tip, {
        plain: true,
        content: content,
        dropProps: {
          round: 'medium',
          pad: 'small',
          background: 'background-back'
        }
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommetIcons.StatusCritical, {
        color: "red"
      })));
    }

    return undefined;
  }
}];

var processData = function processData(_ref2, groups, data) {
  var _ref2$show = _ref2.show,
      show = _ref2$show === void 0 ? 0 : _ref2$show,
      _ref2$count = _ref2.count,
      count = _ref2$count === void 0 ? 20 : _ref2$count;

  if (groups === void 0) {
    groups = [];
  }

  if (data === void 0) {
    data = [];
  }

  var items = [];
  groups.forEach(function (group) {
    items.push(group);
    var groupItems = data.filter(function (item) {
      var _item$rocket;

      return ((_item$rocket = item.rocket) == null ? void 0 : _item$rocket.id) === group.id;
    }).map(function (_ref3) {
      var id = _ref3.id,
          name = _ref3.name,
          rocket = _ref3.rocket,
          success = _ref3.success,
          failures = _ref3.failures;
      return {
        id: id,
        name: name,
        rocket: rocket.name,
        rocketId: rocket.id,
        success: success,
        failures: failures
      };
    });
    items.push.apply(items, groupItems);
  }); // TODO support paginate

  var start = show || 0;

  if (start + count > items.length) {
    start = Math.max(items.length - count, 0);
  }

  var result = count ? items.slice(start, start + count) : items;
  return result;
};

var SpaceX = function SpaceX() {
  var _useState = (0, _react.useState)([]),
      groups = _useState[0],
      setGroups = _useState[1];

  var _useState2 = (0, _react.useState)([]),
      expanded = _useState2[0],
      setExpanded = _useState2[1];

  var _useState3 = (0, _react.useState)({
    property: 'name',
    direction: 'asc'
  }),
      sort = _useState3[0],
      setSort = _useState3[1];

  var _useState4 = (0, _react.useState)([]),
      data = _useState4[0],
      setData = _useState4[1];

  var _useState5 = (0, _react.useState)(20),
      limit = _useState5[0],
      setLimit = _useState5[1];

  var expandable = (0, _react.useMemo)(function () {
    return groups.map(function (_ref4) {
      var id = _ref4.id;
      return id;
    });
  }, [groups]);
  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = {
                  options: {
                    select: ['name']
                  }
                };
                fetch('https://api.spacexdata.com/v4/rockets/query', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(query)
                }).then(function (response) {
                  return response.json();
                }).then(function (d) {
                  setGroups(d.docs);
                })["catch"](function (error) {
                  return console.error('Unable to get groups:', error);
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function fetchData() {
        return _ref5.apply(this, arguments);
      };
    }();

    fetchData();
  }, []);
  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _sort;

        var query;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(groups.length === 0 || expanded.length === 0)) {
                  _context2.next = 3;
                  break;
                }

                setData(processData({
                  expanded: expanded,
                  show: 0,
                  count: limit
                }, groups, []));
                return _context2.abrupt("return");

              case 3:
                query = {
                  options: {
                    populate: [{
                      path: 'rocket',
                      select: {
                        name: 1
                      }
                    }],
                    sort: (_sort = {
                      rocket: 'asc'
                    }, _sort[sort.property || 'name'] = sort.direction || 'asc', _sort),
                    select: ['name', 'success', 'failures'],
                    limit: limit
                  },
                  query: {
                    rocket: {
                      $in: expanded
                    }
                  }
                };
                fetch('https://api.spacexdata.com/v4/launches/query', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(query)
                }).then(function (response) {
                  return response.json();
                }).then(function (d) {
                  setData(processData({
                    expanded: expanded,
                    show: 0,
                    count: limit
                  }, groups, d.docs));
                })["catch"](function (error) {
                  return console.error('Unable to get data:', error);
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function fetchData() {
        return _ref6.apply(this, arguments);
      };
    }();

    fetchData();
  }, [expanded, groups, limit, sort]);
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
      groupBy: {
        expandable: expandable,
        expand: expanded,
        property: 'rocketId'
      },
      onUpdate: function onUpdate(opts) {
        setExpanded(opts.expanded);
        setLimit(opts.count);
        if (opts.sort) setSort(opts.sort);
      },
      step: 20
    })) // </Grommet>

  );
};

exports.SpaceX = SpaceX;
SpaceX.storyName = 'SpaceX Grouped';
SpaceX.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Visualizations/DataTable/SpaceX Grouped'
};
exports["default"] = _default;