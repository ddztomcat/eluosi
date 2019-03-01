const merge = require('webpack-merge')
const common = require('./webpack.base.js')
const os = require('os')

function get_ip() {
  let needHost = ''
  try {
    let network = os.networkInterfaces()
    for (let dev in network) {
      let iface = network[dev]
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i]
        if (
          alias.family === 'IPv4' &&
          alias.address !== '127.0.0.1' &&
          !alias.internal
        ) {
          needHost = alias.address
        }
      }
    }
  } catch (e) {
    needHost = 'localhost'
  }
  return needHost
}

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: get_ip(),
    contentBase: './docs'
  }
})
