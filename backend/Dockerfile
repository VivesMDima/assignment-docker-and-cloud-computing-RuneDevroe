FROM node
WORKDIR /app

COPY package*.json .
COPY . .

RUN npm i

EXPOSE 5000

CMD node index.js