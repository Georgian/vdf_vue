// nuxt.config.js
module.exports = {
  mode: 'universal',
  plugins: [
    '~/plugins/main.js',
    '~/plugins/fb-sdk.js',
    '~/plugins/vuetify.js',
    '~/plugins/search.js',
    '~/plugins/axios.js'
  ],
  head: {
    htmlAttrs: {
      lang: 'ro',
      prefix: 'og: http://ogp.me/ns#'
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
    html: {
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: false,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeAttributeQuotes: false,
        removeComments: false,
        removeEmptyAttributes: true,
        removeOptionalTags: false,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributes: false,
        removeTagWhitespace: false,
        sortClassName: false,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    },
    publicPath: `/${require('./secrets.json').NODE_ENV}/_nuxt/`, // <= add the path to the cached files
  },
  modules: [
    ['@nuxtjs/axios', {
      baseURL: 'http://localhost:5000',
      // baseURL: 'https://api.varfdeforma.ro',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }],
    ['@nuxtjs/google-analytics', {
      id: 'UA-126133683-1',
      /*debug: {
        sendHitTask: false // TODO Don't forget to change this
      }*/
    }],
    ['nuxt-fontawesome', {
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['faBicycle', 'faCalendarAlt', 'faLocationArrow', 'faHeart', 'faGlobe', 'faTh', 'faSignInAlt']
        }
      ]
    }],
    ['@nuxtjs/sitemap', {
      // TODO refactor this
      routes: [
        '/',
        '/termeni',
        '/event/1',
        '/event/2',
        '/event/3',
        '/event/4',
        '/event/5',
        '/event/6',
        '/event/7',
        '/event/8',
        '/event/9',
        '/event/10',
        '/event/11',
        '/event/12',
        '/event/13',
        '/event/14',
        '/event/15',
        '/event/16',
        '/event/17',
        '/event/18',
        '/event/19',
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
