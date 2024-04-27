const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rootRouter = require("./routes/rootRouter");
require('dotenv').config();

const app = express();

mongoose
  .connect(
    process.env.MONGODB_URL,
    {
      dbName: "blogify",
    }
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err: Error) => {
    console.log("Error", err);
  });

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use("/blogify", rootRouter);

const PORT: number = 8000;
app.listen(PORT, (): void => {
  console.log(`Server started on port: ${PORT}`);
});
