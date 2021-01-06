import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { sendReturn } from "../../helpers/sendReturn.helper.ts"

const other = opine();

other.get("/test", function (req, res) {
    sendReturn(res, 200, {
        error: false,
        message: "Bonjour ProjetDenoAR"
    })

});

export { other }