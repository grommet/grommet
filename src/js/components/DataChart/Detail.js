import React, { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Box } from '../Box';
import { Drop } from '../Drop';
import { Grid } from '../Grid';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { focusStyle } from '../../utils';
import { Swatch } from './Swatch';

const DetailControl = styled(Box)`
  &:focus {
    ${focusStyle()}
  }
`;

const Detail = ({
  activeProperty,
  axis,
  data,
  pad,
  series,
  seriesStyles,
  renderValue,
}) => {
  const [detailIndex, setDetailIndex] = useState();
  const activeIndex = useRef();
  const detailRefs = useMemo(() => [], []);

  const onMouseLeave = useCallback(event => {
    // Only remove detail if the mouse isn't over the active index.
    // This helps distinguish leaving the drop on the edge where it is
    // anchored.
    const rect = activeIndex.current.getBoundingClientRect();
    if (
      event.pageX < rect.left ||
      event.pageX > rect.right ||
      event.pageY < rect.top ||
      event.pageY > rect.bottom
    ) {
      activeIndex.current = undefined;
      setDetailIndex(undefined);
    }
  }, []);

  return (
    <>
      <Keyboard
        onLeft={() => {
          if (detailIndex === undefined) setDetailIndex(data.length - 1);
          else if (detailIndex > 0) setDetailIndex(detailIndex - 1);
        }}
        onRight={() => {
          if (detailIndex === undefined) setDetailIndex(0);
          else if (detailIndex < data.length - 1)
            setDetailIndex(detailIndex + 1);
        }}
      >
        <DetailControl
          key="band"
          tabIndex={0}
          direction="row"
          fill
          justify="between"
          responsive={false}
          onFocus={() => {}}
          onBlur={() => setDetailIndex(undefined)}
        >
          {data.map((_, i) => (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              align="center"
              responsive={false}
              pad={{ horizontal: pad.horizontal }}
              onMouseOver={event => {
                activeIndex.current = event.currentTarget;
                setDetailIndex(i);
              }}
              onMouseLeave={onMouseLeave}
              onFocus={() => {}}
              onBlur={() => {}}
            >
              <Box
                ref={c => {
                  detailRefs[i] = c;
                }}
                fill="vertical"
                border={detailIndex === i ? true : undefined}
              />
            </Box>
          ))}
        </DetailControl>
      </Keyboard>
      {detailIndex !== undefined && detailRefs[detailIndex] && (
        <Drop
          key="drop"
          target={detailRefs[detailIndex]}
          align={
            detailIndex > data.length / 2
              ? { right: 'left' }
              : { left: 'right' }
          }
          plain
          onMouseLeave={onMouseLeave}
        >
          <Box pad="small" background={{ color: 'background-back' }}>
            <Grid
              columns={['auto', 'auto', 'auto']}
              gap="xsmall"
              align="center"
            >
              {series
                .filter(
                  ({ property }) =>
                    !activeProperty ||
                    activeProperty === property ||
                    (axis && axis.x && axis.x.property === property),
                )
                .map(serie => {
                  const propertyStyle = seriesStyles[serie.property];
                  return (
                    <Fragment key={serie.property}>
                      {propertyStyle ? <Swatch {...propertyStyle} /> : <span />}
                      <Text size="small">{serie.label || serie.property}</Text>
                      <Text size="small" weight="bold">
                        {renderValue(serie, detailIndex)}
                      </Text>
                    </Fragment>
                  );
                })}
            </Grid>
          </Box>
        </Drop>
      )}
    </>
  );
};

export { Detail };
