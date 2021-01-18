import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";

import { sendReturn } from "../../helpers/sendReturn.helper.ts"
import { sessionMiddleware } from "../../middlewares/sessionMiddleware.ts"

const other = opine();

other.get("/test", function (req, res) {
    sendReturn(res, 200, {
        error: false,
        message: "Bonjour ProjetDenoAR"
    })

});


other.post("/testToken" , sessionMiddleware ,async function (req, res) {
    console.log(req.body.emailToken)
    sendReturn(res, 200, {
        error: false,
        message: "Bonjour ProjetDenoAR (connected)"
    })

});

export { other }