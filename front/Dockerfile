FROM node:lts AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./
#RUN npm run build

# Étape 2 : Exécution
# FROM node:lts

# WORKDIR /app

# COPY --from=builder /app ./

# EXPOSE 4100

# CMD ["npm", "run", "dev"]


