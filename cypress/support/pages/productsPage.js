export class ProductsPage{
    
    constructor(){
        this.closeModal = "#closeModal";
        this.goShoppingCartButton ="#goShoppingCart";

    };

    addproducts(product){
        cy.get(`[value="${product}"]`).click();
        cy.get(this.closeModal).click();

    };

    clickGoShoppingCart() {
        cy.get(this.goShoppingCartButton).click();
    };
    
}