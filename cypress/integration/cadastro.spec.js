/// <reference types="cypress"  />

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {

        //rotas
        //http://demo.automationtesting.in/__/#:~:text=POST%20(aborted)%20/api/1/databases/userdetails/collections/newtable%3FapiKey%3DYEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        //http://demo.automationtesting.in/__/#:~:text=(xhr)-,POST%20(aborted,-)%20/api/1/databases/userdetails/collections/usertable
        //http://demo.automationtesting.in/__/#:~:text=(xhr)-,GET%20(aborted)%20/api/1/databases/userdetails/collections/newtable%3FapiKey%3DYEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X,-(xhr)
        //cy.router('POST', '**/api/1/databases/userdetails/collections/usertable?**').as('postNewtable'); //Apelidos
        //cy.router('POST', '**/api/1/databases/userdetails/collections/newtable?**').as('postusertable');
        //cy.router('GET', '**/api/1/databases/userdetails/collections/newtable?**').as('getNewtable');

      cy.server()
      cy.route({
        method: 'POST',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: {}
      }).as('postNewtable');

      cy.route({
          method: 'POST', 
          url: '**/api/1/databases/userdetails/collections/usertable?**', 
          status: 200, 
          response: {}
        }).as('postUsertable');

      cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: {}
        }).as('getNewtable');

        // baseUrl + Register.html
      cy.visit('Register.html');

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
      
      //click
      cy.get('button#submitbtn').click (); //Clicar no botão submeter

      // Rotas

      cy.wait('@postNewtable').then((resNewtable) => {
        // chai
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
});

//Resumo e que informamos cy.get que referecia Cypress, longo temos varios tipos de elementos que são "type, check, select, attchFile e click", conforme mapeamoms no inspecionar do navegador da site e longo depois, então informamos o mapeamo acompanhando do elemento com os dados que desejamos inserir ou selecionar. 
//comando get tem como objetivo buscar elemento na tela

//elementos

//input[placeholder="First Name"]
//input[ng-model="LastName"] ou input[ng-model^=Last]
//input[ng-model=EmailAdress]
//input[ng-model=Phone]

//input[value=FeMale]
//input[type=checkbox]

//select#Skills
//select#countries
//select#country
//select#yearbox
//select[placeholder=Month]
//select#daybox

//input#firstpassword
//input#secondpassword
