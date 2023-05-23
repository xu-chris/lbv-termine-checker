describe('Website Test', () => {
  it('checks for changes on the website', () => {
    cy.visit('https://lbv-termine.de/frontend/standortauswahl.php')

    // Select and click the checkbox
    cy.get('#datenschutzcheckbox').click()

    // Select and click the "Weiter" button
    cy.get('.LBV-weiterbutton').click()

    // Wait for the page to change
    cy.url().should('include', '/kontaktdaten.php');

    // Fill in the form fields
    cy.get('#vorname').clear().type('Your')
    cy.get('#nachname').clear().type('Name')
    cy.get('#email').clear().type('peter.tschentscher@doesntlikeelon.com')

    // Select and click the "Weiter" button again
    cy.get('.LBV-weiterbutton').click()

    // Wait for the page to change
    cy.url().should('include', '/standortauswahl.php');

    // Find the date of the earliest available option
    try {
      cy.get('.card-body')
        .should('exist')
        .each(($cardBody) => {
          cy.wrap($cardBody)
            .should('contain', 'verfügbar ab')
            .invoke('text')
            .then((dateText) => {
              const date = dateText.match(/\d{2}\.\d{2}\.\d{4}/)[0]
              cy.wrap(date).as('date')
            })
        })
  
      // Save the date and compare it with a previous date
      cy.get('@date').then((date) => {
        const previousDate = Cypress.moment(localStorage.getItem('previousDate'), 'DD.MM.YYYY')
        if (!previousDate.isValid() || Cypress.moment(date, 'DD.MM.YYYY').isAfter(previousDate)) {
          localStorage.setItem('previousDate', date)
        }
      })
    } catch {
      return false;
    }
  })
})
