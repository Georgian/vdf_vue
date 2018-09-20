'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'
process.env.API_BASE_URL = 'https://api.varfdeforma.ro'

const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

const axios = require('axios')
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...\n')
spinner.start()

axios.get(process.env.API_BASE_URL + '/event')
  .then(function (response) {

    console.log(chalk.red('  Fetching events.\n'))

    const events = response.data
    const prenderedRoutes = events.map(e => `/event/${e.id}`)
    prenderedRoutes.unshift('/')

    webpackConfig.plugins.push(
      new PrerenderSPAPlugin({
        staticDir: path.resolve(__dirname, '..', 'dist'),
        routes: prenderedRoutes,
        renderer: new Renderer({
          injectProperty: '__PRERENDER_INJECTED',
          inject: {
            prerendered: true
          },
          renderAfterDocumentEvent: 'app.rendered'
        })
      }));

    rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
      if (err) throw err
      webpack(webpackConfig, (err, stats) => {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
          chunks: false,
          chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
          console.log(chalk.red('  Build failed with errors.\n'))
          process.exit(1)
        }

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
          '  Tip: built files are meant to be served over an HTTP server.\n' +
          '  Opening index.html over file:// won\'t work.\n'
        ))
      })
    })
  })
  .catch(err => {

    console.log(chalk.red('  Build failed with errors.\n' + err))

    spinner.stop()
  })


