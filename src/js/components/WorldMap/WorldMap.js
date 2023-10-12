import React, { forwardRef } from 'react';
import { ThemeContext } from 'styled-components';

import { Drop } from '../Drop';
import { defaultProps } from '../../default-props';
import { normalizeColor, parseMetricToNum } from '../../utils';

import { StyledWorldMap } from './StyledWorldMap';
import { WorldMapPropTypes } from './propTypes';

// The graphic is drawn as a rectangular grid using coordinates spaced
// by FACTOR pixels.
const FACTOR = 10;

// Mapping constants between coordinates and latitude+longitude.
// The map coordinate space isn't precisely a mercator projection. So,
// we have a few adjustments that we've empirically determined. The following
// cities were used to make the empirical determinations:
// London (0 lon), Quito (0 lat), Nome (far west), Sydney (far east),
// Svalbard (far north), Ushuaia (far south).

// These map to reality, they aren't adjusted.
const EQUATOR_Y = 32;
const WIDTH = 93;

// Scale the latitude and longitude to align better with actual locations.
const LAT_SCALE = 0.98;
// adjust more extreme latitudes to fit with the map dots better
const LAT_EXTREME_SCALE = 0.91;
const LON_SCALE = 0.99;

// We shift the map coordinates to align better with actual locations.
const X_OFFSET = -2;
const Y_OFFSET = -2;

