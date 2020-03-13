/// <reference types="cypress" />
import faker from "faker";
import selectors from "./selectors";

describe("validation checks on the entry field", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("checks if a entry with no input can be made", () => {
    cy.log("makes an entry with no input at all")
      .get(selectors.add_todo)
      .click()
      .type("{enter}")

      .log("assert no entry is added")
      .get(selectors.todos)
      .should("have.length", 0);
  });

  it("checks if a entry with 1 word can be made", () => {
    cy.log("makes an entry with 1 word")
      .addToDo(faker.lorem.word())

      .log("assert an entry is added")
      .get(selectors.todos)
      .should("have.length", 1);
  });

  it("checks if a entry with multiple words can be made", () => {
    cy.log("makes an entry with multiple words")
      .addToDo(faker.lorem.words())

      .log("assert an entry is added")
      .get(selectors.todos)
      .should("have.length", 1);
  });

  it("checks if a entry with 1 sentence can be made", () => {
    cy.log("makes an entry with 1 sentence")
      .addToDo(faker.lorem.sentence())

      .log("assert an entry is added")
      .get(selectors.todos)
      .should("have.length", 1);
  });

  it("checks if a entry with multiple sentences can be made", () => {
    cy.log("makes an entry with multiple sentences")
      .addToDo(faker.lorem.sentences())

      .log("assert an entry is added")
      .get(selectors.todos)
      .should("have.length", 1);
  });

  it("checks if a entry with just a space can not be made", () => {
    cy.log("makes an entry with a space")
      .addToDo(" ")

      .log("assert no entry is added")
      .get(selectors.todos)
      .should("have.length", 0);
  });

  it("checks if a entry with numbers can be made", () => {
    cy.log("makes an entry numbers")
      .addToDo(faker.random.number())

      .log("assert an entry is added")
      .get(selectors.todos)
      .should("have.length", 1);
  });

  it("checks if a entry with umlauts can be made", () => {
    cy.log("makes an entry with an umlaut")
      .addToDo("ÄäÜüÖö")

      .log("assert an entry is added")
      .get(selectors.todos)
      .should("have.length", 1);
  });

  it("checks if a entry with non ASCII alphabet can be made", () => {
    cy.log("makes an entry with non ASCII letters")
      .addToDo("!@#$%^&*()`~")

      .log("assert an entry is added")
      .get(selectors.todos)
      .should("have.length", 1);
  });

  it("checks if a entry with Unicode Symbols can be made", () => {
    cy.log("makes an entry with Unicode Symbols")
      .addToDo("ÅÍÎÏ˝ÓÔÒÚÆ☃")

      .log("assert an entry is added")
      .get(selectors.todos)
      .should("have.length", 1);
  });

  it("checks if a entry with Subscript/Superscript can be made", () => {
    cy.log("makes an entry with Subscript/Superscript")
      .addToDo("⁰⁴⁵₀₁₂")

      .log("assert an entry is added")
      .get(selectors.todos)
      .should("have.length", 1);
  });

  it("checks if a entry with Two-Byte Characters can be made", () => {
    cy.log("makes an entry with Two-Byte Characters letters")
      .addToDo("찦차를 타고 온 펲시맨과 쑛다리 똠방각하")

      .log("assert an entry is added")
      .get(selectors.todos)
      .should("have.length", 1);
  });

  it("checks if a entry with Right-To-Left Strings can be made", () => {
    cy.log("makes an entry with Right-To-Left String")
      .addToDo(
        "مُنَاقَشَةُ سُبُلِ اِسْتِخْدَامِ اللُّغَةِ فِي النُّظُمِ الْقَائِمَةِ وَفِيم يَخُصَّ التَّطْبِيقَاتُ الْحاسُوبِيَّةُ،"
      )

      .log("assert an entry is added")
      .get(selectors.todos)
      .should("have.length", 1);
  });

  it("checks if a entry with a benign script injection can be made", () => {
    cy.log("makes an entry with a benign script injection")
      .addToDo("<script>alert(123)</script>")

      .log("assert an entry is added")
      .get(selectors.todos)
      .should("have.length", 1);
  });

  it("checks if a entry with an emoticons/emoji can be made", () => {
    cy.log("makes an entry with an emoticons typed")
      .addToDo("ﾟ･✿ヾ╲(｡◕‿◕｡)╱✿･ﾟ")

      .log("assert an entry is added")
      .get(selectors.todos)
      .should("have.length", 1)

      .log("makes an entry with an emoji typed")
      .addToDo("😁")

      .log("assert an entry is added")
      .get(selectors.todos)
      .should("have.length", 2);
  });

  it("checks if a entry with an html tag can be made", () => {
    cy.log("makes an entry with an html tag")
      .addToDo("<b>bold</b> and normal")

      .log("assert an entry is added")
      .get(selectors.todos)
      .should("have.length", 1)

      .log("assert that entry is not in bold")
      .get(selectors.todos)
      .last()
      .find("b")
      .should("not.exist");
  });

  it("checks if a entry with musical characters can be made", () => {
    cy.log("makes an entry with music notes")
      .addToDo("♩ ♪ ♫ ♬ ♭ ♮ ♯")

      .log("assert an entry is added")
      .get(selectors.todos)
      .should("have.length", 1);
  });

  it("checks if a entry with a url can be made", () => {
    cy.log("makes an entry with an url")
      .addToDo("https://www.google.com")

      .log("assert an entry is added")
      .get(selectors.todos)
      .should("have.length", 1)

      .log("assert that there is no link")
      .get(selectors.todos)
      .first()
      .find("a")
      .should("not.exist");
  });
});
