import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { Request, Response } from "https://deno.land/x/opine@1.0.2/src/types.ts";
import { sendReturn } from "../../helpers/sendReturn.helper.ts"
import { syntaxMiddleware } from "../../middlewares/syntaxMiddleware.ts"
import { comparePass } from "../../helpers/password.helper.ts"
import { UserModel } from '../../models/UserModel.ts';

import { UserDB } from '../../db/UserBD.ts';
import * as jwt from '../../helpers/jwt.helper.ts';
import { db } from '../../db/db.ts';
const userdb = db.collection("user")
const login = opine();



login.post("/login", syntaxMiddleware ,async  function (req, res) {
    // NEED TO BE CHANGED
    const result:any = await userdb.findOne({ email: req.body.email });
    if (result == undefined)
    {
        sendReturn(res, 400, {
            error: true,
            message: "Email/password incorrect"
        })
    }
    else
    {
        let token = await jwt.getAuthToken(result.email)
        await comparePass(req.body.password, result.password).then(isOk => {
            if (isOk) {
                let user = {
                    firstname: result.firstname,
                    lastname: result.lastname,
                    email: result.email,
                    sexe: result.sexe,
                    role: result.role,
                    dateNaissance: result.dateNaiss

                }
                res.send({
                    error: false,
                    user: user,
                    token: token
                })

            }
            else {
                sendReturn(res, 400, {
                    error: true,
                    message: "Email/password incorrect"
                })
            }
        })
    }
});

export { login }




