Requirements - Docker - Docker Compose

clone the Repo
sh "git clone https://github.com/Bobooshodi/xendit-marvels-comic-api.git"

sh "cd xendit-marvels-comic-api";

rename .env.dist or .env.prod to .env and modify .env accordingly
renam docker-compose.debug.yaml to docker-compose.yaml and modify accordingly

docker-compose up -d --build

---

                        Without Docker

Requirements - NPM
Redis Server - Running

clone the Repo
sh "git clone https://github.com/Bobooshodi/xendit-marvels-comic-api.git"

sh "cd xendit-marvels-comic-api";

rename .env.dist or .env.prod to .env and modify .env accordingly

npm install
npm start

                            ASSUMPTIONS

We the datastore will be fetchde and updated through this app.

                                NOTE

For the Integration Test, this requires the Server to be running. just start the docker-container, and run npm run test
