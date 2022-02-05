import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/error/forbidden.error.model";
import userRepo from "../repositories/user.repo";

export default async function basicAuthenticationMiddlaware(req: Request, res: Response, next: NextFunction){

    try{
        const authorizationHeader = req.headers['authorization'];

        if(!authorizationHeader){
            throw new ForbiddenError('Credenciais não Informada');
        }
    
        const [authenticationType, token] = authorizationHeader.split(' ');
    
        if(authenticationType !== 'Basic' || !token){
            throw new ForbiddenError('Tipo de Authenticação Invalida');
        }
    
        const tokenContent = Buffer.from(token, 'base64').toString('utf-8')
    
        const [username, password] = tokenContent.split(':');
    
        if(!username || !password){
            throw new ForbiddenError('Credencias Invalidas')
        }
    
        const user = await userRepo.findByUsernameAndPassword(username, password);
        console.log(user);
    
        if(!user){
            throw new ForbiddenError('Usuario ou senha Invalido');
        }

        req.user = user;
        next();

    }catch(error){
        next(error);
    }

}