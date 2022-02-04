
import express, {Request, Response, NextFunction } from 'express';
import errorHandler from './middlewares/erro-handler';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(usersRoute);

app.use(statusRoute);

app.use(errorHandler);


app.listen(3000, () =>{
    console.log('Aplicação executando na porta 3000!!!');
});