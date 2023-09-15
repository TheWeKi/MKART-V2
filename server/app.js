import express, {json, urlencoded} from "express";
import cors from "cors";

import productRouter from "./routes/productRoutes.js"

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}));

app.use("/api/v1/products", productRouter);

app.get("/", (req, res) => {
    res.json({
        status: "running",
    });
});

export default app;