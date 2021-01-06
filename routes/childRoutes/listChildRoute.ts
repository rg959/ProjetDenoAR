import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { sendReturn } from "../../helpers/sendReturn.helper.ts"

const listChild = opine();

listChild.get("/user/child", function (req, res) {
    res.send({ message: "This route is still a WIP (listChild)"});
    sendReturn(res, 200, {
        error: false,
        message: "This route is still a WIP (listChild)"
    })
});

export { listChild }

