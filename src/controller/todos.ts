import { RequestHandler } from 'express';
import Todo from '../model/todo';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res) => {
  // Step 1: Type check
  if (!req.body.text || typeof req.body.text !== 'string') {
    return res.status(400).json({ message: 'invalid type' });
  }

  // Step 2: Add the todo to data base
  const { text } = req.body as {text: string};
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);

  // Step 3: Return response
  return res.status(200).json({ message: 'successfully created todo', value: newTodo });
};

export const getTodo: RequestHandler = (req, res) => {
  res.status(200).send({ todos: TODOS });
};

export const editTodo: RequestHandler<{id: string}> = (req, res) => {
  // Step 1: Get the id
  const { id } = req.params;

  // Step 2: Type check
  if (!req.body.text || typeof req.body.text !== 'string') {
    return res.status(400).json({ message: 'invalid type' });
  }

  // Step 3: Update the text
  const { text } = req.body as {text: string};
  for (let i = 0; i < TODOS.length; i += 1) {
    const todo = TODOS[i];
    if (todo.id === id) {
      todo.text = text;
      return res.status(200).json({ message: 'successfully updated', todo });
    }
  }

  // Step 4: Default return
  return res.status(400).json({ message: 'id not found' });
};

export const deleteTodo: RequestHandler<{id: string}> = (req, res) => {
  // Step 1: Get the id
  const { id } = req.params;

  // Step 2: Remove the id
  for (let i = 0; i < TODOS.length; i += 1) {
    const todo = TODOS[i];
    if (todo.id === id) {
      TODOS.splice(i, 1);
      return res.status(200).json({ message: 'successfully deleted', todo });
    }
  }

  // Step 2: Default return
  return res.status(400).json({ message: 'id not found' });
};
