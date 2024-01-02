import es from "./students.es";
import fixtures from "../../fixtures/students.fixtures.json";

Cypress.Commands.add("studentLogin", () => {
  cy.get(es.signin).click();
  cy.get(es.dialogStudent).click();
  cy.get(es.emailPlaceholder).type(fixtures.email);
  cy.get(es.passwordPlaceholder).type(fixtures.wrongPassword);
  cy.get(es.signinSubmit).click();
  cy.contains(fixtures.mismatch);
  cy.get(es.passwordPlaceholder).clear().type(fixtures.password);
  cy.get(es.signinSubmit).click();
});

// instructor.js
export class Student {
  static studentLogin() {
    cy.studentLogin();
  }
}
