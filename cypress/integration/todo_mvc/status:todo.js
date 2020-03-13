/// <reference types="cypress" />
import faker from "faker";
import selectors from "./selectors";

describe("checks the mark as done / todo options in the list", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.addToDos(5);
  });

  it("marks a to do as done and then marks it as to do again", () => {
    cy.log("mark a to-do as done")
      .markToDo(0)

      .log("assert that the to-do is marked as done")
      .get(selectors.todos)
      .first()
      .find(selectors.checkbox)
      .should("be.checked")

      .log("unmark the todo")
      .unmarkToDo(0)

      .log("assert the todo is unmarked")
      .get(selectors.todos)
      .first()
      .find(selectors.checkbox)
      .should("not.be.checked");
  });

  it("marks all the todos as done and then marks all of them as to do again", () => {
    cy.log("mark all the todos via the toggle all")
      .get(selectors.form)
      .find(selectors.toggle_all)
      .check()

      .log("assert all are checked")
      .get(selectors.list_todos)
      .children()
      .should('have.class', 'completed')
  });

  it("marks all the todos as done and then unmarks just one of them", () => {
    cy.log("mark all the todos via the toggle all")
      .get(selectors.form)
      .find(selectors.toggle_all)
      .check()

      .log("assert all are checked")
      .get(selectors.list_todos)
      .children()
      .should('have.class', 'completed')

      .log("unmarks the third todo")
      .unmarkToDo(2)

      .log("assert that 3 todo is still to do")
      .get("li")
      .eq(2)
      .should('not.have.class', 'completed');
  });
});
