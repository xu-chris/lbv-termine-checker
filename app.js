require('dotenv').config(); // Include dotenv library

const TelegramBot = require('node-telegram-bot-api');
const { spawn } = require('child_process');
const cron = require('node-cron');

// Configure Telegram Bot
const botToken = process.env.BOT_TOKEN; // Read bot token from .env
const chatId = process.env.CHAT_ID; // Read chat ID from .env
const bot = new TelegramBot(botToken);

// Run Cypress test
function runCypressTest() {
  return new Promise((resolve, reject) => {
    const cypress = spawn('npx', ['cypress', 'run'], { stdio: 'inherit' });
    cypress.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        console.error(`Cypress test failed with exit code ${code}`);
        resolve(); // Continue script execution despite error
      }
    });
  });
}

// Function to send Telegram notification
function sendTelegramNotification(date) {
  const message = `New date: ${date}`;
  bot.sendMessage(chatId, message)
    .then(() => {
      console.log('Notification sent successfully');
    })
    .catch((error) => {
      console.error('Failed to send notification:', error);
    });
}

// Function to check the website
async function checkWebpage() {
    try {
      await runCypressTest();
  
      // Extract date from Cypress output
      const output = require('./cypress/results/mochawesome.json');
      const date = output.results.stats.start.split('T')[0];
  
      // Compare the date with a previous date and send notification
      const previousDate = localStorage.getItem('previousDate');
      if (!previousDate || date > previousDate) {
        localStorage.setItem('previousDate', date);
        sendTelegramNotification(date);
      }
    } catch (error) {
      console.error('Failed to run the date test:', error);
    }
  }

// Set up a cron job to execute the website check every day from 8:01 to 9:59
cron.schedule('1-59/5 8-9 * * *', () => {
    checkWebpage();
  });
  
// Start the application
console.log('The application is running and checking the website daily from 8:01 to 9:59...');
