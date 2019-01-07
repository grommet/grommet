function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { colorPropType, genericProps, getAvailableAtBadge } from '../../utils';
export var themeDoc = {
  'worldMap.color': {
    description: 'The color for each individual dot when a color is not passed as a prop',
    type: 'string',
    defaultValue: 'light-3'
  },
  'worldMap.continent.active': {
    description: 'The size of the visual dots belonging to a continent when the continent is being hovered.',
    type: 'string',
    defaultValue: '8px'
  },
  'worldMap.continent.base': {
    description: 'The size of the visual dots belonging to a continent that is not being hovered.',
    type: 'string',
    defaultValue: '6px'
  },
  'worldMap.hover.color': {
    description: 'The color for an individual dot when it is being hovered',
    type: 'string',
    defaultValue: 'light-4'
  },
  'worldMap.place.active': {
    description: 'The size of a visual dot for an individual place in the map when it is being hovered.',
    type: 'string',
    defaultValue: '20px'
  },
  'worldMap.place.base': {
    description: 'The size of the visual dot representing an individual place in the map when it is not being hovered.',
    type: 'string',
    defaultValue: '8px'
  },
  'worldMap.extend': {
    description: 'Any additional style for the WorldMap.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
};
export var doc = function doc(WorldMap) {
  var DocumentedWorldMap = describe(WorldMap).availableAt(getAvailableAtBadge('WorldMap')).description('A map of the world, or a continent.').usage("import { WorldMap } from 'grommet';\n<WorldMap />").intrinsicElement('svg');
  DocumentedWorldMap.propTypes = _extends({}, genericProps, {
    color: colorPropType.description('Default color'),
    continents: PropTypes.arrayOf(PropTypes.shape({
      color: colorPropType,
      name: PropTypes.oneOf(['Africa', 'Asia', 'Australia', 'Europe', 'North America', 'South America']).isRequired,
      onClick: PropTypes.func,
      onHover: PropTypes.func
    })).description('Continent details.'),
    onSelectPlace: PropTypes.func.description("Called when the user clicks on a place.\n        It is passed the location."),
    places: PropTypes.arrayOf(PropTypes.shape({
      color: colorPropType,
      name: PropTypes.string,
      // for a11y aria-label
      location: PropTypes.arrayOf(PropTypes.number).isRequired,
      onClick: PropTypes.func,
      onHover: PropTypes.func
    })).description('Place details.'),
    hoverColor: colorPropType.description('Color when hovering over places while selecting.')
  });
  return DocumentedWorldMap;
};