import es from "./instructor.es";
import fixtures from "../../fixtures/instructor.fixtures.json";

Cypress.Commands.add("instructorLogin", () => {
  cy.get(es.signin).click();
  cy.get(es.dialogInstructor).click();
  cy.get(es.email).type(fixtures.email);
  cy.get(es.password).type(fixtures.wrongPassword);
  cy.get(es.signinSubmit).click();
  cy.contains(fixtures.mismatch);
  cy.get(es.password).clear().type(fixtures.password);
  cy.get(es.signinSubmit).click();
});

// instructor.js
export class Instructor {
  static instructorLogin() {
    cy.instructorLogin();
  }
}
