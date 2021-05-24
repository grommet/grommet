import React, { forwardRef, useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { disabledStyle, parseMetricToNum, useForwardedRef } from '../../utils';

import { Anchor } from '../Anchor';
import { Box } from '../Box';
import { Button } from '../Button';
import { FormContext } from '../Form/FormContext';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';

import { StyledFileInput } from './StyledFileInput';

// We want the interaction of <input type="file" /> but none of its styling.
// So, we put what we want to show underneath and
// position the <input /> on top with an opacity of zero.
// If there are any files selected, we need to show the buttons to remove them.
// So, we offset the <input /> from the right by the appropriate width.
// We don't use Stack because of how we need to control the positioning.

const ContentsBox = styled(Box)`
  position: relative;
  ${props => props.disabled && disabledStyle()}
  ${props => props.theme.fileInput && props.theme.fileInput.extend};
  ${props =>
    props.hover &&
    props.theme.fileInput &&
    props.theme.fileInput.hover &&
    props.theme.fileInput.hover.extend};
  ${props =>
    props.dragOver &&
    props.theme.fileInput &&
    props.theme.fileInput.dragOver &&
    props.theme.fileInput.dragOver.extend};
`;

const Label = styled(Text)`
  ${props =>
    props.theme.fileInput &&
    props.theme.fileInput.label &&
    props.theme.fileInput.label.extend};
`;

const Message = styled(Text)`
  ${props =>
    props.theme.fileInput &&
    props.theme.fileInput.message &&
    props.theme.fileInput.message.extend};
`;

const FileInput = forwardRef(
  (
    {
      a11yTitle,
      background,
      border,
      disabled,
      id,
      plain,
      renderFile,
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
    const formContext = useContext(FormContext);
    const [files, setFiles] = formContext.useFormInput(name, valueProp, []);
    const [hover, setHover] = React.useState();
    const [dragOver, setDragOver] = React.useState();
    const aggregateThreshold = (multiple && multiple.aggregateThreshold) || 10;
    const inputRef = useForwardedRef(ref);
    const controlRef = useRef();
    const removeRef = useRef();
    const RemoveIcon = theme.fileInput.icons.remove;

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
      const rightOffsetBrowse = controlRef.current.getBoundingClientRect()
        .width;
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
      if (multiple) message = messages.dropPromptMultiple || 'Drag and drop';
      if (!multiple) {
        message = messages.dropPrompt || 'Drag and drop';
      }
    } else message = `${files.length} items`;

    return (
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
      >
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
                  onSpace={event => {
                    if (controlRef.current === event.target)
                      inputRef.current.click();
                  }}
                  onEnter={event => {
                    if (controlRef.current === event.target)
                      inputRef.current.click();
                  }}
                >
                  {theme.fileInput.button ? (
                    <Button
                      ref={controlRef}
                      kind={theme.fileInput.button}
                      label={messages.browse || 'browse'}
                      onClick={() => {
                        inputRef.current.click();
                        inputRef.current.focus();
                      }}
                    />
                  ) : (
                    <Anchor
                      tabIndex={0}
                      alignSelf="center"
                      ref={controlRef}
                      margin="small"
                      onClick={() => {
                        inputRef.current.click();
                        inputRef.current.focus();
                      }}
                      label={messages.browse || 'browse'}
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
              {files.length} {messages.files || 'files'}
            </Label>
            <Box flex={false} direction="row" align="center">
              <Button
                ref={removeRef}
                a11yTitle={messages.removeAll || 'remove all'}
                icon={<RemoveIcon />}
                hoverIndicator
                onClick={event => {
                  event.stopPropagation();
                  setFiles([]);
                  inputRef.current.focus();
                }}
              />
              <Keyboard
                onSpace={event => {
                  if (controlRef.current === event.target)
                    inputRef.current.click();
                }}
                onEnter={event => {
                  if (controlRef.current === event.target)
                    inputRef.current.click();
                }}
              >
                {theme.fileInput.button ? (
                  <Button
                    ref={controlRef}
                    kind={theme.fileInput.button}
                    label={messages.browse || 'browse'}
                    onClick={() => {
                      inputRef.current.click();
                      inputRef.current.focus();
                    }}
                  />
                ) : (
                  <Anchor
                    tabIndex={0}
                    alignSelf="center"
                    ref={controlRef}
                    margin="small"
                    onClick={() => {
                      inputRef.current.click();
                      inputRef.current.focus();
                    }}
                    label={messages.browse || 'browse'}
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
                <Label
                  weight={
                    theme.global.input.weight || theme.global.input.font.weight
                  }
                  truncate
                  {...theme.fileInput.label}
                >
                  {file.name}
                </Label>
              )}
              <Box flex={false} direction="row" align="center">
                <Button
                  ref={index ? undefined : removeRef}
                  a11yTitle={`${messages.remove || 'remove'} ${file.name}`}
                  icon={<RemoveIcon />}
                  hoverIndicator
                  onClick={event => {
                    event.stopPropagation();
                    const nextFiles = [...files];
                    nextFiles.splice(index, 1);
                    setFiles(nextFiles);
                    if (nextFiles.length === 0) inputRef.current.value = '';
                    inputRef.current.focus();
                  }}
                />
                {files.length === 1 && (
                  <Keyboard
                    onSpace={event => {
                      if (controlRef.current === event.target)
                        inputRef.current.click();
                    }}
                    onEnter={event => {
                      if (controlRef.current === event.target)
                        inputRef.current.click();
                    }}
                  >
                    {theme.fileInput.button ? (
                      <Button
                        ref={controlRef}
                        kind={theme.fileInput.button}
                        label={messages.browse || 'browse'}
                        onClick={() => {
                          inputRef.current.click();
                          inputRef.current.focus();
                        }}
                      />
                    ) : (
                      <Anchor
                        tabIndex={0}
                        ref={controlRef}
                        margin="small"
                        onClick={() => {
                          inputRef.current.click();
                          inputRef.current.focus();
                        }}
                        label={messages.browse || 'browse'}
                      />
                    )}
                  </Keyboard>
                )}
              </Box>
            </Box>
          ))}
        <StyledFileInput
          ref={inputRef}
          type="file"
          id={id}
          name={name}
          multiple={multiple}
          disabled={disabled}
          plain
          rightOffset={rightOffset}
          {...rest}
          onDragOver={() => setDragOver(true)}
          onDragLeave={() => setDragOver(false)}
          onChange={event => {
            event.persist();
            const fileList = event.target.files;
            const nextFiles = multiple ? [...files] : [];
            for (let i = 0; i < fileList.length; i += 1) {
              // avoid duplicates
              const existing =
                nextFiles.filter(
                  file =>
                    file.name === fileList[i].name &&
                    file.size === fileList[i].size,
                ).length > 0;
              if (!existing) nextFiles.push(fileList[i]);
            }
            setFiles(nextFiles);
            setDragOver(false);
            if (onChange) onChange(event);
          }}
        />
      </ContentsBox>
    );
  },
);

FileInput.defaultProps = {
  messages: {
    browse: 'browse',
    dropPrompt: 'Drop file here or',
    dropPromptMultiple: 'Drop files here or',
    files: 'files',
    remove: 'remove',
    removeAll: 'remove all',
  },
};

Object.setPrototypeOf(FileInput.defaultProps, defaultProps);

FileInput.displayName = 'FileInput';

let FileInputDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  FileInputDoc = require('./doc').doc(FileInput);
}
const FileInputWrapper = FileInputDoc || FileInput;

export { FileInputWrapper as FileInput };
