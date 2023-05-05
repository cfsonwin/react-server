const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const fs = require('fs');


const config = fs.readFileSync('\config.json', 'utf8');

const uri = `mongodb+srv://${JSON.parse(config).username}:${JSON.parse(config).password}@reactdeno.sjiwadf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverApi: ServerApiVersion.v1 });
const database = client.db("ReactDemo")
const todoList = database.collection("todoList");
const applications = database.collection("applications");

module.exports.getTodoList = async (user) => {
    const query = {"user": user}
    const findResults = todoList.find(query)
    todoList.countDocuments(query,  (err, count) => {
        console.log('there are %d result', count);
      });
    const resultArray = []
    await findResults.forEach(doc => {resultArray.push(doc)})
    return ({
        "status":0, 
        "data": resultArray
    })
}
module.exports.addNewTodo = async (todoItem) => {
    const insertResult = await todoList.insertOne({
        "user": todoItem.user,
        "content": todoItem.content,
        "start-time": todoItem["start-time"],
        "finish-before": todoItem["finish-before"],
        "priority": todoItem.priority,
        "status": todoItem.status
      })
    const newItem = await todoList.findOne({"_id": insertResult.insertedId})
    return ({
        "status":0, 
        "data": newItem
    })
}
module.exports.deleteTodo = async (id, user) => {
    const query = { user: user,
                    "_id": new ObjectId(id)
                }
    const result = await todoList.deleteOne(query);
    todoList.countDocuments(query,  (err, count) => {
        console.log('there are %d result', count);
      });

    return result.deletedCount  
}

module.exports.getApplications = async (user) => {
    const query = {user:user, status: {$ne: 2}}
    const result = applications.find(query)
    const resultArray = []
    for await (const doc of result) {
        resultArray.push(doc)
      }
    return ({
        "status":0, 
        "data": resultArray
    })
}

module.exports.createApplications = async (data) => {
    console.log(data.card.image);
    const insertResult = await applications.insertOne({
        "card": {
            "isrc": data.card.isrc,
            "title": data.card.title,
            "company": data.card.company,
            "avatar": data.card.avatar,
            "status": data.card.status
        },
        "infos": data.infos,
        "user": data.user
      })
    const newItem = await applications.findOne({"_id": insertResult.insertedId})
    return ({
        "status":0, 
        "data": newItem
    })
}

module.exports.updateCardSt = async (id, action, newSt) => {
    const query = {"_id": new ObjectId(id)}
    if(action === "updateSt"){
        await applications.updateOne(
            query,
            { $set: { "card.status": newSt } }
        );
        return ({
            "status":0, 
        })
    }
    return ({
        "status":1, 
    })
}


module.exports.getDetails = async (id) => {
    const query = {"_id": new ObjectId(id)}
    const result = await applications.findOne(query)
    return ({
        "status":0, 
        "data": {
            header: result.card.company,
            body: result.infos
        }
    })
}

module.exports.updateDetails = async (id, updates) => {
    const query = {"_id": new ObjectId(id)}
    await applications.updateOne(
        query,
        { $set: { "infos": updates } }
      );
    
    return ({
        "status":0, 
    })
}


