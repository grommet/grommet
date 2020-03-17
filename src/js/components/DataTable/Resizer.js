import React, { useEffect, useRef, useState, useCallback } from 'react';

import { compose } from 'recompose';

import styled, { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';

const ResizerBox = styled(Box)`
  cursor: col-resize;
`;

const Resizer = ({ onResize, property, theme }) => {
  const [start, setStart] = useState();
  const [width, setWidth] = useState();
  const [currentEvent, setCurrentEvent] = useState();
  const ref = useRef();

  const onMouseMove = event => {
    // We determined 12 empirically as being wide enough to hit but
    // not too wide to cause false hits.
    const nextWidth = Math.max(12, width + (event.clientX - start));
    onResize(property)(nextWidth);
  };

  const onMouseUp = () => {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
    setStart(undefined);
    setWidth(undefined);
    setCurrentEvent(undefined);
  };

  const onMouseDown = event => {
    if (ref.current) {
      let element = ref.current;
      // find TH parent
      while (element && element.nodeName !== 'TH') element = element.parentNode;
      const rect = element.getBoundingClientRect();
      setStart(event.clientX);
      setWidth(rect.width);
      setCurrentEvent('onMouseDown');
    }
  };

  const addMouseEvent = useCallback(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [onMouseMove, onMouseUp]);

  useEffect(() => {
    if (currentEvent === 'onMouseDown') {
      addMouseEvent();
      setCurrentEvent(undefined);
    }
  }, [currentEvent, addMouseEvent]);

  return (
    <ResizerBox
      ref={ref}
      flex={false}
      responsive={false}
      pad={{ vertical: 'small' }}
      {...theme.dataTable.resize}
      onMouseDown={onMouseDown}
      onMouseMove={start ? onMouseMove : undefined}
      onMouseUp={start ? onMouseUp : undefined}
    />
  );
};

Resizer.defaultProps = {};
Object.setPrototypeOf(Resizer.defaultProps, defaultProps);

const ResizerWrapper = compose(withTheme)(Resizer);

export { ResizerWrapper as Resizer };
