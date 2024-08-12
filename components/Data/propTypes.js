"use strict";

exports.__esModule = true;
exports.DataPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var viewType = _propTypes["default"].shape({
  properties: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].string), _propTypes["default"].shape({})]),
  search: _propTypes["default"].string,
  sort: _propTypes["default"].shape({
    direction: _propTypes["default"].oneOf(['asc', 'desc']),
    property: _propTypes["default"].string
  }),
  columns: _propTypes["default"].arrayOf(_propTypes["default"].string)
});
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    data: _propTypes["default"].arrayOf(_propTypes["default"].shape({})),
    defaultView: viewType,
    filteredTotal: _propTypes["default"].number,
    id: _propTypes["default"].string,
    messages: _propTypes["default"].shape({
      dataFilters: _propTypes["default"].shape({
        clear: _propTypes["default"].string,
        heading: _propTypes["default"].string,
        open: _propTypes["default"].string,
        openSet: _propTypes["default"].shape({
          singular: _propTypes["default"].string,
          plural: _propTypes["default"].string
        })
      }),
      dataForm: _propTypes["default"].shape({
        submit: _propTypes["default"].string
      }),
      dataSearch: _propTypes["default"].shape({
        label: _propTypes["default"].string,
        open: _propTypes["default"].string
      }),
      dataSort: _propTypes["default"].shape({
        ascending: _propTypes["default"].string,
        by: _propTypes["default"].string,
        descending: _propTypes["default"].string,
        direction: _propTypes["default"].string,
        open: _propTypes["default"].string
      }),
      dataSummary: _propTypes["default"].shape({
        filtered: _propTypes["default"].string,
        filteredSingle: _propTypes["default"].string,
        items: _propTypes["default"].string,
        itemsSingle: _propTypes["default"].string,
        selected: _propTypes["default"].string,
        total: _propTypes["default"].string,
        totalSingle: _propTypes["default"].string
      }),
      dataTableColumns: _propTypes["default"].shape({
        open: _propTypes["default"].string,
        order: _propTypes["default"].string,
        select: _propTypes["default"].string,
        tip: _propTypes["default"].string
      }),
      dataTableGroupBy: _propTypes["default"].shape({
        clear: _propTypes["default"].string,
        label: _propTypes["default"].string
      }),
      dataView: _propTypes["default"].shape({
        label: _propTypes["default"].string
      })
    }),
    onView: _propTypes["default"].func,
    properties: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].string), _propTypes["default"].objectOf(_propTypes["default"].shape({
      badge: _propTypes["default"].bool,
      filter: _propTypes["default"].bool,
      label: _propTypes["default"].string,
      options: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({})])),
      range: _propTypes["default"].shape({
        max: _propTypes["default"].number,
        min: _propTypes["default"].number,
        step: _propTypes["default"].number
      }),
      search: _propTypes["default"].bool,
      sort: _propTypes["default"].bool
    }))]),
    toolbar: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['search', 'filters', 'view'])]),
    total: _propTypes["default"].number,
    view: _propTypes["default"].oneOfType([_propTypes["default"].string, viewType]),
    views: _propTypes["default"].arrayOf(viewType)
  };
}
var DataPropTypes = exports.DataPropTypes = PropType;