import fixtures from "../../fixtures/students.fixtures.json";
import es from "./students.es";
import { Student } from "./students.po";

describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
    Student.studentLogin();
  });

  describe("Explore Courses", () => {
    it("explores courses", () => {
      cy.contains(fixtures.exploreCoursesText);
      cy.get(es.search).click();
      cy.get(es.checkFirstCourse).first().click();
    });
  });

  describe("Learn Course", () => {
    beforeEach(() => {
      cy.visit(
        `http://localhost:8080/student/learn?courseId=658e561ff35ff898320b595b&payment=success`,
      );
    });

    it("learns course and performs actions", () => {
      cy.contains(fixtures.paymentSuccessfulText);
      cy.get(es.success).click();
      cy.contains(fixtures.sampleCourseHeaderText);
      cy.get(es.qa).click();
      cy.get(es.question).type(fixtures.sampleQuestion);
      cy.get(es.answer).type(fixtures.sampleAnswer);
      cy.get(es.submitqa).click();
      cy.contains(fixtures.sampleQuestion);
      cy.get(es.reviews).click();
      cy.get(es.revArea).type(fixtures.testReview);
      cy.get(es.notes).click();
      cy.get(es.noteT).type(fixtures.sampleNoteTitle);
      cy.get(es.noteD).type(fixtures.sampleNoteDescription);
      cy.get(es.noteS).click();
      cy.reload();
      cy.get(es.notes).click();
      cy.contains(fixtures.sampleNoteTitle);
    });
  });

  describe("Theme and Language", () => {
    it("checks theme and language", () => {
      cy.visit("http://localhost:8080");
      cy.get(es.theme).click();
      cy.get("body").should("have.class", fixtures.darkThemeClass);
      cy.get(es.theme).click();
      cy.get(es.lang).select(fixtures.language);
      cy.contains(fixtures.bengaliText);
      cy.get(es.lang).select(fixtures.englishText);
    });
  });
});
