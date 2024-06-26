# Getting Started

This project developed using `node 18.12.1`, `npm 8.19.2` and `mysql`.

To start running this project locally, you must follow these steps:

First, clone these repository to the your folder.

```
> https://github.com/mluthfit/web-training.git
```

Then, open the folder and **install** all packages.

```
> npm install
```

Then, copy `.env.example` to `.env`

```
> cp .env.example .env
```

Then, fill the environment variables.

Then, migrate the database with seed data

```
> npm run migrate:seed
```

Last, start the server.

```
> npm run start
```

# Routes

Base Url

```
http://localhost:3000/api/
```

## Login

```http
POST /api/login/
```

#### Body

```json
{
  "username": "required | string",
  "password": "required | string"
}
```

#### Success Response

```json
{
  "code": 200,
  "message": "Login successfully",
  "data": {
    "id": 1,
    "username": "admin",
    "departement": "HRD",
    "role": "admin",
    "createdAt": "2023-05-27T08:37:38.197Z",
    "updatedAt": "2023-05-27T08:42:34.055Z"
  },
  "token": {
    "type": "Bearer",
    "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJocmRtd3QiLCJkZXBhcnRlbWVudCI6IkhSRCIsInJvbGUiOiJhZG1pbiIsImNyZWF0ZWRBdCI6IjIwMjMtMDUtMjdUMDg6Mzc6MzguMTk3WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDUtMjdUMDg6NDI6MzQuMDU1WiIsImlhdCI6MTY4NTE3Njk1N30.PIvF58jNmSKGo9Q4akgvGgnmc8vi0QmHOgNw5ZQiKPE"
  }
}
```

#### Validation Error Response

```json
{
  "code": 400,
  "message": "Request validation error",
  "errors": [
    {
      "type": "field",
      "msg": "Username is required",
      "path": "username",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Password is required",
      "path": "password",
      "location": "body"
    }
  ]
}
```

#### Error Response

```json
{
  "code": 400,
  "message": "Invalid email or password"
}
```

## Get All Training

```http
GET /api/training/
```

If user's role is `user`, Only returns data according to user's departement

If user's role is `admin`, Returns all training data

#### Authorization

```js
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
```

#### Filter Query (Optinal)

`?status` Filter the data with spesific status.

<table>
    <thead>
        <tr>
            <th colspan=3 style="text-align:center">Status</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>requested</td>
            <td>approved</td>
            <td>rejected</td>
        <tr>
    </tbody>
</table>

`?name` Filter the data contained by training name.

`?departement` Filter the data with specific departments that made the training.

<table>
    <thead>
        <tr>
            <th colspan=2 style="text-align:center">Departement</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>HRD</td>
            <td>Marketing</td>
        <tr>
        <tr>
            <td>Purchasing</td>
            <td>QMS</td>
        <tr>
        <tr>
            <td>Produksi</td>
            <td>PPIC</td>
        <tr>
        <tr>
            <td>Quality Control</td>
            <td>Engineering</td>
        <tr>
        <tr>
            <td>General Affair</td>
            <td>Repair & Maintanance</td>
        <tr>
    </tbody>
</table>

#### Pagination Query (Optional)

`?limit`

Size of data returned per page. This query can only be active if there is `?page` query. Default size is `10`

`?page`

If value is greater than `0`, Data will returns the pagination format like this

```json
"pagination": {
  "currentPage": 1,
  "total": 1,
  "from": 1,
  "to": 1,
  "perPage": 10,
  "lastPage": 1
}
```

#### Success Response (with Pagination)

```json
{
  "code": 200,
  "message": "Data retrieved",
  "data": [
    {
      "id": 2,
      "name": "Name",
      "purpose": "Purpose",
      "organizer": "external",
      "location": "Jakarta",
      "cost": 10000000,
      "authorId": 7,
      "heldAt": "2023-05-26T00:00:00.000Z",
      "status": "requested",
      "createdAt": "2023-05-27T09:41:03.489Z",
      "updatedAt": "2023-05-27T09:41:03.489Z",
      "author": {
        "id": 7,
        "username": "qcmwt",
        "departement": "Quality Control",
        "role": "user"
      },
      "participants": [
        {
          "fullName": "user1",
          "createdAt": "2023-05-27T09:41:03.489Z",
          "updatedAt": "2023-05-27T09:41:03.489Z"
        },
        {
          "fullName": "user2",
          "createdAt": "2023-05-27T09:41:03.489Z",
          "updatedAt": "2023-05-27T09:41:03.489Z"
        },
        {
          "fullName": "user3",
          "createdAt": "2023-05-27T09:41:03.489Z",
          "updatedAt": "2023-05-27T09:41:03.489Z"
        }
      ]
    }
  ],
  "pagination": {
    "currentPage": 1,
    "total": 2,
    "from": 1,
    "to": 1,
    "perPage": 1,
    "lastPage": 2
  }
}
```

