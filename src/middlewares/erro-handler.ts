import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseErro from "../models/error/databaseerror.model";


function errorHandler(error: any, req: Request, res: Response, next: NextFunction){
    if(error instanceof DatabaseErro){
        res.sendStatus(StatusCodes.BAD_REQUEST);
    }else{
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

export default errorHandler;