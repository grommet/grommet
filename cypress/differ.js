const { readdirSync, mkdirSync } = require('fs');
const path = require('path')
const { execSync } = require('child_process');

const BaseScreenshots = './cypress/screenshots/base';
const NewScreenshots = './cypress/screenshots/new';
const DiffScreenshots = './cypress/screenshots/diff';


const directories = readdirSync(BaseScreenshots);
const constructPath = (dir, base) => path.format({dir, base});

const differ = (file) => {
  try {
    execSync(`./node_modules/.bin/blink-diff --no-copy --output "${constructPath(DiffScreenshots, file)}" "${constructPath(BaseScreenshots, file)}" "${constructPath(NewScreenshots, file)}"`)
  } catch (err) {
    console.warn(`Diff of ${file} failed with status ${err.status}`)
  }
}

directories.forEach((directory) => {
  mkdirSync(constructPath(DiffScreenshots, directory));
  readdirSync(constructPath(BaseScreenshots, directory)).forEach((file) => {
    differ(constructPath(directory, file));
  })
})
