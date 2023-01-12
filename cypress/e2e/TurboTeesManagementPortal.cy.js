describe("Visit Product Management Portal - initial test block will fail if: Test is run against production DB - check app .env (path: TurboTees/server/.env) file has production address commented out and MOCK address is NOT commented out  -  Ensures test environment is initialised before commencing test", () => {
  //start of Management pages testing block

  it("Visits Management Portal, checks URL and ensures TEST environment loaded", () => {
    // start of URL test block
    cy.visit("http://localhost:4200/productsList");
    cy.get("#productImage").should(
      "have.attr",
      "src",
      "../assets/TEST/images/TESTbeCuriousShirt.png"
    );
  }); // end of URL test block

  it("Visits Management Portal, uses New product button, checks '/new' page loads. Checks Add button is disabled. Clicks Cancel button, confirms return to '/productsList'.", () => {
    // start of URL test block
    cy.visit("http://localhost:4200/productsList");

    cy.wait(1000);

    cy.get("#newButton").click();

    cy.url().should("include", "/new");

    cy.get("#addNewButton").should("be.disabled");

    cy.get("#cancelButton").click();

    cy.url().should("include", "/productsList");
  }); // end of URL test block

  it("Visits Management Portal, uses New product button, then generate new product using form. Clicks Add button, then confirms return to '/productsList'.", () => {
    // start of URL test block
    cy.visit("http://localhost:4200/productsList");

    cy.wait(1000);

    cy.get("#newButton").click();

    cy.get("#name").type("TEST TSHIRT TEST");

    cy.get("#productType").type("TEST TSHIRT TEST");

    cy.get("#image").type("../assets/TEST/images/TESTproShirt.png");

    cy.get("#price").type(1000);

    cy.get("#addNewButton").click();

    cy.wait(1000);

    cy.url().should("include", "/productsList");
  }); // end of URL test block

  it("Visits Management Portal, finds newly added product, clicks edit button for new product, confirms that new product selected. clears the input field for name, then adds EDIT TEST as the new name. Clicks Add button to action the change", () => {
    // start of URL test block

    cy.visit("http://localhost:4200/productsList");

    cy.get("li")
      .last()
      .within(() => {
        cy.get("#editButton").click();
      });

    cy.url().should("include", "/edit");

    cy.get("#name")
      .should("have.value", "TEST TSHIRT TEST")
      .clear()
      .type("EDIT TEST");

    cy.get("#addNewButton").click();
  }); // end of URL test block

  it("Visits Management Portal, gets newly added product, clicks remove button. clicks Product Preview button, checks url change. Finally clicks the Return to Products List button, and checks url change", () => {
    // start of URL test block
    cy.visit("http://localhost:4200/productsList");

    cy.get("li")
      .last()
      .within(() => {
        cy.get("#removeButton").click();
      });

    cy.get("#previewButton").click();

    cy.url().should("include", "/productsPreview");

    cy.get("#returnButton").click();

    cy.url().should("include", "/productsList");
  }); // end of URL test block
}); // end of Test block
