FROM node:20-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

RUN apk add git
RUN git clone https://github.com/JetBrains/swot.git

ENTRYPOINT ["node", "index.js"]