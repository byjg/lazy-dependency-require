# Lazy Dependency Require

A simple package that tries to require a node.js module and if it is fail, try to install it globally;

```javascript
const ldr = require('lazy-dependency-require');

// This will try require('my-package') and if not exists local or global will execute:
// npm i -g --ignore-scripts my-package
const myPackage = ldr.require('my-package', {
    args: ['--ignore-scripts'],
    stdout: console.log,
    moduleName: 'npm module name'
});
```

All options are not required. If moduleName is missing, will try load 'my-package'.

Ex.:

```javascript
const ldr = require('lazy-dependency-require');

// This will try require('my-package') and if not exists local or global will execute:
// npm i -g my-package
const myPackage = ldr.require('my-package');
```

# Install

```bash
npm i lazy-dependency-require --save
```

# NOTE

Some people do not like the idea to have a global package dependency for a lot of reasons. 
But in some cases this could be useful. Use it for your own.

