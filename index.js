import express from 'express';
import bodyParser from 'body-parser';
import { todosRouter } from './src/resources/todos/todos.router.js';
import { sequelize } from './src/utils/db-connection.js';
import { Todo } from './src/resources/todos/todos.module.js';
import cors from 'cors';

// Instance
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json())
app.use('/api/todos', todosRouter)

// Port
const startServer = () => {
    sequelize.sync()
    sequelize.authenticate()
        .then(() => {
            console.log('Connected to Database');
            app.listen(3001, () => console.log('Server started on PORT 4000'))
        })
        .catch((e) => console.log('Connection error', e))
}
startServer();