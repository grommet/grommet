import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    children: PropTypes.func,
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.number,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.object,
          PropTypes.number,
        ]),
      ),
    ]),
    disabled: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
          PropTypes.object,
        ]),
      ),
    ]),
    disabledKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    dropAlign: PropTypes.shape({
      top: PropTypes.oneOf(['top', 'bottom']),
      bottom: PropTypes.oneOf(['top', 'bottom']),
      right: PropTypes.oneOf(['left', 'right']),
      left: PropTypes.oneOf(['left', 'right']),
    }),
    dropHeight: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]),
    dropTarget: PropTypes.object,
    dropProps: PropTypes.object,
    emptySearchMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    focusIndicator: PropTypes.bool,
    helpContent: PropTypes.node,
    icon: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
      PropTypes.node,
      PropTypes.elementType,
    ]),
    labelKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    limit: PropTypes.number,
    messages: PropTypes.shape({
      multiple: PropTypes.string,
    }),
    name: PropTypes.string,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    onMore: PropTypes.func,
    onOpen: PropTypes.func,
    onSearch: PropTypes.func,
    open: PropTypes.bool,
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
        PropTypes.object,
      ]),
    ).isRequired,
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.node,
    ]),
    plain: PropTypes.bool,
    replace: PropTypes.bool,
    searchPlaceholder: PropTypes.string,
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.number,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.object,
          PropTypes.number,
        ]),
      ),
    ]),
    valueKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.shape({
        key: PropTypes.string,
        reduce: PropTypes.bool,
      }),
    ]),
    valueLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    visibleSelection: PropTypes.bool,
  };
}
export const MultiSelectPropTypes = PropType;
