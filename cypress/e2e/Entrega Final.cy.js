/// <reference types="cypress" />

import { HomePage } from "../support/pages/homePage";
import { ProductsPage } from "../support/pages/productsPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { CheckOutPage } from "../support/pages/checkOutPage";
import { ReciptPage } from "../support/pages/reciptPage";
const constantes = require("../support/constantes");

describe("Entrega Final: Pre Entrega", () =>{
    let InputData;
    const homePage = new HomePage();
    const productsPage= new ProductsPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkOutPage = new CheckOutPage();
    const reciptPage = new ReciptPage();
    const username = "leandro2";
    const password = "123456!";
    const gender = "Male";
    const day = "14";
    const month = "february";
    const year = "1986";
    

    before("Carga de Datos del Fixture data",() =>{

       cy.fixture("data").then(data =>{
            InputData = data
        });
       
    });

    it("Entrega Final: CheckOut del ShoppingCart", () =>{
        
        const sumTotal= `${InputData.product.price1 + InputData.product.price2}`

        cy.request({
            url: 'https://pushing-it.onrender.com/api/register',
            method: 'POST',
            body: {
                username: username,
                password: password,
                gender: gender,
                day: day,
                month: month,
                year: year
            },
        }).then(response => {
            expect(response.status).equal(200);
            cy.request({
                url: 'https://pushing-it.onrender.com/api/login',
                method: 'POST',
                body: {
                    username: username,
                    password: password
                },
            }).then(response => {
                localStorage.setItem("token", response.body.token);
                localStorage.setItem("username",response.body.user.username);
                localStorage.setItem("password",response.body.user.password);
            });
            

        });

        cy.visit(" ");
        homePage.clickOnlineShop();
        productsPage.addproducts(InputData.product.productName1);
        productsPage.addproducts(InputData.product.productName2);
        productsPage.clickGoShoppingCart();
        shoppingCartPage.verifyProductName(InputData.product.productName1).should("have.text",`${InputData.product.productName1}`);
        shoppingCartPage.verifyProductName(InputData.product.productName2).should("have.text",`${InputData.product.productName2}`);
        shoppingCartPage.verifyProductPrice(InputData.product.productName1,InputData.product.price1).should("have.text",`$${InputData.product.price1}`);
        shoppingCartPage.verifyProductPrice(InputData.product.productName2,InputData.product.price2).should("have.text",`$${InputData.product.price2}`);
        shoppingCartPage.verifyTotalPrice(InputData.product.price1,InputData.product.price2).should("have.text", sumTotal);
        shoppingCartPage.clickGotoCheckOut();
        checkOutPage.inputPurchaseData(InputData.checkout.firstname, InputData.checkout.lastname, InputData.checkout.cardnumber);
        checkOutPage.purchaseWaits();
        reciptPage.verifyFirstName(InputData.checkout.firstname).should("have.text",`${InputData.checkout.firstname}`);
        reciptPage.verifyLastName(InputData.checkout.lastname).should("have.text",`${InputData.checkout.lastname}`);
        reciptPage.verifyProductName(InputData.product.productName1).should("have.text",`${InputData.product.productName1}`);
        reciptPage.verifyProductName(InputData.product.productName2).should("have.text",`${InputData.product.productName2}`);
        reciptPage.verifyCardNumber(InputData.checkout.cardnumber).should("have.text",`${InputData.checkout.cardnumber}`);
        reciptPage.verifyTotalPrice(InputData.product.price1, InputData.product.price2).should("have.text", sumTotal);


    });

    after ("Borrado del Usuario", ()=>{
        cy.request({
            url: `https://pushing-it.onrender.com/api/deleteuser/${username}`,
            method: 'DELETE',
        });
        cy.clearAllLocalStorage();
    });

});
