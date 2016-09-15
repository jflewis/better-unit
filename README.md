# better-unit

better-unit is a wrapper around the [nodeunit](https://www.npmjs.com/package/nodeunit) module, with the following additions:

* Support for comparing `Map`, `Set`, `WeakMap`, and `WeakSet` using the `deepEqual()` assertion.
* Simplified, promise-based node API.
* Automatic detection of rejected promises that have not been handled.





## Example

```js
const betterUnit = require('better-unit')

betterUnit.run(['tests'])
  .catch((error) => {
    console.error(error.stack)
    process.exitCode = 1
  })
```




## Command Line

better-unit includes a command line program to run tests as well.

```sh
better-unit testmodule1.js testfolder [...]
```

### Command Line Options

better-unit supports a subset of nodeunit's command line options:

* `-r`: Recurse into subdirectories.
* `-t testName`: Filter tests based on `testName`.





## API

### `betterUnit.run(files, options) Returns: Promise`

Runs all specified tests.

* `files` (Array): A list of files or directories containing tests to run.
* `options` (Object): Configuration for the nodeunit reporter.
  * `recursive` (Boolean): Whether nodeunit should recurse into subdirectories of `files` to find tests.
  * `testspec` (String): Filter tests based on the specified test name.
  * `rejectionDelay` (Number): Duration in milliseconds to wait for unhandled rejections to be handled before terminating the test run due to an unhandled rejection.





## License

Copyright better-unit contributors.
Released under the terms of the ISC license.
