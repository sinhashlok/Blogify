const express = require("express");
const router = express.Router();

// Routers
const userRouter = require("./userRouter");
const blogRouter = require("./blogRouter");

router.use("/user", userRouter);
router.use("/blog", blogRouter);

module.exports = router;
