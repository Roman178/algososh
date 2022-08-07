/// <reference types="cypress" />

import { CircleBorderValue, circleSelector } from "../../types";

describe("queue algorithm animation works correctly", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });
  it("button disabled when empty input", () => {
    cy.get('a[href="/queue"]').click();
    cy.get("button").contains("Добавить").parent().should("be.disabled");
  });

  it("circles length is 6 and their initial state is default", () => {
    cy.get(circleSelector)
      .should("have.length", 6)
      .and("have.css", "border", CircleBorderValue.DEFAULT);
  });

  it("when add elements to queue and remove them", () => {
    cy.clock();

    cy.get("input").type("1");
    cy.get("button").contains("Добавить").click();

    cy.tick(500);

    cy.get("button").contains("Удалить").parent().should("be.disabled");
    cy.get("button").contains("Очистить").parent().should("be.disabled");
    cy.get(circleSelector).should("have.length", 6);
    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.CHANGING)
      .contains("1")
      .parent()
      .parent()
      .contains("head")
      .parent()
      .contains("tail");

    cy.tick(500);

    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.DEFAULT);
    cy.get("button").contains("Удалить").parent().should("not.be.disabled");
    cy.get("button").contains("Очистить").parent().should("not.be.disabled");

    cy.get("input").type("2");
    cy.get("button").contains("Добавить").click();
    cy.get(circleSelector)
      .eq(1)
      .should("have.css", "border", CircleBorderValue.CHANGING);

    cy.tick(500);

    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.DEFAULT)
      .parent()
      .contains("head");
    cy.get(circleSelector)
      .eq(1)
      .should("have.css", "border", CircleBorderValue.CHANGING)
      .and("contain", "12")
      .parent()
      .contains("tail");

    cy.tick(500);

    cy.get(circleSelector)
      .eq(1)
      .should("have.css", "border", CircleBorderValue.DEFAULT)
      .and("contain", "12")
      .parent()
      .contains("tail");
    cy.get("input").type("3");
    cy.get("button").contains("Добавить").click();

    cy.tick(500);

    cy.get(circleSelector)
      .eq(2)
      .should("have.css", "border", CircleBorderValue.CHANGING)
      .and("contain", "123")
      .parent()
      .contains("tail");

    cy.tick(500);
    cy.get("input").type("4");
    cy.get("button").contains("Добавить").click();

    cy.tick(500);

    cy.tick(500);
    cy.get("input").clear().type("a");
    cy.get("button").contains("Добавить").click();

    cy.tick(500);

    cy.tick(500);
    cy.get("input").clear().type("b");
    cy.get("button").contains("Добавить").click();

    cy.tick(500);

    cy.tick(500);
    cy.get("button").contains("Добавить").click().should("not.be.disabled");
    cy.get(circleSelector).each((el, i) => {
      if (i === 0) cy.wrap(el).contains("1").parent().parent().contains("head");
      if (i === 1) cy.wrap(el).contains("12");
      if (i === 2) cy.wrap(el).contains("123");
      if (i === 3) cy.wrap(el).contains("1234");
      if (i === 4) cy.wrap(el).contains("a");
      if (i === 5) cy.wrap(el).contains("b").parent().parent().contains("tail");
    });
    cy.get("button").contains("Удалить").click();
    cy.get("button").contains("Удалить").should("not.exist");
    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.CHANGING)
      .and("contain", "1")
      .parent()
      .contains("head");
    cy.get(circleSelector).last().parent().contains("tail");

    cy.tick(500);

    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.DEFAULT)
      .and("not.contain", "1");
    cy.get(circleSelector).last().parent().contains("tail");
    cy.get("button").contains("Удалить").click();

    cy.tick(500);

    cy.get("button").contains("Удалить").click();

    cy.tick(500);

    cy.get("button").contains("Удалить").click();

    cy.tick(500);
    cy.get(circleSelector).each((el, i) => {
      if (i === 0) cy.wrap(el).should("not.contain", "1");
      if (i === 1) cy.wrap(el).should("not.contain", "12");
      if (i === 2) cy.wrap(el).should("not.contain", "123");
      if (i === 3) cy.wrap(el).should("not.contain", "1234");
      if (i === 4) cy.wrap(el).contains("a").parent().parent().contains("head");
      if (i === 5) cy.wrap(el).contains("b").parent().parent().contains("tail");
    });
    cy.get("button").contains("Удалить").click();

    cy.tick(500);
    cy.get("button").contains("Удалить").click();

    cy.tick(500);
    cy.get("button").contains("Добавить").click().should("not.be.disabled");
    cy.get("button").contains("Удалить").click().should("not.be.disabled");
    cy.get(circleSelector).each((el, i) => {
      cy.wrap(el).get(".text_type_circle").should("be.empty");
    });
    cy.get("button").contains("Очистить").click();
    cy.get(circleSelector).each((el, i) => {
      cy.wrap(el)
        .parent()
        .parent()
        .should("not.contain", "tail")
        .and("not.contain", "head");
    });
    cy.get("button").contains("Добавить").click();
    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.CHANGING);
    cy.get("button").contains("Добавить").should("not.exist");

    cy.tick(500);
    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.CHANGING)
      .and("contain", "b")
      .parent()
      .parent()
      .contains("head")
      .parent()
      .contains("tail");

    cy.tick(500);
    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.DEFAULT);
  });
});
