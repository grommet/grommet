// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Button from './Button';
import Status from './icons/Status';
import CloseIcon from './icons/base/Close';
import CSSClassnames from '../utils/CSSClassnames';
import { announce } from '../utils/Announcer';

const CLASS_ROOT = CSSClassnames.TOAST;
const APP = CSSClassnames.APP;

const DURATION = 8000;
const ANIMATION_DURATION = 1000;

class ToastContents extends Component {

  constructor () {
    super();
    this._onClose = this._onClose.bind(this);
    this.state = {};
  }

  getChildContext () {
    return {
      history: this.props.history,
      intl: this.props.intl,
      router: this.props.router,
      store: this.props.store
    };
  }

  componentDidMount () {
    announce(this._contentsRef.innerText);
    this._timer = setTimeout(this._onClose, DURATION);
  }

  componentWillUnmount () {
    clearTimeout(this._timer);
    this._timer = undefined;
  }

  _onClose () {
    const { onClose } = this.props;
    clearTimeout(this._timer);
    this._timer = undefined;
    this.setState({ closing: true });
    setTimeout(onClose, ANIMATION_DURATION);
  }

  render () {
    const { children, onClose, status } = this.props;
    const { closing } = this.state;

    const classNames = classnames(
      CLASS_ROOT, {
        [`${CLASS_ROOT}--closing`]: closing
      }
    );

    let statusIcon;
    if (status) {
      statusIcon = (
        <Status className={`${CLASS_ROOT}__status`} value={status} />
      );
    }

    let closeControl;
    if (onClose) {
      closeControl = (
        <Button className={`${CLASS_ROOT}__closer`}
          plain={true} onClick={this._onClose}>
          <CloseIcon />
        </Button>
      );
    }

    return (
      <div className={classNames}>
        {statusIcon}
        <div ref={(ref) => this._contentsRef = ref}
          className={`${CLASS_ROOT}__contents`}>
          {children}
        </div>
        {closeControl}
      </div>
    );
  }
}

ToastContents.propTypes = {
  history: PropTypes.object,
  intl: PropTypes.object,
  onClose: PropTypes.func,
  router: PropTypes.any,
  store: PropTypes.any
};

// Because Toast creates a new DOM render context, the context
// is not transfered. For now, we hard code these specific ones.
// TODO: Either figure out how to introspect the context and transfer
// whatever we find or have callers explicitly indicate which parts
// of the context to transfer somehow.
ToastContents.childContextTypes = {
  history: PropTypes.object,
  intl: PropTypes.object,
  router: PropTypes.any,
  store: PropTypes.object
};

export default class Toast extends Component {

  componentDidMount () {
    this._addLayer();
    this._renderLayer();
  }

  componentDidUpdate () {
    this._renderLayer();
  }

  componentWillUnmount () {
    this._removeLayer();
  }

  _addLayer () {
    const { id } = this.props;

    const element = document.createElement('div');
    if (id) {
      element.id = id;
    }
    element.className = `${CLASS_ROOT}__container`;
    // insert before .app, if possible.
    var appElements = document.querySelectorAll(`.${APP}`);
    var beforeElement;
    if (appElements.length > 0) {
      beforeElement = appElements[0];
    } else {
      beforeElement = document.body.firstChild;
    }
    if (beforeElement) {
      this._element =
        beforeElement.parentNode.insertBefore(element, beforeElement);
    }
  }

  _renderLayer () {
    if (this._element) {
      this._element.className = `${CLASS_ROOT}__container`;
      const contents = (
        <ToastContents {...this.props}
          history={this.context.history}
          intl={this.context.intl}
          router={this.context.router}
          store={this.context.store} />
      );
      ReactDOM.render(contents, this._element);
    }
  }

  _removeLayer () {
    ReactDOM.unmountComponentAtNode(this._element);
    this._element.parentNode.removeChild(this._element);
    this._element = undefined;
  }

  render () {
    return (<span style={{display: 'none'}} />);
  }
}

Toast.propTypes = {
  onClose: PropTypes.func,
  status: PropTypes.string
};
