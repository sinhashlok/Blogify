const express = require("express");
const router = express.Router();
const Blogs = require("../models/blog");
const authMiddleware = require("../middleware/authenticate");
import { Request, Response } from "express";
export interface IGetUserAuthInfoRequest extends Request {
  userId: string; // or any other type
}
const { ADD_BLOG } = require("../utils/validation");
const { ERROR_CODE } = require("../utils/config");

router.get(
  "/",
  authMiddleware,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const id = req.query.id;
    if (id) {
      const blog = await Blogs.findById(id);

      return res
        .status(200)
        .json({ blog: blog, errorCode: ERROR_CODE.Success });
    } else {
      const blog = await Blogs.find({});

      return res.status(200).json({
        user: req.userId,
        blogs: blog,
      });
    }
  }
);

router.post(
  "/addBlog",
  authMiddleware,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const body = req.body;

    const { success } = ADD_BLOG.safeParse(body);

    if (!success) {
      return res.status(411).json({
        message: "Please add Title / Description",
        errorCode: ERROR_CODE.IncorrectInput,
      });
    }

    const blog = await Blogs.create({
      userId: req.userId,
      title: body.title,
      description: body.description,
      createdByName: body.createdByName,
      coverImgURL: body.coverImgURL,
    });

    return res.status(200).json({
      id: blog._id,
      message: "Blog Added",
      errorCode: ERROR_CODE.Success,
    });
  }
);

module.exports = router;
