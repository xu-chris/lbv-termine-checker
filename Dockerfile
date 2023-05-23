# Verwende das offizielle Node.js-Image als Basis
FROM node:14

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere package.json und package-lock.json in das Arbeitsverzeichnis
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Anwendungscodes in das Arbeitsverzeichnis
COPY . .

# Starte deine Anwendung
CMD [ "node", "app.js" ]
