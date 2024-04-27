const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
const { JWT_SECRET, ERROR_CODE } = require("../utils/config");
const User = require("../models/users");
const { SIGN_UP, SIGN_IN } = require("../utils/validation");

router.post("/signup", async (req: Request, res: Response) => {
  const body = req.body;
  const { success } = SIGN_UP.safeParse(body);
  

  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
      errorCode: ERROR_CODE.IncorrectInput,
    });
  }

  // check if username already exists
  const existingUser = await User.findOne({ username: body.username });
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
      errorCode: ERROR_CODE.EmailTake,
    });
  }

  // Create new user
  const user = await User.create(body);
  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  );
  return res.status(200).json({
    message: "User created successfully",
    errorCode: ERROR_CODE.Success,
    token: token,
  });
});

router.post("/signin", async (req: Request, res: Response) => {
  const body = req.body;
  const { success } = SIGN_IN.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
      errorCode: ERROR_CODE.IncorrectInput,
    });
  }

  const user = await User.findOne({
    username: body.username,
  });

  if (!user) {
    return res.status(411).json({
      message: "No Such User exists",
      errorCode: ERROR_CODE.NoUser,
    });
  }

  const verified = await User.verifyPassword(user, body.password);
  if (verified) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    return res
      .status(200)
      .json({ user: user, errorCode: ERROR_CODE.Success, token: token });
  }

  return res.status(411).json({
    message: "Incorrect Password",
    errorCode: ERROR_CODE.IncorrectPassword,
  });
});

router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token").json({ mssg: "Logged Out" });
});

module.exports = router;
