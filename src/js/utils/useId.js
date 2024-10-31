import { useId as useIdReact, useState } from 'react';

let currentId = 0;

const getId = () => {
  // eslint-disable-next-line no-plusplus
  const id = currentId++;
  return `:r${id.toString(32)}:`;
};

const useIdGrommet = () => {
  const [id] = useState(getId);
  return id;
};

// Polyfill React 18's useId for compatibility with React 16 and 17
const useId = useIdReact ?? useIdGrommet;

export { useId };
