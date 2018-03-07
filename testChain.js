const { getChain } = require('./cloud-functions/chain')

getChain(null, {
  setHeader(name, value) {
    console.log('set header', name, value)
  },
  setEncoding(name) {
    console.log('set encoding', name)
  },
  status(status) {
    console.log('status', status)
    return this
  },
  write(data) {
    console.log('write', data)
  },
  end() {
    console.log('end')
  },
  json(data) {
    console.log('json', data)
  }
})
