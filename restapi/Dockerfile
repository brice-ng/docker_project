FROM node:lts
RUN npm install -g nodemon
RUN npm install -g sails


# Installer wkhtmltopdf
RUN apt-get update && apt-get install -y \
  wkhtmltopdf \
  && rm -rf /var/lib/apt/lists/*
  

WORKDIR /app
COPY ./package*.json ./

# Installe les dépendances Node.js, y compris Puppeteer et Chromium

RUN npm install


