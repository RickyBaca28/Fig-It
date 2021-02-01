# Fig-It
(A personnel project to practice web development and learn new frameworks/tools) <br>
A soon to be all purpose trading website!

## Requirements
Make sure the following are installed!
* node v12
* npm 6.11.3
* docker

## How to run app
```
git clone https://github.com/RickyBaca28/Fig-It.git
cd Fig-it
```
## Run backend
```
docker run --name mongodb bitnami/mongodb:latest
curl -sSL https://raw.githubusercontent.com/bitnami/bitnami-docker-mongodb/master/docker-compose.yml > docker-compose.yml
docker-compose up -d
cd backend
npm ci
npm run dev
```

## Run frontend
```
cd frontend
npm ci
npm start
```