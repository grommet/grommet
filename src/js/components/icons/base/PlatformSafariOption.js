import PropTypes from 'prop-types';
// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

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
      `${CLASS_ROOT}-platform-safari-option`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'platform-safari-option');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fillRule="evenodd" d="M12.5410065,11.8438452 C12.5626839,11.4304258 12.2112,11.0719742 11.7660387,11.0541677 C11.2961032,11.0348129 10.9392,11.3785548 10.9314581,11.8562323 C10.9244903,12.2789419 11.2682323,12.6141677 11.7219097,12.6281032 C12.1717161,12.6420387 12.5162323,12.3114581 12.5410065,11.8438452 M17.2140387,5.12152258 C17.1962323,5.1075871 17.1784258,5.09442581 17.1613935,5.08126452 C17.1079742,5.12616774 17.0522323,5.16874839 17.0019097,5.21674839 C15.0865548,7.0035871 13.1696516,8.78810323 11.2597161,10.5811355 C11.0398452,10.7886194 10.8277161,11.0208774 10.6721032,11.2771355 C9.2708129,13.5842323 7.88345806,15.8998452 6.49300645,18.2131355 C6.43649032,18.3068129 6.3908129,18.4074581 6.33971613,18.5050065 C6.42565161,18.5019097 6.47287742,18.4732645 6.51236129,18.4361032 C8.45171613,16.6237161 10.3949419,14.8152 12.3257806,12.9927484 C12.5773935,12.755071 12.7949419,12.4662968 12.975329,12.1690065 C14.3472,9.91300645 15.7066839,7.64771613 17.0684903,5.38552258 C17.1203613,5.2995871 17.1660387,5.20978065 17.2140387,5.12152258 M17.1443613,4.02836129 C19.1425548,5.42190968 20.3952,7.28461935 21.0339097,9.63507097 C20.8008774,9.69236129 20.5841032,9.72797419 20.3820387,9.80152258 C20.295329,9.83403871 20.2372645,9.94552258 20.1660387,10.0206194 C20.2604903,10.0624258 20.3588129,10.1452645 20.4486194,10.1375226 C20.6545548,10.1181677 20.8573935,10.0546839 21.1043613,9.99971613 C21.5533935,12.4066839 21.1717161,14.6286194 19.9206194,16.7290065 C19.7255226,16.6105548 19.5644903,16.4874581 19.3841032,16.4123613 C19.2648774,16.3620387 19.1177806,16.379071 18.983071,16.3666839 C19.0488774,16.4758452 19.0937806,16.6090065 19.1859097,16.6895226 C19.3337806,16.8188129 19.5126194,16.9140387 19.7185548,17.0502968 C18.3443613,19.0608774 16.5041032,20.3739097 14.1188129,21.011071 C14.0491355,20.7447484 13.9980387,20.4846194 13.9074581,20.2384258 C13.8741677,20.1478452 13.7495226,20.0905548 13.6659097,20.0177806 C13.6395871,20.1184258 13.5792,20.2237161 13.5923613,20.3181677 C13.6272,20.5604903 13.6945548,20.7981677 13.7611355,21.0915871 C11.3309419,21.5452645 9.07339355,21.1868129 6.92732903,19.9024258 C7.09145806,19.6461677 7.25636129,19.4185548 7.38487742,19.1715871 C7.43752258,19.0709419 7.40965161,18.9277161 7.41894194,18.8038452 C7.30590968,18.8642323 7.16036129,18.899071 7.0868129,18.9912 C6.92036129,19.1994581 6.78874839,19.4371355 6.61610323,19.7042323 C4.57842581,18.3075871 3.27545806,16.4293935 2.63442581,14.0247484 C2.94410323,13.9519742 3.20810323,13.9047484 3.45971613,13.8211355 C3.54487742,13.7932645 3.60061935,13.6748129 3.66952258,13.5973935 C3.56965161,13.5641032 3.46590968,13.4928774 3.37145806,13.5052645 C3.11829677,13.5377806 2.86900645,13.6051355 2.57403871,13.6686194 C2.12578065,11.2299097 2.51210323,8.97313548 3.82513548,6.84023226 C4.0148129,6.96023226 4.17894194,7.09029677 4.36474839,7.17390968 C4.50874839,7.23971613 4.67907097,7.24823226 4.83778065,7.28152258 C4.74178065,7.14216774 4.66590968,6.98113548 4.5435871,6.86965161 C4.3988129,6.7388129 4.21455484,6.65132903 4.01945806,6.52668387 C5.44397419,4.53545806 7.3035871,3.22552258 9.7268129,2.63249032 C9.78255484,2.87326452 9.81429677,3.1032 9.89249032,3.31532903 C9.93661935,3.43378065 10.0573935,3.5228129 10.143329,3.62578065 C10.1727484,3.50423226 10.2354581,3.3795871 10.2238452,3.26268387 C10.2013935,3.0435871 10.1363613,2.82913548 10.0782968,2.56513548 C12.4930065,2.14242581 14.7250065,2.53726452 16.8292645,3.82010323 C16.6798452,4.06165161 16.5265548,4.27997419 16.4088774,4.51532903 C16.367071,4.59739355 16.4119742,4.7228129 16.4173935,4.82810323 C16.5064258,4.78861935 16.6248774,4.77236129 16.679071,4.70500645 C16.8385548,4.50371613 16.9724903,4.28307097 17.1443613,4.02836129 M11.8450065,22.4201032 C17.7211355,22.4061677 22.431329,17.6595871 22.4220387,11.7610065 C22.4135226,5.98861935 17.639071,1.25442581 11.8333935,1.26216774 C5.9355871,1.26990968 1.24939355,6.00874839 1.26410323,11.9499097 C1.2788129,17.7021677 6.06100645,22.4340387 11.8450065,22.4201032 M11.8364903,0.000232258065 C18.3420387,-0.00673548387 23.6808774,5.30732903 23.6862968,11.7942968 C23.6917161,18.3532645 18.4217806,23.6502968 11.8604903,23.6828129 C5.32784516,23.7145548 0.000619354838,18.3780387 -0.00015483871,11.8012645 C-0.00015483871,5.30345806 5.3115871,0.0072 11.8364903,0.000232258065"/></svg>;
  }
}

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'PlatformSafariOption';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

