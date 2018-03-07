import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export default (WorldMap) => {
  const DocumentedWorldMap = describe(WorldMap)
    .availableAt(getAvailableAtBadge('WorldMap'))
    .description('A map of the world, or a continent.')
    .usage("import { WorldMap } from 'grommet';\n<WorldMap />");

  DocumentedWorldMap.propTypes = {
    color: PropTypes.string.description('Default color'),
    continents: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.oneOf([
        'Africa', 'Asia', 'Australia', 'Europe', 'North America', 'South America',
      ]).isRequired,
      onClick: PropTypes.func,
      onHover: PropTypes.func,
    })).description('Continent details.'),
    onSelectPlace: PropTypes.func
      .description(`Called when the user clicks on a place.
        It is passed the location.`),
    places: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string, // for a11y aria-label
      location: PropTypes.arrayOf(PropTypes.number).isRequired,
      onClick: PropTypes.func,
      onHover: PropTypes.func,
    })).description('Place details.'),
    hoverColor: PropTypes.string
      .description('Color when hovering over places while selecting.'),
  };

  return DocumentedWorldMap;
};
