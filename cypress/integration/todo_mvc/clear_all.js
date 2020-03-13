/// <reference types="cypress" />
import faker from "faker";
import selectors from "./selectors";

describe("clear all the todos from the list", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.addToDos(5);
  });

  it("checks there is no clear all option when no todos are marked as completed", () => {
    cy.log("open the tab COMPLETED")
      .get(selectors.filter_options)
      .find(selectors.tab_completed)
	  .click()
	  
      .log("assert no items are marked as completed")
      .get(selectors.list_todos)
	  .should("be.empty")
	  
      .log("assert there is no clear all button")
      .get(selectors.clear_all_completed)
      .should("not.be.visible");
  });

  it("uses the clear all option to clear all the todos when some todos are marked as done", () => {
    cy.log("mark 2 todos as completed")
      .get("li")
      .eq(1)
      .find(selectors.checkbox)
      .check()
      .get("li")
      .eq(3)
      .find(selectors.checkbox)
	  .check()
	  
      .log("open the tabe COMPLETED")
      .get(selectors.filter_options)
      .find(selectors.tab_completed)
	  .click()
	  
      .log("assert url has changed to the completed page")
      .url()
	  .should("include", "completed")
	  
      .log("asserts there are todos in the tab completed")
      .get(selectors.list_todos)
      .children()
	  .should("have.length", 2)
	  
      .log("asserts that clear all option is visible")
      .get(selectors.clear_all_completed)
	  .should("be.visible")
	  
      .log("uses the clear all option")
      .get(selectors.clear_all_completed)
	  .click()
	  
      .log("asserts there are no more todos under the tab completed")
      .get(selectors.list_todos)
      .should("be.empty");
  });

  it("uses the clear all option to clear all the todos when all todos are marked as done", () => {
    cy.log("mark all todos as completed")
      .get(".main")
      .find("#toggle-all")
	  .click()
	  
      .log("assert that under completed tab list contains 5 items")
      .get(selectors.filter_options)
      .find(selectors.tab_completed)
      .click()
      .get(selectors.list_todos)
      .children()
	  .should("have.length", 5)
	  
      .log("click the clear all button from the all tab")
      .get(selectors.filter_options)
      .find(selectors.tab_all)
      .click()
      .get(selectors.clear_all_completed)
      .should("be.visible")
	  .click()
	  
      .log("assert that there are no more todos in the list")
      .get(selectors.list_todos)
      .should("be.empty");
  });
});
