FROM node:16

WORKDIR /code

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./tsconfig.json ./
RUN yarn install

EXPOSE 3000

CMD [ "yarn", "start" ]
