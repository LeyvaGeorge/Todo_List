require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//Middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//Create a todo
app.post("/todos", async (req,res) => {
    try {
        const { task, description }  = req.body;
        const newTodo = await pool.query(`INSERT INTO todo (task, description) VALUES ($1,$2) RETURNING *`,[task,description]);
        res.json(newTodo);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Todos
app.get("/todos", async (req,res) => {
    try{
       const allTodos = await pool.query("SELECT * FROM todo"); 
       res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Get a todo
app.get("/todos/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(`SELECT * FROM todo WHERE todo_id = ${id}`);

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Update a todo
app.put ("/todos/:id" , async (req,res) => {
    try {
        const { id } = req.params;
        const { task, description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET task= $1, description = $2 WHERE todo_id = $3",
            [task, description, id]
        );
        res.json("todo was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

//Delete a todo
app.delete("/todos/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            `DELETE FROM todo WHERE todo_id = ${id}`
        )
        res.json(`Todo was deleted!`)
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server has started on port: ${process.env.PORT}`);
});
