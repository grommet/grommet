import { useId as useIdReact, useState } from 'react';
var currentId = 0;
var getId = function getId() {
  // eslint-disable-next-line no-plusplus
  var id = currentId++;
  return ":r" + id.toString(32) + ":";
};
var useIdGrommet = function useIdGrommet() {
  var _useState = useState(getId),
    id = _useState[0];
  return id;
};

// Polyfill React 18's useId for compatibility with React 16 and 17
var useId = useIdReact != null ? useIdReact : useIdGrommet;
export { useId };