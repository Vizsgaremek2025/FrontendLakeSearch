describe('Lake Search oldal tesztelése', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Betöltődik az oldal és tartalmazza az alap elemeket', () => {
    cy.get('header img.kep').should('have.attr', 'src', '/lake_search_logo.png');
    cy.get('section.intro h2').should('contain', 'Üdvözöl a Lake Search!');
    cy.get('section.intro p').should('contain', 'Fedezd fel a legjobb horgászhelyeket');
  });

  it('A funkciók megfelelően megjelennek', () => {

    cy.get('.features .feature').should('have.length', 3);
    cy.get('.feature h3').eq(0).should('contain', 'Interaktív Tókereső');
    cy.get('.feature h3').eq(1).should('contain', 'Fogási Napló');
    cy.get('.feature h3').eq(2).should('contain', 'Személyre szabott profil');
  });

  it('A fotógaléria képei megjelennek', () => {
    cy.get('.gallery .images img').should('have.length', 6);
    cy.get('.gallery .images img').each(($img) => {
      cy.wrap($img).should('have.attr', 'src').and('match', /^https?/);
    });
  });



  it('A horgászhelyek kérdései és válaszai helyesen működnek', () => {

    cy.get('.faq-container .faq-item').each(($item) => {
      cy.wrap($item).within(() => {
        cy.get('.faq-question h3').should('not.be.empty');
        cy.get('.faq-answer p').should('not.be.empty');
      });
    });
  });

});


describe('Regisztrációs űrlap teszt', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('Megjelenik a regisztrációs űrlap', () => {
    cy.get('.login-card').should('be.visible');
    cy.contains('Regisztráció').should('be.visible');
  });



  it('Eltérő jelszavaknál hibaüzenetet ad', () => {
    cy.get('#username').type('Felhasznalo');
    cy.get('#email').type('valid@example.com');
    cy.get('#password').type('Jelszo123');
    cy.get('#confirmPassword').type('MasikJelszo456');

    cy.get('.login-button').click();

    cy.get('.message-alert.error').should('contain', 'A jelszavak nem egyeznek');
  });

  it('Jelszó láthatóságának váltása működik', () => {
    cy.get('#password').type('Jelszo123');
    cy.get('.password-toggle').first().click();
    cy.get('#password').should('have.attr', 'type', 'text');

    cy.get('.password-toggle').first().click();
    cy.get('#password').should('have.attr', 'type', 'password');
  });
});




describe('Bejelentkezési űrlap tesztek', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Megjelenik a bejelentkezési űrlap', () => {
    cy.get('.login-card', { timeout: 10000 }).should('exist');
    cy.get('h2').contains('Bejelentkezés');
  });

  it('Sikertelen bejelentkezés üres mezőkkel', () => {
    cy.get('.login-button').click();
    cy.get('.is-invalid').should('have.length', 2);
  });

  it('Helytelen adatokkal nem enged be', () => {
    cy.get('#email').type('rossz@pelda.com');
    cy.get('#password').type('hibasjelszo');
    cy.get('.login-button').click();

    cy.get('.message-alert.error', { timeout: 10000 }).should('exist');
  });
});


describe('Bejelentkezett állapot és tavak oldal tesztjei', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#email').type('istvanproba@gmail.com');
    cy.get('#password').type('proba12345');
    cy.get('.login-button').click();


    cy.url().should('include', '/lakes', { timeout: 10000 });
  });

  it('A bejelentkezés után átirányít a tavak oldalra', () => {
    cy.url().should('include', '/lakes');
    cy.get('.lake-title').should('be.visible');
  });

  it('Betöltődik az oldal és tartalmazza a szükséges elemeket', () => {
    cy.get('h1.lake-title').should('contain', 'Felfedezhető tavak');
    cy.get('.filter-section').should('exist');
    cy.get('.lake-grid').should('exist');
  });

  it('Keresőmező működése', () => {

    cy.get('.lake-card').should('have.length.greaterThan', 0);
    cy.get('.search-box input').type('Tó').should('have.value', 'Tó');
    cy.get('.lake-card').should('have.length.greaterThan', 0);
  });

  it('A részletek gomb működése', () => {
    cy.get('.lake-card').should('have.length.greaterThan', 0);
    cy.get('.lake-card').first().find('.card-button').click();
    cy.url().should('include', '/lake-details');
  });
});


