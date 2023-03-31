import React, { forwardRef, useContext, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { CircleAlert } from 'grommet-icons/icons/CircleAlert';
import { MessageContext } from '../../contexts/MessageContext';

import { defaultProps } from '../../default-props';

import {
  disabledStyle,
  focusStyle,
  parseMetricToNum,
  unfocusStyle,
  useForwardedRef,
  useKeyboard,
} from '../../utils';

import { Anchor } from '../Anchor';
import { Box } from '../Box';
import { Button } from '../Button';
import { FormContext } from '../Form/FormContext';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';

import { StyledFileInput } from './StyledFileInput';
import { FileInputPropTypes } from './propTypes';
import { formatBytes } from './utils/formatBytes';
// We want the interaction of <input type="file" /> but none of its styling.
// So, we put what we want to show underneath and
// position the <input /> on top with an opacity of zero.
// If there are any files selected, we need to show the buttons to remove them.
// So, we offset the <input /> from the right by the appropriate width.
// We don't use Stack because of how we need to control the positioning.

const ContentsBox = styled(Box)`
  cursor: pointer;
  position: relative;
  ${(props) => props.disabled && disabledStyle()}
  ${(props) => props.theme.fileInput && props.theme.fileInput.extend};
  ${(props) =>
    props.hover &&
    props.theme.fileInput &&
    props.theme.fileInput.hover &&
    props.theme.fileInput.hover.extend};
  ${(props) =>
    props.dragOver &&
    props.theme.fileInput &&
    props.theme.fileInput.dragOver &&
    props.theme.fileInput.dragOver.extend};
  ${(props) => props.focus && focusStyle()};
  ${(props) => !props.focus && unfocusStyle()};
`;

const Label = styled(Text)`
  ${(props) =>
    props.theme.fileInput &&
    props.theme.fileInput.label &&
    props.theme.fileInput.label.extend};
`;

const Message = styled(Text)`
  ${(props) =>
    props.theme.fileInput &&
    props.theme.fileInput.message &&
    props.theme.fileInput.message.extend};
`;

const defaultPendingRemoval = {
  event: undefined,
  index: undefined,
};

const FileInput = forwardRef(
  (
    {
      a11yTitle,
      background,
      border,
      confirmRemove,
      disabled,
      id,
      plain,
      renderFile,
      maxSize,
      messages,
      margin,
      multiple,
      name,
      onChange,
      pad,
      value: valueProp,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext);
    const { format } = useContext(MessageContext);
    const formContext = useContext(FormContext);
    const [hover, setHover] = React.useState();
    const [dragOver, setDragOver] = React.useState();
    const [focus, setFocus] = React.useState();
    const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
    const [pendingRemoval, setPendingRemoval] = useState(defaultPendingRemoval);
    const aggregateThreshold = (multiple && multiple.aggregateThreshold) || 10;
    const max = multiple?.max;
    const inputRef = useForwardedRef(ref);
    const controlRef = useRef();
    const removeRef = useRef();
    const ConfirmRemove = confirmRemove;
    const RemoveIcon = theme.fileInput.icons.remove;
    const usingKeyboard = useKeyboard();

    const [files, setFiles] = formContext.useFormInput({
      name,
      value: valueProp,
      initialValue: [],
      validate: [
        maxSize
          ? () => {
              const fileList = [...files];
              let message = '';
              const numOfInvalidFiles = fileList.filter(
                ({ size }) => size > maxSize,
              ).length;
              if (numOfInvalidFiles) {
                let messageId = 'fileInput.maxSizeSingle';
                if (multiple) {
                  messageId = `fileInput.maxSizeMultiple.${
                    numOfInvalidFiles === 1 ? 'singular' : 'plural'
                  }`;
                }
                message = format({
                  id: messageId,
                  messages,
                  values: {
                    maxSize: formatBytes(maxSize),
                    numOfFiles: numOfInvalidFiles,
                  },
                });
              }
              return message;
            }
          : '',
        max
          ? () => {
              const fileList = [...files];
              let message = '';
              if (fileList.length > max) {
                message = format({
                  id: 'fileInput.maxFile',
                  messages,
                  values: { max },
                });
              }
              return message;
            }
          : '',
      ],
    });

    const mergeTheme = (propertyName, defaultKey) => {
      let result = {};
      const themeProp = theme.fileInput[propertyName];
      if (themeProp)
        if (typeof themeProp !== 'object')
          if (defaultKey) result[defaultKey] = themeProp;
          else result = themeProp;
        else result = { ...themeProp };
      const hoverThemeProp = theme.fileInput.hover[propertyName];
      if (hover && hoverThemeProp)
        if (typeof hoverThemeProp !== 'object')
          if (defaultKey) result[defaultKey] = hoverThemeProp;
          else result = hoverThemeProp;
        else result = { ...result, ...hoverThemeProp };
      const dragOverThemeProp = theme.fileInput.dragOver[propertyName];
      if (dragOver && dragOverThemeProp)
        if (typeof dragOverThemeProp !== 'object')
          if (defaultKey) result[defaultKey] = dragOverThemeProp;
          else result = dragOverThemeProp;
        else result = { ...result, ...dragOverThemeProp };
      return typeof result === 'object' && Object.keys(result).length === 0
        ? undefined
        : result;
    };

    let rightPad;
    if (mergeTheme('pad')) {
      const { horizontal, right } = mergeTheme('pad');
      if (right) {
        rightPad = theme.global.edgeSize[right] || right;
      } else if (horizontal) {
        rightPad = theme.global.edgeSize[horizontal] || horizontal;
      }
    }

    // rightPad needs to be included in the rightOffset
    // otherwise input may cover the RemoveButton, making it
    // unreachable by mouse click.
    // If browse anchor or button is greater than remove button then
    // rightoffset will take the larger width
    let rightOffset;
    if (removeRef.current && controlRef.current) {
      const rightOffsetBrowse =
        controlRef.current.getBoundingClientRect().width;
      const rightOffsetRemove = removeRef.current.getBoundingClientRect().width;
      if (rightPad && typeof rightPad === 'string')
        rightOffset = rightOffsetRemove + parseMetricToNum(rightPad);
      if (files.length === 1 || files.length > aggregateThreshold) {
        rightOffset =
          rightOffsetBrowse +
          rightOffsetRemove +
          parseMetricToNum(theme.global.edgeSize.small) * 2;
      } else if (rightOffsetBrowse > rightOffsetRemove) {
        rightOffset =
          rightOffsetBrowse + parseMetricToNum(theme.global.edgeSize.small) * 2;
      } else rightOffset = rightOffsetRemove;
    } else if (!files.length && controlRef.current) {
      rightOffset =
        controlRef.current.getBoundingClientRect().width +
        parseMetricToNum(theme.global.edgeSize.small) * 2;
    }

    // Show the number of files when more than one

    let message;
    if (!files.length) {
      message = format({
        id: multiple ? 'fileInput.dropPromptMultiple' : 'fileInput.dropPrompt',
        messages,
      });
    } else message = `${files.length} items`;

    const removeFile = (index) => {
      let nextFiles;
      if (index === 'all') {
        nextFiles = [];
      } else {
        nextFiles = [...files];
        nextFiles.splice(index, 1);
      }
      setFiles(nextFiles);

      // Need to have a way to track the files other than an array
      // since inputRef.current.files is a read-only FileList
      // https://stackoverflow.com/a/64019766
      /* eslint-disable no-undef */
      const dt = new DataTransfer();
      const curFiles = inputRef.current.files;
      if (index === 'all' || nextFiles.length === 0)
        inputRef.current.value = '';
      for (let i = 0; i < curFiles.length; i += 1) {
        const curfile = curFiles[i];
        if (index !== i) dt.items.add(curfile);
      }

      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'files',
      ).set;
      nativeInputValueSetter.call(inputRef.current, dt.files);
      const event = new Event('input', { bubbles: true });
      inputRef.current.dispatchEvent(event);

      if (onChange) onChange(event, { files: nextFiles });
      inputRef.current.focus();
    };

    return (
      <>
        <ContentsBox
          theme={theme}
          flex={false}
          disabled={disabled}
          background={mergeTheme('background', 'color')}
          border={!plain ? mergeTheme('border', 'side') : undefined}
          margin={mergeTheme('margin')}
          pad={mergeTheme('pad')}
          round={mergeTheme('round', 'size')}
          align={files.length ? 'stretch' : 'center'}
          justify="center"
          hover={hover}
          onMouseOver={disabled ? undefined : () => setHover(true)}
          onMouseOut={disabled ? undefined : () => setHover(false)}
          dragOver={dragOver}
          focus={usingKeyboard && focus}
        >
          <StyledFileInput
            ref={inputRef}
            type="file"
            id={id}
            name={name}
            maxSize={maxSize}
            multiple={multiple}
            disabled={disabled}
            plain
            rightOffset={rightOffset}
            {...rest}
            onDragOver={() => setDragOver(true)}
            onDragLeave={() => setDragOver(false)}
            onChange={(event) => {
              event.persist();
              const fileList = event.target.files;
              const nextFiles = multiple ? [...files] : [];
              for (let i = 0; i < fileList.length; i += 1) {
                // avoid duplicates
                const existing =
                  nextFiles.filter(
                    (file) =>
                      file.name === fileList[i].name &&
                      file.size === fileList[i].size,
                  ).length > 0;
                if (!existing) {
                  nextFiles.push(fileList[i]);
                }
              }
              setFiles(nextFiles);
              setDragOver(false);
              if (onChange) onChange(event, { files: nextFiles });
            }}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
          />
          {(!files.length || files.length > 1) && (
            <Box
              align="center"
              fill="horizontal"
              direction="row"
              justify="between"
            >
              {files.length <= aggregateThreshold && (
                <>
                  <Message {...theme.fileInput.message}>{message}</Message>
                  <Keyboard
                    onSpace={(event) => {
                      event.preventDefault();
                      if (controlRef.current === event.target)
                        inputRef.current.click();
                    }}
                    onEnter={(event) => {
                      if (controlRef.current === event.target)
                        inputRef.current.click();
                    }}
                  >
                    {theme.fileInput.button ? (
                      <Button
                        // The focus here is redundant for keyboard users
                        tabIndex={-1}
                        ref={controlRef}
                        kind={theme.fileInput.button}
                        label={format({
                          id: 'fileInput.browse',
                          messages,
                        })}
                        onClick={() => {
                          inputRef.current.click();
                          inputRef.current.focus();
                        }}
                      />
                    ) : (
                      <Anchor
                        // The focus here is redundant for keyboard users
                        tabIndex={-1}
                        alignSelf="center"
                        ref={controlRef}
                        margin="small"
                        onClick={() => {
                          inputRef.current.click();
                          inputRef.current.focus();
                        }}
                        label={format({
                          id: 'fileInput.browse',
                          messages,
                        })}
                      />
                    )}
                  </Keyboard>
                </>
              )}
            </Box>
          )}
          {files.length > aggregateThreshold && (
            <Box justify="between" direction="row" align="center">
              <Label {...theme.fileInput.label}>
                {files.length}{' '}
                {format({
                  id: 'fileInput.files',
                  messages,
                })}
              </Label>
              <Box flex={false} direction="row" align="center">
                <Button
                  ref={removeRef}
                  a11yTitle={format({
                    id: 'fileInput.removeAll',
                    messages,
                  })}
                  icon={<RemoveIcon />}
                  hoverIndicator
                  onClick={(event) => {
                    if (confirmRemove) {
                      event.persist(); // necessary for when React < v17
                      setPendingRemoval({ event, index: 'all' });
                      setShowRemoveConfirmation(true);
                    } else removeFile('all');
                  }}
                />
                <Keyboard
                  onSpace={(event) => {
                    if (controlRef.current === event.target)
                      inputRef.current.click();
                  }}
                  onEnter={(event) => {
                    if (controlRef.current === event.target)
                      inputRef.current.click();
                  }}
                >
                  {theme.fileInput.button ? (
                    <Button
                      // The focus here is redundant for keyboard users
                      tabIndex={-1}
                      ref={controlRef}
                      kind={theme.fileInput.button}
                      label={format({
                        id: 'fileInput.browse',
                        messages,
                      })}
                      onClick={() => {
                        inputRef.current.click();
                        inputRef.current.focus();
                      }}
                    />
                  ) : (
                    <Anchor
                      // The focus here is redundant for keyboard users
                      tabIndex={-1}
                      alignSelf="center"
                      ref={controlRef}
                      margin="small"
                      onClick={() => {
                        inputRef.current.click();
                        inputRef.current.focus();
                      }}
                      label={format({
                        id: 'fileInput.browse',
                        messages,
                      })}
                    />
                  )}
                </Keyboard>
              </Box>
            </Box>
          )}
          {files.length > 0 &&
            files.length <= aggregateThreshold &&
            files.map((file, index) => (
              <Box
                key={file.name}
                justify="between"
                direction="row"
                align="center"
              >
                {renderFile ? (
                  renderFile(file)
                ) : (
                  <Box
                    {...theme.fileInput.label}
                    gap="xsmall"
                    align="center"
                    direction="row"
                  >
                    {((maxSize && file.size > maxSize) ||
                      (max && index >= max)) && <CircleAlert />}
                    <Label
                      weight={
                        theme.global.input.weight ||
                        theme.global.input.font.weight
                      }
                      truncate
                    >
                      {file.name}
                    </Label>
                  </Box>
                )}
                <Box flex={false} direction="row" align="center">
                  <Button
                    ref={index ? undefined : removeRef}
                    a11yTitle={`${format({
                      id: 'fileInput.remove',
                      messages,
                    })} ${file.name}`}
                    icon={<RemoveIcon />}
                    hoverIndicator
                    onClick={(event) => {
                      if (confirmRemove) {
                        event.persist(); // necessary for when React < v17
                        setPendingRemoval({ event, index });
                        setShowRemoveConfirmation(true);
                      } else removeFile(index);
                    }}
                  />
                  {files.length === 1 && (
                    <Keyboard
                      onSpace={(event) => {
                        if (controlRef.current === event.target)
                          inputRef.current.click();
                      }}
                      onEnter={(event) => {
                        if (controlRef.current === event.target)
                          inputRef.current.click();
                      }}
                    >
                      {theme.fileInput.button ? (
                        <Button
                          // The focus here is redundant for keyboard users
                          tabIndex={-1}
                          ref={controlRef}
                          kind={theme.fileInput.button}
                          label={format({
                            id: 'fileInput.browse',
                            messages,
                          })}
                          onClick={() => {
                            inputRef.current.click();
                            inputRef.current.focus();
                          }}
                        />
                      ) : (
                        <Anchor
                          // The focus here is redundant for keyboard users
                          tabIndex={-1}
                          ref={controlRef}
                          margin="small"
                          onClick={() => {
                            inputRef.current.click();
                            inputRef.current.focus();
                          }}
                          label={format({
                            id: 'fileInput.browse',
                            messages,
                          })}
                        />
                      )}
                    </Keyboard>
                  )}
                </Box>
              </Box>
            ))}
        </ContentsBox>
        {showRemoveConfirmation && (
          <ConfirmRemove
            onConfirm={() => {
              removeFile(pendingRemoval.index);
              setPendingRemoval(defaultPendingRemoval);
              setShowRemoveConfirmation(false);
            }}
            onCancel={() => setShowRemoveConfirmation(false)}
          />
        )}
      </>
    );
  },
);

FileInput.defaultProps = {};

Object.setPrototypeOf(FileInput.defaultProps, defaultProps);

FileInput.displayName = 'FileInput';
FileInput.propTypes = FileInputPropTypes;

export { FileInput };
