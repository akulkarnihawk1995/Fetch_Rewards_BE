/**
 * userData_Map is a global data structure that will store every user with their respective transactionObject and points map
 */
const userData_Map = new Map();
const { printUserStore } = require("../utils/helper_func");
/**
 * 
 * @param request  express object
 * @param response express object
 * 
 * Adds transaction_Object Object to the userData_Map which stores transaction_Array and pointMap Map
 * points_Map map contains aggregate total of all the manufactures.
 * http://localhost:5000/api/add
 */
exports.addPoints = (request, response) => {

    const responseBody = {
        status: 200,
        message:"Successfully added user"
      };
    const userName = request.body.userName;
    const transaction_Object = {
      payer: request.body.payer,
      points: request.body.points,
      timestamp: request.body.timestamp,
    };
    
    if (userData_Map.has(userName)) {

        //if global data store already has a username
      const userData = userData_Map.get(userName);
      const pm = userData_Map.get(userName).points_Map;
  
      if (pm.has(transaction_Object.payer)) {
        const oldPoints = pm.get(transaction_Object.payer);
        const updatedPoints = oldPoints + transaction_Object.points;
  
        if (updatedPoints >= 0) {
          userData.transaction_Array.push(transaction_Object);
          pm.set(transaction_Object.payer, updatedPoints);
          /**
           * 
           * Sort the data as per timestamp
           * 
           */
          let data = userData.transaction_Array.sort(function (a, b) {
            return a.timestamp.localeCompare(b.timestamp);
          });

          const newUserObject = {
            transaction_Array: data,
            points_Map: pm,
          };

          userData_Map.set(userName, newUserObject);
        } else {
          responseBody.status = 400
          responseBody.message = {
          error:
            "Insufficient funds",
        };
        }
      } else {
        if (transaction_Object.points > 0) {
            //first push the new item in the array
          userData.transaction_Array.push(transaction_Object);
          pm.set(transaction_Object.payer, transaction_Object.points);
           //Sort the data as per timestamp
          let data = userData.transaction_Array.sort(function (a, b) {
            return a.timestamp.localeCompare(b.timestamp);
          });

           // update the transaction_Array according to timestamp
          const newUserObject = {
            transaction_Array: data,
            points_Map: pm,
          };

          userData_Map.set(userName, newUserObject);
        } else {
            responseBody.status = 400
            responseBody.message = {
            error:
              "Insufficient funds",
          };
        }
      }
    } else {

        //if user does not exists already
      const points_Map = new Map();
      if (transaction_Object.points > 0) {
        points_Map.set(transaction_Object.payer, transaction_Object.points);
        const newUserObject = {
          transaction_Array: [transaction_Object],
          points_Map: points_Map,
        };
  
        userData_Map.set(userName, newUserObject);
      } else {
        responseBody.status = 400
        responseBody.message = {
            error:
              "Insufficient funds",
          };
      }
    }
      response.status(responseBody.status).json({"message":responseBody.message});
      printUserStore(userData_Map);
  };

exports.deductPoints = () => {
}


/**
 * 
 * @param request express object
 * @param response express object
 * 
 * This function retrieves the user's transaction details by his username provided in the URL
 * URL format http://localhost:5000/api/balance/:username
 */


exports.balancePoints = (request, response) => {
    const userName = request.params.username;
    if (userData_Map.has(userName)) {
      const userObject = userData_Map.get(userName);
      const responseList = [];
      for (let [key, value] of userObject.points_Map.entries()){
          responseList.push({ partnerName: key, points: value });
      }
        response.status(200).json({"responseList":responseList});
    } else {
        response.status(400).json({"message":"The user does not exists"});
    }
    response.status(responseBody.status).json(responseBody.json);
  }