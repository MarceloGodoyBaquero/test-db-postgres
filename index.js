const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db')

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create a todo
app.post('/todos', async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]);
        res.json(newTodo.rows[0])
    } catch (e) {
       console.log(e.message)
        res.json({error: e.message})
    }
})

//get all todo

app.get('/todos', async(req, res) =>{
    try {
        const showTodo = await pool.query("SELECT * FROM todo");
        res.json(showTodo.rows)
    } catch (e) {
        console.log(e.message)
        res.json({error: e.message})
    }
})

//update a todo

// delete a todo


app.listen(5000, () => {
    console.log('Server started on port 5000')
});