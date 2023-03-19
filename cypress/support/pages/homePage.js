export class HomePage{

    constructor(){
        this.onlineShopButton = "Online Shop";
    }

    clickOnlineShop(){
        cy.contains(this.onlineShopButton).click ();
    }


}