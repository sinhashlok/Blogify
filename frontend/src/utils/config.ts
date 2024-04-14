export enum ERROR_CODE {
  Success = 0,
  IncorrectInput = 1,
  EmailTake = 2,
  NoUser = 3,
  IncorrectPassword = 4,
}

export const INPUT_FORM_CODE = {
  Success: { mssg: "Success", errorCode: 0 },
  Empty_First_Name: { mssg: "Enter First Name", errorCode: 11 },
  Empty_Last_Name: { mssg: "Enter Last Name", errorCode: 12 },
  Empty_User_Name: { mssg: "Enter Username", errorCode: 13 },
  Empty_Passwrod: { mssg: "Enter Password", errorCode: 14 },
  Empty_AddBlog_Title: { mssg: "Enter Blog Title", errorCode: 15 },
  Invalid_First_Name: { mssg: "Invalid First Name", errorCode: 21 },
  Invalid_Last_Name: { mssg: "Invalid Last Name", errorCode: 22 },
  Invalid_User_Name: { mssg: "Invalid Username", errorCode: 23 },
  Invalid_Passwrod: { mssg: "Invalid Password", errorCode: 24 },
};

export interface resType {
  mssg: string;
  errorCode: number;
}

export interface SignUpProp {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface SignInProp {
  userName: string;
  password: string;
}
