import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import uploadRoutes from './routes/upload.js';
import dirtreeRoutes from './routes/dirtree.js';
import errorHandler from './middleware/error.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/upload/img', express.static(path.join('upload', 'img')));
app.use(morgan('dev'));
app.use(cors());

app.use('/api', uploadRoutes);
app.use('/api', dirtreeRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
