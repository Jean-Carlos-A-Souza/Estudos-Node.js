import { NextFunction, Request, Response, Router} from "express";
import ForbiddenError from "../models/error/forbidden.error.model";
import userRepo from "../repositories/user.repo";
import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddlaware from "../middlewares/basic-authentication-middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddlaware, async (req: Request, res: Response, next:NextFunction) => {

    try{

    const user = req.user;        
    
    if(!user){
        throw new ForbiddenError("Usuario não Informado ! ")
    }

    const jwtPayLoad = {username: user?.username}
    const jwtOptions = {subject: user?.uuid}
    const secretKey = 'my_secret_key'
    
    const jwt = JWT.sign(jwtPayLoad, secretKey, jwtOptions);
    res.status(StatusCodes.OK).json({token: jwt});


    }catch(error){
        next(error);
    }
    
});

export default authorizationRoute;