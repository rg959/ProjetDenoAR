import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";

import { sendReturn } from "../helpers/sendReturn.helper.ts"


const invalidCardMiddleware = opine();

invalidCardMiddleware.use(function (req, res, next) {
    /*
    console.log(req.body.cartNumber != undefined && (String(req.body.cartNumber).match(/^4[0-9]{12}(?:[0-9]{3})?$/) == null || String(req.body.cartNumber).match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/) == null))
    console.log(req.body.month != undefined && String(req.body.month).match(/^[0-9]{1,2}[:.,-]?$/) == null)
    console.log(req.body.year != undefined && String(req.body.year).match(/^[0-9]{1,2}[:.,-]?$/) == null)
    console.log(req.body.default != undefined && (req.body.default.toLowerCase()  != "true" && req.body.default.toLowerCase()  != "false" && req.body.default != 0 && req.body.default != 1))
    */
    // empty/invalid sended data case
    function checkSendedValue() {
        // Check Visa mastercard amexp and discover
        return (req.body.cartNumber != undefined && (String(req.body.cartNumber).match(/^4[0-9]{12}(?:[0-9]{3})?$/) == null || String(req.body.cartNumber).match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/) == null)) ||
                (req.body.month != undefined && String(req.body.month).match(/^[0-9]{1,2}[:.,-]?$/) == null) ||
                (req.body.year != undefined && String(req.body.year).match(/^[0-9]{1,2}[:.,-]?$/) == null) ||
                (req.body.default != undefined && (req.body.default.toLowerCase()  != "true" && req.body.default.toLowerCase()  != "false" && req.body.default != 0 && req.body.default != 1))
    }
    if (checkSendedValue())
    {
        sendReturn(res, 403, {
            error: true,
            message: "Veuillez compléter votre profil avec une carte de crédit"
        });
    }
        
    else {
        
        // Convert to bool
        if (req.body.default == "true" || req.body.default == 1)
            req.body.default == true
        else
            req.body.default == false

        // Parsing the date
        req.body.year = parseInt("20" + req.body.year)
    
        next();
    }
});

export { invalidCardMiddleware }