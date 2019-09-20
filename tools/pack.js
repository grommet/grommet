import path from 'path';
import del from 'del';
import fs from 'fs';
import cp from 'child_process';
import tarball from 'tarball-extract';

const packageJSON = path.resolve(__dirname, '../package.json');
const packageJSONAsString = fs.readFileSync(packageJSON);
const json = JSON.parse(packageJSONAsString);
if (json.dependencies) {
  json.bundledDependencies = Object.keys(json.dependencies);
  fs.writeFileSync(packageJSON, JSON.stringify(json, null, 2));
}

try {
  cp.exec('npm pack', (packErr) => {
    if (packErr) {
      throw packErr;
    }
    const licenseMap = {
      name: json.name,
      version: json.version,
      dependencies: {
        licenseNotFound: [],
      },
    };

    const tarballName = `${json.name}-${json.version}.tgz`;
    tarball.extractTarball(tarballName, './tmp', (err) => {
      if (err) {
        throw err;
      }

      fs.renameSync(
        path.resolve(__dirname, `../${tarballName}`),
        path.resolve(__dirname, `../${json.name}-${json.version}-src-with-dependecies.tgz`)
      );

      const dependencies = fs.readdirSync(path.resolve(__dirname, '../tmp/package/node_modules'));

      dependencies.forEach((dependency) => {
        const dependencyPackageJSON = path.resolve(
          __dirname, `../node_modules/${dependency}/package.json`
        );
        if (fs.existsSync(dependencyPackageJSON)) {
          const contents = fs.readFileSync(dependencyPackageJSON);
          const instance = JSON.parse(contents);
          let license = instance.license;
          if (!license && instance.licenses) {
            license = instance.licenses[0];
          }

          if (!license) {
            licenseMap.dependencies.licenseNotFound.push(dependency);
          } else if (license.type) {
            licenseMap.dependencies[dependency] = license.type;
          } else {
            licenseMap.dependencies[dependency] = license;
          }
        }
      });

      const dependencyLicense = path.resolve(
        __dirname, `../${json.name}-${json.version}-licenses.json`
      );

      // write dependency license map
      fs.writeFileSync(dependencyLicense, JSON.stringify(
        licenseMap, null, 2)
      );

      // revert original package.json
      fs.writeFileSync(packageJSON, `${JSON.stringify(
        JSON.parse(packageJSONAsString), null, 2)
      }\n`);

      del.sync(['./tmp']);
    });
  });
} catch (e) {
  console.log(e);

  // revert original package.json
  fs.writeFileSync(packageJSON, `${JSON.stringify(
    JSON.parse(packageJSONAsString), null, 2)
  }\n`);
}
