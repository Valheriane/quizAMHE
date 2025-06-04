# Étape 1 : image de base
FROM node:20

# Étape 2 : créer un dossier de travail
WORKDIR /app

# Étape 3 : copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Étape 4 : installer les dépendances
RUN npm install

# Étape 5 : copier le reste de l'application
COPY . .

# Étape 6 : exposer le port utilisé par l'app
EXPOSE 3000

# Étape 7 : démarrer l'application
CMD ["node", "index.js"]  # ou app.js selon ton point d’entrée
