import fixtures from "../../fixtures/home.fixtures.json";

describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:8080");
    cy.contains(fixtures.homeHeader);
  });
});
