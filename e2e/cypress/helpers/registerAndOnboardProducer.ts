import { mockSSU } from "./mockSSU";
import {
  fillPersonalDataForm,
  clickNextButton,
  fillContactDetailsForm,
  registerCornCommodity,
  addCornProductionHistory,
  addFinancials,
  addBankDetails,
  certifyDataAccuracy,
} from "./onboarding.helpers";
import { assertUrl } from "./assertUrl";
import { AccountingOption } from "../../types/onboarding";

// registers a tier 2 producer

interface IRegisterAndOnboardProducerArgs {
  proceedToEnrollment?: boolean;
}
export const registerAndOnboardProducer = (
  args: IRegisterAndOnboardProducerArgs | null
) => {
  const proceedToEnrollment = args?.proceedToEnrollment;

  const baseUrl = Cypress.env("BASE_URL");
  // create new producer
  cy.request("POST", "/api/users/mock-auth", {
    email: "mplus.producer1@gmail.com",
  });
  cy.visit(baseUrl);
  cy.url().should("eq", baseUrl + "/dashboard");

  cy.get("#add-new-customer").click();
  const { businessName, email, firstName, lastName } = mockSSU();

  fillPersonalDataForm({
    fullName: `${firstName} ${lastName}`,
    businessName,
    position: "Director",
    ssn: "078-05-1120",
    taxIdNumber: "42-1412421",
  });

  clickNextButton();

  // CONTACT DETAILS
  fillContactDetailsForm();
  clickNextButton();

  // COMMODITY REGISTRATION
  registerCornCommodity(250000);
  clickNextButton();

  // PRODUCTION HISTOY
  addCornProductionHistory();
  clickNextButton();

  // FINANCIALS
  // test obligatory fields validation
  addFinancials(AccountingOption.ACCOUNTANT_PREP_BAL_SHEET);
  clickNextButton();

  // BANK DETAILS
  addBankDetails();
  clickNextButton();

  // CERTIFY DATA ACCURACY
  certifyDataAccuracy();
  clickNextButton();

  cy.customGet("#home-button").should("exist");

  if (proceedToEnrollment) {
    cy.customGet("#proceed-to-enrollment").click();
    assertUrl(baseUrl + "/enrol");
    // email should be prepopulated
    cy.contains(businessName).should("exist");
  } else {
    cy.get("#home-button").should("exist").click();
  }

  return { businessName, email, firstName, lastName };
};
