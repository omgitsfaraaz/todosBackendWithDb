import { Todo } from './todos.module.js';

export const todosResBuilder = (success, data, error) => {
    return {
        success, data, error
    }
}

export const getTodos = (req, res) => {
    Todo.findAll({ raw: true })
        .then((todos) => {
            res.status(200).json(todosResBuilder(true, { todos }, null))
        })
        .catch((e) => res.status(400).json(todosResBuilder(false, null, e)))
}

export const postTodos = (req, res) => {
    const title = (req.body.title)
    if (!title) {
        res.status(400).json(todosResBuilder(false, null, 'Title field is required'))
    } else {
        Todo.create({ title })
            .then((todo) => res.status(201).json(todosResBuilder(true, { todo }, null)))
            .catch((e) => res.status(400).json(todosResBuilder(false, null, e)))
    }
}

export const deleteTodoById = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json(todosResBuilder(false, null, 'Id not found in params'))
    } else {
        Todo.findByPk(id)
            .then((todo) => {
                if (todo) {
                    Todo.destroy({ where: { id: id } })
                    res.status(200).json(todosResBuilder(true, { todo }, null))
                } else {
                    res.status(400).json(todosResBuilder(false, null, `Todo with ${id} does not exist`))
                }
            })
            .catch(e => res.status(400).json(todosResBuilder(false, null, e)))
    }
}

export const patchTodoById = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json(todosResBuilder(false, null, 'Id not found in params'))
    } else {
        Todo.findByPk(id)
            .then((todo) => {
                if (todo) {
                    // Todo.destroy({ where: { id: id } })
                    Todo.update(
                        { 
                            title: req.body.title == undefined ? todo.title : req.body.title, 
                            completed: req.body.completed == undefined ? todo.completed : req.body.completed, 
                        },
                        { where: { id: id } }
                    )
                    res.status(200).json(todosResBuilder(true, `Todo with id ${id} updated successfully`, null))
                } else {
                    res.status(400).json(todosResBuilder(false, null, `Todo with ${id} does not exist`))
                }
            })
            .catch(e => res.status(400).json(todosResBuilder(false, null, e)))
    }
}