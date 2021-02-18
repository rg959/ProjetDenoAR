import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { sendReturn } from "../../helpers/sendReturn.helper.ts"

import { emptyValueMiddleware } from "../../middlewares/emptyValueMiddleware.ts";
import { syntaxMiddleware } from "../../middlewares/syntaxMiddleware.ts";
import { sessionMiddleware } from "../../middlewares/sessionMiddleware.ts"
import { roleMiddleware } from "../../middlewares/roleMiddleware.ts";

import { db } from '../../db/db.ts';
import UserModelInterface from "../../interfaces/UserInterfaces.ts";
import { UserModel } from "../../models/UserModel.ts";

const userdb = db.collection("user")

const listChild = opine();

listChild.get("/user/child", emptyValueMiddleware, syntaxMiddleware, sessionMiddleware, roleMiddleware, async function (req, res) {
    const result:Array<any> = await userdb.find({ tuteur: req.body.emailToken, role: "Enfant" }).toArray();

    for (let i = 0; i < result.length; i++) {
        delete result[i]['_id'];
        delete result[i]['email'];
        delete result[i]['password'];
        delete result[i]['token'];
        delete result[i]['nbTry'];
        delete result[i]['cooldownDate'];
        delete result[i]['nbChild'];
        delete result[i]['tuteur'];
    }

    
    // delete myObject['regex'];
    console.log(result)
    res.status = 200
    res.send({
        error: false,
        user: result
    })
    

});

export { listChild }

