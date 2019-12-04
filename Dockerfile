FROM node:10

COPY . .

CMD ["nodemon", "app.js"]
