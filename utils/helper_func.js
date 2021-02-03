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

  module.exports = {
    printUserStore
  };