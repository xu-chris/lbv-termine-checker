require('dotenv').config(); // dotenv-Bibliothek einbinden

const TelegramBot = require('node-telegram-bot-api');
const { spawn } = require('child_process');
const cron = require('node-cron');

// Telegram-Bot konfigurieren
const botToken = process.env.BOT_TOKEN; // Bot-Token aus .env lesen
const chatId = process.env.CHAT_ID; // Chat-ID aus .env lesen
const bot = new TelegramBot(botToken);

// Cypress-Test ausführen
function runCypressTest() {
  return new Promise((resolve, reject) => {
    const cypress = spawn('npx', ['cypress', 'run'], { stdio: 'inherit' });
    cypress.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        console.error(`Cypress-Test fehlgeschlagen mit Exit-Code ${code}`);
        resolve(); // Fortsetzen des Skripts trotz Fehler
      }
    });
  });
}

// Funktion zum Senden der Telegram-Benachrichtigung
function sendTelegramNotification(date) {
  const message = `Neues Datum: ${date}`;
  bot.sendMessage(chatId, message)
    .then(() => {
      console.log('Benachrichtigung erfolgreich gesendet');
    })
    .catch((error) => {
      console.error('Fehler beim Senden der Benachrichtigung:', error);
    });
}

// Funktion zum Überprüfen der Webseite
async function checkWebpage() {
    try {
      await runCypressTest();
  
      // Datum aus der Cypress-Ausgabe extrahieren
      const output = require('./cypress/results/mochawesome.json');
      const date = output.results.stats.start.split('T')[0];
  
      // Das Datum mit einem vorherigen Datum vergleichen und Benachrichtigung senden
      const previousDate = localStorage.getItem('previousDate');
      if (!previousDate || date > previousDate) {
        localStorage.setItem('previousDate', date);
        sendTelegramNotification(date);
      }
    } catch (error) {
      console.error('Fehler beim Ausführen des Datum-Tests:', error);
    }
  }

// Cron-Job einrichten, um die Überprüfung der Webseite jeden Tag von 08:01 bis 10:01 Uhr auszuführen
cron.schedule('1-59/5 8-9 * * *', () => {
    checkWebpage();
  });
  
// Start der Anwendung
console.log('Die Anwendung läuft und überprüft die Webseite täglich von 08:01 bis 10:01 Uhr...');