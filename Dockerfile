FROM node:lts
RUN npm install -g nodemon


# Installer wkhtmltopdf
RUN apt-get update && apt-get install -y \
  wkhtmltopdf \
  && rm -rf /var/lib/apt/lists/*
  

WORKDIR /app
COPY ./restapi/package*.json ./

# Installe les dépendances Node.js, y compris Puppeteer et Chromium
RUN npm install

