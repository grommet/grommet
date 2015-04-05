
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouterState = Router.State;

var MenuNavigation = React.createClass({
	
	mixins: [RouterState],

	propTypes: {
		items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
	},

	render: function() {
		
		var items = this.props.items.map(function (item, itemIndex) {

			var subNavs = '';
			if (item.subNavs) {

				var classNames = ['nav__subnavs'];
				if (this.isActive(item.route)) {
					classNames.push('active');
				}

				subNavs = item.subNavs.map(function(subNav, subNavIndex) {

					var subNavLinks = '';
					if (subNav.links) {
						subNavLinks = subNav.links.map(function(link) {
							return (
								<Link to={link.route}>{link.label}</Link>
							);
						});
					}

					return (
						<div key={'subnav_'+subNavIndex} className={classNames.join(' ')}>
							<h4>{subNav.title}</h4>
							{subNavLinks}
						</div>
					);	
				});
			}

			return (
				<div key={'item_'+itemIndex} className={"nav__item"}>
	        		<Link to={item.route}>{item.label}</Link>
	        		{subNavs}
	        	</div>
	        );	
		}.bind(this));

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