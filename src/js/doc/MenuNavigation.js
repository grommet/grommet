var React = require('react');

var MenuNavigation = React.createClass({
	
	propTypes: {
		items: React.PropTypes.arrayOf(React.PropTypes.node).isRequired
	},

	render: function() {
		var items = this.props.items.map(function (item) {
			return (
				<div className={"nav__item"}>
	        		{item}
	        	</div>
	        );	
		});

		return (
			<div className={"nav"}>
				<div className={"nav__items"}>
				  {items}
				</div>
			</div>
		);
	}
});

module.exports = MenuNavigation;