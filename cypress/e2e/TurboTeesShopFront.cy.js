describe("Visit Shopfront - initial test block will fail if: Test is run against production DB - check app .env (path: C:Capstone - dev copy/TurboTees/server/.env) file has production address commented out and MOCK address is NOT commented out  -  Ensures test environment is initialised before commencing test", () => {
  //start of shop page testing block

  it("Visits shopfront, checks URL and ensures TEST environment loaded", () => {
    // start of URL test block (runs after beforeEach)
    cy.visit("http://localhost:4200/products");

    cy.url().should("include", "/products");

    cy.get("#productImage").should(
      "have.attr",
      "src",
      "../assets/TEST/images/TESTbeCuriousShirt.png"
    );
  }); // end of URL test block (runs after beforeEach)

  it("Gets 3 items (Banner(visible), cart button(visible), buy button(hidden))", () => {
    // start of item render (3 items) test block (runs after beforeEach)
    cy.visit("http://localhost:4200/products");

    cy.get("#turboTeesBanner").should("be.visible");

    cy.get("#viewCartButton").should("be.visible");

    cy.get("#buyButton").should("be.hidden");
  }); // end of item render (3 items) test block (runs after beforeEach)

  it("buy and remove item functionality test, includes getting information from elements. Test block adds 2x products to cart, accesses the cart view, confirms URL. Test then mocks the cartTotal function and compares the result to the output on the page. This is repeated after removing one of the components, then finally the cart is cleared and the calculation is verified once more.", () => {
    // start of functionality (buy/remove items (x2), values calculations) test block (runs after beforeEach)
    cy.visit("http://localhost:4200/products");

    cy.get("#buyButton").click({ force: true });

    cy.get("#buyButton").click({ force: true });

    cy.get("#viewCartButton").click();

    cy.url().should("include", "/cart");

    cy.get("#itemsTotal").then(($items) => {
      let itemsTotal = parseFloat($items.text());
      cy.get("#taxTotal").then(($tax) => {
        let taxTotal = parseFloat($tax.text());
        expect(taxTotal).to.eq(itemsTotal / 10);
        cy.get("#shippingTotal").then(($shipping) => {
          let shippingTotal = parseFloat($shipping.text());
          expect(shippingTotal).to.eq(20);
          cy.get("#cartTotal").then(($cartValue) => {
            let cartTotal = parseFloat($cartValue.text());
            expect(cartTotal).to.eq(itemsTotal + taxTotal + shippingTotal);
          });
        });
      });
    });

    cy.get("#checkoutButton").click();

    cy.get("#removeButton").click();

    cy.get("#itemsTotal").then(($items) => {
      let itemsTotal = parseFloat($items.text());
      cy.get("#taxTotal").then(($tax) => {
        let taxTotal = parseFloat($tax.text());
        cy.get("#shippingTotal").then(($shipping) => {
          let shippingTotal = parseFloat($shipping.text());
          cy.get("#cartTotal").then(($cartValue) => {
            let cartTotal = parseFloat($cartValue.text());
            expect(cartTotal).to.eq(itemsTotal + taxTotal + shippingTotal);
          });
        });
      });
    });

    cy.get("#clearCartButton").click();

    cy.get("#checkoutButton").click();

    cy.get("#itemsTotal").then(($items) => {
      let itemsTotal = parseFloat($items.text());
      expect(itemsTotal).to.eq(0);
      cy.get("#taxTotal").then(($tax) => {
        let taxTotal = parseFloat($tax.text());
        expect(taxTotal).to.eq(0);
        cy.get("#shippingTotal").then(($shipping) => {
          let shippingTotal = parseFloat($shipping.text());
          expect(shippingTotal).to.eq(0);
          cy.get("#cartTotal").then(($cartValue) => {
            let cartTotal = parseFloat($cartValue.text());
            expect(cartTotal).to.eq(0);
          });
        });
      });
    });

    cy.get("#checkoutButton").click();

    cy.get("#closeButton").click();
  }); // end of functionality (buy/remove items (x2), values calculations) test block (runs after beforeEach)
}); // end of Test block.
