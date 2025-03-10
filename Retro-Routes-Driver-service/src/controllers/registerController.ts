import registrationUseCases from "../useCases/registrationUseCases";
import { ObjectId } from "mongodb";
import { DriverData, driverImage, identification, locationData, vehicleDatas } from "../utilities/interface";

const registrationUseCase= new registrationUseCases()

export default class registerController{
    register=async(data:DriverData)=>{        
        const {name ,email,mobile ,password ,reffered_code}=data
        const userData={
            name,
            email,
            mobile,
            password,
            reffered_code,
            joiningDate:Date.now()
        }
        try {
            const response=await registrationUseCase.register(userData)
            return (response)
        } catch (error) {
            return({ error: (error as Error).message });
        }
    }
    checkDriver=async(data:{mobile:number})=>{
        const {mobile}=data
        try {
            const response=await registrationUseCase.checkDriver(mobile)
            return(response)
        } catch (error) {
            return({ error: (error as Error).message });
            
        }
        
    }
    
}