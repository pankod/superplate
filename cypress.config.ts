import { defineConfig } from "cypress";
const { cloudPlugin } = require("cypress-cloud/plugin");

export default defineConfig({
    projectId: "refine",
    e2e: {
        setupNodeEvents(on, config) {
            return cloudPlugin(on, config);
        },
    },
    chromeWebSecurity: false,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 1,
});
