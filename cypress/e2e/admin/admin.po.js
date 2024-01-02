import es from "./admin.es";
import fixtures from "../../fixtures/admin.fixtures.json";

Cypress.Commands.add("adminLogin", () => {
  cy.get(es.adminu).type(fixtures.uname);
  cy.get(es.adminp).type(fixtures.upass);
  cy.get(es.admins).click();
});

// instructor.js
export class Admin {
  static adminLogin() {
    cy.adminLogin();
  }
}
