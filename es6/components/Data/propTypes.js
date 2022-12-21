import PropTypes from 'prop-types';
var viewType = PropTypes.shape({
  properties: PropTypes.shape({}),
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
    onView: PropTypes.func,
    properties: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.shape({})]),
    toolbar: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['search', 'filters'])]),
    total: PropTypes.number,
    updateOn: PropTypes.oneOf(['change', 'submit']),
    view: viewType
  };
}
export var DataPropTypes = PropType;