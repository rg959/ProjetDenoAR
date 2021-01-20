import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";

import { sendReturn } from "../helpers/sendReturn.helper.ts"


const emptyValueMiddleware = opine();

emptyValueMiddleware.use(function (req, res, next) {
    // empty/invalid sended data case
    function checkSendedValue() {
        return (req.body.firstname != undefined && req.body.firstname == "") ||
                (req.body.lastname != undefined && req.body.lastname == "") ||
                (req.body.email != undefined && req.body.email == "") ||
                (req.body.password != undefined && req.body.password == "") ||
                (req.body.date_naissance != undefined && req.body.date_naissance == "") ||
                (req.body.sexe != undefined && req.body.sexe == "")
    }
    if (checkSendedValue())
        sendReturn(res, 409, {
            error: true,
            message: "Une ou plusieurs données obligatoire sont manquantes"
        });
    else {
        //console.log("success data !")
        next();
    }
});

export { emptyValueMiddleware }