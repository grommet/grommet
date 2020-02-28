import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Button } from '../Button';
import { Drop } from '../Drop';

const DropButton = forwardRef(
  (
    {
      a11yTitle = 'Open Drop',
      disabled,
      dropAlign = { top: 'top', left: 'left' },
      dropProps,
      dropContent,
      dropTarget,
      id,
      open,
      onClick,
      onClose,
      onOpen,
      ...rest
    },
    ref,
  ) => {
    const [show, setShow] = useState();
    useEffect(() => {
      if (open !== undefined && open !== show) {
        setShow(open);
      }
    }, [open, show]);

    const buttonRef = useRef();

    const onDropClose = useCallback(
      event => {
        // if the user has clicked on our Button, don't do anything here,
        // handle that in onClickInternal() below.
        let node = event.target;
        while (node !== document && node !== (ref || buttonRef).current) {
          node = node.parentNode;
        }
        if (node !== (ref || buttonRef).current) {
          setShow(false);
          if (onClose) onClose(event);
        }
      },
      [onClose, ref],
    );

    const onClickInternal = useCallback(
      event => {
        if (!show) {
          setShow(true);
          if (onOpen) onOpen(event);
        } else {
          setShow(false);
          if (onClose) onClose(event);
        }
        if (onClick) onClick(event);
      },
      [onClick, onClose, onOpen, show],
    );

    return (
      <>
        <Button
          id={id}
          ref={ref || buttonRef}
          a11yTitle={a11yTitle}
          disabled={disabled}
          {...rest}
          onClick={onClickInternal}
        />
        {show && (ref || buttonRef).current && (
          <Drop
            id={id ? `${id}__drop` : undefined}
            restrictFocus
            align={dropAlign}
            target={dropTarget || (ref || buttonRef).current}
            onClickOutside={onDropClose}
            onEsc={onDropClose}
            {...dropProps}
          >
            {dropContent}
          </Drop>
        )}
      </>
    );
  },
);

DropButton.displayName = 'DropButton';

let DropButtonDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  DropButtonDoc = require('./doc').doc(DropButton);
}
const DropButtonWrapper = DropButtonDoc || DropButton;

export { DropButtonWrapper as DropButton };
