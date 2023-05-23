const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    BOT_TOKEN: '${BOT_TOKEN}',
    CHAT_ID: '${CHAT_ID}',
    supportFile: false,
  },
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'https://lbv-termine.de',
    supportFile: false,
  },
  chromeWebSecurity: false,
  video: false,
  execTimeout: 60000,
  chromeWebSecurity: false,
  headless: true
})
