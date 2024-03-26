
    describe('Pokédex', () => {
        beforeEach(() => {
            cy.visit('http://127.0.0.1:5500/index.html');
        });
    
        it('muestra la lista de Pokémon al cargar', () => {
            cy.get('#pokemones').should('be.visible');
        });
    
        it('permite avanzar y retroceder en la lista de Pokémon', () => {
            cy.get('#btnNext').click();
            cy.get('#pagina-actual').should('have.text', 'Página 2');
    
            cy.get('#btnPrev').click();
            cy.get('#pagina-actual').should('have.text', 'Página 1');
        });
    
        it('muestra los detalles de un Pokémon al hacer clic en él', () => {
            cy.get('.pokemon-list div').first().click(); 
            cy.get('.pokemon-details').should('be.visible');
        });
    
        it('muestra los detalles de un Pokémon al realizar una búsqueda', () => {
            cy.get('#barra-busqueda').type('bulbasaur');
            cy.get('#boton-busqueda').click();
            cy.get('.pokemon-details').should('be.visible');
        });
    });