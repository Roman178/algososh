/// <reference types="cypress" />

import { circleSelector } from "../../types";

describe("fibonacci algorithm animation works correctly", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });
  it("button disabled when empty input", () => {
    cy.get('a[href="/fibonacci"]').click();
    cy.get("button").contains("Рассчитать").parent().should("be.disabled");
  });

  it("when click calculate fibinacci numbers", () => {
    cy.get("input").type("9");
    cy.get("button").contains("Рассчитать").click();

    cy.wait(6000);

    const fibonacciArr = [0, 1];
    cy.get(circleSelector).each((el, index) => {
      if (index !== 0 && index !== 1) {
        fibonacciArr.push(fibonacciArr[index - 1] + fibonacciArr[index - 2]);
      }
      cy.wrap(el).contains(fibonacciArr[index]);
    });
  });
});
