# Grommet Example App: people-finder

This app demonstrates a small-sized application using [Modular Grommet](http://grommet.io/docs/documentation/modular-grommet).
We demonstrate mobile-first UI interactions that work great on desktop as well.  Also use patterns such as WebSocket connections and Search. This application **must** have a back-end to perform the REST and LDAP operations.

**IMPORTANT**: Make sure to run `npm install` at Grommet root folder.

To run this application, execute the following commands:

  1. Install people-finder specific NPM modules
    ```
    $ cd grommet/examples/people-finder
    $ npm install
    ```

  2. Start the back-end server (needs to run in parallel to the development server from step 2):

    ```
    $ cd grommet/examples/server
    $ npm install
    $ node server.js
   ```

  3. Start people-finder development server
    ```
    $ cd grommet/examples/people-finder
    $ gulp dev
    ```

  **NOTE**: If you want to use this application outside the Grommet context, checkout [Exporting Example Apps Wiki](https://github.com/HewlettPackard/grommet/wiki/Exporting-examples-from-Grommet).
