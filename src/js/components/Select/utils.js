// import { TextInput } from '../TextInput';
// import { DropButton } from '../DropButton';

export const applyKey = (option, key) => {
  if (option === undefined) return undefined;
  if (typeof key === 'object') return applyKey(option, key.key);
  if (typeof key === 'function') return key(option);
  if (key !== undefined) return option[key];
  return option;
};

// export const SelectTextInput = styled(TextInput)`
//   cursor: ${(props) => (props.defaultCursor ? 'default' : 'pointer')};
// `;

// export const HiddenInput = styled.input`
//   display: none;
// `;

// export const StyledSelectDropButton = styled(DropButton)`
//   ${(props) => !props.callerPlain && controlBorderStyle};
//   ${(props) =>
//     props.theme.select &&
//     props.theme.select.control &&
//     props.theme.select.control.extend};
//   ${(props) => props.open && props.theme.select.control.open};
// `;
