import Driver, { DriverInterface } from "../entities/driver";
import {Registration} from "../utilities/interface";




export default class driverRepository{
    saveDriver=async(DriverData:Registration) :Promise<DriverInterface | string>=>{
        try {
            const newDriver=new Driver({
                name:DriverData.name,
                email:DriverData.email,
                mobile:DriverData.mobile,
                password:DriverData.password,
                referral_code:DriverData.referral_code,
                joiningDate:Date.now(),
                identification:false
            })
            const saveDriver : DriverInterface=await newDriver.save() as DriverInterface
            return saveDriver
        } catch (error) {
            return (error as Error).message;

        }
    }
    findDriver=async (mobile:number):Promise<DriverInterface |string>=>{
        try {
            const driverData :DriverInterface=await Driver.findOne({mobile:mobile}) as DriverInterface
            return driverData
        } catch (error) {
            return (error as Error).message;
        }
    }
    getDriverData=async (driver_id:string):Promise<DriverInterface |string>=>{
        try {
            const driverData:DriverInterface=await Driver.findOne({_id:driver_id}).sort({date:1}) as DriverInterface
            return driverData
        } catch (error) {
            return (error as Error).message;

        }
    }
    findDriverEmail=async (email:string):Promise<DriverInterface |string>=>{
        try {
            const driverData:DriverInterface=await Driver.findOne({email:email}) as DriverInterface
            return (driverData)
        } catch (error) {
            return (error as Error).message;

        }
    }
}