// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import Box from '../Box';
import SocialShare from '../SocialShare';
import Form from '../Form';
import FormField from '../FormField';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.VIDEO;
const BUTTON_CLASS = `${CLASS_ROOT}__button`;

export default class Overlay extends Component {

  constructor () {
    super();

    this._onClickShareLink = this._onClickShareLink.bind(this);
  }

  _onClickShareLink () {
    findDOMNode(this.shareLinkRef).select();
  }

  render() {
    const { shareLink, shareHeadline, shareText } = this.props;

    // this has to be null to be a valid react children
    let shareContent = null;
    if (shareLink) {
      shareContent = (
        <Box align='center'>
          <Form pad={{vertical: 'small'}}>
            <FormField strong={true}>
              <input ref={ref => this.shareLinkRef = ref}
                className='share-link' type='text' value={shareLink}
                onClick={this._onClickShareLink} readOnly />
            </FormField>
          </Form>
          <Box direction='row' className={BUTTON_CLASS}>
            <SocialShare type='email' link={shareLink} colorIndex='brand'
              className={`${BUTTON_CLASS}__icon`}
              title={shareHeadline} text={shareText} />
            <SocialShare type='twitter' colorIndex='brand'
              className={`${BUTTON_CLASS}__icon`}
              link={shareLink} text={shareHeadline} />
            <SocialShare type='facebook' colorIndex='brand'
              className={`${BUTTON_CLASS}__icon`}
              link={shareLink} />
            <SocialShare type='linkedin' colorIndex='brand'
              className={`${BUTTON_CLASS}__icon`}
              link={shareLink} title={shareHeadline} text={shareText} />
          </Box>
        </Box>
      );
    }

    return shareContent;
  }
}

Overlay.propTypes = {
  shareLink: PropTypes.string,
  shareHeadline: PropTypes.string,
  shareText: PropTypes.string
};

Overlay.defaultProps = {
  shareHeadline: '',
  shareText: ''
};
