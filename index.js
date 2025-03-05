import express from 'express';
import { connectDB } from './DBconfig/DBconfig.js';
import userRoute from './routes/userRoute.js';

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use('/api', userRoute);





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
