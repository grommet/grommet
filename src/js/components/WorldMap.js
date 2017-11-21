// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';

const CLASS_ROOT = CSSClassnames.WORLD_MAP;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

// The graphic is drawn as a rectangular grid using coordinates spaced
// by FACTOR pixels. The contents have both an area boundary for interaction
// and dots described as rows where each row is described by three values:
// a starting coordinate and a length. This approach is more efficient than
// describing it via SVG elements, keeping the code/library size smaller.
const CONTINENTS = [
  {
    id: 'Australia',
    origin: [74, 32],
    area: [[4, 0], [7, 1], [15, 7], [13, 9], [0, 6], [0, 2]],
    dots: [
      [4, 0, 1], [2, 1, 6], [0, 2, 9], [0, 3, 10], [0, 4, 10],
      [0, 5, 3], [5, 5, 5], [5, 6, 4], [15, 7, 1], [14, 8, 1],
      [13, 9, 1]
    ]
  }, {
    id: 'Asia',
    origin: [52, 1],
    area: [
      [16, 0], [38, 5], [40, 7], [28, 17], [24, 25], [29, 29], [19, 29],
      [11, 24], [3, 23], [0, 20], [0, 19], [6, 13], [7, 6]
    ],
    dots: [
      [16, 0, 1], [17, 1, 2], [18, 2, 2], [15, 3, 6], [28, 3, 1], [30, 3, 1],
      [10, 4, 2], [13, 4, 10], [24, 4, 1], [9, 5, 22], [32, 5, 1], [38, 5, 1],
      [7, 6, 2], [10, 6, 1], [12, 6, 27], [7, 7, 34], [7, 8, 31], [7, 9, 26],
      [34, 9, 3], [7, 10, 22], [31, 10, 1], [33, 10, 1], [7, 11, 21],
      [32, 11, 2], [7, 12, 21], [32, 12, 1], [6, 13, 22], [32, 13, 1],
      [6, 14, 22], [5, 15, 22], [3, 16, 2], [6, 16, 20], [2, 17, 3],
      [6, 17, 16], [24, 17, 1], [28, 17, 1], [1, 18, 22], [26, 18, 2],
      [0, 19, 24], [0, 20, 5], [6, 20, 17], [2, 21, 5], [10, 21, 14],
      [2, 22, 5], [11, 22, 4], [16, 22, 4], [3, 23, 3], [11, 23, 2],
      [17, 23, 3], [23, 23, 1], [11, 24, 2], [18, 24, 2], [23, 24, 1],
      [24, 25, 1], [18, 26, 1], [22, 26, 1], [18, 27, 1], [20, 27, 4],
      [18, 28, 1], [21, 28, 1], [23, 28, 1], [26, 28, 3], [19, 29, 1],
      [28, 29, 2]
    ]
  }, {
    // 21X, 40Y
    id: 'Africa',
    origin: [40, 19],
    area: [
      [3, 0], [6, 0], [11, 2], [16, 7], [16, 15], [11, 18], [9, 18], [0, 6],
      [0, 3]
    ],
    dots: [
      [3, 0, 4], [2, 1, 6], [9, 1, 2], [1, 2, 11], [0, 3, 13], [0, 4, 14],
      [0, 5, 14], [0, 6, 16], [1, 7, 16], [2, 8, 2], [6, 8, 11], [7, 9, 9],
      [7, 10, 8], [7, 11, 7], [8, 12, 7], [7, 13, 8], [7, 14, 7], [16, 14, 1],
      [8, 15, 5], [15, 15, 2], [8, 16, 5], [9, 17, 3], [9, 18, 3]
    ]
  }, {
    id: 'Europe',
    origin: [39, 2],
    area: [
      [8, 0], [10, 0], [20, 2], [19, 11], [18, 13], [14, 16], [3, 16], [0, 7]
    ],
    dots: [
      [8, 0, 3], [9, 1, 1], [20, 2, 1], [19, 3, 1], [12, 4, 1], [19, 4, 1],
      [9, 5, 6], [9, 6, 7], [17, 6, 3], [0, 7, 1], [8, 7, 12], [7, 8, 3],
      [11, 8, 9], [7, 9, 3], [11, 9, 9], [4, 10, 1], [7, 10, 1], [9, 10, 1],
      [11, 10, 9], [3, 11, 2], [7, 11, 13], [4, 12, 1], [6, 12, 13],
      [4, 13, 15], [5, 14, 3], [9, 14, 4], [15, 14, 2], [3, 15, 3], [8, 15, 1],
      [10, 15, 5], [6, 15, 2], [3, 16, 2], [10, 16, 5]
    ]
  }, {
    id: 'SouthAmerica',
    origin: [22, 26],
    area: [[2, 0], [5, 0], [11, 4], [11, 8], [3, 18], [2, 17], [0, 4], [0, 3]],
    dots: [
      [2, 0, 4], [1, 1, 7], [1, 2, 7], [0, 3, 10], [0, 4, 12], [1, 5, 11],
      [2, 6, 9], [3, 7, 8], [3, 8, 8], [3, 9, 6], [3, 10, 6], [3, 11, 5],
      [3, 12, 3], [2, 13, 3], [2, 14, 3], [2, 15, 2], [2, 16, 2], [2, 17, 2],
      [3, 18, 1]
    ]
  }, {
    id: 'NorthAmerica',
    origin: [0, 0],
    area: [[21, 0], [39, 0], [39, 6], [22, 26], [16, 23], [2, 12], [0, 7]],
    dots: [
      [22, 0, 6], [29, 0, 1], [31, 0, 1], [33, 0, 5], [20, 1, 1],
      [22, 1, 1], [24, 1, 2], [27, 1, 13], [17, 2, 1], [20, 2, 5], [26, 2, 13],
      [13, 3, 1], [19, 3, 1], [21, 3, 3], [26, 3, 14], [14, 4, 1], [16, 4, 4],
      [21, 4, 3], [29, 4, 11], [12, 5, 3], [16, 5, 1], [18, 5, 1], [20, 5, 3],
      [24, 5, 1], [30, 5, 8], [14, 6, 3], [19, 6, 1], [22, 6, 4], [31, 6, 8],
      [0, 7, 15], [16, 7, 1], [18, 7, 4], [24, 7, 2], [30, 7, 7], [2, 8, 20],
      [24, 8, 3], [29, 8, 5], [2, 9, 20], [24, 9, 2], [30, 9, 3], [1, 10, 18],
      [23, 10, 2], [31, 10, 1], [2, 11, 2], [8, 11, 11], [23, 11, 2],
      [26, 11, 1], [2, 12, 1], [8, 12, 13], [24, 12, 3], [10, 13, 12],
      [23, 13, 5], [11, 14, 17], [11, 15, 9], [21, 15, 6], [28, 15, 2],
      [11, 16, 11], [23, 16, 4], [11, 17, 14], [12, 18, 11], [12, 19, 12],
      [13, 20, 9], [15, 21, 3], [22, 21, 1], [16, 22, 2], [16, 23, 2],
      [20, 23, 1], [23, 23, 1], [18, 24, 3], [21, 25, 1], [22, 26, 1]
    ]
  }
];

