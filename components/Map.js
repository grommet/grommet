// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "map";

var ResourceMap = React.createClass({

  propTypes: {
    data: React.PropTypes.shape({
      categories: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string,
        label: React.PropTypes.node,
        items: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string,
          node: React.PropTypes.node
        }))
      })),
      links: React.PropTypes.arrayOf(React.PropTypes.shape({
        parentId: React.PropTypes.string,
        childId: React.PropTypes.string
      }))
    }).isRequired
  },

  getInitialState: function () {
    return {canvasWidth: 100, canvasHeight: 100};
  },

  componentDidMount: function () {
    window.addEventListener('resize', this._onResize);
    this._layout();
    clearTimeout(this._drawTimer);
    this._drawTimer = setTimeout(this._draw, 50);
  },

  componentDidUpdate: function () {
    this._layout();
    clearTimeout(this._drawTimer);
    this._drawTimer = setTimeout(this._draw, 50);
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this._onResize);
  },

  _coords: function (id, canvasRect) {
    var element = document.getElementById(id);
    var rect = element.getBoundingClientRect();
    return [
      rect.left - canvasRect.left + (rect.width / 2),
      rect.top - canvasRect.top + (rect.height / 2)
    ];
  },

  _draw: function () {
    var canvasElement = this.refs.canvas.getDOMNode();
    var highlightCanvasElement = this.refs.highlightCanvas.getDOMNode();
    // don't draw if we don't have a canvas to draw on, such as a unit test
    if (canvasElement.getContext) {
      var context = canvasElement.getContext('2d');
      var highlightContext = highlightCanvasElement.getContext('2d');
      var canvasRect = canvasElement.getBoundingClientRect();
      context.clearRect(0, 0, canvasRect.width, canvasRect.height);
      highlightContext.clearRect(0, 0, canvasRect.width, canvasRect.height);

      context.strokeStyle = '#000000';
      context.lineWidth = 1;
      highlightContext.strokeStyle = '#000000';
      highlightContext.lineWidth = 2;

      this.props.data.links.forEach(function (link) {
        var parentCoords = this._coords(link.parentId, canvasRect);
        var childCoords = this._coords(link.childId, canvasRect);

        if (this.state.activeId === link.parentId ||
          this.state.activeId === link.childId) {
          highlightContext.beginPath();
          highlightContext.moveTo(parentCoords[0], parentCoords[1]);
          highlightContext.lineTo(childCoords[0], childCoords[1]);
          highlightContext.stroke();
        } else {
          context.beginPath();
          context.moveTo(parentCoords[0], parentCoords[1]);
          context.lineTo(childCoords[0], childCoords[1]);
          context.stroke();
        }
      }, this);
    }
  },

  _layout: function () {
    var mapElement = this.refs.map.getDOMNode();
    if (mapElement.scrollWidth !== this.state.canvasWidth ||
      mapElement.scrollHeight !== this.state.canvasHeight) {
      this.setState({
        canvasWidth: mapElement.scrollWidth,
        canvasHeight: mapElement.scrollHeight
      });
    }
  },

  _onResize: function () {
    // debounce
    clearTimeout(this._layoutTimer);
    this._layoutTimer = setTimeout(this._layout, 50);
  },

  _onEnter: function (id) {
    this.setState({activeId: id});
  },

  _onLeave: function () {
    this.setState({activeId: null});
  },

  _renderItems: function (items) {
    return items.map(function (item, index) {
      var classes = [CLASS_ROOT + "__item"];
      var active = this.state.activeId === item.id ||
        this.props.data.links.some(function (link) {
          return ((link.parentId === item.id ||
            link.childId === item.id) &&
            (link.parentId === this.state.activeId ||
            link.childId === this.state.activeId));
        }, this);
      if (active) {
        classes.push(CLASS_ROOT + "__item--active");
      }
      return (
        <li key={index} id={item.id} className={classes.join(' ')}
          onMouseEnter={this._onEnter.bind(this, item.id)}
          onMouseLeave={this._onLeave.bind(this, item.id)}>
          {item.node}
        </li>
      );
    }, this);
  },

  _renderCategories: function (categories) {
    var result = categories.map(function (category) {
      return (
        <li key={category.id} className={CLASS_ROOT + "__category"}>
          <ul className={CLASS_ROOT + "__category-items"}>
            {this._renderItems(category.items)}
          </ul>
          <div className={CLASS_ROOT + "__category-label"}>
            {category.label}
          </div>
        </li>
      );
    }, this);
    return result;
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var categories = [];
    if (this.props.data.categories) {
      categories = this._renderCategories(this.props.data.categories);
    }

    return (
      <div ref="map" className={classes.join(' ')}>
        <canvas ref="canvas" className={CLASS_ROOT + "__canvas"}
          width={this.state.canvasWidth} height={this.state.canvasHeight} />
        <canvas ref="highlightCanvas" className={CLASS_ROOT + "__canvas " + CLASS_ROOT + "__canvas--highlight"}
          width={this.state.canvasWidth} height={this.state.canvasHeight} />
        <ol className={CLASS_ROOT + "__categories"}>
          {categories}
        </ol>
      </div>
    );
  }

});

module.exports = ResourceMap;
