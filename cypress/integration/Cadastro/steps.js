/// <reference types="cypress"  />

let Chance = require('chance');
let chance = new Chance();


When(/^informar meus dados$/, () => {
        //type (Basicamente digitar um texto no campo), onde mapeio com cy.get e depois iterage com elemento com type
        cy.get('input[placeholder="First Name"]').type(chance.first())
        cy.get('input[ng-model="LastName"]').type(chance.last())
        cy.get('input[ng-model=EmailAdress]').type(chance.email())
        cy.get('input[ng-model=Phone]').type(chance.phone({ formatted: false}));

        //check (para iteragi com campos radios e ckechboxes)
        cy.get('input[value=FeMale]').check();
        cy.get('input[type=checkbox]').check('Cricket');
        cy.get('input[type=checkbox]').check('Hockey');

        //Select -> select & select2 (para seleções de opções nos combos)

        cy.get('select#Skills').select('Javascript');
        cy.get('select#countries').select('Brazil');
        cy.get('select#country').select('India', {force: true}); // Quando o atributo informado do elemento esta oculto na codigo da aplicação, iremos utilizar o comando {force: true}, para que o script força a aplicação a encontrar o campo e executa-lo
        cy.get('select#yearbox').select('2015');
        cy.get('select[ng-model^=month]').select('September');
        cy.get('select#daybox').select('29'); //Selecionar a opção, por isso utilizamos select

        cy.get('input#firstpassword').type('Agilizei@2021') //Informar a senha que e alfanumerico
        cy.get('input#secondpassword').type('Agilizei@2021')

        // attchFile -> input file
        cy.get('input#imagesrc').attachFile('modelo_imagem.jpg') //vai no botão upload e depois insere a nossa imagem que esta na pasta fixtures


});


When(/^Salvar$/, () => {
      //click
      cy.get('button#submitbtn').click (); //Clicar no botão submeter

});


Then(/^devo ser cadastrado com sucesso$/, () => {
    cy.wait('@postNewtable').then((resNewtable) => {
        expect(resNewtable.status).to.eq(200)
      })

      cy.wait('@postUsertable').then((resUsertable) => {
        expect(resUsertable.status).to.eq(200)
      })

      cy.wait('@getNewtable').then((resNewtable) => {
        expect(resNewtable.status).to.eq(200)
      })

      cy.url().should('contain', 'WebTable');
});
