# Grommet Example App: medium-app

## Demo
[Live demo](http://grommet.io/medium-app/) of an example "medium sized" application using Grommet.

Login credentials: `Username` any string that looks like an email address and any `Password` (not used or stored).

## How To
This app demonstrates a medium-sized application using [Modular Grommet](http://grommet.io/docs/documentation/modular-grommet).
We demonstrate UI routing and some important patterns like Login, Resource Management (including WebSocket connections), and Search. This application **must** have a back-end to perform login operations and manage resources.

**IMPORTANT**: Make sure to run `npm install` at Grommet root folder.

To run this application, execute the following commands:

  1. Install medium-app specific NPM modules
    ```
    $ cd grommet/examples/medium-app
    $ npm install
    ```
  2. Start the development server

    ```
    $ gulp dev
    ```

  3. Login credentials: `Username` any string that looks like an email address and any `Password` (not used or stored).

  **NOTE**: If you want to use this application outside the Grommet context, checkout [Exporting Example Apps Wiki](https://github.com/HewlettPackard/grommet/wiki/Exporting-examples-from-Grommet).
