import * as expressive from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";

const port = 8001;
const app = new expressive.App();
// route with dynamic parameter
app.get("/", async(req, res) => {
    await res.json([
        { message : "Bonjour, ProjetNodeAR !" },
    ]);
});


const server = await app.listen(port);
// deno run --allow-net --allow-read --unstable server.ts
console.log("ProjetNodeAR listening on port : " + server.port);