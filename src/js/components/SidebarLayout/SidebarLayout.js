import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { Close } from 'grommet-icons/icons/Close';
import { Menu } from 'grommet-icons/icons/Menu';

import { Button } from '../Button';
import { Grid } from '../Grid';
import { Layer } from '../Layer';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';

const SidebarLayoutContext = React.createContext(undefined);

const SidebarLayout = forwardRef(({ children, sidebar, ...rest }, ref) => {
  const responsive = useContext(ResponsiveContext);
  const [show, setShow] = useState(responsive !== 'small');

  useEffect(() => setShow(responsive === 'small' ? false : undefined), [
    responsive,
  ]);

  const gridProps = {};
  let content = children;
  let layer;

  //   let columns;
  //   if (showSidebar !== undefined) {
  //     // responsive small, set up the sidebar
  //     columns = ['flex'];
  //     if (showSidebar === true) {
  //       sidebarLayer = (
  //         <Layer
  //           position="left"
  //           full="vertical"
  //           responsive={false}
  //           modal={false}
  //           onClickOutside={() => setShowSidebar(false)}
  //         >
  //           {sidebar}
  //         </Layer>
  //       );
  //     }

  if (show !== undefined) {
    // responsive small, set up the sidebar
    gridProps.columns = ['flex'];
    if (show === true) {
      layer = (
        <Layer
          position="left"
          full="vertical"
          // elevation="medium"
          responsive={false}
          modal={false}
          onClickOutside={() => setShow(false)}
        >
          {sidebar}
        </Layer>
      );
    }
  } else {
    gridProps.columns = ['auto', 'flex'];
    content = [sidebar, content];
  }

  return (
    <SidebarLayoutContext.Provider value={{ setShow, show, sidebar }}>
      <Grid ref={ref} {...rest} {...gridProps}>
        {content}
        {layer}
      </Grid>
    </SidebarLayoutContext.Provider>
  );
});

const ToggleButton = props => {
  const { setShow, show } = useContext(SidebarLayoutContext);
  if (show === undefined) return null;
  return <Button icon={<Menu />} {...props} onClick={() => setShow(!show)} />;
};

SidebarLayout.ToggleButton = ToggleButton;

const CloseButton = props => {
  const { setShow, show } = useContext(SidebarLayoutContext);
  if (show === undefined) return null;
  return <Button icon={<Close />} {...props} onClick={() => setShow(false)} />;
};

SidebarLayout.CloseButton = CloseButton;

let SidebarLayoutDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  SidebarLayoutDoc = require('./doc').doc(SidebarLayout);
}
const SidebarLayoutWrapper = SidebarLayoutDoc || SidebarLayout;

export { SidebarLayoutWrapper as SidebarLayout };