// FACTOR is the distance in pixels between coordinates
const FACTOR = 10;

// helper function to detect if any series elements have
const clickableSeries = (props) =>
  props.series && props.series.some((serie) => serie.onClick);

const maxCoordinate = (a, b) =>
  [Math.max(a[0], b[0]), Math.max(a[1], b[1])];
const minCoordinate = (a, b) =>
  [Math.min(a[0], b[0]), Math.min(a[1], b[1])];

// Based on https://stackoverflow.com/a/43861247
const MAP_LAT_BOTTOM = -50.0; // empirically determined
const MAP_LAT_BOTTOM_RAD = MAP_LAT_BOTTOM * Math.PI / 180;
const MAP_LON_LEFT = -171.0; // empirically determined
const MAP_LON_RIGHT = 184.0; // empirically determined
const MAP_LON_DELTA = (MAP_LON_RIGHT - MAP_LON_LEFT);

const mapValues = (extent) => {
  const mapRadius = ((extent[0] / MAP_LON_DELTA) * 360) / (2 * Math.PI);
  const mapOffsetY = Math.round(mapRadius / 2 *
    Math.log((1 + Math.sin(MAP_LAT_BOTTOM_RAD)) /
      (1 - Math.sin(MAP_LAT_BOTTOM_RAD))));
  return { mapRadius, mapOffsetY };
};

