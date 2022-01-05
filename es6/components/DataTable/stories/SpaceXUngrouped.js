function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import React, { useEffect, useState } from 'react';
import { Box, DataTable, Text, Tip } from 'grommet';
import { StatusCritical } from "grommet-icons/es6/icons/StatusCritical";
var columns = [{
  property: 'name',
  header: 'Name',
  size: 'medium'
}, {
  property: 'rocket',
  header: 'Rocket',
  size: 'small',
  render: function render(datum) {
    return /*#__PURE__*/React.createElement(Text, null, datum.rocket.name);
  }
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
        return /*#__PURE__*/React.createElement(Text, null, reason);
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
export var SpaceXUngrouped = function SpaceXUngrouped() {
  var _useState = useState({
    property: 'name',
    direction: 'asc'
  }),
      sort = _useState[0],
      setSort = _useState[1];

  var _useState2 = useState([]),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = useState(20),
      limit = _useState3[0],
      setLimit = _useState3[1];

  useEffect(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _sort;

        var query;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = {
                  options: {
                    populate: [{
                      path: 'rocket',
                      select: {
                        name: 1
                      }
                    }],
                    sort: (_sort = {}, _sort[sort.property || 'name'] = sort.direction || 'asc', _sort),
                    select: ['name', 'success', 'failures'],
                    limit: limit
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
                }).then(function (_ref3) {
                  var docs = _ref3.docs;
                  setData(docs || []);
                })["catch"](function (error) {
                  return console.error('Unable to get data:', error);
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function fetchData() {
        return _ref2.apply(this, arguments);
      };
    }();

    fetchData();
  }, [limit, sort]);
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
      onUpdate: function onUpdate(opts) {
        console.log('onUpdate', opts);
        setLimit(opts.count);
        if (opts.sort) setSort(opts.sort);
      },
      step: 20
    })) // </Grommet>

  );
};
SpaceXUngrouped.storyName = 'SpaceX Ungrouped';
SpaceXUngrouped.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Visualizations/DataTable/SpaceX Ungrouped'
};