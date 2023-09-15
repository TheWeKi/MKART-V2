import express from "express";
import productRouter from "./routes/productRoutes.js"
import cors from "cors";
const app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/products', productRouter);
app.get("/", (req, res) => {
    res.json({
        status: "success",
    });
});

export default app;