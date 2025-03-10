import driverReposiory from "../repositories/driverRepo";
import auth from "../middleware/auth";
import { DriverInterface } from "../entities/driver";

const driverRepo=new driverReposiory()


export default class loginUseCase{
    loginCheckDriver= async (mobile: number) => {
        try {
            const response = await driverRepo.findDriver(mobile) as DriverInterface
            console.log(response)
            if (response) {
                if (                
                    response.account_status !== "Pending" &&
                    response.account_status !== "Rejected" &&
                    response.account_status !== "Blocked"&&
                    response.identification
                    ) {
                        const token = await auth.createToken(response._id, '15m');
                        const refreshToken = await auth.createToken(response._id,'7d');
                    return { message: "Success", name: response.name, refreshToken,token, _id:response._id };
                } else if (response.account_status === "Rejected") {
                    return { message: "Rejected", driverId:response._id };
                } else if (response.account_status === "Blocked") {
                    return { message: "Blocked" };
                } else if (!response.identification) {
                    return { message: "Incomplete registration", driverId:response._id };
                } else {
                    return { message: "Not verified" };
                }
            } else return { message: "No user found" };
            
        } catch (error) {
            console.log(error);
            
        }
    }
    checkGoogleLoginDriver= async (email: string) => {
        try {
            const response = await driverRepo.findDriverEmail(email) as DriverInterface
            if (response) {
                if (                
                    response.account_status !== "Pending" &&
                    response.account_status !== "Rejected" &&
                    response.account_status !== "Blocked"&&
                    response.identification
                    ) {
                    const token = await auth.createToken(response._id,'15m');
                    const refreshToken = await auth.createToken(response._id,'7d');
                    return { message: "Success", name: response.name, refreshToken,token, _id:response._id };
                } else if (response.account_status === "Rejected") {
                    return { message: "Rejected", driverId:response._id };
                } else if (response.account_status === "Blocked") {
                    return { message: "Blocked" };
                } else if (!response.identification) {
                    return { message: "Incomplete registration", driverId:response._id };
                } else {
                    return { message: "Not verified" };
                }
            } else return { message: "No user found" };
            
        } catch (error) {
            console.log(error);
            
        }
    }

}