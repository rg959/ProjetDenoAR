import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { UserDB } from '../../db/UserBD.ts';
import { db } from '../../db/db.ts';
const userdb = db.collection("user")
const login = opine();

login.post("/login", function (req, res) {
    const result = userdb.findOne({ email: req.body.email });
    if (result != undefined)
    {
        res.send({ message: "L'email existe pas"});
    }
    else
    {
        res.send({ message: "L'email existe "});
    }
});

export { login }