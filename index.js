import express from 'express';
import { connectDB } from './src/DBconfig/DBconfig.js';
import userRoute from './src/routes/userRoute.js';
import fileRoute from './src/routes/fileRoute.js';

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());

//  The use of the static folder
app.use(express.static("public"));

app.use('/api', userRoute);
app.use("/api", fileRoute);

app.get('/', (req, res) => {
    res.status(200).json({ 
        message: "Welcome to the Agri-Market API" 
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
