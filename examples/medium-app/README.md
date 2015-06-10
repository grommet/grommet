# Grommet Example App: medium-app

This app demonstrates a medium-sized application using [Modular Grommet](http://grommet.io/docs/documentation/modular-grommet).
We demonstrate UI routing and some important patterns like Login, Resource Management (including WebSocket connections), and Search.

**IMPORTANT**: Make sure to run `npm install` at Grommet root folder.

To run this application, execute the following commands:

  1. Start the development server:

    ```
    $ gulp dev
    ```

  2. Start the back-end server:

    ```
    $ cd grommet/examples/server
    $ npm install
    $ node server.js
    ```

  3. Open [http://localhost:8001/webpack-dev-server/](http://localhost:8001/webpack-dev-server/)

  4. For the login credentials: `Username` must be a valid email, and any `Password` is accepted at this point.

  **NOTE**: If you want to use this application outside the Grommet context, checkout [Exporting Example Apps Wiki](https://github.com/HewlettPackard/grommet/wiki/Exporting-examples-from-Grommet).