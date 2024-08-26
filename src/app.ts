import express from 'express';
import sequelize from './database/mysql';
import { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const port = 3000;

// Test the connection
sequelize.authenticate()
    .then(() => console.log('MySQL connected...'))
    .catch((err) => console.error('Unable to connect to the database:', err));

// Middleware
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);

// health
app.get('/api/health', (_: Request, res: Response) => {
    res.status(200).json({
        status: 'OK!',
        timestamp: new Date().toISOString()
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
