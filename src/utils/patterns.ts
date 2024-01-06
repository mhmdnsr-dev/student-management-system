export const PASSWORD =
  /^(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/;

export const FULLNAME = /^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/;

export const USERNAME = /^[A-Za-z0-9_-]{4,15}$/;

export const EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

export const PHONE = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{10}$/;
