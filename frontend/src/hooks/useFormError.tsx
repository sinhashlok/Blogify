import { resType as ErrorType, INPUT_FORM_CODE } from "../utils/config";

const errorMssg = (error: ErrorType, id: number): string => {
  switch (error.errorCode) {
    case 0:
      return "";
    case 11:
      return id === 1 ? INPUT_FORM_CODE.Empty_First_Name.mssg : "";
    case 12:
      return id === 2 ? INPUT_FORM_CODE.Empty_Last_Name.mssg : "";
    case 13:
      return id === 3 ? INPUT_FORM_CODE.Empty_User_Name.mssg : "";
    case 14:
      return id === 4 ? INPUT_FORM_CODE.Empty_Passwrod.mssg : "";
    case 15:
      return id === 5 ? INPUT_FORM_CODE.Empty_AddBlog_Title.mssg : "";
    case 21:
      return id === 1 ? INPUT_FORM_CODE.Invalid_First_Name.mssg : "";
    case 22:
      return id === 2 ? INPUT_FORM_CODE.Invalid_Last_Name.mssg : "";
    case 23:
      return id === 3 ? INPUT_FORM_CODE.Invalid_User_Name.mssg : "";
    case 24:
      return id === 4 ? INPUT_FORM_CODE.Invalid_Passwrod.mssg : "";
    default:
      return "";
  }
};

export default errorMssg