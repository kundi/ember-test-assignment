"use strict";

module.exports = function(environment) {
  let ENV = {
    modulePrefix: "ember-test-assignment",
    environment,
    rootURL: "/",
    locationType: "auto",
    apiNamespace: "api/v1",
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.serverURL = "https://ember-test-assignment.com";

  if (environment === "development") {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV['ember-cli-mirage'] = {
      enabled: true,
      trackRequests: true
    };

    ENV.webURL = "http://localhost:4200";
    ENV.webSocketURL = "ws://localhost:3000/cable";
  }

  if (environment === "test") {
    // Testem prefers this...
    ENV.locationType = "none";

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;
  }

  ENV.apiBaseURL = ENV.serverURL + "/" + ENV.apiNamespace;

  return ENV;
};
