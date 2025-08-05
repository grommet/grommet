function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import React, { useEffect, useMemo, useState } from 'react';
import { Box, DataTable, Text, Tip } from 'grommet';
import { StatusCritical } from "grommet-icons/es6/icons/StatusCritical";
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
      var content = /*#__PURE__*/React.createElement(Box, {
        width: {
          max: 'medium'
        }
      }, (_datum$failures = datum.failures) == null ? void 0 : _datum$failures.map(function (_ref) {
        var reason = _ref.reason;
        return /*#__PURE__*/React.createElement(Text, {
          key: reason
        }, reason);
      }));
      return /*#__PURE__*/React.createElement(Tip, {
        plain: true,
        content: content,
        dropProps: {
          round: 'medium',
          pad: 'small',
          background: 'background-back'
        }
      }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(StatusCritical, {
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
  });

  // TODO support paginate
  var start = show || 0;
  if (start + count > items.length) {
    start = Math.max(items.length - count, 0);
  }
  var result = count ? items.slice(start, start + count) : items;
  return result;
};
export var SpaceX = function SpaceX() {
  var _useState = useState([]),
    groups = _useState[0],
    setGroups = _useState[1];
  var _useState2 = useState([]),
    expanded = _useState2[0],
    setExpanded = _useState2[1];
  var _useState3 = useState({
      property: 'name',
      direction: 'asc'
    }),
    sort = _useState3[0],
    setSort = _useState3[1];
  var _useState4 = useState([]),
    data = _useState4[0],
    setData = _useState4[1];
  var _useState5 = useState(20),
    limit = _useState5[0],
    setLimit = _useState5[1];
  var expandable = useMemo(function () {
    return groups.map(function (_ref4) {
      var id = _ref4.id;
      return id;
    });
  }, [groups]);
  var expandLabel = function expandLabel(row) {
    if (row && row.name) {
      return row.name;
    }
    return undefined;
  };
  useEffect(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var query;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
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
            case 1:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function fetchData() {
        return _ref5.apply(this, arguments);
      };
    }();
    fetchData();
  }, []);
  useEffect(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _sort;
        var query;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!(groups.length === 0 || expanded.length === 0)) {
                _context2.n = 1;
                break;
              }
              setData(processData({
                expanded: expanded,
                show: 0,
                count: limit
              }, groups, []));
              return _context2.a(2);
            case 1:
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
            case 2:
              return _context2.a(2);
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
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(DataTable, {
      primaryKey: "id",
      columns: columns,
      data: data,
      sortable: true,
      replace: true,
      groupBy: {
        expandable: expandable,
        expand: expanded,
        expandLabel: expandLabel,
        property: 'rocketId'
      },
      onUpdate: function onUpdate(opts) {
        setExpanded(opts.expanded);
        setLimit(opts.count);
        if (opts.sort) setSort(opts.sort);
      },
      step: 20
    }))
    // </Grommet>
  );
};
SpaceX.storyName = 'SpaceX Grouped';
SpaceX.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Visualizations/DataTable/SpaceX Grouped'
};