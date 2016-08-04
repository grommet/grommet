// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import Box from '../Box';
import SocialShare from '../SocialShare';
import Form from '../Form';
import FormField from '../FormField';

export default class Overlay extends Component {

  constructor () {
    super();

    this._onClickShareLink = this._onClickShareLink.bind(this);
    this.state = { iconSize: 'large' };
  }

  _onClickShareLink () {
    findDOMNode(this.refs.shareLink).select();
  }

  render() {
    const { shareLink, shareHeadline, shareText } = this.props;

    let shareContent = null;
    if (shareLink) {
      shareContent = (
        <Box align="center">
          <Form pad={{vertical: 'small'}}>
            <FormField strong={true}>
              <input ref="shareLink" className="share-link"
                type="text" value={shareLink}
                onClick={this._onClickShareLink} readOnly />
            </FormField>
          </Form>
          <Box direction="row">
            <SocialShare type="email" link={shareLink}
              title={shareHeadline} text={shareText} />
            <SocialShare type="twitter"
              link={shareLink} text={shareHeadline} />
            <SocialShare type="facebook"
              link={shareLink} />
            <SocialShare type="linkedin"
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
