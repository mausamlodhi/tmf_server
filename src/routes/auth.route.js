import { Router } from "express";
import controllers from "../controllers"
import middlewares from "../middlewares";
import validations from "../validations";
import authMiddleware from "../middlewares/auth.middleware";

const { authController } = controllers;
const { validateMiddlware } = middlewares
const { authValidations } = validations
const router = Router();

router.post('/signup',
    // validateMiddlware({
    //     schema:authValidations.createUserSchema
    // }),
    authMiddleware.checkUser,
    authController.userSignup
);
    
router.post('/sigin',authController.userSignin)

export default router;