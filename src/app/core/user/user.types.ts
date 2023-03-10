export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  status: string;
  avatar: string;
}

export interface UserSignUpData {
  personId: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}
