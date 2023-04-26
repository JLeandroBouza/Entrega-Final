export class ShoppingCartPage{
    constructor(){
        this.clickShowTotalPriceButton = ("Show total price")
        this.clickGotoCheckOutButton= ("Go to Checkout")
    }

    verifyProductName(product){
        return cy.xpath(`//div//descendant::p[@name='${product}']`)
    };

    verifyProductPrice(product,price){
        return cy.xpath(`//div//descendant::p[@name='${product}']`).siblings("#productPrice")
    };

    verifyTotalPrice(price1,price2){
        cy.contains(this.clickShowTotalPriceButton).click();
        return cy.xpath("//div//descendant::p[@id='price']")
    };

    clickGotoCheckOut(){
        cy.contains(this.clickGotoCheckOutButton).click();
    };
}

