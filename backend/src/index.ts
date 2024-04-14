const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rootRouter = require("./routes/rootRouter");

const app = express();

mongoose
  .connect(
    "mongodb+srv://shlokjp:wZeJJXewix5HC6B3@cohort0.5ncvfcm.mongodb.net/",
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
