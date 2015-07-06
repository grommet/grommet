// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Leaflet = require('leaflet');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');
var Split = require('grommet/components/Split');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Article = require('grommet/components/Article');
var Section = require('grommet/components/Section');
var Menu = require('grommet/components/Menu');
var Logo = require('./Logo');
var About = require('./About');
var Organization = require('./Organization');
var Rest = require('grommet/utils/Rest');

var Person = React.createClass({

  propTypes: {
    onClose: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    person: React.PropTypes.object.isRequired
  },

  mixins: [IntlMixin],

  _onAbout: function () {
    this.setState({view: 'about'});
  },

  _onOrganization: function () {
    this.setState({view: 'organization'});
  },

  _onGeocodeResponse: function (err, res) {
    if (! err && res.ok) {
      var place = res.body[0];
      var map = this.state.map;
      map.setView([place.lat, place.lon], 14);
      Leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      //Leaflet.Icon.Default.imagePath = 'leaflet/images';
      //Leaflet.marker([place.lat, place.lon]).addTo(map);
      var circle = Leaflet.circleMarker([place.lat, place.lon], {
        color: '#FF8D6D',
        opacity: 0.8,
        fillOpacity: 0.8
      }).addTo(map);
      var person = this.props.person;
      var address = ['<h5>' + person.o + '</h5>',
        person.street, person.l, person.st, person.co].join('<br/>');
      circle.bindPopup(address).openPopup();
    }
  },

  _getGeocode: function (props) {
    var person = props.person;
    if (person.street) {
      var params = {
        street: person.street,
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

  getInitialState: function () {
    return {view: 'organization'};
  },

  componentDidMount: function () {
    var mapElement = this.refs.map.getDOMNode();
    var options = {
      touchZoom: false,
      scrollWheelZoom: false
    };
    var map = Leaflet.map(mapElement, options);
    this.setState({map: map});
    this._getGeocode(this.props);
  },

  componentWillReceiveProps: function (newProps) {
    this._getGeocode(newProps);
  },

  render: function() {
    var title = this.getGrommetIntlMessage('People Finder');
    var person = this.props.person;

    var view;
    var viewLabel;
    if ('about' === this.state.view) {
      view = <About person={person}/>;
      viewLabel = 'About ' + person.givenName;
    } else if ('organization' === this.state.view) {
      view = <Organization person={person} onSelect={this.props.onSelect} />;
      viewLabel = person.givenName + "'s Organization";
    }

    return (
      <Split flex="left">
        <div>
          <Article align="start">
            <Header large={true} pad="medium">
              <Title onClick={this.props.onClose}>
                <Logo />
                {title}
              </Title>
            </Header>
            <Section pad="medium">
              <h1>{person.cn}</h1>
              <div>
                <img src={person.hpPictureURI} alt="picture" />
              </div>
              <p>{person.title}</p>
              <h2><a href={"mailto:" + person.uid}>{person.uid}</a></h2>
              <h3>{person.telephoneNumber}</h3>
            </Section>
            <div ref="map" id="map">
            </div>
          </Article>
        </div>
        <div>
          <Header large={true} pad="medium" justify="between">
            <h3>{viewLabel}</h3>
            <Menu collapse={true} dropAlign={{right: 'right'}}>
              <a onClick={this._onAbout}>About</a>
              <a onClick={this._onOrganization}>Organization</a>
            </Menu>
          </Header>
          {view}
        </div>
      </Split>
    );
  }

});

module.exports = Person;
