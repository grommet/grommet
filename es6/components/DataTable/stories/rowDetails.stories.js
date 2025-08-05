function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Data, DataTable, NameValueList, NameValuePair, Pagination, Text } from 'grommet';

// Uses the StarWars API for starships, see https://swapi.info

var fetchData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var url;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          url = "https://swapi.info/api/starships";
          return _context.a(2, fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(function (response) {
            return response.json();
          })["catch"](function (err) {
            if (err.name !== 'AbortError') throw err;
            return {};
          }));
      }
    }, _callee);
  }));
  return function fetchData() {
    return _ref.apply(this, arguments);
  };
}();
var ShipProperties = function ShipProperties(_ref2) {
  var ship = _ref2.ship;
  return /*#__PURE__*/React.createElement(NameValueList, {
    pairProps: {
      direction: 'column'
    },
    valueProps: {
      width: 'xsmall'
    },
    layout: "grid",
    pad: {
      left: 'large',
      bottom: 'small'
    },
    gap: {
      row: 'xsmall',
      column: 'large'
    }
  }, /*#__PURE__*/React.createElement(NameValuePair, {
    name: /*#__PURE__*/React.createElement(Text, {
      size: "small",
      weight: "bold"
    }, "Name")
  }, /*#__PURE__*/React.createElement(Text, {
    size: "xsmall"
  }, ship.name)), /*#__PURE__*/React.createElement(NameValuePair, {
    name: /*#__PURE__*/React.createElement(Text, {
      size: "small",
      weight: "bold"
    }, "Model")
  }, /*#__PURE__*/React.createElement(Text, {
    size: "xsmall"
  }, ship.model)), /*#__PURE__*/React.createElement(NameValuePair, {
    name: /*#__PURE__*/React.createElement(Text, {
      size: "small",
      weight: "bold"
    }, "Manufacturer")
  }, /*#__PURE__*/React.createElement(Text, {
    size: "xsmall"
  }, ship.manufacturer)), /*#__PURE__*/React.createElement(NameValuePair, {
    name: /*#__PURE__*/React.createElement(Text, {
      size: "small",
      weight: "bold"
    }, "Passengers")
  }, /*#__PURE__*/React.createElement(Text, {
    size: "xsmall"
  }, ship.passengers)));
};
export var RowDetails = function RowDetails() {
  var _useState = useState({}),
    result = _useState[0],
    setResult = _useState[1];
  var _useState2 = useState(0),
    total = _useState2[0],
    setTotal = _useState2[1];
  var _useState3 = useState(['Y-wing']),
    expand = _useState3[0],
    setExpand = _useState3[1];
  useEffect(function () {
    fetchData().then(function (results) {
      if (results) {
        // The API doesn't provide a non-filtered total, so we rely on the
        // first call having no filtering telling us the total.
        setTotal(function (prevTotal) {
          return Math.max(prevTotal, results.length);
        });
        setResult({
          data: results
        });
      }
    });
  }, []);
  var rowDetails = useMemo(function () {
    return {
      render: function render(row) {
        return /*#__PURE__*/React.createElement(ShipProperties, {
          ship: row
        });
      },
      expand: expand,
      expandLabel: function expandLabel(row) {
        return "details for " + row.name;
      },
      onExpand: function onExpand(nextExpand /* , datum */) {
        return setExpand(nextExpand);
      }
    };
  }, [expand]);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      skeleton: !result.data,
      width: "large",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Data, {
      data: result.data,
      total: total,
      toolbar: "search"
    }, /*#__PURE__*/React.createElement(DataTable, {
      columns: [{
        property: 'name',
        header: 'Name',
        primary: true
      }, {
        property: 'starship_class',
        header: 'Class'
      }],
      rowDetails: rowDetails
    }), /*#__PURE__*/React.createElement(Pagination, null)))

    // </Grommet>
  );
};
RowDetails.storyName = 'rowDetails';
RowDetails.parameters = {
  chromatic: {
    disable: true
  }
};
RowDetails.args = {
  full: true
};
export default {
  title: 'Visualizations/DataTable/rowDetails'
};