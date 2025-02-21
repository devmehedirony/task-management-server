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

  
    



  } finally {

  }
}
run().catch(console.dir);