import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.json({
        status: "success",
    });
});

export default app;