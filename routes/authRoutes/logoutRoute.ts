import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";

import { sendReturn } from "../../helpers/sendReturn.helper.ts"


const logout = opine();

logout.delete("/logout", function (req, res) {
    sendReturn(res, 200, {
        error: false,
        message: "This route is still a WIP"
    })
});

export { logout }