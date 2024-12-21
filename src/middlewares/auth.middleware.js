import httpStatus from "http-status";
import repositories from "../repositories";
import { showConsoleLog } from "../utility/helper";

const { authRepository } = repositories;
export default {
    async checkUser(req,res,next){
        try{
            console.log("xoxox",req.body)
            const {
                body:{
                    email
                }
            } = req;
            const result = await authRepository.checkUserExists({email});
            if(result?.email){
                return res.status(httpStatus.BAD_REQUEST).json({
                    status:false,
                    data:null,
                    message:"USER_ALREADY_EXISTS"
                })
            }else{
                next();
            }
        }catch(error){
            showConsoleLog(error);
            throw new Error(error);
        }
    }
}