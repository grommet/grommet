import React, {
  Children,
  cloneElement,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ThemeContext } from 'styled-components';
import { Close } from 'grommet-icons/icons/Close';
import { Menu } from 'grommet-icons/icons/Menu';

import { defaultProps } from '../../default-props';
import { parseMetricToNum } from '../../utils';
import { Button } from '../Button';
import { Grid } from '../Grid';
import { Layer } from '../Layer';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';

const ColumnsContext = React.createContext(undefined);

const Columns = forwardRef(
  (
    {
      aside,
      center = true,
      children,
      gap,
      gutter = 'medium',
      sidebar,
      size, // for uniform columns
      width = { max: 'xlarge' },
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const responsive = useContext(ResponsiveContext);
    const edgeSize = `${parseMetricToNum(theme.global.edgeSize[gutter])}px`;
    const [showSidebar, setShowSidebar] = useState(responsive !== 'small');

    useEffect(
      () => setShowSidebar(responsive === 'small' ? false : undefined),
      [responsive],
    );

    const gridProps = {};
    let content = children;
    let sidebarLayer;

    if (center) {
      gridProps.columns = [
        [edgeSize, 'flex'],
        ['auto', width.max],
        [edgeSize, 'flex'],
      ];
      gridProps.rows = ['auto'];
      gridProps.areas = [{ name: 'content', start: [1, 0], end: [1, 0] }];

      if (sidebar) {
        let columns;
        if (showSidebar !== undefined) {
          // responsive small, set up the sidebar
          columns = ['flex'];
          if (showSidebar === true) {
            sidebarLayer = (
              <Layer
                position="left"
                full="vertical"
                responsive={false}
                modal={false}
                onClickOutside={() => setShowSidebar(false)}
              >
                {sidebar}
              </Layer>
            );
          }
        } else columns = ['auto', 'flex'];
        content = (
          <Grid gridArea="content" columns={columns}>
            {showSidebar === undefined && sidebar}
            {content}
          </Grid>
        );
      } else if (aside) {
        content = (
          <Grid gridArea="content" columns={['flex', aside]}>
            {content}
          </Grid>
        );
      } else if (size) {
        content = (
          <Grid gridArea="content" columns={size} gap={gap}>
            {content}
          </Grid>
        );
      } else {
        content = cloneElement(Children.only(children), {
          gridArea: 'content',
        });
      }
    }
    // !center
    else if (sidebar) {
      if (showSidebar !== undefined) {
        // responsive small, set up the sidebar
        gridProps.columns = ['flex'];
        if (showSidebar === true) {
          sidebarLayer = (
            <Layer
              position="left"
              full="vertical"
              // elevation="medium"
              responsive={false}
              modal={false}
              onClickOutside={() => setShowSidebar(false)}
            >
              {sidebar}
            </Layer>
          );
        }
      } else {
        gridProps.columns = ['auto', 'flex'];
        content = [sidebar, content];
      }
    } else if (aside) {
      if (responsive === 'small') {
        gridProps.columns = ['auto'];
      } else {
        gridProps.columns = ['flex', ['auto', aside]];
      }
    }

    return (
      <ColumnsContext.Provider value={{ setShowSidebar, showSidebar, sidebar }}>
        <Grid ref={ref} {...rest} {...gridProps}>
          {content}
          {sidebarLayer}
        </Grid>
      </ColumnsContext.Provider>
    );
  },
);

const SidebarToggleButton = ({ sidebar, ...rest }) => {
  const { setShowSidebar, showSidebar } = useContext(ColumnsContext);
  if (showSidebar === undefined) return null;
  return (
    <Button
      icon={<Menu />}
      {...rest}
      onClick={() => setShowSidebar(!showSidebar)}
    />
  );
};

Columns.SidebarToggleButton = SidebarToggleButton;

const SidebarCloseButton = ({ sidebar, ...rest }) => {
  const { setShowSidebar, showSidebar } = useContext(ColumnsContext);
  if (showSidebar === undefined) return null;
  return (
    <Button icon={<Close />} {...rest} onClick={() => setShowSidebar(false)} />
  );
};

Columns.SidebarCloseButton = SidebarCloseButton;

let ColumnsDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  ColumnsDoc = require('./doc').doc(Columns);
}
const ColumnsWrapper = ColumnsDoc || Columns;

export { ColumnsWrapper as Columns };
