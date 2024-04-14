const express = require("express");
const router = express.Router();
const Comment = require("../models/commnet");
const authMiddleware = require("../middleware/authenticate");
import { Request, Response } from "express";
const { GET_COMMENTS } = require("../utils/validation");
const { ERROR_CODE } = require("../utils/config");

export interface IGetUserAuthInfoRequest extends Request {
  userId: string; // or any other type
  blogId: string;
}

router.post(
  "/",
  authMiddleware,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const body = req.body;

    const comments = await Comment.find({ blogId: body.blogId });

    return res
      .status(200)
      .json({ comments: comments, errorCode: ERROR_CODE.Success });
  }
);

router.post(
  "/addComment",
  authMiddleware,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const body = req.body;

    const { success } = GET_COMMENTS.safeParse(body);

    if (!success) {
      return res.status(411).json({
        message: "There is some Error",
        errorCode: ERROR_CODE.CommentFail,
      });
    }

    await Comment.create({
      userId: req.userId,
      blogId: body.blogId,
      createdByName: body.createdByName,
      description: body.description,
    });

    return res
      .status(200)
      .json({ message: "Submitted", errorCode: ERROR_CODE.Success });
  }
);

module.exports = router;
