import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";

import { sendReturn } from "../../helpers/sendReturn.helper.ts"

import { emptyValueMiddleware } from "../../middlewares/emptyValueMiddleware.ts";
import { syntaxMiddleware } from "../../middlewares/syntaxMiddleware.ts";
import { sessionMiddleware } from "../../middlewares/sessionMiddleware.ts"
import { roleMiddleware } from "../../middlewares/roleMiddleware.ts";

import { UserModel } from '../../models/UserModel.ts'
import UserModelInterface from "../../interfaces/UserInterfaces.ts";

const addChild = opine();

addChild.post("/user/child", emptyValueMiddleware, syntaxMiddleware, sessionMiddleware, roleMiddleware, async function (req, res) {

    let optionnalData = {
        tuteur: req.body.emailToken
    }
    let date_naissance = new Date(req.body.date_naissance)
    let userM = new UserModel('Enfant', req.body.email, req.body.password, req.body.lastname, req.body.firstname, date_naissance, req.body.sexe, optionnalData);

    if (await userM.checkEmail(req.body.email) != true)
    {
        sendReturn(res, 409, {
            error: true,
            message: "Un compte utilisant cette adresse mail est déjà enregistré"
        })
        
    }
    else
    {
    let userT : UserModelInterface = await UserModel.getUser(req.body.emailToken)
    if (userT.nbChild < 3) {
        userT.addChild()
        // Add child
        userM.insert();
            

        let user = {
            firstname: userM.firstname,
            lastname: userM.lastname,
            sexe: userM.sexe,
            role: userM.role,
            dateNaissance: userM.date_naissance,
            createdAt: userM.createdAt,
            updateAt: userM.updateAt,
            subscription: userM.subscription
        }
        res.status = 201
        res.send({
            error: false,
            message: "Votre enfant a bien été créé avec succès",
            user: user
        })
    }
    else
    {
        sendReturn(res, 409, {
            error: true,
            message: "Vous avez dépassé le cota de trois enfants"
        })
    }
}

});

export { addChild }

