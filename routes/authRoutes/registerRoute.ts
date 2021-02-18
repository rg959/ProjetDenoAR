import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { sendReturn } from "../../helpers/sendReturn.helper.ts"

import { UserModel } from '../../models/UserModel.ts'
import UserModelInterface from "../../interfaces/UserInterfaces.ts";

const register = opine();

register.post("/register", async function (req, res) {
    let date_naissance = new Date(req.body.date_naissance)
    let user = new UserModel("Tuteur", req.body.email, req.body.password, req.body.firstname, req.body.lastname, date_naissance, req.body.sexe);

    if (await user.checkEmail(req.body.email) == true)
    {
        user.insert();
        sendReturn(res, 200, {
            error: false,
            message: "This route is still a WIP"
        })
    }
    else 
    {
        sendReturn(res, 200, {
            error: false,
            message: "This route is still a WIP"
        })
    }
});


export { register }