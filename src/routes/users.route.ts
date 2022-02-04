import { Router, Request, Response, NextFunction } from "express";
import statusCodes, { StatusCodes } from 'http-status-codes';
import DatabaseErro from "../models/error/databaseerror.model";
import userRepo from "../repositories/user.repo";

const  usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction)=> {
    const users = await  userRepo.findAllUsers();
    res.status(statusCodes.OK).send(users);
});

usersRoute.get('/users/:uuid', async (req: Request, res: Response, next: NextFunction)=> {
    try{
   const uuid = req.params.uuid;
   const user = await userRepo.findById(uuid);
   
    res.status(statusCodes.OK).send(user);
}catch(error){
  next(error);
}
});

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction)=> {
    const newUser = req.body;

    const uuid = await userRepo.create(newUser);

    res.status(statusCodes.CREATED).send(uuid);

});

usersRoute.put('/users/:uuid', async (req: Request, res: Response, next: NextFunction)=> {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;

    modifiedUser.uuid = uuid;
    
    await userRepo.update(modifiedUser);

    res.status(statusCodes.OK).send(modifiedUser)
});

usersRoute.delete('/users/:uuid', async (req: Request, res: Response, next: NextFunction)=> {
    const uuid = req.params.uuid; 
    await userRepo.remove(uuid);

    res.sendStatus(statusCodes.OK);
});


export default usersRoute;