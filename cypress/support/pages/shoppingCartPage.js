export class ShoppingCartPage{
    constructor(){
        this.clickShowTotalPriceButton = ("Show total price")
        this.clickGotoCheckOutButton= ("Go to Checkout")
    }

    verifyProductName(product){
        return cy.xpath(`//div//descendant::p[@name='${product}']`)
    };

    verifyProductPrice(product){
        return cy.xpath(`//div//descendant::p[@name='${product}']`).siblings("#productPrice")
    };

    verifyTotalPrice(){
        cy.contains(this.clickShowTotalPriceButton).click();
        return cy.xpath("//div//descendant::p[@id='price']")
    };

    clickGotoCheckOut(){
        cy.contains(this.clickGotoCheckOutButton).click();
    };
}

