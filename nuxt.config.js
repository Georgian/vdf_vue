// nuxt.config.js
module.exports = {
  mode: 'universal',
  plugins: [
    '~/plugins/main.js',
    '~/plugins/vuetify.js',
    '~/plugins/search.js'
  ],

  head: {
    htmlAttrs: {
      lang: 'ro',
    },
    title: 'Vârf de Formă | Toate concursurile importante la un loc',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Concursuri ciclism mountain-bike sosea velodrom ciclocross' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  build: {
    vendor: [
      'axios'
    ],
    publicPath: `/${require('./secrets.json').NODE_ENV}/_nuxt/`, // <= add the path to the cached files
  },
  modules: [
     ['nuxt-fontawesome', {
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['faBicycle', 'faCalendarAlt', 'faLocationArrow', 'faHeart']
        }
      ]
    }]
  ],
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
