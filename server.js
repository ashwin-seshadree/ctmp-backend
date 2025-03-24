const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config({ path: `${process.env.NODE_ENV}.env` });

app.use(morgan("dev"));
app.use(express.json());
app.use(require("./src/middlewares/auth.mw"));
app.use("/api", require("./src/routes"));

const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(
    `Running in environment: ${process.env.NODE_ENV}, port: ${port}`
  );
});
