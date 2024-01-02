import es from "./instructor.es";
import fixtures from "../../fixtures/instructor.fixtures.json";
import { Instructor } from "./instructor.po";

describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
    Instructor.instructorLogin();
  });
  describe("Course Management", () => {
    it("adds a course, lessons, and reviews", () => {
      // Add a course
      cy.contains(fixtures.sampleHeader);
      cy.get(es.addCourse).click();
      cy.get(es.title).type(fixtures.sampleTestCourse);
      cy.get(es.desc).type(fixtures.sampleTestDescription);
      cy.get(es.cat).type(fixtures.sampleTestCategory);
      cy.get(es.addCat).click();
      cy.get(es.price).type(fixtures.price);
      cy.get(es.discount).type(fixtures.discount);
      cy.get(es.sub).click();
      cy.contains(fixtures.sampleCourseHeader);

      // Add lessons
      cy.get(es.addLessons).click();
      cy.get(es.add).click();
      cy.get(es.title).type(fixtures.sampleTestTitle);
      cy.get(es.submit).click();
      cy.get(es.add).click();
      cy.get(es.lecture).click();
      cy.get(es.title).type(fixtures.sampleTestLecture);
      cy.get(es.inputFile).selectFile(fixtures.sampleFile);
      cy.get(es.section)
        .click()
        .trigger("mousedown", { which: 1, force: true });
      cy.get(es.vListItem).first().click();
      cy.get(es.submit).click();
      cy.get(es.add).click();
      cy.get(es.exercise).click();
      cy.get(es.title).type(fixtures.sampleTestExercise);
      cy.get(es.desc).type(fixtures.sampleTestExercise);
      cy.get(es.section)
        .click()
        .trigger("mousedown", { which: 1, force: true });
      cy.get(es.vListItem).first().click();
      cy.get(es.qInput).type(fixtures.qData);
      cy.get(es.qOutput).type(fixtures.qData);
      cy.get(es.submit).click();

      // Review courses
      cy.get(es.review).click();
      cy.contains(fixtures.sampleTestUnderReview);
      cy.get(es.allCourses).click();
      cy.contains(fixtures.unpublishedCourses);
      cy.contains(fixtures.pendingForReview);
      cy.contains(fixtures.activeCourses);
    });
  });

  it("fails to add lessons with incomplete information", () => {
    cy.get(es.addLessons).click();
    cy.get(es.add).click();
    cy.get(es.submit).click();
  });

  describe("Editing profile", () => {
    it("passes", () => {
      cy.get(es.profile)
        .click()
        .trigger("mousedown", { which: 1, force: true });
      cy.get(es.vListItem).first().click();
      cy.contains(fixtures.yourProfile);
      cy.get(es.edit).click();
      cy.get(es.smtitle).type(fixtures.twitter);
      cy.get(es.smlink).type(fixtures.sampleTestTwitterLink);
      cy.get(es.profsub).click();
      cy.get(es.submit).click();
      cy.get(es.profile)
        .click()
        .trigger("mousedown", { which: 1, force: true });
      cy.get(es.vListItem).last().click();
    });
  });
});
