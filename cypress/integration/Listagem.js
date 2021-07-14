/// <reference types="cypress"  />

context('Listagem', () => {
it('Listagem sem registros', () => { //Ele vai recuperar a lista para mim sem nenhum registro
    cy.server()
    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: 'fx:webtable-get-vazio'
        }).as('getNewtable');

        cy.visit('WebTable.html');

        cy.get('div[role=row]').should('have.length', 1);
    });

    it('Listagem com apenas um registro', () => { //Ele vai recuperar a lista para mim apenas com  um registro, por isso informams o dados do registro abaixo
        cy.server()
        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status:200,
            response: 'fx:webtable-get-unico'
        })
       
        cy.visit('WebTable.html');

        
        cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone')
        cy.get('@gridCellPhone').should('contain.text', '3129876543')
    });
});







