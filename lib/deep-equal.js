const keyedCollections = new Set(['Map', 'Set', 'WeakMap', 'WeakSet'])

exports.patch = (nodeunit) => {
  const deepEqual = nodeunit.assert.deepEqual
  nodeunit.assert.deepEqual = function (...args) {
    args = args.map((arg) => {
      if (keyedCollections.has(arg.constructor.name)) {
        return {
          type: 'Map',
          entries: Array.from(arg)
        }
      }

      return arg
    })

    return deepEqual(...args)
  }
}
