// import express from 'express';
import { Router } from 'express';


// const router = express.Router();
const router = Router();


// GET All users
router.get('/',(req,res)=> {
    res.status(200).send('GET All users');
});
// GET user by id
router.get('/:id',(req,res)=> {
    res.status(200).send('GET user by id');
});

// Create new user
router.post('/',(req,res)=> {
    res.status(200).send('Create new user');
})

// Update (replace) user   /api/users/:id
router.put('/:id',(req,res)=> {
    res.status(200).send('Update (replace) user');
})

// Update (merge) user
router.patch('/:id',(req,res)=> {
    res.status(200).send('Update (merge) user');
})

// DELETE user
router.delete('/:id',(req,res)=> {
    res.status(200).send('DELETE user');
})

export default router;