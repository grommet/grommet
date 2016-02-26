// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { getCurrentLocale } from '../utils/Locale';
import SkipLinks from './SkipLinks';

const CLASS_ROOT = 'app';

let supportedLocales = ['en-US', 'pt-BR'];

function localesSupported() {
  return global.Intl && supportedLocales.every(function (locale) {
    return Intl.NumberFormat.supportedLocalesOf(locale)[0] === locale &&
            Intl.DateTimeFormat.supportedLocalesOf(locale)[0] === locale;
  });
}

if (! localesSupported()) {
  require('intl');
  require('intl/locale-data/jsonp/en-US.js');
  require('intl/locale-data/jsonp/pt-BR.js');
  Intl.NumberFormat = IntlPolyfill.NumberFormat;
  Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
}

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      lang: 'en-US'
    };
  }

  componentDidMount() {
    var lang = getCurrentLocale();
    if (this.props.lang) {
      lang = this.props.lang;
    }
    if (!document.documentElement.getAttribute('lang')) {
      document.documentElement.setAttribute('lang', lang);
    }
    this.setState({lang: lang});

    // Put the grommet class on the html element.
    document.documentElement.classList.add('grommet');
  }

  render() {
    var classes = ["grommet", CLASS_ROOT];
    if (this.props.centered) {
      classes.push(`${CLASS_ROOT}--centered`);
    }
    if (this.props.inline) {
      classes.push(`${CLASS_ROOT}--inline`);
    }

    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div lang={this.state.lang} className={classes.join(' ')}>
        {this.props.children}
        <SkipLinks />
      </div>
    );
  }
}

App.defaultProps = {
  centered: true
};

App.propTypes = {
  centered: PropTypes.bool
};
