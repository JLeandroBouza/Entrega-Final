export class ShoppingCartPage{
    constructor(){
        this.clickShowTotalPriceButton = ("Show total price")
    };

    verifyProductName(product){
        cy.xpath(`//div//descendant::p[@name='${product}']`).should("have.text",`${product}`);
    };

    verifyProductPrice(product,price){
        cy.xpath(`//div//descendant::p[@name='${product}']`).siblings("#productPrice").should("have.text",`$${price}`)
    };

    verifyTotalPrice(price1,price2){
        const sumTotal= price1 + price2
        cy.xpath("//div//descendant::p[@id='price']").should("have.text", sumTotal)
    };

    clickShowTotalPrice(){
        cy.contains(this.clickShowTotalPriceButton).click();
    };
}

