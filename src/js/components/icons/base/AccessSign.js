// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../../../utils/CSSClassnames';
import Intl from '../../../utils/Intl';
import Props from '../../../utils/Props';

const CLASS_ROOT = CSSClassnames.CONTROL_ICON;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

export default class Icon extends Component {
  render () {
    const { className, colorIndex } = this.props;
    let { a11yTitle, size, responsive } = this.props;
    let { intl } = this.context;

    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-access-sign`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'access-sign');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fillRule="evenodd" d="M6.78342857,4.05397066 C6.9124898,4.01086862 7.07412245,3.9893176 7.14955102,4.00523597 C7.62881633,4.10221556 7.87640816,4.67282781 7.61265306,5.07127679 C7.56955102,5.1413176 7.32734694,5.30270536 7.07436735,5.43739924 C6.50889796,5.73886862 6.07836735,6.06188903 5.69069388,6.48188903 C5.41077551,6.78335842 4.99616327,7.35935842 4.99616327,7.4455625 C4.99616327,7.46172577 5.19012245,7.29470536 5.42693878,7.06866454 C5.92212245,6.59503189 6.57355102,6.15348087 7.21959184,5.85201148 C8.23714286,5.37813393 9.60979592,5.00123597 9.97053061,5.10360332 C10.3528163,5.21135842 10.5680816,5.66344005 10.4174694,6.0295625 C10.3045714,6.2933176 10.1537143,6.37413393 9.50767347,6.52474617 C9.20620408,6.59478699 8.77004082,6.7130727 8.54938776,6.79388903 C8.16710204,6.93397066 7.20342857,7.39144005 7.20342857,7.43454209 C7.20342857,7.4453176 7.35428571,7.39682781 7.54261224,7.33217475 C8.05934694,7.14384821 8.62995918,7.0738074 9.34604082,7.10613393 C10.2881633,7.14923597 11.068898,7.40760332 11.3218776,7.75217475 C11.5748571,8.10213393 11.3865306,8.64041964 10.9665306,8.76433801 C10.7725714,8.82360332 10.7025306,8.81282781 10.228898,8.65119515 C9.74987755,8.48441964 9.65828571,8.46825638 9.08767347,8.47364413 C8.7484898,8.47903189 8.39853061,8.50058291 8.30693878,8.52752168 C8.16146939,8.57601148 8.18840816,8.58678699 8.5922449,8.6460523 C9.50767347,8.78074617 10.1429388,9.07144005 10.6542857,9.58278699 C11.1497143,10.0779707 11.5266122,10.9826237 11.4350204,11.4670319 C11.3811429,11.7415625 11.0850612,11.9891543 10.8051429,11.9891543 C10.4066939,11.9891543 10.1537143,11.773889 10.0782857,11.3646645 C9.98130612,10.8156033 9.59363265,10.3632768 9.03918367,10.1533992 C8.57608163,9.97584821 7.80636735,9.94890944 7.3324898,10.0941339 C5.9164898,10.5302972 5.37820408,12.285236 6.29338776,13.4426237 C6.75110204,14.0242564 7.37559184,14.2826237 8.22073469,14.2341339 C8.90963265,14.2020523 9.28653061,14.0565829 9.65804082,13.6850727 C9.93281633,13.4159298 10.1103673,13.0336441 10.1103673,12.7321747 C10.1103673,12.570787 10.2502041,12.3393584 10.406449,12.2369911 C10.5734694,12.129236 10.960898,12.1130727 11.1333061,12.2046645 C11.800898,12.5600115 11.3701224,14.1535625 10.406449,14.8965829 C10.0834286,15.1441747 9.08204082,15.6557666 8.61379592,15.8117666 C7.94081633,16.0324196 7.51567347,16.0970727 6.42269388,16.1293992 C5.36228571,16.1614809 5.34073469,16.1614809 4.99616327,16.3285013 C4.52791837,16.5491543 3.89804082,17.065889 3.4564898,17.5936441 C3.03110204,18.0942156 3.0364898,18.0942156 2.37967347,17.7819707 C1.34595918,17.2921747 0.43077551,15.9354401 0.0754285714,14.3688278 L0,14.0350319 L0.489795918,13.701236 C1.23820408,13.189889 1.86808163,12.5438482 2.11053061,12.0325013 C2.37967347,11.4726645 2.91257143,9.83601148 3.05804082,9.13609311 C3.4564898,7.21413393 3.7795102,6.50344005 4.68930612,5.54515434 C5.32457143,4.8775625 6.19665306,4.25846046 6.78342857,4.05397066 Z M20.5760816,6.83184821 C20.9368163,6.31486862 20.9044898,6.32025638 21.6259592,6.67070536 C22.3743673,7.03144005 23.0309388,7.77421556 23.4886531,8.78637883 C23.6769796,9.19560332 24,10.1700523 24,10.3206645 C24,10.3691543 23.8976327,10.465889 23.7739592,10.5359298 C23.0578776,10.9343788 22.3202449,11.5265421 22.0349388,11.9303788 C21.6903673,12.4309503 21.0443265,14.4229503 20.8182857,15.6880931 C20.6245714,16.7808278 20.414449,17.3247462 19.881551,18.126787 C19.3322449,18.9503788 18.4601633,19.7254809 17.5234286,20.2209094 C17.0441633,20.473889 16.828898,20.4954401 16.5651429,20.317889 C16.3444898,20.1726645 16.2475102,19.9948686 16.2475102,19.741889 C16.2475102,19.4296441 16.4142857,19.2302972 16.850449,19.0096441 C17.6955918,18.5896441 18.5676735,17.7768278 18.9230204,17.0822972 C18.9876735,16.9583788 18.9014694,17.0176441 18.5676735,17.3352768 C17.6042449,18.2558482 16.1235918,18.9880931 14.6216327,19.2841747 C14.0941224,19.3916849 13.9486531,19.3701339 13.7118367,19.1602564 C13.4103673,18.8911135 13.4534694,18.3205013 13.7872653,18.105236 C13.8519184,18.0621339 14.0941224,17.9867054 14.325551,17.9382156 C14.9392653,17.8142972 15.6661224,17.5667054 16.2367347,17.286787 C16.5166531,17.152338 16.7319184,17.0338074 16.7211429,17.0230319 C16.7157551,17.0122564 16.5379592,17.0607462 16.3280816,17.130787 C15.8490612,17.2921747 15.0039184,17.3891543 14.5354286,17.3460523 C13.7169796,17.265236 12.9149388,17.0014809 12.6727347,16.732338 C12.6134694,16.6676849 12.5595918,16.5116849 12.5488163,16.3662156 C12.5167347,16.0324196 12.6835102,15.7632768 12.9849796,15.6609094 C13.2056327,15.5908686 13.264898,15.6016441 13.8516735,15.8222972 C14.126449,15.9246645 14.282449,15.9408278 14.8746122,15.9408278 C15.7251429,15.9408278 16.0589388,15.8494809 15.4452245,15.7902156 C14.6270204,15.7096441 13.8788571,15.3866237 13.3618776,14.8858074 C12.9097959,14.4550319 12.6673469,13.986787 12.5113469,13.2383788 C12.398449,12.6944605 13.0714286,12.2316033 13.5450612,12.5222972 C13.7282449,12.6408278 13.814449,12.7968278 13.9542857,13.2868686 C14.1318367,13.9005829 14.6919184,14.298787 15.5316735,14.4119298 C16.6136327,14.5520115 17.5018776,14.0996849 17.9272653,13.1952768 C18.4278367,12.1184605 17.9649796,10.8802564 16.8666122,10.3689094 C16.0915102,10.002787 14.9500408,10.1482564 14.3578776,10.6811543 C14.104898,10.9071952 13.8788571,11.3379707 13.8788571,11.5855625 C13.8788571,11.9462972 13.5235102,12.3124196 13.1789388,12.3124196 C12.9582857,12.3124196 12.6835102,12.129236 12.5652245,11.9085829 C12.4682449,11.7256441 12.4682449,11.6717666 12.5221224,11.3379707 C12.7050612,10.2611543 13.2328163,9.62050128 14.3902041,9.04450128 C15.3700408,8.55446046 15.9837551,8.43078699 17.5934694,8.38768495 L18.8586122,8.35535842 L19.1977959,8.17241964 C19.6231837,7.94074617 20.1722449,7.40784821 20.5760816,6.83184821 Z"/></svg>;
  }
}

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'AccessSign';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

