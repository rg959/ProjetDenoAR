import * as expressive from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";

const port = 8001;
const app = new expressive.App();

import { UserModel } from './models/UserModel.ts';

// route with dynamic parameter
app.get("/test", async(req, res) => {
    await res.json([
        { message : "Bonjour, ProjetNodeAR !" },
    ]);
});

let user = new UserModel('SG@mail.com', 'bonjour', 'Steins', 'Gate', '2009-10-15', "Femme");
user.insert();
console.log(user);

const server = await app.listen(port);

// deno run --allow-net --allow-read --unstable server.ts
console.log("ProjetNodeAR listening on port : " + server.port);