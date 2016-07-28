// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import Graph from './Graph';

export default class Area extends Graph {};

Area.defaultProps = {
  ...Graph.defaultProps,
  type: 'area'
};

Area.displayName = 'Area';
