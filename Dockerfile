FROM node:16.15.0-alpine

WORKDIR /var/www
COPY . /var/www

RUN npm install --quiet

RUN npm ci --only=production

EXPOSE 8080
CMD [ "node", "app.js" ]