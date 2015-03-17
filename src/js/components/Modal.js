// TODO: Remove, unused

// http://jsfiddle.net/LBAr8/

var Modal = React.createClass({
  killClick: function(e) {
    // clicks on the content shouldn't close the modal
    e.stopPropagation();
  },
  handleBackdropClick: function() {
    // when you click the background, the user is requesting that the modal gets closed.
    // note that the modal has no say over whether it actually gets closed. the owner of the
    // modal owns the state. this just "asks" to be closed.
    this.props.onRequestClose();
  },
  render: function() {
    return this.transferPropsTo(
      <div className="modal__overlay" onClick={this.handleBackdropClick}>
        <div className="modal__content" onClick={this.killClick}>
          {this.props.children}
        </div>
      </div>
    );
  }
});