### Success Reponses (without Pagination)

```json
{
  "code": 200,
  "message": "Data retrieved",
  "data": [
    {
      "id": 2,
      "name": "Name",
      "purpose": "Purpose",
      "organizer": "external",
      "location": "Jakarta",
      "cost": 10000000,
      "authorId": 7,
      "heldAt": "2023-05-26T00:00:00.000Z",
      "status": "requested",
      "createdAt": "2023-05-27T09:41:03.489Z",
      "updatedAt": "2023-05-27T09:41:03.489Z",
      "author": {
        "id": 7,
        "username": "qcmwt",
        "departement": "Quality Control",
        "role": "user"
      },
      "participants": [
        {
          "fullName": "user1",
          "createdAt": "2023-05-27T09:41:03.489Z",
          "updatedAt": "2023-05-27T09:41:03.489Z"
        },
        {
          "fullName": "user2",
          "createdAt": "2023-05-27T09:41:03.489Z",
          "updatedAt": "2023-05-27T09:41:03.489Z"
        },
        {
          "fullName": "user3",
          "createdAt": "2023-05-27T09:41:03.489Z",
          "updatedAt": "2023-05-27T09:41:03.489Z"
        }
      ]
    },
    {
      "id": 1,
      "name": "Name",
      "purpose": "Purpose",
      "organizer": "external",
      "location": "Jakarta",
      "cost": 10000000,
      "authorId": 1,
      "heldAt": "2023-05-26T00:00:00.000Z",
      "status": "requested",
      "createdAt": "2023-05-27T09:22:17.336Z",
      "updatedAt": "2023-05-27T09:22:17.336Z",
      "author": {
        "id": 1,
        "username": "hrdmwt",
        "departement": "HRD",
        "role": "admin"
      },
      "participants": [
        {
          "fullName": "user1",
          "createdAt": "2023-05-27T09:22:17.336Z",
          "updatedAt": "2023-05-27T09:22:17.336Z"
        },
        {
          "fullName": "user2",
          "createdAt": "2023-05-27T09:22:17.336Z",
          "updatedAt": "2023-05-27T09:22:17.336Z"
        },
        {
          "fullName": "user3",
          "createdAt": "2023-05-27T09:22:17.336Z",
          "updatedAt": "2023-05-27T09:22:17.336Z"
        }
      ]
    }
  ]
}
```

## Get All Schedule Training's Approved or Ongoing

Can only be used by `admin`.

```http
GET /api/training/schedule/
```

#### Authorization

```js
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
```

#### Success Response

```json
{
  "code": 200,
  "message": "Data retrieved",
  "data": [
    {
      "id": 1,
      "name": "Name",
      "organizer": "external",
      "location": "Jakarta",
      "heldAt": "2023-05-26T00:00:00.000Z"
    }
  ]
}
```

#### Error Response

```json
{
  "code": 403,
  "message": "The user does not have access"
}
```

## Create Training

Can only be used by `user`.

```http
POST /api/training/
```

#### Authorization

```js
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
```

#### Body

```json
{
  "name": "required | string",
  "purpose": "required | string",
  "organizer": "required | ['internal', 'external']",
  "location": "required | string",
  "heldAt": "required | date",
  "cost": "optinal | number",
  "participants": "required | string[]",
  "questions": "required | string[]"
}
```

#### Success Response

```json
{
  "code": 201,
  "message": "Training created",
  "data": {
    "id": "b28ff18b-46be-44d1-90f5-31ce90a4a9be",
    "name": "Name",
    "purpose": "Purpose",
    "organizer": "external",
    "location": "Jakarta",
    "cost": 10000000,
    "authorId": 7,
    "heldAt": "2023-05-26T00:00:00.000Z",
    "status": "requested",
    "createdAt": "2023-05-27T09:41:03.489Z",
    "updatedAt": "2023-05-27T09:41:03.489Z"
  }
}
```

#### Validation Error Response

```json
{
  "code": 400,
  "message": "Request validation error",
  "errors": [
    {
      "type": "field",
      "msg": "Participants is required",
      "path": "participants",
      "location": "body"
    }
  ]
}
```

## Update Training Status

Can only be used by `admin`.

```http
PUT /api/training/:id/
```

Paramater `:id` is `training's id`

#### Authorization

```js
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
```

#### Body

```json
{
  "status": "required | ['ongoing', 'rejected']"
}
```

#### Success Response

