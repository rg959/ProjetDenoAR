import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";

import { sendReturn } from "../helpers/sendReturn.helper.ts"
import * as jwt from '../helpers/jwt.helper.ts'


const sessionMiddleware = opine();

sessionMiddleware.use(async function (req: any, res, next) {
    let data: any = req.body;

    let token =  req.get("Authorization").split(" ")[1]
    let tokenPayload = await jwt.getJwtPayload(token)
    if(tokenPayload != null)
    {
        // If the token is valid then we can use define the email in the req.body for a more easy usage in the routes
        req.body.email = tokenPayload.email
        next();
    }
    else
    {
        sendReturn(res, 401, {
            error: true,
            message: "Votre token n'est pas correct"
        });
    }
    

});

export { sessionMiddleware }