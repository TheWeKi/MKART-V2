import express, {json, urlencoded} from "express";
import cors from "cors";
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import {errorMiddleware} from "./middleware/error.js";
import orderRouter from "./routes/orderRoutes.js";
import session from "express-session"
import passport from "passport";

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session({secret: process.env.SESSION_SECRET}));

app.use(cors());
app.use(json());
app.use(cookieParser());
app.use(urlencoded({extended: true}));

app.use("/api/v1", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);

app.get("/", (req, res) => {
    res.json({
        status: "running",
    });
});
app.use(errorMiddleware);

export default app;
