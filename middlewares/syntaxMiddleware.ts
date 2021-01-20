import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";

import { sendReturn } from "../helpers/sendReturn.helper.ts"


const syntaxMiddleware = opine();

syntaxMiddleware.use(function (req, res, next) {
    // empty/invalid sended data case
    function checkSendedValue() {
        return (req.body.email != undefined && String(req.body.email).match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null) ||
                (req.body.date_naissance != undefined && String(req.body.date_naissance).match(/^^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$$/) == null) ||
                (req.body.sexe != undefined && req.body.sexe != "Homme" && req.body.sexe != "Femme") 
    }
    if (checkSendedValue())
        sendReturn(res, 409, {
            error: true,
            message: "Une ou plusieurs données sont erronées"
        });
    else {
        //console.log("success data !")
        next();
    }
});

export { syntaxMiddleware }