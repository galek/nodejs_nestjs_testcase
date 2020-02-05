# NestJS Test-case

# Building
- unpack archive to your directory
- cd this directory
- npm install
- npm run start

## TODO
- BD support (Mongo as example)
- Docker file and documentatioin

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
