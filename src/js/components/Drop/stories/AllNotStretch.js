import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import { Box, Drop, Grommet, Text, ThemeContext } from 'grommet';
import { grommet } from 'grommet/themes';

const OneDrop = ({ align, target }) => (
  <Drop align={align} target={target} stretch={false}>
    <Box pad="small" />
  </Drop>
);

OneDrop.propTypes = {
  align: PropTypes.shape({}).isRequired,
  target: PropTypes.shape({}).isRequired,
};

const Set = ({ aligns, label }) => {
  const [target, setTarget] = React.useState();
  const targetRef = React.useCallback(setTarget, []);

  return (
    <Box border pad="small">
      <Text>{label}</Text>
      <Box
        margin="xlarge"
        background="dark-3"
        pad={{ horizontal: 'large', vertical: 'medium' }}
        align="center"
        justify="center"
        ref={targetRef}
      >
        &nbsp;
      </Box>
      {target && (
        <>
          {aligns.map((align, index) => (
            <OneDrop
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              align={align}
              target={target}
            />
          ))}
        </>
      )}
    </Box>
  );
};

Set.propTypes = {
  aligns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  label: PropTypes.string.isRequired,
};

const AllDrops = () => (
  <Grommet theme={grommet}>
    <ThemeContext.Extend
      value={{
        global: {
          drop: { background: { color: 'white', opacity: 'medium' } },
        },
      }}
    >
      <Box direction="row" wrap pad="large" align="center" justify="center">
        <Set
          label="left: left"
          aligns={[
            { top: 'top', left: 'left' },
            { top: 'bottom', left: 'left' },
            { bottom: 'top', left: 'left' },
            { bottom: 'bottom', left: 'left' },
          ]}
        />
        <Set
          label="left: right"
          aligns={[
            { top: 'top', left: 'right' },
            { top: 'bottom', left: 'right' },
            { bottom: 'top', left: 'right' },
            { bottom: 'bottom', left: 'right' },
          ]}
        />
        <Set
          label="(center horizontal)"
          aligns={[
            { top: 'top' },
            { top: 'bottom' },
            { bottom: 'top' },
            { bottom: 'bottom' },
          ]}
        />
        <Set
          label="right: left"
          aligns={[
            { top: 'top', right: 'left' },
            { top: 'bottom', right: 'left' },
            { bottom: 'top', right: 'left' },
            { bottom: 'bottom', right: 'left' },
          ]}
        />
        <Set
          label="right: right"
          aligns={[
            { top: 'top', right: 'right' },
            { top: 'bottom', right: 'right' },
            { bottom: 'top', right: 'right' },
            { bottom: 'bottom', right: 'right' },
          ]}
        />
        <Set
          label="top: top"
          aligns={[
            { left: 'left', top: 'top' },
            { left: 'right', top: 'top' },
            { right: 'left', top: 'top' },
            { right: 'right', top: 'top' },
          ]}
        />
        <Set
          label="top: bottom"
          aligns={[
            { left: 'left', top: 'bottom' },
            { left: 'right', top: 'bottom' },
            { right: 'left', top: 'bottom' },
            { right: 'right', top: 'bottom' },
          ]}
        />
        <Set
          label="(center vertical)"
          aligns={[
            { left: 'left' },
            { left: 'right' },
            { right: 'left' },
            { right: 'right' },
          ]}
        />
        <Set
          label="bottom: top"
          aligns={[
            { left: 'left', bottom: 'top' },
            { left: 'right', bottom: 'top' },
            { right: 'left', bottom: 'top' },
            { right: 'right', bottom: 'top' },
          ]}
        />
        <Set
          label="bottom: bottom"
          aligns={[
            { left: 'left', bottom: 'bottom' },
            { left: 'right', bottom: 'bottom' },
            { right: 'left', bottom: 'bottom' },
            { right: 'right', bottom: 'bottom' },
          ]}
        />
        <Set label="(center vertical and horizontal)" aligns={[{}]} />
      </Box>
    </ThemeContext.Extend>
  </Grommet>
);

storiesOf('Drop', module).add('All not stretch', () => <AllDrops />);
