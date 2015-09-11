// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Leaflet = require('leaflet');
var Section = require('grommet/components/Section');
var Rest = require('grommet/utils/Rest');

var PersonMap = React.createClass({

  propTypes: {
    person: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {busy: false};
  },

  componentDidMount: function () {
    this._getGeocode(this.props);
  },

  componentWillReceiveProps: function (newProps) {
    this._getGeocode(newProps);
  },

  _onGeocodeResponse: function (err, res) {
    if (! err && res.ok && res.body && res.body[0]) {
      var place = res.body[0];
      if (! this.state.map) {
        var mapElement = this.refs.map.getDOMNode();
        var options = {
          touchZoom: false,
          scrollWheelZoom: false
        };
        var map = Leaflet.map(mapElement, options);
        this.setState({map: map});
      } else {
        map = this.state.map;
      }
      map.setView([place.lat, place.lon], 14);
      Leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      var circle = Leaflet.circleMarker([place.lat, place.lon], {
        color: '#FF8D6D',
        opacity: 0.8,
        fillOpacity: 0.8
      }).addTo(map);
      var person = this.props.person;
      var address = ['<h5>' + person.o + '</h5>',
          person.street, person.l, person.st, person.co].join('<br/>');
      circle.bindPopup(address).openPopup();
      this.setState({place: place});
    } else {
      if (this.state.map) {
        this.state.map.remove();
        this.refs.map.getDOMNode().className = "";
      }
      this.setState({place: null, map: null});
    }
    this.setState({busy: false});
  },

  _getGeocode: function (props) {
    var person = props.person;
    if (person.street) {
      this.setState({busy: true, place: null});
      var params = {
        street: person.street.replace(/ \$ /g, '  ').replace('  BP1220', ''),
        city: person.l,
        state: person.st,
        country: person.co,
        format: 'json'
      };
      Rest
        .get("http://nominatim.openstreetmap.org/search", params)
        .end(this._onGeocodeResponse);
    }
  },

  render: function() {
    var person = this.props.person;
    var address;
    if (! this.state.busy && ! this.state.place) {
      address = (
        <Section pad={{horizontal: "medium"}}>
          <h5>{person.o}</h5>
          {person.street}
          {person.l}
          {person.st}
          {person.co}
        </Section>
      );
    }
    return (
      <div ref="map" id="map">
        {address}
      </div>
    );
  }

});

module.exports = PersonMap;
