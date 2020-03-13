/// <reference types="cypress" />
import faker from "faker";
import selectors from "./selectors";

describe("adds and removes todos to the list", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("adds 1 new todo", () => {
    cy.addToDos(1)
      .log("assert that 1 item has been added")
      .get(selectors.list_todos)
      .children()
      .should("have.length", 1);
  });
  it("adds several new todos with various lenghts", () => {
    cy.addToDo(faker.lorem.words())
      .addToDo(faker.lorem.sentence())
      .addToDo(faker.lorem.word())
      .addToDo(faker.lorem.sentences())
      .addToDo(faker.random.number())

      .log("asserst that 5 items have been added")
      .get(selectors.list_todos)
      .children()
      .should("have.length", 5);
  });
  it("tests load for large list", () => {
    cy.addToDos(50);
    cy.log("asserts 50 items are in the list")
      .get(selectors.list_todos)
      .children()
      .should("have.length", 50);
  });

  //maybe a test to see if the new item is added at the end of the list and not the beginning?
});
