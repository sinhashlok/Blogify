const z = require("zod");

const SIGN_UP = z.object({
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

const SIGN_IN = z.object({
  username: z.string(),
  password: z.string(),
});

const ADD_BLOG = z.object({
  title: z.string(),
  description: z.string(),
  createdByName: z.string(),
  coverImgURL: z.string(),
});

const GET_COMMENTS = z.object({
  blogId: z.string(),
  createdByName: z.string(),
  description: z.string(),
});

module.exports = {
  SIGN_UP,
  SIGN_IN,
  ADD_BLOG,
  GET_COMMENTS,
};
