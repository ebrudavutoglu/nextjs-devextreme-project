export interface IName {
  firstname: string;
  lastname: string;
}

export interface IGeoLocation {
  lat: string;
  long: string;
}

export interface IAddress {
  city: string;
  getLocation: IGeoLocation;
  number: number;
  street: string;
  zipcode: string;
}
export interface IUser {
  id: number;
  email: string;
  username: string;
  phone: string;
  name: IName;
  address: IAddress;
  password: string;
}

export interface IUserUpdate {
  id: number | null;
  username: string | null;
  email: string | null;
  password: string | null;
}
