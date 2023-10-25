import del from 'del';
import fs from 'fs-extra';
import git from 'simple-git/promise';
import path from 'path';

const repoURL = `https://${process.env.GH_TOKEN}@github.com/grommet/grommet.git`;
const localFolder = path.resolve('.tmp/grommet');
const localDist = path.resolve('dist');

if (process.env.CI) {
  del(localFolder).then(() => {
    git()
      .silent(false)
      .clone(repoURL, localFolder)
      .then(() => git(localFolder).checkout('styled-components-beta-stable'))
      .then(() => del([`${localFolder}/**/*`]))
      .then(() => fs.copy(localDist, localFolder))
      .then(() => git(localFolder).add(['--all', '.']))
      .then(() =>
        git(localFolder).commit('styled-components-beta-stable updated'),
      )
      .then(() =>
        git(localFolder).push('origin', 'styled-components-beta-stable'),
      )
      .catch((err) => console.error('failed: ', err));
  });
} else {
  console.warn(
    `Skipping release. Release:styled-components-beta-stable task 
    should be executed by CI only.`,
  );
}
