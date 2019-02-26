# Grommet + UXPin Merge
Integration of [Grommet](https://github.com/grommet/grommet) with UXPin Merge Technology. Check out [Merge Wiki](https://wikiuxpin.atlassian.net/wiki/spaces/MA) for detailed documentation

![alt text](https://i.imgur.com/bLp5zRb.png "Grommet and Merge")

## About Grommet and this repository.

[Grommet](https://v2.grommet.io/) is a popular open-source design system. In the words of creators:

>"Grommet came to the world from four individuals inside Hewlett Packard that wanted to make designing a modern web experience for enterprise companies (or anyone really) easy. Working day to day, the designer and developer hand off is always a point of contention when it comes to our productivity and ensuring a unique vision is delivered to customers—So that’s where we started."
>[Grommet Team](https://v1.grommet.io/docs/about)

This repository consists of Grommet code adjusted to the requirements of UXPin Merge. What have been changed?
1. PropTypes – UXPin Merge doesn't have a full support for Typescript yet (coming soon!💫). To keep the functionality intact – I've added PropTypes to all the components. 
2. Interactive, controlled, components – some of Grommet components require state control added to the implementation `JS` file. For the benefit of designers using this repository, I've added collection of fully interactive components.
3. CircleCI integration – UXPin Merge can work with any CI app. However, since Grommet uses Travis CI, to avoid conflicts and chanes in the main file, I've added integration with Circle CI.

## About UXPin Merge

Merge is a revolutionary technology that lets users import (and keep in sync) coded React.js components from GIT repositories to UXPin editor. 
The imported components are 100% identical to components used by developers during the development process. 
It means that components are going to look and, function (interactions, data) identical to the real product experienced by the users. 

[UXPin](http://uxpin.com) is a leading code–based design platform.

## How to use Merge integration with Grommet?

Merge is currently only available for selected beta users.

1. Fork this repository and clone it to your computer.
2. Install dependencies with `npm install`
3. Log in to your UXPin beta account (approved for alpha and beta tests by UXPin Inc.)
4. Start Merge dev environment with `npm start`

If you wish to push Grommet components to your UXPin account – check guide to integration with CI servers in our [WIKI](https://wikiuxpin.atlassian.net/wiki/spaces/MA/pages/665845792/CI+Servers) 

## Examples

![alt text](https://i.imgur.com/ltui3jP.gif "Grommet in UXPin Merge")

![alt text](https://i.imgur.com/AJSZ13X.gif "Grommet Calendar in Merge")

## Theming

Theming is supported through `UXPinWrapper.js` component located in `./tools`. This wrapper uses `Grommet` component to pass theme to all components integrated with Merge.

⚠️ `Grommet` component renders additional `div` wrapper. That causes problems with the size of bounding box in UXPin editor. The preferred way of UXPin Merge to work with theme providers is via [HOC](https://reactjs.org/docs/higher-order-components.html).

## Supported components

| Component     | Status|
| ------------- |:-----|
| Accordion | ✅ Full Support |
| AccordionPanel | ✅ Full Support |
| Anchor | ✅ Full Support |
| Box | ✅ Full Support |
| Button | ✅ Full Support |
| Calendar | ✅ Full Support |
| Carousel | ✅ Full Support |
| Chart | ✅ Full Support |
| CheckBox | ✅ Full Support |
| Clock | ✅ Full Support|
| Collapsible | ✅ Full Support|
| DataTable | Not supported yet |
| Diagram | 🔻 Not Supported. Unknown issues. |
| Distribution | 🔻 Not Supported. Function passed as children breaks component. |
| Drop | Not supported yet. Not sure how it supposed to work. |
| DropButton | ✅ Full Support |
| Form | ✅ Full Support.🐛 Doesn't render children from preset. |
| FormField | ✅ Full Support |
| Grid | ✅ Full Support  |
| Heading | ✅ Full Support |
| Image | ✅ Full Support |
| InifiniteScroll | 🔻 Not Supported. Difficult to make use of it in UXPin. |
| Keyboard | ✅ Full Support. Not sure how it supposed to work. |
| Layer | 🔻 Not Supported. Absolute positioning not supported. |
| Markdown | ✅ Full Support |
| MaskedInput | ✅ Full Support |
| Menu | ✅ Full Support |
| Meter | ✅ Full Support |
| Paragraph | ✅ Full Support |
| RadioButton | ✅ Full Support |
| RadioButtonGroup | ✅ Full Support |
| RangeInput | ✅ Full Support |
| RangeSelector | ✅ Full Support |
| Select | ✅ Full Support |
| Stack | ✅ Full Support |
| Tab | ✅ Full Support |
| Table | 🔻 Not Supported. Unknown issues. |
| Tabs | ✅ Full Support |
| Text | ✅ Full Support |
| TextArea | ✅ Full Support |
| TextInput | ✅ Full Support |
| Video | ✅ Full Support |
| WorldMap | ✅ Full Support |

## CI Server Integration (available only for *beta users*)

The recommended approach to integrating React.js components with UXPin is via Continues Integration server (Circle CI, Travis...). 
This approach provides an opportunity to establish a real single source of truth for design and development. 

After the integration with a CI server every commit to master can (if this is how your CI is configured) automatically update library in UXPin. 

This repository consits of [an example of integration with Circle CI](https://github.com/uxpin-merge/material-ui-merge/blob/master/.circleci/config.yml). 
If you wish to reuse it follow these steps:
1. Make sure that you forked this repository.
2. Go to https://circleci.com and sign-up for an account with your Github credentials.
3. Start a new project and track your fork of this repository.
4. Go into your [UXPin](http://uxpin.com) account, enter UXPin editor (in any project).
5. While inside of UXPin editor open Design Systems Libraries panel and create a new library. Copy the library token (keep it secure it provides access to your library!)

![alt text](https://github.com/uxpin-merge/material-ui-merge/blob/master/img/merge_ci.gif "UXPin Design System Library")

If you're not seeing the screen above – contact your account manager. You're not in Merge Beta group yet.

6. Go into settings of your project in Circle CI. Enter section `Environment Variables` and click on `Add new variable`.
7. Name the new variable `UXPIN_AUTH_TOKEN` and pass your token copied from the UXPin library (#5) as its value.

That's it! The next change in the master branch of your fork will automatically trigger Circle CI and send the newest version of your components to UXPin.

Integration with CI server leads to a powerful workflow, with that however comes couple of dangers, so please be aware of them!
* ⚠️ Don't share your UXPin authorization token with anyone. It leads straight to your design system library in UXPin. Keep the token safe in the CI app!
* ⚠️ Don't keep your UXPin authorization token in any file checked into your git repository.
* ⚠️ Treat contributing to Master branch just like deploying production code. *Any* change will be automatically reflected in the UXPin library and projects. 
If you want to experiment with components – start a new branch and use Merge dev environment – experiment mode (in this repository launched via `npm start`)




---------------------------------

# Grommet: focus on the essential experience

[![Slack](http://alansouzati.github.io/artic/img/slack-badge.svg)](http://slackin.grommet.io)

<img align="right" height="260" src="https://v2.grommet.io/img/stak-hurrah.svg">

### Documentation

Visit the [Grommet v2](https://v2.grommet.io/) website for more information.

### Support / Contributing

Before opening an issue or pull request, please read the [Contributing](https://github.com/grommet/grommet/blob/master/CONTRIBUTING.md) guide.

### Install

You can install Grommet using either of the methods below.

For NPM users:

```
  $ npm install grommet styled-components --save
```

Detailed instructions are on the [Get Started](https://v2.grommet.io/use) page.

### Explore

We have a few examples on Storybook, you can see them by running:

```
  $ npm run storybook
```

or you can navigate our [Storybook site](https://storybook.grommet.io)

### Release History

See the [Change Log](https://github.com/grommet/grommet/wiki/Change-Log).

### Tools Behind Grommet

Grommet is produced using these great tools

- [Travis CI](https://travis-ci.org/grommet/grommet) for continuous integration
- [Waffle.io](https://waffle.io/grommet/grommet) for backlog tracking
