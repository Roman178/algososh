/// <reference types="cypress" />

describe("app works", () => {
  it("on port 3000", () => {
    cy.viewport(1440, 960);
    cy.visit("http://localhost:3000");
  });
});
