import { Router } from "express";
import {MongoClient} from "mongodb"
import dotenv from "dotenv";

dotenv.config({ path: ['.env.local']});

const router = Router(); 
const url = process.env.MONGO_URI;
const client = new MongoClient (url);
const todoDb = 'todo-db';
const todoCollection = 'todos';

// Define routes 
router.post('/todos', async (req, res) => {
    // Connect mongodb
    await client.connect();
    // Get access to todo database
    const db = client.db('todoDb');
    // Get access to todos collection
    const collection = db.collection('todoCollection');
    // Add todo document to todos collection
    const result = await collection.insertOne({
        ...req.body, 
        isCompleted: false,
        createdAt: new Date()
    });
    // Disconnect mongodb client
    await client.close();
    //return response
    res.json(result);
})


// Define routes 
router.get('/todos', async (req, res) => {
    // Connect mongodb
    await client.connect();
    // Get access to todo database
    const db = client.db('todoDb');
    // Get access to todos collection
    const collection = db.collection('todoCollection');
    // find all todos from todos collection
    const limit = parseInt (req.query.limit) || 10;
    const result = await collection.find({}).limit(limit).toArray();
console.log('Found documents =>', result);
    // Disconnect mongodb client
    await client.close();
    //return response
    res.json(result);
})

// Define routes 
router.delete('/todos', async (req, res) => {
    // Connect mongodb
    await client.connect();
    // Get access to todo database
    const db = client.db('todoDb');
    // Get access to todos collection
    const collection = db.collection('todoCollection');
     // delete all todos from todos collection
    const result = await collection.deleteMany({});
    // Disconnect mongodb client
    await client.close();
    //return response
    res.json(result);
});





router.get('/todos', (req, res) => {
    res.send('Get all todos!');
})

router.delete('/todos', (req, res) => {
    res.send('Delete all todos!');
})

router.get('/todos/:id', (req, res) => {
    res.send(`Get todo with id: ${req.params.id}`);
})

router.patch('/todos/:id', (req, res) => {
    res.send(`Update todo with id: ${req.params.id}`);
})


// Export routes


export default router;


