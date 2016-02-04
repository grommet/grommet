// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from './icons/base/Close';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import DOMUtils from '../utils/DOM';
import Button from './Button';

const CLASS_ROOT = "layer";

class LayerContents extends Component {

  constructor() {
    super();

    this._processTab = this._processTab.bind(this);
  }

  getChildContext () {
    return {
      router: this.props.router,
      history: this.props.history,
      intl: this.props.intl,
      store: this.props.store
    };
  }

  componentDidMount () {

    var items = this.refs.container.getElementsByTagName('*');
    var firstFocusable = DOMUtils.getBestFirstFocusable(items);
    if (firstFocusable) {
      firstFocusable.focus();
    }

    if (this.props.onClose) {
      this._keyboardHandlers = {
        tab: this._processTab,
        esc: this.props.onClose
      };
      KeyboardAccelerators.startListeningToKeyboard(
        this, this._keyboardHandlers
      );
    }
  }

  componentWillUnmount () {
    if (this.props.onClose) {
      KeyboardAccelerators.stopListeningToKeyboard(
        this, this._keyboardHandlers
      );
    }
  }

  _processTab (event) {
    var items = this.refs.container.getElementsByTagName('*');
    items = DOMUtils.filterByFocusable(items);

    if (!items || items.length === 0) {
      event.preventDefault();
    } else {
      if (event.shiftKey) {
        if (event.target === items[0]) {
          items[items.length - 1].focus();
          event.preventDefault();
        }
      } else if (event.target === items[items.length - 1]) {
        items[0].focus();
        event.preventDefault();
      }
    }
  }

  render () {
    var closer = null;
    if (this.props.closer) {
      closer = (
        <div className={CLASS_ROOT + "__closer"}>
          <Button plain={true} onClick={this.props.onClose}>
            <CloseIcon a11yTitle={this.props.a11yCloserTitle} />
          </Button>
        </div>
      );
    }

    return (
      <div ref="container" className={CLASS_ROOT + "__container"}>
        {closer}
        {this.props.children}
      </div>
    );
  }
}

LayerContents.propTypes = {
  closer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.bool
  ]),
  onClose: PropTypes.func,
  history: PropTypes.object,
  router: PropTypes.any,
  intl: PropTypes.object,
  a11yCloserTitle: PropTypes.string
};

// Because Layer creates a new DOM render context, the context
// is not transfered. For now, we hard code these specific ones.
// TODO: Either figure out how to introspect the context and transfer
// whatever we find or have callers explicitly indicate which parts
// of the context to transfer somehow.
LayerContents.childContextTypes = {
  router: PropTypes.any,
  history: PropTypes.object,
  intl: PropTypes.object,
  store: PropTypes.object
};

export default class Layer extends Component {

  componentDidMount () {
    this._originalFocusedElement = document.activeElement;
    this._addLayer();
    this._renderLayer();
  }

  componentDidUpdate () {
    this._renderLayer();
  }

  componentWillUnmount () {

    if (this._originalFocusedElement) {
      this._originalFocusedElement.focus();
    }

    this._removeLayer();
  }

  _classesFromProps () {
    var classes = [CLASS_ROOT];
    if (this.props.align) {
      classes.push(CLASS_ROOT + "--align-" + this.props.align);
    }
    if (this.props.flush) {
      classes.push(CLASS_ROOT + "--flush");
    }
    if (this.props.hidden) {
      classes.push(CLASS_ROOT + "--hidden");
    }
    if (this.props.peek) {
      classes.push(CLASS_ROOT + "--peek");
    }
    if (this.props.closer) {
      classes.push(CLASS_ROOT + "--closeable");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return classes;
  }

  _addLayer () {
    var element = document.createElement('div');
    if (this.props.id) {
      element.id = this.props.id;
    }
    element.className = this._classesFromProps().join(' ');
    // insert before .app, if possible.
    var appElements = document.querySelectorAll('.app');
    var beforeElement;
    if (appElements.length > 0) {
      beforeElement = appElements[0];
    } else {
      beforeElement = document.body.firstChild;
    }
    this._element = beforeElement.parentNode.insertBefore(element, beforeElement);
  }

  _handleAriaHidden (hideOverlay) {
    this._element.setAttribute('aria-hidden', hideOverlay);
  }

  _renderLayer () {
    this._element.className = this._classesFromProps().join(' ');
    var contents = (
      <LayerContents {...this.props}
        router={this.context.router}
        history={this.context.history}
        intl={this.context.intl}
        store={this.context.store} />
    );
    ReactDOM.render(contents, this._element);
    this._handleAriaHidden(this.props.hidden);
  }

  _removeLayer () {
    this._element.removeEventListener('animationend', this._onAnimationEnd);
    this._handleAriaHidden(true);

    ReactDOM.unmountComponentAtNode(this._element);
    this._element.parentNode.removeChild(this._element);
    this._element = null;
  }

  render () {
    return (<span></span>);
  }

}

Layer.propTypes = {
  align: PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
  closer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.bool
  ]),
  flush: PropTypes.bool,
  hidden: PropTypes.bool,
  peek: PropTypes.bool,
  onClose: PropTypes.func
};

Layer.contextTypes = {
  router: PropTypes.any,
  history: PropTypes.object,
  intl: PropTypes.object,
  store: PropTypes.object
};

Layer.defaultProps = {
  align: 'center'
};
