/**
 * userData_Map is a global data structure that will store every user with their respective transactionObject and points map
 */
const userData_Map = new Map();
const { printUserStore, checkBalance, sendDeduction } = require("../utils/helper_func");


/**
 * 
 * @param {*} request express object
 * @param {*} response expres object
 * deductPoints returns the transaction process details. 
 * We have maintained the transaction such that oldest earned
 * transaction gets deleted first.
 */

exports.deductPoints = (request, response) => {
    const userName = request.body.username;
    let deductionAmount = request.body.points;
  
    const responseBody = {
    };
  
    if (userData_Map.has(userName)) {
      const userData = userData_Map.get(userName);
      const pm = userData_Map.get(userName).points_Map;
    //   console.log("userData",userData);
    //   console.log("username",userName);
      const retrived_transaction_Array = userData_Map.get(userName).transaction_Array;
    //   console.log(userData_Map.get(userName).transaction_Array);
      
      console.log("retrived_transaction_Array",retrived_transaction_Array);
  
      const deductionMap = new Map();
      let left_over_points = 0;
      let total = 0;
  
      if(deductionAmount==0){
          response.send(400).json({"error":"deduction amount should be greater than 0"})
      }
      if (checkBalance(userData.points_Map, deductionAmount)) {
        while (deductionAmount !== 0) {

        let points_before = 0;
        let points_after = 0;
          const transaction = retrived_transaction_Array.shift();
          const points = transaction.points;
          const payer = transaction.payer;
  
          left_over_points = deductionAmount - points;
          if (left_over_points >= 0) {
            deductionAmount = deductionAmount - points;
  
            points_before = pm.get(payer);
            pm.set(payer, pm.get(payer) - points);
            points_after = pm.get(payer);
          } else {
            deductionAmount = 0;
            const ts = new Date();
            const newTransaction = {
              payer: payer,
              points: -left_over_points,
              timestamp: ts.toLocaleString(),
            };
            retrived_transaction_Array.push(newTransaction);
            points_before = pm.get(payer);
            pm.set(payer, -left_over_points);
            points_after = pm.get(payer);
          }
        let points_dedcuted = 0;
      if(deductionMap.get(payer)){
        points_dedcuted = deductionMap.get(payer) + (points_after - points_before);
      }
      else{
        points_dedcuted = points_after - points_before;
      }
        deductionMap.set(payer, points_dedcuted);
        }

        responseBody.status = 200;
        responseBody.json = sendDeduction(deductionMap);
        userData_Map.set(userName, userData);
      } else {
        responseBody.status = 400;
        responseBody.json = {
          code: "INSUFFICIENT POINTS",
        };
      }
    } else {
      responseBody.status = 404;
      responseBody.json = {
        code: "USER NOT FOUND",
      };
    }
    if(!responseBody.status){
        responseBody.status  = 200;
        responseBody.message  = "Success";
    }
    response.status(responseBody.status).json(responseBody.message);
}


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

  /**
   * 
   * @param {*} request express object
   * @param {*} response express object
   */



/**
 * 
 * @param request express object
 * @param response express object
 * balancePoints ()
 * This function retrieves the user's transaction details by his username provided in the URL, sends response in JSON format
 * URL format http://localhost:5000/api/balance/:username
 */
exports.balancePoints = (request, response) => {
    const userName = request.params.username;
    if (userData_Map.has(userName)) {
      const userData = userData_Map.get(userName);
      const responseList = [];
      for (let [key, value] of userData.points_Map.entries()){
          responseList.push({ payer: key, points: value });
      }
        response.status(200).json({"responseList":responseList});
    } else {
        response.status(400).json({"message":"The user does not exists"});
    }
    response.status(responseBody.status).json(responseBody.json);
  }