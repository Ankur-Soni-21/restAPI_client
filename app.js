import express from 'express';

import {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    deleteAllUsers
} from './database.js';

const app = express();

app.use(express.json());
//this is to parse the body of the request

//getting all users
app.get('/users', async (req, res) => {
    const users = await getUsers();
    res.json(users);
})

// getting a user by id
app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await getUser(id);
    res.send(user);
})

//creating a user
app.post('/users', async (req, res) => {
    const { username, password } = req.body;
    const user = await createUser(username, password);
    res.status(201).send(user);
})

//updating a user
app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const { usernameToUpdate, passwordToUpdate } = req.body;
    const user = await updateUser(id, usernameToUpdate, passwordToUpdate);
    res.send(user);
})

//deleting a user
app.delete('/users/:id', async (req, res) => {
    const idToDelete = req.params.id;
    const success = await deleteUser(idToDelete);
    if (success) {
        res.send(success);
    } else {
        res.sendStatus(404);
    }
})

//deleting all users
app.delete('/users', async (req, res) => {
    const success = await deleteAllUsers();
    if (success) {
        res.send(success);
    } else {
        res.sendStatus(404);
    }
})

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something broke!');
})

app.listen(8080, () => {
    console.log('Server is listening on port 8080');
})