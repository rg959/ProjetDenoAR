import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";

import { sendReturn } from "../helpers/sendReturn.helper.ts"


const syntaxMiddleware = opine();

syntaxMiddleware.use(function (req, res, next) {
    let data: any = req.body;
    // empty/invalid sended data case
    function checkSendedValue() {
        return (data.email != undefined && data.email == "") ||
            (data.password != undefined && data.password == "")
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

export { syntaxMiddleware }