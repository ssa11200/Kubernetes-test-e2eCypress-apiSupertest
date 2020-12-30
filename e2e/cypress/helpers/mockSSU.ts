import faker from "faker";
import { getIframeBody } from "./getIframeBody";

interface IOverrides {
  email?: string;
  businessName?: string;
}

export const mockSSU = (overrides?: IOverrides) => {
  const emailOverride = overrides?.email;
  const businessNameOverride = overrides?.businessName;

  const baseUrl = "https://localhost";
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = emailOverride || `${firstName}.${lastName}@example.com`;
  const businessName = businessNameOverride || faker.company.companyName();

  cy.url().should("eq", baseUrl + "/new-producer");

  // sign up as mplus.producer4
  getIframeBody().find("input").its("length").should("eq", 4);

  getIframeBody().find("input").its("0").type(firstName);
  getIframeBody().find("input").its("1").type(lastName);
  getIframeBody().find("input").its("2").type(email);
  getIframeBody().find("input").its("3").type(businessName);

  getIframeBody().find(".submit-button-wrapper").find("button").click();

  cy.customGet("#proceed-to-onboarding").should("exist").click();

  return { email, businessName, firstName, lastName };
};
