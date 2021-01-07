import { opine, json, urlencoded } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { routes } from "./routes/index.ts"

const port = 8001;
const app = opine();


app.use(json()); // for parsing application/json
app.use(urlencoded()); // for parsing application/x-www-form-urlencoded
app.use('/', routes)

import { UserModel } from './models/UserModel.ts';

// Test user registeration without the register route
/*

let date_naissance = new Date('2009-10-15')
let user = new UserModel('SG@mail.com', 'bonjour', 'Steins', 'Gate', date_naissance, "Femme");

if (await user.checkEmail('SG@mail.com') == true)
    user.insert();
*/

/*
let user:any = await UserModel.getUser('SG@mail.com')
console.log("user :::::")
console.log(user)
*/

//console.log(user);
// deno run --allow-net --allow-read --unstable server.ts
app.listen(port);
console.log("server running on port " + port)