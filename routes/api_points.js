/**
 * userData_Map is a global data structure that will store every user with their respective transactionObject and points map
 */
const userData_Map = new Map();



/**
 * 
 * @param request  express object
 * @param response express object
 * 
 * Adds transaction_Object Object to the userData_Map which stores transaction_Array and pointMap Map
 * points_Map map contains aggregate total of all the manufactures.
 */
exports.addPoints = (request, response) => {

    
    const userName = request.body.userName;
    const transaction_Object = {
      payer: request.body.payer,
      points: request.body.points,
      timestamp: request.body.timestamp,
    };
    const responseBody = {
        status:200,
        message:"Success"
    };
    if (userData_Map.has(userName)) {
        
    } else {
      const points_Map = new Map();
      if (transaction_Object.points < 0) {
        points_Map.set(transaction_Object.payer, transaction_Object.points);
        const newUserObject = {
          transaction_Array: [transaction_Object],
          points_Map: points_Map,
        };
  
        userData_Map.set(userName, newUserObject);
      } else {
        responseBody.status = 400;
            responseBody.json = {
            "error": "REQUEST FAILED",
            "errorinfo":"Insufficient Point",
        };
      }
    }
    response.status(responseBody.status).json(responseBody.json);
  };

exports.deductPoints = () => {
}
exports.balancePoints = (request, response) => {
}