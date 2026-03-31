import React from 'react';
import { ResponsiveContextPropTypes } from './propTypes';

export const ResponsiveContext = React.createContext(undefined);

ResponsiveContext.propTypes = ResponsiveContextPropTypes;
