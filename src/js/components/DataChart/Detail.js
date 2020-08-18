import React, { useMemo, useRef, useState } from 'react';
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
  series,
  seriesStyles,
  renderValue,
}) => {
  const [detailIndex, setDetailIndex] = useState();
  const detailContainer = useRef();
  const detailRefs = useMemo(() => [], []);
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
          ref={detailContainer}
          tabIndex={0}
          direction="row"
          fill
          justify="between"
          gap={`${data.length / 2 + 1}px`}
          responsive={false}
          onMouseOut={event => {
            const rect = detailContainer.current.getBoundingClientRect();
            if (
              event.pageX < rect.left ||
              event.pageX > rect.right ||
              event.pageY < rect.top ||
              event.pageY > rect.bottom
            )
              setDetailIndex(undefined);
          }}
          onFocus={() => {}}
          onBlur={() => setDetailIndex(undefined)}
        >
          {data.map((_, i) => (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              flex
              align="center"
              onMouseOver={() => setDetailIndex(i)}
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
                    <>
                      {propertyStyle ? <Swatch {...propertyStyle} /> : <span />}
                      <Text size="small">{serie.label || serie.property}</Text>
                      <Text size="small" weight="bold">
                        {renderValue(serie, detailIndex)}
                      </Text>
                    </>
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
