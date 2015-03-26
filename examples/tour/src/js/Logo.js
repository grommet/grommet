// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Logo = React.createClass({

  render: function() {
    return (
      <svg viewBox="200 150.1 400 399.9" enable-background="new 200 150.1 400 399.9">
        <path fill="#0096D6" d="M400 550c-1.9 0-4 0-5.9-.1l40.8-112.3h56.3c9.9 0 20.7-7.6 24.1-16.9L559.6 299c7.2-19.9-4.2-36.3-25.4-36.3h-78.1l-65.5 179.9-37.1 102C265.6 523.7 200 444.5 200 350c0-91.8 61.8-169.1 146-192.6l-38.3 105.3L244 437.6h42.4L340.6 289h31.9l-54.2 148.6h42.4L411.1 299c7.2-19.9-4.2-36.3-25.4-36.3h-35.6L391 150.3c3-.1 6-.2 9-.2 110.5 0 200 89.5 200 200C600 460.5 510.5 550 400 550zm121-261.1h-31.9l-44.6 122.4h31.9L521 288.9z"/>
      </svg>
    );
  }

});

module.exports = Logo;