describe('Tó részletek oldal tesztjei', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#email').type('istvanproba@gmail.com');
    cy.get('#password').type('proba12345');
    cy.get('.login-button').click();

    cy.url().should('include', '/lakes', { timeout: 10000 });

    cy.get('.lake-card').first().find('.card-button').click();

    cy.url().should('include', '/lake-details');
  });

  it('Navigációs gombok megfelelően működnek', () => {
    cy.get('.action-button.back').should('be.visible').click();
    cy.url().should('include', '/lakes');

    cy.get('.lake-card').first().find('.card-button').click();

    cy.get('.action-button.catches').should('be.visible').click();
    cy.url().should('include', '/catches');
  });



  it('A leírás és hivatkozás megfelelően megjelenik', () => {
    cy.get('.description-section').should('exist');
    cy.get('.description-section h3').should('contain', 'Leírás');
    cy.get('.description-section p').should('not.be.empty');

    cy.get('body').then(($body) => {
      if ($body.find('.link-section').length > 0) {
        cy.get('.link-section').should('exist');
        cy.get('.modern-link').should('have.attr', 'href').and('not.be.empty');
        cy.get('.modern-link').should('have.attr', 'target', '_blank');
      }
    });
  });

  it('A térkép gomb megfelelően működik', () => {
    cy.window().then((win) => {
      cy.spy(win, 'open').as('windowOpen');
    });

    cy.get('.map-button').click();
    cy.get('@windowOpen').should('have.been.called');
  });

  it('A nyitvatartási táblázat megfelelően megjelenik', () => {
    cy.get('.section').eq(0).should('contain', 'Nyitvatartás');
    cy.get('.modern-table').eq(0).should('exist');
    cy.get('.modern-table').eq(0).find('thead th').should('have.length', 3);
    cy.get('.modern-table').eq(0).find('tbody tr').should('have.length.at.least', 1);
  });

  it('A tipikus halak megfelelően megjelennek', () => {
    cy.get('.section').eq(1).should('contain', 'Tipikus halak');
    cy.get('.fish-grid').should('exist');
    cy.get('.fish-card').should('have.length.at.least', 1);

    cy.get('.fish-card').first().within(() => {
      cy.get('.fish-image').should('be.visible');
      cy.get('.fish-image').should('have.attr', 'alt').and('not.be.empty');
      cy.get('.fish-name').should('not.be.empty');
    });
  });

  it('A napijegy árakat tartalmazó táblázat megfelelően jelenik meg, ha van', () => {
    cy.get('body').then(($body) => {
      if ($body.find('.section').eq(2).length > 0) {
        cy.get('.section').eq(2).should('contain', 'Napijegyek');
        cy.get('.modern-table').eq(1).should('exist');
        cy.get('.modern-table').eq(1).find('thead th').should('have.length', 2);
        cy.get('.modern-table').eq(1).find('tbody tr').should('have.length.at.least', 1);

        cy.get('.modern-table').eq(1).find('tbody tr').first().within(() => {
          cy.get('td').eq(0).should('not.be.empty');
          cy.get('td').eq(1).should('contain', 'Ft');
        });
      }
    });
  });

  it('A "Vissza az elejére" gomb megfelelően működik', () => {
    cy.scrollTo('bottom');

    cy.get('.scroll-top').click();

    cy.window().then((win) => {
      expect(win.scrollY).to.be.closeTo(0, 50);
    });
  });
});




