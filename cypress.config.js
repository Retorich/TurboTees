const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "efbu1v",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
