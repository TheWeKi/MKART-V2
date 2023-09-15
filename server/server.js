import server from "./app.js";

const {PORT} = process.env;

server.listen(PORT || 8080, () => {
    console.log(`Server started - http://localhost:${PORT}`)
});