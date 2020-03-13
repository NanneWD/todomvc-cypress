/// <reference types="cypress" />
import faker from "faker";
import selectors from "./selectors";

describe("edits items in the list", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.addToDos(5);
  });

  it("changes the text of a todo in the list", () => {
    let originalText;
    cy.log("record name of the first todo")
      .get(selectors.todos)
      .first()
      .find("label")
      .as("labelFirstTodo")
      .then($label => {
        originalText = $label.text();
      })

      .log("deletes the input there")
      .get(selectors.todos)
      .first()
      .dblclick()
      .get(selectors.edit)
      .clear()

      .log("change the name of the todo")
      .get(selectors.edit)
      .type(faker.lorem.words())

      .log("assert that the name is not changed")
      .get("@labelFirstTodo")
      .then($label => {
        expect($label.text()).to.equal(originalText);
      })
      
      .log("save the new name")
      .get(selectors.edit)
      .type("{enter}")

      .log("assert that the name is changed")
      .get("@labelFirstTodo")
      .then($label => {
        expect($label.text()).not.to.equal(originalText);
      });
  });
});
