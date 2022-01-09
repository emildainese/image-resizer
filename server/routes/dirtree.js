import express from 'express';
import { getDirectoryTree } from '../controllers/dirtree.js';

const router = express.Router();

router.route('/dirtree').get(getDirectoryTree);

export default router;
