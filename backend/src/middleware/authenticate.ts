const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
import { Request, Response, NextFunction } from "express";
export interface IGetUserAuthInfoRequest extends Request {
  userId: string; // or any other type
}

const authMiddleware = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(403).json({ mssg: err });
  }
};

module.exports = authMiddleware;