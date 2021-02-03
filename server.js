const { app, port } = require("./utils/middleware")


//starting the server on the port 5000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });