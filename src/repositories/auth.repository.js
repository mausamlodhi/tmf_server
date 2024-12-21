import bcrypt from "bcryptjs";
import models from "../model";
import { showConsoleLog } from "../utility/helper";
import jwt from "../utility/jwt";

const { user,mongoose } = models;
export default {
    async checkUserExists(data){
        try{
            const isUser = await user.findOne({email:data?.email});
            return isUser;
        }catch(error){
            showConsoleLog(error);
            throw new Error(error);
        }
    },
    async signUp(data){
        try{
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(data.password,salt);
            data.password = hashPassword;
            const newUser = await user.create(data);
            return newUser;
        }catch(error){
            showConsoleLog(error);
            throw new Error(error);
        }
    },
    async signIn(data){
        try{
            const userData = await user.findOne({email:data?.email});
            if(userData){
                const isPasswordMatch = await bcrypt.compare(data?.password,userData?.password);
                if(isPasswordMatch){
                    const accessToken = jwt.createToken({_id:userData?._id},'1m')
                    const refreshToken = jwt.createToken({_id:userData?._id},"1h");
                    userData.refreshToken = refreshToken;
                    userData.save();
                    return {
                        ...userData?._doc,
                        password:undefined,
                        refreshToken:undefined,
                        accessToken,
                        status:true
                    };
                }else{
                    return {
                        status:false,
                        message:'INVALID_PASSWORD'
                    }
                }
            }else{
                return {
                    status:false,
                    message:"INVALID_EMAIL_OR_PASSWORD"
                }
            }
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }
}