```json
{
  "code": 200,
  "message": "Training updated",
  "data": {
    "id": "b28ff18b-46be-44d1-90f5-31ce90a4a9be",
    "name": "Name",
    "purpose": "Purpose",
    "organizer": "external",
    "location": "Jakarta",
    "cost": 10000000,
    "authorId": 1,
    "heldAt": "2023-05-26T00:00:00.000Z",
    "status": "approved",
    "createdAt": "2023-05-27T09:22:17.336Z",
    "updatedAt": "2023-05-27T10:10:28.227Z"
  }
}
```

#### Validation Error Response

```json
{
  "code": 400,
  "message": "Request validation error",
  "errors": [
    {
      "type": "field",
      "msg": "Status is required",
      "path": "status",
      "location": "body"
    }
  ]
}
```

#### Error Response

```json
{
  "code": 400,
  "message": "Training status is not requested"
}
```

## Get Questions from Training's Ongoing

Can only be used if training status is `ongoing`.

```http
GET /api/questions/:id/
```

Paramater `:id` is `training's id`

#### Success Response

```json
{
  "code": 200,
  "message": "Data retrieved",
  "data": {
    "id": "777e1d9f-d06e-4397-a75b-f8a544eaaefc",
    "name": "Name",
    "purpose": "Purpose",
    "organizer": "external",
    "location": "Jakarta",
    "cost": null,
    "heldAt": "2023-05-26T00:00:00.000Z",
    "status": "ongoing",
    "authorId": 2,
    "createdAt": "2023-06-08T18:19:34.166Z",
    "updatedAt": "2023-06-08T18:42:34.115Z",
    "questions": [
      {
        "id": 3,
        "text": "Soal ke-1"
      },
      {
        "id": 4,
        "text": "Soal ke-2"
      }
    ]
  }
}
```

#### Error Response

```json
{
  "code": 400,
  "message": "Training is not ongoing"
}
```

## Store Question Answers

Can only be used if training status is `ongoing`.

```http
POST /api/questions/:id/
```

Paramater `:id` is `training's id`

#### Body

```json
{
  "participant": "required | string",
  "results": "required | string[]"
}
```

#### Success Response

```json
{
  "code": 201,
  "message": "Data created",
  "data": {
    "id": 4,
    "participant": "Muhammad Luthfi",
    "results": "[\"Jabawan Nomor 1\",\"Jabawan Nomor 2\"]",
    "trainingId": "777e1d9f-d06e-4397-a75b-f8a544eaaefc",
    "createdAt": "2023-06-08T18:56:57.949Z",
    "updatedAt": "2023-06-08T18:56:57.949Z"
  }
}
```

#### Validation Error Response

```json
{
  "code": 400,
  "message": "Request validation error",
  "errors": [
    {
      "type": "field",
      "msg": "Results is required",
      "path": "results",
      "location": "body"
    }
  ]
}
```

## Get Training Details

Can only be used by `admin` or `author`.

```http
GET /api/training/:id/
```

Paramater `:id` is `training's id`

#### Authorization

```js
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
```

#### Success Response

```json
{
  "code": 200,
  "message": "Data retrieved",
  "data": {
    "id": "777e1d9f-d06e-4397-a75b-f8a544eaaefc",
    "name": "Name",
    "purpose": "Purpose",
    "organizer": "external",
    "location": "Jakarta",
    "cost": null,
    "heldAt": "2023-05-26T00:00:00.000Z",
    "status": "ongoing",
    "authorId": 2,
    "createdAt": "2023-06-08T18:19:34.166Z",
    "updatedAt": "2023-06-08T18:42:34.115Z",
    "questions": [
      {
        "id": 3,
        "text": "Soal ke-1"
      },
      {
        "id": 4,
        "text": "Soal ke-2"
      }
    ],
    "answers": [
      {
        "id": 1,
        "participant": "Nama"
      }
    ]
  }
}
```

#### Error Response

```json
{
  "code": 403,
  "message": "The user does not have access"
}
```

## Get Participant's Answer

Can only be used by `admin` or `author`.

```http
GET /api/training/:trainingId/:answerId
```

Paramater `:trainingId` is `training's id`

Paramater `:answerId` is `answer's id`

#### Authorization

```js
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
```

#### Success Response

```json
{
  "code": 200,
  "message": "Data retrieved",
  "data": {
    "id": 1,
    "participant": "Nama",
    "results": ["Jawaban 1", "Jawaban 2"],
    "trainingId": "777e1d9f-d06e-4397-a75b-f8a544eaaefc",
    "createdAt": "2023-06-08T18:27:17.577Z",
    "updatedAt": "2023-06-08T18:27:17.577Z"
  }
}
```

#### Error Response

```json
{
  "code": 403,
  "message": "The user does not have access"
}
```
