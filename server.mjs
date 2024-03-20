// installed npm packages
import express from 'express';
import morgan from 'morgan';
import log from '@ajar/marker';
// local project modules
import usersRouter from './routers/users.router.mjs';

const { HOST, PORT } = process.env;

//creating the express app
const app = express();

// configuring middlewear on the app level
app.use(morgan('dev'));
app.use(express.json());

// routing
app.use('/api/users',usersRouter);

// error handling
app.use((req,res)=>{
    res.status(404).send(`${req.method}: ${req.url} not found...`);
})

// start the app
app.listen(PORT,HOST, ()=> {
    log.magenta(`listening on:`,`http://${HOST}:${PORT}`);
})