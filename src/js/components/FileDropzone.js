import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import Box from './Box';
import Image from './Image';
import Tiles from './Tiles';
import Tile from './Tile';
import Label from './Label';
import Button from './Button';
import CloseIcon from './icons/base/Close';
import DocumentIcon from './icons/base/Document';
import Props from '../utils/Props';
import {
  isImage,  
  getFileTransfer,
  supportsDragDrop
} from '../utils/FileUpload';

const namespace = 'grommetux-';
const CSSClassnames = {
  DROPZONE: `${namespace}dropzone`
};
const CLASS_ROOT = CSSClassnames.DROPZONE;

class Dropzone extends Component {
  
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._onOpen = this._onOpen.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this._onDragOver = this._onDragOver.bind(this);
    this._onDragEnter = this._onDragEnter.bind(this);
    this._onDragLeave = this._onDragLeave.bind(this);
    this._renderPreview = this._renderPreview.bind(this);
    this._onClearFilePreview = this._onClearFilePreview.bind(this);
    this._onCancelFileDrop = this._onCancelFileDrop.bind(this);
    this.state = {
      dragActive: false,
      dragDropSupported: false,
      files: []
    };
  }

  componentWillMount() {
    const dragDropSupported = supportsDragDrop();
    this.setState({
      dragDropSupported
    });
  }

  componentDidMount() {
    if (window) {
      const { fullDropTarget } = this.props;
      if (fullDropTarget) {
        window.addEventListener('drop', this._onDrop);
        window.addEventListener('dragover', this._onDragOver);
        window.addEventListener('dragenter', this._onDragEnter);
        window.addEventListener('dragleave', this._onDragLeave);
      } else {
        window.addEventListener('drop', this._onCancelFileDrop);
        window.addEventListener('dragover', this._onCancelFileDrop);
      }
    }
  }

  componentWillUnmount() {
    if (window) {
      const { fullDropTarget } = this.props;
      if (fullDropTarget) {
        window.removeEventListener('drop', this._onDrop);
        window.removeEventListener('dragover', this._onDragOver);
        window.removeEventListener('dragenter', this._onDragEnter);
        window.removeEventListener('dragleave', this._onDragLeave);
      } else {
        window.removeEventListener('dragover', this._onCancelFileDrop);
        window.removeEventListener('drop', this._onCancelFileDrop);
      }
    }
  }

  _onClick(e) {
    const { onClick } = this.props;
    e.stopPropagation();
    this._onOpen();
    if (typeof onClick === 'function') {
      onClick();
    }
  }

  _onCancelFileDrop(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  _onClearFilePreview(i) {
    const { files } = this.state;
    const newFiles = [
      ...files.slice(0, i),
      ...files.slice(i + 1)
    ];
    this.setState({
      files: newFiles
    });
    if (typeof onDOMChange === 'function') {
      onDOMChange.call(this, newFiles, e);
    }
  }
  
  _onOpen() {
    const fileInput = findDOMNode(this.refs.fileInput);
    fileInput.value = null;
    fileInput.click();
  }
  
  _onDrop(e) {
    e.preventDefault();
    const { multiple, onDOMChange } = this.props;
    const files = getFileTransfer(e, multiple);
    if (typeof onDOMChange === 'function' && files.length) {
      onDOMChange.call(this, files, e);
    }
    files.forEach((file) => {
      if (window) {
        file.preview = window.URL.createObjectURL(file);
      }
    });
    const newFiles = multiple
      ? [ ...this.state.files, ...files ]
      : files;
    this.setState({
      dragActive: false,
      files: newFiles
    });
  }
  
  _onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    
    // bugfix to make sure box gets highlighted
    if (!this.state.dragActive) {
      this.setState({
        dragActive: true
      });
    }
    
    return false;
  }
  
  _onDragEnter(e) {
    e.preventDefault(); 
  }
  
  _onDragLeave(e) {
    e.preventDefault();
    this.setState({
      dragActive: false
    });
  }
  
  _renderPreview(files) {
    if (!files.length) {
      return null;
    }
    return (
      <Tiles pad="none" flush={false}>
        {files.map((item, i) =>
          <Tile key={i} pad="none" margin={{ horizontal: 'small' }}
            className={`${CLASS_ROOT}__preview-tile`}>
            <Button plain a11yTitle="Clear image preview"
              onClick={this._onClearFilePreview.bind(this, i)}
              className={`${CLASS_ROOT}__closer-button`} 
              icon={<CloseIcon className={`${CLASS_ROOT}__closer-icon`} />} />
            {isImage(item.name)
              ? <Image size="thumb" src={item.preview} />
              : (
                  <Box
                    className={`${CLASS_ROOT}__file-preview`}
                    align="center" justify="center" colorIndex="unknown">
                    <DocumentIcon size="small" />
                  </Box>
                )
            }
          </Tile>  
        )}
      </Tiles>
    );
  }
  
  render() {
    const boxProps = Props.pick(this.props, Object.keys(Box.propTypes));
    const {
      className,
      label,
      multiple
    } = Props.omit(this.props, Object.keys(Box.propTypes));
    const { dragActive, files, dragDropSupported } = this.state;
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--active`]: dragActive
      },
      className
    );
    return (
      <Box align="center" justify="center" pad="medium">
        {dragDropSupported ?
          <Box {...boxProps}
            onDrop={this._onDrop} onDragEnter={this._onDragEnter}
            onDragOver={this._onDragOver} onDragLeave={this._onDragLeave}
            onClick={this._onClick} className={classes}>
            <Label>
              {label || ''}
            </Label>
          </Box>
        :
          <Button
            label={label}
            onClick={this._onClick}
          />
        }
        <input ref="fileInput" multiple={multiple} onChange={this._onDrop}
          type="file" className={`${CLASS_ROOT}__input`} />
        {this._renderPreview(files)}
      </Box>
    );
  }
}

Dropzone.propTypes = {
  label: PropTypes.node,
  preview: PropTypes.bool,
  multiple: PropTypes.bool.isRequired,
  onDOMChange: PropTypes.func,
  fullDropTarget: PropTypes.bool,
  ...Box.propTypes
};

Dropzone.defaultProps = {
  multiple: false,
  label: 'Click or drop a file to upload',
  preview: true,
  fullDropTarget: false
};

export default Dropzone;
