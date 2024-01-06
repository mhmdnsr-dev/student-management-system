import { EMAIL, FULLNAME, PASSWORD, PHONE, USERNAME } from './patterns';

export const nameControl: _FormControl = {
  name: 'Name',
  pattern: {
    value: FULLNAME,
    msg: 'Full name must having atleast three character',
  },
  placeHolder: 'Name',
};
export const firstNameControl: _FormControl = {
  name: 'FirstName',
  pattern: {
    value: FULLNAME,
    msg: 'First name must having atleast three character',
  },
  placeHolder: 'First Name',
};
export const lastNameControl: _FormControl = {
  name: 'LastName',
  pattern: {
    value: FULLNAME,
    msg: 'Last name must having atleast three character',
  },
  placeHolder: 'Last Name',
};

export const usernameControl: _FormControl = {
  name: 'Username',
  pattern: {
    value: USERNAME,
    msg: '+3 to 15 alphanumeric string that may include _ and -',
  },
  placeHolder: 'Username',
};
export const emailControl: _FormControl = {
  name: 'Email',
  pattern: {
    value: EMAIL,
    msg: 'This email is invalid',
  },
  placeHolder: 'Email',
};

export const passwordControl: _FormControl = {
  name: 'Password',
  pattern: {
    value: PASSWORD,
    msg: '8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special',
  },
  placeHolder: 'Password',
  type: 'password',
};

export const rePasswordControl: _FormControl = {
  name: 'rePassword',
  pattern: {
    value: PASSWORD,
    msg: '8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special',
  },
  placeHolder: 'Re-password',
  type: 'password',
};

export const mobileControl: _FormControl = {
  name: 'Mobile',
  pattern: {
    value: PHONE,
    msg: 'Phone number in this pattern "+(20)1234567890"',
  },
  placeHolder: 'Phone Number',
  type: 'tel',
};

export const nationalIDControl: _FormControl = {
  name: 'NationalID',
  pattern: {
    msg: 'The national ID must be 14 numbers',
    value: /^[1-9]{14}$/,
  },
  placeHolder: 'NationalID',
};

export const ageControl: _FormControl = {
  name: 'Age',
  pattern: {
    msg: 'Must be over 17 years old',
    value: /^(1[89]|[2-9]\d)$/,
  },
  placeHolder: 'Age',
  type: 'number',
};
