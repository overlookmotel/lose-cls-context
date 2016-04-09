# lose-cls-context.js

# Function to lose CLS context

## Current status

[![NPM version](https://img.shields.io/npm/v/lose-cls-context.svg)](https://www.npmjs.com/package/lose-cls-context)
[![Build Status](https://img.shields.io/travis/overlookmotel/lose-cls-context/master.svg)](http://travis-ci.org/overlookmotel/lose-cls-context)
[![Dependency Status](https://img.shields.io/david/overlookmotel/lose-cls-context.svg)](https://david-dm.org/overlookmotel/lose-cls-context)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookmotel/lose-cls-context.svg)](https://david-dm.org/overlookmotel/lose-cls-context)
[![Coverage Status](https://img.shields.io/coveralls/overlookmotel/lose-cls-context/master.svg)](https://coveralls.io/r/overlookmotel/lose-cls-context)

## Usage

Runs a callback asynchronously, but *outside* of current CLS context.

### loseCls( callback )

`callback` is called in next tick. As opposed to `setImmediate`, `process.nextTick()` etc, the [continuation-local-storage](https://www.npmjs.com/package/continuation-local-storage) context is not maintained.

### Why?

Primarily, this module exists to facilitate testing of node.js libraries / applications that use [continuation-local-storage](https://www.npmjs.com/package/continuation-local-storage).

This module is a lightweight way to test what happens when CLS context is lost (which many libraries e.g. `redis` do) and to ensure that your own code handles this correctly, perhaps by re-binding with `namespace.bind()`.

### Example

```js
var cls = require('continuation-local-storage');
var namespace = cls.createNamespace('test');

var loseCls = require('lose-cls-context');

namespace.run(function() {
    namespace.set('value', 123);

    setImmediate(function() {
        var value = namespace.get('value');
        // CLS context is maintained - value === 123
    });

    loseCls(function() {
        var value = namespace.get('value');
        // CLS context has been lost - value === undefined
    });
});
```

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

## Changelog

See [changelog.md](https://github.com/overlookmotel/lose-cls-context/blob/master/changelog.md)

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/lose-cls-context/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add an entry to changelog
* add tests for new features
* document new functionality/API additions in README
