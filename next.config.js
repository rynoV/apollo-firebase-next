const withGraphql = require('next-plugin-graphql')
const withImages  = require('next-images')

module.exports = withImages(
  withGraphql({
    webpack: config => {
      // Fixes npm packages that depend on `fs` module
      config.node    = {
        fs: 'empty',
      }
      config.plugins = config.plugins.filter(
        plugin => plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin',
      )

      return config
    },
  }),
)
