# Grommet website project

This is the source code for the [Grommet website](http://grommet.io). To run the website, please do the following:

  1. Install Grommet core NPM modules:

      ```
      $ cd grommet
      $ npm install
      ```
  2. Install website specific NPM modules:

      ```
      $ cd grommet/docs
      $ npm install
      ```

  3. Start the development server:

      ```
      $ cd grommet/docs
      $ gulp dev
      //for HPE themed version, run this instead:
      //$ gulp dev-hpe
      //for HPInc themed version, run this instead:
      //$ gulp dev-hpinc
      //for Aruba themed version, run this instead:
      //$ gulp dev-aruba
      ```

  4. Create the Grommet website distribution:

      ```
      $ cd grommet/docs
      $ gulp dist
      ```


