import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";

import { sendReturn } from "../helpers/sendReturn.helper.ts"


const syntaxMiddlewareV = opine();

syntaxMiddlewareV.use(function (req, res, next) {
    // empty/invalid sended data case
    function checkSendedValue() {
        return (req.body.email != undefined && String(req.body.email).match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null) ||
                (req.body.email != undefined && req.body.email.length <= 10 &&  req.body.email.length >= 150) ||
                (req.body.password != undefined && req.body.password.length <= 7 &&  req.body.password.length >= 20)
    }
    if (checkSendedValue())
        sendReturn(res, 400, {
            error: true,
            message: "Email/password incorrect"
        });
    else {
        //console.log("success data !")
        next();
    }
});

export { syntaxMiddlewareV }