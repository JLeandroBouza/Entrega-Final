export class CheckOutPage{

    constructor(){
        this.firstnameInput = "#FirstName";
        this.lastnameInput = "#lastName"
        this.cardnumberInput ="#cardNumber"
        this.purchaseButton = "Purchase";
        
    }

    inputFirstName(firstname){
        cy.get(this.firstnameInput).type(firstname);
    }

    inputLastName(lastname){
        cy.get(this.lastnameInput).type(lastname);
    }

    inputCardNumber(cardnumber){
        cy.get(this.cardnumberInput).type(cardnumber);
    }

    clickPurchase(){
        cy.contains(this.purchaseButton).click();
    }

    purchaseWaits(){
        cy.esperaCirculodeCarga();
        
    }
    
    inputPurchaseData (firstname,lastname,cardnumber){
        this.inputFirstName(firstname);
        this.inputLastName(lastname);
        this.inputCardNumber(cardnumber);
        this.clickPurchase();
    }

}