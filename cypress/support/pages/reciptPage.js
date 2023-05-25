export class ReciptPage{

    constructor(){
        

}
    verifyFirstName(){
        return cy.xpath("//div//descendant::p[@id='name']/text()[1]")
        
    };

    verifyLastName(){
        return cy.xpath("//div//descendant::p[@id='name']/text()[3]")
        
    };

    verifyProductName(product){
        return cy.xpath(`//div//descendant::p[@id='${product}']`)
    };

    verifyCardNumber(){
        return cy.xpath(`//div//descendant::p[@id='creditCard']`)
    };

    verifyTotalPrice(){
        return cy.xpath("//div//descendant::p[@id='totalPrice']/text()[2]")
    };
}
