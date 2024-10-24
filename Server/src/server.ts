import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Real Estate Platform API in TypeScript');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
