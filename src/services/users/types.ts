export interface IGetUsersResponse {
  address: IAddress;
  id: number;
  email: string;
  username: string;
  password: string;
  name: IName;
  phone: string;
  __v: number;
}

export interface IGetUserByIdResponse {
  address: IAddress;
  id: number;
  email: string;
  username: string;
  password: string;
  name: IName;
  phone: string;
}

export interface IAddress {
  geolocation: IGeolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

export interface IGeolocation {
  lat: string;
  long: string;
}

export interface IName {
  firstname: string;
  lastname: string;
}
