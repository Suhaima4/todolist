const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
const dotenv = require('dotenv')

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()



const PORT = process.env.PORT;
const url = process.env.Database_URL;

mongoose.connect(url);
app.get('/get',(req,res) => {
    
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})



app.post('/add',(req,res) => {
    const task = req.body.task;
    TodoModel.create({
        task:task
    })
    .then(result => res.json(result))
    .catch(err => res.json(err))
})



app.put('/update/:id',(req,res)=>{
    const {id} =req.params;
    TodoModel.findByIdAndUpdate({_id:id},{done :true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


app.delete('/delete/:id',(req,res)=>{
    const {id} =req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);


});