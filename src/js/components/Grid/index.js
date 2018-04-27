import Grid from './Grid';

export { default as Grid } from './Grid';

Grid.available = window && window.CSS && window.CSS.supports &&
  window.CSS.supports('display', 'grid');

export default Grid;
