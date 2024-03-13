import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import todosRoutes from "./routes/todos.routes.js"



// Create express app
const app = express();

// Apply middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors ());

// Use routes

app.use(todosRoutes);

// Listen for incoming requests
app.listen(4000, ()=> {
    console.log("Express app is running!");
});

