import { defineConfig } from "cypress";

export default defineConfig({
  includeShadowDom: true,

  component: {
    setupNodeEvents(on, config) {},
    specPattern: "src/**/*.spec.{js,ts,jsx,tsx}",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
