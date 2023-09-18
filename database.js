import mysql from "mysql2"

import dotenv from "dotenv"

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD
}).promise();


export async function getUsers() {
    const result = await pool.query('SELECT * FROM users');
    return result[0];
}

export async function getUser(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    //! why are we using ? instead of ${id}?
    //? because we want to prevent SQL injection
    return result[0];
}

export async function createUser(username, password) {
    const result = await pool.query(`
    INSERT INTO users (username,password)
    VALUES (?,?)`
        , [username, password])


    const id = result[0].insertId;
    return getUser(id);
}

export async function updateUser(id, username, password) {
    const result = await pool.query(`
    UPDATE users
    SET username = ?, password = ?
    WHERE id = ?`
        , [username, password, id])
    return getUser(id);
}

export async function deleteUser(id) {
    const result = await pool.query(`
    DELETE FROM users
    WHERE id = ?`
        , [id])
    return result[0].affectedRows > 0;
}

export async function deleteAllUsers() {
    const result = await pool.query(`
    DELETE FROM users`)
    return result[0].affectedRows > 0;
}

// const result = await createUser('user1', 'pass1');
// console.log(result);
// const users = await getUsers();
// const user = await getUser(100);
// console.log(user);