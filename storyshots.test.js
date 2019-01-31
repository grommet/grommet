import initStoryshots, {
  multiSnapshotWithOptions,
} from '@storybook/addon-storyshots';

initStoryshots({
  configPath: 'storybook',
  test: multiSnapshotWithOptions(),
});
