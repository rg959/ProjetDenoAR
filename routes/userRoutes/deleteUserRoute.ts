import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { sendReturn } from "../../helpers/sendReturn.helper.ts"

const deleteUser = opine();

deleteUser.delete("/user", function (req, res) {
    sendReturn(res, 200, {
        error: false,
        message: "This route is still a WIP (deleteUser)"
    })
});

export { deleteUser }