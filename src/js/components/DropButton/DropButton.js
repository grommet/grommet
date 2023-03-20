import React, { forwardRef, useCallback, useEffect, useState } from 'react';

import { Button } from '../Button';
import { Drop } from '../Drop';
import { useForwardedRef } from '../../utils';
import { DropButtonPropTypes } from './propTypes';

const defaultDropAlign = { top: 'top', left: 'left' };

const DropButton = forwardRef(
  (
    {
      a11yTitle = 'Open Drop',
      onAlign,
      disabled,
      dropAlign = defaultDropAlign,
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
    const buttonRef = useForwardedRef(ref);
    const [show, setShow] = useState();
    useEffect(() => {
      if (open !== undefined && open !== show) {
        setShow(open);
      }
    }, [open, show]);
    const onDropClose = useCallback(
      (event) => {
        // if the user has clicked on our Button, don't do anything here,
        // handle that in onClickInternal() below.
        let node = (event.composed && event.composedPath()[0]) || event.target;
        while (
          node &&
          node !== document &&
          !(node instanceof ShadowRoot) &&
          node !== buttonRef.current
        ) {
          node = node.parentNode;
        }
        if (node !== buttonRef.current) {
          // don't change internal state if caller is driving
          if (open === undefined) setShow(false);
          if (onClose) onClose(event);
        }
      },
      [buttonRef, onClose, open],
    );

    const onClickInternal = useCallback(
      (event) => {
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
          ref={buttonRef}
          a11yTitle={a11yTitle}
          disabled={disabled}
          {...rest}
          onClick={onClickInternal}
        />
        {show && buttonRef.current && (
          <Drop
            id={id ? `${id}__drop` : undefined}
            onAlign={onAlign}
            restrictFocus
            align={dropAlign}
            target={dropTarget || buttonRef}
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
DropButton.propTypes = DropButtonPropTypes;

export { DropButton };
