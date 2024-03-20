import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from "node:url";
// import express from 'express';
import { Router } from 'express';

const __dirname = dirname(fileURLToPath(import.meta.url));

// const router = express.Router();
const router = Router();

const DB_PATH = path.resolve(__dirname , '../data/users.json');
const HTTP_LOG_PATH = path.resolve(__dirname , '../logs/http.log');

async function getUsersFromFile(req,res,next){
    try{
        let users = await fs.readFile(DB_PATH,'utf-8');
        users = JSON.parse(users);
        req.users = users;
        next();
    }catch(err){
        next(err);
    }
}

async function logHTTP(req,res,next){
     await fs.appendFile(
        HTTP_LOG_PATH,
        `${req.method} ${req.originalUrl} ${Date.now()}\n`
        )
    next();
}

router.use(logHTTP);
router.use(getUsersFromFile);

// GET All users
router.get('/', async (req,res)=> {
    res.status(200).json(req.users);
});

// GET user by id
router.get('/:id', async (req,res,next)=> {
    const user = req.users.find(u => u.id === req.params.id);
    res.status(200).json(user);
});

// Create new user
router.post('/', async (req,res)=> {
    res.status(200).send('Create new user');
})

// Update (replace) user   /api/users/:id
router.put('/:id', async (req,res)=> {
    res.status(200).send('Update (replace) user');
})

// Update (merge) user
router.patch('/:id',async (req,res)=> {
    res.status(200).send('Update (merge) user');
})

// DELETE user
router.delete('/:id', async (req,res)=> {
    res.status(200).send('DELETE user');
})

export default router;