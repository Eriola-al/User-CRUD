export interface GeoLocation {
    lat: string;
    lng: string;
  }
  
  export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: GeoLocation;
  }
  
  export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
  }

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website?: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo?: {
      lat: string;
      lng: string;
    };
  };
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}