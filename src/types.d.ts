type Auth = {
  isAuthenticated: boolean;
  token?: string;
};

type Student = {
  ID: number;
  Name: string;
  Mobile: string;
  Email: string;
  NationalID: string;
  Age: number;
  NameArabic?: string;
  NameEnglish?: string;
  FirstName?: string;
  LastName?: string;
};

type ApiResponse = {
  Data: string | number | boolean | Student[];
  IsAuthorized: boolean;
  Message: string;
  Success: boolean;
};

type _FormControl = {
  type?: string;
  icon?: any;
  name: string;
  initianlValue?: any;
  pattern: {
    value: string | RegExp;
    msg: string;
  };
  placeHolder: string;
  required?: boolean;
};
