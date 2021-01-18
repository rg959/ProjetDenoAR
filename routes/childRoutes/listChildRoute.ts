import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { sendReturn } from "../../helpers/sendReturn.helper.ts"

import { syntaxMiddleware } from "../../middlewares/syntaxMiddleware.ts";
import { sessionMiddleware } from "../../middlewares/sessionMiddleware.ts"
import { roleMiddleware } from "../../middlewares/roleMiddleware.ts";

import { db } from '../../db/db.ts';
const userdb = db.collection("user")

const listChild = opine();

listChild.get("/user/child", syntaxMiddleware, sessionMiddleware, roleMiddleware, async function (req, res) {
    const result:any = await userdb.find({ role: "Enfant" });
    console.log(result)
    res.status = 200
    res.send({
        error: false,
        user: result
    })
    

});

export { listChild }

