"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = __importDefault(require("../model/todo"));
const TODOS = [];
exports.createTodo = (req, res) => {
    if (!req.body.text || typeof req.body.text !== 'string') {
        return res.status(400).json({ message: 'invalid type' });
    }
    const { text } = req.body;
    const newTodo = new todo_1.default(Math.random().toString(), text);
    TODOS.push(newTodo);
    return res.status(200).json({ message: 'successfully created todo', value: newTodo });
};
exports.getTodo = (req, res) => {
    res.status(200).send({ todos: TODOS });
};
exports.editTodo = (req, res) => {
    const { id } = req.params;
    if (!req.body.text || typeof req.body.text !== 'string') {
        return res.status(400).json({ message: 'invalid type' });
    }
    const { text } = req.body;
    for (let i = 0; i < TODOS.length; i += 1) {
        const todo = TODOS[i];
        if (todo.id === id) {
            todo.text = text;
            return res.status(200).json({ message: 'successfully updated', todo });
        }
    }
    return res.status(400).json({ message: 'id not found' });
};
exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    for (let i = 0; i < TODOS.length; i += 1) {
        const todo = TODOS[i];
        if (todo.id === id) {
            TODOS.splice(i, 1);
            return res.status(200).json({ message: 'successfully deleted', todo });
        }
    }
    return res.status(400).json({ message: 'id not found' });
};