const latLonToCoord = (latLon, origin, extent) => {
  const { mapRadius, mapOffsetY } = mapValues(extent);
  const x =
    Math.round(((latLon[1] - MAP_LON_LEFT) * extent[0]) / MAP_LON_DELTA);
  const latitudeRad = latLon[0] * Math.PI / 180;
  const y = extent[1] + mapOffsetY -
    Math.round(((mapRadius / 2) *
      Math.log((1 + Math.sin(latitudeRad)) /
        (1 - Math.sin(latitudeRad)))));
  return [x, y]; // the coordinate value of this point on the map image
};

const coordToLatLon = (coord, origin, extent) => {
  const { mapRadius, mapOffsetY } = mapValues(extent);
  const a = ((extent[1] + mapOffsetY) - coord[1]) / mapRadius;
  const lat = 180 / Math.PI * (2 * Math.atan(Math.exp(a)) - Math.PI/2);
  const lon = ((coord[0] * MAP_LON_DELTA) / extent[0]) + MAP_LON_LEFT;
  return [lat, lon];
};

export default class WorldMap extends Component {

  constructor(props, context) {
    super(props, context);
    this._renderPlace = this._renderPlace.bind(this);
    this._activateContinent = this._activateContinent.bind(this);
    this._activatePlace = this._activatePlace.bind(this);
    this._onEnter = this._onEnter.bind(this);
    this._onMouseOver = this._onMouseOver.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = this._buildState();
    this.state = { ...this.state, ...this._updateState(props) };
    this.state.clickable = clickableSeries(props);
    this._flagRefs = {};
  }

  componentDidMount () {
    const { clickable } = this.state;
    if (clickable) {
      this._startKeyboardListening();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this._updateState(nextProps) });

