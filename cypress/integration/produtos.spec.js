/// <reference types="cypress" />

describe('Funcionalidade Página de produtos', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/produtos/');
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('[class="product-block grid"]')//selecionando pela class
        // .first()
        // .last()
        .eq(3)//selecionando pelo índice da lista
        .click()
    });

    it('Deve adicionar um produto ao carrinho', () => {
        cy.get('[class="product-block grid"]')
        .contains('Ariel Roll Sleeve Sweatshirt')//selecioando produto pelo nome
        .click()

        cy.get('.button-variable-item-M').click();
        cy.get('.button-variable-item-Purple').click();
        cy.get('.plus').click(2);
        cy.get('.single_add_to_cart_button').click();

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', 2);
    });
});