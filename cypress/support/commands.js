import faker from "faker";
import selectors from "../integration/todo_mvc/selectors";
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("addToDos", number => {
  cy.log(`adds ${number} items to the list`);
  for (let i = 0; i < number; i++) {
    cy.addToDo();
  }
});

Cypress.Commands.add("addToDo", input => {
  input = input || faker.lorem.words();
  cy.get(selectors.add_todo)
    .click()
    .type(input)
    .type("{enter}");
});

Cypress.Commands.add("markToDo", index => {
  index = index || 0;
  cy.get(selectors.todos)
    .eq(index)
    .find(selectors.checkbox)
    .check();
});

Cypress.Commands.add("markToDos", indices => {
  indices.forEach(index => {
    cy.markToDo(index);
  });
});

Cypress.Commands.add("unmarkToDo", index => {
  index = index || 0;
  cy.get(selectors.todos)
    .eq(index)
    .find(selectors.checkbox)
    .uncheck();
});
