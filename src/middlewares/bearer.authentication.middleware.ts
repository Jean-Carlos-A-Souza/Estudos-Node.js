import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/error/forbidden.error.model";
import userRepo from "../repositories/user.repo";
import  JWT from "jsonwebtoken";

async function bearerAuthenticationMiddleware(req: Request, res: Response, next: NextFunction){

    try{
        const authorizationHeader = req.headers['authorization'];
        if(!authorizationHeader){
            throw new ForbiddenError('Credenciais não Informadas')
        }

        const[authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Bearer' || !token){
            throw new ForbiddenError('Tipo de Authenticação Invalida');
        }

        const tokenPayload = JWT.verify(token, 'my_secret_key');


        if(typeof tokenPayload !== 'object' || !tokenPayload.sub){
            throw new ForbiddenError("Token Invalido");
        }

        const user = {
            uuid: tokenPayload.sub,
            username: tokenPayload.username,
        };
        
        req.user = user;

        next();
    }catch(error){
        next(error);
    }

}

export default bearerAuthenticationMiddleware;