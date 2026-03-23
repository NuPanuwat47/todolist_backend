import express, { Request, Response } from 'express';
import adminRoutes from './route/admin';
import authRoutes from './route/auth';
import todoRoutes from './route/todo';

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});