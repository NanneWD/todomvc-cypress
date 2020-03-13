/// <reference types="cypress" />
import faker from "faker";
import selectors from "./selectors";

const amountToDos = 5;

describe("deletes items in the list", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.addToDos(amountToDos);
  });

  it("deletes a todo from the list", () => {
    cy.log("note the ID of the first to do")
      //no idea yet on how to do that
      .log("delete the first to do")
      .get(selectors.todos)
      .first()
      .find("button")
      .click({ force: true })

      .log("assert the todo is no longer there in the list")
      //I would need the ID of the todo I deleted for this first

      .log(`assert the list contains ${amountToDos - 1} items`)
      .get(selectors.list_todos)
      .children()
      .should("have.length", amountToDos - 1)
      
      .log(`assert that total not completed todos to do is ${amountToDos - 1}`)
      .get(selectors.todo_counter)
      .should(($counter) => {
        expect($counter).to.contain(amountToDos - 1)
      });
  });
});
