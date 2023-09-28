import express, {json, urlencoded} from "express";
import cors from "cors";
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(json());
app.use(cookieParser());
app.use(urlencoded({extended: true}));

app.use("/api/v1", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/carts", cartRouter);

app.get("/", (req, res) => {
    res.json({
        status: "running",
    });
});

export default app;
