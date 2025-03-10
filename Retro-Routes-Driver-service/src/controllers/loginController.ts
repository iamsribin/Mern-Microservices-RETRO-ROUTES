import { Request,Response,NextFunction } from "express";
import loginUseCases from "../useCases/loginUseCases";

const loginUseCase=new loginUseCases()
export default class loginController{
    checkLogin=async(data:{mobile:number})=>{
        try {
            const {mobile}=data
            const response=await loginUseCase.loginCheckDriver(mobile)
            return(response)
        } catch (error) {
            return({ error: (error as Error).message });
            
        }
    }
    checkGoogleLoginDriver=async(data:{email:string})=>{
        try { 
            const {email}=data
            const response=await loginUseCase.checkGoogleLoginDriver(email)
            return(response)
        } catch (error) {
            return({ error: (error as Error).message });
            
        }
    }
    
}