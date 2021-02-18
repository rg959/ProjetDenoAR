import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";

import { sendReturn } from "../helpers/sendReturn.helper.ts"


const emptyMailPasswordMiddleware = opine();

emptyMailPasswordMiddleware.use(function (req, res, next) {
    // empty/invalid sended data case
    function checkSendedValue() {
        return (req.body.email != undefined && req.body.email == "") ||
                (req.body.password != undefined && req.body.password == "") 
    }
    if (checkSendedValue())
        sendReturn(res, 400, {
            error: true,
            message: "Email/password manquants"
        });
    else {
        //console.log("success data !")
        next();
    }
});

export { emptyMailPasswordMiddleware }