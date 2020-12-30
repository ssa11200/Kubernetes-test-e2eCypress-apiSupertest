import { AccountingOption } from "../../types/onboarding";
import { getInputByName } from "./getInputByName";

//
export const clickNextButton = () => {
  return cy.customGet("#next-button").click();
};

export const clickBackButton = () =>
  cy.get("#back-button").should("exist").click();

export const fillPersonalDataForm = ({
  fullName,
  position,
  businessName,
  ssn,
  taxIdNumber,
}: {
  fullName: string;
  position: string;
  businessName: string;
  ssn?: string;
  taxIdNumber?: string;
}) => {
  getInputByName("fullName").should("exist").type(fullName);
  getInputByName("position").type(position);
  getInputByName("businessName").type(businessName);
  getInputByName("ssn").type(ssn || "078-05-1120");
  getInputByName("taxIdNumber").type(taxIdNumber || "42-1412421");
  cy.get("#entityType").find(".checkbox").its("0").click();
};

export const fillContactDetailsForm = () => {
  getInputByName("address1").type("116A");
  getInputByName("address2").type("High Street");
  getInputByName("city").type("London");
  getInputByName("state").type("London");
  getInputByName("zipCode").type("afaw3fw3");
  cy.get(".dropdown").find("input").type("United Kingdom").blur();
  getInputByName("businessTel").type("0123472383");
  getInputByName("website").type("www.mysite.com");
  getInputByName("yearsInBusiness").type("1");

  // click alternate business email checkbox
  cy.get(".checkbox").find("label").its("1").click();
  getInputByName("alternateEmail").type("alternate@example.com");
};

export const registerCornCommodity = (volume: number) => {
  getInputByName("bushels").type(volume.toString());
  clickNextButton();
};

export const addCornProductionHistory = () => {
  getInputByName("Corn.FiveYearAPH").type("1000");
  getInputByName("Corn.mostRecentPlantedAcreage").type("1000");
  getInputByName("Corn.anticipatedAcreage").type("1000");
};

export const addFinancials = (accountingOption: AccountingOption) => {
  getInputByName("totalOnFarmStorage").type("2000");
  getInputByName("rentedFarmland").type("1000");
  getInputByName("ownedFarmland").type("1000");

  cy.get(".checkbox").contains(accountingOption).click();
};

export const addBankDetails = () => {
  getInputByName("bankName").type("My Bank");
  getInputByName("bankAddress").type("Addresss");
  getInputByName("bankAccountNumber").type("1242141242");
  getInputByName("bankRoutingNumber").type("14124211");
};

export const certifyDataAccuracy = () => {
  cy.customGet(".checkbox").find("label").click();
};
