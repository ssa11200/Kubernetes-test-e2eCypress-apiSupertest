declare namespace Cypress {
  interface Chainable {
    //implements waitUntil to prevent React detached problem when getting elements
    customGet(selector: string, injectCyTarget?: boolean): Chainable;
    getDataCy(selector: string): Chainable;
  }
}
