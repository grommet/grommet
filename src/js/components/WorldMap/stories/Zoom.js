import React from 'react';

import { Box, Button, CheckBox, Text, WorldMap } from 'grommet';
import { Add, Subtract } from 'grommet-icons';

const placeProps = (name, color, showDrop) => ({
  name,
  color,
  ...(showDrop
    ? {
        content: (
          <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
            <Text>{name}</Text>
          </Box>
        ),
        dropProps: {
          align: { left: 'right' },
          background: { color, opacity: 'strong' },
          elevation: 'medium',
          margin: { left: 'small' },
          round: 'xsmall',
        },
      }
    : {}),
});

export const Zoom = () => {
  const [showDrops, setShowDrops] = React.useState(true);
  const [zoom, setZoom] = React.useState(1.0);
  console.log('!!!', { zoom });
  return (
    <Box align="center" pad="large">
      <Box direction="row" gap="medium" alignSelf="stretch">
        <CheckBox
          label="show"
          checked={showDrops}
          onChange={() => setShowDrops(!showDrops)}
        />
        <Button
          icon={<Subtract />}
          hoverIndicator
          onClick={() => setZoom(zoom - 0.1)}
        />
        <Button
          icon={<Add />}
          hoverIndicator
          onClick={() => setZoom(zoom + 0.1)}
        />
        {zoom !== 1.0 && (
          <Button
            label="reset zoom"
            hoverIndicator
            onClick={() => setZoom(1.0)}
          />
        )}
      </Box>
      <Box fill="horizontal" overflow="hidden">
        <WorldMap
          places={[
            {
              location: [-33.8830555556, 151.216666667],
              ...placeProps('Sydney', 'graph-1', showDrops),
            },
            {
              location: [42.358056, -71.063611],
              ...placeProps('Boston', 'graph-2', showDrops),
            },
            {
              location: [51.507222, -0.1275],
              ...placeProps('London', 'graph-3', showDrops),
            },
            {
              location: [-0.002222, -78.455833],
              ...placeProps('Quito', 'graph-1', showDrops),
            },
            {
              location: [34.05, -118.25],
              ...placeProps('Los Angeles', 'graph-2', showDrops),
            },
            {
              location: [35.689722, 139.692222],
              ...placeProps('Tokyo', 'graph-3', showDrops),
            },
            {
              location: [78.22, 15.65],
              ...placeProps('Svalbard', 'graph-1', showDrops),
            },
            {
              location: [-54.801944, -68.303056],
              ...placeProps('Ushuaia', 'graph-2', showDrops),
            },
          ]}
          zoom={zoom}
        />
      </Box>
    </Box>
  );
};

export default {
  title: 'Visualizations/WorldMap/Zoom',
};
