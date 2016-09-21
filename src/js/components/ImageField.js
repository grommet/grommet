import React, { Component, PropTypes } from 'react';
import FormField from './FormField';

import Anchor from './Anchor';
import UpgradeIcon from './icons/base/Upgrade';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.IMAGE_FIELD;

export default class ImageField extends Component {

  constructor(props, context) {
    super(props, context);
    console.warn(
      'ImageField: component has been deprecated.'
    );
    this._onChange = this._onChange.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this._onClear = this._onClear.bind(this);
  }

  _processFiles (files) {
    const { onChange } = this.props;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const fileData = {
          data: reader.result,
          name: file.name,
          size: file.size,
          type: file.type
        };

        onChange(fileData);
      });

      reader.readAsDataURL(file);
    }
  }

  _onChange (event) {
    const files = event.target.files;
    this._processFiles(files);
  }

  _onDrop (event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this._processFiles(files);
  }

  _onClear (event) {
    event.preventDefault();
    const { onChange } = this.props;
    onChange(undefined);
  }

  render () {
    const { error, help, icon, id, label, name, value } = this.props;

    const Icon = icon ? icon : UpgradeIcon;

    let result;
    if (value) {
      result = (
        <FormField label={label} help={help} className={CLASS_ROOT}
          error={error}>
          <div className={`${CLASS_ROOT}__container`}>
            <img className={`${CLASS_ROOT}__image`} src={value.data} />
          </div>
          <Anchor href="#" onClick={this._onClear}
            className={`${CLASS_ROOT}__clear`}>
            Clear
          </Anchor>
        </FormField>
      );
    } else {
      result = (
        <FormField label={label} help={help} className={CLASS_ROOT}
          onDrop={this._onDrop} htmlFor={id} error={error}>
          <Icon colorIndex="grey-4" className={`${CLASS_ROOT}__icon`} />
          <input id={id} name={name} type="file"
            onChange={this._onChange} />
        </FormField>
      );
    }

    return result;
  }
}

ImageField.propTypes = {
  error: PropTypes.string,
  help: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.shape({
    data: PropTypes.string.isRequired
  }),
  onChange: PropTypes.func.isRequired
};
