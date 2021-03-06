import { opine, json, urlencoded } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { routes } from "./routes/index.ts"

const port = 8001;
const app = opine();


app.use(json()); // for parsing application/json
app.use(urlencoded()); // for parsing application/x-www-form-urlencoded
app.use('/', routes)

import { UserModel } from './models/UserModel.ts';
import { BillModel } from './models/BillModel.ts'
import UserModelInterface from "./interfaces/UserInterfaces.ts";


// test bill
/*
let date_payement = new Date('2021-01-25')
let bill = new BillModel("SG@mail.com", "jvozho564jci", date_payement, 5.5, 6);
bill.insert()
*/
// Test user registeration without the register route
/*
let date_naissance = new Date('2009-10-15')
let user = new UserModel("Tuteur", 'alexis.savoie.555@gmail.com', 'bonjour', 'Alexis', 'Savoie', date_naissance, "Homme");

if (await user.checkEmail('alexis.savoie.555@gmail.com') == true)
    user.insert();
*/
/*
let user:UserModelInterface = await UserModel.getUser('SG@mail.com')
console.log("user :::::")
console.log(user)
*/

//console.log(user);


// deno run --allow-net --allow-read --unstable server.ts
// denon run --allow-net --allow-read --unstable server.ts
app.listen(port);
console.log("server running on port " + port)