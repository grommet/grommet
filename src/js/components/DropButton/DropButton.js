import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { Button } from '../Button';
import { Drop } from '../Drop';
import { setFocusWithoutScroll } from '../../utils';

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
    const [closed, setClosed] = useState();
    const [show, setShow] = useState(open);
    useEffect(() => {
      if (open !== undefined && open !== show) {
        setShow(open);
        if (!open) setClosed(true);
      }
    }, [open, show]);

    const buttonRef = useRef();

    // show the drop initially if open and refs are ready
    useEffect(() => {
      if (closed === undefined && open && (ref || buttonRef).current) {
        setClosed(false);
      }
    }, [closed, open, ref, buttonRef]);

    useEffect(() => {
      // focus on the button if the drop is closed
      if (closed) {
        setFocusWithoutScroll((ref || buttonRef).current);
        setClosed(false);
      }
    }, [closed, ref]);

    const onDropClose = () => {
      setShow(false);
      if (onClose) onClose();
      setClosed(true);
    };

    const onToggle = event => {
      setShow(!show);
      if (show) {
        if (onClose) onClose();
        setClosed(true);
      } else if (onOpen) onOpen();
      if (onClick) onClick(event);
    };

    let drop;
    if (show && (ref || buttonRef).current) {
      drop = (
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
      );
    }

    return (
      <>
        <Button
          id={id}
          ref={ref || buttonRef}
          a11yTitle={a11yTitle}
          disabled={disabled}
          {...rest}
          onClick={onToggle}
        />
        {drop}
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
