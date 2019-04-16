FROM node

WORKDIR /opt/app

COPY ./package.json /opt/app/package.json
COPY ./package-lock.json /opt/app/package-lock.json

RUN npm install

COPY .data-for-db /opt/app/data-for-db
COPY ./bin /opt/app/bin
#COPY ./prisma /opt/app/prisma
COPY ./public /opt/app/public
COPY ./routes /opt/app/routes
COPY ./app.js /opt/app/app.js

CMD [ "npm", "run", "start" ]
