FROM node:16
RUN apt update
COPY package.json package.json
RUN npm install
WORKDIR /var/www
COPY . .
EXPOSE 3000
RUN ["npm", "run", "build"]
CMD ["npm", "run", "start"]
