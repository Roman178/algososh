/// <reference types="cypress" />

describe("app works correctly with routes", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it("should open home page by default", () => {
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  });

  const testingCb = (linkSelector: string, pageTitle: string) => {
    return () => {
      cy.viewport(1440, 960);
      cy.get(linkSelector).click();
      cy.contains(pageTitle);
      cy.get("button").contains("К оглавлению").click();
      cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
    };
  };

  it(
    "should open reverse string page after 'Строка' link click",
    testingCb('a[href="/recursion"]', "Строка")
  );

  it(
    "should open febonachi numbers page after 'Последовательность Фебоначчи' link click",
    testingCb('a[href="/fibonacci"]', "Последовательность Фибоначчи")
  );

  it(
    "should open sorting page after 'Сортировка массива' link click",
    testingCb('a[href="/sorting"]', "Сортировка массива")
  );

  it(
    "should open stack page after 'Стек' link click",
    testingCb('a[href="/stack"]', "Стек")
  );
  it(
    "should open queue page after 'Очередь' link click",
    testingCb('a[href="/queue"]', "Очередь")
  );

  it(
    "should open linked list page after 'Связный список' link click",
    testingCb('a[href="/list"]', "Связный список")
  );
});
