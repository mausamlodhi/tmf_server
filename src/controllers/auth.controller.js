import httpStatus from "http-status";
import repositories from "../repositories";
const { authRepository } = repositories;

export default {
    async userSignup(req,res,next){
        try{
            const {
                body:{
                    firstName,
                    lastName,
                    email,
                    password,
                    phoneNumber,
                    profileImage
                }
            } = req;
            const signupData = {
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                profileImage
            };
            const result = await authRepository.signUp(signupData);
            if(result){
                return res.status(httpStatus.OK).json({
                    status:true,
                    data:result?.data,
                    message:result?.message
                })
            }else{
                return res.status(httpStatus.BAD_REQUEST).json({
                    status:false,
                    data:result?.data,
                    message:result.message
                })
            }
        }catch(error){
            console.log("error   ,",error)
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message:'INTERNAL_SERVER_ERROR',
                data:null,
                error,
                status:false
            })
        }
    },
    async userSignin(req,res,next){
        try{
            const {
                body:{
                    password,
                    email
                }
            } = req;
            const loginData = {
                email,
                password
            };
            const result = await authRepository.signIn(loginData);
            if(result?.status){
                return res.status(httpStatus.OK).json({
                    status:true,
                    data:result,
                    message:'LOGIN_SUCCESS'
                })
            }else{
                return res.status(httpStatus.BAD_REQUEST).json({
                    status:false,
                    data:result?.data,
                    message:result.message
                })
            }
        }catch(error){
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message:'INTERNAL_SERVER_ERROR',
                data:null,
                error,
                status:false
            })
        }
    }
}