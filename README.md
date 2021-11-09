
### Description

This is repository has been created as a demonstration of my skills for Bell Integrator company, for the vacancy of TechLead (NodeJS Backend Developer)

The original version has been created in 2019, but I updated this is code to my actual state of tech skill sets.

You can use this is repository as a template for your microservices (how I do)

### Older versions
[2019 year](https://github.com)

[Actual version](https://github.com)

### License: MIT

### Building
#### Check what .env file is exists or create own (or send args from command line)


#### For local development
- unpack archive to your directory
- cd this directory
- npm install (or npm ci in feature, if package-lock.json  is exist)
#### For production build
- If is docker will be used: ```sh build_docker.sh``` or ```docker build -t testcase .```
- If is docker is not available: ```npm install pm2 -g && (npm ci || npm i) && (npm run build && pm2 start 'npm run start:prod')```

### Additional information:
1) [PM2 documentation](https://pm2.keymetrics.io/docs/usage/quick-start/).
2) [Docker documentation](https://docs.docker.com/).
3) [NestJS documentation](https://docs.nestjs.com/).
### Used additional packages:
https://github.com/willsoto/nestjs-prometheus
