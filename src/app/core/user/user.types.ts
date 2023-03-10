export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status?: string;
}

export interface UserSignUpData {
  personId: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
}
