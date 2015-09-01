// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var merge = require('lodash/object/merge');
var Layer = require('grommet/components/Layer');
var Form = require('grommet/components/Form');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Menu = require('grommet/components/Menu');
var CloseIcon = require('grommet/components/icons/Clear');
var Footer = require('grommet/components/Footer');
var FormFields = require('grommet/components/FormFields');
var FormField = require('grommet/components/FormField');

var ServerProfileVolumeAdd = React.createClass({

  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      volume: {
        name: ''
      },
      addedCount: 0,
      primaryAction: 'Add'
    };
  },

  componentDidMount: function () {
    this.refs.first.getDOMNode().focus();
  },

  _onAdd: function (event) {
    event.preventDefault();
    this.props.onAdd(merge({}, this.state.volume));
    this.setState({primaryAction: 'Add'});
    this.props.onClose();
  },

  _onAddPlus: function (event) {
    event.preventDefault();
    var volume = this.state.volume;
    this.props.onAdd(merge({}, volume));
    volume.name = '';
    this.setState({
      primaryAction: 'Add +',
      volume: volume,
      addedCount: this.state.addedCount + 1
    });
  },

  _onChange: function (event) {
    var name = event.target.getAttribute('name');
    var volume = this.state.volume;
    volume[name] = event.target.value;
    this.setState({volume: volume});
  },

  render: function () {
    var volume = this.state.volume;

    var actions = [];
    if ('Add' === this.state.primaryAction) {
      actions.push(<input key="add" type="submit" className="primary" value="Add"
        onClick={this._onAdd} />);
      actions.push(<input key="addp" type="button" value="Add +"
        onClick={this._onAddPlus} />);
    } else {
      actions.push(<input key="add" type="button" value="Add"
        onClick={this._onAdd} />);
      actions.push(<input key="addp" type="submit" className="primary" value="Add +"
        onClick={this._onAddPlus} />);
    }

    var message;
    if (this.state.addedCount) {
      message = '' + this.state.addedCount + ' added';
    }

    return (
      <Layer align="right">
        <Form compact={true} onSubmit={this._onAdd}>
          <Header>
            <Title>Add Volume</Title>
            <Menu>
              <div onClick={this.props.onClose}>
                <CloseIcon />
              </div>
            </Menu>
          </Header>
          <FormFields>
            <fieldset>
              <FormField label="Name" htmlFor="name">
                <input ref="first" id="name" name="name" type="text"
                  value={volume.name}
                  onChange={this._onChange} />
              </FormField>
            </fieldset>
          </FormFields>
          <Footer>
            <span>{message}</span>
            <Menu direction="left">
              {actions}
            </Menu>
          </Footer>
        </Form>
      </Layer>
    );
  }
});


module.exports = ServerProfileVolumeAdd;
