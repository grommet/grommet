import React, {
  Children,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ThemeContext } from 'styled-components';
import { Menu } from 'grommet-icons/icons/Menu';

import { defaultProps } from '../../default-props';
import { parseMetricToNum } from '../../utils';
import { Button } from '../Button';
import { Grid } from '../Grid';
import { Layer } from '../Layer';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';

const ColumnsContext = React.createContext(undefined);

const defaultMargin = { horizontal: 'medium' };

const Columns = forwardRef(
  (
    { children, columns: columnsProp, margin = defaultMargin, width, ...rest },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const responsive = useContext(ResponsiveContext);
    const childrenArray = useMemo(() => Children.toArray(children), [children]);
    const containerRef = useRef();

    // normalize columns based on presence and responsive size
    const columns = useMemo(
      () =>
        childrenArray.map((_, i) => {
          if (!columnsProp || !columnsProp[i]) return {};
          if (responsive === 'small')
            return {
              ...columnsProp[i],
              ...columnsProp[i].responsive,
              responsive: undefined,
            };
          return columnsProp[i];
        }),
      [childrenArray, columnsProp, responsive],
    );

    // where we track which children are hidden and how
    // false - show
    // undefined - show, allow to be hidden
    // true - hide, allow to be shown
    const [hidden, setHidden] = useState(columns.map(c => c.hide));

    // align hidden with latest columns
    useEffect(() => setHidden(columns.map(c => c.hide)), [columns]);

    const showControl = useCallback(
      childIndex => columns[childIndex].hide !== false,
      [columns],
    );

    const toggleHidden = useCallback(
      childIndex => {
        const column = columns[childIndex];
        const nextHidden = [...hidden];
        nextHidden[childIndex] = hidden[childIndex] ? false : column.hide;
        if (responsive === 'small') {
          if (nextHidden[childIndex] === false && !column.layer) {
            // hide all other visible columns
            nextHidden.forEach((_, i) => {
              if (i !== childIndex && nextHidden[i] !== true)
                nextHidden[i] = 'suppress';
            });
          } else if (nextHidden[childIndex] === true && !column.layer) {
            // show previously hidden columns
            nextHidden.forEach((_, i) => {
              if (i !== childIndex && nextHidden[i] === 'suppress')
                nextHidden[i] = columns[i].hide;
            });
          }
        }
        setHidden(nextHidden);
      },
      [columns, hidden, responsive],
    );

    const inlineChildrenIndexes = columns
      .map((_, i) => i)
      .filter(i => !hidden[i] && !columns[i].layer);

    const childGridColumns = inlineChildrenIndexes.map(
      i => columns[i].width || 'flex',
    );

    const layerChildIndex = columns
      .filter((column, i) => !hidden[i] && column.layer)
      .map((_, i) => i)[0];

    let layer;
    if (layerChildIndex !== undefined) {
      layer = (
        <Layer
          position={layerChildIndex ? 'right' : 'left'}
          full="vertical"
          responsive={false}
          modal={false}
          target={width ? containerRef.current : undefined}
          onClickOutside={() => toggleHidden(layerChildIndex)}
        >
          {childrenArray[layerChildIndex]}
        </Layer>
      );
    }

    const gridProps = { columns: childGridColumns };
    let content = inlineChildrenIndexes.map(i => childrenArray[i]);
    if (width) {
      const edgeSize = `${parseMetricToNum(
        theme.global.edgeSize[margin.horizontal],
      )}px`;

      gridProps.columns = [
        [edgeSize, 'flex'],
        ['auto', width],
        [edgeSize, 'flex'],
      ];
      gridProps.rows = ['auto'];
      gridProps.areas = [{ name: 'content', start: [1, 0], end: [1, 0] }];

      content = (
        <Grid ref={containerRef} gridArea="content" columns={childGridColumns}>
          {content}
        </Grid>
      );
    }

    return (
      <ColumnsContext.Provider value={{ showControl, toggleHidden }}>
        <Grid ref={ref} {...rest} {...gridProps}>
          {content}
          {layer}
        </Grid>
      </ColumnsContext.Provider>
    );
  },
);

const ControlButton = ({ child, ...rest }) => {
  const { showControl, toggleHidden } = useContext(ColumnsContext);
  if (!showControl(child)) return null;
  return (
    <Button icon={<Menu />} {...rest} onClick={() => toggleHidden(child)} />
  );
};

Columns.ControlButton = ControlButton;

let ColumnsDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  ColumnsDoc = require('./doc').doc(Columns);
}
const ColumnsWrapper = ColumnsDoc || Columns;

export { ColumnsWrapper as Columns };
