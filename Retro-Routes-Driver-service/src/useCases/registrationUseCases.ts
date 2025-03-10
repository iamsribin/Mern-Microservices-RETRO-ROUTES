import { refferalCode } from "../utilities/referralCode";
import bcrypt from "../services/bcrypt";
import driverRepository from "../repositories/driverRepo";
import { DriverInterface } from "../entities/driver";
import { DriverData} from "../utilities/interface";

const driverRepo=new driverRepository()



export default class registrationUseCase{
    register=async(DriverData:DriverData)=>{
        try {
    
            const {name ,email,mobile ,password ,reffered_code}=DriverData
            const referral_code=refferalCode()
            const hashedPassword=await bcrypt.securePassword(password)
            const newDriver={
                name,
                email,
                mobile,
                password:hashedPassword,
                referral_code
                
            }
            const response=await driverRepo.saveDriver(newDriver)
            if(typeof response !== "string" && response.email){
                return {message: "Success",driverId:response._id};
            }
        } catch (error) {
            
        }
    }
    checkDriver = async(mobile:number)=>{
        try {
            const response = await driverRepo.findDriver(mobile) as DriverInterface
            if (response) {
            // Get the first driver from the array
                if (response.identification) {
                    return { message: "Driver login" };
                } else {
                    return { message: "Driver must fill documents", driverId: response._id };
                }
            
        }
            return "Driver not registered";
        } catch (error) {
            return { message: (error as Error).message };
        }
    }

}