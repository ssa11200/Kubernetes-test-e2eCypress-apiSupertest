it("open google", () => {
  cy.visit("http://ingress-nginx-controller.ingress-nginx.svc.cluster.local");
  cy.get(".button").click();
  cy.url().should(
    "eq",
    "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local" +
      "/signup"
  );
});
