const JWT_SECRET = "0n^P!^c^I$R^al";

enum ERROR_CODE {
    Success= 0,
    IncorrectInput= 1,
    EmailTake= 2,
    ErrorSignIn= 3
}

module.exports = { JWT_SECRET, ERROR_CODE };
