FROM node:16
RUN apt update && apt install -y nodejs && apt install -y npm
CMD node -v
WORKDIR /var/www
COPY . .
EXPOSE 3000
RUN npm install
RUN ["npm", "run", "build"]
CMD ["npm", "run", "start"]
