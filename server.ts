import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./config/db.config"
import router from "./routes/index.routes"

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/api", router); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { 
  console.log(`Server running at port ${PORT}`);
  connectDB();
});