// The continents have both an area boundary for interaction
// and dots described as rows where each row is described by three values:
// a starting coordinate and a length. This approach is more efficient than
// describing it via SVG elements, keeping the code/library size smaller.
const CONTINENTS = [
  {
    name: 'Australia',
    origin: [74, 32],
    area: [
      [4, 0],
      [7, 1],
      [15, 7],
      [13, 9],
      [8, 8],
      [0, 6],
      [0, 2],
    ],
    dots: [
      [4, 0, 1],
      [2, 1, 6],
      [0, 2, 9],
      [0, 3, 10],
      [0, 4, 10],
      [0, 5, 3],
      [5, 5, 5],
      [5, 6, 4],
      [8, 8, 1],
      [15, 7, 1],
      [14, 8, 1],
      [13, 9, 1],
    ],
  },
  {
    name: 'Asia',
    origin: [52, 1],
    area: [
      [16, 0],
      [38, 5],
      [40, 7],
      [28, 17],
      [24, 25],
      [29, 29],
      [19, 29],
      [11, 24],
      [3, 23],
      [0, 20],
      [0, 19],
      [6, 13],
      [7, 6],
    ],
    dots: [
      [16, 0, 1],
      [17, 1, 2],
      [18, 2, 2],
      [15, 3, 6],
      [28, 3, 1],
      [30, 3, 1],
      [10, 4, 2],
      [13, 4, 10],
      [24, 4, 1],
      [9, 5, 22],
      [32, 5, 1],
      [38, 5, 1],
      [7, 6, 2],
      [10, 6, 1],
      [12, 6, 27],
      [7, 7, 34],
      [7, 8, 31],
      [7, 9, 26],
      [34, 9, 3],
      [7, 10, 22],
      [31, 10, 1],
      [33, 10, 1],
      [7, 11, 21],
      [32, 11, 2],
      [7, 12, 21],
      [32, 12, 1],
      [6, 13, 22],
      [32, 13, 1],
      [6, 14, 22],
      [5, 15, 22],
      [3, 16, 2],
      [6, 16, 20],
      [2, 17, 3],
      [6, 17, 16],
      [24, 17, 1],
      [28, 17, 1],
      [1, 18, 22],
      [26, 18, 2],
      [0, 19, 24],
      [0, 20, 5],
      [6, 20, 17],
      [2, 21, 5],
      [10, 21, 14],
      [2, 22, 5],
      [11, 22, 4],
      [16, 22, 4],
      [3, 23, 3],
      [11, 23, 2],
      [17, 23, 3],
      [23, 23, 1],
      [11, 24, 2],
      [18, 24, 2],
      [23, 24, 1],
      [24, 25, 1],
      [18, 26, 1],
      [22, 26, 1],
      [18, 27, 1],
      [20, 27, 4],
      [18, 28, 1],
      [21, 28, 1],
      [23, 28, 1],
      [26, 28, 3],
      [19, 29, 1],
      [28, 29, 2],
    ],
  },
  {
    name: 'Africa',
    origin: [40, 19],
    area: [
      [3, 0],
      [6, 0],
      [11, 2],
      [16, 7],
      [16, 15],
      [11, 18],
      [9, 18],
      [0, 6],
      [0, 3],
    ],
    dots: [
      [3, 0, 4],
      [2, 1, 6],
      [9, 1, 2],
      [1, 2, 11],
      [0, 3, 13],
      [0, 4, 14],
      [0, 5, 14],
      [0, 6, 16],
      [1, 7, 16],
      [2, 8, 2],
      [6, 8, 11],
      [7, 9, 9],
      [7, 10, 8],
      [7, 11, 7],
      [8, 12, 7],
      [7, 13, 8],
      [7, 14, 7],
      [16, 14, 1],
      [8, 15, 5],
      [15, 15, 2],
      [8, 16, 5],
      [9, 17, 3],
      [9, 18, 3],
    ],
  },
  {
    name: 'Europe',
    origin: [39, 2],
    area: [
      [8, 0],
      [10, 0],
      [20, 2],
      [19, 11],
      [18, 13],
      [14, 16],
      [3, 16],
      [0, 7],
    ],
    dots: [
      [8, 0, 3],
      [9, 1, 1],
      [20, 2, 1],
      [19, 3, 1],
      [12, 4, 1],
      [19, 4, 1],
      [9, 5, 6],
      [9, 6, 7],
      [17, 6, 3],
      [0, 7, 1],
      [8, 7, 12],
      [7, 8, 3],
      [11, 8, 9],
      [7, 9, 3],
      [11, 9, 9],
      [4, 10, 1],
      [7, 10, 1],
      [9, 10, 1],
      [11, 10, 9],
      [3, 11, 2],
      [7, 11, 13],
      [4, 12, 1],
      [6, 12, 13],
      [4, 13, 15],
      [5, 14, 3],
      [9, 14, 4],
      [15, 14, 2],
      [3, 15, 3],
      [8, 15, 1],
      [10, 15, 5],
      [6, 15, 2],
      [3, 16, 2],
      [10, 16, 5],
    ],
  },
  {
    name: 'South America',
    origin: [22, 26],
    area: [
      [2, 0],
      [5, 0],
      [11, 4],
      [11, 8],
      [3, 18],
      [2, 17],
      [0, 4],
      [0, 3],
    ],
    dots: [
      [2, 0, 4],
      [1, 1, 7],
      [1, 2, 7],
      [0, 3, 10],
      [0, 4, 12],
      [1, 5, 11],
      [2, 6, 9],
      [3, 7, 8],
      [3, 8, 8],
      [3, 9, 6],
      [3, 10, 6],
      [3, 11, 5],
      [3, 12, 3],
      [2, 13, 3],
      [2, 14, 3],
      [2, 15, 2],
      [2, 16, 2],
      [2, 17, 2],
      [3, 18, 1],
    ],
  },
  {
    name: 'North America',
    origin: [0, 0],
    area: [
      [21, 0],
      [39, 0],
      [39, 6],
      [22, 26],
      [16, 23],
      [2, 12],
      [0, 7],
    ],
    dots: [
      [22, 0, 6],
      [29, 0, 1],
      [31, 0, 1],
      [33, 0, 5],
      [20, 1, 1],
      [22, 1, 1],
      [24, 1, 2],
      [27, 1, 13],
      [17, 2, 1],
      [20, 2, 5],
      [26, 2, 13],
      [13, 3, 1],
      [19, 3, 1],
      [21, 3, 3],
      [26, 3, 14],
      [14, 4, 1],
      [16, 4, 4],
      [21, 4, 3],
      [29, 4, 11],
      [12, 5, 3],
      [16, 5, 1],
      [18, 5, 1],
      [20, 5, 3],
      [24, 5, 1],
      [30, 5, 8],
      [14, 6, 3],
      [19, 6, 1],
      [22, 6, 4],
      [31, 6, 8],
      [0, 7, 15],
      [16, 7, 1],
      [18, 7, 4],
      [24, 7, 2],
      [30, 7, 7],
      [2, 8, 20],
      [24, 8, 3],
      [29, 8, 5],
      [2, 9, 20],
      [24, 9, 2],
      [30, 9, 3],
      [1, 10, 18],
      [23, 10, 2],
      [31, 10, 1],
      [2, 11, 2],
      [8, 11, 11],
      [23, 11, 2],
      [26, 11, 1],
      [2, 12, 1],
      [8, 12, 13],
      [24, 12, 3],
      [10, 13, 12],
      [23, 13, 5],
      [11, 14, 17],
      [11, 15, 9],
      [21, 15, 6],
      [28, 15, 2],
      [11, 16, 11],
      [23, 16, 4],
      [11, 17, 14],
      [12, 18, 11],
      [12, 19, 12],
      [13, 20, 9],
      [15, 21, 3],
      [22, 21, 1],
      [16, 22, 2],
      [16, 23, 2],
      [20, 23, 1],
      [23, 23, 1],
      [18, 24, 3],
      [21, 25, 1],
      [22, 26, 1],
    ],
  },
];

