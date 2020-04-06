import { Router } from 'express';

import {
  createTodo, getTodo, editTodo, deleteTodo,
} from '../controller/todos';

const router = Router();

router.post('/', createTodo);

router.get('/', getTodo);

router.patch('/:id', editTodo);

router.delete('/:id', deleteTodo);

export default router;
