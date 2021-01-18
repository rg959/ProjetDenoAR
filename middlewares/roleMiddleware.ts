import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";

import { sendReturn } from "../helpers/sendReturn.helper.ts"
import { UserModel } from '../models/UserModel.ts'

import { db } from '../db/db.ts';
const userdb = db.collection("user")


const roleMiddleware = opine();

roleMiddleware.use(async function (req: any, res, next) {
    let userT: any = await UserModel.getUser(req.body.emailToken)
    if (userT.getRole() == "Enfant")
        sendReturn(res, 403, {
            error: true,
            message: "Vos droits d'accès ne permettent pas d'accéder à la ressource"
        });
    else
        next()
});

export { roleMiddleware }