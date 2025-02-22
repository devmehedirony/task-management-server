require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  res.send('Server is starting...')
})

app.listen(port, () => {
  console.log(`port is starting...${port}`);
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@rony.exuff.mongodb.net/?retryWrites=true&w=majority&appName=rony`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {

    const usersCollections = client.db("taskUsers").collection('users')
    const todoCollections = client.db("allTodos").collection('todos')
    const progressCollections = client.db("allProgress").collection('progress')
    const doneCollections = client.db("taskDone").collection('dones')

  
    // post apis

    app.post('/users', async (req, res) => {
      const user = req.body
      const query = { email: user.email }
      const isExits = await usersCollections.findOne(query)
      if (isExits) {
        return res.send({message: 'user already exits', insertedId: null})
      }
      const result = await usersCollections.insertOne(user)
      res.send(result)
    })

    app.post('/todos', async (req, res) => {
      const todo = req.body
      const result = await todoCollections.insertOne(todo)
      res.send(result)
    })


    // get apis

    app.get('/todos', async (req, res) => {
      const result = await todoCollections.find().toArray()
      res.send(result)
    })

    








  } finally {

  }
}
run().catch(console.dir);