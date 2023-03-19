export class LoginPage{
    constructor(){
        this.usernameInput = "#user";
        this.passwordInput ="#pass";
        this.loginButton = "Log in";
    }
    
    inputUsername(username){
        cy.get(this.usernameInput).type(username);
    }
    
    inputPassword(password){
        cy.get(this.passwordInput).type(password);
    }

    clickLogIn(){
        cy.contains(this.loginButton).click ();
    }

    login(username,password){
        this.inputUsername(username);
        this.inputPassword(password);
        this.clickLogIn();
    }
}