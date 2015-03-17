// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Hero1 = React.createFactory(require('./Hero1'));
var Hero2 = React.createFactory(require('./Hero2'));
var Hero3 = React.createFactory(require('./Hero3'));

var indexes = [0, 1, 2];

var Home = React.createClass({

  _onClickSelector: function (index) {
    this.setState({index: index, priorIndex: this.state.index});
  },

  _onWheel: function (event) {
    if (this._wheelDelayTimer === null) {
      var newIndex = -1;

      if (event.deltaY > 10) {
        if (this.state.index < indexes.length - 1) {
          newIndex = this.state.index + 1;
        }
      }
      else if (event.deltaY < -10) {
        if (this.state.index > 0) {
          newIndex = this.state.index - 1;
        }
      }
      if (-1 !== newIndex) {
        this._onClickSelector(newIndex);
        var that = this;
        this._wheelDelayTimer = setTimeout(function () {
          that._wheelDelayTimer = null;
        }, 1300);
      }
    }
  },

  getInitialState: function () {
    this._wheelDelayTimer = null;
    return {index: 0, priorIndex: 0};
  },

  componentDidUpdate: function () {
    var heroes = document.querySelectorAll('.home__hero');
    for (var i=0; i<heroes.length; i++) {
      var element = heroes.item(i);
      var rect = element.getBoundingClientRect();
      if (element.classList.contains("home__hero--up")) {
        element.style.top = '' + (- (rect.bottom - rect.top)) + 'px';
      } else {
        element.style.top = '';
      }
    }
  },

  render: function() {
    heroes = [];
    selectorItems = [];
    indexes.forEach(function (index) {
      var hClasses = ["home__hero"];
      var sClasses = ["home__selector-item"];
      if (index === this.state.index) {
        hClasses.push("home__hero--active");
        sClasses.push("home__selector-item--active");
      }
      if (index < this.state.index) {
        hClasses.push("home__hero--up");
      }
      if (index === this.state.priorIndex) {
        hClasses.push("home__hero--prior");
      }
      heroes.push((
        <div key={index} className={hClasses.join(' ')}>
          {[Hero1, Hero2, Hero3][index]()}
        </div>
      ));
      selectorItems[index] = (
        <li key={index} className={sClasses.join(' ')}
          onClick={this._onClickSelector.bind(null, index)}></li>
      );
    }, this);
    return (
      <div className={"home"} onWheel={this._onWheel}>
        {heroes}
        <ol className={"home__selector list-bare"}>
          {selectorItems}
        </ol>
      </div>
    );
  }

});

module.exports = Home;
