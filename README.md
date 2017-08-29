# Lazy Dependency Require

A simple package that tries to require a node.js module and if it is fail, try to install it globally;

```javascript
const ldr = require('lazy-dependency-require');

const myPackage = ldr.load('my-package', {
    args: ['--ignore-scripts'],
    output: console.log,
    moduleName: 'npm module name'
});
```
## NOTE

Some people do not like the idea to have a global package dependency for a lot of reasons. 
But in some cases this could be useful. Use it for your own.

