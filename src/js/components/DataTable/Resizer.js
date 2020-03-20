import React, { useCallback, useEffect, useRef, useState } from 'react';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';
import { Box } from '../Box';

const ResizerBox = styled(Box)`
  cursor: col-resize;
`;

const Resizer = ({ onResize, property, theme }) => {
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

  return (
    <ResizerBox
      ref={ref}
      flex={false}
      responsive={false}
      pad={{ vertical: 'small' }}
      {...theme.dataTable.resize}
      onMouseDown={onMouseDown}
      onMouseMove={start !== undefined ? onMouseMove : undefined}
      onMouseUp={start !== undefined ? onMouseUp : undefined}
    />
  );
};

Resizer.defaultProps = {};
Object.setPrototypeOf(Resizer.defaultProps, defaultProps);

const ResizerWrapper = compose(withTheme)(Resizer);

export { ResizerWrapper as Resizer };
