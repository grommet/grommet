const { readdirSync, mkdirSync } = require('fs');
const path = require('path')
const { execSync } = require('child_process');

const BaseScreenshots = './cypress/screenshots/base';
const NewScreenshots = './cypress/screenshots/new';
const DiffScreenshots = './cypress/screenshots/diff';


const directories = readdirSync(BaseScreenshots);
const constructPath = (dir, base) => path.format({dir, base});

const differ = (file) => {
  execSync(`./node_modules/.bin/blink-diff --no-copy --output "${constructPath(DiffScreenshots, file)}" "${constructPath(BaseScreenshots, file)}" "${constructPath(NewScreenshots, file)}"`)
}

const errors = [];

directories.forEach((directory) => {
  mkdirSync(constructPath(DiffScreenshots, directory));
  readdirSync(constructPath(BaseScreenshots, directory)).forEach((file) => {
    try {
      differ(constructPath(directory, file));
    } catch (err) {
      errors.push(`Diff of ${file} failed with status ${err.status}`);
    }
  })
})

if (errors.length > 0) {
  console.warn(errors.join("\n"));
  process.exit(1);
}
