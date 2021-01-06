import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { routes } from "./routes/index.ts"

const port = 8001;
const app = opine();

app.use('/', routes)

import { UserModel } from './models/UserModel.ts';


/*
let user = new UserModel('SG@mail.com', 'bonjour', 'Steins', 'Gate', '2009-10-15', "Femme");

if (await user.checkEmail('SG@mail.com') == true)
    user.insert();
*/

//console.log(user);
// deno run --allow-net --allow-read --unstable server.ts
app.listen(port);
console.log("server running on port " + port)