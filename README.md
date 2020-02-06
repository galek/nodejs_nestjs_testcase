# NestJS Test-case

# Building
- unpack archive to your directory
- cd this directory
- npm install (or npm ci in feature, if package-lock.json  is exist)

- For development
```bash
npm run start
```
- For production
```bash
npm run start:prod
```

# Production
- npm run prestart:prod
- npm run start:prod

## TODO
- BD support (Mongo as example), with universal interface
- Docker tests (needed infrastructure)
- Admin panel

## Documentation
- For generation of documentation, run:
```bash
npm run doc
```

OR (For older versions of this)

- If Typedoc not installed, run:
```bash
npm install --save-dev typedoc
```
- run this command:
```bash
$ typedoc --out ./doc ./src
```

## DOCKER
### Docker not tested (I not have infrastructure)
- For generation docker file you can use:
https://www.npmjs.com/package/generator-docker
- cd projectdir
- docker build ../nodejs_nestjs_testcase-docker
- docker run -p 3000 nodejs_nestjs_testcase-docker

## REST API

### Request

`POST /get-token/`

    curl --location --request POST 'localhost:3000/get-token/' 
	--header 'Content-Type: application/json' 
	--data-raw '{"username": "john", "password": "changeme"}'

### Response

    Status: 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 182
	ETag:W/"b6-ZHIAAOBoKYORpkQUqYDVNWsLh8U"
	Date:Wed, 05 Feb 2020 16:45:18 GMT
    Connection: keep-alive

    {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTU4MDkyMTExOCwiZXhwIjoxNTgwOTIxMTc4fQ.QDUNDmgIocHghNhPAUwPPG2y5qBV3jUohzLeVDh3RFE"}

### Request

`POST /vote/`

    curl --location --request POST 'localhost:3000/vote/' --header 'Content-Type: application/x-www-form-urlencoded' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTU4MDkyNDcxMiwiZXhwIjoxNTgwOTI0NzcyfQ.KX35tqEhpGEZ-E7QS8VgJNlJMEhyz6PkQJqC6FjFfrk' --data-urlencode 'voteFor=4'

### Response

    Status: 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 16
	ETag:W/"10-oV4hJxRVSENxc/wX8+mA4/Pe4tA"
	Date:Wed, Wed, 05 Feb 2020 17:50:57 GMT
    Connection: keep-alive

    {"success":true}

### Request

`GET /results/`

    curl --location --request POST 'localhost:3000/vote/' --header 'Content-Type: application/x-www-form-urlencoded' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTU4MDkyNDcxMiwiZXhwIjoxNTgwOTI0NzcyfQ.KX35tqEhpGEZ-E7QS8VgJNlJMEhyz6PkQJqC6FjFfrk' --data-urlencode 'voteFor=4'

### Response

    Status: 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 16
	ETag:W/"10-oV4hJxRVSENxc/wX8+mA4/Pe4tA"
	Date:Wed, Wed, 05 Feb 2020 17:50:57 GMT
    Connection: keep-alive

    [{"name":"4","votes":1,"position":1}]
