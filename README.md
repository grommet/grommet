# Grommet: The Most Advanced UI framework for Enterprise

[![Slack](http://alansouzati.github.io/artic/img/slack-badge.svg)](https://grommet.slack.com)

<img align="right" height="260" src="http://alansouzati.github.io/artic/img/grommet-logo.png">

### Documentation

Visit the [grommet.io](http://grommet.io/) website for any references.

### Support / Contributing

Before you open an issue or pull request, please read our [Contributing](http://grommet.usa.hp.com/docs/hpe/documentation/contributing) guide.

[Request Access](http://grommet.usa.hp.com/docs/hpe/request_access) or write to us at grommet@hp.com.

### Requirements

* [Node](https://nodejs.org/download/) 0.9+
* [Npm](https://nodejs.org/download/) 1.4.x+ 
* [Bower](http://bower.io) 1.x+ (optional)
* [Ruby](https://www.ruby-lang.org/en/documentation/installation/) 1.9.3+ (only required if you want to build Grommet locally)

### Install

  For Bower users:

    $ bower install --save HewlettPackard/grommet-bower

  For NPM users:

    $ npm install -g grommet --registry http://grommet.usa.hp.com:2374  

### Hello World

  Access the [Hello World](http://grommet.usa.hp.com/docs/hpe/documentation) page to quickly learn how to use what you've just installed.   

### Building Grommet

  If you want to build Grommet in your local environment, run the following commands:

  1. Install the Ruby scss-lint package:

    $ gem install scss_lint

  2. Clone Grommet repo:

    $ git clone https://github.com/HewlettPackard/grommet.git

  3. Create the NPM distribution:

    $ gulp dist

    After this step is completed, a **dist** folder will be created with content ready to be deployed in NPM.

  4. Create the Bower distribution:

    $ gulp dist-bower

    After this step is completed, a **dist-bower** folder will be created with content ready to be deployed in Bower, or to be used directly in the Browser. 

### Running Grommet Website

  If you want to run the Grommet website locally run the following commands:

  1. Inside Grommet, access docs folder:

    $ cd docs

  2. Run the website using [Hot Module Replacement](http://webpack.github.io/docs/hot-module-replacement.html):

    $ gulp dev

    The above step will start a development server with generic Grommet styling, if you want to use the HPE style, run the following command instead:

    $ gulp dev-hpe

  3. Open [Grommet Website](http://localhost:8002/webpack-dev-server/)

    At this point, any modification in the website will trigger automatic reload in the browser so that you can easily validate your changes. This is very handy, isn't it?

  4. Build the website:

    $ gulp dist

    After this step is completed, a **docs/dist** folder will be created with the content ready to be deployed in an application server of your choice. 

Grommet team is looking forward to your contributions.