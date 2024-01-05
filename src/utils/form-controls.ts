import { FULLNAME, PASSWORD, USERNAME } from './patterns';

export const nameControl: _FormControl = {
  name: 'Name',
  pattern: {
    value: FULLNAME,
    msg: 'Full name must having atleast three character',
  },
  placeHolder: 'Name',
};

export const usernameControl: _FormControl = {
  name: 'Username',
  pattern: {
    value: USERNAME,
    msg: '+3 to 15 alphanumeric string that may include _ and -',
  },
  placeHolder: 'Username',
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
