/// <reference types="cypress" />

import { RegisterPage } from "../support/pages/registerPage";
import { LoginPage } from "../support/pages/loginPage";
import { HomePage } from "../support/pages/homePage";
import { ProductsPage } from "../support/pages/productsPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";

describe("Entrega Final: Pre Entrega", () =>{
    let InputData;
    const registerPage= new RegisterPage(); 
    const loginPage= new LoginPage();
    const homePage = new HomePage();
    const productsPage= new ProductsPage();
    const shoppingCartPage = new ShoppingCartPage();
    

    before("Carga de Datos del Fixture data",() =>{
        cy.fixture("data").then(data =>{
            InputData = data
        });

    })

    it("Prueba del Modulo Online Shop", () =>{

        const sumTotal= `${InputData.product.price1 + InputData.product.price2}`

        cy.visit(" ");

        registerPage.clickLogIn();
        loginPage.login(InputData.login.username, InputData.login.password);
        homePage.clickOnlineShop();
        productsPage.addproducts(InputData.product.productName1);
        productsPage.addproducts(InputData.product.productName2);
        productsPage.clickGoShoppingCart();
        shoppingCartPage.verifyProductName(InputData.product.productName1).should("have.text",`${InputData.product.productName1}`);
        shoppingCartPage.verifyProductName(InputData.product.productName2).should("have.text",`${InputData.product.productName2}`);
        shoppingCartPage.verifyProductPrice(InputData.product.productName1,InputData.product.price1).should("have.text",`$${InputData.product.price1}`);
        shoppingCartPage.verifyProductPrice(InputData.product.productName2,InputData.product.price2).should("have.text",`$${InputData.product.price2}`);
        shoppingCartPage.verifyTotalPrice(InputData.product.price1,InputData.product.price2).should("have.text", sumTotal);
    });

})