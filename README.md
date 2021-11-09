
### Description

This is repository has been created as a demonstration of my skills for Bell Integrator company, for the vacancy of TechLead (NodeJS Backend Developer)

The original version has been created in 2019, but I updated this is code to my actual state of tech skill sets.

You can use this is repository as a template for your microservices (how I do)

[Task description](Task.md)

### Older versions
[2019 year](https://github.com/galek/nodejs_nestjs_testcase/tree/2019_archive)

[Actual version](https://github.com/galek/nodejs_nestjs_testcase/tree/master)

### License: MIT

### Building
#### Check what .env file is exists or create own (or send args from command line)

### Features:
- Swagger
- Prometheus as monitoring tool
- Sentry for reserve logging tool
- SonarQube for code quality
- Ready for using in docker/kubernetes (I hope what HELM charts you can create manually) 

#### For local development
- unpack archive to your directory
- cd this directory
- ```npm install``` (or ```npm ci``` in feature, if ```package-lock.json``` is exist)
#### For production build
- If is docker will be used: ```sh build_docker.sh``` or ```docker build -t testcase .```
- If is docker is not available: ```npm install pm2 -g && (npm ci || npm i) && (npm run build && pm2 start 'npm run start:prod')```

#### Swagger (OpenAPI)
- Run your service
- go to ``localhost:3000/api`` (port can be changed, and api endpoint in code) for swagger ui
- go to ``localhost:3000/api/swagger.json`` for downloading swagger.json

### Creditionals (username-password)
- john-changeme
- chris-secret
- maria-guess

### HealthChecs
- readiness/liveness (terminus) - is not implemented
- go to ``/healthCheck`` and if you got ``true`` when your service is alive
- go to ``/metrics`` for collect of prometheus metrics

### Additional information:
1) [PM2 documentation](https://pm2.keymetrics.io/docs/usage/quick-start/).
2) [Docker documentation](https://docs.docker.com/).
3) [NestJS documentation](https://docs.nestjs.com/).
### Used additional packages:
https://github.com/willsoto/nestjs-prometheus
