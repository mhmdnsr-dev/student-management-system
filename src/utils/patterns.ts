export const PASSWORD =
  /^(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/;

export const FULLNAME = /^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/;

export const USERNAME = /^[A-Za-z0-9_-]{4,15}$/;
