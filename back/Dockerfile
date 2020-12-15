FROM node:lts

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

# Bundle app source
COPY . .
RUN npm run build

EXPOSE 1337
CMD [ "npm", "run", "develop" ]
