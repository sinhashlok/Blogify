import { INPUT_FORM_CODE, SignInProp, SignUpProp, resType } from "./config";

const checkSignUpValidation = ({
  firstName,
  lastName,
  userName,
  password,
}: SignUpProp): resType => {
  const validFirstName = /^[a-z ,.'-]+$/i.test(firstName);
  const validLastName = /^[a-z ,.'-]+$/i.test(lastName);
  const validUserName = /^[a-z ,.'-]+$/i.test(userName);
  const validPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!firstName) return INPUT_FORM_CODE.Empty_First_Name;
  if (validFirstName !== undefined && !validFirstName)
    return INPUT_FORM_CODE.Invalid_First_Name;
  if (!lastName) return INPUT_FORM_CODE.Empty_Last_Name;
  if (validLastName !== undefined && !validLastName)
    return INPUT_FORM_CODE.Invalid_Last_Name;
  if (!userName) return INPUT_FORM_CODE.Empty_User_Name;
  if (validUserName !== undefined && !validUserName)
    return INPUT_FORM_CODE.Invalid_User_Name;
  if (!password) return INPUT_FORM_CODE.Empty_Passwrod;
  if (validPassword !== undefined && !validPassword)
    return INPUT_FORM_CODE.Invalid_Passwrod;

  return { mssg: "Valid", errorCode: 0 };
};

const checkSignInValidation = ({
  userName,
  password,
}: SignInProp): resType => {
  const validUserName = /^[a-z ,.'-]+$/i.test(userName);
  const validPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!userName) return INPUT_FORM_CODE.Empty_User_Name;
  if (validUserName !== undefined && !validUserName)
    return INPUT_FORM_CODE.Invalid_User_Name;
  if (!password) return INPUT_FORM_CODE.Empty_Passwrod;
  if (validPassword !== undefined && !validPassword)
    return INPUT_FORM_CODE.Invalid_Passwrod;

  return { mssg: "Valid", errorCode: 0 };
};

export { checkSignUpValidation, checkSignInValidation };
