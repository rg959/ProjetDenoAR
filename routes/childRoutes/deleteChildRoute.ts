import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { sendReturn } from "../../helpers/sendReturn.helper.ts"
import { Bson } from "https://deno.land/x/mongo@v0.20.1/mod.ts";

import { emptyValueMiddleware } from "../../middlewares/emptyValueMiddleware.ts";
import { syntaxMiddleware } from "../../middlewares/syntaxMiddleware.ts";
import { sessionMiddleware } from "../../middlewares/sessionMiddleware.ts"
import { roleMiddleware } from "../../middlewares/roleMiddleware.ts";

import { UserModel } from '../../models/UserModel.ts'

import { db } from '../../db/db.ts';
import UserModelInterface from "../../interfaces/UserInterfaces.ts";

const userdb = db.collection("user")

const deleteChild = opine();

deleteChild.delete("/user/child", emptyValueMiddleware, syntaxMiddleware, sessionMiddleware, roleMiddleware, async function (req, res) {
    const deleteCount:number = await userdb.deleteOne({ _id : new Bson.ObjectId(req.body.id_child)});
    console.log(deleteCount)
    if (deleteCount == 1)
    {
        let userT: UserModelInterface = await UserModel.getUser(req.body.emailToken)
        userT.removeChild()
        sendReturn(res, 200, {
            error: false,
            message: "L'utilisateur a été supprimée avec succès"
        })
    }
    else
    {
        sendReturn(res, 403, {
            error: true,
            message: "Vous ne pouvez pas supprimer cet enfant"
        })
    }

    
    
    
    
});

export { deleteChild }