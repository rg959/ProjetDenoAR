import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";

import { sendReturn } from "../helpers/sendReturn.helper.ts"


const emailSyntaxMiddleware = opine();

emailSyntaxMiddleware.use(function (req, res, next) {
    // empty/invalid sended data case
    function checkSendedValue() {
        return (req.body.email != undefined && String(req.body.email).match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null)
    }
    if (checkSendedValue())
        sendReturn(res, 400, {
            error: true,
            message: "Email/Password incorrect"
        });
    else {
        //console.log("success data !")
        next();
    }
});

export { emailSyntaxMiddleware }