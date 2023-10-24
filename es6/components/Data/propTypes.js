import PropTypes from 'prop-types';
var viewType = PropTypes.shape({
  properties: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.shape({})]),
  search: PropTypes.string,
  sort: PropTypes.shape({
    direction: PropTypes.oneOf(['asc', 'desc']),
    property: PropTypes.string
  })
});
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    data: PropTypes.arrayOf(PropTypes.shape({})),
    defaultView: viewType,
    onView: PropTypes.func,
    properties: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.shape({})]),
    toolbar: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['search', 'filters'])]),
    total: PropTypes.number,
    updateOn: PropTypes.oneOf(['change', 'submit']),
    view: PropTypes.oneOfType([PropTypes.string, viewType])
  };
}
export var DataPropTypes = PropType;