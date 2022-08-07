/// <reference types="cypress" />

import { CircleBorderValue, circleSelector } from "../../types";

describe("stack algorithm animation works correctly", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });
  it("button disabled when empty input", () => {
    cy.get('a[href="/stack"]').click();
    cy.get("button").contains("Добавить").parent().should("be.disabled");
  });

  it("when add elements to stack and remove them", () => {
    cy.clock();

    cy.get("input").type("1");
    cy.get("button").contains("Добавить").click();
    cy.get(circleSelector).should("have.length", 1);
    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.CHANGING)
      .contains("1");

    cy.tick(500);

    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.DEFAULT)
      .contains("1");
    cy.get("input").type("2");
    cy.get("button").contains("Добавить").click();
    cy.get(circleSelector).should("have.length", 2);
    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.DEFAULT)
      .contains("1");
    cy.get(circleSelector)
      .eq(1)
      .should("have.css", "border", CircleBorderValue.CHANGING)
      .contains("12");

    cy.tick(500);

    cy.get(circleSelector)
      .eq(1)
      .should("have.css", "border", CircleBorderValue.DEFAULT)
      .contains("12");
    cy.get("input").type("3");
    cy.get("button").contains("Добавить").click();
    cy.get(circleSelector).should("have.length", 3);
    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.DEFAULT)
      .contains("1");
    cy.get(circleSelector)
      .eq(1)
      .should("have.css", "border", CircleBorderValue.DEFAULT)
      .contains("12");
    cy.get(circleSelector)
      .eq(2)
      .should("have.css", "border", CircleBorderValue.CHANGING)
      .contains("123");

    cy.tick(500);

    cy.get(circleSelector)
      .eq(2)
      .should("have.css", "border", CircleBorderValue.DEFAULT)
      .contains("123");
    cy.get("button").contains("Удалить").click();
    cy.get(circleSelector)
      .eq(2)
      .should("have.css", "border", CircleBorderValue.CHANGING)
      .contains("123");

    cy.tick(500);

    cy.get(circleSelector).should("have.length", 2);
    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.DEFAULT)
      .contains("1");
    cy.get(circleSelector)
      .eq(1)
      .should("have.css", "border", CircleBorderValue.DEFAULT)
      .contains("12");

    cy.get("button").contains("Очистить").click();
    cy.get(circleSelector).should("not.exist");
    cy.get(circleSelector).should("have.length", 0);
  });
});
