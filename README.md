# Automate checking of available LBV Hamburg dates

If you're living in Hamburg, Germany, you know that even (Elon Musk doesn't like the waiting times)[https://www.electrive.com/2019/07/17/not-everybody-tolerates-creaky-german-bureaucracy/] of it's bureaucracy. Therefore, smart tech needs to come to rescue to get a date as early as it gets free.

This repo initiates an automatic check for free dates and sends a Telegram message to you through your (previously generated) Telegram bot. The whole setup is dockerized for your convenience 🍷.

## Getting Started
We need to first create the Telegram bot to obtain the Bot ID and Chat ID for the notification. 
Then we add this information to an `.env` file so the docker container reads it from that.
Then we create and start the docker container via a docker-compose file.

### 1. Create Telegram Bot
To receive notifications through Telegram, you will need to create a Telegram bot and obtain the bot ID and chat ID. Follow the steps below to set up your Telegram bot:

1. Open the Telegram app and search for the "BotFather" bot.
2. Start a chat with BotFather by clicking on the "Start" button.
3. Create a new bot by sending the `/newbot` command to BotFather.
4. Follow the instructions provided by BotFather to choose a name and username for your bot.
5. Once your bot is created, BotFather will provide you with a bot token. Make sure to copy and save this token securely, as you will need it later.
6. Next, search for your bot username in the Telegram app and start a chat with it.
7. Send a message to the bot to initiate a conversation. This step is necessary to obtain the chat ID.
8. Now, to obtain the chat ID, open the following URL in a web browser, replacing `<YOUR_BOT_TOKEN>` with the token you obtained in step 5:

   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```

9. Look for the `"chat"` object in the JSON response. Find the `"id"` field, which represents the chat ID. Make sure to note this chat ID, as you will need it to configure the `CHAT_ID` environment variable.

With the bot token and chat ID in hand, you can now proceed to configure the `.env` file with the appropriate values.
Remember to keep your bot token and chat ID confidential and avoid sharing them publicly or committing them to version control systems.

### 2. Create `.env` file
With the bot token and chat ID in hand, you can now create the `.env` file with the following contents:

```
BOT_TOKEN=<your-bot-token>
CHAT_ID=<your-chat-id>
```

Make sure to replace `<your-bot-token>` and `<your-chat-id>` with the actual values you obtained.

### 3. Create and run `docker-compse.yml` file
Create a new file called `docker-compose.yml` in the same folder like the `.env` file. 
!> To run this, you need to have docker and docker-compose installed on your machine.
```
version: '3'
services:
  lbv-termine-checker:
    image: ghrc.io/xu-chris/lbv-termine-checker:latest
    restart: always
    command: npm start
```

You can run the Docker Compose file with the following command:

```
docker-compose up -d
```

## Alternatively: run it directly

### Prerequisites

Before running the application, ensure that you have the following dependencies installed:

- Node.js (version 12 or higher)
- npm (Node Package Manager)

### Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/xu-chris/lbv-termine-checker.git
   ```

2. Navigate to the project's directory:

   ```bash
   cd lbv-termine-checker
   ```

3. Install the required npm packages:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory of the project and add the following environment variables:

   ```plaintext
   BOT_TOKEN=<your-bot-token>
   CHAT_ID=<your-chat-id>
   ```

   - Replace `<your-bot-token>` with the Telegram bot token you obtained.
   - Replace `<your-chat-id>` with the Telegram chat ID you obtained.

5. Run the application:

   ```bash
   npm start
   ```

   The lbv-termine-checker will now start running and check for appointment availability based on the specified schedule.

### Customize the checker

By default, the application uses the provided Cypress tests to check the LBV-Termine website. However, you can modify the test code and parameters according to your requirements. The Cypress test files are located in the `cypress/integration` directory.

## Contributing

Contributions are welcome! If you find any issues or want to add new features to the application, feel free to open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).