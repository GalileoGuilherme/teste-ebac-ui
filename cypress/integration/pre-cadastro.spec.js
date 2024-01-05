///<reference types="cypress" />

function gerarCredenciaisAleatorias() {
    const numeroAleatorio = Math.floor(Math.random() * 1000000);
    const email = `usuario${numeroAleatorio}@example.com`;
    const senha = `senha${numeroAleatorio}`;

    // Gera nomes aleatórios
    const firstName = `First${numeroAleatorio}`;
    const lastName = `Last${numeroAleatorio}`;
    const displayName = `Display${numeroAleatorio}`;

    return { email, senha, firstName, lastName, displayName };
  }

  describe('Funcionalidade Pré Cadastro', () => {

    beforeEach(() => {
      cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/');
    });

    it('Deve completar o pré cadastro com sucesso', () => {
      const { email, senha, firstName, lastName, displayName } = gerarCredenciaisAleatorias();

      cy.get('#reg_email').type(email);
      cy.get('#reg_password').type(senha);
      cy.get(':nth-child(4) > .button').click();

      // Validar a conta
      cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click();

      // Preencher os campos com os valores gerados
      cy.get('#account_first_name').type(firstName);
      cy.get('#account_last_name').type(lastName);
      cy.get('#account_display_name').type(displayName);

      // Limpar campo de e-mail antes de inserir o valor
      cy.get('#account_email').clear().type(email);

      cy.get('.woocommerce-Button').click();

      // Validar a mensagem após a conclusão do cadastro
    //   Olá, usuario596142Display596142 (não é usuario596142Display596142? Sair)
    //   cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', `Olá, ${displayName}(não é ${displayName}? Sair)`);
      cy.get('.woocommerce-MyAccount-content > :nth-child(3)').should('contain', 'A partir do painel de controle de sua conta, você pode ver suas compras recentes');
    });
  });
