// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var ReactIntl = require('react-intl');
var FormattedDate = ReactIntl.FormattedDate;
var ListItem = require('./ListItem');
var SpinningIcon = require('./icons/Spinning');
var InfiniteScroll = require('../utils/InfiniteScroll');

var CLASS_ROOT = "list";

var List = React.createClass({

  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    emptyIndicator: React.PropTypes.node,
    itemDirection: React.PropTypes.oneOf(['row', 'column']),
    large: React.PropTypes.bool,
    onMore: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    schema: React.PropTypes.arrayOf(React.PropTypes.shape({
      attribute: React.PropTypes.string,
      default: React.PropTypes.node,
      image: React.PropTypes.bool,
      label: React.PropTypes.string,
      primary: React.PropTypes.bool,
      secondary: React.PropTypes.bool,
      timestamp: React.PropTypes.bool,
      uid: React.PropTypes.bool
    })).isRequired,
    selected: React.PropTypes.oneOfType([
      React.PropTypes.string, // uid
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    small: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {small: false, itemDirection: 'row'};
  },

  getInitialState: function() {
    return this._stateFromProps(this.props);
  },

  componentDidMount: function () {
    if (this.props.onMore) {
      this._scroll = InfiniteScroll.startListeningForScroll(this.refs.more, this.props.onMore);
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.onMore) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
      this._scroll = null;
    }
    this.setState(this._stateFromProps(nextProps));
  },

  componentDidUpdate: function () {
    if (this.props.onMore) {
      this._scroll = InfiniteScroll.startListeningForScroll(this.refs.more, this.props.onMore);
    }
  },

  componentWillUnmount: function () {
    if (this._onScroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
    }
  },

  _stateFromProps: function (props) {
    return {size: props.size || (props.small ? 'small' : (props.large ? 'large' : null))};
  },

  _onClickItem: function (item) {
    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
  },

  _renderValue: function (item, scheme) {
    var result;
    var value = item[scheme.attribute] || scheme.default;
    if (scheme.image) {
      if (typeof value === 'string') {
        result = <img src={value} alt={scheme.label || 'image'} />;
      } else {
        result = value;
      }
    } else if (scheme.timestamp) {
      result = (
        <FormattedDate value={new Date(date)}
          weekday="long"
          day="numeric"
          month="long"
          year="numeric"
          hour="numeric"
          minute="numeric"
          second="numeric" />
      );
    } else {
      result = value;
    }
    return result;
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (true || this.props.fill) {
      classes.push(CLASS_ROOT + "--fill");
    }
    if (true || this.props.flush) {
      classes.push(CLASS_ROOT + "--flush");
    }
    if (this.state.size) {
      classes.push(CLASS_ROOT + "--" + this.state.size);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var items = this.props.data.map(function (item) {
      var uid;
      var image;
      var primary;
      var secondary;
      var selected;
      var onClick;

      this.props.schema.forEach(function (scheme) {
        if (scheme.image) {
          image = this._renderValue(item, scheme);
        } else if (scheme.primary) {
          primary = this._renderValue(item, scheme);
        } else if (scheme.secondary) {
          secondary = this._renderValue(item, scheme);
        }
        if (scheme.uid) {
          uid = item[scheme.attribute];
          if (uid === this.props.selected) {
            selected = true;
          }
        }
      }, this);

      if (this.props.onSelect) {
        onClick = this._onClickItem.bind(this, item);
      }

      return (
        <ListItem key={uid} image={image} label={primary}
          annotation={secondary} selected={selected}
          direction={this.props.itemDirection} onClick={onClick} />
      );
    }, this);

    var more;
    if (this.props.onMore) {
      classes.push(CLASS_ROOT + "--moreable");
      more = (
        <li ref="more" className={CLASS_ROOT + "__more"}>
          <SpinningIcon />
        </li>
      );
    }

    var empty;
    if (this.props.data.length === 0) {
      empty = (
        <li className={CLASS_ROOT + "__empty"}>
          {this.props.emptyIndicator}
        </li>
      );
    }

    return (
      <ul className={classes.join(' ')}>
        {empty}
        {items}
        {more}
      </ul>
    );
  }

});

module.exports = List;
