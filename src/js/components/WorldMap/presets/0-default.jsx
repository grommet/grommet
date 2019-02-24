import * as React from 'react';
import WorldMap from '../WorldMap';

export default (
  <WorldMap
    uxpId="worldmap0"
    color="neutral-1"
    continents={[
      {
        name: 'Africa',
        color: 'light-5',
      },
    ]}
    places={[
      {
        name: 'Sydney',
        location: [-33.8830555556, 151.216666667],
        color: 'accent-2',
      },
    ]}
    selectColor="accent-2"
  />
);
