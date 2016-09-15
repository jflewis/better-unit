const deepEqual = require('./lib/deep-equal')
const defaultOptions = require('nodeunit/bin/nodeunit.json')
const nodeunit = require('nodeunit')
const unhandledRejections = require('./lib/unhandled-rejections')

deepEqual.patch(nodeunit)

exports.run = (files, options) => {
  return new Promise((resolve, reject) => {
    // Reject on unhandled promise rejections
    const monitor = unhandledRejections.monitor(process, options.rejectionDelay || 100)
    monitor.once('error', (error) => {
      reject(error)
    })

    // Reject on uncaught exceptions
    process.once('uncaughtException', (error) => {
      reject(error)
    })

    // Run the tests
    options = Object.assign({}, defaultOptions, options)
    nodeunit.reporters.default.run(files, options, (error) => {
      if (error) {
        return reject(error)
      }

      resolve()
    })
  })
}
