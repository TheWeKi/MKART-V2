import express, {json, urlencoded} from "express";
import cors from "cors";

import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}));

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
    res.json({
        status: "running",
    });
});

export default app;
