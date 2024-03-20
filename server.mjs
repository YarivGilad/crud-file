// built in Node.js modules
import path, { dirname } from 'node:path';
import { fileURLToPath } from "node:url";
import fs from 'node:fs/promises';
// installed npm packages
import express from 'express';
import morgan from 'morgan';
import log from '@ajar/marker';
// local project modules
import usersRouter from './routers/users.router.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const { HOST, PORT } = process.env;
const ERRORS_LOG_PATH = path.resolve(__dirname , './logs/errors.log');

//creating the express app
const app = express();

// configuring middlewear on the app level
app.use(morgan('dev'));
app.use(express.json());

// routing
app.use('/api/users',usersRouter);

// error handling
app.use((req,res)=> {
    res.status(404).send(`${req.method}: ${req.url} not found...`);
})

app.use(async (err,req,res,next)=> {
    await fs.appendFile(
        ERRORS_LOG_PATH,
        `${req.method} ${req.originalUrl} ${Date.now()}\n\t${err.message}\n`
        )
    res.status(500).send('Something went wrong... Internal server error...')
})

// start the app
app.listen(PORT,HOST, ()=> {
    log.magenta(`listening on:`,`http://${HOST}:${PORT}`);
})