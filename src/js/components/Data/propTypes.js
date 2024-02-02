import PropTypes from 'prop-types';

const viewType = PropTypes.shape({
  properties: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.shape({}),
  ]),
  search: PropTypes.string,
  sort: PropTypes.shape({
    direction: PropTypes.oneOf(['asc', 'desc']),
    property: PropTypes.string,
  }),
});

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    data: PropTypes.arrayOf(PropTypes.shape({})),
    defaultView: viewType,
    filteredTotal: PropTypes.number,
    id: PropTypes.string,
    messages: PropTypes.shape({
      dataFilters: PropTypes.shape({
        clear: PropTypes.string,
        heading: PropTypes.string,
        open: PropTypes.string,
        openSet: PropTypes.shape({
          singular: PropTypes.string,
          plural: PropTypes.string,
        }),
      }),
      dataForm: PropTypes.shape({
        submit: PropTypes.string,
      }),
      dataSearch: PropTypes.shape({
        label: PropTypes.string,
        open: PropTypes.string,
      }),
      dataSort: PropTypes.shape({
        ascending: PropTypes.string,
        by: PropTypes.string,
        descending: PropTypes.string,
        direction: PropTypes.string,
        open: PropTypes.string,
      }),
      dataSummary: PropTypes.shape({
        filtered: PropTypes.string,
        filteredSingle: PropTypes.string,
        items: PropTypes.string,
        itemsSingle: PropTypes.string,
        selected: PropTypes.string,
        total: PropTypes.string,
        totalSingle: PropTypes.string,
      }),
      dataTableColumns: PropTypes.shape({
        open: PropTypes.string,
        order: PropTypes.string,
        select: PropTypes.string,
        tip: PropTypes.string,
      }),
      dataTableGroupBy: PropTypes.shape({
        clear: PropTypes.string,
        label: PropTypes.string,
      }),
      dataView: PropTypes.shape({
        label: PropTypes.string,
      }),
    }),
    onView: PropTypes.func,
    properties: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.objectOf(
        PropTypes.shape({
          badge: PropTypes.bool,
          filter: PropTypes.bool,
          label: PropTypes.string,
          options: PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
          ),
          range: PropTypes.shape({
            max: PropTypes.number,
            min: PropTypes.number,
            step: PropTypes.number,
          }),
          search: PropTypes.bool,
          sort: PropTypes.bool,
        }),
      ),
    ]),
    toolbar: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['search', 'filters', 'view']),
    ]),
    total: PropTypes.number,
    view: PropTypes.oneOfType([PropTypes.string, viewType]),
    views: PropTypes.arrayOf(viewType),
  };
}

export const DataPropTypes = PropType;
