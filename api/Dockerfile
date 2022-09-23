FROM node:16

WORKDIR /app
COPY ./package.json ./
RUN npm install

COPY ./tsconfig.json /src

ENV PORT=3000
EXPOSE 3000
CMD [ "npm", "start" ]