const mergeBounds = (bounds1, bounds2) => [
  bounds1 ? Math.min(bounds1[0], bounds2[0]) : bounds2[0],
  bounds1 ? Math.min(bounds1[1], bounds2[1]) : bounds2[1],
  bounds1 ? Math.max(bounds1[2], bounds2[2]) : bounds2[2],
  bounds1 ? Math.max(bounds1[3], bounds2[3]) : bounds2[3],
];

const midPoint = (bounds) => [
  bounds[0] + (bounds[2] - bounds[0]) / 2,
  bounds[1] + (bounds[3] - bounds[1]) / 2,
];

// from https://stackoverflow.com/a/14457180/8513067
const latLonToCoord = ([lat, lon]) => {
  const scaledLon = lon * LON_SCALE;
  const x = Math.round((scaledLon + 180) * (WIDTH / 360));
  // adjust more extreme latitudes to fit with the map dots better
  const scaledLat =
    lat * (lat > 60 || lat < -50 ? LAT_EXTREME_SCALE : LAT_SCALE);
  const latRad = (scaledLat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = Math.round(EQUATOR_Y - (WIDTH * mercN) / (2 * Math.PI));
  return [x + X_OFFSET, y + Y_OFFSET];
};

const coordToLatLon = ([x, y]) => {
  const mercN = ((EQUATOR_Y - (y - Y_OFFSET)) * (2 * Math.PI)) / WIDTH;
  const latRad = (Math.atan(Math.exp(mercN)) - Math.PI / 4) * 2;
  const scaledLat = (latRad * 180) / Math.PI / LAT_SCALE;
  // adjust more extreme latitudes to fit with the map dots better
  const lat =
    scaledLat /
    (scaledLat > 60 || scaledLat < -50 ? LAT_EXTREME_SCALE : LAT_SCALE);
  const lon = ((x - X_OFFSET) * 360) / WIDTH - 180;
  return [lat, lon];
};

const buildContinent = ({ area: areaProp, dots: dotsProp, name, origin }) => {
  let bounds = [origin[0], origin[1], origin[0], origin[1]];
  const dots = dotsProp
    .map((segment) => {
      const count = segment[2];
      const spots = [];
      for (let i = 0; i < count; i += 1) spots.push('h0');
      const dotCommands = spots.join(' m10,0 ');
      const x = FACTOR * (origin[0] + segment[0] + 1);
      const y = FACTOR * (origin[1] + segment[1] + 1);
      bounds = mergeBounds(bounds, [
        origin[0],
        origin[1],
        origin[0] + segment[0] + segment[2],
        origin[1] + segment[1],
      ]);
      return `M${x},${y} ${dotCommands}`;
    })
    .join(' ');

  const area = `${areaProp
    .map((point, index) => {
      const x = FACTOR * (point[0] + origin[0] + 1);
      const y = FACTOR * (point[1] + origin[1] + 1);
      return `${index === 0 ? 'M' : 'L'}${x},${y}`;
    })
    .join(' ')} Z`;

  const mid = midPoint(bounds);
  return { area, dots, name, origin, bounds, mid };
};

const buildWorld = () => {
  // Build the SVG paths describing the individual dots
  const continents = CONTINENTS.map(buildContinent);
  let bounds;
  continents.forEach((continent) => {
    bounds = mergeBounds(bounds, continent.bounds);
  });

  return {
    continents,
    bounds,
    x: bounds[0] * FACTOR,
    y: bounds[1] * FACTOR,
    width: (bounds[2] - bounds[0] + 1) * FACTOR,
    height: (bounds[3] - bounds[1] + 2) * FACTOR,
  };
};

const buildInteractiveProps = (
  { name, onClick, onHover },
  activeFunc,
  active,
) => ({
  role: 'button',
  'aria-label': name,
  tabIndex: '0',
  onClick: onClick ? () => onClick(name) : undefined,
  onMouseOver: () => {
    if (!active) {
      activeFunc(name);
      if (onHover) {
        onHover(true);
      }
    }
  },
  onMouseLeave: () => {
    if (active) {
      activeFunc(undefined);
      if (onHover) {
        onHover(false);
      }
    }
  },
  onFocus: () => {
    // This moves the map unnecessarily. Instead, we should check
    // the position and scroll if it isn't already visible
    // this._worldMapRef.scrollIntoView();
    if (!active) {
      activeFunc(name);
    }
  },
  onBlur: () => {
    if (active) {
      activeFunc(undefined);
    }
  },
});

const WorldMap = forwardRef(
  (
    {
      fill,
      color,
      continents: continentsProp,
      hoverColor,
      onSelectPlace,
      places: placesProp,
      ...rest
    },
    ref,
  ) => {
    const theme = React.useContext(ThemeContext);

    const world = React.useMemo(buildWorld, []);

    const [continents, setContinents] = React.useState({});
    React.useEffect(() => {
      if (continentsProp) {
        setContinents(
          continentsProp.reduce((obj, continent) => {
            // eslint-disable-next-line no-param-reassign
            obj[continent.name] = continent;
            return obj;
          }, {}),
        );
      } else setContinents({});
    }, [continentsProp]);

    const [places, setPlaces] = React.useState([]);

    // targets are used for the Drops associated with places content
    const [targets, setTargets] = React.useState([]);

    React.useEffect(() => {
      if (placesProp) {
        setPlaces(
          placesProp.map(({ location, ...place }) => {
            const coords = latLonToCoord(location);
            return { coords, key: location.join(','), ...place };
          }),
        );
      } else setPlaces([]);
      return () => {
        setTargets([]);
      };
    }, [placesProp, world]);

    const [over, setOver] = React.useState();
    const [activeCoords, setActiveCoords] = React.useState();
    const [activeContinent, setActiveContinent] = React.useState();
    const [activePlace, setActivePlace] = React.useState();
    const containerRef = React.useRef();

    const placeRef = React.useCallback((node, index) => {
      setTargets((prevTargets) => {
        if (!prevTargets[index]) {
          const nextTargets = [...prevTargets];
          nextTargets[index] = node;
          return nextTargets;
        }
        return prevTargets;
      });
    }, []);

    const onMouseMove = React.useCallback(
      (event) => {
        // determine the map coordinates for where the mouse is
        // containerRef uses the group so we can handle aspect ratio scaling
        const rect = containerRef.current.getBoundingClientRect();
        // since the SVG viewBox might be scaled
        const scale = rect.width / world.width;
        const coords = [
          Math.round((event.clientX - rect.left) / scale / FACTOR),
          Math.round((event.clientY - rect.top) / scale / FACTOR),
        ];
        setActiveCoords(coords);
      },
      [world.width],
    );

    const continentElements = world.continents.map(({ area, dots, name }) => {
      const {
        color: continentColor,
        onClick,
        onHover,
        ...restContinents
      } = continents[name] || {};
      const active = activeContinent && activeContinent === name;

      let interactiveProps = {};
      if (onClick || onHover) {
        interactiveProps = buildInteractiveProps(
          continents[name],
          (activate) => setActiveContinent(activate),
          active,
        );
      }

      return (
        <g key={name} {...interactiveProps} {...restContinents}>
          <path stroke="none" fill="#fff" fillOpacity="0.01" d={area} />
          <path
            d={dots}
            strokeLinecap="round"
            strokeWidth={parseMetricToNum(
              theme.worldMap.continent[active ? 'active' : 'base'],
            )}
            stroke={normalizeColor(
              continentColor || color || theme.worldMap.color,
              theme,
            )}
          />
        </g>
      );
    });

    const placesContent = [];

    const placeElements = places.map((place, index) => {
      const {
        color: placeColor,
        coords,
        content,
        dropProps,
        key,
        name,
        onClick,
        onHover,
        ...restPlace
      } = place;
      const d = `M${FACTOR * coords[0]}, ${FACTOR * coords[1]} h0`;
      const active = activePlace && activePlace === name;

      let interactiveProps = {};
      if (onClick || onHover) {
        interactiveProps = buildInteractiveProps(
          place,
          (activate) => setActivePlace(activate),
          active,
        );
      }

      if (content && targets[index]) {
        placesContent.push(
          <Drop key={key || name} {...dropProps} target={targets[index]}>
            {content}
          </Drop>,
        );
      }

      return (
        <path
          key={key}
          ref={(node) => placeRef(node, index)}
          strokeLinecap="round"
          strokeWidth={parseMetricToNum(
            theme.worldMap.place[active ? 'active' : 'base'],
          )}
          stroke={normalizeColor(
            placeColor || color || theme.worldMap.color,
            theme,
          )}
          {...interactiveProps}
          {...restPlace}
          d={d}
        />
      );
    });

    // If the caller is interested in onSelectPlace changes, track where the
    let interactiveProps = {};
    if (onSelectPlace) {
      interactiveProps = {
        onMouseOver: () => setOver(true),
        onMouseMove: over ? onMouseMove : undefined,
        onMouseLeave: () => {
          setOver(false);
          setActiveCoords(undefined);
        },
      };
    }

    let active;
    if (activeCoords) {
      const d = `M${FACTOR * activeCoords[0]}, ${FACTOR * activeCoords[1]} h0`;
      active = (
        <g
          stroke="none"
          fill="none"
          fillRule="evenodd"
          onClick={() =>
            onSelectPlace(coordToLatLon(activeCoords, world.bounds))
          }
        >
          <path
            strokeLinecap="round"
            strokeWidth={parseMetricToNum(theme.worldMap.place.active)}
            stroke={normalizeColor(
              hoverColor || color || theme.worldMap.hover.color,
              theme,
            )}
            d={d}
          />
        </g>
      );
    }

    return (
      <>
        <StyledWorldMap
          ref={ref}
          viewBox={`${world.x} ${world.y} ${world.width} ${world.height}`}
          preserveAspectRatio="xMinYMin meet"
          fillProp={fill}
          width={world.width}
          height={world.height}
          {...interactiveProps}
          {...rest}
        >
          <g ref={containerRef} stroke="none" fill="none" fillRule="evenodd">
            {continentElements}
          </g>
          {placeElements}
          {active}
        </StyledWorldMap>
        {placesContent}
      </>
    );
  },
);

WorldMap.displayName = 'WorldMap';

WorldMap.defaultProps = {};
Object.setPrototypeOf(WorldMap.defaultProps, defaultProps);
WorldMap.propTypes = WorldMapPropTypes;

export { WorldMap };
