# Grommet Example App: todo-app-modular

## Demo
[Live demo](http://grommet.io/todo-app-modular) is the obligitory ToDo application based on Grommet

## How To
This app demonstrates the todo application by using [Modular Grommet](http://grommet.io/docs/documentation/modular-grommet).
Also, this app illustrates the use of [Isomorphic React](http://isomorphic.net).

**IMPORTANT**: Make sure to run `npm install` at Grommet root folder.

To run this application, execute the following commands:

  1. Install todo-app-modular specific NPM modules

    ```
    $ cd grommet/examples/todo-app-modular
    $ npm install
    ```

  2. Start the development server:

    ```
    $ gulp dev
    ```

  3. Create the app distribution to be used by the back-end server

    ```
    $ gulp dist
    ```
  4. Start the back-end server with Isomorphic React

    ```
    $ node ssr/server.js
    ```

**NOTE**: If you want to use this application outside the Grommet context, checkout [Exporting Example Apps Wiki](https://github.com/HewlettPackard/grommet/wiki/Exporting-examples-from-Grommet).
