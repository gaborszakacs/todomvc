## Setup project

Make sure you have `node-gyp` installed globally and have Xcode command line tools (on OSX). [More info](https://github.com/nodejs/node-gyp#installation)

`git clone https://github.com/gaborszakacs/todomvc.git && cd todomvc && npm install`

## Build project

`npm run build`

## Start development server on localhost:8080

`npm run start`

## Run feature tests:

`npm run test:features`

If you see something like this, your setup is complete:

```
[chrome #0-0] Running: chrome
[chrome #0-0]
[chrome #0-0] Todo list
[chrome #0-0]
[chrome #0-0]     Add item
[chrome #0-0]
[chrome #0-0]         Hitting Enter
[chrome #0-0]           ✓ adds item to the list
[chrome #0-0]
[chrome #0-0]
[chrome #0-0] 1 passing (3s)
[chrome #0-0]
```

# Original README: Vanilla ES6 (ES2015) • [TodoMVC](http://todomvc.com)

> A port of the [Vanilla JS Example](http://todomvc.com/examples/vanillajs/), but translated into ES6, also known as ES2015.

## Learning ES6

- [ES6 Features](https://github.com/lukehoban/es6features)
- [Learning Resources](https://github.com/ericdouglas/ES6-Learning)
- [Babel's ES6 Guide](https://babeljs.io/docs/learn-es2015/)
- [Babel Compiler](https://babeljs.io/)

## Installation

To get started with this example, navigate into the example folder and install the NPM modules.
```bash
cd todomvc/examples/vanilla-es6
npm install
```

## Compiling ES6 to ES5

After NPM modules have been installed, use the pre-defined Babel script to convert the `src` files. Browserify is also used so that `module.exports` and `require()` can be run in your browser.

```bash
npm run compile
```

## Support

- [Twitter](http://twitter.com/lukeed05)

*Let us [know](https://github.com/tastejs/todomvc/issues) if you discover anything worth sharing.*


## Implementation

Uses [Google Closure Compiler](https://developers.google.com/closure/compiler/) to compile ES6 code to ES5, which is then readable by all browsers.


## Credit

Created by [Luke Edwards](http://www.lukeed.com)
Refactored by [Aaron Muir Hamilton](https://github.com/xorgy)
