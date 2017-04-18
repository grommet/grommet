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
      `${CLASS_ROOT}-platform-cloudlinux`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'platform-cloudlinux');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fillRule="evenodd" d="M14.0684356,5.79034617 C14.1171022,5.83554613 14.1629688,5.88247942 14.2099021,5.92887939 C14.5235019,6.25221246 14.818835,6.60341217 15.0909681,6.98367853 C15.0913681,6.98407853 15.0919014,6.98487853 15.0923014,6.98527852 C15.3575012,7.36634488 15.601101,7.77674455 15.8359008,8.21887752 C15.8816341,6.72327874 15.5928343,5.40847981 14.9224349,4.18328081 C14.6147018,3.61968127 14.3036354,3.04168174 13.7816358,2.65061539 C13.0331031,2.08901585 12.1863038,1.70701616 11.2797712,1.46634969 C10.8748382,1.35914978 10.4656385,1.28181651 10.0377722,1.23701654 C6.91657474,0.808616892 3.77031064,2.36541562 2.09297867,5.47701309 C2.28097852,5.52674638 2.36111178,5.36594651 2.4687117,5.27861325 C5.99870882,2.40754892 10.8748382,2.70048202 14.0080356,5.73047955 C14.0285689,5.75007953 14.0473689,5.77061285 14.0684356,5.79034617 L14.0684356,5.79034617 Z M10.5404385,16.6888706 C9.96470559,16.3543376 9.44097268,15.9496712 8.90203979,15.5039382 C9.44683934,17.0628703 11.539371,18.9363355 13.3229695,19.4235351 C13.2501696,19.3640684 13.1824363,19.2966018 13.1037697,19.2462019 C12.1952371,18.661269 11.4491044,17.9083363 10.8137716,17.039937 C10.725505,16.9196704 10.659505,16.7579372 10.5404385,16.6888706 L10.5404385,16.6888706 Z M23.5932278,9.59820973 C23.6076278,9.53420978 23.6110945,9.47607649 23.5250945,9.46247651 C23.5210945,9.5082098 23.5160279,9.5543431 23.5120279,9.59994306 C23.5028279,9.70900964 23.4937612,9.81780955 23.4842946,9.92674279 C22.999495,15.3279384 17.8578992,18.9307355 12.6175034,17.5406033 C12.4443036,17.49447 12.271637,17.4443367 12.0989705,17.3963367 C13.2500362,18.6898023 14.6673684,19.466735 16.3432337,19.7827348 C16.9057666,19.889268 17.4509662,19.8734014 18.005099,19.7220681 C20.0790973,19.1556686 21.710696,17.9739362 22.8168284,16.1399377 C24.0517608,14.0920727 24.3364272,11.8972745 23.5932278,9.59820973 L23.5932278,9.59820973 Z M14.4687019,20.5306008 C11.6479042,20.0162012 9.61323921,18.3820692 8.21937368,15.8934046 C8.15030707,17.4810033 8.53657342,18.9334021 9.37977273,20.260201 C9.63537252,20.6626007 9.87683899,21.092467 10.286972,21.3592668 C12.9656365,23.1032654 15.7536342,23.2813986 18.6061652,21.8432664 C20.097364,21.092067 21.1962964,19.9155347 21.9305625,18.4039359 C19.7645643,20.2555344 17.2865663,21.0442004 14.4687019,20.5306008 L14.4687019,20.5306008 Z M9.76577242,0.501683809 C15.4967011,1.01008339 19.0562982,6.22261248 17.4562995,11.762608 C17.4377662,11.8264746 17.3944329,11.8899412 17.5026994,11.9311412 C18.811365,10.6480755 19.6242977,9.11274346 19.8604309,7.28074495 C19.9009642,6.96447854 19.8916308,6.65661213 19.8198976,6.34554571 C19.2596313,3.91008103 17.8805658,2.07994919 15.6775009,0.921950133 C13.7555025,-0.0879157105 11.7263042,-0.27724889 9.63990585,0.398883893 C9.57470591,0.387283902 9.51323929,0.382483906 9.50257263,0.472750499 C9.54990593,0.477017162 9.59710589,0.481683825 9.64417252,0.485950488 C9.68457248,0.491550484 9.72510578,0.498217145 9.76577242,0.501683809 L9.76577242,0.501683809 Z M16.7349667,11.7272747 C16.7345667,11.7143413 16.7336334,11.7019413 16.7331001,11.689408 C16.7325667,11.6836747 16.7316334,11.6783414 16.7313667,11.6728747 C16.7288334,11.6780747 16.7268334,11.6835414 16.7245667,11.688608 C16.7280334,11.701808 16.7316334,11.714208 16.7349667,11.7272747 L16.7349667,11.7272747 Z M20.5508303,9.56420976 C20.0362974,12.3826075 18.3973654,14.4124725 15.8035008,15.8174047 C17.3804329,15.8550046 18.7462984,15.5355382 20.0061641,14.8024722 C20.513897,14.5070057 21.0434966,14.219406 21.3880296,13.726473 C24.159494,9.76794292 22.7444285,4.21368078 18.398432,2.06848253 C20.2738972,4.2370141 21.0689632,6.72927873 20.5508303,9.56420976 L20.5508303,9.56420976 Z M19.4572312,10.7603421 C19.3869646,10.7772754 19.3341646,10.8144754 19.3016313,10.8648754 C18.6622985,11.8550079 17.8510992,12.6742072 16.8687,13.3250067 C16.8020333,13.3692733 16.7323001,13.4259399 16.6949668,13.4938066 C16.3799004,14.0710061 15.963634,14.5762057 15.5736343,15.1023386 C17.4404328,14.1660727 18.7374984,12.7223405 19.4572312,10.7603421 L19.4572312,10.7603421 Z M16.3596337,5.66701293 C16.2429671,5.76541285 16.3189671,5.84594612 16.3360337,5.9144794 C16.5713669,6.85367863 16.6712335,7.81794451 16.4891003,8.75834375 C16.2929671,9.77220959 16.6508335,10.7030088 16.7313667,11.6728747 C16.9784332,11.1238085 17.0598998,10.5355423 17.1194998,9.94634278 C17.2697663,8.45394399 17.0036332,7.03394515 16.3596337,5.66701293 L16.3596337,5.66701293 Z M14.5243019,16.3692709 C14.4153686,16.3479376 14.310702,16.3484709 14.2012355,16.3782042 C13.6208359,16.5352707 13.0252364,16.6068707 12.4288369,16.671804 C12.3929703,16.6548706 12.352037,16.641804 12.3429703,16.6934039 C12.340437,16.7066039 12.3952369,16.7299372 12.4237703,16.7487372 C14.4160353,17.39167 16.3536337,17.2172702 18.2773655,16.3792709 C18.2242989,16.3431376 18.2036322,16.3178043 18.1813656,16.3158043 C18.1412323,16.3115376 18.0993656,16.3174043 18.059899,16.3263376 C16.8842999,16.5972707 15.7055009,16.6047374 14.5243019,16.3692709 L14.5243019,16.3692709 Z M8.87430648,15.5143382 C8.86243982,15.5076716 8.8511065,15.5012716 8.8395065,15.4944716 C8.84897316,15.5032716 8.85830649,15.5114049 8.86750648,15.5202049 L8.87430648,15.5143382 Z M8.38790687,8.95341025 C8.42537351,8.9399436 8.46377348,8.91994361 8.43364017,8.87701032 C8.42617351,8.86607699 8.37084022,8.88847697 8.33737358,8.8954103 C8.3523069,8.91621028 8.36924022,8.93567694 8.38790687,8.95341025 L8.38790687,8.95341025 Z M5.49564256,21.8493997 C5.53044254,21.9048664 5.56937584,21.9484663 5.63937578,21.8973997 C5.6101758,21.8619331 5.58097583,21.8261998 5.55164252,21.7907331 C5.53124253,21.8085998 5.51257588,21.8280664 5.49564256,21.8493997 L5.49564256,21.8493997 Z M10.6501717,4.51008054 C11.6171042,5.12061338 12.4753702,5.86181277 13.0968364,6.81714533 C13.4443028,7.35114489 13.8263024,7.41181151 14.3977686,7.21701167 C13.3940361,5.92421272 12.1791038,4.99848014 10.6501717,4.51008054 L10.6501717,4.51008054 Z M8.33737358,8.8954103 C6.47404177,9.84940952 5.22724278,11.342875 4.45951007,13.29554 C4.52271002,13.2838067 4.55471,13.2871401 4.57230998,13.2723401 C4.60337662,13.2472734 4.6289766,13.2134068 4.65057659,13.1792735 C5.29017606,12.156341 6.11844206,11.317675 7.12044124,10.6487422 C7.21270783,10.5868756 7.2860411,10.512609 7.34244106,10.4142091 C7.64177415,9.89274282 8.01230718,9.42074321 8.38790687,8.95341025 C8.36924022,8.93567694 8.3523069,8.91621028 8.33737358,8.8954103 L8.33737358,8.8954103 Z M7.59857418,18.1031361 C7.63617415,18.0415362 7.64710748,17.9778029 7.63457415,17.9192696 C7.38657436,16.7668706 7.38084103,15.6142048 7.6151075,14.4595391 C7.63084082,14.3810058 7.64057415,14.2915392 7.6187075,14.2168726 C7.43337432,13.5863398 7.37057437,12.934607 7.27444111,12.2867409 C6.61577498,14.2688726 6.71990823,16.2067377 7.59857418,18.1031361 L7.59857418,18.1031361 Z M6.09044208,7.61007802 C7.14644122,7.38141154 8.20657369,7.3864782 9.26990615,7.55074473 C9.41723937,7.57354471 9.57817257,7.64114466 9.71123913,7.60594469 C10.3548386,7.43514482 11.0113714,7.35114489 11.7076375,7.28527828 C10.2203054,6.56794553 7.41577433,6.72301207 5.81017564,7.64007799 C5.90364223,7.630478 5.99937549,7.63034467 6.09044208,7.61007802 L6.09044208,7.61007802 Z M5.55164252,21.7907331 C5.48124258,21.7072665 5.4103093,21.6240666 5.34017602,21.5400667 C1.86364552,17.3782034 2.9519113,11.1947418 7.64044082,8.47221065 C7.79537402,8.38221072 7.95297389,8.29567746 8.10937377,8.20781086 C6.38030851,8.10701094 4.82870977,8.55981057 3.42044425,9.52127646 C2.94751131,9.84394286 2.57311161,10.2408759 2.28831184,10.7392755 C1.22244605,12.6063406 0.903912972,14.5956723 1.41871255,16.6748706 C1.99351208,18.9960687 3.34431098,20.749134 5.49564256,21.8493997 C5.51257588,21.8280664 5.53124253,21.8085998 5.55164252,21.7907331 L5.55164252,21.7907331 Z M7.67084079,19.7224681 C6.04190878,17.3651367 5.76524234,14.7710055 6.60604166,11.9434078 C5.46470926,13.0320736 4.72470986,14.2236726 4.35217683,15.6330048 C4.20191028,16.2007377 4.03097709,16.7784705 4.13564367,17.3708701 C4.97497632,22.1296662 9.90310564,25.0569971 14.4929686,23.5001984 C11.6336376,23.2932652 9.30910612,22.0932662 7.67084079,19.7224681 L7.67084079,19.7224681 Z M0.444580013,14.4472724 C-0.105152872,12.8590071 -0.159819494,11.250075 0.363246746,9.66447634 C1.3635126,6.63074548 3.46084422,4.78501365 6.58804167,4.12408086 C7.06657462,4.02288094 7.54150756,4.15621416 8.00670718,4.25981408 C9.54083927,4.6018138 10.8412382,5.35567985 11.9152373,6.5268789 C9.16990624,5.75301286 6.57550835,6.0360793 4.21751027,7.6670113 C1.86151219,9.29634331 0.666979832,11.6062081 0.444580013,14.4472724 L0.444580013,14.4472724 Z"/></svg>;
  }
}

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'PlatformCloudlinux';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

