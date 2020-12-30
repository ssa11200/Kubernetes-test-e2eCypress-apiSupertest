FROM cypress/base AS cypress

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm","run", "cy:run"]