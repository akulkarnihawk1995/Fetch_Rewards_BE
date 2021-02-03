const { app, port } = require("./utils/middleware")

const { addPoints, deductPoints, balancePoints } = require('./routes/api_points');


// add new transaction 
app.post("/api/add", addPoints);

// deduct point from balance 
app.post("/api/deduct", deductPoints);

// get balance according to username
app.get("/api/balance/:username", balancePoints);

//starting the server on the port 5000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});