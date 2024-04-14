const JWT_SECRET = "0n^P!^c^I$R^al";

enum ERROR_CODE {
  Success = 0,
  IncorrectInput = 1,
  EmailTake = 2,
  NoUser = 3,
  IncorrectPassword = 4,
  CommentFail = 5,
}

module.exports = { JWT_SECRET, ERROR_CODE };
