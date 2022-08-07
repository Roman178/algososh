/// <reference types="cypress" />

import { circleSelector, CircleBorderValue } from "../../types";

describe("string algorithm animation works correctly", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });
  it("button disabled when empty input", () => {
    cy.get('a[href="/recursion"]').click();
    cy.get("button").contains("Развернуть").parent().should("be.disabled");
  });

  it("when reverse string", () => {
    cy.clock();

    cy.get("input").type("123456");
    cy.get("button").contains("Развернуть").click();

    cy.get(circleSelector).should("have.length", 6);
    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.CHANGING)
      .contains("1");
    cy.get(circleSelector)
      .last()
      .should("have.css", "border", CircleBorderValue.CHANGING)
      .contains("6");
    for (let i = 2; i < 6; i++) {
      cy.get(circleSelector)
        .eq(i - 1)
        .should("have.css", "border", CircleBorderValue.DEFAULT)
        .contains(i);
    }

    cy.tick(1000);

    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.MODIFIED)
      .contains("6");
    cy.get(circleSelector)
      .eq(1)
      .should("have.css", "border", CircleBorderValue.CHANGING)
      .contains("2");
    cy.get(circleSelector)
      .eq(2)
      .should("have.css", "border", CircleBorderValue.DEFAULT)
      .contains("3");
    cy.get(circleSelector)
      .eq(3)
      .should("have.css", "border", CircleBorderValue.DEFAULT)
      .contains("4");
    cy.get(circleSelector)
      .eq(4)
      .should("have.css", "border", CircleBorderValue.CHANGING)
      .contains("5");
    cy.get(circleSelector)
      .last()
      .should("have.css", "border", CircleBorderValue.MODIFIED)
      .contains("1");

    cy.tick(1000);

    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.MODIFIED)
      .contains("6");
    cy.get(circleSelector)
      .eq(1)
      .should("have.css", "border", CircleBorderValue.MODIFIED)
      .contains("5");
    cy.get(circleSelector)
      .eq(2)
      .should("have.css", "border", CircleBorderValue.CHANGING)
      .contains("3");
    cy.get(circleSelector)
      .eq(3)
      .should("have.css", "border", CircleBorderValue.CHANGING)
      .contains("4");
    cy.get(circleSelector)
      .eq(4)
      .should("have.css", "border", CircleBorderValue.MODIFIED)
      .contains("2");
    cy.get(circleSelector)
      .last()
      .should("have.css", "border", CircleBorderValue.MODIFIED)
      .contains("1");

    cy.tick(1000);

    for (let i = 0; i < 6; i++) {
      cy.get(circleSelector)
        .eq(i)
        .should("have.css", "border", CircleBorderValue.MODIFIED)
        .contains(6 - i);
    }
    cy.get("button").contains("Развернуть");
  });
});
