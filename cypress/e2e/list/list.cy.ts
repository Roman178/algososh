/// <reference types="cypress" />

import { CircleBorderValue, circleSelector } from "../../types";

const isSmallCircle = (el: HTMLDivElement): boolean => {
  const classListStr = [...el.classList].join(" ");
  if (classListStr.includes("circle_small")) {
    return true;
  } else {
    return false;
  }
};

describe("linked list algorithm animation works correctly", () => {
  before(() => {
    cy.viewport(1440, 960);
    cy.visit("http://localhost:3000");
  });
  it("buttons initial state is correct", () => {
    cy.get('a[href="/list"]').click();
    cy.get("button").contains("Добавить в head").parent().should("be.disabled");
    cy.get("button").contains("Добавить в tail").parent().should("be.disabled");
    cy.get("button")
      .contains("Добавить по индексу")
      .parent()
      .should("be.disabled");
    cy.get("button")
      .contains("Удалить по индексу")
      .parent()
      .should("be.disabled");
    cy.get("button")
      .contains("Удалить из head")
      .parent()
      .should("not.be.disabled");
    cy.get("button")
      .contains("Удалить из tail")
      .parent()
      .should("not.be.disabled");
  });

  it("when elements are added or removed in different ways", () => {
    cy.clock();

    cy.get(circleSelector).should("have.length", 6);
    cy.get("input").first().type("fu");
    cy.get("button").contains("Добавить в tail").should("not.be.disabled");
    cy.get("button")
      .contains("Добавить в head")
      .should("not.be.disabled")
      .click();
    cy.get("button").each((el, index) => {
      if (index !== 0) {
        cy.wrap(el).should("be.disabled");
      }
    });

    cy.get(circleSelector).each((el, i) => {
      if (isSmallCircle(el[0] as HTMLDivElement)) {
        cy.wrap(el)
          .should("have.css", "border", CircleBorderValue.CHANGING)
          .contains("fu");
      }
    });

    cy.tick(500);

    cy.get(circleSelector)
      .should("have.length", 7)
      .first()
      .should("have.css", "border", CircleBorderValue.MODIFIED)
      .contains("fu");

    cy.tick(500);
    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.DEFAULT)
      .contains("fu");

    cy.get("input").first().type("bz");
    cy.get("button")
      .contains("Добавить в tail")
      .should("not.be.disabled")
      .click();

    cy.get(circleSelector).each((el) => {
      if (isSmallCircle(el[0] as HTMLDivElement)) {
        cy.wrap(el)
          .should("have.css", "border", CircleBorderValue.CHANGING)
          .contains("fubz");
      }
    });

    cy.tick(500);

    cy.get(circleSelector)
      .should("have.length", 8)
      .last()
      .should("have.css", "border", CircleBorderValue.MODIFIED)
      .contains("fubz")
      .parent()
      .parent()
      .contains("tail");

    cy.tick(500);

    cy.get(circleSelector)
      .should("have.length", 8)
      .last()
      .should("have.css", "border", CircleBorderValue.DEFAULT)
      .contains("fubz")
      .parent()
      .parent()
      .contains("tail");
    cy.get(circleSelector)
      .should("have.length", 8)
      .first()
      .should("have.css", "border", CircleBorderValue.DEFAULT)
      .contains("fu")
      .parent()
      .parent()
      .contains("head");
    cy.get("button").contains("Удалить из head").click();
    cy.get(circleSelector)
      .should("have.length", 9)
      .each((el) => {
        if (isSmallCircle(el[0] as HTMLDivElement)) {
          cy.wrap(el)
            .should("have.css", "border", CircleBorderValue.CHANGING)
            .contains("fu");
        }
      });

    cy.tick(500);
    cy.get(circleSelector)
      .should("have.length", 7)
      .first()
      .should("have.css", "border", CircleBorderValue.DEFAULT)
      .and("not.contain", "fu");
    cy.get("button").contains("Удалить из tail").click();
    cy.get(circleSelector)
      .should("have.length", 8)
      .each((el) => {
        if (isSmallCircle(el[0] as HTMLDivElement)) {
          cy.wrap(el)
            .should("have.css", "border", CircleBorderValue.CHANGING)
            .contains("fubz");
        }
      });

    cy.tick(500);
    cy.get(circleSelector)
      .should("have.length", 6)
      .last()
      .should("not.contain", "fubz")
      .parent()
      .parent()
      .contains("tail");
    cy.get("button")
      .contains("Добавить по индексу")
      .parent()
      .should("be.disabled");
    cy.get("button")
      .contains("Удалить по индексу")
      .parent()
      .should("be.disabled");
    cy.get("input").last().type("2");
    cy.get("button")
      .contains("Добавить по индексу")
      .parent()
      .should("not.be.disabled");
    cy.get("button")
      .contains("Удалить по индексу")
      .parent()
      .should("not.be.disabled");
    cy.get("button").contains("Добавить по индексу").click();
    cy.get(circleSelector)
      .should("have.length", 7)
      .each((el) => {
        if (isSmallCircle(el[0] as HTMLDivElement)) {
          cy.wrap(el)
            .should("have.css", "border", CircleBorderValue.CHANGING)
            .contains("fubz");
        }
      });

    cy.tick(500);
    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.CHANGING)
      .and("not.contain", "fubz");

    cy.tick(500);
    cy.get(circleSelector)
      .eq(1)
      .should("have.css", "border", CircleBorderValue.CHANGING)
      .and("not.contain", "fubz");

    cy.tick(500);
    cy.get(circleSelector)
      .each((el) => {
        if (isSmallCircle(el[0] as HTMLDivElement)) {
          cy.wrap(el).should("exist");
        }
      })
      .eq(2)
      .should("have.css", "border", CircleBorderValue.MODIFIED)
      .contains("fubz");

    cy.tick(500);
    cy.get(circleSelector)
      .should("have.css", "border", CircleBorderValue.DEFAULT)
      .contains("fubz");
    cy.get("button").should("not.be.disabled");
    cy.get("input").last().clear().type("3");
    let circleContentOnThirdIndex;
    cy.get(circleSelector).each((el, i) => {
      if (i === 3) {
        circleContentOnThirdIndex = el[0].textContent;
      }
    });

    cy.get("button").contains("Удалить по индексу").click();
    cy.get(circleSelector)
      .first()
      .should("have.css", "border", CircleBorderValue.CHANGING);

    cy.tick(500);

    cy.get(circleSelector)
      .eq(1)
      .should("have.css", "border", CircleBorderValue.CHANGING);

    cy.tick(500);

    cy.get(circleSelector)
      .eq(2)
      .should("have.css", "border", CircleBorderValue.CHANGING);

    cy.tick(500);

    cy.get(circleSelector)
      .eq(3)
      .should("have.css", "border", CircleBorderValue.CHANGING);

    cy.tick(500);

    cy.get(circleSelector).each((el, i) => {
      if (isSmallCircle(el[0] as HTMLDivElement)) {
        cy.wrap(el)
          .should("have.css", "border", CircleBorderValue.CHANGING)
          .contains(circleContentOnThirdIndex);
      }
    });
    cy.tick(500);

    cy.get(circleSelector)
      .should("have.length", 6)
      .and("have.css", "border", CircleBorderValue.DEFAULT);
  });
});
