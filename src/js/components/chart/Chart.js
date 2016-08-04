// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, Children, PropTypes } from 'react';
import { padding, debounceDelay } from './utils';
import CSSClassnames from '../../utils/CSSClassnames';

import Axis from './Axis';
import Layers from './Layers';
import Base from './Base';
import Grid from './Grid';
import Area from './Area';
import Line from './Line';
import Bar from './Bar';
import Marker from './Marker';
import MarkerLabel from './MarkerLabel';
import HotSpots from './HotSpots';
import Range from './Range';

const CLASS_ROOT = CSSClassnames.CHART;
const CHART_BASE = CSSClassnames.CHART_BASE;

export default class Chart extends Component {

  constructor () {
    super();
    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);
    this.state = { alignTop: 0, alignLeft: 0, alignHeight: 0, alignWidth: 0 };
  }

  componentDidMount () {
    window.addEventListener('resize', this._onResize);
    // this._onResize();
    setTimeout(this._layout, 1);
    // setTimeout(this._layout, 100);
  }

  componentWillReceiveProps () {
    setTimeout(this._layout, 1);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._onResize);
  }

  _onResize () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, debounceDelay);
  }

  _layout () {
    const { horizontalAlignWith, verticalAlignWith, vertical,
      onMaxCount } = this.props;
    const chart = this.refs.chart;
    const chartRect = chart.getBoundingClientRect();
    const base = this.refs.chart.querySelector(`.${CHART_BASE}`);
    let alignWidth, alignLeft, alignTop, alignHeight;
    let padAlign = true;

    if (horizontalAlignWith) {
      const elem = document.getElementById(horizontalAlignWith);
      if (elem) {
        const rect = elem.getBoundingClientRect();
        alignWidth = rect.width;
        alignLeft = rect.left - chartRect.left;
        padAlign = false;
      }
    } else if (base) {
      const rect = base.getBoundingClientRect();
      alignWidth = rect.width;
      alignLeft = rect.left - chartRect.left;
    }

    if (verticalAlignWith) {
      const elem = document.getElementById(verticalAlignWith);
      if (elem) {
        const rect = elem.getBoundingClientRect();
        alignHeight = rect.height;
        alignTop = rect.top - chartRect.top;
        padAlign = false;
      }
    } else if (base) {
      const rect = base.getBoundingClientRect();
      alignHeight = rect.height;
      alignTop = rect.top - chartRect.top;
    }

    this.setState({
      alignWidth: alignWidth,
      alignLeft: alignLeft,
      alignHeight: alignHeight,
      alignTop: alignTop,
      padAlign: padAlign
    });

    if (onMaxCount) {
      let maxCount;
      if (vertical) {
        maxCount = Math.floor(alignWidth / (4 * padding));
      } else {
        maxCount = Math.floor(alignHeight / (4 * padding));
      }
      if (maxCount !== this.state.maxCount) {
        this.setState({ maxCount: maxCount }, () => {
          onMaxCount(maxCount);
        });
      }
    }
  }

  render () {
    const { vertical, full, loading } = this.props;
    const { alignHeight, alignLeft, alignTop, alignWidth, padAlign } =
      this.state;
    let classes = [CLASS_ROOT];
    if (vertical) {
      classes.push(`${CLASS_ROOT}--vertical`);
    }
    if (full) {
      classes.push(`${CLASS_ROOT}--full`);
    }
    if (loading) {
      classes.push(`${CLASS_ROOT}--loading`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    // Align Axis children towards the Base|Layers|Chart
    let axisAlign = 'end';
    let children = Children.map(this.props.children, child => {

      // name comparison is to work around webpack alias issues in development
      if (child && (
        child.type === Axis || child.type.name === 'Axis' ||
        child.type === MarkerLabel || child.type.name === 'MarkerLabel'
      )) {

        if (vertical) {
          child = React.cloneElement(child, {
            width: padAlign ? alignWidth - (2 * padding) : alignWidth,
            style: { marginLeft: padAlign ? alignLeft + padding : alignLeft },
            align: axisAlign
          });
        } else {
          child = React.cloneElement(child, {
            height: padAlign ? alignHeight - (2 * padding) : alignHeight,
            style: { marginTop: padAlign ? alignTop + padding : alignTop },
            align: axisAlign
          });
        }

      } else if (child &&
        (child.type === Layers || child.type.name === 'Layers')) {

        child = React.cloneElement(child, {
          height: alignHeight,
          width: alignWidth,
          style: { left: alignLeft, top: alignTop }
        });
        axisAlign = 'start';

      } else if (child && (
        child.type === Chart || child.type.name === 'Chart' ||
        child.type === Base || child.type.name === 'Base'
      )) {

        axisAlign = 'start';
      }

      return child;
    });

    if (loading) {
      children.push(
        <svg key="loading" className={`${CLASS_ROOT}-loading`}
          viewBox={`0 0 ${alignWidth} ${alignHeight}`}>
          <path d={`M0,${alignHeight / 2} L${alignWidth},${alignHeight / 2}`} />
        </svg>
      );
    }

    return (
      <div ref="chart" className={classes.join(' ')}>
        {children}
      </div>
    );
  }

};

Chart.propTypes = {
  full: PropTypes.bool,
  horizontalAlignWith: PropTypes.string,
  loading: PropTypes.bool,
  onMaxCount: PropTypes.func,
  vertical: PropTypes.bool,
  verticalAlignWith: PropTypes.string
};

export { Axis, Layers, Base, Grid, Area, Line, Bar, Marker, MarkerLabel,
  HotSpots, Range };
