FROM node:20

WORKDIR /usr/src/path

COPY . . 

RUN npm install

EXPOSE 6000

CMD ["npm", "run", "start: dev"]