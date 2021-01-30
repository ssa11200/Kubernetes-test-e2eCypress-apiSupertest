/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  //console.log(config); // see what all is in here!

  // modify config values
  //if cypress is run in a pod, ingress intrnal url is used
  config.baseUrl = process.env.INGRESS_URL || "http://localhost";

  // modify env var value
  config.env.BASE_URL = process.env.INGRESS_URL || "http://localhost";

  // return config
  return config;
};
