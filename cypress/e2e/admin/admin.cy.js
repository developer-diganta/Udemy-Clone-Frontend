import fixtures from "../../fixtures/admin.fixtures.json";
import es from "./admin.es";
import { Admin } from "./admin.po";

describe("Admin Dashboard Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/admin/signin");
    Admin.adminLogin();
  });

  describe("Dashboard Elements", () => {
    it("checks dashboard elements", () => {
      cy.contains(fixtures.adminDashboard);
      cy.contains(fixtures.latestTransactions);
    });
  });

  describe("Sections", () => {
    it("checks Courses section", () => {
      cy.get(es.courses).click();
      cy.get(es.canvas).its("length").should("be.eq", 3);
    });

    it("checks Instructors section", () => {
      cy.get(es.instructors).click();
      cy.get(es.canvas).its("length").should("be.eq", 3);
    });

    it("checks Students section", () => {
      cy.get(es.students).click();
      cy.get(es.canvas).its("length").should("be.eq", 2);
    });

    it("checks Revenue section", () => {
      cy.get(es.revenue).click();
      cy.get(es.canvas).its("length").should("be.eq", 1);
    });

    it("checks Course Status section", () => {
      cy.get(es.coursestatus).click();
      cy.contains(fixtures.pendingForReview);
    });
  });

  describe("Actions", () => {
    it("performs actions on course", () => {
      cy.get(es.coursestatus).click();
      cy.get(es.course).first().find(es.act).click();
      cy.get(es.logout).click();
    });
  });
});
