var React = require('react');
var PropTypes = React.PropTypes;
var Up = require('./Up');

var DocumentFooter = React.createClass({

	propTypes: {
		next: PropTypes.node
	},

	getInitialState: function () {
    	return {scrolled: false};
    },

    componentDidMount: function () {
	    var parent = this.refs.footer.getDOMNode().parentNode.parentNode;
	    parent.addEventListener("scroll", this._onScroll);
	    window.addEventListener("resize", this._styleTitle);
    },

    componentWillUnmount: function () {
	    var parent = this.refs.footer.getDOMNode().parentNode.parentNode;
	    parent.removeEventListener("scroll", this._onScroll);
	    window.removeEventListener("resize", this._styleTitle);
	},

    componentWillReceiveProps: function () {
	    this.setState({scrolled: false});
	},

	componentDidUpdate: function () {
	    if (!this.state.scrolled) {
	      this._onClickTop();
	    }
	},

	_onScroll: function () {
	    // debounce
	    clearTimeout(this._scrollTimer);
	    this._scrollTimer = setTimeout(this._styleTitle, 10);
    },

	_styleTitle: function() {
	    var parent = this.refs.footer.getDOMNode().parentNode.parentNode;
	    if (parent.scrollTop > window.innerHeight) {
	      this.setState({scrolled: true});
	    } else if (this.state.scrolled){
	      this.setState({scrolled: false});	
	    }
	    /*
	    // pin title section under header when content header disappears
	    var appHeaderElement = document.querySelectorAll('div.header').item(0);
	    var appHeaderRect = appHeaderElement.getBoundingClientRect();
	    var chapterElement = this.refs.chapter.getDOMNode();
	    var chapterHeaderElement = chapterElement.querySelectorAll('header').item(0);
	    var chapterHeaderRect = chapterHeaderElement.getBoundingClientRect();
	    var titleElement = this.refs.title.getDOMNode();
	    if (chapterHeaderRect.bottom < (appHeaderRect.bottom + 48)) { // TODO: 48 too hard coded
	      titleElement.classList.add("chapter__title--pinned");
	    } else {
	      titleElement.classList.remove("chapter__title--pinned");
	    }
	    */
    },

	_onClickTop: function() {
		this.refs.footer.getDOMNode().parentNode.parentNode.scrollTop = 0;
	},

	render: function() {

		var upClasses = ["document__top", "control-icon"];
	    if (this.state.scrolled) {
	      upClasses.push("document__top--active");
	    }
		
		if (this.state.scrolled || (this.props.next && this.props.next !== '')) {
	      	return (
				<div ref="footer" className={"document__footer"}>
		          {this.props.next}
		          <div className={upClasses.join(' ')}
		            onClick={this._onClickTop}>
		            <Up />
		          </div>
		        </div>
		    );
		}        

		return <div ref="footer"></div>;
	}
});

module.exports = DocumentFooter;