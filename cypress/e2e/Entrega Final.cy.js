/// <reference types="cypress" />

import { HomePage } from "../support/pages/homePage";
import { ProductsPage } from "../support/pages/productsPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { CheckOutPage } from "../support/pages/checkOutPage";
import { ReciptPage } from "../support/pages/reciptPage";

describe("Entrega Final: Pre Entrega", () =>{
    let InputData;
    const homePage = new HomePage();
    const productsPage= new ProductsPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkOutPage = new CheckOutPage();
    const reciptPage = new ReciptPage();
    

    before("Carga de Datos del Fixture data y Solicitud a la API de Registro de Usuario",() =>{
        const username = "leandro2";
        const password = "123456!";
        const gender = "Male";
        const day = "14";
        const month = "february";
        const year = "1986";

        cy.fixture("data").then(data =>{
            InputData = data
        });
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
            cy.request({
                url: 'https://pushing-it.onrender.com/api/login',
                method: 'POST',
                body: {
                    username: username,
                    password: password
                },
            });
            localStorage.setItem("token", response.token);
            localStorage.setItem("username",response.user.username);
            localStorage.setItem("password",response.user.password);

        });
    });



    it("Entrega Final: CheckOut del ShoppingCart", () =>{

        const sumTotal= `${InputData.product.price1 + InputData.product.price2}`

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
        


    });

    after ("Borrado del Usuario", ()=>{
        cy.request({
            url: `https://pushing-it.onrender.com/api/deleteuser/${username}`,
            method: 'DELETE',
        });
        cy.clearAllLocalStorage();
    });

});
