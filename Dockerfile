FROM node:22

WORKDIR /learn

COPY . .

RUN npm install --production

CMD ["npm", "run", "start:prod"]

