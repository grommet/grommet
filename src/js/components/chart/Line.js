// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import Graph from './Graph';

export default class Line extends Graph {};

Line.defaultProps = {
  ...Graph.defaultProps,
  type: 'line'
};

Line.displayName = 'Line';
