"use strict";

exports.__esModule = true;
exports["default"] = exports.OnSelect = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var buildQuery = function buildQuery(view) {
  var query = {};
  var properties = (view == null ? void 0 : view.properties) || [];
  Object.keys(properties).forEach(function (property) {
    switch (property) {
      case 'success':
        if (properties.success.length === 1) {
          query[property] = properties.success[0] === 'Successful';
        }
        break;
      case 'rocket':
        query.rocket = {
          $in: properties.rocket
        };
        break;
      default:
        query[property] = properties[property];
    }
  });
  if (view != null && view.search) query.$text = {
    $search: view.search
  };
  return query;
};
var fetchLaunches = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(view) {
    var _view$sort, _view$sort2, _sort;
    var query, sort, body;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          query = buildQuery(view);
          sort = (_sort = {}, _sort[(view == null || (_view$sort = view.sort) == null ? void 0 : _view$sort.property) || 'name'] = (view == null || (_view$sort2 = view.sort) == null ? void 0 : _view$sort2.direction) || 'asc', _sort);
          body = {
            options: {
              populate: [{
                path: 'rocket',
                select: {
                  name: 1
                }
              }],
              sort: sort,
              select: ['name', 'success', 'failures'],
              limit: (view == null ? void 0 : view.step) || 10,
              page: (view == null ? void 0 : view.page) || 1
            },
            query: query
          };
          return _context.a(2, fetch('https://api.spacexdata.com/v4/launches/query', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          }).then(function (response) {
            return response.json();
          }));
      }
    }, _callee);
  }));
  return function fetchLaunches(_x) {
    return _ref.apply(this, arguments);
  };
}();
var fetchRockets = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var body;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          body = {
            options: {
              sort: {
                name: 'asc'
              },
              select: ['name', 'id']
            }
          };
          return _context2.a(2, fetch('https://api.spacexdata.com/v4/rockets/query', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          }).then(function (response) {
            return response.json();
          }));
      }
    }, _callee2);
  }));
  return function fetchRockets() {
    return _ref2.apply(this, arguments);
  };
}();
var columns = [{
  property: 'name',
  header: 'Name',
  size: 'small',
  primary: true
}, {
  property: 'rocket.name',
  header: 'Rocket',
  size: 'xsmall',
  sortable: false
}, {
  property: 'success',
  header: 'Success',
  size: 'xsmall',
  align: 'center',
  sortable: false,
  render: function render(datum) {
    if (datum.success === false) {
      var _datum$failures;
      var content = /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        width: {
          max: 'medium'
        }
      }, (_datum$failures = datum.failures) == null ? void 0 : _datum$failures.map(function (_ref3) {
        var reason = _ref3.reason;
        return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
          key: reason
        }, reason);
      }));
      return /*#__PURE__*/_react["default"].createElement(_grommet.Tip, {
        content: content,
        dropProps: {
          pad: 'small',
          background: 'background'
        }
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        direction: "row",
        align: "center",
        gap: "xsmall"
      }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.StatusCritical, {
        color: "red"
      }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Failed")));
    }
    return undefined;
  }
}];
var defaultView = {
  search: '',
  sort: {
    property: 'name',
    direction: 'asc'
  },
  step: 10
};
var OnSelect = exports.OnSelect = function OnSelect() {
  var _useState = (0, _react.useState)(0),
    total = _useState[0],
    setTotal = _useState[1];
  var _useState2 = (0, _react.useState)({
      data: []
    }),
    result = _useState2[0],
    setResult = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    rockets = _useState3[0],
    setRockets = _useState3[1];
  var _useState4 = (0, _react.useState)(defaultView),
    view = _useState4[0],
    setView = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    select = _useState5[0],
    setSelect = _useState5[1];

  // Fetch all rockets on first render for use in the filter
  (0, _react.useEffect)(function () {
    fetchRockets().then(function (response) {
      return setRockets(response.docs.map(function (_ref4) {
        var name = _ref4.name,
          id = _ref4.id;
        return {
          value: id,
          label: name
        };
      }));
    });
  }, []);
  (0, _react.useEffect)(function () {
    fetchLaunches(view).then(function (response) {
      setResult({
        data: response.docs,
        filteredTotal: response.totalDocs,
        page: response.page
      });
      // The REST API doesn't return the unfiltered total in responses.
      // Since the first request likely has no filtering, we'll likely use
      // response.totalDocs the first time and prevTotal thereafter.
      setTotal(function (prevTotal) {
        return Math.max(prevTotal, response.totalDocs);
      });
    });
  }, [view]);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Grid, {
      flex: false,
      pad: "large",
      columns: [['small', 'large']],
      justifyContent: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Data, {
      properties: {
        rocket: {
          label: 'Rocket',
          options: rockets
        },
        success: {
          label: 'Success',
          options: ['Successful', 'Failed']
        }
      },
      data: result.data,
      total: total,
      filteredTotal: result.filteredTotal,
      defaultView: defaultView,
      view: view,
      onView: setView,
      toolbar: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      columns: columns,
      sortable: true,
      select: select,
      onSelect: setSelect
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Pagination, {
      summary: true,
      stepOptions: true,
      border: "top",
      pad: {
        vertical: 'xsmall',
        left: 'small'
      }
    })))
    // </Grommet>
  );
};
OnSelect.storyName = 'OnSelect';
OnSelect.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Data/Data/OnSelect'
};