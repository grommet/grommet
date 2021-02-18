import React, { forwardRef, useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { disabledStyle, focusStyle, useForwardedRef } from '../../utils';

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
  ${props => (props.disabled ? disabledStyle() : 'cursor: pointer;')}
  &:focus {
    ${focusStyle}
  }
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

    return (
      <Keyboard
        onSpace={event => {
          if (controlRef.current === event.target) inputRef.current.click();
        }}
        onEnter={event => {
          if (controlRef.current === event.target) inputRef.current.click();
        }}
      >
        <ContentsBox
          ref={controlRef}
          tabIndex={!plain ? 0 : undefined}
          theme={theme}
          disabled={disabled}
          background={mergeTheme('background', 'color')}
          border={mergeTheme('border', 'side')}
          margin={mergeTheme('margin')}
          pad={mergeTheme('pad')}
          round={mergeTheme('round', 'size')}
          align={files.length ? 'stretch' : 'center'}
          justify="center"
          hover={hover}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          dragOver={dragOver}
        >
          {files.length > aggregateThreshold && (
            <Box direction="row" align="center" justify="between">
              <Label {...theme.fileInput.label}>
                {files.length} {messages.files || 'files'}
              </Label>
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
            </Box>
          )}
          {files.length > 0 &&
            files.length <= aggregateThreshold &&
            files.map((file, index) => (
              <Box
                key={file.name}
                direction="row"
                align="center"
                justify="between"
              >
                {renderFile ? (
                  renderFile(file)
                ) : (
                  <Label
                    weight={
                      theme.global.input.weight ||
                      theme.global.input.font.weight
                    }
                    truncate
                    {...theme.fileInput.label}
                  >
                    {file.name}
                  </Label>
                )}
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
              </Box>
            ))}
          {!files.length && (
            <Message {...theme.fileInput.message}>
              {multiple
                ? messages.dropPromptMultiple || 'Drop files here or'
                : messages.dropPrompt || 'Drop file here or'}{' '}
              <Anchor label={messages.browse || 'browse'} />
            </Message>
          )}
          <StyledFileInput
            ref={inputRef}
            type="file"
            id={id}
            name={name}
            multiple={multiple}
            disabled={disabled}
            plain
            rightOffset={
              removeRef.current &&
              removeRef.current.getBoundingClientRect().width
            }
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
      </Keyboard>
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
