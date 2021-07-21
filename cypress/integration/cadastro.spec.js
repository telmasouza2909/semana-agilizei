/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

describe('Tela de Cadastro', () => {

    context('Cadastro de usuários com dados aleatórios', () => {
        it('Cadastro de usuário no site', () => {

            // rotas com mocks.
            cy.server()
            cy.route({
                method: 'POST',
                url: '**/api/1/databases/userdetails/collections/newtable?**',
                status: 200,
                response: {}
            }).as('postNewtable');
            // cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**')
            //     .as('postNewtable');

            cy.route({
                method: 'POST',
                url: '**/api/1/databases/userdetails/collections/usertable?**',
                status: 200,
                response: {}
            }).as('postUsertable');
            // cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**')
            //     .as('postUsertable');

            cy.route({
                method: 'GET',
                url: '**/api/1/databases/userdetails/collections/newtable?**',
                status: 200,
                response: {}
            }).as('getNewtable');
            // cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**')
            //     .as('getNewtable');

            // cy.intercept('POST', '**/api/1/databases/userdetails/collections/newtable?**', {
            //     statusCode: 200,
            //     body: {}
            // }).as('postNewtable');

            // cy.intercept('POST', '**/api/1/databases/userdetails/collections/usertable?**', {
            //     statusCode: 200,
            //     body: {}
            // }).as('postUsertable');

            // cy.intercept('GET', '**/api/1/databases/userdetails/collections/newtable?**', {
            //     statusCode: 200,
            //     body: {}
            // }).as('getNewtable');

            // baseUrl + URL abaixo (Register.html)
            cy.visit('Register.html');

            // type -> "escrever"
            cy.get('input[placeholder="First Name"]').type(chance.first());
            cy.get('input[ng-model="LastName"]').type(chance.last());
            cy.get('input[ng-model^=Email]').type(chance.email());
            cy.get('input[ng-model^=Phone]').type(chance.phone({ formatted: false }));

            // check -> interagir com radio's e checkboxes
            cy.get('input[value=FeMale]').check();
            cy.get('input[type=checkbox]').check('Cricket');
            cy.get('input[type=checkbox]').check('Hockey');

            // select -> select e select 2 (combobox)
            cy.get('select#Skills').select('Javascript');
            cy.get('select#countries').select('Virgin Islands (British)');
            cy.get('select#country').select('United States of America', { force: true });
            cy.get('select#yearbox').select('1975');
            cy.get('select[ng-model^=month]').select('October');
            cy.get('select#daybox').select('10');

            cy.get('input#firstpassword').type('Agilizei@2021');
            cy.get('input#secondpassword').type('Agilizei@2021');

            // attachFile -> input file
            cy.get('input#imagesrc').attachFile('foto.jpg');

            // click no botão
            cy.get('button#submitbtn').click();

            cy.wait('@postNewtable').then((resNewtable) => {
                console.log(resNewtable.status);
                cy.log(resNewtable.status);

                expect(resNewtable.status).to.eq(200);
            });

            cy.wait('@postUsertable').then((resUsertable) => {
                expect(resUsertable.status).to.eq(200);
            });

            cy.wait('@getNewtable').then((resGetNewtable) => {
                expect(resGetNewtable.status).to.eq(200);
            });

            cy.url().should('contain', 'WebTable');
        });
    });
});
// input[placeholder="First Name"]
// input[ng-model="LastName"]
// input[ng-model^=Email]
// input[ng-model^=Phone]
// input[value=FeMale]
// input[type=checkbox]
// select#Skills
// select#countries
// select#country
// select#yearbox
// select[ng-model^=month]
// select#daybox
// input#firstpassword
// input#secondpassword
// button#submitbtn