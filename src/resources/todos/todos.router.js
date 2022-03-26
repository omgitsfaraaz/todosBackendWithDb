import { Router } from "express";
import { deleteTodoById, getTodos, patchTodoById, postTodos } from "./todos.controller.js";

export const todosRouter = Router();


todosRouter.route('/')
    .get(getTodos)
    .post(postTodos)

todosRouter.route('/:id')
    .delete(deleteTodoById)
    .patch(patchTodoById)