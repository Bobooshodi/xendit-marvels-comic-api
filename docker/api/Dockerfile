FROM node:12.18-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app

RUN npm install -g ts-node

COPY ["package.json", "./"]
# If you are building your code for production
# RUN npm ci --only=production
# --production --silent && mv node_modules ../
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "start"]