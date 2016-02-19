// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

export default class Settings extends Component {
  componentDidMount() {
    console.warn("Settings is deprecated and will be removed soon." +
      "Please use Tiles instead.");
  }

  render() {
    var panels = ['TBD 1', 'TBD 2'].map(function (tbd) {
      return (
        <li key={tbd} className={"settings__panel list-item box"}>
          {tbd}
        </li>
      );
    });

    return (
      <div className={"settings"}>
        <ol className={"settings__panels list-inline"}>
          {panels}
        </ol>
      </div>
    );
  }
}
