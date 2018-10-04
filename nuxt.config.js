// nuxt.config.js
module.exports = {
  mode: 'universal',
  plugins: [
    '~/plugins/main.js',
    '~/plugins/vuetify.js',
    '~/plugins/search.js'
  ],

  /*
   * Global CSS
   * TODO this is problematic
   */
  // css: [
  //   '~/assets/styles/app.styl'
  // ],

  head: {
    title: 'Varf de Forma',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  build: {
    vendor: [
      'axios',
      '~/plugins/vuetify.js'
    ],
    publicPath: `/${require('./secrets.json').NODE_ENV}/_nuxt/` // <= add the path to the cached files
  },
  srcDir: 'client/',
  performance: {
    gzip: false
  },
  router: {
    base: `/`
  },
  extractCSS: true,
  dev: false
}
