import mongodb from "mongodb";


export interface Message {
    message: string ;
  }

  export interface driverData{
    name:string,
    email:string,
    mobile:number,
    driver_id:string
}

export interface DriverData{
  name:string,
  email:string,
  mobile:number,
  password:string,
  reffered_code:string,
}



export interface identification {
  driverId: mongodb.ObjectId;
  aadharID: string;
  licenseID: string;
  licenseImageUrl: string;
  aadharImageUrl: string;
}

export interface Identification {
  driverId: mongodb.ObjectId;
  aadharID: string;
  licenseID: string;
  aadharImageUrl: string;
  licenseImageUrl: string;
}

export interface Registration {
  name: string;
  email: string;
  mobile: number;
  password: string;
  referral_code: string;
}
export interface driverImage{
  driverId:mongodb.ObjectId,
  driverImageUrl:string,
}
export interface DriverImage{
  driverId:mongodb.ObjectId,
  imageUrl: string;
}
export interface vehicleDatas{
  registerationID:string,
  model:string,
  driverId:mongodb.ObjectId,
  rcImageUrl:string,
  carImageUrl:string
}

export interface locationData{
  driverId:mongodb.ObjectId,
  latitude:number,
  longitude:number
}
