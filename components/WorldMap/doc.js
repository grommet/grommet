"use strict";

exports.__esModule = true;
exports.doc = exports.themeDoc = void 0;

var _reactDesc = require("react-desc");

var _propTypes = require("../../utils/prop-types");

var _mixins = require("../../utils/mixins");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var themeDoc = {
  'worldMap.color': {
    description: 'The color for each individual dot when a color is not passed as a prop',
    type: 'string',
    defaultValue: 'light-3'
  },
  'worldMap.continent.active': {
    description: "The size of the visual dots belonging to a continent when the\ncontinent is being hovered.",
    type: 'string',
    defaultValue: '8px'
  },
  'worldMap.continent.base': {
    description: "The size of the visual dots belonging to a continent that is\nnot being hovered.",
    type: 'string',
    defaultValue: '6px'
  },
  'worldMap.hover.color': {
    description: 'The color for an individual dot when it is being hovered',
    type: 'string',
    defaultValue: 'light-4'
  },
  'worldMap.place.active': {
    description: "The size of a visual dot for an individual place in the map \nwhen it is being hovered.",
    type: 'string',
    defaultValue: '20px'
  },
  'worldMap.place.base': {
    description: "The size of the visual dot representing an individual place \nin the map when it is not being hovered.",
    type: 'string',
    defaultValue: '8px'
  },
  'worldMap.extend': {
    description: 'Any additional style for the WorldMap.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
};
exports.themeDoc = themeDoc;

var doc = function doc(WorldMap) {
  var DocumentedWorldMap = (0, _reactDesc.describe)(WorldMap).availableAt((0, _mixins.getAvailableAtBadge)('WorldMap', 'Visualizations')).description('A map of the world, or a continent.').usage("import { WorldMap } from 'grommet';\n<WorldMap />").intrinsicElement('svg');
  DocumentedWorldMap.propTypes = _extends({}, _propTypes.genericProps, {
    color: _propTypes.colorPropType.description('Default color'),
    continents: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({
      color: _propTypes.colorPropType,
      name: _reactDesc.PropTypes.oneOf(['Africa', 'Asia', 'Australia', 'Europe', 'North America', 'South America']).isRequired,
      onClick: _reactDesc.PropTypes.func,
      onHover: _reactDesc.PropTypes.func
    })).description('Continent details.'),
    fill: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['horizontal', 'vertical']), _reactDesc.PropTypes.bool]).description('Whether the width and/or height should fill the container.'),
    onSelectPlace: _reactDesc.PropTypes.func.description("Called when the user clicks on a place.\n        It is passed the location."),
    places: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({
      color: _propTypes.colorPropType,
      name: _reactDesc.PropTypes.string,
      // for a11y aria-label
      location: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.number).isRequired,
      onClick: _reactDesc.PropTypes.func,
      onHover: _reactDesc.PropTypes.func
    })).description("Place details. location is an array of two numeric values that indicates\n       the latitude and longitude of the specified location."),
    hoverColor: _propTypes.colorPropType.description('Color when hovering over places while selecting.')
  });
  return DocumentedWorldMap;
};

exports.doc = doc;