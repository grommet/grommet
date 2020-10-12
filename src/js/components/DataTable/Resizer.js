import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled, { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Stack } from '../Stack';

const InteractionBox = styled(Box)`
  cursor: col-resize;
  > * {
    opacity: 0;
  }

  // when mouse down, we want to continue to display styling
  ${props => props.active && '> * { opacity: 1; }'}

  &:hover {
    > * {
      opacity: 1;
    }
  }
`;

const Resizer = ({ onResize, property }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const [active, setActive] = useState(false);
  const [start, setStart] = useState();
  const [width, setWidth] = useState();
  const ref = useRef();

  const onMouseDown = useCallback(event => {
    if (ref.current) {
      let element = ref.current;
      // find TH parent
      while (element && element.nodeName !== 'TH') element = element.parentNode;
      const rect = element.getBoundingClientRect();
      setStart(event.clientX);
      setWidth(rect.width);
      setActive(true);
    }
  }, []);

  const onMouseMove = useCallback(
    event => {
      // We determined 12 empirically as being wide enough to hit but
      // not too wide to cause false hits.
      const nextWidth = Math.max(12, width + (event.clientX - start));
      onResize(property, nextWidth);
    },
    [onResize, property, start, width],
  );

  const onMouseUp = useCallback(() => {
    setActive(false);
    setStart(undefined);
    setWidth(undefined);
  }, []);

  useEffect(() => {
    const remove = () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };

    if (active) {
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMouseMove);
      return remove;
    }
    remove();
    return undefined;
  }, [active, onMouseMove, onMouseUp]);

  let border;
  if (theme.dataTable.resize.hover && theme.dataTable.resize.hover.border) {
    const { color, side = 'end', size } = theme.dataTable.resize.hover.border;
    border = {
      color,
      side,
      size,
    };
  }

  return (
    <Stack anchor="right">
      <Box
        flex={false}
        responsive={false}
        pad={{ vertical: 'small' }}
        {...theme.dataTable.resize}
      />
      {/* provides a wider, more accessible target to grab resizer */}
      <InteractionBox
        active={active}
        flex={false}
        pad={{ left: 'xsmall' }}
        ref={ref}
        responsive={false}
        onMouseDown={onMouseDown}
        onMouseMove={start !== undefined ? onMouseMove : undefined}
        onMouseUp={start !== undefined ? onMouseUp : undefined}
      >
        <Box pad={{ vertical: 'small' }} border={border} />
      </InteractionBox>
    </Stack>
  );
};

Resizer.displayName = 'Resizer';

Resizer.defaultProps = {};
Object.setPrototypeOf(Resizer.defaultProps, defaultProps);

export { Resizer };
