describe('Webseite-Test', () => {
    it('überprüft Veränderungen auf der Webseite', () => {
      cy.visit('https://lbv-termine.de/frontend/standortauswahl.php')
  
      // Checkbox auswählen und anklicken
      cy.get('#datenschutzcheckbox').click()
  
      // Weiter-Button auswählen und klicken
      cy.get('.LBV-weiterbutton').click()
  
      // Formularfelder ausfüllen
      cy.get('#vorname').clear().type('Nana')
      cy.get('#nachname').clear().type('BB')
      cy.get('#email').clear().type('email@email.com')
  
      // Weiter-Button erneut auswählen und klicken
      cy.get('.LBV-weiterbutton').click()
  
      // Datum der frühesten verfügbaren Option finden
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
  
      // Das Datum speichern und mit einem vorherigen Datum vergleichen
      cy.get('@date').then((date) => {
        const previousDate = Cypress.moment(localStorage.getItem('previousDate'), 'DD.MM.YYYY')
        if (!previousDate.isValid() || Cypress.moment(date, 'DD.MM.YYYY').isAfter(previousDate)) {
          localStorage.setItem('previousDate', date)
          // Benachrichtigung über Telegram-Bot senden (implementiere dies entsprechend deinen Anforderungen)
          // sendTelegramNotification(date)
        }
      })
    })
  })
  