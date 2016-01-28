// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';

const SkipLinkAnchor = ({ label }) => {
  let id = 'skip-link-' + label.toLowerCase().replace(/ /g, '_');

  return (
    <a tabIndex="-1" id={id} className="skip-link-anchor">
      {label}
    </a>
  );
};

SkipLinkAnchor.propTypes = {
  label: PropTypes.node.isRequired
};

SkipLinkAnchor.displayName = 'SkipLinkAnchor';

export default SkipLinkAnchor;
