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
    const taskCollections = client.db("allTasks").collection('tasks')

  
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

    app.post('/tasks', async (req, res) => {
      const task = req.body
      const result = await taskCollections.insertOne(task)
      res.send(result)
    })


    // get apis

    app.get('/tasks', async (req, res) => {
      const { category } = req.query
      
      if (category == 'TODO') {
        const query = { category: 'TODO' }
        const result = await taskCollections.find(query).toArray()
        return res.send(result)
      }

      if (category == 'PROGRESS') {
        const query = { category: 'PROGRESS' }
        const result = await taskCollections.find(query).toArray()
        return res.send(result)
      }

      if (category == 'DONE') {
        const query = { category: 'DONE' }
        const result = await taskCollections.find(query).toArray()
        return res.send(result)
      }


      const result = await taskCollections.find().toArray()
      res.send(result)
    })

    app.get('/task/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await taskCollections.findOne(query)
      res.send(result)
    })

    // Update
    app.patch('/task/:id', async (req, res) => {
      const id = req.params.id
      const update = req.body
      const query = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          title: update.title,
          description: update.description,
          category: update.category,
        }
      }
      const result = await taskCollections.updateOne(query, updatedDoc)
      res.send(result)
    })


    // delete
    app.delete('/task/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await taskCollections.deleteOne(query)
      res.send(result)
    })

    








  } finally {

  }
}
run().catch(console.dir);