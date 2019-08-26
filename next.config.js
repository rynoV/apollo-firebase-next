const withGraphql = require('next-plugin-graphql')

module.exports = withGraphql({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node    = {
      fs: 'empty',
    }
    config.plugins = config.plugins.filter(plugin => {
      if (plugin.constructor.name === 'ForkTsCheckerWebpackPlugin') {
        return false
      }
      return true
    })

    return config
  },
})
