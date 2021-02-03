/**
 * 
 * @param {Map} userData_Map 
 * this functions print userData_Map after 
 * user getting added to the queue
 * 
 */
const printUserStore = (userData_Map) => {
    for (let [key, value] of userData_Map.entries()) {
      console.log("Key: " , key);

      console.log(value);
    }
  };
const checkBalance = (points_Map, deductionAmount) => {
  let total = 0;
  for (let [key, value] of points_Map.entries()) total = total + value;
  return total >= deductionAmount;
};
const sendDeduction = (deductionMap) => {
    let responseList = [];
    for (let [key, value] of deductionMap.entries()) {
      responseList.push({ [key]: value });
    }
    return responseList;
  };
  
  module.exports = {
    printUserStore,
    checkBalance,
    sendDeduction
  };