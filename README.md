
## Prerequisite

To run this application

* [Install node](https://nodejs.org/en/download/)
* [Install NPM](https://www.npmjs.com/get-npm)
* Clone this repository and install dependancy using following commands:

      $ git clone https://github.com/akulkarnihawk1995/Fetch_Rewards_BE.git
      $ cd Fetch_Rewards_BE
      $ npm install
      $ npm start

* This will start the local server, which will server for endpoints and you'll see a message ```Server is running on port: 5000```

* [Download and Install Postman](https://www.postman.com/)
* Open Postman software for further API testing
* In the Postman Click new Request -> POST 
* For the request body format select raw -> JSON

```http
POST /api/add
```
* For Exmaple ```http://localhost:5000/api/add```

```
{
    "userName":"foo",
    "payer": "D",
    "points":10000,
    "timestamp": "11/2/2021, 2:00:00 PM"
}
```


| Parameter | Type | Description |
| :--- | :--- | :--- |
| `userName` | `string` | **Required**. unique username |
| `payer` | `string` | **Required**. payer for e.g. Dannon |
| `points` | `Number` | **Required**. total points |
| `timetamp` | `string` | **Required**. Timestamp of transaction |



## Status Codes


| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |

