const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || "https://demoqa.com",
    setupNodeEvents(on, config) {    },
  },
});
