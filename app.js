const express = require("express");
const cors = require("cors")
const mongodbConnection = require("./mongodbConnection")
const app = express();
// const loginCheck = mongodbConnection.loginCheck()
 
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/todoList", (req, res)=>{
    const {user} = req.query
    mongodbConnection.getTodoList(user).then(
        data=>res.json(data),
        reason=>console.log(reason)
    )
})
app.post("/todoList", (req, res)=>{
    mongodbConnection.addNewTodo(req.body).then(
        data=>res.json(data),
        reason=>console.log(reason)
    )
})
app.delete('/todoList/:user/:id', (req, res) => {
    const {id, user} = req.params;
    mongodbConnection.deleteTodo(id, user).then(
        data=>data===1?res.status(204).send():res.status(404).send(),
        reason=>console.log(reason)
    )
});

app.get('/applications/:user', (req, res)=>{
    const {user} = req.params
    mongodbConnection.getApplications(user).then(
        data => res.status(200).send(data)
    )
})

app.get("/applications/:user/details/:id", (req, res)=>{
    const {user, id} = req.params
    mongodbConnection.getDetails(id).then(
        data => res.status(200).send(data)
    )
})

app.put("/applications/:user/details/:id", (req, res)=>{
    const {user, id} = req.params
    mongodbConnection.updateDetails(id, req.body.data).then(
        () => res.status(200).send()
    )
})


app.listen("5001",()=>{
    console.log("Server start at localhost://5001");
});