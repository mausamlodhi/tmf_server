import { Router } from "express";
import authRoutes from "./auth.route"
const router = Router();
const register = (app)=>{
    app.use(router);
    app.use('/api',[
        authRoutes,
    ]);
    app.use((err,req,res,next)=>{
        if(err){
            res.status(500).json({
                success:false,
                message:res.__('INTERNAL_SERVER_ERROR'),
                error:err,
                data:null
            })
        }
    })
};
export default register;