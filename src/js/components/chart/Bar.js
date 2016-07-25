// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import Graph from './Graph';

export default class Bar extends Graph {};

Bar.defaultProps = {
  ...Graph.defaultProps,
  type: 'bar'
};

Bar.displayName = 'Bar';
