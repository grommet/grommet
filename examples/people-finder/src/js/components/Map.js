// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Leaflet = require('leaflet');
var Section = require('grommet/components/Section');
var Rest = require('grommet/utils/Rest');

var Map = React.createClass({

  propTypes: {
    city: React.PropTypes.string,
    country: React.PropTypes.string,
    latitude: React.PropTypes.string,
    longitude: React.PropTypes.string,
    state: React.PropTypes.string,
    street: React.PropTypes.string,
    title: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      busy: false,
      latitude: this.props.latitude,
      longitude: this.props.longitude
    };
  },

  componentDidMount: function () {
    if (! this.state.map) {
      var mapElement = this.refs.map.getDOMNode();
      var options = {
        touchZoom: false,
        scrollWheelZoom: false
      };
      var map = Leaflet.map(mapElement, options);
      this.setState({map: map});
    }

    if (! this.state.latitude || ! this.state.longitude) {
      this._getGeocode(this.props);
    } else {
      this._setMap();
    }
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({latitude: newProps.latitude, longitude: newProps.longitude}, function () {
      if (! this.state.latitude || ! this.state.longitude) {
        this._getGeocode(newProps);
      } else {
        this._setMap();
      }
    });
  },

  _setMap: function () {
    map = this.state.map;
    map.setView([this.state.latitude, this.state.longitude], 14);
    Leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var circle = Leaflet.circleMarker([this.state.latitude, this.state.longitude], {
      color: '#FF8D6D',
      opacity: 0.8,
      fillOpacity: 0.8
    }).addTo(map);
    var address = '<h5>' + this.props.title + '</h5>' + this._renderAddress().join('<br/>');
    circle.bindPopup(address).openPopup();
  },

  _onGeocodeResponse: function (err, res) {
    if (! err && res.ok && res.body && res.body[0]) {
      var place = res.body[0];
      this.setState({latitude: place.lat, longitude: place.lon}, this._setMap);
    } else {
      console.log('!!! geocode response error', err, res);
      if (this.state.map) {
        this.state.map.remove();
        this.refs.map.getDOMNode().className = "";
      }
      this.setState({map: null});
    }
    this.setState({busy: false});
  },

  _getGeocode: function (props) {
    if (props.street) {
      this.setState({busy: true, place: null});
      var params = {
        street: props.street.replace(/.+? \$ /g, '').replace('  BP1220', ''),
        city: props.city,
        state: props.state,
        country: props.country,
        format: 'json'
      };
      Rest
        .get("http://nominatim.openstreetmap.org/search", params)
        .end(this._onGeocodeResponse);
    }
  },

  _renderAddress: function () {
    return [this.props.street, this.props.city, this.props.state, this.props.country];
  },

  render: function() {
    var address;
    if (! this.state.busy && ! this.state.latitude) {
      address = (
        <Section pad={{horizontal: "medium"}}>
          {this._renderAddress().map(function (e, i) {
            return <div key={i}>{e}</div>;
          })}
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

module.exports = Map;
