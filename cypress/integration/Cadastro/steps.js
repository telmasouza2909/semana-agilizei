/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

When(/^informar meus dados$/, () => {
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

});

When(/^salvar os dados$/, () => {
    cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
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
