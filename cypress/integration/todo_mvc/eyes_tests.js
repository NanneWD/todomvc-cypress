/// <reference types="cypress" />
import faker from "faker";
import selectors from "./selectors";

describe("validation checks on the entry field", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("uses the applitools eyes to check if the entries look right", () => {
    cy.eyesOpen({
      appName: "todo mvc",
      testName: "test for entry validation",
      browser: { width: 800, height: 600 }
    });
    cy.eyesCheckWindow("empty list");
    cy.log("adds various entries")
      .addToDo("ﾟ･✿ヾ╲(｡◕‿◕｡)╱✿･ﾟ")
      .addToDo("👾 🙇 💁 🙅 🙆 🙋 🙎 🙍")
      .addToDo("<script><b>alert</b>(123)</script>")
      .addToDo(
        "مُنَاقَشَةُ سُبُلِ اِسْتِخْدَامِ اللُّغَةِ فِي النُّظُمِ الْقَائِمَةِ وَفِيم يَخُصَّ التَّطْبِيقَاتُ الْحاسُوبِيَّةُ،"
      )
      .addToDo("찦차를 타고 온 펲시맨과 쑛다리 똠방각하")
      .addToDo("⁰⁴⁵₀₁₂")
      .addToDo(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a lacinia massa, id consequat mi. Vestibulum posuere hendrerit felis. Nunc finibus magna nec nulla dictum rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras maximus tristique vulputate. Phasellus dapibus metus ac eros laoreet, eget sagittis urna interdum. Nam aliquet ligula magna."
      )
      .addToDo("Lorem ipsum dolor")
      .addToDo("123456789");

    cy.eyesCheckWindow("list with entries");
    cy.eyesClose();
  });

  it("uses the applitools eyes to check if the entries look right", () => {
    cy.eyesOpen({
      appName: "todo mvc",
      testName: "test for todo status",
      browser: { width: 800, height: 600 }
    });
    cy.addToDos(5)
      .markToDos([1, 3])
      .log("takes a screenshot of the all tab");

    cy.eyesCheckWindow("listview all");

    cy.log("open the tab ACTIVE")
      .get(selectors.filter_options)
      .find(selectors.tab_not_completed)
      .click()
      .eyesCheckWindow("listview COMPLETED");

    cy.log("open the tab COMPLETED")
      .get(selectors.filter_options)
      .find(selectors.tab_completed)
      .click()
      .eyesCheckWindow("listview COMPLETED");

    cy.eyesClose();
  });
});
