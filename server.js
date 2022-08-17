const express = require("express");
const studentsRoute = require("./src/student/routes");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/api/v1/students", studentsRoute);

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
