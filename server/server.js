import server from "./app.js";

server.listen(process.env.PORT || 8080, () => {
    console.log(`Server started - http://localhost:${process.env.PORT}`)
});