    const { clickable } = this.state;
    const nextClickable = clickableSeries(nextProps);
    if (nextClickable !== clickable) {
      if (nextClickable) {
        this._startKeyboardListening();
      } else {
        this._stopKeyboardListening();
      }
      this.setState({ clickable: nextClickable });
    }
  }

  componentDidUpdate() {
    // place flags
    const { series } = this.props;
    const { continents, places, zoomedOrigin, width } = this.state;
    const flagged = (series || []).filter(s => s.flag);
    if (flagged.length > 0) {
      const rect = this._worldMapRef.getBoundingClientRect();
      const scale = rect.width / width;
      flagged.forEach((serie, index) => {
        const placeState = places[index];
        let x;
        let y;
        if (serie.continent) {
          const continentState = continents[serie.continent];
          x = ((continentState.mid[0] - zoomedOrigin[0]) * FACTOR * scale);
          y = ((continentState.mid[1] - zoomedOrigin[1]) * FACTOR * scale);
        } else if (serie.place) {
          x = placeState.place[0] * FACTOR * scale;
          y = placeState.place[1] * FACTOR * scale;
        }
        const flag = this._flagRefs[index];
        const flagRect = flag.getBoundingClientRect();
        const xOffset = (x > (rect.width / 2)) ? (FACTOR / 2) :
          -(flagRect.width + (FACTOR / 2));
        const yOffset = (y > (rect.height / 2)) ? (FACTOR / 2) :
          -(flagRect.height + (FACTOR / 2));
        flag.style.top = `${y + yOffset}px`;
        flag.style.left = `${x + xOffset}px`;
      });
    }
  }

  componentWillUnmount () {
    const { clickable } = this.state;
    if (clickable) {
      this._stopKeyboardListening();
    }
  }

  _buildState () {
    let state = {
      activeContinent: undefined, activePlace: undefined, continents: {}
    };

    // Build the SVG paths describing the individual dots
    let totalExtent = [0, 0];
    CONTINENTS.forEach(continent => {
      const origin = continent.origin;

      let extent = [...origin];
      const dots = continent.dots.map(segment => {
        const dots = Array.apply(null, Array(segment[2]))
          .map(() => {
            return 'h0';
          }).join(' m10,0 ');
        const x = FACTOR * (origin[0] + segment[0] + 1);
        const y = FACTOR * (origin[1] + segment[1] + 1);
        extent = maxCoordinate(extent,
          [(origin[0] + segment[0] + segment[2]),
            (origin[1] + segment[1])]);
        return `M${x},${y} ${dots}`;
      }).join(' ');

      const area = continent.area.map((point, index) => {
        const x = FACTOR * (point[0] + origin[0] + 1);
        const y = FACTOR * (point[1] + origin[1] + 1);
        return `${index === 0 ? 'M' : 'L'}${x},${y}`;
      }).join(' ') + ' Z';

      const mid = [
        origin[0] + ((extent[0] - origin[0]) / 2),
        origin[1] + ((extent[1] - origin[1]) / 2)
      ];
      state.continents[continent.id] = { area, dots, origin, extent, mid };
      totalExtent = maxCoordinate(totalExtent, extent);
    });

    state.origin = [0, 0];
    state.extent = totalExtent;

    return state;
  }

  _updateState(props) {
    const { series, zoom } = props;
    const continents = { ...this.state.continents };

    // convert places using lat,lon
    const places = (series || []).filter(s => s.place).map((serie) => {
      let place = serie.place;
      if (place[0] % 1) {
        place = latLonToCoord(place, this.state.origin, this.state.extent);
      }
      return { place, id: place.join(',') };
    });

    // update how much of the map to show
    const haveSomeContinents =
      (series || []).filter(s => s.continent).length > 0;
    let origin = [...this.state.extent];
    let extent = [...this.state.origin];
    CONTINENTS.forEach(continent => {
      const continentState = continents[continent.id];
      const serie = (series || []).filter(s => s.continent === continent.id)[0];
      // see if any places are within the continent
      const includedPlaces = places.filter(s => (
        s.place[0] >= continentState.origin[0] &&
        s.place[0] <= continentState.extent[0] &&
        s.place[1] >= continentState.origin[1] &&
        s.place[1] <= continentState.extent[1]
      ));
      let visible = ((!haveSomeContinents && !zoom) ||
        serie || includedPlaces.length > 0);
      if (visible || !zoom) {
        origin = minCoordinate(origin, continentState.origin);
        extent = maxCoordinate(extent, continentState.extent);
      }
      continents[continent.id].visible = visible;
      continents[continent.id].serie = serie;
    });

    return {
      continents,
      places,
      zoomedOrigin: origin,
      x: (origin[0] * FACTOR), y: (origin[1] * FACTOR),
      width: ((extent[0] - origin[0] + 1) * FACTOR),
      height: ((extent[1] - origin[1] + 2) * FACTOR)
    };
  }

  _startKeyboardListening() {
    this._keyboardHandlers = {
      enter: this._onEnter,
      space: this._onEnter
    };
    KeyboardAccelerators.startListeningToKeyboard(
      this, this._keyboardHandlers
    );
  }

  _stopKeyboardListening() {
    KeyboardAccelerators.stopListeningToKeyboard(
      this, this._keyboardHandlers
    );
  }

  _activateContinent (activeContinent) {
    this.setState({ activeContinent });
  }

  _activatePlace (activePlace) {
    this.setState({ activePlace });
  }

  _onEnter () {
    const { series } = this.props;
    const { activeContinent, activePlace } = this.state;
    if (this._worldMapRef.contains(document.activeElement)) {
      series.some((serie) => {
        if ((activeContinent && serie.continent === activeContinent) ||
          (activePlace && serie.place.join(',') === activePlace.join(','))) {
          if (serie.onClick) {
            serie.onClick();
          }
          return true;
        }
        return false;
      });
    }
  }

  _onMouseOver () {
    // track when we're over the map to avoid dealing with mouse moves
    this.setState({ over: true });
  }

  _onMouseMove (event) {
    const { width } = this.state;
    // determine the map coordinates for where the mouse is
    const rect = this._worldMapRef.getBoundingClientRect();
    const scale = rect.width / width; // since the SVG viewBox might be scaled
    const place = [
      Math.round(((event.clientX - rect.left) / scale) / FACTOR),
      Math.round(((event.clientY - rect.top) / scale) / FACTOR)
    ];
    this.setState({ activePlace: place });
  }

  _onMouseLeave () {
    this.setState({ over: false, activePlace: undefined });
  }

  _interactiveProps (serie, defaultLabel, activeFunc, activeValue, active) {
    return {
      role: 'button',
      'aria-label': serie.label || defaultLabel,
      tabIndex: '0',
      onClick: serie.onClick,
      onMouseOver: () => {
        if (!active) {
          activeFunc(activeValue);
          if (serie.onHover) {
            serie.onHover(true);
          }
        }
      },
      onMouseLeave: () => {
        if (active) {
          activeFunc(undefined);
          if (serie.onHover) {
            serie.onHover(false);
          }
        }
      },
      onFocus: () => {
        // This moves the map unnecessarily. Instead, we should check
        // the position and scroll if it isn't already visible
        // this._worldMapRef.scrollIntoView();
        if (!active) {
          activeFunc(activeValue);
        }
      },
      onBlur: () => {
        if (active) {
          activeFunc(undefined);
        }
      }
    };
  }

  _renderContinent (continent, index, mapColorIndex, serie) {
    const { activeContinent, continents } = this.state;
    const active = continent.id === activeContinent;
    // only graph color if they explicitly asked for this continent
    const colorIndex =
      (serie || {}).colorIndex || mapColorIndex ||
      (serie ? `graph-${index}` : 'light-2');

    const classes = classnames(
      `${CLASS_ROOT}__continent`,
      `${COLOR_INDEX}-${colorIndex}`, {
        [`${CLASS_ROOT}__continent--active`]: active
      }
    );
    let area;
    let interactiveProps = {};
    if (serie && (serie.onClick || serie.onHover)) {
      area = (
        <path stroke='none' fill='#fff' fillOpacity='0.01'
          d={continents[continent.id].area} />
      );
      interactiveProps = this._interactiveProps(
        serie, continent.id, this._activateContinent, continent.id, active);
    }
    // We add the area so the mouse events work for the whole region,
    // not just the dots
    return (
      <g key={continent.id} className={classes} {...interactiveProps}>
        {area}
        <path d={continents[continent.id].dots} />
      </g>
    );
  }

  _renderPlace(serie, index) {
    const { colorIndex: mapColorIndex } = this.props;
    const { activePlace, places } = this.state;
    const {
      colorIndex: serieColorIndex, onClick, onHover, place, ...rest
    } = serie;
    delete rest.flag;
    const placeState = places[index];
    const active = (activePlace && activePlace.join(',') === placeState.id);
    const colorIndex =
      serieColorIndex || mapColorIndex || `graph-${index}`;
    const classes = classnames(
      `${CLASS_ROOT}__place`,
      `${COLOR_INDEX}-${colorIndex}`, {
        [`${CLASS_ROOT}__place--active`]: active
      }
    );
    const d =
      `M${FACTOR * placeState.place[0]},${FACTOR * placeState.place[1]} h0`;
    let interactiveProps = {};
    if (onClick || onHover) {
      interactiveProps =
        this._interactiveProps(serie, 'place', this._activatePlace, place,
          active);
    }
    return (
      <path key={`${place.join(',')}__${index}`} {...rest} className={classes}
        {...interactiveProps} d={d}  />
    );
  }

  render () {
    const {
      className, colorIndex, onSelectPlace, series, ...props
    } = this.props;
    delete props.zoom;
    const {
      activePlace, over, x, y, width, height, origin, extent
    } = this.state;
    const classes = classnames(
      CLASS_ROOT,
      className
    );

    const continents = [];
    CONTINENTS.forEach((continent, index) => {
      const continentState = this.state.continents[continent.id];
      if (continentState.visible) {
        const serie = continentState.serie;
        continents.push(
          this._renderContinent(continent, index, colorIndex, serie));
      }
    });

    const seriesPlaces = (series || []).filter(s => s.place);
    let placesGroup;
    if (seriesPlaces.length > 0) {
      const places = seriesPlaces.map(this._renderPlace);
      placesGroup = (
        <g stroke='none' fill='none' fillRule='evenodd'>
          {places}
        </g>
      );
    }

    // If the caller is interested in onSelectPlace changes, track where the
    // user goes.
    let interactiveProps = {};
    let activeGroup;
    if (onSelectPlace) {
      interactiveProps = {
        onMouseOver: this._onMouseOver,
        onMouseMove: over ? this._onMouseMove : undefined,
        onMouseLeave: this._onMouseLeave
      };

      if (activePlace) {
        const classes = classnames(
          `${CLASS_ROOT}__place`,
          `${COLOR_INDEX}-${colorIndex || 'light-2'}`,
          `${CLASS_ROOT}__place--active`
        );
        const d = `M${FACTOR * activePlace[0]},${FACTOR * activePlace[1]} h0`;
        activeGroup = (
          <g stroke='none' fill='none' fillRule='evenodd'
            onClick={() => onSelectPlace(activePlace,
              coordToLatLon(activePlace, origin, extent))}>
            <path className={classes} d={d} />
          </g>
        );
      }
    }

    let contents = (
      <svg {...props} {...interactiveProps}
        ref={(ref) => this._worldMapRef = ref}
        className={classes} version='1.1'
        preserveAspectRatio='xMidYMid meet'
        width={`${width}px`}
        viewBox={`${x} ${y} ${width} ${height}`}>
        <g stroke='none' fill='none' fillRule='evenodd'>
          {continents}
        </g>
        {activeGroup}
        {placesGroup}
      </svg>
    );

    const flagged = (series || []).filter(s => s.flag);
    if (flagged.length > 0) {
      contents = (
        <div className={`${CLASS_ROOT}__container`}>
          {contents}
          {flagged.map((serie, index) => (
            <div key={index} className={`${CLASS_ROOT}__flag`}
              ref={ref => (this._flagRefs[index] = ref)}>{serie.flag}</div>
          ))}
        </div>
      );
    }

    return contents;
  }
}

WorldMap.propTypes = {
  colorIndex: PropTypes.string,
  // onSelectPlace is passed a place coordinate when the user clicks on it
  onSelectPlace: PropTypes.func,
  // either continent or place must be provided for a series item
  series: PropTypes.arrayOf(PropTypes.shape({
    continent: PropTypes.oneOf(CONTINENTS.map(c => c.id)),
    colorIndex: PropTypes.string,
    flag: PropTypes.node,
    label: PropTypes.string, // for a11y aria-label
    onClick: PropTypes.func,
    onHover: PropTypes.func,
    place: PropTypes.arrayOf(PropTypes.number)
  })),
  zoom: PropTypes.bool
};
