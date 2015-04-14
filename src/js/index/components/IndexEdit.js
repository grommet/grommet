// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IndexStore = require('../stores/IndexStore');
var IndexActions = require('../actions/IndexActions');
var State = require('react-router').State;
var Router = require('../../utils/Router');
var IndexRouter = require('../utils/IndexRouter');
var Form = require('../../components/Form');
var DragHandle = require('../../components/icons/DragHandle');

var CLASS_ROOT = 'index-edit';

var IndexEdit = React.createClass({

  mixins: [State],

  _onChange: function() {
    this.setState(IndexStore.getAll());
  },

  _done: function () {
    var queryArgs = {};
    var searchText = this.state.params.search.fullText;
    if (searchText) {
      queryArgs.search = searchText;
    }
    Router.transitionTo(IndexRouter.categoryRoute(this.getParams().category),
      {}, queryArgs);
  },

  _onOk: function (event) {
    event.preventDefault();
    IndexActions.commitChanges();
    this._done();
  },

  _onCancel: function (event) {
    event.preventDefault();
    IndexActions.abandonChanges();
    this._done();
  },

  _onChangeView: function (view) {
    IndexActions.setView(view);
  },

  _onChangeSearch: function (searchMode) {
    IndexActions.setSearchMode(searchMode);
  },

  _onAttributeToggleVisible: function (attribute) {
    attribute.visible = ! attribute.visible;
    IndexActions.updateAttribute(attribute);
  },

  _onAttributeToggleAggregate: function (attribute) {
    attribute.aggregate = ! attribute.aggregate;
    IndexActions.updateAttribute(attribute);
  },

  _onAttributeToggleFilter: function (attribute) {
    attribute.filter = ! attribute.filter;
    IndexActions.updateAttribute(attribute);
  },

  _onDragStart: function(event) {
    this._dragged = event.currentTarget;
    event.dataTransfer.effectAllowed = 'move';
    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    event.dataTransfer.setData("text/html", event.currentTarget);
    var rect = this._dragged.getBoundingClientRect();
    this._placeholder = document.createElement("li");
    this._placeholder.className =
      CLASS_ROOT + "__attribute " + CLASS_ROOT + "__attribute--placeholder list-item";
    this._placeholder.style.width = '' + (rect.right - rect.left) + 'px';
    this._placeholder.style.height = '' + (rect.bottom - rect.top) + 'px';
  },

  _onDragEnd: function() {
    this._dragged.style.display = "block";
    this._dragged.parentNode.removeChild(this._placeholder);
    this._placeholder = null;

    var from = Number(this._dragged.dataset.index);
    var to = Number(this._over.dataset.index);
    if (from < to) {
      to -= 1;
    }
    IndexActions.moveAttribute(from, to);
  },

  _onDragOver: function(event) {
    event.preventDefault();
    this._dragged.style.display = "none";
    if (event.target.className ===
      CLASS_ROOT + "__attribute " + CLASS_ROOT + "__attribute--placeholder list-item") {
      return;
    }
    this._over = event.target;
    event.target.parentNode.insertBefore(this._placeholder, event.target);
  },

  getInitialState: function() {
    return IndexStore.getAll();
  },

  /*componentWillMount: function () {
    IndexActions.setContext({
      category: this.getParams().category
    });
  },*/

  componentDidMount: function() {
    IndexStore.addChangeListener(this._onChange);
    IndexActions.startChanging();
  },

  componentWillUnmount: function() {
    IndexStore.removeChangeListener(this._onChange);
  },

  render: function() {

    var buttons = (
      <div>
        <button onClick={this._onOk} className={'primary'}>OK</button>
        <button onClick={this._onCancel}>Cancel</button>
      </div>
    );

    var view = '';
    var searchMode = '';
    var attributes = [];
    if (this.state.pendingChanges) {
      view = this.state.pendingChanges.view;
      searchMode = this.state.pendingChanges.searchMode;
      attributes = this.state.pendingChanges.attributes;
    }

    /**var attributes = attributes.map(function (attribute, index) {
      var id = 'a-' + index;
      return (
        <li key={attribute.name} data-index={index}
          className={CLASS_ROOT + "__attribute list-item"}
          draggable="true" onDragEnd={this._onDragEnd} onDragStart={this._onDragStart}>
          <DragHandle className={CLASS_ROOT + '__drag-handle drag-handle'} />
          <span className={CLASS_ROOT + '__attribute-name'}>
            {attribute.label}
          </span>
          <label className={'checkbox'} htmlFor={id + '-visible'}>
            <input type="checkbox" checked={attribute.visible} id={id + '-visible'}
              onChange={this._onAttributeToggleVisible.bind(null, attribute)}/>
            {'visible?'}
          </label>
          <label className={'checkbox'} htmlFor={id + '-aggregate'}>
            <input type="checkbox" checked={attribute.aggregate} id={id + '-aggregate'}
              onChange={this._onAttributeToggleAggregate.bind(null, attribute)}/>
            {'aggregate?'}
          </label>
          <label className={'checkbox'} htmlFor={id + '-filter'}>
            <input type="checkbox" checked={attribute.filter} id={id + '-filter'}
              onChange={this._onAttributeToggleFilter.bind(null, attribute)}/>
            {'filter?'}
          </label>
        </li>
      );
    }, this);**/

    return (
      <Form action={'Edit'}
        resource={IndexRouter.categoryLabel(this.getParams().category)}
        buttons={buttons}>
        <div className={CLASS_ROOT}>
          <fieldset className={'form__fields'}>
            <div className={'form__field'}>
              <label>View</label>
              <label className={'radiobutton'} htmlFor={'view__table'}>
                <input id="view__table" type="radio" name="view" value="table"
                  checked={'table' === view}
                  onChange={this._onChangeView.bind(null, 'table')} />
                table
              </label>
              <label className={'radiobutton'} htmlFor={'view__tiles'}>
                <input id="view__tiles" type="radio" name="view" value="tiles"
                  checked={'tiles' === view}
                  onChange={this._onChangeView.bind(null, 'tiles')} />
                tiles
              </label>
            </div>
            <div className={'form__field'}>
              <label>Search</label>
              <label className={'radiobutton'} htmlFor={'search__filters'}>
                <input id="search__filters" type="radio" name="searchMode" value="filters"
                  checked={'filters' === searchMode}
                  onChange={this._onChangeSearch.bind(null, 'filters')} />
                filters
              </label>
              <label className={'radiobutton'} htmlFor={'search__facets'}>
                <input id="search__facets" type="radio" name="searchMode" value="facets"
                  checked={'facets' === searchMode}
                  onChange={this._onChangeSearch.bind(null, 'facets')} />
                facets
              </label>
            </div>
            <div className={'form__field'}>
              <label>Attributes</label>
              <ol className={CLASS_ROOT + "__attributes list-block list-block--small"}
                onDragOver={this._onDragOver}>
                {attributes}
              </ol>
            </div>
          </fieldset>
        </div>
      </Form>
    );
  }

});

module.exports = IndexEdit;
