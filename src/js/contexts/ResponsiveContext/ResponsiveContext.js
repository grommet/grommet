import React from 'react';
import { ResponsiveContextPropType } from './propTypes';

export const ResponsiveContext = React.createContext(undefined);

ResponsiveContext.propTypes = ResponsiveContextPropType;
