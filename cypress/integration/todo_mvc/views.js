/// <reference types="cypress" />
import faker from "faker";
import selectors from "./selectors";

describe("checks the various views for the todo list", () => {
  beforeEach(() => {
    
	cy.visit("/");
    cy.addToDos(5);
    cy.log("mark 2 todos as done")
      .get("li")
      .eq(1)
      .find(selectors.checkbox)
      .check()
      .get("li")
      .eq(3)
      .find(selectors.checkbox)
      .check();
  });
  it("checks view all contains 5 items", () => {
    cy.log("assert I am on the tab marked ALL")
	  .get(selectors.tab_all)
	  .should('have.class', 'selected')
    
      .log("assert the list contains 5 items")
      .get(selectors.list_todos)
      .children()
      .should('have.length', 5)
  });

  it("checks view active contains 3 items", () => {
    cy.log("open the tabe ACTIVE")
      .get(selectors.filter_options)
      .find(selectors.tab_not_completed)
	  .click()
	  
      .log("assert I am on the tab marked ACTIVE")
	  .url()
	  .should('include', 'active')

      .log("assert the list contains 3 items")
      .get(selectors.list_todos)
      .children()
      .should('have.length', 3)
  });

  it("checks view completed contains 2 items", () => {
    cy.log("open the tabe COMPLETED")
      .get(selectors.filter_options)
      .find(selectors.tab_completed)
	  .click()
	  
      .log("assert I am on the tab marked COMPLETED")
      .url()
	  .should('include', 'completed')
      
      .log("assert the list contains 2 items")
      .get(selectors.list_todos)
      .children()
	  .should('have.length', 2)
  });
});
