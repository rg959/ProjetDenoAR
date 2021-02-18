import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { sendReturn } from "../../helpers/sendReturn.helper.ts"

import { UserModel } from '../../models/UserModel.ts'
import UserModelInterface from "../../interfaces/UserInterfaces.ts";

import { emptyValueMiddleware } from "../../middlewares/emptyValueMiddleware.ts"
import { syntaxMiddleware } from "../../middlewares/syntaxMiddleware.ts"

const register = opine();

register.post("/register", emptyValueMiddleware, syntaxMiddleware, async function (req, res) {
    let date_naissance = new Date(req.body.date_naissance)
    let user = new UserModel("Tuteur", req.body.email, req.body.password, req.body.firstname, req.body.lastname, date_naissance, req.body.sexe);

    if (await user.checkEmail(req.body.email) == true) {
        user.insert();

        let userReturn = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            sexe: req.body.sexe,
            role: user.role,
            dateNaissance: req.body.date_naissance,
            createdAt: user.createdAt,
            updateAt: user.updateAt,
            subscription: user.subscription
        }

        res.status = 201
        res.send({
            error: false,
            message: "L'utilisateur a bien été créé avec succès",
            user: userReturn
        })
    }
    else {
        sendReturn(res, 409, {
            error: true,
            message: "Un compte utilisant cette adresse mail est déjà enregistré"
        })
    }
});

export { register }