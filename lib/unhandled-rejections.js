const EventEmitter = require('event-emitter')

exports.monitor = (process, delay) => {
  const monitor = new EventEmitter()
  const unhandledRejections = new Map()

  process.on('unhandledRejection', (error, promise) => {
    unhandledRejections.set(promise, setTimeout(() => {
      error.message = `[UNHANDLED REJECTION] ${error.message}`
      monitor.emit('error', error)
    }, delay))
  })

  process.on('rejectionHandled', (promise) => {
    clearTimeout(unhandledRejections.get(promise))
    unhandledRejections.delete(promise)
  })

  return monitor
}
